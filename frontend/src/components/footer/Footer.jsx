import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <div className='footer'>
      <div className='aboutUS'>
        <h4>About Us</h4>
        <p>
          Two-Way Cinema is a platform that brings friends closer by enabling them to watch movies together, no matter where they are. With synchronized playback and seamless communication, we aim to make shared experiences magical and memorable.
        </p>
      </div>
      <div className="howitworks">
        <h4>How It Works</h4>
        <ul>
          <li>Invite your friends to join a room using a unique room code.Choose a movie to watch together.</li>
          <li>Enjoy real-time synchronized playback where both viewers can play, pause, or skip seamlessly.</li>
        </ul>
      </div>
      <div className="contactus">
        <h4>Contact Us</h4>
        <p>
          Have questions or feedback? We'd love to hear from you! Reach us at:
        </p>
        <p>Email: <a href="mailto:support@twowaycinema.com">support@twowaycinema.com</a></p>
        <p>Follow us on social media:</p>
        <p>
          <a href="https://www.facebook.com/twowaycinema" target="_blank" rel="noreferrer">Facebook</a> | 
          <a href="https://www.twitter.com/twowaycinema" target="_blank" rel="noreferrer"> Twitter</a> | 
          <a href="https://www.instagram.com/twowaycinema" target="_blank" rel="noreferrer"> Instagram</a>
        </p>
      </div>
    </div>
  );
}

export default Footer;
