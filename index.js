function validate(toValidate) {
  return function (req, res, next) {
    iterateFields({ toValidate, payload: req.body });
    next();
  };
}

/**
 * Iterate through the fields.
 * @param {Object} obj - The input object.
 * @param {Array} obj.toValidate - The object validation. ({ name: 'required|min:8|max:8' }).
 * @param {String} obj.payload - The payload (req.body).
 * @returns {Boolean|Error} Return validation message or true if the data valid within rules.
 */
function iterateFields({ toValidate, payload }) {
  const fields = Object.keys(toValidate);
  for (const field of fields) {
    const rules = toValidate[field].split('|');
    const data = payload[field];

    iterateRules({ rules, field, data });
  }
  return true;
}

/**
 * Iterate through the rules and validate it data within the given rules.
 * @param {Object} obj - The input object.
 * @param {Array} obj.rules - The array of rules to check againt (['required', 'min:8']).
 * @param {String} obj.field - The payload field.
 * @param {String} obj.data - The payload data to validate.
 * @returns {Boolean|Error} Return validation message or true if the data valid within rules.
 */
function iterateRules({ rules, field, data }) {
  for (const rule of rules) {
    if (rule === 'required' && isRequired(data)) {
      const error = new Error(`The ${field} field is required.`);
      error.status = 400;
      throw error;
    }
    if (/^min:/.test(rule)) {
      const length = rule.split(':').at(-1);
      if (isMinChars(data, length)) {
        const error = new Error(`The ${field} field must be at least ${length} characters.`);
        error.status = 400;
        throw error;
      }
    }
    if (/^max:/.test(rule)) {
      const length = rule.split(':').at(-1);
      if (isMaxChars(data, length)) {
        const error = new Error(`The ${field} field must be at most ${length} characters.`);
        error.status = 400;
        throw error;
      }
    }
  }
  return true;
}

function isRequired(data) {
  return !data && data !== 0;
}

function isMinChars(data, length) {
  return String(data).length < length;
}

function isMaxChars(data, length) {
  return String(data).length > length;
}

module.exports = {
  validate,
};
