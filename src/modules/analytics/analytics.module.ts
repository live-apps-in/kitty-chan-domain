import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SharedModule } from 'src/common/services/shared.module';
import { AnalyticsService } from 'src/modules/analytics/analytics.service';
import { MemberLogSchema } from 'src/modules/analytics/models/member_log.model';
import { MessageLogSchema } from 'src/modules/analytics/models/message_log.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'message_logs', schema: MessageLogSchema },
      { name: 'member_logs', schema: MemberLogSchema },
    ]),
    SharedModule,
  ],
  providers: [AnalyticsService],
  exports: [AnalyticsService],
})
export class AnalyticsModule {}
