import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin =({onLogin}) => {
    const [username,setUser] = useState('');
    const [password,setPass] = useState('');
    const [msg,setMsg] = useState('');
    const [successMsg,setSuccessMsg] = useState('');
    const navigate = useNavigate();

const login = async(e) =>{
    e.preventDefaut();
    try{
        await axios.post('/admin/login',{username,password});
        console.log('Login Successful');
        onLogin();
        setSuccessMsg("Login Successful! Redirecting to the dashboard...");

        setTimeout(()=>{
            navigate('/admin/history');
        },2000);
    }catch(err){
        setMsg(err.respones?.data?.message || 'Login Failed');
    }
};
return (

    <form onSubmit={login}>
        <input 
            value={username} 
            onChange={e=> setUser(e.target.value)}
            placeholder="Username"
            required 
        />
        <input 
            type="password" 
            value={password} 
            onChange={e=> setPass(e.target.value)} 
            placeholder="Password" 
            required 
        />
        <button type="submit">Login</button>
        {msg && <p>{msg}</p>}
        {successMsg && <p style={{ color: 'green' }}>{successMsg}</p>}
    </form>
    );
};

export default AdminLogin;