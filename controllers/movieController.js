const http2 = require('http2');
const Movie = require('../models/movie');
const BadRequestError = require('../utils/BadRequestError');
const NotFoundError = require('../utils/NotFoundError');
const ForbiddenError = require('../utils/ForbiddenError');

module.exports.getMovies = async (req, res, next) => {
  try {
    const movies = await Movie.find({ owner: req.user._id }).populate('owner');
    res.status(http2.constants.HTTP_STATUS_OK).send(movies);
  } catch (err) {
    next(err);
  }
};

exports.addMovie = async (req, res, next) => {
  try {
    const movie = await Movie.create({ owner: req.user._id, ...req.body });
    res.status(http2.constants.HTTP_STATUS_CREATED).send(movie);
  } catch (err) {
    next(err);
  }
};

// eslint-disable-next-line consistent-return
exports.deleteMovie = async (req, res, next) => {
  const { movieId } = req.params;

  try {
    const movie = await Movie.findById(movieId);

    if (!movie) {
      throw new NotFoundError('Фильм не найден');
    }

    if (movie.owner.toString() !== req.user._id.toString()) {
      throw new ForbiddenError('Недостаточно прав для удаления этого фильма');
    }

    await movie.deleteOne();
    res.status(http2.constants.HTTP_STATUS_OK).json(movie);
  } catch (err) {
    if (err.name === 'CastError') {
      return next(new BadRequestError('Некорректный ID фильма'));
    }
    next(err);
  }
};
