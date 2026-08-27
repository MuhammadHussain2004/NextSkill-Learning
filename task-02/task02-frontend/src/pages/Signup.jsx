import "./Signup.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config";


const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail]= useState("");
  const [password, setPassword]= useState("");
  const [name, setName] = useState("");
  const [username, setUsername]= useState("");
  const [month, setMonth]= useState("");
  const [day, setDay]= useState("");
  const [year, setYear] = useState("");
  const [error, setError] = useState("");

    const HandleLoginbtn = () => {
    navigate("/login");
  };

  const handleSignup = async (e)=>{
           e.preventDefault();
           setError("");
           try{
            const res =await fetch(`${API_BASE_URL}/api/auth/signup`, {
              method: "POST", 
              headers: {"Content-Type": "application/json"},
              body: JSON.stringify({
                name, 
                username,
                email,
                password,
                birthday: `${month}-${day}-${year}`,
              }),
            });

            const data = await res.json();
            if(!res.ok){
              setError(data.message);
              return;
            }
            alert("Account created successfully!");
            navigate("/login");
           }catch{
            setError("Something went wrong. Try again.");
           }
  };


  return (
    <div className="signup">
      <form onSubmit={handleSignup}>
        <div>
          <p className="head">Get Started on Instagram</p>
          <p>Sign up to see photos and videos from your friends.</p>
        </div>
        <label>Mobile number or email</label>
        <input type="text" placeholder="Email" value={email}  onChange={(e) => setEmail(e.target.value)} />
        <p>
          You may receive notifications from us.{" "}
          <a href="">Learn why we ask you contact information</a>{" "}
        </p>
        <label htmlFor="">Password</label>
        <input type="password" placeholder="Password"  value={password} onChange={(e)=> setPassword(e.target.value)}/>
        <label htmlFor="">Birthday ?</label>
        <div className="combo">
          <select  value={month} onChange={(e)=> setMonth(e.target.value)} >
            <option value="" disabled>
              Month
            </option>
            <option>January</option>
            <option>febuarary</option>
            <option>March</option>
          </select>
          <select value={day} onChange={(e)=> setDay(e.target.value)} >
            <option value="" disabled>
              Day
            </option>
            <option>Monday</option>
            <option>Tuesday</option>
            <option>Wednesday</option>
          </select>
          <select value={year} onChange={(e)=> setYear(e.target.value)}>
            <option value="" disabled>
              Year
            </option>
            <option>2026</option>
            <option>2025</option>
            <option>2024</option>
          </select>
        </div>
        <label>Name</label>
        <input type="text" placeholder="Full Name" value={name}  onChange={(e)=> setName(e.target.value)} />
        <label>Username</label>
        <input type="text" placeholder="Username" value={username} onChange={(e)=> setUsername(e.target.value)} />
        {error && <p style={{color: "red" }}>{error}</p>}
        <p>
          People who use our service may have uploaded your contact information
          to Instagram. <a href="/">Learn more</a>
        </p>
        <p>
          By tapping Submit, you agree to create an account and to Instagram's{" "}
          <a href="">Terms,</a> <a href="/">Privacy Ploicy</a>{" "}
          <a href="/">Cookies Policy.</a>
        </p>
        <p>
          The <a href="/">Privacy Policy</a> describes the ways we can use the
          information we collect when you create an account. For example, we use
          this information to provide, personalize and improve our products,
          including ads.
        </p>
        <div className="btn">
          <button type="submit">Submit</button>
          <button  type="submit" onClick={HandleLoginbtn}>I already have an account</button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
