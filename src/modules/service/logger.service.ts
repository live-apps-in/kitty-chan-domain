import { inject, injectable } from 'inversify';
import {
  IGuildMemberUpdate,
  IMessageDelete,
  IMessageUpdate,
} from '../interface/shared.interface';
import Guild from '../../model/guild.model';
import DiscordTemplateModel from '../../model/discord_templates.model';
import {
  DiscordTemplateType,
  DiscordTemplateTarget,
} from '../enum/discord_template.enum';
import { liveClient } from '../app';
import { TYPES } from '../../core/inversify.types';
import { DiscordTemplateService } from './shared/discord_template.service';

@injectable()
export class LoggerService {
  constructor(
    @inject(TYPES.DiscordTemplateService)
    private readonly templateService: DiscordTemplateService,
  ) {}

  /**Guild Message Update Logger */
  async messageUpdate(message: IMessageUpdate) {
    const { features } = await Guild.findOne(
      { guildId: message.guildId },
      { features: 1 },
    );

    if (!features?.logger?.options?.messageUpdate?.channelId) {
      return;
    }

    const template = await this.getDefaultTemplate(
      DiscordTemplateTarget.messageUpdate,
      DiscordTemplateType.embed,
    );
    if (!template) return;

    const buildTemplate = {
      ...template.embed,
    };

    //Convert milliseconds to seconds
    const dateObject = new Date(Math.floor(message.editedAt / 1000) * 1000);
    const unixTimestampInSec = dateObject.getTime() / 1000;
    message.editedAt = unixTimestampInSec;

    const guild = await liveClient.guild.fetch(message.guildId, {
      expiry: 3600,
    });

    const mutatedMessage = {
      ...message,
      guildName: guild.name,
    };

    const embeds: any = await this.templateService.fillEmbedTemplate(
      mutatedMessage,
      buildTemplate,
    );

    await liveClient.message.sendEmbed(
      features.logger.options.messageUpdate.channelId,
      [embeds],
    );
  }

  /**Guild Message Delete Logger */
  async messageDelete(message: IMessageDelete) {
    const { features } = await Guild.findOne(
      { guildId: message.guildId },
      { features: 1 },
    );

    if (!features?.logger?.options?.messageDelete?.channelId) {
      return;
    }

    const template = await this.getDefaultTemplate(
      DiscordTemplateTarget.messageDelete,
      DiscordTemplateType.embed,
    );
    if (!template) return;

    const buildTemplate = {
      ...template.embed,
    };

    const guild = await liveClient.guild.fetch(message.guildId, {
      expiry: 3600,
    });

    const mutatedMessage = {
      ...message,
      guildName: guild.name,
    };

    const embeds: any = await this.templateService.fillEmbedTemplate(
      mutatedMessage,
      buildTemplate,
    );

    await liveClient.message.sendEmbed(
      features.logger.options.messageDelete.channelId,
      [embeds],
    );
  }
  /**Guild Member Update Logger */
  async memberUpdate(member: IGuildMemberUpdate) {
    const { features } = await Guild.findOne(
      { guildId: member.guildId },
      { features: 1 },
    );

    if (!features?.logger?.options?.memberNicknameUpdate?.channelId) {
      return;
    }

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
      const template = await this.getDefaultTemplate(
        DiscordTemplateTarget.memberAvatarUpdate,
        DiscordTemplateType.embed,
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

      await liveClient.message.sendEmbed(
        features.logger.options.memberAvatarUpdate.channelId,
        [embeds],
      );

      return;
    }

    /**Username */
    if (fetchUpdates.username) {
      const template = await this.getDefaultTemplate(
        DiscordTemplateTarget.memberUsernameUpdate,
        DiscordTemplateType.embed,
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

      await liveClient.message.sendEmbed(
        features.logger.options.memberUsernameUpdate.channelId,
        [embeds],
      );

      return;
    }

    /**Nickname */
    if (fetchUpdates.nickname) {
      const template = await this.getDefaultTemplate(
        DiscordTemplateTarget.memberNicknameUpdate,
        DiscordTemplateType.embed,
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

      await liveClient.message.sendEmbed(
        features.logger.options.memberNicknameUpdate.channelId,
        [embeds],
      );

      return;
    }

    /**Roles */
    const { role } = fetchUpdates;

    if (role.added || role.removed) {
      if (fetchUpdates.role.added) {
        var template = await this.getDefaultTemplate(
          DiscordTemplateTarget.memberAddRole,
          DiscordTemplateType.embed,
        );
      } else {
        var template = await this.getDefaultTemplate(
          DiscordTemplateTarget.memberRemoveRole,
          DiscordTemplateType.embed,
        );
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

      await liveClient.message.sendEmbed(
        features.logger.options.memberAddRole.channelId,
        [embeds],
      );

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
    if (nickname || (oldMember?.nickname && nickname !== oldMember.nick)) {
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

  /**Get Default Logger Template */
  private getDefaultTemplate(target: string, type: string) {
    return DiscordTemplateModel.findOne({
      type,
      target,
    });
  }
}
