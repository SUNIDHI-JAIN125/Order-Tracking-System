const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");

// Register a User
exports.registerUser = catchAsyncError(async (req, res, next) => {
  const { name, email, password ,role} = req.body;

  const user = await User.create({
    name,
    email,
    password,
    role,
  });
  sendToken(user, 201, res);
});

// Login User
exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler(" Please Enter Email and Password", 400));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler(" Invalid email or password ", 401));
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler(" Invalid email or password ", 401));
  }

  sendToken(user, 200, res);
});

// Get USER Details
exports.getUserDetails = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});


// Get all Users (admin)
exports.getAllUser = catchAsyncError(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    success: true,
    users,
  });
});

// Get   single user (admin)
exports.getSingleUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(
      new ErrorHandler(`user  does not exist with Id :${req.params.id}`)
    );
  }
  res.status(200).json({
    success: true,
    user,
  });
});


