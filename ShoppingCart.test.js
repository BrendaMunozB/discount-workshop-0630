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

describe('addItem', () => {
  it('should add an item to an empty cart', () => {
    const cart = new ShoppingCart('gold');
    cart.addItem('SHIRT', 50, 2);
    const contents = cart.getContents();
    expect(contents).toHaveLength(1);
    expect(contents[0]).toEqual({ id: 'SHIRT', price: 50, quantity: 2 });
  });

  it('should replace an existing item with the same id', () => {
    const cart = new ShoppingCart('gold');
    cart.addItem('SHIRT', 50, 2);
    cart.addItem('SHIRT', 40, 3); // Replace previous SHIRT
    const contents = cart.getContents();
    expect(contents).toHaveLength(1);
    expect(contents[0]).toEqual({ id: 'SHIRT', price: 40, quantity: 3 });
  });

  it('should add multiple different items', () => {
    const cart = new ShoppingCart('gold');
    cart.addItem('SHIRT', 50, 1);
    cart.addItem('PANTS', 80, 2);
    cart.addItem('HAT', 25, 1);
    const contents = cart.getContents();
    expect(contents).toHaveLength(3);
  });

  it('should throw error if price is zero', () => {
    const cart = new ShoppingCart('gold');
    expect(() => cart.addItem('ITEM', 0, 1)).toThrow('Price must be positive');
  });

  it('should throw error if price is negative', () => {
    const cart = new ShoppingCart('gold');
    expect(() => cart.addItem('ITEM', -50, 1)).toThrow('Price must be positive');
  });

  it('should throw error if quantity is not a positive integer', () => {
    const cart = new ShoppingCart('gold');
    expect(() => cart.addItem('ITEM', 50, 0)).toThrow('Quantity must be a positive integer');
    expect(() => cart.addItem('ITEM', 50, -1)).toThrow('Quantity must be a positive integer');
    expect(() => cart.addItem('ITEM', 50, 1.5)).toThrow('Quantity must be a positive integer');
  });

  it('should accept decimal prices', () => {
    const cart = new ShoppingCart('gold');
    cart.addItem('ITEM', 29.99, 1);
    const contents = cart.getContents();
    expect(contents[0].price).toBe(29.99);
  });
});

describe('removeItem', () => {
  it('should remove an existing item from the cart', () => {
    const cart = new ShoppingCart('gold');
    cart.addItem('SHIRT', 50, 2);
    cart.addItem('PANTS', 80, 1);
    cart.removeItem('SHIRT');
    const contents = cart.getContents();
    expect(contents).toHaveLength(1);
    expect(contents[0].id).toBe('PANTS');
  });

  it('should silently succeed if item does not exist', () => {
    const cart = new ShoppingCart('gold');
    cart.addItem('SHIRT', 50, 2);
    expect(() => cart.removeItem('NONEXISTENT')).not.toThrow();
    const contents = cart.getContents();
    expect(contents).toHaveLength(1);
  });

  it('should be idempotent (multiple removes of same item)', () => {
    const cart = new ShoppingCart('gold');
    cart.addItem('SHIRT', 50, 2);
    cart.removeItem('SHIRT');
    expect(() => cart.removeItem('SHIRT')).not.toThrow();
    const contents = cart.getContents();
    expect(contents).toHaveLength(0);
  });

  it('should remove all quantity of an item', () => {
    const cart = new ShoppingCart('gold');
    cart.addItem('SHIRT', 50, 10);
    cart.removeItem('SHIRT');
    const contents = cart.getContents();
    expect(contents).toHaveLength(0);
  });
});

describe('getTotal', () => {
  it('should return 0 for empty cart', () => {
    const cart = new ShoppingCart('gold');
    expect(cart.getTotal()).toBe(0);
  });

  it('should calculate subtotal for single item without discount', () => {
    const cart = new ShoppingCart('regular');
    cart.addItem('ITEM', 100, 2); // 100 * 2 = 200
    expect(cart.getTotal()).toBe(200);
  });

  it('should apply gold member discount (85% multiplier)', () => {
    const cart = new ShoppingCart('gold');
    cart.addItem('ITEM', 100, 1);
    expect(cart.getTotal()).toBe(85); // 100 * 0.85 = 85
  });

  it('should apply silver member discount (90% multiplier)', () => {
    const cart = new ShoppingCart('silver');
    cart.addItem('ITEM', 100, 1);
    expect(cart.getTotal()).toBe(90); // 100 * 0.90 = 90
  });

  it('should sum multiple items before applying discount', () => {
    const cart = new ShoppingCart('gold');
    cart.addItem('SHIRT', 100, 1); // 100
    cart.addItem('PANTS', 50, 2);  // 100
    // Subtotal = 200, with gold discount: 200 * 0.85 = 170
    expect(cart.getTotal()).toBe(170);
  });

  it('should round final total to 2 decimal places', () => {
    const cart = new ShoppingCart('gold');
    cart.addItem('ITEM', 10.124, 1); // 10.124 * 0.85 = 8.6054 → 8.61
    expect(cart.getTotal()).toBe(8.61);
  });

  it('should handle large numbers correctly', () => {
    const cart = new ShoppingCart('gold');
    cart.addItem('ITEM', 999999.99, 1); // 999999.99 * 0.85 = 849999.9915 → 849999.99
    expect(cart.getTotal()).toBe(849999.99);
  });

  it('should work with unknown membership tier (no discount)', () => {
    const cart = new ShoppingCart('platinum');
    cart.addItem('ITEM', 100, 1);
    expect(cart.getTotal()).toBe(100); // Unknown tier = no discount
  });

  it('should recalculate total after item removal', () => {
    const cart = new ShoppingCart('silver');
    cart.addItem('SHIRT', 100, 1);
    cart.addItem('PANTS', 100, 1);
    expect(cart.getTotal()).toBe(180); // 200 * 0.90 = 180
    cart.removeItem('PANTS');
    expect(cart.getTotal()).toBe(90); // 100 * 0.90 = 90
  });
});
