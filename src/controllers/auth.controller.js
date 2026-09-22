const User = require("../models/User");
const generateToken = require("../utils/generateToken");

function toPublicUser(user) {
  return {
    id: user._id,
    fullname: user.fullname,
    email: user.email,
    phone: user.phone,
    role: user.role,
    createdAt: user.createdAt,
  };
}

async function register(req, res, next) {
  try {
    const { fullname, email, phone, password } = req.body;

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: "An account with this email already exists" });
    }

    const user = await User.create({ fullname, email, phone, password });
    const token = generateToken(user);

    res.status(201).json({ token, user: toPublicUser(user) });
  } catch (err) {
    next(err);
  }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = generateToken(user);
    res.status(200).json({ token, user: toPublicUser(user) });
  } catch (err) {
    next(err);
  }
}

async function getProfile(req, res, next) {
  try {
    res.status(200).json({ user: toPublicUser(req.user) });
  } catch (err) {
    next(err);
  }
}

async function getUsers(req, res, next) {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.status(200).json({ users: users.map(toPublicUser) });
  } catch (err) {
    next(err);
  }
}

module.exports = { register, login, getProfile, getUsers };
