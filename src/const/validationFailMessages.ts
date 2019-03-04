export interface IValidationFailMessages {
  type?: string;
  required?: string;
  minLength?: string;
  maxLength?: string;
  minValue?: string;
  maxValue?: string;
  include?: string;
  noTrailingSpace?: string;
  before?: string;
  after?: string;
  extension?: string;
  regx?: string;
  preventDecimalPlaces?: string;
  contentType?: string;
}

export const validationFailMessages: IValidationFailMessages = {
  after: "$field must be be less than $after",
  before: "$field must be greater than $before",
  extension: "$field extension must be $extension",
  include: "$field must include '$include'!",
  maxLength: "$field can't be greater than $maxLength characters!",
  maxValue: "$field can't be greater than $maxValue!",
  minLength: "$field can't be less than $minLength characters!",
  minValue: "$field can't be less than $minValue!",
  noTrailingSpace: "$field must not contain any trailing spaces!",
  required: "$field is required!",
  regx: "$field must match $regx!",
  type: "$field must be a $type!",
  preventDecimalPlaces: "$field must not contain any decimal places!",
  contentType: "$field has invalid content!",
};
