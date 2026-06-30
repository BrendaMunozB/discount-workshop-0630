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
