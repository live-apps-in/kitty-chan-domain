FROM node:16-alpine
WORKDIR /usr/src/kittychan
COPY package.json .
RUN npm install -g typescript cpx
RUN npm install
COPY . .
RUN tsc
RUN npm run build:proto
CMD ["node","./dist/main.js"]