import { expect } from 'chai';
import Validator, { validationFailMessages, validationTypes } from '../../src';
import validationMessage from '../../src/libs/validationMessage';

describe('Date Validator', () => {
  const validator = new Validator();

  describe('Type', () => {
    it('should return success: true without message when the value is date', () => {
      const result = validator.date('Title', new Date());

      expect(result.success).to.equal(true);
      // tslint:disable-next-line:no-unused-expression
      expect(result.messages).to.be.an('array').that.is.empty;
    });

    it('should return success: false with message when the value is a string', () => {
      const result = validator.date('Title', 'Not a date');

      expect(result.success).to.equal(false);
      expect(result.messages)
        .to.be.an('array')
        .that.include(
          validationMessage(validationFailMessages.type, {
            field: 'Title',
            type: validationTypes.Date,
          })
        );
    });

    it('should return success: false with message when the value is object', () => {
      const result = validator.date('Title', { value: 'value' });

      expect(result.success).to.equal(false);
      expect(result.messages)
        .to.be.an('array')
        .that.include(
          validationMessage(validationFailMessages.type, {
            field: 'Title',
            type: validationTypes.Date,
          })
        );
    });
  });

  describe('Required', () => {
    it('should return success: true without message when the value is present', () => {
      const result = validator.date('Title', new Date(), { required: true });

      expect(result.success).to.equal(true);
      // tslint:disable-next-line:no-unused-expression
      expect(result.messages).to.be.an('array').that.is.empty;
    });

    it('should return success: false with message when the value is not present', () => {
      const result = validator.date('Title', '', { required: true });

      expect(result.success).to.equal(false);
      expect(result.messages)
        .to.be.an('array')
        .that.include(
          validationMessage(validationFailMessages.required, {
            field: 'Title',
            type: validationTypes.Date,
          })
        );
    });

    it('should return success: false with custom message when the value is not present', () => {
      const result = validator.date(
        'Title',
        '',
        { required: true },
        { required: '$title Custom required message' }
      );

      expect(result.success).to.equal(false);
      expect(result.messages)
        .to.be.an('array')
        .that.include(
          validationMessage('$title Custom required message', {
            field: 'Title',
            type: validationTypes.Date,
          })
        );
    });
  });

  describe('before', () => {
    it('should return success: true without message when the value is less than end date', () => {
      const result = validator.date('Title', new Date('7/13/2018'), {
        before: new Date('12/15/2019'),
      });

      expect(result.success).to.equal(true);
      // tslint:disable-next-line:no-unused-expression
      expect(result.messages).to.be.an('array').that.is.empty;
    });

    it('should return success: false with message when the value is greater than end Date', () => {
      const result = validator.date('Title', new Date('7/13/2020'), {
        before: new Date('12/15/2019'),
      });

      expect(result.success).to.equal(false);
      expect(result.messages)
        .to.be.an('array')
        .that.include(
          validationMessage(validationFailMessages.before, {
            field: 'Title',
            type: validationTypes.Date,
            before: new Date('12/15/2019').toString(),
          })
        );
    });
  });

  describe('after', () => {
    it('should return success: true without message when the value is greater than start Date', () => {
      const result = validator.date('Title', new Date('7/13/2020'), {
        after: new Date('11/13/2018'),
      });

      expect(result.success).to.equal(true);
      // tslint:disable-next-line:no-unused-expression
      expect(result.messages).to.be.an('array').that.is.empty;
    });

    it('should return success: false with message when the value is less than start Date', () => {
      const result = validator.date('Title', new Date('01/11/2018'), {
        after: new Date('11/13/2018'),
      });

      expect(result.success).to.equal(false);
      expect(result.messages)
        .to.be.an('array')
        .that.include(
          validationMessage(validationFailMessages.after, {
            field: 'Title',
            type: validationTypes.Date,
            after: new Date('11/13/2018').toString(),
          })
        );
    });
  });
});
