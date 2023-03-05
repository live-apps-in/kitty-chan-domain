FROM node:16-alpine
WORKDIR /usr/src/kittychan
COPY package.json .
RUN npm install -g typescript grpc-tools
RUN npm install
COPY . .
RUN tsc
CMD ["node","./dist/main.js"]