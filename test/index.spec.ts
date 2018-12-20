import { expect } from "chai";
import { validationFailMessages } from "../src/const/validationFailMessages";
import { validationTypes } from "../src/const/validationTypes";
import Validator from "../src/index";
import validationMessage from "../src/libs/validationMessage";

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
        .that.include(validationMessage(validationFailMessages.type, { field: "Title", type: validationTypes.Number }));
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
        .that.include(validationMessage(
          validationFailMessages.required,
          { field: "Title", type: validationTypes.Number },
        ));
    });

    it("should return success: false with message when the value is undefined", () => {
      const result = validator.number("Title", undefined, { required: true });

      expect(result.success).to.equal(false);
      expect(result.messages)
        .to.be.an("array")
        .that.include(validationMessage(
          validationFailMessages.required,
          { field: "Title", type: validationTypes.Number },
        ));
    });

    it("should return success: false with message when the value is NaN", () => {
      const result = validator.number("Title", NaN, { required: true });

      expect(result.success).to.equal(false);
      expect(result.messages)
        .to.be.an("array")
        .that.include(validationMessage(
          validationFailMessages.required,
          { field: "Title", type: validationTypes.Number },
        ));
    });

    it("should return success: false with message when the value is \"\"", () => {
      const result = validator.number("Title", "", { required: true });

      expect(result.success).to.equal(false);
      expect(result.messages)
        .to.be.an("array")
        .that.include(validationMessage(
          validationFailMessages.required,
          { field: "Title", type: validationTypes.Number },
        ));
    });

    it("should return success: false with custom message when the value is undefined", () => {
      const result = validator.number(
        "Title",
        undefined,
        { required: true },
        { required: "$title Custom required message" },
      );

      expect(result.success).to.equal(false);
      expect(result.messages)
        .to.be.an("array")
        .that.include(validationMessage(
          "$title Custom required message",
          { field: "Title", type: validationTypes.Number },
        ));
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
          validationFailMessages.minValue,
          { field: "Title", type: validationTypes.Number, minValue: "40" },
        ));
    });

    it("should return success: false with custom message when the value is less than min value", () => {
      const result = validator.number(
        "Title",
        35,
        { minValue: 40 },
        { minValue: "$title Custom minValue message" },
      );

      expect(result.success).to.equal(false);
      expect(result.messages)
        .to.be.an("array")
        .that.include(validationMessage(
          "$title Custom minValue message",
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
          validationFailMessages.maxValue,
          { field: "Title", type: validationTypes.Number, maxValue: "40" },
        ));
    });

    it("should return success: false with custom message when the value is greater than max value", () => {
      const result = validator.number(
        "Title",
        45,
        { maxValue: 40 },
        { maxValue: "$title Custom maxValue message" },
      );

      expect(result.success).to.equal(false);
      expect(result.messages)
        .to.be.an("array")
        .that.include(validationMessage(
          "$title Custom maxValue message",
          { field: "Title", type: validationTypes.Number, maxValue: "40" },
        ));
    });
  });
});

describe("Number Validator With Initialized Custome Message", () => {
  const failMessages = {
    include: "Number Validation Updated start $field must include '$include'! Updated end",
    maxLength: "Number Validation Updated start $field can't be greater than $maxLength ! Updated end",
    maxValue: "Number Validation Updated start $field can't be greater than $maxValue! Updated end",
    minLength: "Number Validation Updated start $field can't be less than $minLength charectors! Updated end",
    minValue: "Number Validation Updated start $field can't be less than $minValue! Updated end",
    required: "Number Validation Updated start $field is required! Updated end",
    type: "Number Validation Updated start $field must be a $type! Updated end",
  };
  const validator = new Validator({ failMessages });
  describe("Type", () => {
    it("should return success: false with message when the value is not number", () => {
      const result = validator.number("Title", "Not a number");

      expect(result.success).to.equal(false);
      expect(result.messages)
        .to.be.an("array")
        .that.include(validationMessage(failMessages.type, { field: "Title", type: validationTypes.Number }));
    });
  });

  describe("Required", () => {

    it("should return success: false with message when the value is undefined", () => {
      const result = validator.number("Title", undefined, { required: true });

      expect(result.success).to.equal(false);
      expect(result.messages)
        .to.be.an("array")
        .that.include(validationMessage(
          failMessages.required,
          { field: "Title", type: validationTypes.Number },
        ));
    });
  });

  describe("Min Value", () => {
    it("should return success: false with message when the value is less than min value", () => {
      const result = validator.number("Title", 35, { minValue: 40 });

      expect(result.success).to.equal(false);
      expect(result.messages)
        .to.be.an("array")
        .that.include(validationMessage(
          failMessages.minValue,
          { field: "Title", type: validationTypes.Number, minValue: "40" },
        ));
    });
  });

  describe("Max Value", () => {
    it("should return success: false with message when the value is greater than max value", () => {
      const result = validator.number("Title", 45, { maxValue: 40 });

      expect(result.success).to.equal(false);
      expect(result.messages)
        .to.be.an("array")
        .that.include(validationMessage(
          failMessages.maxValue,
          { field: "Title", type: validationTypes.Number, maxValue: "40" },
        ));
    });
  });
});

