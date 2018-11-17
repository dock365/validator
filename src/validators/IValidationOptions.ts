export interface IBaseValidationOptions {
  required?: boolean;
}

export interface IStringValidationOptions extends IBaseValidationOptions {
  minLength?: number;
  maxLength?: number;
  include?: string;
  noTrailingSpace?: boolean;
  regx?: string;
}

export interface INumberValidationOptions extends IBaseValidationOptions {
  minValue?: number;
  maxValue?: number;
}

export interface IDateValidationOptions extends IBaseValidationOptions {
  before?: Date;
  after?: Date;
}

export interface IEmailValidationOptions extends IBaseValidationOptions {
  extension?: string;
}
