import 'reflect-metadata';
import container from '../../core/inversify.di';
import { TYPES } from '../../core/inversify.types';
import { VALORANT_ROLE_ID } from '../data/id';
import { IGuild } from '../interface/shared.interface';
import { ValorantService } from '../service/valorant/valorant.service';

export const RANK_MESSAGES = {
  invalid_rank: ` Please enter a valid VALORANT rank!\nYou can use one of these: Unranked, Iron, Bronze, Silver, Gold, Platinum, Diamond, Ascendant, Immortal, Radiant\n
    Here's a valid Rank Role command ----- @kitty chan rank platinum`,

  after_setRank: 'I have updated your VALORANT Rank. Check your new Role ;)',
};

export const find_valo_unranked_template = (guild: IGuild) => {
  return `Hello, <@${guild.userId}> wants to play VALORANT now!`;
};

export const find_valo_comp_template = async (guild: IGuild) => {
  const getMatch = await container
    .get<ValorantService>(TYPES.ValorantService)
    .matchmaking(guild);
  const { currentRank, allowedRoleString } = getMatch;

  return `<@&${VALORANT_ROLE_ID}> Hello, <@${guild.userId}> wants to play VALORANT Competitive [${currentRank}] now!\nI'll tag suitable matching players ${allowedRoleString}`;
};
