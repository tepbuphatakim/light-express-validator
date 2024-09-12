class ValidationError extends Error {
  constructor(message, fields = {}) {
    super(message);
    this.name = 'ValidationError';
    this.fields = fields;
  }

  addFieldError(field, message) {
    this.fields[field] = message;
  }
}

module.exports = ValidationError;
