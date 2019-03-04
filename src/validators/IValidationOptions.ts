import { validationTypes } from '../const/validationTypes';

export interface IBaseValidationOptions {
  required?: boolean;
}

export interface IStringValidationOptions extends IBaseValidationOptions {
  minLength?: number;
  maxLength?: number;
  include?: string;
  noTrailingSpace?: boolean;
  regx?: RegExp;
}

export interface INumberValidationOptions extends IBaseValidationOptions {
  minValue?: number;
  maxValue?: number;
  preventDecimalPlaces?: boolean;
}

export interface IDateValidationOptions extends IBaseValidationOptions {
  before?: Date;
  after?: Date;
}

export interface IArrayValidationOptions extends IBaseValidationOptions {
  minLength?: number;
  maxLength?: number;
  include?: string | number;
  contentType?: validationTypes.Number | validationTypes.String;
}

export interface IEmailValidationOptions extends IBaseValidationOptions {
  extension?: string;
}
