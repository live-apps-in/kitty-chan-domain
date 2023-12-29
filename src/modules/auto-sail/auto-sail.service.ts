import { inject, injectable } from 'inversify';
import { AutoSailConfigDto } from './dto/auto-sail-config.dto';
import { TYPES } from '../../core/inversify.types';
import { DiscordActionService } from '../../common/services/discord-action.service';
import { DiscordActions } from '../../common/enum/discord-action.enum';
import { AutoSailConstraintsService } from './auto-sail-constraints.service';

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

      for (const action of config.actionConfig) {
        await this.discordActionService.actionFactory(
          action.action as DiscordActions,
          payload,
          action.messageConfig,
        );
      }
    }
  }
}
