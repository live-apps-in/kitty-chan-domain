// Original file: src/proto/kitty_chan.proto

export interface IMessageAttachments {
  name?: string;
  id?: string;
  size?: number;
  url?: string;
  proxyURL?: string;
  height?: number;
  width?: number;
  contentType?: string;
  description?: string;
  ephemeral?: boolean;
}

export interface IMessageAttachments__Output {
  name?: string;
  id?: string;
  size?: number;
  url?: string;
  proxyURL?: string;
  height?: number;
  width?: number;
  contentType?: string;
  description?: string;
  ephemeral?: boolean;
}
