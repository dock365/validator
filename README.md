# Validator
[![Build Status](https://travis-ci.org/codebraces/validator.svg?branch=master)](https://travis-ci.org/codebraces/validator)
[![npm Version](https://img.shields.io/npm/v/@dock365/validator.svg)](https://www.npmjs.com/package/@dock365/validator)


A general purpose validation library to validate strings or numbers.

## Install
  ```bash
  # Using yarn package manager
  $ yarn add @dock365/validator

  # Using npm package manager
  $ npm install --save @dock365/validator
  ```

## Usage
Initialize new validator instance with default configurations

  ```javascript
  import Validator from "@dock365/validator";

  const validator = new Validator();
  ```

Initialize new validator instance with custom fail messages.

* `$field` will be replaced with field name.

* `$maxLength`, `$include` etc will be replaced with defined validation criteria values.
* `$value` will be replaced with value to be validated.

```javascript
import Validator from "@dock365/validator";

const validator = new Validator({
  failMessages: {
    include: "Custom validation message for $field to validate the value contain '$include'",
    maxLength: "custom validation message to validate $field max length",
    maxValue: "custom validation message to validate $field max value",
    minLength: "custom validation message to check $field min length",
    minValue: "custom validation message to check $field min value",
    noTrailingSpace: "custom validation message to check $field has trailing spaces",
    required: "custom validation message to check $field is required",
    type: "custom validation message to check $field type",
    /* All values are optional, if not defined default will be used */
  }
});
```
Validate a value with initially defined/default fail message
```javascript
// String
validator.string(
  "Title", // Field Name
  "Some Value", // Value to be validated
  {
    required: true,
    /* validation criterias*/
  },
)

// Number
validator.number(
  "Title", // Field Name
  25, // Value to be validated
  {
    required: true,
    /* validation criterias*/
  },
)
```
Validate a value with custom fail message
```javascript
// String
validator.string(
  "Title", // Field Name
  "Some Value", // Value to be validated
  {
    required: true,
    /* validation criterias*/
  },
  {
    required: "If the $field doesnt have a value this message will be displayed",
    type: "If the $field is not a string this message will be displayed",
    /* All values are optional, if not defined default will be used */
  }
)

// Number
validator.number(
  "Title", // Field Name
  25, // Value to be validated
  {
    required: true,
    /* validation criterias*/
  },
  {
    required: "If the $field doesnt have a value this message will be displayed",
    type: "If the $field is not a number this message will be displayed",
    /* All values are optional, if not defined default will be used */
  }
)
```

  Sample response

  ```javascript
  {
    success: true,
    messages: [ /*...validation messages if fail*/ ],
  }
  ```

### Options
#### Initialization configurations
| Name               | Type   | Default            | Description                                                          |
| :----------------- | :----- | :----------------- | :------------------------------------------------------------------- |
| failMessages | Object | Default fail messages | Here define custome valiadtion messages and all other configurations |

##### failMessages
| Name             | Type   | Default                                             | Description                                                             |
| :--------------- | :----- | :-------------------------------------------------- | :---------------------------------------------------------------------- |
| required         | string | $field is required!                                 | validation fail message if field is required and it's not present       |
| type             | string | $field must be a $type!                             | validation fail message if type check fails                             |
| minLength        | string | $field can't be less than $minLength charectors!    | validation fail message if field length is less than specified value    |
| maxLength        | string | $field can't be greater than $maxLength charectors! | validation fail message if field length is greater than specified value |
| minValue         | string | $field can't be less than $minValue!                | validation fail message if field value is less than specified value     |
| maxValue         | string | $field can't be greater than $maxValue!             | validation fail message if field value is greater than specified value  |
| include          | string | \$field doesn't contain '$include'!                 | validation fail message if value doesn't contain specified value        |
| noTrailingSpaces | string | \$field must not contain any trailing spaces!       | validation fail message if value contain trailing space                 |

### Validation criterias
#### Base
| Name     | Type    | Default | Description                                                               |
| :------- | :------ | :------ | :------------------------------------------------------------------------ |
| required | Boolean | false   | return success as false if the field is required and value is not present |

#### String
| Name             | Type    | Default   | Description                                                                       |
| :--------------- | :------ | :-------- | :-------------------------------------------------------------------------------- |
| minLength        | number  | undefined | return success as false if the field value length is less than specified value    |
| maxLength        | number  | undefined | return success as false if the field value length is greater than specified value |
| include          | string  | undefined | return success as false if the field doesn't contain specified include string     |
| noTrailingSpaces | boolean | undefined | return success as false if the field contains trailing space                      |

#### Number
| Name     | Type   | Default   | Description                                                                |
| :------- | :----- | :-------- | :------------------------------------------------------------------------- |
| minValue | number | undefined | return success as false if the field value is less than specified value    |
| maxValue | number | undefined | return success as false if the field value is greater than specified value |

## Contributing!
All contributions are super welcome!


## License

Validator is MIT licensed.