import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SharedModule } from 'src/common/services/shared.module';
import {
  Features,
  FeaturesSchema,
} from 'src/modules/features/model/features.model';
import { GuildService } from 'src/modules/guild/guild.service';
import { Guild, GuildSchema } from 'src/modules/guild/models/guild.model';
import { GuildRepository } from 'src/modules/guild/repository/guild.respository';
import { User, UserSchema } from 'src/modules/user/models/user.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Guild.name,
        schema: GuildSchema,
      },
      { name: User.name, schema: UserSchema },
      { name: Features.name, schema: FeaturesSchema },
    ]),
    SharedModule,
  ],
  providers: [GuildService, GuildRepository],
  exports: [GuildService, GuildRepository],
})
export class GuildModule {}
