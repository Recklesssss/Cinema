const db = require('../config/database');

exports.getMovies = async () => {
    const movies = await db (`select * from movies`);
    return movies;
}
exports.uploadmovie = async (movieName,description,uploader,genre,movie) => {
    const movies = await db(`INSERT INTO movies (movie_name, movie,description,uploader_id,genre) VALUES ($1, $2) RETURNING *`
    , [movieName, movie]);
    return movies;
}