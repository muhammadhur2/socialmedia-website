import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios'; // Make sure to install this package
import './LoginSignup.css'
import userService from '../../Services/UserService';
import { isValidEmail, isValidPassword, isValidName } from '../../utils/Validation';

import user_icon from '../Assets/person.png'
import email_icon from '../Assets/email.png'
import password_icon from '../Assets/password.png'
import UserContext from '../../UserContext';




const LoginSignup = () => {
  const navigate = useNavigate();
  const [action, setAction] = useState("Login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const { setUser } = useContext(UserContext);
  const [submit, setsubmit] = useState(false);


  const handleLogin = async () => {
    if(action == "Sign Up"){
    setAction("Login");
    return;
    }
    try {
        const responseData = await userService.login({ email, password }); // Just directly get the responseData
        if (responseData.status === 'ok') {
        localStorage.setItem('token', responseData.token);
        console.log("Received token:", responseData.token);
        console.log("setUser method:", setUser);
        // Set user context here
        setUser({
          token: responseData.token
          // You can also set other user data if it's provided in the response.
        });

        window.alert('Login Successful');
        navigate('/profile');  // Redirect to the profile page
      } else {
        window.alert('Login Failed');
      }
    } catch (error) {
      console.error("Login Error:", error.message); // Log the actual error message to the console
      window.alert('An error occurred during login: ' + error.message); // Provide the error message in the alert
    }
  };
  
  const handleSignup = async () => {
    if(action == "Login"){
      setAction("Sign Up");
      return;
    }
    
    // Validate the fields before sending the signup request
    if (!isValidName(name)) {
      window.alert('Name should be at least 2 characters.');
      return;
    }
    if (!isValidEmail(email)) {
      window.alert('Please enter a valid email address.');
      return;
    }
    if (!isValidPassword(password)) {
      window.alert('Password should be at least 6 characters long.');
      return;
    }
    
    try {
      const response = await userService.register({ name, email, password });
      console.log(response);
      const responseData = response.data;
  
      if (responseData.status === 'ok') {
        window.alert('Signup Successful');
      } else {
        window.alert('Signup Failed');
      }
    } catch (error) {
      window.alert('An error occurred during signup', error);
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