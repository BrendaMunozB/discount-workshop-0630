const { calculateDiscount } = require('./calculateDiscount');

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

  getTotal() {
    // Calculate subtotal (sum of all item subtotals)
    const subtotal = Object.values(this.items).reduce((sum, item) => {
      return sum + (item.price * item.quantity);
    }, 0);

    // If empty cart, return 0
    if (subtotal === 0) {
      return 0;
    }

    // Apply membership discount using calculateDiscount
    const discountedTotal = calculateDiscount(subtotal, this.membershipTier);

    return discountedTotal;
  }
}

module.exports = { ShoppingCart };
