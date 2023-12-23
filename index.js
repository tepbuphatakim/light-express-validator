function validate(toValidate) {
  return function (req, res, next) {
    const payload = req.body;
    iterateFields({ toValidate, payload });
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
    console.log('fieldData: ', data);

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
      const error = new Error(`${field} is required`);
      error.status = 400;
      throw error;
    }
    if (/^min:/.test(rule)) {
      const length = rule.split(':').at(-1);
      if (isMinChars(data, length)) {
        const error = new Error(`${field} must be more than ${length} chars`);
        error.status = 400;
        throw error;
      }
    }
    if (/^max:/.test(rule)) {
      const length = rule.split(':').at(-1);
      if (isMaxChars(data, length)) {
        const error = new Error(`${field} must be less than 8 chars`);
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

export default {
  validate,
};
