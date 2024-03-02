import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SharedModule } from 'src/common/services/shared.module';
import { ReactionRolesSchema } from 'src/modules/roles/models/reaction_roles.model';
import { ReactionRolesService } from 'src/modules/roles/reaction-roles.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'reaction_roles', schema: ReactionRolesSchema },
    ]),
    SharedModule,
  ],
  providers: [ReactionRolesService],
  exports: [ReactionRolesService],
})
export class RolesModule {}
