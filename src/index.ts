import validationFailMessages from "./const/validationFailMessages";
import validationTypes from "./const/validationTypes";
import validationMessage from "./libs/validationMessage";

export interface IValidationFailMessages {
  type?: string;
  required?: string;
  minLength?: string;
  maxLength?: string;
  minValue?: string;
  maxValue?: string;
  include?: string;
  noTrailingSpace?: string;
}

export interface IBaseValidationOptions {
  required?: boolean;
}

export interface IStringValidationOptions extends IBaseValidationOptions {
  minLength?: number;
  maxLength?: number;
  include?: string;
  noTrailingSpace?: boolean;
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

  private includeFailMessage: string = validationFailMessages.include || "";
  private maxLengthFailMessage: string = validationFailMessages.maxLength || "";
  private maxValueFailMessage: string = validationFailMessages.maxValue || "";
  private minLengthFailMessage: string = validationFailMessages.minLength || "";
  private minValueFailMessage: string = validationFailMessages.minValue || "";
  private noTrailingSpaceFailMessage: string = validationFailMessages.noTrailingSpace || "";
  private requiredFailMessage: string = validationFailMessages.required || "";
  private typeFailMessage: string = validationFailMessages.type || "";

  constructor(config?: { failMessages?: IValidationFailMessages }) {
    if (config) {
      if (config.failMessages) {
        this._initializaValidationMessages(config.failMessages);
      }
    }
  }

  public string(
    field: string,
    value: any,
    options?: IStringValidationOptions,
    failMessages?: IValidationFailMessages,
  ): IValidationResponse {
    const response: IValidationResponse = {
      messages: [],
      success: true,
    };

    if (typeof (value) !== "string") {
      response.success = false;
      response.messages.push(validationMessage(
        failMessages && failMessages.type || this.typeFailMessage,
        { field, type: validationTypes.String, value },
      ));
    }
    if (!options) {
      return response;
    }

    if (options.required !== undefined && options.required && !value) {
      response.success = false;
      response.messages.push(validationMessage(
        failMessages && failMessages.required || this.requiredFailMessage,
        { field, type: validationTypes.String, value },
      ));
    }

    if (options.maxLength && value.length > options.maxLength) {
      response.success = false;
      response.messages.push(validationMessage(
        failMessages && failMessages.maxLength || this.maxLengthFailMessage,
        { field, type: validationTypes.String, maxLength: `${options.maxLength}` },
      ));
    }

    if (options.minLength && value.length < options.minLength) {
      response.success = false;
      response.messages.push(validationMessage(
        failMessages && failMessages.minLength || this.minLengthFailMessage,
        { field, type: validationTypes.String, minLength: `${options.minLength}` },
      ));
    }

    if (options.include && `${value}`.indexOf(options.include) < 0) {
      response.success = false;
      response.messages.push(validationMessage(
        failMessages && failMessages.include || this.includeFailMessage,
        { field, type: validationTypes.String, include: options.include },
      ));
    }

    if (options.noTrailingSpace && `${value}`.trim().length !== `${value}`.length) {
      response.success = false;
      response.messages.push(validationMessage(
        failMessages && failMessages.noTrailingSpace || this.noTrailingSpaceFailMessage,
        { field, type: validationTypes.String },
      ));
    }

    return response;
  }

  public number(
    field: string,
    value: any,
    options?: INumberValidationOptions,
    failMessages?: IValidationFailMessages,
  ): IValidationResponse {
    const response: IValidationResponse = {
      messages: [],
      success: true,
    };

    if (typeof (value) !== "number") {
      response.success = false;
      response.messages.push(validationMessage(
        failMessages && failMessages.type || this.typeFailMessage,
        { field, type: validationTypes.Number, value },
      ));
    }
    if (!options) {
      return response;
    }

    if (options.required !== undefined && options.required && !value) {
      response.success = false;
      response.messages.push(validationMessage(
        failMessages && failMessages.required || this.requiredFailMessage,
        { field, type: validationTypes.String, value },
      ));
    }

    if (options.maxValue && value > options.maxValue) {
      response.success = false;
      response.messages.push(validationMessage(
        failMessages && failMessages.maxValue || this.maxValueFailMessage,
        { field, type: validationTypes.String, maxValue: `${options.maxValue}` },
      ));
    }

    if (options.minValue && value < options.minValue) {
      response.success = false;
      response.messages.push(validationMessage(
        failMessages && failMessages.minValue || this.minValueFailMessage,
        { field, type: validationTypes.String, minValue: `${options.minValue}` },
      ));
    }

    return response;
  }

  public date(
    field: string,
    value: any,
    options?: INumberValidationOptions,
    failMessages?: IValidationFailMessages,
  ): IValidationResponse {
    const response: IValidationResponse = {
      messages: [],
      success: true,
    };

    return response;
  }

  public email(
    field: string,
    value: any,
    options?: INumberValidationOptions,
    failMessages?: IValidationFailMessages,
  ): IValidationResponse {
    const response: IValidationResponse = {
      messages: [],
      success: true,
    };

    return response;
  }

  private _initializaValidationMessages(failMessages?: IValidationFailMessages) {
    if (failMessages) {
      this.includeFailMessage = failMessages.include || this.includeFailMessage;
      this.maxLengthFailMessage = failMessages.maxLength || this.maxLengthFailMessage;
      this.maxValueFailMessage = failMessages.maxValue || this.maxValueFailMessage;
      this.minLengthFailMessage = failMessages.minLength || this.minLengthFailMessage;
      this.minValueFailMessage = failMessages.minValue || this.minValueFailMessage;
      this.noTrailingSpaceFailMessage = failMessages.noTrailingSpace || this.noTrailingSpaceFailMessage;
      this.requiredFailMessage = failMessages.required || this.requiredFailMessage;
      this.typeFailMessage = failMessages.type || this.typeFailMessage;
    }
  }
}
