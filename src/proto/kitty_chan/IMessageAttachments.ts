// Original file: src/proto/kitty_chan.proto

import type { Long } from '@grpc/proto-loader';

export interface IMessageAttachments {
  name?: string;
  id?: string;
  size?: number | string | Long;
  url?: string;
  proxyURL?: string;
  height?: number | string | Long;
  width?: number | string | Long;
  contentType?: string;
  description?: string;
  ephemeral?: boolean;
}

export interface IMessageAttachments__Output {
  name?: string;
  id?: string;
  size?: Long;
  url?: string;
  proxyURL?: string;
  height?: Long;
  width?: Long;
  contentType?: string;
  description?: string;
  ephemeral?: boolean;
}
