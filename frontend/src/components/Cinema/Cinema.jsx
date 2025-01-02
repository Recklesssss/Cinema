import React, { useState, useEffect, use } from 'react';
import './Cinema.css';
import Navbar from '../navbar/Navbar';
import io, { Socket } from 'socket.io-client';
import { useSearchParams } from 'react-router-dom';


const socket = io('http://localhost:5000', {
    query: { name: 'JohnDoe', profilePicture: 'https://example.com/profile.jpg' },
  }); // Connect to the backend

function Cinema() {  
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [roomCode, setRoomCode] = useState('');
  const [movieId, setMovieId] = useState(''); 
  const [searchParams] = useSearchParams();
  const [movie, setMovie] = useState([]);

  const roomId = searchParams.get('room_id');
  const movieId1 = searchParams.get('movie_id');

  useEffect(() => {
    setRoomCode(roomId);
    setMovieId(movieId1);
  }, [roomId, movieId1]); 

  // Listen for incoming messages
  useEffect(() => {
    socket.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off('message');
    };
  }, []);   
  
  const handelFetchMovie = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/movies/movie/${movieId1}`);
      const data = await response.json();
      setMovie(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

useEffect(() => {
  handelFetchMovie();
},[]);

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