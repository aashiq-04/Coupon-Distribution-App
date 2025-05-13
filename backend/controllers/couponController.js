const Coupon = require('../models/Coupon');

let roundRobinIndex = 0;
const COOLDOWN_PERIOD = 20 * 1000; // 20 seconds cooldown
const lastClaimMap = {};

const getCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find(); // all coupons
    res.json(coupons);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};


const claimCoupon = async (req, res) => {
  // Get  IP (handle proxies)
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const currTime = Date.now();

  console.log(`Client IP: ${ip}`);
  console.log(`Current Time: ${currTime}`);

  // IP-based cooldown check
  if (lastClaimMap[ip] && currTime - lastClaimMap[ip] < COOLDOWN_PERIOD) {
    return res.status(429).json({ 
      message: `You have to wait ${Math.ceil((COOLDOWN_PERIOD - (currTime - lastClaimMap[ip])) / 1000)} seconds before claiming another coupon.` 
    });
  }

  //  Cookie-based cooldown check
  if (req.cookies.lastClaimTime) {
    const lastClaimTime = parseInt(req.cookies.lastClaimTime);
    console.log(`Last Claim Time from Cookie: ${lastClaimTime}`);
    
    if (currTime - lastClaimTime < COOLDOWN_PERIOD) {
      return res.status(429).json({
        message: `You have to wait ${Math.ceil((COOLDOWN_PERIOD - (currTime - lastClaimTime)) / 1000)} seconds before claiming another coupon.`
      });
    }
  }

  //  Read available coupons
  try{
    const availableCoupons = await Coupon.find({isClaimed:false});
    if (availableCoupons.length===0)
    {
      return res.status(400).json({message:"No Coupon Availale Right Now"});
    }
    const nextCoupon = availableCoupons[roundRobinIndex%availableCoupons.length];
    nextCoupon.isClaimed = true;
    nextCoupon.claimedBy = ip;
    nextCoupon.claimedAt = new Date();
    await nextCoupon.save();

    roundRobinIndex++;
    lastClaimMap[ip]=currTime;
    res.cookie('lastClaimTime',currTime.toString(),{
      httpOnly:true, 
      secure:false, 
      sameSite:'lax'
    });
    console.log(`Coupon ${nextCoupon.code} claimed by ${ip}`);
    console.log("Coupon Claimed");
    res.json({message:`Coupon ${nextCoupon.code} claimed successfully`});
  }catch(err)
  {
    res.status(500).json({message:'Server Error'});
  }
};


module.exports = { getCoupons, claimCoupon };





