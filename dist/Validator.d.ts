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
    private includeFailMessage;
    private maxLengthFailMessage;
    private maxValueFailMessage;
    private minLengthFailMessage;
    private minValueFailMessage;
    private noTrailingSpaceFailMessage;
    private requiredFailMessage;
    private typeFailMessage;
    constructor(config?: {
        failMessages?: IValidationFailMessages;
    });
    string(field: string, value: any, options?: IStringValidationOptions, failMessages?: IValidationFailMessages): IValidationResponse;
    number(field: string, value: any, options?: INumberValidationOptions, failMessages?: IValidationFailMessages): IValidationResponse;
    private _initializaValidationMessages;
}
