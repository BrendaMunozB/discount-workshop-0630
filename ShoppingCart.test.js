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
