import { Injectable, Inject } from '@nestjs/common';
import {
  IMessageUpdate,
  IGuildMemberUpdate,
} from 'src/common/interface/guild.interface';
import { Features } from 'src/modules/features/model/features.model';
import { DiscordEventsType } from '../../common/enum/discord-events.enum';
import { PROVIDER_TYPES } from 'src/common/constants/provider.types';
import { Client } from '@live-apps/discord';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DiscordTemplate } from 'src/modules/discord-template/models/discord-template.model';
import { DiscordTemplateType } from 'src/common/enum/discord-template.enum';
import { DiscordTemplateService } from 'src/modules/discord-template/discord-template.service';

@Injectable()
export class LoggerService {
  constructor(
    @Inject(DiscordTemplateService)
    private readonly templateService: DiscordTemplateService,
    @Inject(PROVIDER_TYPES.DiscordClient)
    private readonly discordClient: Client,
    @InjectModel('discord_templates')
    private readonly discordTemplateModel: Model<DiscordTemplate>,
    @InjectModel(Features.name)
    private readonly featuresModel: Model<Features>,
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
    const memberCache = await this.discordClient.member.fetch(
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
    const features = await this.featuresModel.findOne({ guildId });

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

  /**Get Discord Template */
  private async getDiscordTemplate(templateId: string = null) {
    return this.discordTemplateModel.findOne({ _id: templateId });
  }

  private async sendTemplateMessage(
    channelId: string,
    templateId: string,
    content: any,
  ) {
    const template = await this.getDiscordTemplate(templateId);

    if (!template) {
      return;
    }

    const guild = await this.discordClient.guild.fetch(content.guildId);
    const guildName = guild.name;

    if (template.type === DiscordTemplateType.plain) {
      const plainContent = await this.templateService.fillPlainTemplate(
        { ...content, guildName },
        template.content,
      );

      await this.discordClient.message.send(channelId, plainContent);
    } else if (template.type === DiscordTemplateType.embed) {
      content.guildName = guildName;

      const embed: any = await this.templateService.fillEmbedTemplate(content, {
        ...template.embed,
      });

      await this.discordClient.message.sendEmbed(channelId, [embed]);
    }
  }
}
