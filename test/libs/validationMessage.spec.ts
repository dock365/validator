import { expect } from 'chai';
import validationMessage from '../../src/libs/validationMessage';

describe('Message', () => {
  it('should return defined error message with string injected', () => {
    expect(
      validationMessage('$field is something and its value is $value, $others', {
        field: 'FIELD',
        value: 'VALUE',
        others: 'OTHERS',
      })
    ).to.equal('FIELD is something and its value is VALUE, OTHERS');
  });
});
