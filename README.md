# Validator
*Note: This Project is under heavy development*

A general purpose validation library to validate strings or numbers.

## Install
  ```bash
  # Using yarn package manager
  $ yarn add @braces/validator

  # Using npm package manager
  $ npm install --save @braces/validator
  ```

## Usage
Initialize new validator instance with optional configurations

  ```javascript
  import Validator from "@braces/validator";

  const validator = new Validator({
    validationMessages: {
      ... // Custom validation message is under development
    }
  });

  validator.string("Title", "Some Value", { required: true /* other validation criteria*/ })

  validator.number("Title", 54, { required: true /* other validation criteria*/ })
  ```

  Sample response

  ```javascript
  {
    success: true,
    messages: [ /*...validation messages if fail*/ ],
  }
  ```

### Options
#### Initilization configurations
| Name                                               | Type     | Default  | Description                                                                                                                                                                              |
| :------------------------------------------------- | :------- | :------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|validationMessages|Object|ValidationMessages|Here define custome valiadtion messages and all other configurations

##### validationMessages
| Name                                               | Type     | Default  | Description                                                                                                                                                                              |
| :------------------------------------------------- | :------- | :------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|required|string|$field is required!|validation fail message if field is required and it's not present|
|type|string|$field must be a $type!|validation fail message if type check fails|
|minLength|string|$field can't be less than $minLength charectors!|validation fail message if field length is less than specified value|
|maxLength|string|$field can't be greater than $maxLength charectors!|validation fail message if field length is greater than specified value|
|minValue|string|$field can't be less than $minValue!|validation fail message if field value is less than specified value|
|maxValue|string|$field can't be greater than $maxValue!|validation fail message if field value is greater than specified value|
|include|string|\$field doesn't contain '$include'!|validation fail message if value doesn't contain specified value|
|noTrailingSpaces|string|\$field must not contain any trailing spaces!|validation fail message if value contain trailing space|

### Validation criterias
#### Base
| Name                                               | Type     | Default  | Description                                                                                                                                                                              |
| :------------------------------------------------- | :------- | :------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|required|Boolean|false|return success as false if the field is required and value is not present|

#### String
| Name                                               | Type     | Default  | Description                                                                                                                                                                              |
| :------------------------------------------------- | :------- | :------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|minLength|number|undefined|return success as false if the field value length is less than specified value|
|maxLength|number|undefined|return success as false if the field value length is greater than specified value|
|include|string|undefined|return success as false if the field doesn't contain specified include string|
|noTrailingSpaces|boolean|undefined|return success as false if the field contains trailing space|

#### Number
| Name                                               | Type     | Default  | Description                                                                                                                                                                              |
| :------------------------------------------------- | :------- | :------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|minValue|number|undefined|return success as false if the field value is less than specified value|
|maxValue|number|undefined|return success as false if the field value is greater than specified value|



## License

Validator is MIT licensed.