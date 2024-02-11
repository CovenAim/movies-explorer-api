const express = require('express');

const router = express.Router();
const { celebrate } = require('celebrate');
const validation = require('../validation/validation');
const movieController = require('../controllers/movieController');

router.get('/', movieController.getMovies);
router.post('/', celebrate(validation.allMovieComponents), movieController.addMovie);
router.delete('/:movieId', celebrate(validation.validateMovieId), movieController.deleteMovie);

module.exports = router;
