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
}
