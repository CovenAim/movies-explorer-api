const express = require('express');
const { celebrate } = require('celebrate');
const userRouter = require('./userRoutes');
const movieRouter = require('./movieRoutes');
const validation = require('../validation/validation');
const { userLogin, createUserProfile } = require('../controllers/userController');
const authenticate = require('../middlewares/authenticate');
const NotFoundError = require('../utils/NotFoundError');

const router = express.Router();

router.post('/signup', celebrate(validation.validateSignUp), createUserProfile);
router.post('/signin', celebrate(validation.validateSignIn), userLogin);

router.use(authenticate);

router.use('/users', userRouter);
router.use('/movies', movieRouter);

// Обработчик ошибки 404
router.use('*', (req, res, next) => {
  next(new NotFoundError('Несуществующий адрес запроса'));
});

module.exports = router;
