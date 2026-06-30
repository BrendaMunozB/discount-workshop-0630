function calculateDiscount(price, membership) {
  if (price <= 0) {
    throw new Error('Price must be positive');
  }

  let discountRate = 1;
  if (membership === 'gold') {
    discountRate = 0.8;
  } else if (membership === 'silver') {
    discountRate = 0.9;
  }

  return Math.round(price * discountRate * 100) / 100;
}

module.exports = { calculateDiscount };
