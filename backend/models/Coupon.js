const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  isClaimed: { type: Boolean, default: false },
  claimedBy: { type: String },
  claimedAt: { type: Date }
});

const Coupon = mongoose.model('Coupon', couponSchema);
module.exports = Coupon;
