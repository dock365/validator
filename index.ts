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

const minLengthFailMessage = (title) => `${title} is too short!`;
const maxLengthFailMessage = (title) => `${title} is too long!`;
const requiredFailMessage = (title) => `${title} is required!`;
const typeFailMessage = (title, type) => `${title} must be a ${type}!`;

export const validate = (
  title: string,
  value: any,
  options: IValidationOptions
): IValidationResponse => {

  switch (options.type) {
    case validationTypes.String:
      return validateString(title, value, options);

    case validationTypes.Number:
      return validateNumber(title, value, options);

    default:
      return {
        success: false,
        messages: ["Invalid type!"],
      };
  }

};


export const validateString = (title: string, value: validationTypes, options: IValidationOptions): IValidationResponse => {
  const response = {
    success: true,
    messages: [],
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

  if (options.minLength && value.length < options.maxLength) {
    response.success = false;
    response.messages.push(minLengthFailMessage(title));
  }

  return response;
};

export const validateNumber = (title: string, value: validationTypes, options: IValidationOptions & { type?: string }): IValidationResponse => {
  const response = {
    success: true,
    messages: [],
  };

  return response;
};
