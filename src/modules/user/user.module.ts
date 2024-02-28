import { User } from '@live-apps/discord/lib/modules/users/user';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/modules/user/models/user.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [],
  exports: [],
})
export class UserModule {}
