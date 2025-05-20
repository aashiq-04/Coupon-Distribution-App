// src/components/AdminComponents/AdminDashboard.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminDashboard = (onLogout) => {
  const [totalCoupons, setTotalCoupons] = useState(0);
  const [claimedCoupons, setClaimedCoupons] = useState(0);
  const [newCoupon, setNewCoupon] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const res = await axios.get("http://localhost:5000/admin/dashboard", {
        withCredentials: true,
      });
      setTotalCoupons(res.data.totalCoupons);
      setClaimedCoupons(res.data.claimedCoupons);
    } catch (err) {
      setMsg("Failed to load dashboard data");
    }
  };

  const handleAddCoupon = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:5000/admin/coupon",
        { code: newCoupon },
        { withCredentials: true }
      );
      setMsg("Coupon added successfully");
      fetchDashboardStats(); // Refresh data
      setNewCoupon(""); // Clear input
    } catch (err) {
      setMsg(err.response?.data?.message || "Failed to add coupon");
    }
  };

  const logout = async () => {
    try {
      await axios.post("http://localhost:5000/admin/logout", {}, { withCredentials: true });
      // onLogout();
      navigate("/admin/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <p>Total Coupons: {totalCoupons}</p>
      <p>Claimed Coupons: {claimedCoupons}</p>
      
      <form onSubmit={handleAddCoupon}>
        <input 
          type="text" 
          placeholder="Enter Coupon Code" 
          value={newCoupon} 
          onChange={(e) => setNewCoupon(e.target.value)} 
          required 
        />
        <button type="submit">Add Coupon</button>
      </form>
      <button onClick={logout}>Logout</button>
      {msg && <p>{msg}</p>}
    </div>
  );
};

export default AdminDashboard;
