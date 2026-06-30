const { calculateDiscount } = require('./calculateDiscount');

describe('calculateDiscount', () => {
  test('gold member pays 80% of the price', () => {
    expect(calculateDiscount(100, 'gold')).toBe(80);
  });

  test('silver member pays 90% of the price', () => {
    expect(calculateDiscount(100, 'silver')).toBe(90);
  });

  test('regular member pays the full price', () => {
    expect(calculateDiscount(100, 'regular')).toBe(100);
  });

  test('unknown membership pays the full price', () => {
    expect(calculateDiscount(100, 'platinum')).toBe(100);
  });

  test('rounds the final price to 2 decimal places', () => {
    expect(calculateDiscount(99.99, 'gold')).toBe(79.99);
  });

  test('throws when price is zero', () => {
    expect(() => calculateDiscount(0, 'gold')).toThrow('Price must be positive');
  });

  test('throws when price is negative', () => {
    expect(() => calculateDiscount(-10, 'gold')).toThrow('Price must be positive');
  });

  test('rounds up correctly for gold member', () => {
    expect(calculateDiscount(10.015, 'gold')).toBe(8.01);
  });

  test('handles very small prices without rounding error', () => {
    expect(calculateDiscount(0.01, 'silver')).toBe(0.01);
  });

  test('treats undefined membership as no discount', () => {
    expect(calculateDiscount(100, undefined)).toBe(100);
  });
});
