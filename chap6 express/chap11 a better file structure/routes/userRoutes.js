const express = require('express');

// import functions / controller from controller files
const userController = require('../controllers/userController')

const router = express.Router();

router.route('/').get(userController.getAllUsers).post(userController.createUser);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);