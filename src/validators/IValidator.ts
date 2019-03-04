import { IValidationFailMessages } from '../const/validationFailMessages';
import * as IValidationOptions from './IValidationOptions';

export interface IValidationResponse {
  success: boolean;
  messages: string[];
}

export type stringValidateMethodType = (
  field: string,
  value: any,
  options?: IValidationOptions.IStringValidationOptions,
  failMessages?: IValidationFailMessages,
) => IValidationResponse;

export type numberValidateMethodType = (
  field: string,
  value: any,
  options?: IValidationOptions.INumberValidationOptions,
  failMessages?: IValidationFailMessages,
) => IValidationResponse;

export type dateValidateMethodType = (
  field: string,
  value: any,
  options?: IValidationOptions.IDateValidationOptions,
  failMessages?: IValidationFailMessages,
) => IValidationResponse;

export type emailValidateMethodType = (
  field: string,
  value: any,
  options?: IValidationOptions.IEmailValidationOptions,
  failMessages?: IValidationFailMessages,
) => IValidationResponse;

export type arrayValidateMethodType = (
  field: string,
  value: any,
  options?: IValidationOptions.IArrayValidationOptions,
  failMessages?: IValidationFailMessages,
) => IValidationResponse;

export default interface IValidator {
  validate: stringValidateMethodType |
  numberValidateMethodType |
  dateValidateMethodType |
  emailValidateMethodType;
}
