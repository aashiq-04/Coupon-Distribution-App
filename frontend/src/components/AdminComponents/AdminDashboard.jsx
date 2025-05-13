import AddCoupon from "./AddCoupon";
import CouponList from "./CouponList";
import ClaimHistory from "./ClaimHistory";

const AdminDashboard = () => {
  return (
    <div>
      <h2>Admin Dashboard</h2>
      <AddCoupon onAdd={() => window.location.reload()} />
      <CouponList />
      <ClaimHistory />
    </div>
  );
};

export default AdminDashboard;
