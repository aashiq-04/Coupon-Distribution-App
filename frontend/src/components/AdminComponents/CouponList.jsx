import { useEffect, useState } from 'react';
import axios from 'axios';

const CouponList = () => {
  const [coupons, setCoupons] = useState([]);

  const loadCoupons = async () => {
    const res = await axios.get('/admin/data')
    setCoupons(res.data);
  };

  const deleteCoupon = async (code) => {
    await axios.post(`/admin/delete/${code}`)
    loadCoupons();
  };

  const toggleCoupon = async (code) => {
    await axios.patch(`/admin/coupon/${code}/toggle`);
    loadCoupons();
  };

  useEffect(() => { loadCoupons(); }, []);

  return (
    <div>
      <h3>Coupon List</h3>
      <ul>
        {coupons.map(c => (
          <li key={c.code}>
            {c.code} - {c.isClaimed ? 'Claimed' : 'Available'}
            <button onClick={() => toggleCoupon(c.code)}>Toggle</button>
            <button onClick={() => deleteCoupon(c.code)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CouponList;
