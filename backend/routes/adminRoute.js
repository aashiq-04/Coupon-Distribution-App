const express = require('express');
const { login, getAdminData,addCoupon, delCoupon, getClaimHistory,toggleCoupon, } = require('../controllers/adminController');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/data', auth, getAdminData);
router.post('/coupon', auth, addCoupon);
router.post('/delete/:code',auth, delCoupon);
router.patch('/coupon/:code/toggle', auth, toggleCoupon);
router.get('/history', auth, getClaimHistory);
router.post('/login',login);



module.exports = router;
