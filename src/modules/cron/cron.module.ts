import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SharedModule } from 'src/common/services/shared.module';
import { AutoSailModule } from 'src/modules/auto-sail/auto-sail.module';
import { CronService } from 'src/modules/cron/cron.service';
import { Cron, CronSchema } from 'src/modules/cron/models/cron.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Cron.name, schema: CronSchema }]),
    AutoSailModule,
    SharedModule,
  ],
  providers: [CronService],
  exports: [CronService],
})
export class CronModule {}
