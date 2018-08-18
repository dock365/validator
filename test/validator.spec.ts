import { expect } from "chai";
import {
  maxLengthFailMessage,
  maxValueFailMessage,
  minLengthFailMessage,
  minValueFailMessage,
  requiredFailMessage,
  typeFailMessage,
} from "../src/const/validationMessages";
import validationTypes from "../src/const/validationTypes";
import validationMessage from "../src/libs/ValidationMessage";
import Validator from "../src/validator";

describe("String Validator", () => {
  const validator = new Validator();

  describe("Type", () => {
    it("should return success: true without message when the value is string", () => {
      const result = validator.string("Title", "Some Value", {});

      expect(result.success).to.equal(true);
      // tslint:disable-next-line:no-unused-expression
      expect(result.messages).to.be.an("array").that.is.empty;
    });
    it("should return success: false with message when the value is not string", () => {
      const result = validator.string("Title", 65);

      expect(result.success).to.equal(false);
      expect(result.messages)
        .to.be.an("array")
        .that.include(validationMessage(typeFailMessage, { field: "Title", type: validationTypes.String }));
    });
  });

  describe("Required", () => {
    it("should return success: true without message when the value is present", () => {
      const result = validator.string("Title", "Some Value", { required: true });

      expect(result.success).to.equal(true);
      // tslint:disable-next-line:no-unused-expression
      expect(result.messages)
        .to.be.an("array")
        .that.is.empty;
    });
    it("should return success: false with message when the value is not present", () => {
      const result = validator.string("Title", "", { required: true });

      expect(result.success).to.equal(false);
      expect(result.messages)
        .to.be.an("array")
        .that.include(validationMessage(requiredFailMessage, { field: "Title", type: validationTypes.String }));
    });
  });

  describe("Min Length", () => {
    it("should return success: true without message when the value is greater than min length", () => {
      const result = validator.string("Title", "Some Value", { minLength: 3 });

      expect(result.success).to.equal(true);
      // tslint:disable-next-line:no-unused-expression
      expect(result.messages).to.be.an("array").that.is.empty;
    });
    it("should return success: false with message when the value is less than min length", () => {
      const result = validator.string("Title", "ab", { minLength: 3 });

      expect(result.success).to.equal(false);
      expect(result.messages)
        .to.be.an("array")
        .that.include(validationMessage(
          minLengthFailMessage,
          { field: "Title", type: validationTypes.String, minLength: "3" },
        ));
    });
  });

  describe("Max Length", () => {
    it("should return success: true without message when the value is less than max length", () => {
      const result = validator.string("Title", "ab", { maxLength: 3 });

      expect(result.success).to.equal(true);
      // tslint:disable-next-line:no-unused-expression
      expect(result.messages).to.be.an("array").that.is.empty;
    });
    it("should return success: false with message when the value is greater than max length", () => {
      const result = validator.string("Title", "abcd", { maxLength: 3 });

      expect(result.success).to.equal(false);
      expect(result.messages)
        .to.be.an("array")
        .that.include(validationMessage(
          maxLengthFailMessage,
          { field: "Title", type: validationTypes.String, maxLength: "3" },
        ));
    });
  });
});
