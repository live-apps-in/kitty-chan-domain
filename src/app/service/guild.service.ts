import { injectable } from 'inversify';
import { IGuild, IGuildMember } from '../interface/shared.interface';

@injectable()
export class GuildService{
	constructor() { }
    
	async syncNewMemberWithLiveCord(guild: IGuildMember) {
        
	}
}