import React, { useState } from 'react';
import './Signup.css';
import Navbar from '../navbar/Navbar';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import setUserData from '../actions/setUserData'
import { useSelector } from 'react-redux';

function Signup() {
  const [isSigningIn, setIsSigningIn] = useState(true); // State to toggle between Sign In and Sign Up
  const [name, setName] = useState(''); // State to store the name
  const [email, setEmail] = useState(''); // State to store the email
  const [password, setPassword] = useState(''); // State to store the password
  const dispatch = useDispatch();

  const friends = useSelector((state) => state.userDatas);
console.log(friends);

  const handleSignUp = async () => {
    
    console.log('Password:', password)
    try {
      const response = await axios.post('http://localhost:5000/api/users/register', {
        name,
        email,
        password,
      });
      console.log('Sign up successful:', response.data);
      dispatch(setUserData(response.data.name,null,response.data.user_id) )
    } catch (error) {
      console.log(typeof password);  // Should be "string"
      console.error('Sign up failed:', error.response ? error.response.data : error.message);
    }
  }; 
  
  const handleSignin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/users/login', {
        email,
        password: password,
      });
      alert('Sign in successful');
      console.log('Sign in response:', response.data);
    } catch (error) {
      console.error('Sign in failed:', error.response ? error.response.data : error.message);
    }
  };
  

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (isSigningIn) {
      await handleSignin();
    } else {
      await handleSignUp();
    }
  };

  return (
    <div className="outer_signup">
        <Navbar/>
    <div className="auth-form">
      <h3>{isSigningIn ? 'Sign In' : 'Sign Up'}</h3>
      <p>
        {isSigningIn
          ? 'Welcome back! Sign in to access Two-Way Cinema.'
          : 'Create an account to enjoy Two-Way Cinema!'}
      </p>
      <form onSubmit={handleSubmit}>
        {!isSigningIn && (
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              id="name"
              placeholder="Enter your name"
              required
            />
          </div>
        )}
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input  
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            id="email"
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
            type="password"
            id="password"
            placeholder="Enter your password"
            required
          />
        </div>
        <button type="submit" className="auth-btn">
          {isSigningIn ? 'Sign In' : 'Sign Up'}
        </button>
      </form>
      <p className="toggle-auth">
        {isSigningIn
          ? "Didn't sign up yet?"
          : 'Already have an account?'}{' '}
        <span
          className="toggle-link"
          onClick={() => setIsSigningIn(!isSigningIn)}
        >
          {isSigningIn ? 'Sign up here' : 'Sign in here'}
        </span>
      </p>
    </div>
    </div>
  );
}

export default Signup;
