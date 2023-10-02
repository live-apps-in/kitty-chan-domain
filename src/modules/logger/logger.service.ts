import { inject, injectable } from 'inversify';
import { IGuildMemberUpdate, IMessageUpdate } from '../../common/interface/shared.interface';
import DiscordTemplateModel from '../template/model/discord_templates.model';
import {
  DiscordTemplateType,
  DiscordTemplateTarget,
} from '../../common/enum/discord_template.enum';
import { liveClient } from '../app';
import { TYPES } from '../../core/inversify.types';
import { DiscordTemplateService } from '../../common/services/discord_template.service';
import Features from '../features/model/features.model';
import { TemplateRepo } from '../../repository/template.repo';

@injectable()
export class LoggerService {
  constructor(
    @inject(TYPES.DiscordTemplateService)
    private readonly templateService: DiscordTemplateService,
    @inject(TYPES.TemplateRepo) private readonly templateRepo: TemplateRepo,
  ) {}

  /**Guild Message Update Logger */
  async messageUpdateDelete(
    message: IMessageUpdate,
    target: DiscordTemplateTarget,
  ) {
    const validateFF = await this.validateLoggerFF(message.guildId, target);
    if (!validateFF) {
      return;
    }

    const getLoggerConfig = await this.buildTemplate(
      validateFF.templateId,
      target,
      message,
    );

    if (!getLoggerConfig) {
      return;
    }

    if (getLoggerConfig.type === DiscordTemplateType.plain) {
      await liveClient.message.send(
        validateFF.channelId,
        getLoggerConfig.plainContent,
      );

      return;
    } else if (getLoggerConfig.embed) {
      await liveClient.message.sendEmbed(validateFF.channelId, [
        getLoggerConfig.embed,
      ]);
    }
  }

  /**Guild Member Update Logger */
  async memberUpdate(member: IGuildMemberUpdate) {
    const features = await Features.findOne({ guildId: member.guildId });

    const memberCache = await liveClient.member.fetch(
      member.guildId,
      member.userId,
      { onlyCache: true },
    );

    if (!memberCache) {
      return false;
    }

    const fetchUpdates = this.findMemberUpdateProps(memberCache, member);
    if (!fetchUpdates.hasUpdate) return;

    const guild = await liveClient.guild.fetch(member.guildId, {
      expiry: 3600,
    });

    /**Avatar */
    if (fetchUpdates.avatar) {
      const featStatus = features?.logger?.memberAvatarUpdate?.isActive;
      const featChannelId = features?.logger?.memberAvatarUpdate?.channelId;
      const featTemplateId = features?.logger?.memberAvatarUpdate?.templateId;

      if (!featStatus || !featChannelId) {
        return;
      }

      const template = await this.getTemplateOrGetDefault(
        featTemplateId,
        DiscordTemplateTarget.memberAvatarUpdate,
      );

      const buildTemplate = {
        ...template.embed,
      };

      const payload = {
        ...member,
        guildName: guild.name,
        editedAt: Math.floor(Date.now() / 1000).toString(),
      };

      const embeds: any = await this.templateService.fillEmbedTemplate(
        payload,
        buildTemplate,
      );

      await liveClient.message.sendEmbed(featChannelId, [embeds]);

      return;
    }

    /**Username */
    if (fetchUpdates.username) {
      const featStatus = features?.logger?.memberUsernameUpdate?.isActive;
      const featChannelId = features?.logger?.memberUsernameUpdate?.channelId;
      const featTemplateId = features?.logger?.memberUsernameUpdate?.templateId;

      if (!featStatus || !featChannelId) {
        return;
      }

      const template = await this.getTemplateOrGetDefault(
        featTemplateId,
        DiscordTemplateTarget.memberUsernameUpdate,
      );

      const buildTemplate = {
        ...template.embed,
      };

      const payload = {
        ...member,
        guildName: guild.name,
        oldUsername:
          `${memberCache.user.username}#${memberCache.user.discriminator}` ||
          'N/A',
        newUsername: member.username,
        editedAt: Math.floor(Date.now() / 1000).toString(),
      };

      const embeds: any = await this.templateService.fillEmbedTemplate(
        payload,
        buildTemplate,
      );

      await liveClient.message.sendEmbed(featChannelId, [embeds]);

      return;
    }

    /**Nickname */
    if (fetchUpdates.nickname) {
      const featStatus = features?.logger?.memberNicknameUpdate?.isActive;
      const featChannelId = features?.logger?.memberNicknameUpdate?.channelId;
      const featTemplateId = features?.logger?.memberNicknameUpdate?.templateId;

      if (!featStatus || !featChannelId) {
        return;
      }

      const template = await this.getTemplateOrGetDefault(
        featTemplateId,
        DiscordTemplateTarget.memberNicknameUpdate,
      );

      const buildTemplate = {
        ...template.embed,
      };

      const payload = {
        ...member,
        guildName: guild.name,
        oldNickname: memberCache.nick || '',
        newNickname: member.nickname || memberCache.user.display_name,
        editedAt: Math.floor(Date.now() / 1000).toString(),
      };

      const embeds: any = await this.templateService.fillEmbedTemplate(
        payload,
        buildTemplate,
      );

      await liveClient.message.sendEmbed(featChannelId, [embeds]);

      return;
    }

    /**Roles */
    const { role } = fetchUpdates;
    let roleFeatureChannelId: string;

    if (role.added || role.removed) {
      if (fetchUpdates.role.added) {
        const featStatus = features?.logger?.memberAddRole?.isActive;
        const featChannelId = features?.logger?.memberAddRole?.channelId;
        const featTemplateId = features?.logger?.memberAddRole?.templateId;
        if (!featStatus || !featChannelId) {
          return;
        }

        var template = await this.getTemplateOrGetDefault(
          featTemplateId,
          DiscordTemplateTarget.memberAddRole,
        );

        roleFeatureChannelId = featChannelId;
      } else {
        const featStatus = features?.logger?.memberRemoveRole?.isActive;
        const featChannelId = features?.logger?.memberRemoveRole?.channelId;
        const featTemplateId = features?.logger?.memberRemoveRole?.templateId;

        if (!featStatus || !featChannelId) {
          return;
        }

        var template = await this.getTemplateOrGetDefault(
          featTemplateId,
          DiscordTemplateTarget.memberRemoveRole,
        );

        roleFeatureChannelId = featChannelId;
      }

      if (!template) return;

      const buildTemplate = {
        ...template.embed,
      };

      const payload = {
        ...member,
        guildName: guild.name,
        roleId: role.added ? role.added : role.removed,
        editedAt: Math.floor(Date.now() / 1000).toString(),
      };

      const embeds: any = await this.templateService.fillEmbedTemplate(
        payload,
        buildTemplate,
      );

      await liveClient.message.sendEmbed(roleFeatureChannelId, [embeds]);

      return;
    }
  }

