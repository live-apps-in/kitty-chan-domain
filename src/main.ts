import 'reflect-metadata';
import express, {Request, Response, NextFunction} from 'express';
import cors from 'cors';
import { InversifyExpressServer } from 'inversify-express-utils';
import 'reflect-metadata';
import container from './core/inversify.di';
import { App } from './app/app';
import { TYPES } from './core/inversify.types';
import * as hbs from 'express-handlebars';
import path from 'path';
import './database/mongo';
import { HttpException, ValidationException } from './core/exception';
import { createServer } from 'http';
import './infrastructure/sockets';
import { Server } from 'socket.io';

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

	app.use(express.static(path.join(__dirname, '../client/build')));
});

///Server React Build

////Global Error Config
server.setErrorConfig((app) => {
	app.use((err: any, req: Request, res: Response, next: NextFunction) => {

		if (err instanceof HttpException) {
			res.status(err.statusCode).json({ error: err.message });
		} else if (err instanceof ValidationException) {
			res.status(err.statusCode).json({ error: 'Validation Exception', errorInfo: err.error});
		}
		else {
			console.log(err);
			res.status(500).json({ error: 'Internal Server Exception' });
		}
	});
});

async function bootstrap() {
	//Start App
	const _app = container.get<App>(TYPES.App);
	_app.start();
}

bootstrap();
const app = server.build();

//Use http server for Web Sockets
const httpServer = createServer(app);	
httpServer.listen(process.env.PORT || 5000, () => {
	console.log('App Started');
});


const io = new Server(httpServer, {
	cors: {
		origin: '*'
	}
});

io.on('connection', (socket) => {
	console.log('Connected to Socket');
 		socket.emit('messageCount', {count: 12});
});

/////* PUBLIC PAGES *//////
app.get('/privacy-policy', (req,res) => {
	res.render('privacy-policy.hbs');
});

export default io;