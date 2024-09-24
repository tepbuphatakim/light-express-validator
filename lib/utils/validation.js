function isEmpty(data) {
  if (data === null || data === undefined) {
    return true;
  }
  if (typeof data === 'string') {
    return data.trim().length === 0;
  }
  if (Array.isArray(data) || typeof data === 'object') {
    return Object.keys(data).length === 0;
  }
  return false;
}

function meetMinLength(data, length) {
  const parsedLength = parseInt(length, 10);
  if (
    isNaN(parsedLength) ||
    parsedLength < 0 ||
    String(parsedLength) !== String(length)
  ) {
    throw new Error(
      'Length must be a non-negative integer or a string representation of a non-negative integer'
    );
  }
  if (data === undefined || typeof data === 'boolean') {
    return false;
  }
  if (data === null) {
    return true;
  }
  return String(data).length >= parsedLength;
}

function meetMaxLength(data, length) {
  const parsedLength = parseInt(length, 10);
  if (
    isNaN(parsedLength) ||
    parsedLength < 0 ||
    String(parsedLength) !== String(length)
  ) {
    throw new Error(
      'Length must be a non-negative integer or a string representation of a non-negative integer'
    );
  }
  if (data === undefined || typeof data === 'boolean') {
    return false;
  }
  if (data === null) {
    return true;
  }
  return String(data).length <= parsedLength;
}

function isNumeric(value) {
  // Need to be above type of null is object.
  if (value === null) {
    return true;
  }
  if (
    value === undefined ||
    (typeof value === 'string' && value.trim() === '') ||
    typeof value === 'object' ||
    Array.isArray(value)
  ) {
    return false;
  }
  const num = Number(value);
  return !isNaN(num) && isFinite(num);
}

function isDecimal(value, decimalPlaces = 2) {
  if (value === null) {
    return true;
  }
  if (typeof value !== 'number' && typeof value !== 'string') {
    return false;
  }
  const strValue = value.toString().trim();
  if (strValue === '') {
    return false;
  }
  // Handle the case when decimalPlaces is 0
  if (decimalPlaces === 0) {
    return /^-?\d+$/.test(strValue);
  }
  // Regex explanation:
  // ^-?\d*                 - Start of string, optional negative sign, zero or more digits
  // (\.                    - Decimal point (if present)
  //   \d{0,decimalPlaces}  - 0 to specified number of decimal places
  // )?$                    - End of string, entire decimal part is optional
  const regex = new RegExp(`^-?\\d*(\\.\\d{0,${decimalPlaces}})?$`);
  return regex.test(strValue);
}

function isBoolean(value) {
  if (typeof value === 'boolean') {
    return true;
  }
  if (typeof value === 'string') {
    const lowerValue = value.toLowerCase().trim();
    return lowerValue === 'true' || lowerValue === 'false';
  }
  if (typeof value === 'number') {
    return value === 0 || value === 1;
  }
  return false;
}

function isValidDate(value) {
  if (value === null) {
    return true;
  }
  if (value instanceof Date) {
    return !isNaN(value.getTime());
  }
  if (typeof value === 'string' || typeof value === 'number') {
    const date = new Date(value);
    return !isNaN(date.getTime());
  }
  return false;
}

function isValidEmail(value) {
  if (value === null) {
    return true;
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value);
}

function isImageFromBuffer(buffer) {
  // File signatures (magic numbers) for common image formats
  const signatures = {
    jpeg: [0xff, 0xd8, 0xff],
    png: [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a],
    gif: [0x47, 0x49, 0x46, 0x38],
    webp: [
      0x52,
      0x49,
      0x46,
      0x46,
      null,
      null,
      null,
      null,
      0x57,
      0x45,
      0x42,
      0x50,
    ],
    bmp: [0x42, 0x4d],
    ico: [0x00, 0x00, 0x01, 0x00],
  };

  // Function to check if buffer starts with a given signature
  const startsWith = (buf, sig) =>
    sig.every((byte, i) => byte === null || buf[i] === byte);

  // Check the buffer against each signature
  for (const [format, signature] of Object.entries(signatures)) {
    if (startsWith(buffer, signature)) {
      return { isImage: true, format: format };
    }
  }

  return { isImage: false, format: null };
}

module.exports = {
  isEmpty,
  meetMinLength,
  meetMaxLength,
  isNumeric,
  isDecimal,
  isBoolean,
  isValidDate,
  isValidEmail,
  isImageFromBuffer,
};
