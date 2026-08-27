import { useEffect, useState  } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config";

const Home = ()=>{
    const navigate = useNavigate();
    const [user, setUser]= useState(null);
    const [error, setError]= useState('');

    useEffect(()=>{
        const token= localStorage.getItem('token')
        if(!token){
            navigate('/login')
            return;
        }

     const fetchProfile =async ()=>{
        try{
            const res= await fetch(`${API_BASE_URL}/api/auth/profile`, {
                headers: {Authorization: `Bearer ${token}`},
            })
            const data= await res.json()
            if(!res.ok){
                setError(data.message)
                localStorage.removeItem('token')
                navigate('/login')
                return;
            }

            setUser(data)
        }
        catch{
            setError('Something went wrong.');
        }        
     }

     fetchProfile()
}, [navigate])


const handleLogout = ()=>{
    localStorage.removeItem('token')
    navigate('/login')
}

if(!user) return <p> {error || 'Loading...'}</p>


return (
    <div>
        <h2>Welcome, {user.name}!</h2>
        <p>Username: {user.username}</p>
        <p>Email: {user.email}</p>
        <button onClick={handleLogout}>Logout</button>
    </div>
)


}


export default Home