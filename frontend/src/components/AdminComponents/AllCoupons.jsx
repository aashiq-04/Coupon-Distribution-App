import axios from "axios";
import { useEffect, useState } from "react";

const AllCoupons = () => {
  const [coupons, setCoupons] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    try {
      const res = await axios.get("http://localhost:5000/admin/allcoupons", { withCredentials: true });
      setCoupons(res.data);
    } catch (error) {
      console.error("Fetch error:", error);
      setCoupons([]);
    }
  };

  const deleteCoupon = async (code) => {
    try {
      const res = await axios.delete(`http://localhost:5000/admin/delete/${code}`, {
        withCredentials: true
      });
      setMessage(res.data.message); // ✅ Show success message
      fetchCoupons();
    } catch (error) {
      console.error("Delete error:", error);
      setMessage(error.response?.data?.message || "Failed to delete");
    }
  };

  return (
    <div>
      <h3>All Coupons</h3>
      {message && <p style={{ color: 'dark-yellow' }}>{message}</p>}
      <ul>
        {coupons.map(coupon => (
          <li key={coupon._id}>
            <div className="coupon-item">
              <span>Code: {coupon.code} | Claimed: {coupon.isClaimed ? "Yes" : "No"}{" "}&ensp;</span>
              <button onClick={() => deleteCoupon(coupon.code)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default AllCoupons;
