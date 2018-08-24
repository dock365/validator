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
    string(field: string, value: any, options?: IStringValidationOptions): IValidationResponse;
    number(field: string, value: any, options?: INumberValidationOptions): IValidationResponse;
}
