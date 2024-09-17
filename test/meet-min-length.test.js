const { meetMinLength } = require('../lib/utils/validation.js');

describe('meetMinLength function', () => {
  test('should return false for string shorter than minimum length', () => {
    expect(meetMinLength('abc', 4)).toBe(false);
    expect(meetMinLength('abc', '4')).toBe(false);
  });

  test('should return true for string equal to minimum length', () => {
    expect(meetMinLength('abcd', 4)).toBe(true);
    expect(meetMinLength('abcd', '4')).toBe(true);
  });

  test('should return true for string longer than minimum length', () => {
    expect(meetMinLength('abcde', 4)).toBe(true);
    expect(meetMinLength('abcde', '4')).toBe(true);
  });

  test('should handle empty string', () => {
    expect(meetMinLength('', 1)).toBe(false);
    expect(meetMinLength('', '1')).toBe(false);
    expect(meetMinLength('', 0)).toBe(true);
    expect(meetMinLength('', '0')).toBe(true);
  });

  test('should handle number input for data', () => {
    expect(meetMinLength(123, 4)).toBe(false);
    expect(meetMinLength(123, '4')).toBe(false);
    expect(meetMinLength(1234, 4)).toBe(true);
    expect(meetMinLength(1234, '4')).toBe(true);
  });

  test('should handle boolean input for data', () => {
    expect(meetMinLength(true, 5)).toBe(false);
    expect(meetMinLength(true, '5')).toBe(false);
    expect(meetMinLength(false, 5)).toBe(false);
    expect(meetMinLength(false, '5')).toBe(false);
  });

  test('should return true for null input', () => {
    expect(meetMinLength(null, 1)).toBe(true);
    expect(meetMinLength(null, '1')).toBe(true);
  });

  test('should return false for undefined input', () => {
    expect(meetMinLength(undefined, 1)).toBe(false);
    expect(meetMinLength(undefined, '1')).toBe(false);
  });

  test('should return true for string much longer than minimum length', () => {
    expect(meetMinLength('This is a long string', 5)).toBe(true);
    expect(meetMinLength('This is a long string', '5')).toBe(true);
  });

  test('should handle zero length requirement', () => {
    expect(meetMinLength('', 0)).toBe(true);
    expect(meetMinLength('', '0')).toBe(true);
    expect(meetMinLength('a', 0)).toBe(true);
    expect(meetMinLength('a', '0')).toBe(true);
  });

  // Error handling tests
  test('should throw error for negative length', () => {
    expect(() => meetMinLength('abc', -1)).toThrow(
      'Length must be a non-negative integer or a string representation of a non-negative integer'
    );
    expect(() => meetMinLength('abc', '-1')).toThrow(
      'Length must be a non-negative integer or a string representation of a non-negative integer'
    );
  });

  test('should throw error for non-integer length', () => {
    expect(() => meetMinLength('abc', 3.5)).toThrow(
      'Length must be a non-negative integer or a string representation of a non-negative integer'
    );
    expect(() => meetMinLength('abc', '3.5')).toThrow(
      'Length must be a non-negative integer or a string representation of a non-negative integer'
    );
  });

  test('should throw error for non-numeric string length', () => {
    expect(() => meetMinLength('abc', 'three')).toThrow(
      'Length must be a non-negative integer or a string representation of a non-negative integer'
    );
  });

  test('should throw error for NaN length', () => {
    expect(() => meetMinLength('abc', NaN)).toThrow(
      'Length must be a non-negative integer or a string representation of a non-negative integer'
    );
  });

  test('should throw error for Infinity length', () => {
    expect(() => meetMinLength('abc', Infinity)).toThrow(
      'Length must be a non-negative integer or a string representation of a non-negative integer'
    );
    expect(() => meetMinLength('abc', 'Infinity')).toThrow(
      'Length must be a non-negative integer or a string representation of a non-negative integer'
    );
  });
});
