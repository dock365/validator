"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (message = "", values) => {
    Object.keys(values).forEach((key) => {
        message = `${message}`.replace(`$${key}`, values[key] || "");
    });
    return message;
};
//# sourceMappingURL=validationMessage.js.map