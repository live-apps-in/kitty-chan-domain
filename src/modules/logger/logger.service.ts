import { inject, injectable } from 'inversify';
import {
  IGuildMemberUpdate,
  IMessageUpdate,
} from '../../common/interface/shared.interface';
import { DiscordTemplateType } from '../../common/enum/discord-template.enum';
import { liveClient } from '../app';
import { TYPES } from '../../core/inversify.types';
import { DiscordTemplateService } from '../../common/services/discord-template.service';
import Features from '../features/model/features.model';
import { TemplateRepo } from '../../repository/template.repo';
import { DiscordEventsType } from '../../common/enum/discord-events.enum';

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
    target: DiscordEventsType,
  ) {
    const validateFF = await this.validateLoggerFF(message.guildId, target);
    if (!validateFF) {
      return;
    }

    await this.sendTemplateMessage(
      validateFF.channelId,
      validateFF.templateId,
      message,
    );
  }

  /**Guild Member Update Logger */
  async memberUpdate(member: IGuildMemberUpdate) {
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

    /**Avatar */
    if (fetchUpdates.avatar) {
      const validateFF = await this.validateLoggerFF(
        member.guildId,
        DiscordEventsType.memberAvatarUpdate,
      );
      if (!validateFF) {
        return;
      }

      return this.sendTemplateMessage(
        validateFF.channelId,
        validateFF.templateId,
        member,
      );
    }

    /**Username */
    if (fetchUpdates.username) {
      const validateFF = await this.validateLoggerFF(
        member.guildId,
        DiscordEventsType.memberUsernameUpdate,
      );
      if (!validateFF) {
        return;
      }

      const mutatedMember = {
        ...member,
        oldUsername:
          `${memberCache.user.username}#${memberCache.user.discriminator}` ||
          'N/A',
        newUsername: member.username,
      };

      return this.sendTemplateMessage(
        validateFF.channelId,
        validateFF.templateId,
        mutatedMember,
      );
    }

    /**Nickname */
    if (fetchUpdates.nickname) {
      const validateFF = await this.validateLoggerFF(
        member.guildId,
        DiscordEventsType.memberNicknameUpdate,
      );
      if (!validateFF) {
        return;
      }

      const mutatedMember = {
        ...member,
        oldNickname: memberCache.nick || '',
        newNickname: member.nickname || memberCache.user.display_name,
      };

      return this.sendTemplateMessage(
        validateFF.channelId,
        validateFF.templateId,
        mutatedMember,
      );
    }

    /**Roles */
    const { role } = fetchUpdates;
    let validateFF;

    if (role.added || role.removed) {
      if (fetchUpdates.role.added) {
        validateFF = await this.validateLoggerFF(
          member.guildId,
          DiscordEventsType.memberAddRole,
        );

        if (!validateFF) {
          return;
        }
      } else if (fetchUpdates.role.removed) {
        validateFF = await this.validateLoggerFF(
          member.guildId,
          DiscordEventsType.memberRemoveRole,
        );

        if (!validateFF) {
          return;
        }
      }

      return this.sendTemplateMessage(
        validateFF.channelId,
        validateFF.templateId,
        member,
      );
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
    if ((oldMember?.nick || nickname) && nickname !== oldMember.nick) {
      changes.nickname = true;
    }

    // Compare avatar
    if (avatar !== oldMember?.user.avatar) {
      changes.avatar = true;
    }

    if (Object.values(changes).some((value) => value !== undefined)) {
      changes.hasUpdate = true;
    }

    return changes;
  }

  private async validateLoggerFF(guildId: string, target: DiscordEventsType) {
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

  /**Get Template */
  private async getTemplate(templateId: string = null) {
    return this.templateRepo.findById(templateId);
  }

  private async sendTemplateMessage(
    channelId: string,
    templateId: string,
    content: any,
  ) {
    const template = await this.getTemplate(templateId);

    if (!template) {
      return;
    }

    const guild = await liveClient.guild.fetch(content.guildId);
    const guildName = guild.name;

    if (template.type === DiscordTemplateType.plain) {
      const plainContent = await this.templateService.fillPlainTemplate(
        { ...content, guildName },
        template.content,
      );

      await liveClient.message.send(channelId, plainContent);
    } else if (template.type === DiscordTemplateType.embed) {
      content.guildName = guildName;

      const embed: any = await this.templateService.fillEmbedTemplate(content, {
        ...template.embed,
      });

      await liveClient.message.sendEmbed(channelId, [embed]);
    }
  }
}
