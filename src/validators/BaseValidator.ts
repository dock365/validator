import { IValidationFailMessages } from '../const/validationFailMessages';
import IValidator from './IValidator';
import { IStringValidationOptions } from './IValidationOptions';

export default class BaseValidator {
  public baseValidation(
    field: string,
    value: any,
    options?: IStringValidationOptions,
    failMessages?: IValidationFailMessages,
  ) {
    return {
      messages: [],
      success: true,
    };
  }
}
