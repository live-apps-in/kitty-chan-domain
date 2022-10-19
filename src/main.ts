import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import { InversifyExpressServer } from 'inversify-express-utils';
import 'reflect-metadata';
import container from './core/inversify.di';
import { App } from './app/app';
import { TYPES } from './core/inversify.types';


const server = new InversifyExpressServer(container);
server.setConfig((app) => {
	app.use(express.json());
	app.use(cors());
});

async function bootstrap() {
	const _app = container.get<App>(TYPES.App);
	_app.start();
    
}

bootstrap();
const app = server.build();
app.listen(process.env.PORT || 5000, () => {
	console.log('App Started');
});