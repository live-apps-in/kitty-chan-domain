FROM node:16-alpine
WORKDIR /usr/src/kittychan_domain
COPY package.json .
RUN npm install -g typescript cpx
RUN npm install
COPY . .
RUN tsc
RUN npm run build:proto
CMD ["node","./dist/main.js"]
EXPOSE 5030