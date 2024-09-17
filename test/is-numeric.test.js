const { isNumeric } = require('../lib/utils/validation.js');

describe('isNumeric function', () => {
  test('should return true for valid numbers', () => {
    expect(isNumeric(42)).toBe(true);
    expect(isNumeric(3.14)).toBe(true);
    expect(isNumeric(-42)).toBe(true);
    expect(isNumeric(0)).toBe(true);
  });

  test('should return true for valid numeric strings', () => {
    expect(isNumeric('42')).toBe(true);
    expect(isNumeric('3.14')).toBe(true);
    expect(isNumeric('-42')).toBe(true);
    expect(isNumeric('0')).toBe(true);
    expect(isNumeric('+42')).toBe(true);
    expect(isNumeric('1e3')).toBe(true);
    expect(isNumeric('0xFF')).toBe(true);
    expect(isNumeric('0b1010')).toBe(true);
    expect(isNumeric('0o777')).toBe(true);
    expect(isNumeric('3.14e-10')).toBe(true);
  });

  test('should return true for numeric strings with whitespace', () => {
    expect(isNumeric('  42  ')).toBe(true);
    expect(isNumeric('  3.14  ')).toBe(true);
  });

  test('should return false for non-numeric strings', () => {
    expect(isNumeric('hello')).toBe(false);
    expect(isNumeric('')).toBe(false);
    expect(isNumeric(' ')).toBe(false);
  });

  test('should return false for special numeric values', () => {
    expect(isNumeric(NaN)).toBe(false);
    expect(isNumeric(Infinity)).toBe(false);
    expect(isNumeric(-Infinity)).toBe(false);
    expect(isNumeric('Infinity')).toBe(false);
    expect(isNumeric('-Infinity')).toBe(false);
    expect(isNumeric('NaN')).toBe(false);
  });

  test('should return true for null input', () => {
    expect(isNumeric(null)).toBe(true);
  });

  test('should return false for non-numeric types', () => {
    expect(isNumeric(undefined)).toBe(false);
    expect(isNumeric([])).toBe(false);
    expect(isNumeric({})).toBe(false);
    expect(isNumeric(() => {})).toBe(false);
  });
});
