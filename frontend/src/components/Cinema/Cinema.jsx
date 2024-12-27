import React, { useState, useEffect, use } from 'react';
import './Cinema.css';
import Navbar from '../navbar/Navbar';
import io, { Socket } from 'socket.io-client';

const socket = io('http://localhost:5000', {
    query: { name: 'JohnDoe', profilePicture: 'https://example.com/profile.jpg' },
  }); // Connect to the backend

function Cinema() {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');

  // Listen for incoming messages
  useEffect(() => {
    socket.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off('message');
    };
  }, []);  

  useEffect(() => {
    socket.emit('create-room', { roomName: 'My Room' });

// Listen for confirmation
socket.on('room-created', (roomId) => {
  console.log(`Room created with ID: ${roomId}`);
  // Redirect to the room or perform other actions
});
  
    return () => {
      socket.off('create-room');
    }
  }, [])
  

  const sendMessage = () => {
    if (messageInput.trim() !== '') {
      socket.emit('message', messageInput); // Send message to server
      setMessageInput(''); // Clear input
    }
  };

  return (
    <div className="div">
      <Navbar />
      <div className="cinema">
        <div className="mainContainer">
          <div className="videoContent"></div>
          <div className="comment">
            <div className="commentContainer">
              <div className="commentHeader">
                <h2>Comments</h2>
              </div>
              <div className="commentBody">
                {messages.map((message, index) => (
                  <div className="commentItem" key={index}>
                    <div className="commentUser">
                      <img src="" alt="User" />
                      <h3>Username</h3>
                    </div>
                    <div className="commentText">
                      <p>{message}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="commentFooter">
                <input
                  type="text"
                  placeholder="Write a comment..."
                  onChange={(e) => setMessageInput(e.target.value)}
                  value={messageInput}
                />
                <button onClick={sendMessage}>Post</button>
              </div>
            </div>
          </div>
        </div>
        <div className="leftContainer">
          <h1>Participant</h1>
          <div className="participantContainer">
            <div className="participantItem">
              <img src="" alt="" />
              <h3>Username</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cinema;