const User = require('../models/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('./../utils/catchAsync');

const filterObject = function (obj, ...allowedFields) {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) {
      newObj[el] = obj[el];
    }
  });
  return newObj;
};

exports.getALLUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    //requestedAt: req.requestTime,
    status: 'success',
    results: users.length,
    data: users,
  });
});

exports.addNewUser = (req, res) => {
  res.status(500).json({
    status: 'err',
    message: 'this route is not yet handled',
  });
};

exports.getUserWithId = (req, res) => {
  res.status(500).json({
    status: 'err',
    message: 'this route is not yet handled',
  });
};
exports.updateUserWithId = (req, res) => {
  res.status(500).json({
    status: 'err',
    message: 'this route is not yet handled',
  });
};
exports.deleteUserWithId = (req, res) => {
  res.status(500).json({
    status: 'err',
    message: 'this route is not yet handled',
  });
};

exports.updateMe = catchAsync(async (req, res, next) => {
  //1)create error if user POSTs password
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not for password updates. please use /updateMyPassword',
        400
      )
    );
  }

  //2) Filtered out unwanted fields names that are not allowed to be updated
  const filteredBody = filterObject(req.body, 'name', 'email');

  //3) Update user document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
