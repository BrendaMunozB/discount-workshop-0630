const { calculateDiscount } = require('./calculateDiscount');

describe('calculateDiscount', () => {
  it('should calculate gold member discount (85% multiplier)', () => {
    expect(calculateDiscount(100, 'gold')).toBe(85.00);
    expect(calculateDiscount(100, 'GOLD')).toBe(85.00); // case-insensitive
    expect(calculateDiscount(33.33, 'gold')).toBe(28.33);
    expect(calculateDiscount(99.99, 'gold')).toBe(84.99);
    expect(calculateDiscount(1.176, 'gold')).toBe(1.00); // rounding boundary
  });

  it('should calculate silver member discount (90% multiplier)', () => {
    expect(calculateDiscount(100, 'silver')).toBe(90.00);
    expect(calculateDiscount(100, 'SILVER')).toBe(90.00); // case-insensitive
    expect(calculateDiscount(50.50, 'silver')).toBe(45.45);
    expect(calculateDiscount(99.99, 'silver')).toBe(89.99);
  });

  it('should return original price for regular members (100% multiplier)', () => {
    expect(calculateDiscount(100, 'regular')).toBe(100.00);
    expect(calculateDiscount(100, 'REGULAR')).toBe(100.00); // case-insensitive
    expect(calculateDiscount(100, 'unknown')).toBe(100.00); // unknown tier
    expect(calculateDiscount(100, 'premium')).toBe(100.00); // unrecognized tier
    expect(calculateDiscount(100, '')).toBe(100.00); // empty string
    expect(calculateDiscount(0.01, 'random')).toBe(0.01); // any unknown tier
  });

  it('should throw error if price is not positive', () => {
    expect(() => calculateDiscount(0, 'gold')).toThrow();
    expect(() => calculateDiscount(-50, 'silver')).toThrow();
    expect(() => calculateDiscount(-0.01, 'regular')).toThrow();
  });

  it('should round result to 2 decimal places', () => {
    expect(calculateDiscount(1.005, 'gold')).toBe(0.85); // 1.005 * 0.85 = 0.8542 → 0.85
    expect(calculateDiscount(1.176, 'gold')).toBe(1.00); // 1.176 * 0.85 = 0.9996 → 1.00
    expect(calculateDiscount(10.124, 'silver')).toBe(9.11); // 10.124 * 0.90 = 9.1116 → 9.11
    expect(calculateDiscount(999999.99, 'gold')).toBe(849999.99); // Large number rounding
  });
});
