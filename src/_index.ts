import Validator from "./Validator";

export const enum validationTypes {
  String = "String",
  Number = "Number",
  Email = "Email",
}

export interface IValidationOptions {
  type?: validationTypes;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
}

export interface IValidationResponse {
  success: boolean;
  messages: string[];
}

const minLengthFailMessage = (title: string): string => `${title} is too short!`;
const maxLengthFailMessage = (title: string): string => `${title} is too long!`;
const requiredFailMessage = (title: string): string => `${title} is required!`;
const typeFailMessage = (title: string, type: string): string => `${title} must be a ${type}!`;

export default (
  title: string,
  value: any,
  options: IValidationOptions,
): IValidationResponse => {

  switch (options.type) {
    case validationTypes.String:
      return validateString(title, value, options);

    case validationTypes.Number:
      return validateNumber(title, value, options);

    default:
      return {
        messages: ["Invalid type!"],
        success: false,
      };
  }
};

export const validateString = (
  title: string,
  value: any,
  options: IValidationOptions,
): IValidationResponse => {
  const response: IValidationResponse = {
    messages: [],
    success: true,
  };
  if (typeof (value) !== "string") {
    response.success = false;
    response.messages.push(typeFailMessage(title, "string"));
  }
  if (options.required !== undefined && options.required && !value) {
    response.success = false;
    response.messages.push(requiredFailMessage(title));
  }

  if (options.maxLength && value.length > options.maxLength) {
    response.success = false;
    response.messages.push(maxLengthFailMessage(title));
  }

  if (options.minLength && value.length < options.minLength) {
    response.success = false;
    response.messages.push(minLengthFailMessage(title));
  }

  return response;
};

export const validateNumber = (
  title: string,
  value: any,
  options: IValidationOptions & { type?: string },
): IValidationResponse => {
  const response: IValidationResponse = {
    messages: [],
    success: true,
  };

  return response;
};
