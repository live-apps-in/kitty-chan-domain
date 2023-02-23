import { inject, injectable } from 'inversify';
import { RolesService } from '../../../../app/service/roles/roles.service';
import { HttpException } from '../../../../core/exception';
import { TYPES } from '../../../../core/inversify.types';
import { ReactionRoleActions } from '../../enum/roles.enum';
import { ReactionRolesActionDto } from '../../_dto/roles.dto';


@injectable()
export class RolesAPIService{
	constructor(
		@inject(TYPES.RolesService) private readonly roleService: RolesService
	) { }

	async reactionRoleFactory(dto: ReactionRolesActionDto) {
		const { action } = dto;
		
		switch (action) {
		case ReactionRoleActions.SET:
			return await this.roleService.createReactionRole(dto);
		case ReactionRoleActions.PATCH:
			return await this.roleService.updateReactionRole(dto);
		case ReactionRoleActions.DELETE:
			return await this.roleService.deleteReactionRole(dto);
		default:
			throw new HttpException('Invalid Reaction Role Action', 400);
		}

	}
    
}