describe("Date Validator", () => {
  const validator = new Validator();

  describe("Type", () => {
    it("should return success: true without message when the value is date", () => {
      const result = validator.date("Title", new Date());

      expect(result.success).to.equal(true);
      // tslint:disable-next-line:no-unused-expression
      expect(result.messages).to.be.an("array").that.is.empty;
    });

    it("should return success: false with message when the value is a string", () => {
      const result = validator.date("Title", "Not a date");

      expect(result.success).to.equal(false);
      expect(result.messages)
        .to.be.an("array")
        .that.include(validationMessage(validationFailMessages.type, { field: "Title", type: validationTypes.Date }));
    });

    it("should return success: false with message when the value is object", () => {
      const result = validator.date("Title", { value: "value" });

      expect(result.success).to.equal(false);
      expect(result.messages)
        .to.be.an("array")
        .that.include(validationMessage(validationFailMessages.type, { field: "Title", type: validationTypes.Date }));
    });
  });

  describe("Required", () => {
    it("should return success: true without message when the value is present", () => {
      const result = validator.date("Title", new Date(), { required: true });

      expect(result.success).to.equal(true);
      // tslint:disable-next-line:no-unused-expression
      expect(result.messages)
        .to.be.an("array")
        .that.is.empty;
    });

    it("should return success: false with message when the value is not present", () => {
      const result = validator.date("Title", "", { required: true });

      expect(result.success).to.equal(false);
      expect(result.messages)
        .to.be.an("array")
        .that.include(validationMessage(
          validationFailMessages.required,
          { field: "Title", type: validationTypes.Date },
        ));
    });

    it("should return success: false with custom message when the value is not present", () => {
      const result = validator.date(
        "Title",
        "",
        { required: true },
        { required: "$title Custom required message" },
      );

      expect(result.success).to.equal(false);
      expect(result.messages)
        .to.be.an("array")
        .that.include(validationMessage(
          "$title Custom required message",
          { field: "Title", type: validationTypes.Date },
        ));
    });

  });

  describe("before", () => {
    it("should return success: true without message when the value is less than end date", () => {
      const result = validator.date("Title", new Date("7/13/2018"), { before: new Date("12/15/2019") });

      expect(result.success).to.equal(true);
      // tslint:disable-next-line:no-unused-expression
      expect(result.messages).to.be.an("array").that.is.empty;
    });

    it("should return success: false with message when the value is greater than end Date", () => {
      const result = validator.date("Title", new Date("7/13/2020"), { before: new Date("12/15/2019") });

      expect(result.success).to.equal(false);
      expect(result.messages)
        .to.be.an("array")
        .that.include(validationMessage(
          validationFailMessages.before,
          { field: "Title", type: validationTypes.Date, before: new Date("12/15/2019").toString() },
        ));
    });
  });

  describe("after", () => {
    it("should return success: true without message when the value is greater than start Date", () => {
      const result = validator.date("Title", new Date("7/13/2020"), { after: new Date("11/13/2018") });

      expect(result.success).to.equal(true);
      // tslint:disable-next-line:no-unused-expression
      expect(result.messages).to.be.an("array").that.is.empty;
    });

    it("should return success: false with message when the value is less than start Date", () => {
      const result = validator.date("Title", new Date("01/11/2018"), { after: new Date("11/13/2018") });

      expect(result.success).to.equal(false);
      expect(result.messages)
        .to.be.an("array")
        .that.include(validationMessage(
          validationFailMessages.after,
          { field: "Title", type: validationTypes.Date, after: new Date("11/13/2018").toString() },
        ));
    });
  });
});

describe("Email Validator", () => {
  const validator = new Validator();

  describe("Required", () => {
    it("should return success: true without message when the value is present", () => {
      const result = validator.email("Title", "schweinsteigar@email.com", { required: true });

      expect(result.success).to.equal(true);
      // tslint:disable-next-line:no-unused-expression
      expect(result.messages)
        .to.be.an("array")
        .that.is.empty;
    });

    it("should return success: false with message when the value is not present", () => {
      const result = validator.email("Title", "", { required: true });

      expect(result.success).to.equal(false);
      expect(result.messages)
        .to.be.an("array")
        .that.include(validationMessage(
          validationFailMessages.required,
          { field: "Title", type: validationTypes.Email },
        ));
    });

  });

  describe("Type", () => {
    it("should return success: true without message when symbol '@' is present", () => {
      const result = validator.email("Title", "schweinsteigar@email.com");

      expect(result.success).to.equal(true);
      // tslint:disable-next-line:no-unused-expression
      expect(result.messages)
        .to.be.an("array")
        .that.is.empty;
    });

    it("should return success: false with message when the symbol '@' is not present", () => {
      const result = validator.email("Title", "schweinsteigar#email.com");

      expect(result.success).to.equal(false);
      expect(result.messages)
        .to.be.an("array")
        .that.include(validationMessage(
          validationFailMessages.type,
          { field: "Title", type: validationTypes.Email },
        ));
    });

    it("should return success: false with message when the email name has not enough strength", () => {
      const result = validator.email("Title", "schw@emailcom");

      expect(result.success).to.equal(false);
      expect(result.messages)
        .to.be.an("array")
        .that.include(validationMessage(
          validationFailMessages.type,
          { field: "Title", type: validationTypes.Email },
        ));
    });
  });

  describe("Extension", () => {
    it("should return success: true without message when 'domain' is present", () => {
      const result = validator.email("Title", "schweinsteigar@email.com", { extension: "email.com" });

      expect(result.success).to.equal(true);
      // tslint:disable-next-line:no-unused-expression
      expect(result.messages)
        .to.be.an("array")
        .that.is.empty;
    });

    it("should return success: false with message when 'extension' is not present", () => {
      const result = validator.email("Title", "schweinsteigar@gmail.com", { extension: "email.com" });

      expect(result.success).to.equal(false);
      expect(result.messages)
        .to.be.an("array")
        .that.include(validationMessage(
          validationFailMessages.extension,
          { field: "Title", type: validationTypes.Email },
        ));
    });
  });
});
