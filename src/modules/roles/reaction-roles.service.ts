import { Client, DiscordEmbeds } from '@live-apps/discord';
import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PROVIDER_TYPES } from 'src/common/constants/provider.types';
import { IMessageReaction } from 'src/common/interface/guild.interface';
import { ReactionRoles } from 'src/modules/roles/models/reaction_roles.model';
import { compareRolesMapping } from 'src/utils/roles-mapping';

/**
 * Reaction Roles Action
 */
export class ReactionRolesActionDto {
  name: string;
  guildId: string;
  channelId: string;
  action: string;
  rolesMapping: any[];
  reactionRoleMessageRef: string;
  discordEmbedConfig?: DiscordEmbeds;
}

@Injectable()
export class ReactionRolesService {
  constructor(
    @InjectModel('reaction_roles')
    private readonly reactionRolesModel: Model<ReactionRoles>,
    @Inject(PROVIDER_TYPES.DiscordClient)
    private readonly discordClient: Client,
  ) {}
  ///Update Reaction Role
  async updateReactionRole(dto: ReactionRolesActionDto) {
    const { channelId, rolesMapping, reactionRoleMessageRef } = dto;
    const embed: DiscordEmbeds[] = [
      {
        ...dto.discordEmbedConfig,
      },
    ];

    const reaction_role = await this.reactionRolesModel.findOne({
      messageId: reactionRoleMessageRef,
    });

    if (!reaction_role) {
      return false;
    }

    ///Update Message
    await this.discordClient.message.editEmbed(
      channelId,
      reactionRoleMessageRef,
      embed,
    );

    ///Update Roles Mapping Changes
    await this.reactionRolesModel.updateOne(
      { _id: reaction_role._id },
      {
        $set: {
          rolesMapping,
        },
      },
    );

    const emojiToBeUpdated: any[] = compareRolesMapping(
      rolesMapping,
      reaction_role.roleEmojiMapping,
    );

    for (let index = 0; index < emojiToBeUpdated.length; index++) {
      const emoji = emojiToBeUpdated[index].emoji;

      await this.discordClient.message.react(
        channelId,
        reactionRoleMessageRef,
        emoji.type === 'standard'
          ? encodeURIComponent(emoji.standardEmoji)
          : encodeURIComponent(`${emoji.name}:${emoji.id}`),
      );
    }

    return {
      reactionRoleMessageRef,
    };
  }

  async deleteReactionRole(dto: ReactionRolesActionDto) {
    const { channelId, reactionRoleMessageRef } = dto;

    const reaction_role = await this.reactionRolesModel.findOne({
      messageId: reactionRoleMessageRef,
    });

    if (!reaction_role) {
      return false;
    }

    ///Delete Message
    await this.discordClient.message.delete(channelId, reactionRoleMessageRef);
    await this.reactionRolesModel.deleteOne({
      messageId: reactionRoleMessageRef,
    });

    return {
      reactionRoleMessageRef,
    };
  }

  /**
   * Role Reactions
   * Handle Reactions
   */
  async setReactionRole(payload: IMessageReaction) {
    const { isBot, messageId, emoji, userId } = payload;

    if (isBot) return false;

    const reaction_role = await this.reactionRolesModel.findOne({ messageId });
    if (!reaction_role) return false;

    const emojiType = emoji.id ? 'guild' : 'standard';
    let role: any;

    if (emojiType === 'guild') {
      role = reaction_role.roleEmojiMapping.find(
        (e: any) => e.emoji.id === emoji.id,
      );
    }

    if (emojiType === 'standard') {
      role = reaction_role.roleEmojiMapping.find(
        (e: any) => e.emoji.standardEmoji === emoji.name,
      );
    }

    if (!role) {
      return false;
    }

    ///Add role to User
    return this.discordClient.roles.set(
      reaction_role.guildId,
      userId,
      role.roleId,
    );
  }

  ///Handle Role React
  async removeReactionRole(guild: IMessageReaction) {
    const { emoji, isBot, messageId, userId } = guild;
    if (isBot) return false;

    const reaction_role = await this.reactionRolesModel.findOne({ messageId });
    if (!reaction_role) return false;

    const emojiType = emoji.id ? 'guild' : 'standard';
    let role;

    if (emojiType === 'guild') {
      role = reaction_role.roleEmojiMapping.find(
        (e: any) => e.emoji.id === emoji.id,
      );
    }

    if (emojiType === 'standard') {
      role = reaction_role.roleEmojiMapping.find(
        (e: any) => e.emoji.standardEmoji === emoji.name,
      );
    }

    if (!role) {
      return false;
    }

    ///Add role to User
    await this.discordClient.roles.remove(
      reaction_role.guildId,
      userId,
      role.roleId,
    );
  }
}
