import { injectable } from 'inversify';
import { ICronCreate } from '../../proto/kitty_chan/ICronCreate';
import { CronJob, Task, ToadScheduler } from 'toad-scheduler';

@injectable()
export class CronService {
  private scheduler: ToadScheduler;

  constructor() {
    this.scheduler = new ToadScheduler();
  }

  async createCron({ id, expression }: ICronCreate) {
    const task = new Task('cron', async () => {
      await this.handle(id);
    });

    const job = new CronJob({ cronExpression: expression }, task, { id });

    this.scheduler.addCronJob(job);
  }

  async updateCron({ id, expression }: ICronCreate) {
    this.deleteCron(id);
    this.createCron({ id, expression });
  }

  async deleteCron(id: string) {
    this.scheduler.removeById(id);
  }

  private async handle(id: string) {
    console.log('Cron Trigger: ' + id);
  }
}
