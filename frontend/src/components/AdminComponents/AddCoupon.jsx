import axios from "axios";
import { useState } from "react";

const AddCoupon =({onAdd}) =>{
    const [code,setCode] = useState('');
    const[msg,setMsg] = useState('');
    const addCoupon = async (e)=>{
        e.preventDefault();
        try{
            const res = await axios.post('/admin/coupon',{code});
            setMsg(res.data.message);
            setCode('');
            onAdd();
        }catch(err){
            setMsg(err.response?.data?.message || 'Error');
        }
    };
    return(
        <form onSubmit={addCoupon}>
            <input value={code} onChange={(e)=> setCode(e.target.value)} placeholder="Coupon Code" required />
            <button type="submit"> Add</button>
            {msg && <p>{msg}</p>}
        </form>
    );
};
export default AddCoupon;