  /**Guild Member update props check */
  private findMemberUpdateProps(oldMember: any, newMember: IGuildMemberUpdate) {
    const changes = {
      role: {
        added: null,
        removed: null,
      },
      username: false,
      nickname: false,
      avatar: false,
      hasUpdate: false,
    };

    const { avatar, nickname, username, roles } = newMember;

    //Workaround - Proto3 ignores field if array is empty
    newMember.roles = roles || [];

    // Compare roles
    if (newMember.roles && Array.isArray(oldMember.roles)) {
      const addedRoles = newMember.roles.filter(
        (role) => !oldMember.roles.includes(role),
      );
      const removedRoles = oldMember.roles.filter(
        (role) => !newMember.roles.includes(role),
      );

      if (addedRoles.length > 0 || removedRoles.length > 0) {
        changes.role = {
          added: addedRoles.length > 0 ? addedRoles[0] : null,
          removed: removedRoles.length > 0 ? removedRoles[0] : null,
        };
      }
    }

    // Compare username
    if (username !== oldMember?.user.username) {
      changes.username = true;
    }

    // Compare nickname
    if ((oldMember.nick && !nickname) || nickname !== oldMember?.nick) {
      changes.nickname = true;
    }

    // Compare avatar
    if (avatar !== oldMember?.user.avatar) {
      changes.avatar = true;
    }

    if (
      changes.role.added ||
      changes.role.removed ||
      changes.username ||
      changes.nickname ||
      changes.avatar
    ) {
      changes.hasUpdate = true;
    }

    return changes;
  }

  private async validateLoggerFF(
    guildId: string,
    target: DiscordTemplateTarget,
  ) {
    const features = await Features.findOne({ guildId });

    const status = features?.logger?.[target]?.isActive;
    const channelId = features?.logger?.[target]?.channelId;

    if (!status || !channelId) {
      return;
    }

    return {
      status,
      channelId,
      templateId: features?.logger?.[target]?.templateId,
    };
  }

  private async buildTemplate(
    templateId: string,
    templateTarget: DiscordTemplateTarget,
    message: IMessageUpdate,
  ) {
    let res: { type: DiscordTemplateType; plainContent?: string; embed?: any };

    const template = await this.getTemplateOrGetDefault(
      templateId,
      templateTarget,
    );

    if (!template) {
      return;
    }

    const guild = await liveClient.guild.fetch(message.guildId);

    const mutatedMessage = {
      ...message,
      guildName: guild.name,
    };

    if (template.type === DiscordTemplateType.plain) {
      const plainContent = await this.templateService.fillPlainTemplate(
        mutatedMessage,
        template.content,
      );

      res = {
        type: DiscordTemplateType.plain,
        plainContent,
      };
    } else if (template.type === DiscordTemplateType.embed) {
      //Convert milliseconds to seconds
      const dateObject = new Date(Math.floor(message.editedAt / 1000) * 1000);
      const unixTimestampInSec = dateObject.getTime() / 1000;
      message.editedAt = unixTimestampInSec;

      const embed: any = await this.templateService.fillEmbedTemplate(
        mutatedMessage,
        { ...template.embed },
      );

      res = {
        type: DiscordTemplateType.embed,
        embed,
      };
    }

    return res;
  }

  /**Get Template or get default */
  private async getTemplateOrGetDefault(templateId = null, target: string) {
    let template = await this.templateRepo.findById(templateId);

    if (!template) {
      template = await DiscordTemplateModel.findOne({
        type: DiscordTemplateType.embed,
        target,
      });
    }

    return template;
  }
}
