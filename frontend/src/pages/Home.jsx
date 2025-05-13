import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>🎉 Welcome to the Coupon Distribution App</h1>
      <p>Choose your action below:</p>

      <button onClick={() => navigate('/claim')} style={{ margin: '1rem' }}>
        Claim Coupon as Guest
      </button>

      <button onClick={() => navigate('/admin/login')} style={{ margin: '1rem' }}>
        Admin Login
      </button>
    </div>
  );
}

export default Home;
