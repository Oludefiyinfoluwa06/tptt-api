const express = require("express");
const { body } = require("express-validator");
const validate = require("../middleware/validate");
const { protect, authorize } = require("../middleware/auth");
const {
  createBooking,
  getMyBookings,
  getAllBookings,
  updateBookingStatus,
} = require("../controllers/booking.controller");

const router = express.Router();

router.post(
  "/",
  protect,
  [
    body("packageId").isMongoId().withMessage("A valid packageId is required"),
    body("travelers").isInt({ min: 1 }).withMessage("Travelers must be at least 1"),
    body("travelDate").isISO8601().withMessage("A valid travelDate is required"),
    body("notes").optional({ values: "falsy" }).trim(),
  ],
  validate,
  createBooking
);

router.get("/my-bookings", protect, getMyBookings);

router.get("/", protect, authorize("admin"), getAllBookings);

router.patch(
  "/:id/status",
  protect,
  authorize("admin"),
  [body("status").isIn(["pending", "approved", "rejected"]).withMessage("Invalid status")],
  validate,
  updateBookingStatus
);

module.exports = router;
