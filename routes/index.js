const express = require('express');
const { celebrate } = require('celebrate');
const userRouter = require('./userRoutes');
const movieRouter = require('./movieRoutes');
const validation = require('../validation/validation');
const { userLogin, createUserProfile } = require('../controllers/userController');
const authenticate = require('../middlewares/authenticate');

const router = express.Router();

router.post('/signup', celebrate(validation.validateSignUp), createUserProfile);
router.post('/signin', celebrate(validation.validateSignIn), userLogin);

router.use(authenticate);

router.use('/users', userRouter);
router.use('/movies', movieRouter);

module.exports = router;
