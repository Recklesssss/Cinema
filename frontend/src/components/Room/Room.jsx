import React ,{useEffect,useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
// import io from 'socket.io-client';
import './Room.css'
import { useSelector } from 'react-redux';
import axios from 'axios';

// const socket = io('http://localhost:5000', {
//     query: { name: 'JohnDoe', profilePicture: 'https://example.com/profile.jpg' },
//   }); // Connect to the backend
function Room({ roomCode }) {

    const [movies, setMovies] = useState([]);
    const [search, setSearch] = useState('');
    const [show, setShow] = useState(false);

    const toggle = async(e)=>{
        setShow(!show);
    }
    const getMovies = async () => {
        console.log(movies)
    try {
        const respose = await axios.get('http://localhost:5000/api/movies/movie');
        setMovies(respose.data);
        console.log(respose.data)
    } catch (error) {
        console.error(error)
    }
}
useEffect(() => {
    getMovies();
  }
, []) 

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
                <input type="text" name="" id="" />
                <button onClick={toggle}>Create Room</button> {/* Use navigate directly */}
                <div >
                    <div className="search-container">
                        <input type="text" placeholder="Search..." className="search-input" />
                        <i className="search-icon">&#128269;</i>
                    </div>
                    <div className="shortcut_movie">
                        {movies.map((movie) => (
                            <div key={movie.movie_id} className="movie">
                                <img src={`http://localhost:5000/uploads/${movie.movie}`} alt="movie" />
                                <h3>{movie.movieName}</h3>
                                <h4>{movie.description}</h4>
                                <h4>{movie.genre}</h4>
                            </div>
                        ))}
                    </div>
                    <button style={{display:show ? 'none': 'flex'}}>Start Movie</button>
                </div>
            </div> 
        </div>
    );
}

export default Room;
