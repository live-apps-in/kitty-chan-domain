import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { HelloWorldClient as _kitty_chan_HelloWorldClient, HelloWorldDefinition as _kitty_chan_HelloWorldDefinition } from './kitty_chan/HelloWorld';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  kitty_chan: {
    HelloRequest: MessageTypeDefinition
    HelloResponse: MessageTypeDefinition
    HelloWorld: SubtypeConstructor<typeof grpc.Client, _kitty_chan_HelloWorldClient> & { service: _kitty_chan_HelloWorldDefinition }
  }
}

