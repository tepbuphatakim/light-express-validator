const { isBoolean } = require('../lib/utils/validation.js');

describe('isBoolean function', () => {
  test('should return true for boolean values', () => {
    expect(isBoolean(true)).toBe(true);
    expect(isBoolean(false)).toBe(true);
  });

  test('should return true for boolean string representations', () => {
    expect(isBoolean('true')).toBe(true);
    expect(isBoolean('false')).toBe(true);
    expect(isBoolean('TRUE')).toBe(true);
    expect(isBoolean('FALSE')).toBe(true);
    expect(isBoolean(' true ')).toBe(true);
    expect(isBoolean(' false ')).toBe(false);
  });

  test('should return true for 0 and 1', () => {
    expect(isBoolean(0)).toBe(true);
    expect(isBoolean(1)).toBe(true);
  });

  test('should return false for non-boolean strings', () => {
    expect(isBoolean('yes')).toBe(false);
    expect(isBoolean('no')).toBe(false);
    expect(isBoolean('on')).toBe(false);
    expect(isBoolean('off')).toBe(false);
    expect(isBoolean('0')).toBe(false);
    expect(isBoolean('1')).toBe(false);
    expect(isBoolean('')).toBe(false);
  });

  test('should return false for non-boolean numbers', () => {
    expect(isBoolean(2)).toBe(false);
    expect(isBoolean(-1)).toBe(false);
    expect(isBoolean(1.5)).toBe(false);
    expect(isBoolean(NaN)).toBe(false);
    expect(isBoolean(Infinity)).toBe(false);
  });

  test('should return false for non-boolean types', () => {
    expect(isBoolean(null)).toBe(false);
    expect(isBoolean(undefined)).toBe(false);
    expect(isBoolean({})).toBe(false);
    expect(isBoolean([])).toBe(false);
    expect(isBoolean(() => {})).toBe(false);
    expect(isBoolean(Symbol('symbol'))).toBe(false);
  });

  test('should handle edge cases', () => {
    expect(isBoolean(Boolean(true))).toBe(true);
    expect(isBoolean(Boolean(false))).toBe(true);
    expect(isBoolean(new Boolean(true))).toBe(false); // Boolean object, not primitive
    expect(isBoolean(new Boolean(false))).toBe(false); // Boolean object, not primitive
  });
});
