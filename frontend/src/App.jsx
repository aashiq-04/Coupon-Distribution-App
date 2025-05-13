import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";

import Home from "./pages/Home";
import ClaimCoupon from "./components/CouponComponents/ClaimCoupon";

import AdminLogin from "./components/AdminComponents/AdminLogin";
import ClaimHistory from "./components/AdminComponents/ClaimHistory";
import AddCoupon from "./components/AdminComponents/AddCoupon";

function App() {
  const [isAdmin, setIsAdmin] = useState(false);

  // Check if admin is logged in (from localStorage or sessionStorage)
  useEffect(() => {
    const adminStatus = localStorage.getItem("isAdmin");
    if (adminStatus === "true") {
      setIsAdmin(true);
    }
  }, []);

  const handleLogin = () => {
    // Set admin login status in localStorage
    localStorage.setItem("isAdmin", "true");
    setIsAdmin(true);
    console.log('Admin Logged in:',isAdmin);
  };

  const handleLogout = () => {
    // Remove admin login status from localStorage
    localStorage.removeItem("isAdmin");
    setIsAdmin(false);
  };

  const ProtectedRoute = ({ children }) => {
    return isAdmin ? children : <Navigate to="/admin/login" />;
  };

  return (
    <div className="App">
      <Router>
        <Routes>
          {/* New Home Page */}
          <Route path="/" element={<Home />} />

          {/* Guest Route */}
          <Route path="/claim" element={<ClaimCoupon />} />

          {/* Admin Login */}
          <Route
            path="/admin/login"
            element={<AdminLogin onLogin={handleLogin} />}
          />

          {/* Admin Routes */}
          <Route
            path="/admin/history"
            element={
              <ProtectedRoute>
                <ClaimHistory />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/add"
            element={
              <ProtectedRoute>
                <AddCoupon />
              </ProtectedRoute>
            }
          />

          {/* Optionally add a logout route */}
          <Route
            path="/admin/logout"
            element={<Navigate to="/" />}
            onEnter={handleLogout}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
