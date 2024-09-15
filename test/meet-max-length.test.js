const { meetMaxLength } = require('../lib/utils/validation.js');

describe('meetMaxLength function', () => {
  test('should return true for string shorter than maximum length', () => {
    expect(meetMaxLength('abc', 4)).toBe(true);
    expect(meetMaxLength('abc', '4')).toBe(true);
  });

  test('should return true for string equal to maximum length', () => {
    expect(meetMaxLength('abcd', 4)).toBe(true);
    expect(meetMaxLength('abcd', '4')).toBe(true);
  });

  test('should return false for string longer than maximum length', () => {
    expect(meetMaxLength('abcde', 4)).toBe(false);
    expect(meetMaxLength('abcde', '4')).toBe(false);
  });

  test('should handle empty string', () => {
    expect(meetMaxLength('', 1)).toBe(true);
    expect(meetMaxLength('', '1')).toBe(true);
    expect(meetMaxLength('', 0)).toBe(true);
    expect(meetMaxLength('', '0')).toBe(true);
  });

  test('should handle number input for data', () => {
    expect(meetMaxLength(123, 4)).toBe(true);
    expect(meetMaxLength(123, '4')).toBe(true);
    expect(meetMaxLength(12345, 4)).toBe(false);
    expect(meetMaxLength(12345, '4')).toBe(false);
  });

  test('should handle boolean input for data', () => {
    expect(meetMaxLength(true, 5)).toBe(false);
    expect(meetMaxLength(true, '5')).toBe(false);
    expect(meetMaxLength(false, 5)).toBe(false);
    expect(meetMaxLength(false, '5')).toBe(false);
  });

  test('should return true for null input', () => {
    expect(meetMaxLength(null, 1)).toBe(false);
    expect(meetMaxLength(null, '1')).toBe(false);
  });

  test('should return true for undefined input', () => {
    expect(meetMaxLength(undefined, 1)).toBe(false);
    expect(meetMaxLength(undefined, '1')).toBe(false);
  });

  test('should return false for string much longer than maximum length', () => {
    expect(meetMaxLength('This is a long string', 5)).toBe(false);
    expect(meetMaxLength('This is a long string', '5')).toBe(false);
  });

  test('should handle zero length requirement', () => {
    expect(meetMaxLength('', 0)).toBe(true);
    expect(meetMaxLength('', '0')).toBe(true);
    expect(meetMaxLength('a', 0)).toBe(false);
    expect(meetMaxLength('a', '0')).toBe(false);
  });

  // Error handling tests
  test('should throw error for negative length', () => {
    expect(() => meetMaxLength('abc', -1)).toThrow(
      'Length must be a non-negative integer or a string representation of a non-negative integer'
    );
    expect(() => meetMaxLength('abc', '-1')).toThrow(
      'Length must be a non-negative integer or a string representation of a non-negative integer'
    );
  });

  test('should throw error for non-integer length', () => {
    expect(() => meetMaxLength('abc', 3.5)).toThrow(
      'Length must be a non-negative integer or a string representation of a non-negative integer'
    );
    expect(() => meetMaxLength('abc', '3.5')).toThrow(
      'Length must be a non-negative integer or a string representation of a non-negative integer'
    );
  });

  test('should throw error for non-numeric string length', () => {
    expect(() => meetMaxLength('abc', 'three')).toThrow(
      'Length must be a non-negative integer or a string representation of a non-negative integer'
    );
  });

  test('should throw error for NaN length', () => {
    expect(() => meetMaxLength('abc', NaN)).toThrow(
      'Length must be a non-negative integer or a string representation of a non-negative integer'
    );
  });

  test('should throw error for Infinity length', () => {
    expect(() => meetMaxLength('abc', Infinity)).toThrow(
      'Length must be a non-negative integer or a string representation of a non-negative integer'
    );
    expect(() => meetMaxLength('abc', 'Infinity')).toThrow(
      'Length must be a non-negative integer or a string representation of a non-negative integer'
    );
  });
});
