import { sendUnaryData, ServerUnaryCall } from '@grpc/grpc-js';
import { inject, injectable } from 'inversify';
import { NoResponse } from '../proto/kitty_chan/NoResponse';
import { CronServiceHandlers } from '../proto/kitty_chan/CronService';
import { CronService } from '../modules/cron/cron.service';
import { ICronCreate } from '../proto/kitty_chan/ICronCreate';

@injectable()
export class CronHandler implements CronServiceHandlers {
  [name: string]: any;

  constructor(@inject(CronService) private readonly cronService: CronService) {}

  /**Cron Create */
  async cronCreate(
    call: ServerUnaryCall<any, NoResponse>,
    callback: sendUnaryData<any>,
  ) {
    callback(null);

    const message = call.request as ICronCreate;

    await this.cronService.createCron(message);
  }

  async cronUpdate(
    call: ServerUnaryCall<any, NoResponse>,
    callback: sendUnaryData<any>,
  ) {
    callback(null);

    const message = call.request as ICronCreate;

    await this.cronService.updateCron(message);
  }

  async cronDelete(
    call: ServerUnaryCall<any, NoResponse>,
    callback: sendUnaryData<any>,
  ) {
    callback(null);

    const message = call.request as ICronCreate;

    await this.cronService.deleteCron(message.id);
  }
}
