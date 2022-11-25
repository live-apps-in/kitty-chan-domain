import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import { InversifyExpressServer } from 'inversify-express-utils';
import 'reflect-metadata';
import container from './core/inversify.di';
import { App } from './app/app';
import { TYPES } from './core/inversify.types';
import * as hbs from 'express-handlebars';
import path from 'path';
import './database/mongo';

const server = new InversifyExpressServer(container);
server.setConfig((app) => {
	app.use(express.json());
	app.use(cors());

	// Register `hbs.engine` with the Express app.
	app.engine('.hbs', hbs.engine({
		extname: '.hbs',
		defaultLayout: false,
		layoutsDir: path.join(__dirname,'../views')
	}));
	app.set('view engine', '.hbs');
});

async function bootstrap() {
	//Start App
	const _app = container.get<App>(TYPES.App);
	_app.start();
}

bootstrap();
const app = server.build();
app.listen(process.env.PORT || 5000, () => {
	console.log('App Started');
});


/////* PUBLIC PAGES *//////
app.get('/privacy-policy', (req,res) => {
	res.render('privacy-policy.hbs');
});