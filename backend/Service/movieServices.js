const movieModel = require('../Models/movieModel');

exports.getMovies = async () => {
    const movies = await movieModel.getMovies();
    if (!movies || movies.length === 0) {
      return res.status(404).json({ message: "No movies found" });
  }  
    return movies;
}
exports.uploadmovie = async (movieName, description, uploader, genre, movie) => {
    const result = await movieModel.uploadmovie(movieName, description, uploader, genre, movie);
    return result;
}
exports.findMovie = async (movieName) =>{
    const movie = await movieModel.findMovie(movieName);
    return movie;
}