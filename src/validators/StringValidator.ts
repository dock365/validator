import { IValidationFailMessages } from '../const/validationFailMessages';
import { validationTypes } from '../const/validationTypes';
import validationMessage from '../libs/validationMessage';
import BaseValidator from './BaseValidator';
import IValidator, { IValidationResponse } from './IValidator';
import { IStringValidationOptions } from './IValidationOptions';

export default class StringValidator extends BaseValidator implements IValidator {

  private validationFailMessages: IValidationFailMessages = {};

  constructor(validationFailMessages: IValidationFailMessages) {
    super();
    this.validationFailMessages = validationFailMessages;
  }

  public validate(
    field: string,
    value: any,
    options?: IStringValidationOptions,
    failMessages?: IValidationFailMessages,
  ): IValidationResponse {
    const response: IValidationResponse = {
      messages: [],
      success: true,
    };

    if (typeof (value) !== 'string') {
      response.success = false;
      response.messages.push(validationMessage(
        failMessages && failMessages.type || this.validationFailMessages.type,
        { field, value, type: validationTypes.String },
      ));
    }
    if (!options) {
      return response;
    }

    if (options.required !== undefined && options.required && !value) {
      response.success = false;
      response.messages.push(validationMessage(
        failMessages && failMessages.required || this.validationFailMessages.required,
        { field, value, type: validationTypes.String },
      ));
    }

    if (options.regx && !options.regx.test(value)) {
      response.success = false;
      response.messages.push(validationMessage(
        failMessages && failMessages.regx || this.validationFailMessages.regx,
        { field, type: validationTypes.String, regx: `${options.regx}` },
      ));

    }

    if (options.maxLength && value.length > options.maxLength) {
      response.success = false;
      response.messages.push(validationMessage(
        failMessages && failMessages.maxLength || this.validationFailMessages.maxLength,
        { field, type: validationTypes.String, maxLength: `${options.maxLength}` },
      ));
    }

    if (options.minLength && value.length < options.minLength) {
      response.success = false;
      response.messages.push(validationMessage(
        failMessages && failMessages.minLength || this.validationFailMessages.minLength,
        { field, type: validationTypes.String, minLength: `${options.minLength}` },
      ));
    }

    if (options.include && `${value}`.indexOf(options.include) < 0) {
      response.success = false;
      response.messages.push(validationMessage(
        failMessages && failMessages.include || this.validationFailMessages.include,
        { field, type: validationTypes.String, include: options.include },
      ));
    }

    if (options.noTrailingSpace && `${value}`.trim().length !== `${value}`.length) {
      response.success = false;
      response.messages.push(validationMessage(
        failMessages && failMessages.noTrailingSpace || this.validationFailMessages.noTrailingSpace,
        { field, type: validationTypes.String },
      ));
    }

    return response;
  }
}
