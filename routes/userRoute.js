const express = require('express');

const router = express.Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.post('/forgotPassword', authController.forgotpassword);
router.patch('/resetPassword/:token', authController.resetpassword);

router.patch(
  '/updateMyPassword',
  authController.protect,
  authController.updatePassword
);

router.patch('/updateMe', authController.protect, userController.updateMe);
router.delete('/deleteMe', authController.protect, userController.deleteMe);

router
  .route('/')
  .get(userController.getALLUsers)
  .post(userController.addNewUser);
router
  .route('/:id')
  .get(userController.getUserWithId)
  .patch(userController.updateUserWithId)
  .delete(userController.deleteUserWithId);

module.exports = router;
