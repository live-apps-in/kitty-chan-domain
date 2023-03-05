import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import { RolesGrpcController } from '../../api/live_cord/controller/roles/roles.gRPC.controller';
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
const rolesGrpcController = new RolesGrpcController();

/**
 * gRPC Server Config
 */
const gRpcServer = new grpc.Server();
gRpcServer.addService(proto.kitty_chan.HelloWorld.service, rolesGrpcController);

gRpcServer.bindAsync(process.env.GRPC_URL, grpc.ServerCredentials.createInsecure(), (err, port) => {
	if (err) {
		console.error(`Failed to start gRPC server: ${err}`);
		return;
	}
	console.log(`gRPC Server listening on port ${port}`);
	gRpcServer.start();
});
