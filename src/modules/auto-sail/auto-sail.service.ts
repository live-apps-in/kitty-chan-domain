import { AutoSailConfigDto } from './dto/auto-sail-config.dto';
import { DiscordActionService } from '../../common/services/discord-action.service';
import { AutoSailConstraintsService } from './auto-sail-constraints.service';
import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AutoSail } from 'src/modules/auto-sail/models/auto-sail.model';
import { Model } from 'mongoose';

@Injectable()
export class AutoSailService {
  constructor(
    @Inject(DiscordActionService)
    private readonly discordActionService: DiscordActionService,
    @Inject(AutoSailConstraintsService)
    private readonly autoSailConstraintsService: AutoSailConstraintsService,
    @InjectModel('auto_sail') private readonly autoSailModel: Model<AutoSail>,
  ) {}

  async automate(
    payload: any,
    triggerEvent: string,
    autoSailConfig: AutoSailConfigDto[],
  ) {
    /**Filter out configs matching the current event */
    const filterConfig = autoSailConfig.filter(
      (config) => config.triggerEvent === triggerEvent,
    );

    if (!filterConfig.length) {
      return false;
    }

    for (const config of filterConfig) {
      if (
        !this.autoSailConstraintsService.validateConstraints(
          config,
          triggerEvent,
          payload,
        )
      ) {
        continue;
      }

      for (const actionConfig of config.actionConfig as any) {
        actionConfig.messageConfig.channelId = payload.channelId;
        actionConfig.messageConfig.messageId = payload.messageId;
      }

      await this.discordActionService.process(config.actionConfig);
    }
  }

  async handleCron(id: string) {
    const autoSail = await this.autoSailModel.findOne({
      'config.cronConfig.cronRefId': id.toString(),
    });

    if (!autoSail) {
      return false;
    }

    await this.discordActionService.process(autoSail.config.actionConfig);
  }
}
