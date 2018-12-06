import { IValidationFailMessages } from '../const/validationFailMessages';
import { validationTypes } from '../const/validationTypes';
import validationMessage from '../libs/validationMessage';
import BaseValidator from './BaseValidator';
import IValidator, { IValidationResponse } from './IValidator';
import { IDateValidationOptions } from './IValidationOptions';

export default class DateValidator extends BaseValidator implements IValidator {

  private validationFailMessages: IValidationFailMessages = {};

  constructor(validationFailMessages: IValidationFailMessages) {
    super();
    this.validationFailMessages = validationFailMessages;
  }

  public validate(
    field: string,
    value: any,
    options?: IDateValidationOptions,
    failMessages?: IValidationFailMessages,
  ): IValidationResponse {
    const response: IValidationResponse = {
      messages: [],
      success: true,
    };

    if (value && (value) instanceof Date !== true) {
      response.success = false;
      response.messages.push(validationMessage(
        failMessages && failMessages.type || this.validationFailMessages.type,
        { field, type: validationTypes.Date, value },
      ));
    }

    if (!options) {
      return response;
    }

    if (options.required !== undefined && options.required && !value) {
      response.success = false;
      response.messages.push(validationMessage(
        failMessages && failMessages.required || this.validationFailMessages.required,
        { field, type: validationTypes.Date, value },
      ));
    }

    if (options.before && value > options.before) {
      response.success = false;
      response.messages.push(validationMessage(
        failMessages && failMessages.before || this.validationFailMessages.before,
        { field, type: validationTypes.Date, before: `${options.before}` },
      ));
    }

    if (options.after && value < options.after) {
      response.success = false;
      response.messages.push(validationMessage(
        failMessages && failMessages.after || this.validationFailMessages.after,
        { field, type: validationTypes.Date, after: `${options.after}` },
      ));
    }

    return response;
  }
}
