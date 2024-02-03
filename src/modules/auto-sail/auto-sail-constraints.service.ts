import { injectable } from 'inversify';
import { AutoSailConfigDto } from './dto/auto-sail-config.dto';
import { AutoSailConstraintsDto } from './dto/auto-sail-constraints.dto';
import { AutoSailConstraintsTypeMapping } from './mappings/auto-sail-constraints.mapping';

@injectable()
export class AutoSailConstraintsService {
  public validateConstraints(
    { constraints }: AutoSailConfigDto,
    triggerEvent: string,
    payload: any,
  ) {
    let isValid = false;

    for (const constraint of constraints) {
      const conditionTypeKey = AutoSailConstraintsTypeMapping[constraint.type];

      isValid = this[`${conditionTypeKey}Validation`](
        constraint,
        triggerEvent,
        payload,
      );

      if (!isValid) {
        break;
      }
    }

    return isValid;
  }

  private textValidation(
    constraint: AutoSailConstraintsDto,
    triggerEvent: any,
    payload: any,
  ) {
    for (const condition of constraint.conditions as any[]) {
      for (const key of Object.keys(condition)) {
        switch (key) {
          case 'equal':
          case 'notEqual': {
            const configValue = condition[key]?.value;
            const payloadValue = payload[constraint.type];

            if (
              (key === 'equal' && configValue?.includes(payloadValue)) ||
              (key === 'notEqual' && !configValue?.includes(payloadValue))
            ) {
              return true;
            }

            return false;
          }
        }
      }
    }
  }

  private dateValidation(
    constraint: AutoSailConstraintsDto,
    triggerEvent: any,
    payload: any,
  ) {
    for (const condition of constraint.conditions as any[]) {
      for (const key of Object.keys(condition)) {
        switch (key) {
          case 'gt':
          case 'lt': {
            const configIsoTime = new Date(condition[key]?.value);
            let targetIsoTime = new Date(payload[constraint.type]);

            /**If value for constraint type is not available, current date is used */
            targetIsoTime = isNaN(targetIsoTime.getTime())
              ? new Date()
              : targetIsoTime;

            if (
              isNaN(configIsoTime.getTime()) ||
              isNaN(targetIsoTime.getTime())
            ) {
              return false;
            }

            if (
              (key === 'gt' &&
                targetIsoTime.getTime() > configIsoTime.getTime()) ||
              (key === 'lt' &&
                targetIsoTime.getTime() < configIsoTime.getTime())
            ) {
              return true;
            }

            return false;
          }
        }
      }
    }
  }
}
