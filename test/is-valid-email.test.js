const { isValidEmail } = require('../lib/utils/validation.js');

describe('isValidEmail function', () => {
  test('should return true for valid email addresses', () => {
    expect(isValidEmail('test@example.com')).toBe(true);
    expect(isValidEmail('user.name+tag@example.co.uk')).toBe(true);
    expect(isValidEmail('user-name@example.org')).toBe(true);
    expect(isValidEmail('user123@example.net')).toBe(true);
  });

  test('should return false for invalid email addresses', () => {
    expect(isValidEmail('invalid.email')).toBe(false);
    expect(isValidEmail('invalid@')).toBe(false);
    expect(isValidEmail('@invalid.com')).toBe(false);
    expect(isValidEmail('invalid@.com')).toBe(false);
    expect(isValidEmail('invalid@com')).toBe(false);
  });

  test('should return false for empty strings', () => {
    expect(isValidEmail('')).toBe(false);
  });

  test('should return false for email addresses with spaces', () => {
    expect(isValidEmail('invalid email@example.com')).toBe(false);
    expect(isValidEmail('invalidemail@exam ple.com')).toBe(false);
  });

  test('should return false for email addresses without TLD', () => {
    expect(isValidEmail('user@localhost')).toBe(false);
  });

  test('should return true for null input', () => {
    expect(isValidEmail(null)).toBe(true);
  });

  test('should return false for non-string inputs', () => {
    expect(isValidEmail(undefined)).toBe(false);
    expect(isValidEmail(123)).toBe(false);
    expect(isValidEmail({})).toBe(false);
    expect(isValidEmail([])).toBe(false);
  });
});
