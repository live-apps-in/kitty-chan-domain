import { sendUnaryData, ServerUnaryCall } from '@grpc/grpc-js';
import { GetAllUserGuildReq } from '../../../../proto/kitty_chan/GetAllUserGuildReq';
import { GetAllUserGuildRes } from '../../../../proto/kitty_chan/GetAllUserGuildRes';
import { GuildServiceHandlers } from '../../../../proto/kitty_chan/GuildService';

export class GuildGrpcController implements GuildServiceHandlers {
  [name: string]: any;

  async getAllUserGuilds(
    call: ServerUnaryCall<GetAllUserGuildReq, GetAllUserGuildRes>,
    callback: sendUnaryData<any>,
  ) {
    console.log(call.request);
    return callback(null, { name: call.request.discordId });
  }
}
