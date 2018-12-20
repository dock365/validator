import { expect } from "chai";
import { validationFailMessages } from "../../src/const/validationFailMessages";
import { validationTypes } from "../../src/const/validationTypes";
import Validator from "../../src/index";
import validationMessage from "../../src/libs/validationMessage";

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
        .that.include(validationMessage(validationFailMessages.type, { field: "Title", type: validationTypes.String }));
    });

    it("should return success: false with custom message when the value is not string", () => {
      const result = validator.string("Title", 65, {}, { type: "$title Custom type message" });

      expect(result.success).to.equal(false);
      expect(result.messages)
        .to.be.an("array")
        .that.include(validationMessage(
          "$title Custom type message",
          { field: "Title", type: validationTypes.String },
        ));
    });
  });

  describe("Required", () => {
    it("should return success: true without message when the value is present", () => {
      const result = validator.string(
        "Title", "Some Value",
        { required: true },
      );

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
        .that.include(validationMessage(
          validationFailMessages.required,
          { field: "Title", type: validationTypes.String },
        ));
    });

    it("should return success: false with custom message when the value is not present", () => {
      const result = validator.string(
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
          { field: "Title", type: validationTypes.String },
        ));
    });
  });

  describe("RegX", () => {
    it("should return success: false with message when the value does not match regx", () => {
      const result = validator.string("Title", "Good Morning", { regx: /Hello/g });
      expect(result.success).to.equal(false);
      expect(result.messages)
        .to.be.an("array")
        .that.include(
          validationMessage(
            validationFailMessages.regx,
            { field: "Title", type: validationTypes.String, regx: "/Hello/g" },
          )
        );
    });

    it("should return success: true without message when the value match regx", () => {
      const result = validator.string("Title", "Hello World", { regx: /Hello/g });
      expect(result.success).to.equal(true);
      // tslint:disable-next-line:no-unused-expression
      expect(result.messages)
        .to.be.an("array")
        .that.is.empty;
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
          validationFailMessages.minLength,
          { field: "Title", type: validationTypes.String, minLength: "3" },
        ));
    });

    it("should return success: false with custom message when the value is less than min length", () => {
      const result = validator.string(
        "Title",
        "ab",
        { minLength: 3 },
        { minLength: "$title Custom minLength message" },
      );

      expect(result.success).to.equal(false);
      expect(result.messages)
        .to.be.an("array")
        .that.include(validationMessage(
          "$title Custom minLength message",
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
      const result = validator.string("Title", "abcdefd", { maxLength: 3 });

      expect(result.success).to.equal(false);
      expect(result.messages)
        .to.be.an("array")
        .that.include(validationMessage(
          validationFailMessages.maxLength,
          { field: "Title", type: validationTypes.String, maxLength: "3" },
        ));
    });

    it("should return success: false with custom message when the value is greater than max length", () => {
      const result = validator.string(
        "Title",
        "abcdefd",
        { maxLength: 3 },
        { maxLength: "$title Custom maxLength message" },
      );

      expect(result.success).to.equal(false);
      expect(result.messages)
        .to.be.an("array")
        .that.include(validationMessage(
          "$title Custom maxLength message",
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
        validationFailMessages.include,
        { field: "Title", type: validationTypes.String, include: "lorem" },
      );

      expect(result.success).to.equal(false);
      expect(result.messages)
        .to.be.an("array")
        .that.include(expectedValidationMessage);
    });

    it("should return success: false with custom message when the value doesn't contain a perticular string", () => {
      const result = validator.string(
        "Title",
        "Neque porro quisquam est qui",
        { include: "lorem" },
        { include: "$title Custom include $include message" },
      );
      const expectedValidationMessage = validationMessage(
        "$title Custom include $include message",
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
      const result = validator.string("Title", "Neque porro quisquam est qui", { noTrailingSpace: true });

      expect(result.success).to.equal(true);
      // tslint:disable-next-line:no-unused-expression
      expect(result.messages).to.be.an("array").that.is.empty;
    });

    it("should return success: false with message when the value conatin trailing spaces", () => {
      const result = validator.string("Title", " Neque porro quisquam est qui ", { noTrailingSpace: true });
      const expectedValidationMessage = validationMessage(
        validationFailMessages.noTrailingSpace,
        { field: "Title", type: validationTypes.String },
      );

      expect(result.success).to.equal(false);
      expect(result.messages)
        .to.be.an("array")
        .that.include(expectedValidationMessage);
    });

    it("should return success: false with custom message when the value conatin trailing spaces", () => {
      const result = validator.string(
        "Title",
        " Neque porro quisquam est qui ",
        { noTrailingSpace: true },
        { noTrailingSpace: "$title Custom noTrailingSpace message" },
      );
      const expectedValidationMessage = validationMessage(
        "$title Custom noTrailingSpace message",
        { field: "Title", type: validationTypes.String },
      );

      expect(result.success).to.equal(false);
      expect(result.messages)
        .to.be.an("array")
        .that.include(expectedValidationMessage);
    });
  });
});

