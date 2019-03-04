import { expect } from 'chai';
import Validator, { validationFailMessages, validationTypes } from '../../src';
import validationMessage from '../../src/libs/validationMessage';

describe('Email Validator', () => {
  const validator = new Validator();

  describe('Required', () => {
    it('should return success: true without message when the value is present', () => {
      const result = validator.email('Title', 'schweinsteigar@email.com', {
        required: true,
      });

      expect(result.success).to.equal(true);
      // tslint:disable-next-line:no-unused-expression
      expect(result.messages).to.be.an('array').that.is.empty;
    });

    it('should return success: false with message when the value is not present', () => {
      const result = validator.email('Title', '', { required: true });

      expect(result.success).to.equal(false);
      expect(result.messages)
        .to.be.an('array')
        .that.include(
          validationMessage(validationFailMessages.required, {
            field: 'Title',
            type: validationTypes.Email,
          })
        );
    });
  });

  describe('Type', () => {
    it("should return success: true without message when symbol '@' is present", () => {
      const result = validator.email('Title', 'schweinsteigar@email.com');

      expect(result.success).to.equal(true);
      // tslint:disable-next-line:no-unused-expression
      expect(result.messages).to.be.an('array').that.is.empty;
    });

    it("should return success: false with message when the symbol '@' is not present", () => {
      const result = validator.email('Title', 'schweinsteigar#email.com');

      expect(result.success).to.equal(false);
      expect(result.messages)
        .to.be.an('array')
        .that.include(
          validationMessage(validationFailMessages.type, {
            field: 'Title',
            type: validationTypes.Email,
          })
        );
    });

    it('should return success: false with message when the email name has not enough strength', () => {
      const result = validator.email('Title', 'schw@emailcom');

      expect(result.success).to.equal(false);
      expect(result.messages)
        .to.be.an('array')
        .that.include(
          validationMessage(validationFailMessages.type, {
            field: 'Title',
            type: validationTypes.Email,
          })
        );
    });
  });

  describe('Extension', () => {
    it("should return success: true without message when 'domain' is present", () => {
      const result = validator.email('Title', 'schweinsteigar@email.com', {
        extension: 'email.com',
      });

      expect(result.success).to.equal(true);
      // tslint:disable-next-line:no-unused-expression
      expect(result.messages).to.be.an('array').that.is.empty;
    });

    it("should return success: false with message when 'extension' is not present", () => {
      const result = validator.email('Title', 'schweinsteigar@gmail.com', {
        extension: 'email.com',
      });

      expect(result.success).to.equal(false);
      expect(result.messages)
        .to.be.an('array')
        .that.include(
          validationMessage(validationFailMessages.extension, {
            field: 'Title',
            type: validationTypes.Email,
          })
        );
    });
  });
});
