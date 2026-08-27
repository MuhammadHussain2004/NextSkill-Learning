import  Loginleft from '../components/loginleft/LoginLeft'
import  LoginRight from '../components/loginright/LoginRight'
import './Login.css'
const Login = () => {
  return (
    <div className='container'>
         <Loginleft/>
         <hr />
       <LoginRight/>
    </div>
  )
}

export default Login