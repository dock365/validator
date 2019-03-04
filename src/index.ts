import {
  IValidationFailMessages,
  validationFailMessages,
} from './const/validationFailMessages';
import {
  emailValidateMethodType,
  dateValidateMethodType,
  numberValidateMethodType,
  stringValidateMethodType,
  arrayValidateMethodType,
} from './validators/IValidator';
import StringValidator from './validators/StringValidator';
import NumberValidator from './validators/NumberValidator';
import DateValidator from './validators/DateValidator';
import EmailValidator from './validators/EmailValidator';
import { validationTypes } from './const/validationTypes';
import ArrayValidator from './validators/ArrayValidator';

export {
  IBaseValidationOptions,
  IDateValidationOptions,
  IEmailValidationOptions,
  INumberValidationOptions,
  IStringValidationOptions,
} from './validators/IValidationOptions';
export {
  IValidationResponse,
  dateValidateMethodType,
  emailValidateMethodType,
  numberValidateMethodType,
  stringValidateMethodType,
} from './validators/IValidator';
export { validationTypes } from './const/validationTypes';
export {
  IValidationFailMessages,
  validationFailMessages,
} from './const/validationFailMessages';

// tslint:disable-next-line:export-name
export default class Validator {
  public [validationTypes.String]: stringValidateMethodType;
  public [validationTypes.Number]: numberValidateMethodType;
  public [validationTypes.Date]: dateValidateMethodType;
  public [validationTypes.Email]: emailValidateMethodType;
  public [validationTypes.Array]: arrayValidateMethodType;

  private validationFailMessages: IValidationFailMessages = {
    before: validationFailMessages.before || '',
    include: validationFailMessages.include || '',
    maxLength: validationFailMessages.maxLength || '',
    maxValue: validationFailMessages.maxValue || '',
    minLength: validationFailMessages.minLength || '',
    minValue: validationFailMessages.minValue || '',
    noTrailingSpace: validationFailMessages.noTrailingSpace || '',
    required: validationFailMessages.required || '',
    after: validationFailMessages.after || '',
    type: validationFailMessages.type || '',
    regx: validationFailMessages.regx || '',
    extension: validationFailMessages.extension || '',
    preventDecimalPlaces: validationFailMessages.preventDecimalPlaces || '',
  };

  constructor(config?: { failMessages?: IValidationFailMessages }) {
    if (config) {
      if (config.failMessages) {
        this._initializeValidationMessages(config.failMessages);
      }
    }

    this[validationTypes.String] = new StringValidator(
      validationFailMessages
    ).validate;
    this[validationTypes.Number] = new NumberValidator(
      validationFailMessages
    ).validate;
    this[validationTypes.Date] = new DateValidator(
      validationFailMessages
    ).validate;
    this[validationTypes.Email] = new EmailValidator(
      validationFailMessages
    ).validate;
    this[validationTypes.Array] = new ArrayValidator(
      validationFailMessages
    ).validate;
  }

  private _initializeValidationMessages(
    failMessages?: IValidationFailMessages
  ) {
    if (failMessages) {
      this.validationFailMessages.include =
        failMessages.include || this.validationFailMessages.include;
      this.validationFailMessages.maxLength =
        failMessages.maxLength || this.validationFailMessages.maxLength;
      this.validationFailMessages.maxValue =
        failMessages.maxValue || this.validationFailMessages.maxValue;
      this.validationFailMessages.minLength =
        failMessages.minLength || this.validationFailMessages.minLength;
      this.validationFailMessages.minValue =
        failMessages.minValue || this.validationFailMessages.minValue;
      this.validationFailMessages.noTrailingSpace =
        failMessages.noTrailingSpace ||
        this.validationFailMessages.noTrailingSpace;
      this.validationFailMessages.required =
        failMessages.required || this.validationFailMessages.required;
      this.validationFailMessages.regx =
        failMessages.regx || this.validationFailMessages.regx;
      this.validationFailMessages.type =
        failMessages.type || this.validationFailMessages.type;
      this.validationFailMessages.extension =
        failMessages.type || this.validationFailMessages.extension;
      this.validationFailMessages.after =
        failMessages.after || this.validationFailMessages.after;
      this.validationFailMessages.before =
        failMessages.before || this.validationFailMessages.before;
      this.validationFailMessages.preventDecimalPlaces =
        failMessages.preventDecimalPlaces ||
        this.validationFailMessages.preventDecimalPlaces;
    }
  }
}
