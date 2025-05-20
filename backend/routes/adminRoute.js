    const express = require('express');
    const 
    { 
        login,
        getAdminData,
        addCoupon,
        delCoupon,
        getClaimHistory,
        getDashboardStats,
        logout,
        allCoupon
    } = require('../controllers/adminController');
    const auth = require('../middleware/auth');

    const router = express.Router();

    router.get('/data', auth, getAdminData);
    router.post('/coupon', auth, addCoupon);
    router.post('/delete/:code',auth, delCoupon);
    router.get('/allcoupons', auth, allCoupon);
    router.get('/history', auth, getClaimHistory);
    router.post('/login',login);
    router.get('/dashboard',auth,getDashboardStats);
    router.post('/logout',logout);



    module.exports = router;
