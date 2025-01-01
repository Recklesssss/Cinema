import React from 'react';
import './SelectedMovie.css';

const SelectedMovie = ({ movie, clearSelection , handelRoomCreatioin}) => (
    <div className="selected-movie">
        <h2>Selected Movie</h2>
        <img src={`http://localhost:5000/uploads/${movie.movie}`} alt="selected-movie" />
        <h3>{movie.movieName}</h3>
        <p>{movie.description}</p>
        <button onClick={clearSelection}>Remove</button>
        <button onClick={handelRoomCreatioin}>Watch Now</button>
    </div>
);

export default SelectedMovie;
