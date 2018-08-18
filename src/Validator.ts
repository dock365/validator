import {
  maxLengthFailMessage,
  minLengthFailMessage,
  requiredFailMessage,
  typeFailMessage,
} from "./const/validationMessages";
import validationTypes from "./const/validationTypes";
import validationMessage from "./libs/validationMessage";

export interface IValidationMessages {
  type?: string;
  required?: string;
  minLength?: string;
  maxLength?: string;
  minValue?: string;
  maxValue?: string;
}

export interface IBaseValidationOptions {
  required?: boolean;
}

export interface IStringValidationOptions extends IBaseValidationOptions {
  minLength?: number;
  maxLength?: number;
}

export interface INumberValidationOptions extends IBaseValidationOptions {
  minValue?: number;
  maxValue?: number;
}

export interface IValidationResponse {
  success: boolean;
  messages: string[];
}

export default class Validator {
  // constructor(validationMessages?: IValidationMessages) {
  //   super(validationMessages);
  // }

  public string(
    field: string,
    value: any,
    options?: IStringValidationOptions,
  ): IValidationResponse {
    const response: IValidationResponse = {
      messages: [],
      success: true,
    };

    if (typeof (value) !== "string") {
      response.success = false;
      response.messages.push(validationMessage(
        typeFailMessage,
        { field, type: validationTypes.String, value },
      ));
    }
    if (!options) {
      return response;
    }
    if (options.required !== undefined && options.required && !value) {
      response.success = false;
      response.messages.push(validationMessage(
        requiredFailMessage,
        { field, type: validationTypes.String, value },
      ));
    }

    if (options.maxLength && value.length > options.maxLength) {
      response.success = false;
      response.messages.push(validationMessage(
        maxLengthFailMessage,
        { field, type: validationTypes.String, maxLength: `${options.maxLength}` },
      ));
    }

    if (options.minLength && value.length < options.minLength) {
      response.success = false;
      response.messages.push(validationMessage(
        minLengthFailMessage,
        { field, type: validationTypes.String, minLength: `${options.minLength}` },
      ));
    }
    return response;
  }
}
