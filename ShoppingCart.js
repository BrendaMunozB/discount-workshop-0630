class ShoppingCart {
  constructor(membershipTier) {
    this.membershipTier = membershipTier;
    this.items = {};
  }

  addItem(id, price, quantity) {
    // Validate price
    if (price <= 0) {
      throw new Error('Price must be positive');
    }

    // Validate quantity
    if (!Number.isInteger(quantity) || quantity <= 0) {
      throw new Error('Quantity must be a positive integer');
    }

    // Add or replace item
    this.items[id] = {
      id,
      price,
      quantity
    };
  }

  removeItem(id) {
    delete this.items[id];
  }

  getContents() {
    return Object.values(this.items);
  }
}

module.exports = { ShoppingCart };
