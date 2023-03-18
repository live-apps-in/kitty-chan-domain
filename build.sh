#!/bin/bash
npx proto-loader-gen-types --grpcLib=@grpc/grpc-js --outDir=./src/proto/ ./src/proto/kitty_chan.proto
npx cpx "./src/proto/*.proto" ./dist/proto