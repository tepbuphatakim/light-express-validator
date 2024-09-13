const ValidationError = require('./ValidationError');
const {
  isEmpty,
  isMinChars,
  isMaxChars,
  isNumeric,
  isDecimal,
  isBoolean,
  isValidDate,
  isImageFromBuffer,
} = require('./utils/validation');

function validate(toValidate) {
  return function (req, res, next) {
    try {
      iterateFields({ toValidate, payload: req.body, file: req.file });
      next();
    } catch (error) {
      if (error instanceof ValidationError) {
        return res.status(400).json(error);
      }
      next(error);
    }
  };
}

/**
 * Iterate through the fields.
 * @param {Object} obj - The input object.
 * @param {Array} obj.toValidate - The object validation. ({ name: 'required|min:8|max:8' }).
 * @param {String} obj.payload - The payload (req.body).
 * @returns {Boolean|Error} Return validation message or false if the data valid within rules.
 */
function iterateFields({ toValidate, payload, file }) {
  const fields = Object.keys(toValidate);
  const error = new ValidationError('Form validation failed');
  for (const field of fields) {
    const rules = toValidate[field].split('|');
    const data = payload[field];

    const msg = iterateRules({ rules, field, data, file });
    if (msg) {
      error.addFieldError(field, msg);
    }
  }
  if (Object.keys(error.fields).length) {
    throw error;
  }
}

/**
 * Iterate through the rules and validate it data within the given rules.
 * @param {Object} obj - The input object.
 * @param {Array} obj.rules - The array of rules to check againt (['required', 'min:8']).
 * @param {String} obj.field - The payload field.
 * @param {String} obj.data - The payload data to validate.
 * @returns {Boolean|Error} Return validation message or false if the data valid within rules.
 */
function iterateRules({ rules, field, data, file }) {
  for (const rule of rules) {
    if (rule === 'required' && isEmpty(data)) {
      return `The ${field} field is required.`;
    }
    if (/^min:/.test(rule)) {
      const length = rule.split(':').at(-1);
      if (isMinChars(data, length)) {
        return `The ${field} field must be at least ${length} characters.`;
      }
    }
    if (/^max:/.test(rule)) {
      const length = rule.split(':').at(-1);
      if (isMaxChars(data, length)) {
        return `The ${field} field must be at most ${length} characters.`;
      }
    }
    if (rule === 'numeric' && !isNumeric(data)) {
      return `The ${field} field must be a number.`;
    }
    if (rule === 'integer' && !Number.isInteger(data)) {
      return `The ${field} field must be an integer.`;
    }
    if (/^decimal:/.test(rule)) {
      const decimal = rule.split(':').at(-1);
      if (!isDecimal(data, decimal)) {
        return `The ${field} field must have ${decimal} decimal places.`;
      }
    }
    if (rule === 'boolean' && !isBoolean(data)) {
      return `The ${field} field must be true or false.`;
    }
    if (rule === 'date' && !isValidDate(data)) {
      return `The ${field} field must be a valid date.`;
    }
    if (rule === 'image' && file && !isImageFromBuffer(file.buffer).isImage) {
      return `The ${field} field must be an image.`;
    }
  }
  return undefined;
}

module.exports = validate;
