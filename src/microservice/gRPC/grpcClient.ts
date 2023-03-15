import * as grpc from '@grpc/grpc-js';
import { loadSync } from '@grpc/proto-loader';
import { ProtoGrpcType } from '../../proto/live_cord';
import 'dotenv/config';
import { join } from 'path'

const PROTO_PATH = join(__dirname, '../../proto/live_cord.proto') ; // replace with your own proto file path
const packageDefinition = loadSync(PROTO_PATH);
const proto = (grpc.loadPackageDefinition(packageDefinition) as unknown) as ProtoGrpcType;


export const liveCordgRPC = new proto.live_cord.GuildService(process.env.LIVE_CORD_GRPC_URL, grpc.credentials.createInsecure());
