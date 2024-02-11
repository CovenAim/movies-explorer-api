const http2 = require('http2');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

const User = require('../models/user');
const UnauthorizedError = require('../utils/UnauthorizedError');
const { CustomError } = require('../utils/CustomError');

exports.getUserAbout = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    res.status(http2.constants.HTTP_STATUS_OK).send(user);
  } catch (err) {
    next(err);
  }
};

exports.createUserProfile = async (req, res, next) => {
  try {
    const makePasswordHashed = await bcrypt.hash(req.body.password, 10);
    const createNewUser = await User.create({
      email: req.body.email,
      password: makePasswordHashed,
      name: req.body.name,
    });
    res.status(201).json({
      email: createNewUser.email,
      name: createNewUser.name,
    });
  } catch (err) {
    next(err);
  }
};

exports.updateUserProfile = async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { $set: req.body },
      { new: true, runValidators: true },
    ).orFail(new CustomError('Запрашиваемый пользователь не найден', 404));

    res.status(http2.constants.HTTP_STATUS_OK).json(updatedUser);
  } catch (err) {
    next(err);
  }
};

exports.userLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      throw new UnauthorizedError('Неверные почта или пароль');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedError('Неверные почта или пароль');
    }

    const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
      expiresIn: '7d',
    });

    res.status(http2.constants.HTTP_STATUS_OK).send({
      data: { email: user.email, id: user._id },
      token,
      message: 'Аутентификация прошла успешно',
    });
  } catch (err) {
    next(err);
  }
};
