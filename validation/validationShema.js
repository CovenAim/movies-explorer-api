const { celebrate, Joi } = require('celebrate');

const email = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const password = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/;
const url = /^(https?:\/\/)(www\.)?([a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]+)#?$/;

const validation = {
  validateSignUp: celebrate({
    body: Joi.object({
      email: Joi.string().pattern(email).required(),
      password: Joi.string().min(6).pattern(password).required(),
      name: Joi.string().required(),
    }),
  }),
  validateSignIn: celebrate({
    body: Joi.object({
      email: Joi.string().required().pattern(email),
      password: Joi.string().required().pattern(password),
    }),
  }),
  validateUpdate: celebrate({
    body: Joi.object({
      email: Joi.string().pattern(email),
      name: Joi.string(),
    }),
  }),
  validateMovieId: celebrate({
    params: Joi.object({
      movieId: Joi.string().required().hex().length(24),
    }),
  }),
  allMovieComponents: celebrate({
    body: Joi.object({
      country: Joi.string().required(),
      director: Joi.string().required(),
      duration: Joi.number().required(),
      year: Joi.string().required(),
      description: Joi.string().required(),
      image: Joi.string().pattern(url).required(),
      trailerLink: Joi.string().pattern(url).required(),
      thumbnail: Joi.string().pattern(url).required(),
      movieId: Joi.number().required(),
      nameRU: Joi.string().required(),
      nameEN: Joi.string().required(),
    }),
  }),
};

module.exports = validation;
