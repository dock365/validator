import { expect } from 'chai';
import Validator, { validationFailMessages, validationTypes } from '../../src';
import validationMessage from '../../src/libs/validationMessage';

describe('Array Validator', () => {
  const validator = new Validator();

  describe('Type', () => {
    it('should return success: true without message when the value is an array with content', () => {
      const result = validator.array('Title', [1, 2, 3, 4, 's']);

      expect(result.success).to.equal(true);
      // tslint:disable-next-line:no-unused-expression
      expect(result.messages).to.be.an('array').that.is.empty;
    });

    it('should return success: true without message when the value is an array without content', () => {
      const result = validator.array('Title', []);

      expect(result.success).to.equal(true);
      // tslint:disable-next-line:no-unused-expression
      expect(result.messages).to.be.an('array').that.is.empty;
    });

    it('should return success: false with message when the value is a string', () => {
      const result = validator.array('Title', 'Not an array');

      expect(result.success).to.equal(false);
      expect(result.messages)
        .to.be.an('array')
        .that.include(
          validationMessage(validationFailMessages.type, {
            field: 'Title',
            type: validationTypes.Array,
          })
        );
    });
  });

  describe('Required', () => {
    it('should return success: true without message when the value is present', () => {
      const result = validator.array('Title', [], { required: true });

      expect(result.success).to.equal(true);
      // tslint:disable-next-line:no-unused-expression
      expect(result.messages).to.be.an('array').that.is.empty;
    });

    it('should return success: false with message when the value is not present', () => {
      const result = validator.array('Title', null, { required: true });

      expect(result.success).to.equal(false);
      expect(result.messages)
        .to.be.an('array')
        .that.include(
          validationMessage(validationFailMessages.required, {
            field: 'Title',
            type: validationTypes.Array,
          })
        );
    });

    it('should return success: false with custom message when the value is not present', () => {
      const result = validator.array(
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
            type: validationTypes.Array,
          })
        );
    });
  });

  describe('minLength', () => {
    it('should return success: true without message when the array length is greater than min length', () => {
      const result = validator.array('Title', [1, 2, 3], {
        minLength: 2,
      });

      expect(result.success).to.equal(true);
      // tslint:disable-next-line:no-unused-expression
      expect(result.messages).to.be.an('array').that.is.empty;
    });

    it('should return success: false with message when the array length is less than min length', () => {
      const result = validator.array('Title', [1, 2, 3, 4], {
        minLength: 5,
      });

      expect(result.success).to.equal(false);
      expect(result.messages)
        .to.be.an('array')
        .that.include(
          validationMessage(validationFailMessages.minLength, {
            field: 'Title',
            type: validationTypes.Array,
            minLength: '5',
          })
        );
    });

    it('should return success: false with message when the array undefined', () => {
      const result = validator.array('Title', undefined, {
        minLength: 5,
      });

      expect(result.success).to.equal(false);
      expect(result.messages)
        .to.be.an('array')
        .that.include(
          validationMessage(validationFailMessages.minLength, {
            field: 'Title',
            type: validationTypes.Array,
            minLength: '5',
          })
        );
    });

    it('should return success: true without message when the array length is equal to min length', () => {
      const result = validator.array('Title', [1, 2, 3], {
        minLength: 3,
      });

      expect(result.success).to.equal(true);
      // tslint:disable-next-line:no-unused-expression
      expect(result.messages).to.be.an('array').that.is.empty;
    });
  });

  describe('maxLength', () => {
    it('should return success: true without message when the array length is less than max length', () => {
      const result = validator.array('Title', [1, 2, 3, 5], {
        maxLength: 7,
      });

      expect(result.success).to.equal(true);
      // tslint:disable-next-line:no-unused-expression
      expect(result.messages).to.be.an('array').that.is.empty;
    });

    it('should return success: false with message when the array length is greater than max length', () => {
      const result = validator.array('Title', [1, 2, 3, 5, 6, 6], {
        maxLength: 4,
      });

      expect(result.success).to.equal(false);
      expect(result.messages)
        .to.be.an('array')
        .that.include(
          validationMessage(validationFailMessages.maxLength, {
            field: 'Title',
            type: validationTypes.Array,
            maxLength: '4',
          })
        );
    });

    it('should return success: false with message when the array in undefined', () => {
      const result = validator.array('Title', undefined, {
        maxLength: 4,
      });

      expect(result.success).to.equal(false);
      expect(result.messages)
        .to.be.an('array')
        .that.include(
          validationMessage(validationFailMessages.maxLength, {
            field: 'Title',
            type: validationTypes.Array,
            maxLength: '4',
          })
        );
    });

    it('should return success: true without message when the array length is equal to max length', () => {
      const result = validator.array('Title', [1, 2, 3, 5], {
        maxLength: 4,
      });

      expect(result.success).to.equal(true);
      // tslint:disable-next-line:no-unused-expression
      expect(result.messages).to.be.an('array').that.is.empty;
    });
  });

  describe('include', () => {
    it('should return success: true without message when the array contain specific value', () => {
      const result = validator.array('Title', [1, 2, 3, 5], {
        include: 1,
      });

      expect(result.success).to.equal(true);
      // tslint:disable-next-line:no-unused-expression
      expect(result.messages).to.be.an('array').that.is.empty;
    });

    it('should return success: true without message when the array contain specific value', () => {
      const result = validator.array('Title', ['1', 'b', 'c'], {
        include: 'c',
      });

      expect(result.success).to.equal(true);
      // tslint:disable-next-line:no-unused-expression
      expect(result.messages).to.be.an('array').that.is.empty;
    });

    it('should return success: false with message  when the array does not contain a specific value', () => {
      const result = validator.array('Title', [1, 2, 3, 5, 6, 6], {
        include: 4,
      });

      expect(result.success).to.equal(false);
      expect(result.messages)
        .to.be.an('array')
        .that.include(
          validationMessage(validationFailMessages.include, {
            field: 'Title',
            type: validationTypes.Array,
            include: '4',
          })
        );
    });

    it('should return success: false with message  when the array in undefined', () => {
      const result = validator.array('Title', undefined, {
        include: 4,
      });

      expect(result.success).to.equal(false);
      expect(result.messages)
        .to.be.an('array')
        .that.include(
          validationMessage(validationFailMessages.include, {
            field: 'Title',
            type: validationTypes.Array,
            include: '4',
          })
        );
    });

  });

  describe('content type', () => {
    it('should return success: true without message when all content in the array is string', () => {
      const result = validator.array('Title', ["a", "b", "c"], {
        contentType: validationTypes.String,
      });

      expect(result.success).to.equal(true);
      // tslint:disable-next-line:no-unused-expression
      expect(result.messages).to.be.an('array').that.is.empty;
    });

    it('should return success: true without message when all content in the array is number', () => {
      const result = validator.array('Title', [1, 2, 3, 5], {
        contentType: validationTypes.Number,
      });

      expect(result.success).to.equal(true);
      // tslint:disable-next-line:no-unused-expression
      expect(result.messages).to.be.an('array').that.is.empty;
    });

    it('should return success: false with message when all values in the array is not number', () => {
      const result = validator.array('Title', [1, 2, 3, "5", 6, 6], {
        contentType: validationTypes.Number,
      });

      expect(result.success).to.equal(false);
      expect(result.messages)
        .to.be.an('array')
        .that.include(
          validationMessage(validationFailMessages.contentType, {
            field: 'Title',
            type: validationTypes.Array,
            contentType: validationTypes.Number,
          })
        );
    });

    it('should return success: false with message when all values in the array is not string', () => {
      const result = validator.array('Title', ["1", "2", 3, "5", 6, 6], {
        contentType: validationTypes.String,
      });

      expect(result.success).to.equal(false);
      expect(result.messages)
        .to.be.an('array')
        .that.include(
          validationMessage(validationFailMessages.contentType, {
            field: 'Title',
            type: validationTypes.Array,
            contentType: validationTypes.String,
          })
        );
    });
  });
});
