const Booking = require("../models/Booking");
const Package = require("../models/Package");

async function createBooking(req, res, next) {
  try {
    const { packageId, travelers, travelDate, notes } = req.body;

    const pkg = await Package.findById(packageId);
    if (!pkg) {
      return res.status(404).json({ message: "Package not found" });
    }

    const booking = await Booking.create({
      userId: req.user._id,
      packageId,
      travelers,
      travelDate,
      notes,
    });

    const populated = await booking.populate("packageId", "title destination image");

    res.status(201).json({ booking: populated });
  } catch (err) {
    next(err);
  }
}

async function getMyBookings(req, res, next) {
  try {
    const bookings = await Booking.find({ userId: req.user._id })
      .populate("packageId", "title destination image")
      .sort({ createdAt: -1 });
    res.status(200).json({ bookings });
  } catch (err) {
    next(err);
  }
}

async function getAllBookings(req, res, next) {
  try {
    const bookings = await Booking.find()
      .populate("packageId", "title destination image")
      .populate("userId", "fullname email")
      .sort({ createdAt: -1 });
    res.status(200).json({ bookings });
  } catch (err) {
    next(err);
  }
}

async function updateBookingStatus(req, res, next) {
  try {
    const { status } = req.body;

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    )
      .populate("packageId", "title destination image")
      .populate("userId", "fullname email");

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json({ booking });
  } catch (err) {
    next(err);
  }
}

module.exports = { createBooking, getMyBookings, getAllBookings, updateBookingStatus };
