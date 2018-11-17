import { IValidationFailMessages } from '../const/validationFailMessages';
import validationTypes from '../const/validationTypes';
import validationMessage from '../libs/validationMessage';
import BaseValidator from './BaseValidator';
import IValidator, { IValidationResponse } from './IValidator';
import { IStringValidationOptions, IEmailValidationOptions } from './IValidationOptions';

export default class EmailValidator extends BaseValidator implements IValidator {

  private validationFailMessages: IValidationFailMessages = {};

  constructor(validationFailMessages: IValidationFailMessages) {
    super();
    this.validationFailMessages = validationFailMessages;
  }

  public validate(
    field: string,
    value: any,
    options?: IEmailValidationOptions,
    failMessages?: IValidationFailMessages,
  ): IValidationResponse {
    const response: IValidationResponse = {
      messages: [],
      success: true,
    };

    const regEx: RegExp = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;

    if (!regEx.test(value)) {
      response.success = false;
      response.messages.push(validationMessage(
        failMessages && failMessages.type || this.validationFailMessages.type,
        { field, type: validationTypes.Email, value },
      ));
    }

    if (!options) {
      return response;
    }

    if (options.required !== undefined && options.required && !value) {
      response.success = false;
      response.messages.push(validationMessage(
        failMessages && failMessages.required || this.validationFailMessages.required,
        { field, type: validationTypes.Email, value },
      ));
    }

    if (options.extension) {
      const emailArray = value.split('@');
      if (emailArray[1] !== options.extension) {
        response.success = false;
        response.messages.push(validationMessage(
          failMessages && failMessages.extension || this.validationFailMessages.extension,
          { field, type: validationTypes.Email, value },
        ));
      }
    }
    return response;
  }
}
