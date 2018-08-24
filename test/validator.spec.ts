import { expect } from "chai";
import {
  includeFailMessage,
  maxLengthFailMessage,
  maxValueFailMessage,
  minLengthFailMessage,
  minValueFailMessage,
  requiredFailMessage,
  typeFailMessage,
  noTrailingSpaceFailMessage,
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

  describe("Include", () => {
    it("should return success: true without message when the value contain a perticular string", () => {
      const result = validator.string("Title", "Neque porro quisquam est qui", { include: "porro" });

      expect(result.success).to.equal(true);
      // tslint:disable-next-line:no-unused-expression
      expect(result.messages).to.be.an("array").that.is.empty;
    });
    it("should return success: false with message when the value doesn't contain a perticular string", () => {
      const result = validator.string("Title", "Neque porro quisquam est qui", { include: "lorem" });
      const expectedValidationMessage = validationMessage(
        includeFailMessage,
        { field: "Title", type: validationTypes.String, include: "lorem" },
      );

      expect(result.success).to.equal(false);
      expect(result.messages)
        .to.be.an("array")
        .that.include(expectedValidationMessage);
    });
  });

  describe("No Trailing Spaces", () => {
    it("should return success: true without message when the value does not conatin trailing spaces", () => {
      const result = validator.string("Title", "Neque porro quisquam est qui", { noTrailingSpaces: true });

      expect(result.success).to.equal(true);
      // tslint:disable-next-line:no-unused-expression
      expect(result.messages).to.be.an("array").that.is.empty;
    });
    it("should return success: false with message when the value conatin trailing spaces", () => {
      const result = validator.string("Title", " Neque porro quisquam est qui ", { noTrailingSpaces: true });
      const expectedValidationMessage = validationMessage(
        noTrailingSpaceFailMessage,
        { field: "Title", type: validationTypes.String},
      );

      expect(result.success).to.equal(false);
      expect(result.messages)
        .to.be.an("array")
        .that.include(expectedValidationMessage);
    });
  });
});

describe("Number Validator", () => {
  const validator = new Validator();

  describe("Type", () => {
    it("should return success: true without message when the value is integer", () => {
      const result = validator.number("Title", 5454);

      expect(result.success).to.equal(true);
      // tslint:disable-next-line:no-unused-expression
      expect(result.messages).to.be.an("array").that.is.empty;
    });

    it("should return success: true without message when the value is float", () => {
      const result = validator.number("Title", 54.34);

      expect(result.success).to.equal(true);
      // tslint:disable-next-line:no-unused-expression
      expect(result.messages).to.be.an("array").that.is.empty;
    });

    it("should return success: false with message when the value is not number", () => {
      const result = validator.number("Title", "Not a number");

      expect(result.success).to.equal(false);
      expect(result.messages)
        .to.be.an("array")
        .that.include(validationMessage(typeFailMessage, { field: "Title", type: validationTypes.Number }));
    });
  });

  describe("Required", () => {
    it("should return success: true without message when the value is present", () => {
      const result = validator.number("Title", 3453, { required: true });

      expect(result.success).to.equal(true);
      // tslint:disable-next-line:no-unused-expression
      expect(result.messages)
        .to.be.an("array")
        .that.is.empty;
    });
    it("should return success: false with message when the value is null", () => {
      const result = validator.number("Title", null, { required: true });

      expect(result.success).to.equal(false);
      expect(result.messages)
        .to.be.an("array")
        .that.include(validationMessage(requiredFailMessage, { field: "Title", type: validationTypes.Number }));
    });

    it("should return success: false with message when the value is undefined", () => {
      const result = validator.number("Title", undefined, { required: true });

      expect(result.success).to.equal(false);
      expect(result.messages)
        .to.be.an("array")
        .that.include(validationMessage(requiredFailMessage, { field: "Title", type: validationTypes.Number }));
    });

    it("should return success: false with message when the value is NaN", () => {
      const result = validator.number("Title", NaN, { required: true });

      expect(result.success).to.equal(false);
      expect(result.messages)
        .to.be.an("array")
        .that.include(validationMessage(requiredFailMessage, { field: "Title", type: validationTypes.Number }));
    });

    it("should return success: false with message when the value is \"\"", () => {
      const result = validator.number("Title", "", { required: true });

      expect(result.success).to.equal(false);
      expect(result.messages)
        .to.be.an("array")
        .that.include(validationMessage(requiredFailMessage, { field: "Title", type: validationTypes.Number }));
    });
  });

  describe("Min Value", () => {
    it("should return success: true without message when the value is greater than min value", () => {
      const result = validator.number("Title", 45, { minValue: 40 });

      expect(result.success).to.equal(true);
      // tslint:disable-next-line:no-unused-expression
      expect(result.messages).to.be.an("array").that.is.empty;
    });
    it("should return success: false with message when the value is less than min value", () => {
      const result = validator.number("Title", 35, { minValue: 40 });

      expect(result.success).to.equal(false);
      expect(result.messages)
        .to.be.an("array")
        .that.include(validationMessage(
          minValueFailMessage,
          { field: "Title", type: validationTypes.Number, minValue: "40" },
        ));
    });
  });

  describe("Max Value", () => {
    it("should return success: true without message when the value is less than max value", () => {
      const result = validator.number("Title", 25, { maxValue: 40 });

      expect(result.success).to.equal(true);
      // tslint:disable-next-line:no-unused-expression
      expect(result.messages).to.be.an("array").that.is.empty;
    });
    it("should return success: false with message when the value is greater than max value", () => {
      const result = validator.number("Title", 45, { maxValue: 40 });

      expect(result.success).to.equal(false);
      expect(result.messages)
        .to.be.an("array")
        .that.include(validationMessage(
          maxValueFailMessage,
          { field: "Title", type: validationTypes.Number, maxValue: "40" },
        ));
    });
  });
});
