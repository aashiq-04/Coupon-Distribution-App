import axios from "axios";
import { useEffect, useState } from "react";

const ClaimHistory = ()=>{
    const [history,setHistory] = useState([]);
    useEffect(()=>{
        axios.get('/admin/history')
        .then(res=> setHistory(res.data))
        .catch(()=> setHistory([]));
    }, []);

    return(
        <div>
            <h3>Claim History</h3>
            <ul>
                {history.map(h=>(
                    <li key={h.code}>
                        {h.code} claimed by {h.claimedBy || 'unknown'} on {new Date(h.claimedAt).toLocaleString()}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ClaimHistory;

