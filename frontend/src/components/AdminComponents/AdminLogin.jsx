import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import "./AdminLogin.css";


const AdminLogin = ({ onLogin }) => {
  const [username, setUser] = useState('');
  const [password, setPass] = useState('');
  const [msg, setMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg('');
    setSuccessMsg('');
    
    try {
      await axios.post('http://localhost:5000/admin/login', 
        { username, password }, 
        { withCredentials: true }
      );
      
      onLogin();
      setSuccessMsg("Login Successful! Redirecting to the dashboard...");
      
      setTimeout(() => {
        navigate('/admin/dashboard');
      }, 2000);
    } catch (err) {
      setMsg(err.response?.data?.message || 'Login Failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-container">
      <div className="login-card">
        <h2>Admin Login</h2>
        <form onSubmit={login}>
          <input 
            value={username} 
            onChange={e => setUser(e.target.value)}
            placeholder="Username"
            required 
          />
          <input 
            type="password" 
            value={password} 
            onChange={e => setPass(e.target.value)} 
            placeholder="Password" 
            required 
          />
          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
          {msg && <p className="error-msg">{msg}</p>}
          {successMsg && <p className="success-msg">{successMsg}</p>}
        </form>
      </div>
    </div>

  );
};

export default AdminLogin;
