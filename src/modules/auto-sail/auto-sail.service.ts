import { injectable } from 'inversify';
import { AutoSailConfigDto } from './dto/auto-sail-config.dto';
import { AutoSailConstraintsType } from './enum/auto-sail-constraints-type.enum';
import { AutoSailConstraintsDto } from './dto/auto-sail-constraints.dto';
import { AutoSailConstraintsMapping } from './mappings/auto-sail-constraints.mapping';

@injectable()
export class AutoSailService {
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
    }
  }

  private async validateConstraints(
    { constraints }: AutoSailConfigDto,
    triggerEvent: string,
    payload: any,
  ) {
    let isValid = false;

    for (const constraint of constraints) {
      switch (constraint.type) {
        case AutoSailConstraintsType.MESSAGE: {
          isValid = this.validateCondition(constraint, triggerEvent, payload);

          break;
        }

        default:
          break;
      }
    }

    if (!isValid) {
      return false;
    }
  }

  private validateCondition(
    constraints: AutoSailConstraintsDto,
    triggerEvent: string,
    payload: any,
  ) {
    for (const condition of constraints.conditions as any[]) {
      for (const key of Object.keys(condition)) {
        switch (key) {
          case 'equals': {
            if (
              condition.equals?.value?.includes(
                payload[
                  AutoSailConstraintsMapping?.[triggerEvent]?.[constraints.type]
                ],
              )
            ) {
              return true;
            }

            return false;
          }

          case 'notEquals': {
            if (
              !condition.notEquals?.value?.includes(
                payload[
                  AutoSailConstraintsMapping?.[triggerEvent]?.[constraints.type]
                ],
              )
            ) {
              return true;
            }

            return false;
          }

          default:
            break;
        }
      }
    }

    return false;
  }
}
