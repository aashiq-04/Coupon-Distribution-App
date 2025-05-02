const express = require('express');
const { getCoupons, claimCoupon } = require('../controllers/couponController');

const router = express.Router();

router.get('/', getCoupons);
router.post('/claim', claimCoupon);

module.exports = router;
