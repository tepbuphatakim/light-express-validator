const { isEmpty } = require('../lib/utils/validation.js');

describe('isEmpty function', () => {
  test('should return true for undefined', () => {
    expect(isEmpty(undefined)).toBe(true);
  });

  test('should return true for null', () => {
    expect(isEmpty(null)).toBe(true);
  });

  test('should return true for empty string', () => {
    expect(isEmpty('')).toBe(true);
  });

  test('should return false for zero', () => {
    expect(isEmpty(0)).toBe(false);
  });

  test('should return false for false', () => {
    expect(isEmpty(false)).toBe(false);
  });

  test('should return false for true', () => {
    expect(isEmpty(true)).toBe(false);
  });

  test('should return false for non-empty string', () => {
    expect(isEmpty('hello')).toBe(false);
  });

  test('should return false for number other than zero', () => {
    expect(isEmpty(42)).toBe(false);
  });

  test('should return true for string with only whitespace', () => {
    expect(isEmpty('   ')).toBe(true);
  });

  test('should return true for empty array', () => {
    expect(isEmpty([])).toBe(true);
  });

  test('should return true for empty object', () => {
    expect(isEmpty({})).toBe(true);
  });

  test('should return false for array with items', () => {
    expect(isEmpty([1, 2, 3])).toBe(false);
  });

  test('should return false for object with properties', () => {
    expect(isEmpty({ a: 1 })).toBe(false);
  });
});
