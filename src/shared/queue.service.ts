import amqp from 'amqplib';
import { injectable } from 'inversify';


const rabbitURL = 'amqp://queue.jaga.live?heartbeat=30';
const RABBIT_USER = process.env.RABBIT_USER;
const RABBIT_PASS = process.env.RABBIT_PASS;
const opt = { credentials: require('amqplib').credentials.plain(RABBIT_USER, RABBIT_PASS) };


@injectable()
export class QueueService{
    
	async sendToQueue(payload: any, queue: string) {
		const connection = await amqp.connect(rabbitURL, opt);
		const channel = await connection.createChannel();
		channel.assertQueue(queue);
		
		///Create buffer from payload
		payload = Buffer.from(JSON.stringify(payload));

		///Send To Queue
		channel.sendToQueue(queue, payload, {
			contentType: 'application/json',
		});
	}
}