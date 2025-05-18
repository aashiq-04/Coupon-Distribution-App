import { useNavigate } from 'react-router-dom';
import '../App.css';  // Import the CSS file

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      
      <h1> Welcome to the Coupon Distribution App</h1>
      <p>Choose your action below:</p>

      <button 
        onClick={() => navigate('/claim')} 
        className="home-button">
        Claim Coupon as Guest
      </button>

      <button 
        onClick={() => navigate('/admin/login')} 
        className="home-button">
        Admin Login
      </button>
    </div>
  );
}

export default Home;
