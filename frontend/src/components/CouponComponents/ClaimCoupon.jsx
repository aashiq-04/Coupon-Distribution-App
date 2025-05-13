import axios from 'axios';
import { useState } from 'react';

const ClaimCoupon = () => {
  const [message, setMessage] = useState('');
  const [couponCode, setCouponCode] = useState('');

  const handleClaim = async () => {
    try {
      const res = await axios.post('http://localhost:5000/coupons/claim', {}, {
        withCredentials: true  // Required to send/receive cookies
      });
      setMessage(res.data.message);
      const couponMatch = res.data.message.match(/Coupon (\S+) claimed successfully/);
      if (couponMatch) {
        setCouponCode(couponMatch[1]); // This is the coupon code
      }
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div>
      <h2>Claim Your Coupon</h2>
      <button onClick={handleClaim}>Claim Coupon</button>
      <p>{message}</p>
      {couponCode && <p>Your coupon code is: {couponCode}</p>} 
    </div>
  );
};

export default ClaimCoupon;
