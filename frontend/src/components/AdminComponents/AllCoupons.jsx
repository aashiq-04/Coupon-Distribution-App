import axios from "axios";
import { useEffect, useState } from "react";

const AllCoupons = () => {
  const [coupons, setCoupons] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/admin/allcoupons", { withCredentials: true })
      .then(res => setCoupons(res.data))
      .catch(() => setCoupons([]));
  }, []);
  

  return (
    <div>
      <h3>All Coupons</h3>
      <ul>
        {coupons.map(coupon => (
          <li key={coupon._id}>
            Code: {coupon.code} | Claimed: {coupon.isClaimed ? "Yes" : "No"}{" "}
            {coupon.expiryDate && `| Expires: ${new Date(coupon.expiryDate).toLocaleDateString()}`}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllCoupons;
