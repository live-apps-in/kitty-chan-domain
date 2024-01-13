import 'reflect-metadata';
import express from 'express';
import 'reflect-metadata';
import container from './core/inversify.di';
import { App } from './modules/app';
import { TYPES } from './core/inversify.types';
import './database/mongo';
import { createServer } from 'http';
import { Server } from 'socket.io';
import './microservice/gRPC/gRPC.config';
import './core/exception';

async function bootstrap() {
  const _app = container.get<App>(TYPES.App);
  _app.start();
}

bootstrap();
const app = express();

/* Use http server for Web Sockets */
const httpServer = createServer(app);
httpServer.listen(process.env.PORT || 5000, () => {
  console.log('App Started');
});

const io = new Server(httpServer, {
  cors: {
    origin: '*',
  },
});

io.on('connection', () => {
  console.log('Connected to Socket');
});

export default io;
