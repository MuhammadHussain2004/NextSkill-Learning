import './LoginRight.css'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'


const LoginRight = () => {
  const navigate = useNavigate()
  const [email,setEmail] = useState('');
  const [password, setPassword]=  useState('')
  const [error, setError] = useState('');

  const HandleSignupbtn =()=>{
    navigate('/signup')
  }

const HandleLogin= async(e)=>{
      e.preventDefault()
      setError('')
      try{
     const res = await fetch('http://localhost:4000/api/auth/login', {
      method: 'POST', 
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({email, password}),
     })
     const data = await res.json();
     if(!res.ok){
      setError(data.message)
      return
     }
     localStorage.setItem('token', data.token)
     alert('Login successful!')
     navigate('/home')
      }
      catch{
              setError('Something went wrong. try again.')
      }
}

  return (
    <div className='container1'>
      <div className='heading'>
      <h2>Log in to Instagram</h2>
      </div>
        <form className='from'  onSubmit={HandleLogin}>
       <input id='username' type="text" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
       <input type="password"  placeholder='Password' value={password} onChange={(e)=> setPassword(e.target.value)} />
       {error && <p style={{color: 'red'}}> {error} </p> }
       <button className='blue' type='submit'>Log in </button>
      <a href="/">Forgot password?</a>
      <button className='log' type='button' >Log in with Facebook</button>
       <button  className='new'  type='button' onClick={HandleSignupbtn}>Create new Account</button>
       </form>
    </div>
  )
}

export default LoginRight