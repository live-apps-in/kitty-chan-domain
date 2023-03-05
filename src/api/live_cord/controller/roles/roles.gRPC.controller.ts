import { sendUnaryData, ServerUnaryCall } from '@grpc/grpc-js';
import { HelloRequest } from '../../../../proto/interface/kitty_chan';
import { HelloResponse } from '../../../../proto/kitty_chan/HelloResponse';
import { HelloWorldHandlers } from '../../../../proto/kitty_chan/HelloWorld';

/*
 Roles gRPC Controller 
 */
export class RolesGrpcController implements HelloWorldHandlers{
  [name: string]: any;

  hello(call: ServerUnaryCall<HelloRequest, HelloResponse>, callback: sendUnaryData<any>) {
  	const name = call.request.name;
  	const message = 'Hello, Jaga';
  	callback(null, { message });
  }
}