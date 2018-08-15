"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var minLengthFailMessage = function (title) { return title + " is too short!"; };
var maxLengthFailMessage = function (title) { return title + " is too long!"; };
var requiredFailMessage = function (title) { return title + " is required!"; };
var typeFailMessage = function (title, type) { return title + " must be a " + type + "!"; };
exports.validate = function (title, value, options) {
    switch (options.type) {
        case "String" /* String */:
            return exports.validateString(title, value, options);
        case "Number" /* Number */:
            return exports.validateNumber(title, value, options);
        default:
            return {
                messages: ["Invalid type!"],
                success: false,
            };
    }
};
exports.validateString = function (title, value, options) {
    var response = {
        messages: [],
        success: true,
    };
    if (typeof (value) !== "string") {
        response.success = false;
        response.messages.push(typeFailMessage(title, "string"));
    }
    if (options.required !== undefined && options.required && !value) {
        response.success = false;
        response.messages.push(requiredFailMessage(title));
    }
    if (options.maxLength && value.length > options.maxLength) {
        response.success = false;
        response.messages.push(maxLengthFailMessage(title));
    }
    if (options.minLength && value.length < options.minLength) {
        response.success = false;
        response.messages.push(minLengthFailMessage(title));
    }
    return response;
};
exports.validateNumber = function (title, value, options) {
    var response = {
        messages: [],
        success: true,
    };
    return response;
};
//# sourceMappingURL=index.js.map