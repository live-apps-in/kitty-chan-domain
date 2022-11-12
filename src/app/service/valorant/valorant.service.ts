import { injectable } from 'inversify';
import { VALORANT_RANK, VALORANT_RANK_MATCH, VALORANT_RANK_ROLES } from '../../data/valorant/valorant_ranks';
import { IGuild } from '../../interface/shared.interface';


@injectable()
export class ValorantService{
	constructor() { }
    
	async matchmaking(guild: IGuild): Promise<any> {
		const userRoles = guild.payload.member.roles.cache;

		///Check current role of user
		let currentRank: string;
		VALORANT_RANK.map(rank => {
			if (userRoles.some(role => (role.name).split('-')[0] === rank)) {
				currentRank = rank;
			}
			return;
		});

		const allowedRanks = VALORANT_RANK_MATCH[currentRank];
		let rolesString = '';

		allowedRanks.map(rank => {
			rolesString += `<@&${VALORANT_RANK_ROLES[rank]}> `;
		});

		return {
			currentRank,
			allowedRanks,
			allowedRoleString: rolesString
		};
	}
}