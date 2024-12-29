import React ,{useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
// import io from 'socket.io-client';
import './Room.css'
import { useSelector } from 'react-redux';

// const socket = io('http://localhost:5000', {
//     query: { name: 'JohnDoe', profilePicture: 'https://example.com/profile.jpg' },
//   }); // Connect to the backend
function Room({ roomCode }) {

    // useEffect(() => {
    //     socket.emit('create-room', { roomName: 'My Room' });
    
    // // Listen for confirmation
    // socket.on('room-created', (roomId) => {
    //   console.log(`Room created with ID: ${roomId}`);
    //   // Redirect to the room or perform other actions
    // });
    //     return () => {
    //       socket.off('create-room');
    //     }
    //   }, [])
    const navigate = useNavigate(); // Correct usage of the hook

    return (
        <div className='room__container'>
            <div className="room">
                <h3>Welcome to Two-Way Cinema</h3>
                <p>{roomCode ? `Room Code: ${roomCode}` : "No Room Code Provided"}</p>
                <button onClick={() => navigate('/')}>Create Room</button> {/* Use navigate directly */}
                <Link to={'/movies'}><button>Start Movie</button></Link>
            </div>
        </div>
    );
}

export default Room;
