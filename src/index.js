function validate(toValidate) {
  return function (req, res, next) {
    const validateMsg = iterateFields({ toValidate, payload: req.body });
    if (validateMsg) {
      const error = new Error(validateMsg);
      error.status = 400;
      throw error;
    }
    next();
  };
}

/**
 * Iterate through the fields.
 * @param {Object} obj - The input object.
 * @param {Array} obj.toValidate - The object validation. ({ name: 'required|min:8|max:8' }).
 * @param {String} obj.payload - The payload (req.body).
 * @returns {Boolean|Error} Return validation message or false if the data valid within rules.
 */
function iterateFields({ toValidate, payload }) {
  const fields = Object.keys(toValidate);
  const validateMsg = {};
  for (const field of fields) {
    const rules = toValidate[field].split('|');
    const data = payload[field];

    const message = iterateRules({ rules, field, data });
    if (message) validateMsg[field] = message;
  }
  if (validateMsg) {
    return validateMsg;
  }

  return false;
}

/**
 * Iterate through the rules and validate it data within the given rules.
 * @param {Object} obj - The input object.
 * @param {Array} obj.rules - The array of rules to check againt (['required', 'min:8']).
 * @param {String} obj.field - The payload field.
 * @param {String} obj.data - The payload data to validate.
 * @returns {Boolean|Error} Return validation message or false if the data valid within rules.
 */
function iterateRules({ rules, field, data }) {
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
    if (/^decimal:/.test(rule)) {
      const decimal = rule.split(':').at(-1);
      if (!isDecimal(data, decimal)) {
        return `The ${field} field must have ${decimal} decimal places.`;
      }
    }
  }
  return false;
}

function isEmpty(data) {
  return !data && data !== 0;
}

function isMinChars(data, length) {
  return String(data).length < length;
}

function isMaxChars(data, length) {
  return String(data).length > length;
}

function isNumeric(value) {
  return !isNaN(value);
}

function isDecimal(value, decimalPlaces = 0) {
  const regex = new RegExp(`^-?\\d+(\\.\\d{${decimalPlaces}})?$`);
  return regex.test(value.toString());
}

module.exports = {
  validate,
};
