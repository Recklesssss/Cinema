import React, { use, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import MovieCard from './MovieCard';
import SelectedMovie from './SelectedMovie';
import UploadMovieModal from './UploadmovieModal';
import './Room.css';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'

function Room({ roomCode }) {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [movieId, setMovieId] = useState(null); // For editing movies
  const [roomName,setRoomName] = useState("")
  const [roomId,setRoomId] = useState(0)
  const [demo,setDemo] = useState([])

  const navigate = useNavigate();

const friends = useSelector((state) => state.userDatas.userId);

  useEffect(() => {
    getMovies();
  }, []);


const handelRoomCreatioin = async () => {
  const result = await axios.post('http://localhost:5000/api/rooms/create', {
    roomName: roomName,
    creatorId: friends,
    movieId: movieId
  })
  setRoomId(result.data.roomId)
  setDemo(result)
  navigate(`/cinema?room_id=${result.data.roomId}&movie_id=${movieId}`);
}

const handelGetId = (id) => {
    setMovieId(id);
}

  const getMovies = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/movies/movie');
      setMovies(response.data.rows);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const filteredMovies = movies.filter(movie =>
    movie.movie_name.toLowerCase().includes(search.toLowerCase())
  );

  const handleMovieSelect = (movie) => {
    setSelectedMovie(movie);
  };

  const handleMovieRemove = () => {
    setSelectedMovie(null);
  };

  return (
    <div className='room__container'>
      <div className="room">
        <h3>Welcome to Two-Way Cinema</h3>
        <p>{roomCode ? `Room Code: ${roomCode}` : "No Room Code Provided"}</p>
        
        {/* Search Bar */}
        <SearchBar search={search} setSearch={setSearch} />

        {/* Movie Selection */}
        <div className="movie-selection">
          <label>name of the room</label>
          <input type="text" onChange={(e)=>setRoomName(e.target.value)} />
          <h4>Available Movies</h4>
          <div className="movie-list">
            {loading ? (
              <div className="loading">Loading movies...</div>
            ) : filteredMovies.length === 0 ? (
              <div>No movies found</div>
            ) : (
              filteredMovies.map((movie) => (
                <MovieCard
                  key={movie.movie_id}
                  movie={movie}
                  selectMovie={handleMovieSelect}
                  handelGetId={handelGetId}
                />
              ))
            )}
          </div>
        </div>

        {/* Selected Movie */}
        {selectedMovie && (
          <SelectedMovie
            movie={selectedMovie}
            clearSelection={handleMovieRemove}
            handelRoomCreatioin = {handelRoomCreatioin}
          />
        )}

        {/* Upload Movie Button */}
        <button onClick={() => setShowUploadModal(true)}>Upload Movie</button>
        {showUploadModal && (
          <UploadMovieModal
            onClose={() => setShowUploadModal(false)}
            onUpload={(newMovie) => setMovies((prev) => [...prev, newMovie])}
          />
        )}
      </div>
    </div>
  );
}

export default Room;







// import React ,{useEffect,useState} from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Link } from 'react-router-dom';
// // import io from 'socket.io-client';
// import './Room.css'
// import { useSelector } from 'react-redux';
// import axios from 'axios';

// // const socket = io('http://localhost:5000', {
// //     query: { name: 'JohnDoe', profilePicture: 'https://example.com/profile.jpg' },
// //   }); // Connect to the backend
// function Room({ roomCode }) {

//     const [movies, setMovies] = useState([]);
//     const [search, setSearch] = useState('');
//     const [show, setShow] = useState(false);

//     const toggle = async(e)=>{
//         setShow(!show);
//     }
//     const getMovies = async () => {
//         console.log(movies)
//     try {
//         const respose = await axios.get('http://localhost:5000/api/movies/movie');
//         setMovies(respose.data.rows);
//         console.log(respose.data.rows)
//     } catch (error) {
//         console.error(error)
//     }
// }
// useEffect(() => {
//     getMovies();
//   }
// , []) 

//     // useEffect(() => {
//     //     socket.emit('create-room', { roomName: 'My Room' });
    
//     // // Listen for confirmation
//     // socket.on('room-created', (roomId) => {
//     //   console.log(`Room created with ID: ${roomId}`);
//     //   // Redirect to the room or perform other actions
//     // });
//     //     return () => {
//     //       socket.off('create-room');
//     //     }
//     //   }, [])
//     const navigate = useNavigate(); // Correct usage of the hook

//     return (
//         <div className='room__container'>
//             <div className="room">
//                 <h3>Welcome to Two-Way Cinema</h3>
//                 <p>{roomCode ? `Room Code: ${roomCode}` : "No Room Code Provided"}</p>
//                 <input type="text" name="" id="" />
//                 <button onClick={toggle}>Create Room</button> {/* Use navigate directly */}
//                 <div className='container_room' style={{display:show ? 'none': 'flex'}}>
//                     <div className="search-container2">
//                         <input type="text" placeholder="Search..." className="search-input2" />
//                         <i className="search-icon2">&#128269;</i>
//                     </div>
//                     <div className="shortcut_movie">
//                         {movies.map((movie) => (
//                             <div key={movie.movie_id} className="movie">
//                                 <img src={`http://localhost:5000/uploads/${movie.movie}`} alt="movie" />
//                                 <h3>{movie.movieName}</h3>
//                                 <h4>{movie.description}</h4>
//                                 <h4>{movie.genre}</h4>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </div> 
//         </div>
//     );
// }

// export default Room;
