const Notification = require("../models/Notification");
const User = require("../models/User");

async function getMyNotifications(req, res, next) {
  try {
    const notifications = await Notification.find({ userId: req.user._id }).sort({
      createdAt: -1,
    });
    res.status(200).json({ notifications });
  } catch (err) {
    next(err);
  }
}

async function getSentNotifications(req, res, next) {
  try {
    const notifications = await Notification.find()
      .populate("userId", "fullname email")
      .sort({ createdAt: -1 });
    res.status(200).json({ notifications });
  } catch (err) {
    next(err);
  }
}

async function markAsRead(req, res, next) {
  try {
    const notification = await Notification.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      { isRead: true },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    res.status(200).json({ notification });
  } catch (err) {
    next(err);
  }
}

async function sendNotification(req, res, next) {
  try {
    const { userId, title, message } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const notification = await Notification.create({ userId, title, message });
    res.status(201).json({ notification });
  } catch (err) {
    next(err);
  }
}

module.exports = { getMyNotifications, getSentNotifications, markAsRead, sendNotification };
