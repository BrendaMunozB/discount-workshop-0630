/**
 * Calculates the final price of an item after applying membership-based discount.
 *
 * Discount rates by membership tier:
 * - 'gold': 15% off (pay 85%)
 * - 'silver': 10% off (pay 90%)
 * - 'regular', unknown, or any other value: no discount (pay 100%)
 *
 * @param {number} price - Original price before discount (must be positive)
 * @param {string} membershipTier - Customer membership tier ('gold', 'silver', 'regular', etc.)
 * @returns {number} Final price rounded to 2 decimal places
 * @throws {Error} If price is not positive (≤ 0)
 *
 * @example
 * calculateDiscount(100, 'gold') // returns 85
 * calculateDiscount(100, 'silver') // returns 90
 * calculateDiscount(100, 'regular') // returns 100
 * calculateDiscount(100, 'unknown') // returns 100
 * calculateDiscount(0, 'gold') // throws Error
 */
function calculateDiscount(price, membershipTier) {
  // Validate price
  if (price <= 0) {
    throw new Error('Price must be positive');
  }

  // Normalize tier to lowercase
  const tier = membershipTier.toLowerCase();

  // Determine multiplier based on tier
  let multiplier = 1.0; // default: regular (no discount)

  if (tier === 'gold') {
    multiplier = 0.85;
  } else if (tier === 'silver') {
    multiplier = 0.90;
  }
  // All other tiers (including 'regular', '', unknown) stay at 1.0

  // Calculate discounted price
  const discountedPrice = price * multiplier;

  // Round to 2 decimal places
  const rounded = Math.round(discountedPrice * 100) / 100;

  return rounded;
}

module.exports = { calculateDiscount };
