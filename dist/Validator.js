"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validationMessages_1 = require("./const/validationMessages");
const validationTypes_1 = __importDefault(require("./const/validationTypes"));
const validationMessage_1 = __importDefault(require("./libs/validationMessage"));
class Validator {
    // constructor({validationMessages?: IValidationMessages}) {
    //   super(validationMessages);
    // }
    string(field, value, options) {
        const response = {
            messages: [],
            success: true,
        };
        if (typeof (value) !== "string") {
            response.success = false;
            response.messages.push(validationMessage_1.default(validationMessages_1.typeFailMessage, { field, type: validationTypes_1.default.String, value }));
        }
        if (!options) {
            return response;
        }
        if (options.required !== undefined && options.required && !value) {
            response.success = false;
            response.messages.push(validationMessage_1.default(validationMessages_1.requiredFailMessage, { field, type: validationTypes_1.default.String, value }));
        }
        if (options.maxLength && value.length > options.maxLength) {
            response.success = false;
            response.messages.push(validationMessage_1.default(validationMessages_1.maxLengthFailMessage, { field, type: validationTypes_1.default.String, maxLength: `${options.maxLength}` }));
        }
        if (options.minLength && value.length < options.minLength) {
            response.success = false;
            response.messages.push(validationMessage_1.default(validationMessages_1.minLengthFailMessage, { field, type: validationTypes_1.default.String, minLength: `${options.minLength}` }));
        }
        if (options.include && `${value}`.indexOf(options.include) < 0) {
            response.success = false;
            response.messages.push(validationMessage_1.default(validationMessages_1.includeFailMessage, { field, type: validationTypes_1.default.String, include: options.include }));
        }
        return response;
    }
}
exports.default = Validator;
//# sourceMappingURL=Validator.js.map