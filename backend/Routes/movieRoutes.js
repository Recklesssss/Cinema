const express = require('express');
const router = express.Router();
const movieController = require('../Controllers/movieController');

router.get('/movie', movieController.getMovies);

module.exports = router;