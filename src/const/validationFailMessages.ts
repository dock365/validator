import { IValidationFailMessages } from "..";

const validationFailMessages: IValidationFailMessages = {
  after: "$field must be be less than $after",
  before: "$field must be greater than $before",
  extension: "$field must contain a $extension",
  include: "$field must include '$include'!",
  maxLength: "$field can't be greater than $maxLength charectors!",
  maxValue: "$field can't be greater than $maxValue!",
  minLength: "$field can't be less than $minLength charectors!",
  minValue: "$field can't be less than $minValue!",
  noTrailingSpace: "$field must not contain any trailing spaces!",
  required: "$field is required!",
  type: "$field must be a $type!",
};

export default validationFailMessages;
