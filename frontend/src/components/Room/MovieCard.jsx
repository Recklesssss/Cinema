import React from 'react';
import './MovieCard.css';

const MovieCard = ({ movie, selectMovie }) => (
    <div className="movie-card" onClick={() => selectMovie(movie)}>
        <img src={`http://localhost:5000/uploads/${movie.movie}`} alt="movie" />
        <h3>{movie.movieName}</h3>
        <p>{movie.description}</p>
        <button>Select Movie</button>
    </div>
);

export default MovieCard;
