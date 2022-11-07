import { VALORANT_ROLE_ID } from '../data/id';
import { IGuild } from '../interface/shared.interface';

export const RANK_MESSAGES = {
	invalid_rank: ` PleasE enter a valid VALORANT rank!\nYou can use one of these: Unranked, Iron, Bronze, Silver, Gold, Platinum, Diamond, Ascendant, Immortal, Radiant\n
    Here's a valid Rank Role command ----- @kitty chan rank platinum`,

	after_setRank: 'I have updated your VALORANT Rank. Check your new Role ;)'
};

export const find_valo_unranked_template = (guild: IGuild) => {
	return `<@&${VALORANT_ROLE_ID}> Hello, <@${guild.userId}> wants to play VALORANT now!`;
};