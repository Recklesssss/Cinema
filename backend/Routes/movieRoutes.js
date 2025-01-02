const express = require('express');
const router = express.Router();
const movieController = require('../Controllers/movieController');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Adjust the path where files should be saved
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Set file name to avoid overwriting
  }
});
const upload = multer({ storage });
router.get('/movie', movieController.getMovies);
router.post('/upload', upload.single('movie'), movieController.uploadmovies);
router.get('/movie/:movieId', movieController.findMovie);

module.exports = router;