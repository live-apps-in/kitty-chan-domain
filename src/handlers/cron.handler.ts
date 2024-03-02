import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { CronService } from 'src/modules/cron/cron.service';
import { ICronCreate } from 'src/modules/cron/interface/cron.interface';

@Controller()
export class CronController {
  constructor(@Inject(CronService) private readonly cronService: CronService) {}
  @GrpcMethod('CronService', 'cronCreate')
  async cronCreate(cron: ICronCreate) {
    await this.cronService.createCron(cron);
  }

  @GrpcMethod('CronService', 'cronUpdate')
  async cronUpdate(cron: ICronCreate) {
    await this.cronService.updateCron(cron);
  }

  @GrpcMethod('CronService', 'cronDelete')
  async cronDelete(cron: ICronCreate) {
    await this.cronService.deleteCron(cron.id);
  }
}
