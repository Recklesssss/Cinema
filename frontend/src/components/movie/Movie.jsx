import React, { useState } from 'react';
import "./Movie.css"
import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';

function Movie() {
  const [movie, setMovie] = useState([]);

  return (
    <div className="movie">
        <Navbar/>
    <div className="movie_container">
      <div className="movie_category">
        <div className="sorting">
          <ul>
            <li>Popular</li>
            <li>Action</li>
            <li>Adventure</li>
            <li>Comedy</li>
            <li>Crime</li>
            <li>Fantasy</li>
            <li>Family</li>
          </ul>
        </div>
        <div className="filter">
          <label htmlFor="language">Filter by Language:</label>
          <select name="language" id="language">
            <option value="english">English</option>
            <option value="turkish">Turkish</option>
            <option value="korean">Korean</option>
            <option value="anime">Anime</option>
          </select>
        </div>
      </div>

      <div className="movies">
        {movie.length > 0 ? (
          movie.map((item, index) => (
            <div key={index} className="movie_item">
              <h3>{item.title || 'Movie Title'}</h3>
              <img src="" alt={item.image} />
              <p>{item.description || 'Description goes here...'}</p>
            </div>
          ))
        ) : (
          <p>No movies available.</p>
        )}
      </div>
    </div>
    <Footer/>
    </div>
  );
}

export default Movie;
