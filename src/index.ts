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
  regExValidateMethodType,
} from './validators/IValidator';
import StringValidator from './validators/StringValidator';
import NumberValidator from './validators/NumberValidator';
import DateValidator from './validators/DateValidator';
import EmailValidator from './validators/EmailValidator';
import { validationTypes } from './const/validationTypes';
import ArrayValidator from './validators/ArrayValidator';
import RegExValidator from './validators/RegExValidator';

export {
  IBaseValidationOptions,
  IDateValidationOptions,
  IEmailValidationOptions,
  INumberValidationOptions,
  IStringValidationOptions,
  IArrayValidationOptions,
  IRegExValidationOptions,
} from './validators/IValidationOptions';
export {
  IValidationResponse,
  dateValidateMethodType,
  emailValidateMethodType,
  numberValidateMethodType,
  stringValidateMethodType,
  arrayValidateMethodType,
  regExValidateMethodType
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
  public [validationTypes.RegEx]: regExValidateMethodType;

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
    regEx: validationFailMessages.regEx || '',
    extension: validationFailMessages.extension || '',
    preventDecimalPlaces: validationFailMessages.preventDecimalPlaces || '',
    contentType: validationFailMessages.contentType || '',
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
    this[validationTypes.RegEx] = new RegExValidator(
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
      this.validationFailMessages.regEx =
        failMessages.regEx || this.validationFailMessages.regEx;
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
      this.validationFailMessages.contentType =
        failMessages.contentType || this.validationFailMessages.contentType;
    }
  }
}
