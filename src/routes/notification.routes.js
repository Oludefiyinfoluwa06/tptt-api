const express = require("express");
const { body } = require("express-validator");
const validate = require("../middleware/validate");
const { protect, authorize } = require("../middleware/auth");
const {
  getMyNotifications,
  getSentNotifications,
  markAsRead,
  sendNotification,
} = require("../controllers/notification.controller");

const router = express.Router();

router.get("/", protect, getMyNotifications);

router.get("/sent", protect, authorize("admin"), getSentNotifications);

router.patch("/:id/read", protect, markAsRead);

router.post(
  "/",
  protect,
  authorize("admin"),
  [
    body("userId").isMongoId().withMessage("A valid userId is required"),
    body("title").trim().notEmpty().withMessage("Title is required"),
    body("message").trim().notEmpty().withMessage("Message is required"),
  ],
  validate,
  sendNotification
);

module.exports = router;
