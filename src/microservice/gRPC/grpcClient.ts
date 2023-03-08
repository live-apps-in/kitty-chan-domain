import * as grpc from '@grpc/grpc-js';
import { loadSync } from '@grpc/proto-loader';
import { ProtoGrpcType } from '../../proto/kitty_chan';

const PROTO_PATH = './src/proto/kitty_chan.proto'; // replace with your own proto file path
const packageDefinition = loadSync(PROTO_PATH);
const proto = (grpc.loadPackageDefinition(packageDefinition) as unknown) as ProtoGrpcType;


export const kittyClient = new proto.kitty_chan.ReactionRoleService('localhost:5030', grpc.credentials.createInsecure());
