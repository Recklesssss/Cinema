import React, { useState } from 'react';
import './Signup.css';
import Navbar from '../navbar/Navbar';

function Signup() {
  const [isSigningIn, setIsSigningIn] = useState(true); // State to toggle between Sign In and Sign Up

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSigningIn) {
      console.log('Sign In logic here');
      // Add Sign In logic
    } else {
      console.log('Sign Up logic here');
      // Add Sign Up logic
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
            type="email"
            id="email"
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
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
