const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  // Страна создания фильма. Обязательное поле-строка.
  country: {
    type: String,
    required: [true, 'Поле password является обязательным'],
  },
  // Режиссёр фильма. Обязательное поле-строка.
  director: {
    type: String,
    required: [true, 'Поле password является обязательным'],
  },
  // Длительность фильма в минутах. Обязательное поле-число.
  duration: {
    type: Number,
    required: [true, 'Поле password является обязательным'],
  },
  // Год выпуска фильма. Обязательное поле-строка.
  year: {
    type: String,
    required: [true, 'Поле password является обязательным'],
  },
  // Описание фильма. Обязательное поле-строка.
  description: {
    type: String,
    required: [true, 'Поле password является обязательным'],
  },
  // Ссылка на постер к фильму. Обязательное поле-строка.
  image: {
    type: String,
    required: [true, 'Поле password является обязательным'],
    validate: {
      validator(v) {
        return /^https?:\/\//.test(v);
      },
      message: 'Введите URL',
    },
  },
  // Ссылка на трейлер фильма. Обязательное поле-строка.
  trailerLink: {
    type: String,
    required: [true, 'Поле password является обязательным'],
    validate: {
      validator(v) {
        return /^https?:\/\//.test(v);
      },
      message: 'Введите URL',
    },
  },
  thumbnail: {
    type: String,
    required: [true, 'Поле password является обязательным'],
    validate: {
      validator(v) {
        return /^https?:\/\//.test(v);
      },
      message: 'Введите URL',
    },
  },
  // _id пользователя, который сохранил фильм. Обязательное поле.
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Поле password является обязательным'],
  },
  // id фильма, который содержится в ответе сервиса MoviesExplorer. Обязательное поле(number).
  movieId: {
    type: Number,
    required: [true, 'Поле password является обязательным'],
  },
  // Название фильма на русском языке. Обязательное поле-строка.
  nameRU: {
    type: String,
    required: [true, 'Поле password является обязательным'],
  },
  // Название фильма на английском языке. Обязательное поле-строка.
  nameEN: {
    type: String,
    required: [true, 'Поле password является обязательным'],
  },
});

module.exports = mongoose.model('movie', movieSchema);
