const express = require("express");
const { body } = require("express-validator");
const validate = require("../middleware/validate");
const { protect, authorize } = require("../middleware/auth");
const { register, login, getProfile, getUsers } = require("../controllers/auth.controller");

const router = express.Router();

router.post(
  "/register",
  [
    body("fullname").trim().notEmpty().withMessage("Full name is required"),
    body("email").isEmail().withMessage("A valid email is required").normalizeEmail(),
    body("phone").optional().trim(),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
  ],
  validate,
  register
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("A valid email is required").normalizeEmail(),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  validate,
  login
);

router.get("/profile", protect, getProfile);

router.get("/users", protect, authorize("admin"), getUsers);

module.exports = router;
