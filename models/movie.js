const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  // Страна создания фильма. Обязательное поле-строка.
  country: {
    type: String,
    required: true,
  },
  // Режиссёр фильма. Обязательное поле-строка.
  director: {
    type: String,
    required: true,
  },
  // Длительность фильма в минутах. Обязательное поле-число.
  duration: {
    type: Number,
    required: true,
  },
  // Год выпуска фильма. Обязательное поле-строка.
  year: {
    type: String,
    required: true,
  },
  // Описание фильма. Обязательное поле-строка.
  description: {
    type: String,
    required: true,
  },
  // Ссылка на постер к фильму. Обязательное поле-строка.
  image: {
    type: String,
    required: true,
  },
  // Ссылка на трейлер фильма. Обязательное поле-строка.
  trailerLink: {
    type: String,
    required: true,
  },
  // Миниатюрное изображение постера к фильму. Обязательное поле-строка.
  thumbnail: {
    type: String,
    required: true,
  },
  // _id пользователя, который сохранил фильм. Обязательное поле.
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  // id фильма, который содержится в ответе сервиса MoviesExplorer. Обязательное поле(number).
  movieId: {
    type: Number,
    required: true,
  },
  // Название фильма на русском языке. Обязательное поле-строка.
  nameRU: {
    type: String,
    required: true,
  },
  // Название фильма на английском языке. Обязательное поле-строка.
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
