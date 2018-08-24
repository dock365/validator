import {
  includeFailMessage,
  maxLengthFailMessage,
  maxValueFailMessage,
  minLengthFailMessage,
  minValueFailMessage,
  noTrailingSpaceFailMessage,
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
  include?: string;
  noTrailingSpaces?: boolean;
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
  // constructor({validationMessages?: IValidationMessages}) {
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

    if (options.include && `${value}`.indexOf(options.include) < 0) {
      response.success = false;
      response.messages.push(validationMessage(
        includeFailMessage,
        { field, type: validationTypes.String, include: options.include },
      ));
    }

    if (options.noTrailingSpaces && `${value}`.trim().length !== `${value}`.length) {
      response.success = false;
      response.messages.push(validationMessage(
        noTrailingSpaceFailMessage,
        { field, type: validationTypes.String },
      ));
    }

    return response;
  }

  public number(
    field: string,
    value: any,
    options?: INumberValidationOptions,
  ): IValidationResponse {
    const response: IValidationResponse = {
      messages: [],
      success: true,
    };

    if (typeof (value) !== "number") {
      response.success = false;
      response.messages.push(validationMessage(
        typeFailMessage,
        { field, type: validationTypes.Number, value },
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

    if (options.maxValue && value > options.maxValue) {
      response.success = false;
      response.messages.push(validationMessage(
        maxValueFailMessage,
        { field, type: validationTypes.String, maxValue: `${options.maxValue}` },
      ));
    }

    if (options.minValue && value < options.minValue) {
      response.success = false;
      response.messages.push(validationMessage(
        minValueFailMessage,
        { field, type: validationTypes.String, minValue: `${options.minValue}` },
      ));
    }

    return response;
  }
}
