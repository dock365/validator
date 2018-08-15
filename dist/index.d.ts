export declare const enum validationTypes {
    String = "String",
    Number = "Number",
    Email = "Email"
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
export declare const validate: (title: string, value: any, options: IValidationOptions) => IValidationResponse;
export declare const validateString: (title: string, value: any, options: IValidationOptions) => IValidationResponse;
export declare const validateNumber: (title: string, value: any, options: IValidationOptions & {
    type?: string | undefined;
}) => IValidationResponse;
//# sourceMappingURL=index.d.ts.map