import { expect } from 'chai';
import validationMessage from '../../src/libs/validationMessage';
import Validator, { validationTypes, validationFailMessages } from '../../src';

describe('Number Validator', () => {
  const validator = new Validator();

  describe('Type', () => {
    it('should return success: true without message when the value is integer', () => {
      const result = validator.number('Title', 5454);

      expect(result.success).to.equal(true);
      // tslint:disable-next-line:no-unused-expression
      expect(result.messages).to.be.an('array').that.is.empty;
    });

    it('should return success: true without message when the value is float', () => {
      const result = validator.number('Title', 54.34);

      expect(result.success).to.equal(true);
      // tslint:disable-next-line:no-unused-expression
      expect(result.messages).to.be.an('array').that.is.empty;
    });

    it('should return success: true without message when the value is undefined', () => {
      const result = validator.number('Title', undefined);

      expect(result.success).to.equal(true);
      // tslint:disable-next-line:no-unused-expression
      expect(result.messages).to.be.an('array').that.is.empty;
    });

    it('should return success: true without message when the value is null', () => {
      const result = validator.number('Title', null);

      expect(result.success).to.equal(true);
      // tslint:disable-next-line:no-unused-expression
      expect(result.messages).to.be.an('array').that.is.empty;
    });

    it('should return success: false with message when the value is not number', () => {
      const result = validator.number('Title', 'Not a number');

      expect(result.success).to.equal(false);
      expect(result.messages)
        .to.be.an('array')
        .that.include(
          validationMessage(validationFailMessages.type, {
            field: 'Title',
            type: validationTypes.Number,
          })
        );
    });
  });

  describe('Required', () => {
    it('should return success: true without message when the value is present', () => {
      const result = validator.number('Title', 3453, { required: true });

      expect(result.success).to.equal(true);
      // tslint:disable-next-line:no-unused-expression
      expect(result.messages).to.be.an('array').that.is.empty;
    });

    it('should return success: true without message when the value is present', () => {
      const result = validator.number('Title', 0, { required: true });

      expect(result.success).to.equal(true);
      // tslint:disable-next-line:no-unused-expression
      expect(result.messages).to.be.an('array').that.is.empty;
    });

    it('should return success: false with message when the value is null', () => {
      const result = validator.number('Title', null, { required: true });

      expect(result.success).to.equal(false);
      expect(result.messages)
        .to.be.an('array')
        .that.include(
          validationMessage(validationFailMessages.required, {
            field: 'Title',
            type: validationTypes.Number,
          })
        );
    });

    it('should return success: false with message when the value is undefined', () => {
      const result = validator.number('Title', undefined, { required: true });

      expect(result.success).to.equal(false);
      expect(result.messages)
        .to.be.an('array')
        .that.include(
          validationMessage(validationFailMessages.required, {
            field: 'Title',
            type: validationTypes.Number,
          })
        );
    });

    it('should return success: false with message when the value is NaN', () => {
      const result = validator.number('Title', NaN, { required: true });

      expect(result.success).to.equal(false);
      expect(result.messages)
        .to.be.an('array')
        .that.include(
          validationMessage(validationFailMessages.required, {
            field: 'Title',
            type: validationTypes.Number,
          })
        );
    });

    it('should return success: false with message when the value is ""', () => {
      const result = validator.number('Title', '', { required: true });

      expect(result.success).to.equal(false);
      expect(result.messages)
        .to.be.an('array')
        .that.include(
          validationMessage(validationFailMessages.required, {
            field: 'Title',
            type: validationTypes.Number,
          })
        );
    });

    it('should return success: false with custom message when the value is undefined', () => {
      const result = validator.number(
        'Title',
        undefined,
        { required: true },
        { required: '$title Custom required message' }
      );

      expect(result.success).to.equal(false);
      expect(result.messages)
        .to.be.an('array')
        .that.include(
          validationMessage('$title Custom required message', {
            field: 'Title',
            type: validationTypes.Number,
          })
        );
    });
  });

  describe('Min Value', () => {
    it('should return success: true without message when the value is greater than min value', () => {
      const result = validator.number('Title', 45, { minValue: 40 });

      expect(result.success).to.equal(true);
      // tslint:disable-next-line:no-unused-expression
      expect(result.messages).to.be.an('array').that.is.empty;
    });

    it('should return success: false with message when the value is less than min value', () => {
      const result = validator.number('Title', 35, { minValue: 40 });

      expect(result.success).to.equal(false);
      expect(result.messages)
        .to.be.an('array')
        .that.include(
          validationMessage(validationFailMessages.minValue, {
            field: 'Title',
            type: validationTypes.Number,
            minValue: '40',
          })
        );
    });

    it('should return success: false with custom message when the value is less than min value', () => {
      const result = validator.number(
        'Title',
        35,
        { minValue: 40 },
        { minValue: '$title Custom minValue message' }
      );

      expect(result.success).to.equal(false);
      expect(result.messages)
        .to.be.an('array')
        .that.include(
          validationMessage('$title Custom minValue message', {
            field: 'Title',
            type: validationTypes.Number,
            minValue: '40',
          })
        );
    });
  });

  describe('Max Value', () => {
    it('should return success: true without message when the value is less than max value', () => {
      const result = validator.number('Title', 25, { maxValue: 40 });

      expect(result.success).to.equal(true);
      // tslint:disable-next-line:no-unused-expression
      expect(result.messages).to.be.an('array').that.is.empty;
    });

    it('should return success: false with message when the value is greater than max value', () => {
      const result = validator.number('Title', 45, { maxValue: 40 });

      expect(result.success).to.equal(false);
      expect(result.messages)
        .to.be.an('array')
        .that.include(
          validationMessage(validationFailMessages.maxValue, {
            field: 'Title',
            type: validationTypes.Number,
            maxValue: '40',
          })
        );
    });

    it('should return success: false with custom message when the value is greater than max value', () => {
      const result = validator.number(
        'Title',
        45,
        { maxValue: 40 },
        { maxValue: '$title Custom maxValue message' }
      );

      expect(result.success).to.equal(false);
      expect(result.messages)
        .to.be.an('array')
        .that.include(
          validationMessage('$title Custom maxValue message', {
            field: 'Title',
            type: validationTypes.Number,
            maxValue: '40',
          })
        );
    });
  });

  describe('Prevent Decimal Places', () => {
    it("should return success: true without message when the value doesn't have any decimal places", () => {
      const result = validator.number('Title', 5454, {
        preventDecimalPlaces: true,
      });

      expect(result.success).to.equal(true);
      // tslint:disable-next-line:no-unused-expression
      expect(result.messages).to.be.an('array').that.is.empty;
    });

    it('should return success: false with message when the value has decimal places', () => {
      const result = validator.number('Title', 12.254, {
        preventDecimalPlaces: true,
      });

      expect(result.success).to.equal(false);
      expect(result.messages)
        .to.be.an('array')
        .that.include(
          validationMessage(validationFailMessages.preventDecimalPlaces, {
            field: 'Title',
          })
        );
    });
  });
});

