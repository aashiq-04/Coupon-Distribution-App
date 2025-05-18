// src/components/Nav.js
import React from "react";
import { Link, useLocation } from "react-router-dom";

const Nav = ({ isAdmin, onLogout }) => {
  const location = useLocation();

  // Define the links based on the current route
  const renderLinks = () => {
    if (location.pathname === "/") {
      return(
        <div className="cont">
        <Link to="/" className="nav-link">Home</Link>
        </div>
      )
    }

    if (location.pathname === "/admin/login") {
      // Only Home on Login Page
      return (
      <div className="cont">
      <Link to="/" className="nav-link">Home</Link>
      </div>
      )
    }

    if (location.pathname.startsWith("/admin")) {
      // Admin links except on Login page
      return (
        <div className="cont">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/admin/history" className="nav-link">Claim History</Link>
        </div>
      );
    }
    return(
      <div className="cont">
      <Link to="/" className="nav-link">Home</Link>
      </div>
    )
  };

  return (
    
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <div className="flex gap-4">{renderLinks()}</div>
    </nav>
  );
};

export default Nav;
