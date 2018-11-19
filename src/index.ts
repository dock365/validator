import validationFailMessages, { IValidationFailMessages } from './const/validationFailMessages';
import { emailValidateMethodType, dateValidateMethodType, numberValidateMethodType, stringValidateMethodType } from './validators/IValidator';
import StringValidator from './validators/StringValidator';
import NumberValidator from './validators/NumberValidator';
import DateValidator from './validators/DateValidator';
import EmailValidator from './validators/EmailValidator';

export default class Validator {
  public string: stringValidateMethodType;
  public number: numberValidateMethodType;
  public date: dateValidateMethodType;
  public email: emailValidateMethodType;

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
    extension: validationFailMessages.extension || '',
  };

  constructor(config?: { failMessages?: IValidationFailMessages }) {
    if (config) {
      if (config.failMessages) {
        this._initializaValidationMessages(config.failMessages);
      }
    }

    this.string = new StringValidator(validationFailMessages).validate;
    this.number = new NumberValidator(validationFailMessages).validate;
    this.date = new DateValidator(validationFailMessages).validate;
    this.email = new EmailValidator(validationFailMessages).validate;
  }

  private _initializaValidationMessages(failMessages?: IValidationFailMessages) {
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
        failMessages.noTrailingSpace || this.validationFailMessages.noTrailingSpace;
      this.validationFailMessages.required =
        failMessages.required || this.validationFailMessages.required;
      this.validationFailMessages.type =
        failMessages.type || this.validationFailMessages.type;
      this.validationFailMessages.extension =
        failMessages.type || this.validationFailMessages.extension;
      this.validationFailMessages.after =
        failMessages.type || this.validationFailMessages.after;
      this.validationFailMessages.before =
        failMessages.type || this.validationFailMessages.before;
    }
  }
}
