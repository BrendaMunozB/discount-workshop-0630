class ShoppingCart {
  constructor(membershipTier) {
    this.membershipTier = membershipTier;
    this.items = {};
  }

  getContents() {
    return [];
  }
}

module.exports = { ShoppingCart };