describe("String Validator With Initialized Custome Message", () => {
  const failMessages = {
    include: "Updated start $field must include '$include'! Updated end",
    maxLength: "Updated start $field can't be greater than $maxLength ! Updated end",
    maxValue: "Updated start $field can't be greater than $maxValue! Updated end",
    minLength: "Updated start $field can't be less than $minLength charectors! Updated end",
    minValue: "Updated start $field can't be less than $minValue! Updated end",
    noTrailingSpace: "Updated start $field must not contain any trailing spaces! Updated end",
    required: "Updated start $field is required! Updated end",
    type: "Updated start $field must be a $type! Updated end",
    regx: "Updated start $field must match $regx! Updated end",
  };
  const validator = new Validator({ failMessages });

  describe("Type", () => {
    it("should return success: false with message when the value is not string", () => {
      const result = validator.string("Title", 65);
      expect(result.success).to.equal(false);
      expect(result.messages)
        .to.be.an("array")
        .that.include(validationMessage(failMessages.type, { field: "Title", type: validationTypes.String }));
    });
  });

  describe("Required", () => {
    it("should return success: false with message when the value is not present", () => {
      const result = validator.string("Title", "", { required: true });

      expect(result.success).to.equal(false);
      expect(result.messages)
        .to.be.an("array")
        .that.include(validationMessage(
          failMessages.required,
          { field: "Title", type: validationTypes.String },
        ));
    });
  });

  describe("RegX", () => {
    it("should return success: false with message when the value does not match regx", () => {
      const result = validator.string("Title", "Good Morning", { regx: /Hello/g });
      expect(result.success).to.equal(false);
      expect(result.messages)
        .to.be.an("array")
        .that.include(validationMessage(
          failMessages.regx,
          { field: "Title", type: validationTypes.String, regx: "/Hello/g" },
        ));
    });
  });

  describe("Min Length", () => {
    it("should return success: false with message when the value is less than min length", () => {
      const result = validator.string("Title", "ab", { minLength: 3 });

      expect(result.success).to.equal(false);
      expect(result.messages)
        .to.be.an("array")
        .that.include(validationMessage(
          failMessages.minLength,
          { field: "Title", type: validationTypes.String, minLength: "3" },
        ));
    });
  });

  describe("Max Length", () => {
    it("should return success: false with message when the value is greater than max length", () => {
      const result = validator.string("Title", "abcdefd", { maxLength: 3 });

      expect(result.success).to.equal(false);
      expect(result.messages)
        .to.be.an("array")
        .that.include(validationMessage(
          failMessages.maxLength,
          { field: "Title", type: validationTypes.String, maxLength: "3" },
        ));
    });
  });

  describe("Include", () => {
    it("should return success: false with message when the value doesn't contain a perticular string", () => {
      const result = validator.string("Title", "Neque porro quisquam est qui", { include: "lorem" });
      const expectedValidationMessage = validationMessage(
        failMessages.include,
        { field: "Title", type: validationTypes.String, include: "lorem" },
      );

      expect(result.success).to.equal(false);
      expect(result.messages)
        .to.be.an("array")
        .that.include(expectedValidationMessage);
    });
  });

  describe("No Trailing Spaces", () => {
    it("should return success: false with message when the value conatin trailing spaces", () => {
      const result = validator.string("Title", " Neque porro quisquam est qui ", { noTrailingSpace: true });
      const expectedValidationMessage = validationMessage(
        failMessages.noTrailingSpace,
        { field: "Title", type: validationTypes.String },
      );

      expect(result.success).to.equal(false);
      expect(result.messages)
        .to.be.an("array")
        .that.include(expectedValidationMessage);
    });
  });
});