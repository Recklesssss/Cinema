import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Room.css'

function Room({ roomCode }) {
    const navigate = useNavigate(); // Correct usage of the hook

    return (
        <div className='room__container'>
            <div className="room">
                <h3>Welcome to Two-Way Cinema</h3>
                <p>{roomCode ? `Room Code: ${roomCode}` : "No Room Code Provided"}</p>
                <button onClick={() => navigate('/')}>Create Room</button> {/* Use navigate directly */}
                <button>Start Movie</button>
            </div>
        </div>
    );
}

export default Room;
