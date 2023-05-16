import amqp from 'amqplib';
import { injectable } from 'inversify';

@injectable()
export class QueueService {
  private rabbitURL = 'amqp://queue.jaga.live?heartbeat=30';
  private RABBIT_USER = process.env.RABBIT_USER;
  private RABBIT_PASS = process.env.RABBIT_PASS;
  private RABBIT_OPT = {
    credentials: require('amqplib').credentials.plain(
      this.RABBIT_USER,
      this.RABBIT_PASS,
    ),
  };

  async sendToQueue(payload: any, queue: string) {
    const connection = await amqp.connect(this.rabbitURL, this.RABBIT_OPT);
    const channel = await connection.createChannel();
    channel.assertQueue(queue);

    ///Create buffer from payload
    payload = Buffer.from(JSON.stringify(payload));

    ///Send To Queue
    channel.sendToQueue(queue, payload, {
      contentType: 'application/json',
    });
  }

  async consumeFromQueue(queue: string, callback: (message: any) => void) {
    try {
      const connection = await amqp.connect(this.rabbitURL, this.RABBIT_OPT);
      const channel = await connection.createChannel();
      await channel.assertQueue(queue);

      channel.consume(queue, (msg) => {
        if (msg) {
          const message = JSON.parse(msg.content.toString());
          callback(message);
          channel.ack(msg); // Acknowledge the message
        }
      });
    } catch (error) {
      console.error(
        'Error occurred while consuming messages from queue:',
        error,
      );
    }
  }

  async ping(queue: string): Promise<boolean> {
    return new Promise<boolean>(async (resolve) => {
      const pingMessage = 'Ping!';
      await this.sendToQueue(pingMessage, queue);

      const pongCallback = () => {
        resolve(true);
      };

      const timeoutDuration = 5000; // milliseconds
      const timeout = setTimeout(() => {
        resolve(false);
      }, timeoutDuration);

      await this.consumeFromQueue(queue, pongCallback);

      //Delete Channel
      const connection = await amqp.connect(this.rabbitURL, this.RABBIT_OPT);
      const deleteChannel = await connection.createChannel();
      await deleteChannel.deleteQueue(queue);

      clearTimeout(timeout);
    });
  }
}
