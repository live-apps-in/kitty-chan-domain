import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import { RolesGrpcController } from '../../api/live_cord/controller/roles/roles.gRPC.controller';
import { RolesAPIService } from '../../api/live_cord/service/roles/roles.service';
import container from '../../core/inversify.di';
import { TYPES } from '../../core/inversify.types';
import { ProtoGrpcType } from '../../proto/kitty_chan';

/**
 * Load Proto
 */
const PROTO_FILE = './src/proto/kitty_chan.proto';
const packageDefinition = protoLoader.loadSync(PROTO_FILE);
const proto = (grpc.loadPackageDefinition(packageDefinition) as unknown) as ProtoGrpcType;

/**
 * gRPC Controller
 */
const rolesApiService = container.get<RolesAPIService>(TYPES.RolesAPIService);
const rolesGrpcController = new RolesGrpcController(rolesApiService);

/**
 * gRPC Server Config
function middleware(call: grpc.ServerUnaryCall<any, any>, callback: grpc.sendUnaryData<any>, next: () => void) {
  const metadata = call.metadata.getMap();
  // Access metadata headers here
  console.log(metadata);

  // Proceed with the request
  next();
}
 */
const gRpcServer = new grpc.Server();
gRpcServer.addService(proto.kitty_chan.ReactionRoleService.service, rolesGrpcController);


gRpcServer.bindAsync(process.env.GRPC_URL, grpc.ServerCredentials.createInsecure(), (err, port) => {
	if (err) {
		console.error(`Failed to start gRPC server: ${err}`);
		return;
	}
	console.log(`gRPC Server listening on port ${port}`);
	gRpcServer.start();
});


