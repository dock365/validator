import { IValidationFailMessages } from '../const/validationFailMessages';
import { validationTypes } from '../const/validationTypes';
import validationMessage from '../libs/validationMessage';
import BaseValidator from './BaseValidator';
import IValidator, { IValidationResponse } from './IValidator';
import { IArrayValidationOptions } from './IValidationOptions';

export default class ArrayValidator extends BaseValidator implements IValidator {

  private validationFailMessages: IValidationFailMessages = {};

  constructor(validationFailMessages: IValidationFailMessages) {
    super();
    this.validationFailMessages = validationFailMessages;
  }

  public validate(
    field: string,
    value: any,
    options?: IArrayValidationOptions,
    failMessages?: IValidationFailMessages,
  ): IValidationResponse {
    const response: IValidationResponse = {
      messages: [],
      success: true,
    };

    if (value && !Array.isArray(value)) {
      response.success = false;
      response.messages.push(validationMessage(
        failMessages && failMessages.type || this.validationFailMessages.type,
        { field, type: validationTypes.Array, value },
      ));
    }

    if (!options) {
      return response;
    }

    if (options.required !== undefined && options.required && !value) {
      response.success = false;
      response.messages.push(validationMessage(
        failMessages && failMessages.required || this.validationFailMessages.required,
        { field, type: validationTypes.Array, value },
      ));
    }

    if (options.minLength && value.length < options.minLength) {
      response.success = false;
      response.messages.push(validationMessage(
        failMessages && failMessages.minLength || this.validationFailMessages.minLength,
        { field, type: validationTypes.Array, minLength: `${options.minLength}` },
      ));
    }

    if (options.maxLength && value.length > options.maxLength) {
      response.success = false;
      response.messages.push(validationMessage(
        failMessages && failMessages.maxLength || this.validationFailMessages.maxLength,
        { field, type: validationTypes.Array, maxLength: `${options.maxLength}` },
      ));
    }

    if (options.include && value.indexOf(options.include) < 0 ) {
      response.success = false;
      response.messages.push(validationMessage(
        failMessages && failMessages.include || this.validationFailMessages.include,
        { field, type: validationTypes.Array, include: `${options.include}` },
      ));
    }

    return response;
  }
}
