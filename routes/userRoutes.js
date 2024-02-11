const express = require('express');

const router = express.Router();
const { celebrate } = require('celebrate');
const validation = require('../validation/validation');
const userController = require('../controllers/userController');

router.get('/me', userController.getUserAbout);
router.patch('/me', celebrate(validation.validateUpdate), userController.updateUserProfile);

module.exports = router;
