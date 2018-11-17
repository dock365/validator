import { IValidationFailMessages } from '../const/validationFailMessages';
import { IStringValidationOptions, IDateValidationOptions, INumberValidationOptions, IEmailValidationOptions } from './IValidationOptions';

export interface IValidationResponse {
  success: boolean;
  messages: string[];
}

export type stringValidateMethodType = (
  field: string,
  value: any,
  options?: IStringValidationOptions,
  failMessages?: IValidationFailMessages,
) => IValidationResponse;

export type numberValidateMethodType = (
  field: string,
  value: any,
  options?: INumberValidationOptions,
  failMessages?: IValidationFailMessages,
) => IValidationResponse;

export type dateValidateMethodType = (
  field: string,
  value: any,
  options?: IDateValidationOptions,
  failMessages?: IValidationFailMessages,
) => IValidationResponse;

export type emailValidateMethodType = (
  field: string,
  value: any,
  options?: IEmailValidationOptions,
  failMessages?: IValidationFailMessages,
) => IValidationResponse;


export default interface IValidator {
  validate: stringValidateMethodType |
  numberValidateMethodType |
  dateValidateMethodType |
  emailValidateMethodType;
}
