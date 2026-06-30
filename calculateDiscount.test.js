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
    // Test to be written
  });

  it('should return original price for regular members (100% multiplier)', () => {
    // Test to be written
  });

  it('should throw error if price is not positive', () => {
    // Test to be written
  });

  it('should round result to 2 decimal places', () => {
    // Test to be written
  });
});
