import { expect } from 'chai';
import Validator, { validationFailMessages, validationTypes } from '../../src';
import validationMessage from '../../src/libs/validationMessage';

describe('RegX Validator', () => {
  const validator = new Validator();

  describe('Required', () => {
    it('should return success: true without message when the value is present', () => {
      const result = validator.regEx('Title', 'Some Value', {
        required: true,
      });

      expect(result.success).to.equal(true);
      // tslint:disable-next-line:no-unused-expression
      expect(result.messages).to.be.an('array').that.is.empty;
    });

    it('should return success: false with message when the value is not present', () => {
      const result = validator.regEx('Title', '', { required: true });

      expect(result.success).to.equal(false);
      expect(result.messages)
        .to.be.an('array')
        .that.include(
        validationMessage(validationFailMessages.required, {
          field: 'Title',
          type: validationTypes.RegEx,
        }),
      );
    });
  });

  describe('Type', () => {
    it('should return success: true without message when the regex match', () => {
      const result = validator.regEx('Title', '123456789', { regEx: /(^|\W)[0-9]{9,}($|\W)/ });

      expect(result.success).to.equal(true);
      // tslint:disable-next-line:no-unused-expression
      expect(result.messages).to.be.an('array').that.is.empty;
    });

    it('should return success: false with message when the regex fail', () => {
      const regEx = /(^|\W)[0-9]{9,}($|\W)/;
      const result = validator.regEx('Title', '123', { regEx });

      expect(result.success).to.equal(false);
      expect(result.messages)
        .to.be.an('array')
        .that.include(
        validationMessage(validationFailMessages.regEx, {
          field: 'Title',
          type: validationTypes.RegEx,
          regEx: `${regEx}`,
        }),
      );
    });

    it('should return success: true without message when the value is empty', () => {
      const result = validator.regEx('Title', '');

      expect(result.success).to.equal(true);
      // tslint:disable-next-line:no-unused-expression
      expect(result.messages).to.be.an('array').that.is.empty;
    });
  });

});
