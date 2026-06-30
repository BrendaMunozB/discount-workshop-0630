const { calculateDiscount } = require('./calculateDiscount');

/**
 * A shopping cart that manages items and applies membership-based discounts.
 *
 * Items are stored by product ID and can be added, removed, or viewed.
 * When calculating the total, the sum of all item subtotals is multiplied
 * by the membership discount multiplier (via calculateDiscount).
 *
 * @class ShoppingCart
 * @param {string} membershipTier - Customer membership tier ('gold', 'silver', 'regular', or any value)
 */
class ShoppingCart {
  /**
   * Creates a new shopping cart with the specified membership tier.
   *
   * @param {string} membershipTier - The membership tier for applying discounts to all items
   */
  constructor(membershipTier) {
    this.membershipTier = membershipTier;
    this.items = {};
  }

  /**
   * Adds or replaces an item in the cart.
   *
   * If the item ID already exists, this replaces its price and quantity (does not add).
   * Prices must be positive. Quantities must be positive integers.
   *
   * @param {string} id - Unique product identifier
   * @param {number} price - Price per unit (must be > 0)
   * @param {number} quantity - Number of units (must be positive integer)
   * @throws {Error} If price <= 0: "Price must be positive"
   * @throws {Error} If quantity is not a positive integer: "Quantity must be a positive integer"
   *
   * @example
   * cart.addItem('SHIRT', 50, 2); // Adds SHIRT at $50 each, qty 2
   * cart.addItem('SHIRT', 40, 1); // Replaces with SHIRT at $40 each, qty 1
   */
  addItem(id, price, quantity) {
    if (price <= 0) {
      throw new Error('Price must be positive');
    }

    if (!Number.isInteger(quantity) || quantity <= 0) {
      throw new Error('Quantity must be a positive integer');
    }

    this.items[id] = { id, price, quantity };
  }

  /**
   * Removes an item from the cart by product ID.
   *
   * If the item doesn't exist, this silently succeeds (idempotent).
   *
   * @param {string} id - Product identifier to remove
   *
   * @example
   * cart.removeItem('SHIRT'); // Removes all SHIRT items
   * cart.removeItem('NONEXISTENT'); // No error, cart unchanged
   */
  removeItem(id) {
    delete this.items[id];
  }

  /**
   * Calculates the total cart value after applying membership discount.
   *
   * The subtotal is the sum of all (price × quantity) for each item.
   * The final total applies the membership discount to the subtotal using calculateDiscount.
   * Result is rounded to 2 decimal places.
   *
   * @returns {number} Final cart total after discount, rounded to 2 decimal places
   *
   * @example
   * cart.addItem('ITEM', 100, 1);
   * cart.getTotal(); // With gold tier: 85 (100 * 0.85)
   */
  getTotal() {
    const subtotal = Object.values(this.items).reduce((sum, item) => {
      return sum + (item.price * item.quantity);
    }, 0);

    if (subtotal === 0) {
      return 0;
    }

    const discountedTotal = calculateDiscount(subtotal, this.membershipTier);

    return discountedTotal;
  }

  /**
   * Returns the current contents of the cart.
   *
   * Returns an array of items, each with id, price, and quantity.
   * The array is a copy of the internal items (modifications do not affect the cart).
   *
   * @returns {Array<{id: string, price: number, quantity: number}>} Array of items in cart
   *
   * @example
   * cart.addItem('SHIRT', 50, 2);
   * cart.getContents();
   * // [{ id: 'SHIRT', price: 50, quantity: 2 }]
   */
  getContents() {
    return Object.values(this.items);
  }
}

module.exports = { ShoppingCart };
