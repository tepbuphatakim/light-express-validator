const { isDecimal } = require('../lib/utils/validation.js');

describe('isDecimal function', () => {
  test('should return true for valid integers', () => {
    expect(isDecimal(0)).toBe(true);
    expect(isDecimal(42)).toBe(true);
    expect(isDecimal(-42)).toBe(true);
    expect(isDecimal('0')).toBe(true);
    expect(isDecimal('42')).toBe(true);
    expect(isDecimal('-42')).toBe(true);
  });

  test('should return true for valid decimals with exact decimal places', () => {
    expect(isDecimal(3.14, 2)).toBe(true);
    expect(isDecimal('3.14', 2)).toBe(true);
    expect(isDecimal(-3.14, 2)).toBe(true);
    expect(isDecimal('-3.14', 2)).toBe(true);
    expect(isDecimal(3.1, 1)).toBe(true);
    expect(isDecimal('3.1', 1)).toBe(true);
  });

  test('should return true for valid decimals with fewer decimal places', () => {
    expect(isDecimal(3.1, 2)).toBe(true);
    expect(isDecimal('3.1', 2)).toBe(true);
    expect(isDecimal(3, 2)).toBe(true);
    expect(isDecimal('3', 2)).toBe(true);
  });

  test('should return false for decimals with more decimal places than specified', () => {
    expect(isDecimal(3.142, 2)).toBe(false);
    expect(isDecimal('3.142', 2)).toBe(false);
  });

  test('should return false for non-numeric strings', () => {
    expect(isDecimal('abc')).toBe(false);
    expect(isDecimal('12a34')).toBe(false);
    expect(isDecimal('3.14.15')).toBe(false);
  });

  test('should return false for empty or whitespace-only strings', () => {
    expect(isDecimal('')).toBe(false);
    expect(isDecimal(' ')).toBe(false);
    expect(isDecimal('\t')).toBe(false);
  });

  test('should return false for non-numeric types', () => {
    expect(isDecimal(null)).toBe(false);
    expect(isDecimal(undefined)).toBe(false);
    expect(isDecimal({})).toBe(false);
    expect(isDecimal([])).toBe(false);
    expect(isDecimal(() => {})).toBe(false);
  });

  test('should handle edge cases', () => {
    expect(isDecimal('0.00', 2)).toBe(true);
    expect(isDecimal('-0.00', 2)).toBe(true);
    expect(isDecimal('.5', 1)).toBe(true);
    expect(isDecimal('-.5', 1)).toBe(true);
    expect(isDecimal('1.', 0)).toBe(false);
    expect(isDecimal('1.', 1)).toBe(true);
  });
});
