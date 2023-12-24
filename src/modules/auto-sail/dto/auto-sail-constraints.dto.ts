import { IValueCase } from '../../../common/interface/value-case.interface';
import { AutoSailConstraintsType } from '../enum/auto-sail-constraints-type.enum';

export class AutoSailConstraintsDto {
  type: AutoSailConstraintsType;
  conditions: AutoSailConditionDto[];
}

interface MessageConditionDTO {
  equals?: IValueCase;
  notEquals?: IValueCase;
}

interface TimeConditionDTO {
  equals?: IValueCase;
  greaterThan?: IValueCase;
  lessThan?: IValueCase;
}

type AutoSailConditionDto = MessageConditionDTO | TimeConditionDTO;
