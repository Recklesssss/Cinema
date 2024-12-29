const movieModel = require('../Models/movieModel');

exports.getMovies = async () => {
    const movies = await movieModel.getMovies();
    return movies;
}