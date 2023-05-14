import { injectable } from 'inversify';
import { ReactionRolesActionDto } from '../../../api/live_cord/_dto/roles.dto';
import { DiscordEmbeds } from '../../../types/discord.types';
import ReactionRoles from '../../../model/reaction_roles.model';
import { HttpException } from '../../../core/exception';
import ReactionRole from '../../../model/reaction_roles.model';
import { IMessageReaction } from '../../interface/shared.interface';
import { compareRolesMapping } from '../../../utils/roles_mapping';
import { liveClient } from '../../app';

@injectable()
export class RolesService {
  ///Trigger from LiveCord

  ///Create Reaction Role
  async createReactionRole(dto: ReactionRolesActionDto) {
    const { channelId, rolesMapping } = dto;
    const embed: DiscordEmbeds[] = [
      {
        ...dto.discordEmbedConfig,
      },
    ];

    const res: any = await liveClient.message.sendEmbed(channelId, embed);

    if (!res?.id)
      throw new HttpException('Unable to create Reaction Role', 400);

    ///Persist Role mapping
    await ReactionRoles.insertMany({
      name: dto.name,
      guildId: dto.guildId,
      channelId: dto.channelId,
      rolesMapping: dto.rolesMapping,
      messageId: res.id,
    });

    ///Map all emoji
    for (let index = 0; index < rolesMapping.length; index++) {
      const emoji = rolesMapping[index].emoji;

      await liveClient.message.react(
        channelId,
        res.id,
        emoji.type === 'standard'
          ? encodeURIComponent(emoji.standardEmoji)
          : encodeURIComponent(`${emoji.name}:${emoji.id}`),
      );
    }

    const reactionRoleMessageRef = res.id;
    return {
      reactionRoleMessageRef,
    };
  }

  ///Update Reaction Role
  async updateReactionRole(dto: ReactionRolesActionDto) {
    const { channelId, rolesMapping, reactionRoleMessageRef } = dto;
    const embed: DiscordEmbeds[] = [
      {
        ...dto.discordEmbedConfig,
      },
    ];

    const reaction_role = await ReactionRole.findOne({
      messageId: reactionRoleMessageRef,
    });
    if (!reaction_role)
      throw new HttpException('Cannot find Reaction Role', 400);

    ///Update Message
    await liveClient.message.editEmbed(
      channelId,
      reactionRoleMessageRef,
      embed,
    );

    ///Update Roles Mapping Changes
    await ReactionRole.updateOne(
      { _id: reaction_role._id },
      {
        $set: {
          rolesMapping,
        },
      },
    );

    const emojiToBeUpdated: any[] = compareRolesMapping(
      rolesMapping,
      reaction_role.rolesMapping,
    );

    for (let index = 0; index < emojiToBeUpdated.length; index++) {
      const emoji = emojiToBeUpdated[index].emoji;

      await liveClient.message.react(
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

    const reaction_role = await ReactionRole.findOne({
      messageId: reactionRoleMessageRef,
    });
    if (!reaction_role)
      throw new HttpException('Cannot find Reaction Role', 400);

    ///Delete Message
    await liveClient.message.delete(channelId, reactionRoleMessageRef);

    await ReactionRoles.deleteOne({ messageId: reactionRoleMessageRef });

    return {
      reactionRoleMessageRef,
    };
  }

  async deleteReactionRolesByGuild(guildId: string) {
    await ReactionRoles.deleteMany({ guildId });
  }

  /**
   * Role Reactions
   * Handle Reactions
   */
  async setReactionRole(payload: IMessageReaction) {
    const { isBot, messageId, emoji, userId } = payload;

    if (isBot) return false;

    const reaction_role = await ReactionRole.findOne({ messageId });
    if (!reaction_role) return false;

    const emojiType = emoji.id ? 'guild' : 'standard';
    let role: any;

    if (emojiType === 'guild') {
      role = reaction_role.rolesMapping.find(
        (e: any) => e.emoji.id === emoji.id,
      );
    }

    if (emojiType === 'standard') {
      role = reaction_role.rolesMapping.find(
        (e: any) => e.emoji.standardEmoji === emoji.name,
      );
    }

    if (!role) return false;

    ///Add role to User
    return liveClient.roles.set(reaction_role.guildId, userId, role.roleId);
  }

  ///Handle Role React
  async removeReactionRole(guild: IMessageReaction) {
    const { emoji, isBot, messageId, userId } = guild;
    if (isBot) return false;

    const reaction_role = await ReactionRole.findOne({ messageId });
    if (!reaction_role) return false;

    const emojiType = emoji.id ? 'guild' : 'standard';
    let role;
    if (emojiType === 'guild') {
      role = reaction_role.rolesMapping.find(
        (e: any) => e.emoji.id === emoji.id,
      );
    }

    if (emojiType === 'standard') {
      role = reaction_role.rolesMapping.find(
        (e: any) => e.emoji.standardEmoji === emoji.name,
      );
    }

    if (!role) return false;

    ///Add role to User
    await liveClient.roles.remove(reaction_role.guildId, userId, role.roleId);
  }
}
