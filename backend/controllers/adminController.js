const jwt = require('jsonwebtoken');
const Coupon = require('../models/Coupon'); //MONGODB


// ✅ Admin Login
const login = (req, res) => {
  const { username, password } = req.body;
  if (username === process.env.ADMIN_USER && password === process.env.ADMIN_PASS) {
    const token = jwt.sign({ id: username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true, sameSite:'lax',secure:false,});
    console.log("Logged IN");
    return res.json({ message: 'Logged in' });
  } else {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
};

const logout = (req,res)=>{
  res.clearCookie('token');
  res.json({message:"Logout Successfull"});
}

//GET
const getAdminData =async (req, res) => {
  const coupons = await Coupon.find(); // Read from JSON
  res.json(coupons);
};


//POST
const addCoupon = async (req, res) => {
  const { code } = req.body;
  try {
    const existing = await Coupon.findOne({ code });
    if (existing) {
      return res.status(400).json({ message: 'Coupon already exists' });
    }

    const newCoupon = new Coupon({ code });
    await newCoupon.save();

    res.json({ message: 'Coupon added successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};


// POST METHOD
const delCoupon = async (req, res) => {
  const { code } = req.params;
  try {
    const deleted = await Coupon.findOneAndDelete({ code });
    if (!deleted) return res.status(404).json({ message: 'Coupon not found' });
    res.json({ message: 'Coupon deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};




const allCoupon = async (req, res) => {
  try {
    const coupons = await Coupon.find(); // all coupons
    res.json(coupons);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};





//GET 
const getClaimHistory = async (req, res) => {
  try {
    const history = await Coupon.find({ isClaimed: true }, 'code claimedBy claimedAt');
    res.json(history);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};


const getDashboardStats = async (req,res)=>{
  try{
    const totalCoupons = await Coupon.countDocuments();
    const claimedCoupons = await Coupon.countDocuments({isClaimed:true});

    res.json({
      totalCoupons,
      claimedCoupons
    });
  }catch(err){
    res.status(500).json({message:'Internal Server Error'});
  }
};


module.exports = 
{
  login, 
  getAdminData, 
  addCoupon, 
  delCoupon,  
  getClaimHistory,
  getDashboardStats,
  logout,
  allCoupon
};
