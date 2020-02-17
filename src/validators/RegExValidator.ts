import { IValidationFailMessages } from '../const/validationFailMessages';
import { validationTypes } from '../const/validationTypes';
import validationMessage from '../libs/validationMessage';
import BaseValidator from './BaseValidator';
import IValidator, { IValidationResponse } from './IValidator';
import { IRegExValidationOptions } from './IValidationOptions';

export default class RegExValidator extends BaseValidator implements IValidator {

  private validationFailMessages: IValidationFailMessages = {};

  constructor(validationFailMessages: IValidationFailMessages) {
    super();
    this.validationFailMessages = validationFailMessages;
  }

  public validate(
    field: string,
    value: any,
    options?: IRegExValidationOptions,
    failMessages?: IValidationFailMessages,
  ): IValidationResponse {
    const response: IValidationResponse = {
      messages: [],
      success: true,
    };

    if (!options) {
      return response;
    }

    if (options.required !== undefined && options.required && !value) {
      response.success = false;
      response.messages.push(validationMessage(
        failMessages && failMessages.required || this.validationFailMessages.required,
        { field, type: validationTypes.RegEx, regEx: `${options.regEx}`, value },
      ));
    }

    if (value && options.regEx && !options.regEx.test(value)) {
      response.success = false;
      response.messages.push(validationMessage(
        failMessages && failMessages.regEx || this.validationFailMessages.regEx,
        { field, type: validationTypes.RegEx, regEx: `${options.regEx}`,  value },
      ));
    }

    return response;
  }
}
