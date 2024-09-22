const { isValidDate } = require('../lib/utils/validation.js');

describe('isValidDate function', () => {
  test('should return true for valid Date objects', () => {
    expect(isValidDate(new Date())).toBe(true);
    expect(isValidDate(new Date('2023-05-15'))).toBe(true);
    expect(isValidDate(new Date('1900-01-01'))).toBe(true);
  });

  test('should return false for invalid Date objects', () => {
    expect(isValidDate(new Date('invalid'))).toBe(false);
  });

  test('should return true for valid date strings', () => {
    expect(isValidDate('2023-05-15')).toBe(true);
    expect(isValidDate('May 15, 2023')).toBe(true);
    expect(isValidDate('2023-05-15T12:00:00Z')).toBe(true);
    expect(isValidDate('05/15/2023')).toBe(true);
  });

  test('should return false for invalid date strings', () => {
    expect(isValidDate('invalid')).toBe(false);
    expect(isValidDate('2023-13-45')).toBe(false);
    expect(isValidDate('May 32, 2023')).toBe(false);
  });

  test('should return true for valid timestamps', () => {
    expect(isValidDate(1684108800000)).toBe(true); // May 15, 2023
    expect(isValidDate(0)).toBe(true); // Unix epoch
  });

  test('should return false for invalid timestamps', () => {
    expect(isValidDate(NaN)).toBe(false);
    expect(isValidDate(Infinity)).toBe(false);
  });

  test('should return true for null input', () => {
    expect(isValidDate(null)).toBe(true);
  });

  test('should return false for non-date types', () => {
    expect(isValidDate(undefined)).toBe(false);
    expect(isValidDate({})).toBe(false);
    expect(isValidDate([])).toBe(false);
    expect(isValidDate(true)).toBe(false);
    expect(isValidDate(false)).toBe(false);
    expect(isValidDate(() => {})).toBe(false);
  });

  test('should handle edge cases', () => {
    expect(isValidDate('0000-01-01')).toBe(true);
    expect(isValidDate('9999-12-31')).toBe(true);
    expect(isValidDate('')).toBe(false);
    expect(isValidDate(' ')).toBe(false);
  });
});
