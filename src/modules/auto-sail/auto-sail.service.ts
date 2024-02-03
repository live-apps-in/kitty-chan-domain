import { inject, injectable } from 'inversify';
import { AutoSailConfigDto } from './dto/auto-sail-config.dto';
import { TYPES } from '../../core/inversify.types';
import { DiscordActionService } from '../../common/services/discord-action.service';
import { AutoSailConstraintsService } from './auto-sail-constraints.service';
import AutoSailModel from './model/auto-sail.model';

@injectable()
export class AutoSailService {
  constructor(
    @inject(TYPES.DiscordActionService)
    private readonly discordActionService: DiscordActionService,
    @inject(TYPES.AutoSailConstraintsService)
    private readonly autoSailConstraintsService: AutoSailConstraintsService,
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
    const autoSail = await AutoSailModel.findOne({
      'config.cronConfig.cronRefId': id.toString(),
    });

    if (!autoSail) {
      return false;
    }

    await this.discordActionService.process(autoSail.config.actionConfig);
  }
}
