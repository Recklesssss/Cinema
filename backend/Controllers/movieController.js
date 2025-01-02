const express = require('express');
const movieService = require('../Service/movieServices');

exports.getMovies = async (req, res) => {
  try {
    const movies = await movieService.getMovies();
    console.log("Fetched movies:", movies);
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}; 
exports.uploadmovies = async (req, res) => {
  const { movieName, description, uploader, genre } = req.body;
  const movie = req.file?req.file.filename : null;
  if (!movie) {
      return res.status(400).json({ error: 'Please upload a file' });
  }
  const result = await movieService.uploadmovie(movieName, description, uploader, genre, movie);
  if (result) {
      res.status(201).json({ success: true, message: 'Movie uploaded successfully' });
  } else {
      res.status(500).json({ success: false, message: 'Failed to upload movie' });
  }
}
exports.findMovie = async (req, res) => {
  const { movieId } = req.params;
  const movie = await movieService.findMovie(movieId);
  if (movie) {
      res.status(200).json(movie);
  } else {
      res.status(404).json({ error: 'Movie not found' });
  }
}