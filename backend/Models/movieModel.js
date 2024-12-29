const db = require('../config/database');

exports.getMovies = async () => {
    const movies = await db.query (`select * from movies`);
    console.log("Movies fetched from DB:", movies);
    return movies;
}
exports.uploadmovie = async (movieName,description,uploader,genre,movie) => {
    const movies = await db.query(`INSERT INTO movies (movie_name, movie,description,uploader_id,genre) VALUES ($1, $2, $3, $4, $5) RETURNING *`
    , [movieName, movie, description, uploader, genre]);
    return movies;
}
exports.findMovie = async (moviename) => {
    const movie = await db.query(`SELECT * FROM movies WHERE movie_name = $1`, [moviename]);
    return movie;
}