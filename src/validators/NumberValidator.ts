import { IValidationFailMessages } from '../const/validationFailMessages';
import { validationTypes } from '../const/validationTypes';
import validationMessage from '../libs/validationMessage';
import BaseValidator from './BaseValidator';
import IValidator, { IValidationResponse } from './IValidator';
import { IStringValidationOptions, INumberValidationOptions } from './IValidationOptions';

export default class NumberValidator extends BaseValidator implements IValidator {

  private validationFailMessages: IValidationFailMessages = {};

  constructor(validationFailMessages: IValidationFailMessages) {
    super();
    this.validationFailMessages = validationFailMessages;
  }

  public validate(
    field: string,
    value: any,
    options?: INumberValidationOptions,
    failMessages?: IValidationFailMessages,
  ): IValidationResponse {
    const response: IValidationResponse = {
      messages: [],
      success: true,
    };

    if (typeof (value) !== 'number' && value !== undefined && value !== null) {
      response.success = false;
      response.messages.push(validationMessage(
        failMessages && failMessages.type || this.validationFailMessages.type,
        { field, type: validationTypes.Number, value },
      ));
    }
    if (!options) {
      return response;
    }

    if (options.required !== undefined && options.required && !value && value !== 0) {
      response.success = false;
      response.messages.push(validationMessage(
        failMessages && failMessages.required || this.validationFailMessages.required,
        { field, type: validationTypes.Number, value },
      ));
    }

    if ((options.maxValue || options.maxValue === 0) && value > options.maxValue) {
      response.success = false;
      response.messages.push(validationMessage(
        failMessages && failMessages.maxValue || this.validationFailMessages.maxValue,
        { field, type: validationTypes.Number, maxValue: `${options.maxValue}` },
      ));
    }

    if ((options.minValue || options.minValue === 0) && value < options.minValue) {
      response.success = false;
      response.messages.push(validationMessage(
        failMessages && failMessages.minValue || this.validationFailMessages.minValue,
        { field, type: validationTypes.Number, minValue: `${options.minValue}` },
      ));
    }

    if (options.preventDecimalPlaces === true && value % 1 > 0) {
      response.success = false;
      response.messages.push(validationMessage(
        failMessages && failMessages.preventDecimalPlaces || this.validationFailMessages.preventDecimalPlaces,
        { field, type: validationTypes.Number },
      ));
    }

    return response;
  }
}
