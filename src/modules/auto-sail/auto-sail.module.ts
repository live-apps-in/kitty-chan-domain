import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SharedModule } from 'src/common/services/shared.module';
import { AutoSailConfigService } from 'src/modules/auto-sail/auto-sail-config.service';
import { AutoSailConstraintsService } from 'src/modules/auto-sail/auto-sail-constraints.service';
import { AutoSailService } from 'src/modules/auto-sail/auto-sail.service';
import { AutoSailSchema } from 'src/modules/auto-sail/models/auto-sail.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'auto_sail', schema: AutoSailSchema }]),
    SharedModule,
  ],
  providers: [
    AutoSailService,
    AutoSailConfigService,
    AutoSailConstraintsService,
  ],
  exports: [AutoSailConfigService],
})
export class AutoSailModule {}