describe('Number Validator With Initialized Custom Message', () => {
  const failMessages = {
    include:
      "Number Validation Updated start $field must include '$include'! Updated end",
    maxLength:
      "Number Validation Updated start $field can't be greater than $maxLength ! Updated end",
    maxValue:
      "Number Validation Updated start $field can't be greater than $maxValue! Updated end",
    minLength:
      "Number Validation Updated start $field can't be less than $minLength charectors! Updated end",
    minValue:
      "Number Validation Updated start $field can't be less than $minValue! Updated end",
    required: 'Number Validation Updated start $field is required! Updated end',
    type: 'Number Validation Updated start $field must be a $type! Updated end',
  };
  const validator = new Validator({ failMessages });
  describe('Type', () => {
    it('should return success: false with message when the value is not number', () => {
      const result = validator.number('Title', 'Not a number');

      expect(result.success).to.equal(false);
      expect(result.messages)
        .to.be.an('array')
        .that.include(
          validationMessage(failMessages.type, {
            field: 'Title',
            type: validationTypes.Number,
          })
        );
    });
  });

  describe('Required', () => {
    it('should return success: false with message when the value is undefined', () => {
      const result = validator.number('Title', undefined, { required: true });

      expect(result.success).to.equal(false);
      expect(result.messages)
        .to.be.an('array')
        .that.include(
          validationMessage(failMessages.required, {
            field: 'Title',
            type: validationTypes.Number,
          })
        );
    });
  });

  describe('Min Value', () => {
    it('should return success: false with message when the value is less than min value', () => {
      const result = validator.number('Title', 35, { minValue: 40 });

      expect(result.success).to.equal(false);
      expect(result.messages)
        .to.be.an('array')
        .that.include(
          validationMessage(failMessages.minValue, {
            field: 'Title',
            type: validationTypes.Number,
            minValue: '40',
          })
        );
    });
  });

  describe('Max Value', () => {
    it('should return success: false with message when the value is greater than max value', () => {
      const result = validator.number('Title', 45, { maxValue: 40 });

      expect(result.success).to.equal(false);
      expect(result.messages)
        .to.be.an('array')
        .that.include(
          validationMessage(failMessages.maxValue, {
            field: 'Title',
            type: validationTypes.Number,
            maxValue: '40',
          })
        );
    });
  });
});
