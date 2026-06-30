const { ShoppingCart } = require('./ShoppingCart');

describe('ShoppingCart', () => {
  it('should create a new cart with a membership tier', () => {
    const cart = new ShoppingCart('gold');
    expect(cart).toBeDefined();
  });

  it('should start with an empty cart', () => {
    const cart = new ShoppingCart('gold');
    expect(cart.getContents()).toEqual([]);
  });

  it('should accept any membership tier value', () => {
    expect(new ShoppingCart('gold')).toBeDefined();
    expect(new ShoppingCart('silver')).toBeDefined();
    expect(new ShoppingCart('regular')).toBeDefined();
    expect(new ShoppingCart('platinum')).toBeDefined();
    expect(new ShoppingCart('')).toBeDefined();
  });
});
