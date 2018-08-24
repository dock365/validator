"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validationFailMessages_1 = __importDefault(require("./const/validationFailMessages"));
const validationTypes_1 = __importDefault(require("./const/validationTypes"));
const validationMessage_1 = __importDefault(require("./libs/validationMessage"));
class Validator {
    constructor(config) {
        this.includeFailMessage = validationFailMessages_1.default.include || "";
        this.maxLengthFailMessage = validationFailMessages_1.default.maxLength || "";
        this.maxValueFailMessage = validationFailMessages_1.default.maxValue || "";
        this.minLengthFailMessage = validationFailMessages_1.default.minLength || "";
        this.minValueFailMessage = validationFailMessages_1.default.minValue || "";
        this.noTrailingSpaceFailMessage = validationFailMessages_1.default.noTrailingSpace || "";
        this.requiredFailMessage = validationFailMessages_1.default.required || "";
        this.typeFailMessage = validationFailMessages_1.default.type || "";
        if (config) {
            if (config.failMessages) {
                this._initializaValidationMessages(config.failMessages);
            }
        }
    }
    string(field, value, options, failMessages) {
        const response = {
            messages: [],
            success: true,
        };
        if (typeof (value) !== "string") {
            response.success = false;
            response.messages.push(validationMessage_1.default(failMessages && failMessages.type || this.typeFailMessage, { field, type: validationTypes_1.default.String, value }));
        }
        if (!options) {
            return response;
        }
        if (options.required !== undefined && options.required && !value) {
            response.success = false;
            response.messages.push(validationMessage_1.default(failMessages && failMessages.required || this.requiredFailMessage, { field, type: validationTypes_1.default.String, value }));
        }
        if (options.maxLength && value.length > options.maxLength) {
            response.success = false;
            response.messages.push(validationMessage_1.default(failMessages && failMessages.maxLength || this.maxLengthFailMessage, { field, type: validationTypes_1.default.String, maxLength: `${options.maxLength}` }));
        }
        if (options.minLength && value.length < options.minLength) {
            response.success = false;
            response.messages.push(validationMessage_1.default(failMessages && failMessages.minLength || this.minLengthFailMessage, { field, type: validationTypes_1.default.String, minLength: `${options.minLength}` }));
        }
        if (options.include && `${value}`.indexOf(options.include) < 0) {
            response.success = false;
            response.messages.push(validationMessage_1.default(failMessages && failMessages.include || this.includeFailMessage, { field, type: validationTypes_1.default.String, include: options.include }));
        }
        if (options.noTrailingSpace && `${value}`.trim().length !== `${value}`.length) {
            response.success = false;
            response.messages.push(validationMessage_1.default(failMessages && failMessages.noTrailingSpace || this.noTrailingSpaceFailMessage, { field, type: validationTypes_1.default.String }));
        }
        return response;
    }
    number(field, value, options, failMessages) {
        const response = {
            messages: [],
            success: true,
        };
        if (typeof (value) !== "number") {
            response.success = false;
            response.messages.push(validationMessage_1.default(failMessages && failMessages.type || this.typeFailMessage, { field, type: validationTypes_1.default.Number, value }));
        }
        if (!options) {
            return response;
        }
        if (options.required !== undefined && options.required && !value) {
            response.success = false;
            response.messages.push(validationMessage_1.default(failMessages && failMessages.required || this.requiredFailMessage, { field, type: validationTypes_1.default.String, value }));
        }
        if (options.maxValue && value > options.maxValue) {
            response.success = false;
            response.messages.push(validationMessage_1.default(failMessages && failMessages.maxValue || this.maxValueFailMessage, { field, type: validationTypes_1.default.String, maxValue: `${options.maxValue}` }));
        }
        if (options.minValue && value < options.minValue) {
            response.success = false;
            response.messages.push(validationMessage_1.default(failMessages && failMessages.minValue || this.minValueFailMessage, { field, type: validationTypes_1.default.String, minValue: `${options.minValue}` }));
        }
        return response;
    }
    _initializaValidationMessages(failMessages) {
        if (failMessages) {
            this.includeFailMessage = failMessages.include || this.includeFailMessage;
            this.maxLengthFailMessage = failMessages.maxLength || this.maxLengthFailMessage;
            this.maxValueFailMessage = failMessages.maxValue || this.maxValueFailMessage;
            this.minLengthFailMessage = failMessages.minLength || this.minLengthFailMessage;
            this.minValueFailMessage = failMessages.minValue || this.minValueFailMessage;
            this.noTrailingSpaceFailMessage = failMessages.noTrailingSpace || this.noTrailingSpaceFailMessage;
            this.requiredFailMessage = failMessages.required || this.requiredFailMessage;
            this.typeFailMessage = failMessages.type || this.typeFailMessage;
        }
    }
}
exports.default = Validator;
//# sourceMappingURL=Validator.js.map