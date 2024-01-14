import { injectable } from 'inversify';
import { ICronCreate } from '../../proto/kitty_chan/ICronCreate';
import { schedule } from 'node-cron';

@injectable()
export class CronService {
  async createCron({ id, expression }: ICronCreate) {
    schedule(expression, async () => {
      await this.handle(id);
    });
  }

  private async handle(id: string) {
    console.log('Cron Trigger: ' + id);
  }
}
