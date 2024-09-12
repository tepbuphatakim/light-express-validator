function isEmpty(data) {
  return !data && data !== 0 && data !== false;
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

function isBoolean(value) {
  return typeof value === 'boolean';
}

function isValidDate(value) {
  if (value instanceof Date) {
    return !isNaN(value.getTime());
  }

  if (typeof value === 'string' || typeof value === 'number') {
    const date = new Date(value);
    return !isNaN(date.getTime());
  }

  return false;
}

module.exports = {
  isEmpty,
  isMinChars,
  isMaxChars,
  isNumeric,
  isDecimal,
  isBoolean,
  isValidDate,
};
