const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Поле должно быть заполнено'],
    unique: true,
    validate: {
      validator(email) {
        return /^\S+@\S+\.\S+$/.test(email);
      },
      message: 'Введите верный email',
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
