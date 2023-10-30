import React, { useState } from 'react'
import axios from 'axios'; // Make sure to install this package
import './LoginSignup.css'

import user_icon from '../Assets/person.png'
import email_icon from '../Assets/email.png'
import password_icon from '../Assets/password.png'




const LoginSignup = () => {
  const [action, setAction] = useState("Login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleLogin = async () => {
    setAction("Login");
    try {
      const response = await axios.post('http://localhost:3001/users/login', { email, password });
      console.log(`Login status: ${response.data.status}`); // Print status to console
      if (response.data.status === 'ok') {
        window.alert('Login Successful');
      } else {
        window.alert('Login Failed');
      }
    } catch (error) {
      console.log('An error occurred during login:', error); // Print error to console
      window.alert('An error occurred');
    }
  };
  
  const handleSignup = async () => {
    setAction("Sign Up");
    try {
      const response = await axios.post('http://localhost:3001/users/register', { name, email, password });
      console.log(`Signup status: ${response.data.status}`); // Print status to console
      if (response.data.status === 'ok') {
        window.alert('Signup Successful');
      } else {
        window.alert('Signup Failed');
      }
    } catch (error) {
      console.log('An error occurred during signup:', error); // Print error to console
      window.alert('An error occurred');
    }
  };
  

  return (
    <div className='container'>
      <div className='header'>
        <div className='text'>{action}</div>
        <div className='underline'></div>
      </div>
      <div className='inputs'>
        
        {action === "Login" ? null : 
          <div className="input">
            <img src={user_icon} alt="" />
            <input type="text" placeholder='Name' onChange={(e) => setName(e.target.value)} />
          </div>
        }

        <div className="input">
          <img src={email_icon} alt="" />
          <input type="email" placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="input">
          <img src={password_icon} alt="" />
          <input type="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
        </div>
      </div>
      
      {action === "Sign Up" ? null : <div className="forgot-password">Lost Password <span>Click Here!</span></div>}
      
      <div className="submit-container">
        <div className={action === "Login" ? "submit gray" : "submit"} onClick={handleSignup}>Sign Up</div>
        <div className={action === "Sign Up" ? "submit gray" : "submit"} onClick={handleLogin}>Login</div>
      </div>
    </div>
  );
};

export default LoginSignup;