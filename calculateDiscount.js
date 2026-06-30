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
