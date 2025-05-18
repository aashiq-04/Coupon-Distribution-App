import React from "react";
import { Link,useNavigate } from "react-router-dom";


const Nav = ({ isAdmin, onLogout}) =>{
    const navigate = useNavigate();
    
    const handleLogout = () =>{
        if(onLogout){
            onLogout();
        }
        navigate('/');
    };
    return(
        <nav className="bg-blue-600 text-white p-3 flex justify-between items-center">
      <div>
        <Link to="/" className="text-lg font-semibold hover:underline">Home</Link>
      </div>
      <div className="flex gap-4">
        {isAdmin ? (
          <>
            <Link to="/admin/dashboard" className="hover:underline">Dashboard</Link>
            <Link to="/admin/history" className="hover:underline">Claim History</Link>
            <Link to="/admin/add" className="hover:underline">Add Coupon</Link>
            <button onClick={handleLogout} className="hover:underline">Logout</button>
          </>
        ) : (
          <Link to="/claim" className="hover:underline">Claim Coupon</Link>
        )}
      </div>
    </nav>
  );
};

export default Nav;