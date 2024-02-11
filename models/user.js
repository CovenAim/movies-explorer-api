const mongoose = require('mongoose');

const validator = require('validator');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    require: {
      value: true,
      message: 'Поле email является обязательным',
    },
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: 'Неверный формат email',
    },
  },
  password: {
    type: String,
    required: [true, 'Поле password является обязательным'],
    select: false,
  },
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: [true, 'Поле name является обязательным'],
  },
});

module.exports = mongoose.model('user', userSchema);
