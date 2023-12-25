import { inject, injectable } from 'inversify';
import { AutoSailConfigDto } from './dto/auto-sail-config.dto';
import { AutoSailConstraintsDto } from './dto/auto-sail-constraints.dto';
import { AutoSailDynamicFieldsMapping } from './mappings/auto-sail-constraints.mapping';
import { TYPES } from '../../core/inversify.types';
import { DiscordActionService } from '../../common/services/discord-action.service';
import { DiscordActions } from '../../common/enum/discord-action.enum';

@injectable()
export class AutoSailService {
  constructor(
    @inject(TYPES.DiscordActionService)
    private readonly discordActionService: DiscordActionService,
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
      if (!this.validateConstraints(config, triggerEvent, payload)) {
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

  private validateConstraints(
    { constraints }: AutoSailConfigDto,
    triggerEvent: string,
    payload: any,
  ) {
    let isValid = false;

    for (const constraint of constraints) {
      isValid = this.validateCondition(constraint, triggerEvent, payload);

      if (!isValid) {
        break;
      }
    }

    return isValid;
  }

  private validateCondition(
    constraints: AutoSailConstraintsDto,
    triggerEvent: string,
    payload: any,
  ) {
    for (const condition of constraints.conditions as any[]) {
      for (const key of Object.keys(condition)) {
        switch (key) {
          case 'text_equal':
          case 'text_not_equal': {
            const configValue = condition[key]?.value;
            const payloadValue =
              payload[
                AutoSailDynamicFieldsMapping?.[triggerEvent]?.[constraints.type]
              ];

            if (
              (key === 'text_equal' && configValue?.includes(payloadValue)) ||
              (key === 'text_not_equal' && !configValue?.includes(payloadValue))
            ) {
              return true;
            }

            return false;
          }

          case 'time_gt':
          case 'time_lt': {
            const configIsoTime = new Date(condition[key]?.value);
            const targetIsoTime = new Date(
              payload[
                AutoSailDynamicFieldsMapping?.[triggerEvent]?.[constraints.type]
              ],
            );

            if (
              isNaN(configIsoTime.getTime()) ||
              isNaN(targetIsoTime.getTime())
            ) {
              return false;
            }

            if (
              (key === 'time_gt' &&
                targetIsoTime.getTime() > configIsoTime.getTime()) ||
              (key === 'time_lt' &&
                targetIsoTime.getTime() < configIsoTime.getTime())
            ) {
              return true;
            }

            return false;
          }

          case 'user_equal':
          case 'user_not_equal': {
            const configUserId = condition[key]?.value;
            const targetUserId =
              payload[
                AutoSailDynamicFieldsMapping?.[triggerEvent]?.[constraints.type]
              ];

            if (
              (key === 'user_equal' && configUserId?.includes(targetUserId)) ||
              (key === 'user_not_equal' &&
                !configUserId?.includes(targetUserId))
            ) {
              return true;
            }

            return false;
          }
        }
      }
    }

    return false;
  }
}
