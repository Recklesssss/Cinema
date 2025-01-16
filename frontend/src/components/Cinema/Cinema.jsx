import React, { useState, useEffect, useRef } from 'react';
import './Cinema.css';
import Navbar from '../navbar/Navbar';
import io from 'socket.io-client';
import { useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux'; 
import ReactPlayer from "react-player";
import Participant from './participant';
import axios from 'axios';


const socket = io('http://localhost:5000',{debug:true},{
  reconnection: true,        // Enables reconnection
  reconnectionAttempts: 190,   // Max reconnection attempts
  reconnectionDelay: 1000,   // Initial delay in ms
  reconnectionDelayMax: 5000 // Max delay between attempts
},{
  transports: ['websocket', 'polling'],
  withCredentials:true
}); // Connect to the backend

function Cinema() {  
  const [messages, setMessages] = useState([]);
  const [message, setMessageInput] = useState('');
  const [roomCode, setRoomCode] = useState('');
  const [movieId, setMovieId] = useState(''); 
  const [searchParams] = useSearchParams(); 
  const [movie, setMovie] = useState([]);
  const [datas, setDatas] = useState([]);
  const playerRef = useRef(0);
  const [movieUrl, setMovieUrl] = useState('');
  const [participant, setParticipant] = useState([]);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    // For testing, we use the local sample video URL
    setMovieUrl('http://localhost:5000/uploads/Wootly(60).mp4');
  }, []);

  const sender = useSelector((state) => state.userDatas.userId);
  const roomId = searchParams.get('room_id');
  const movieId1 = searchParams.get('movie_id');
  
  useEffect(() => {
    if (roomId) {
      socket.emit('joinRoom', roomId); // Emit join event only once
  
      axios.post('http://localhost:5000/api/rooms/join', { userId: sender, roomId })
        .then((response) => {
          setParticipant(response.data.room.participant);
        })
        .catch((error) => {
          console.error('Error joining room:', error.message);
        });
    }
  
    
  }, [roomId, sender]); // Ensure dependencies are accurate
  
  
  

  useEffect(() => {
    setRoomCode(roomId);
    setMovieId(movieId1);
  }, [roomId, movieId1]); 

  // Listen for incoming messages
    
  
  const handelFetchMessages = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/chat/messages/${roomId}`);
      const data = await response.json();
      setMessages(data);
      if(messages.length > 0) {
        setSent(sent => !sent);
      }
    } catch (error) {
      console.log(error);
    }
  }
useEffect(() => {
  getUserData();
  if(roomId) {
    handelFetchMessages();
  }; 
},[message,sent]);
  const handelFetchMovie = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/movies/movie/${movieId1}`);
      const data = await response.json();
      setMovie(data);
    } catch (error) {
      console.log(error);
    }
  }

useEffect(() => {
  handelFetchMovie();
},[]);

  const sendMessage = () => {
    if (message.trim() !== '') {
      socket.emit('message', message,sender,roomId); // Send message to server
      setMessageInput(''); // Clear input
    }
  };
const getUserData = async () => {
  try {
    const response = await fetch(`http://localhost:5000/api/users/profile/${sender}`);
    const data = await response.json();
    setDatas(data);
    return data;
  } catch (error) {
    console.log(error);
  }
}
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
                  {messages.map((msg, index) => (
                    <div className="commentItem" key={msg.chat_id || index}>
                      <div className="commentUser">
                        <img src="" alt="User" />
                        <h3>{datas.name || 'Unknown User'}</h3> {/* Replace with actual username if available */}
                      </div> 
                      <div className="commentText">
                        <p>{msg.comment}</p> {/* Render the "comment" property */}
                      </div>
                      <div className="commentTime">
                        <p>{new Date(msg.time).toLocaleString()}</p> {/* Format and display the time */}
                      </div>
                    </div>
                  ))}
                </div> 
              <div className="commentFooter">
                <input
                  type="text"
                  placeholder="Write a comment..."
                  onChange={(e) => setMessageInput(e.target.value)}
                  value={message}
                />
                <button onClick={sendMessage}>Post</button>
              </div>
            </div>
          </div>
        </div>
        <Participant/> 
      </div>
    </div>
  );
}

export default Cinema;