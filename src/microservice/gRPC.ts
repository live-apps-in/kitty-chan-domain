import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

/**kitty chan Domain gRPC client config */
export const kittyChangRPCOptions: MicroserviceOptions = {
  transport: Transport.GRPC,
  options: {
    package: 'kitty_chan',
    protoPath: join(__dirname, '../proto/kitty_chan.proto'),
    url: process.env.GRPC_URL,
  },
};
