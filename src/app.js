const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./config/db");
const { notFound, errorHandler } = require("./middleware/errorHandler");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== "test") {
  app.use(morgan("dev"));
}

app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// Ensures a MongoDB connection exists before any resource route runs. On
// Vercel, app.js (not server.js) is the entry point, so nothing else
// connects to the database.
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    next(err);
  }
});

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/packages", require("./routes/package.routes"));
app.use("/api/bookings", require("./routes/booking.routes"));
app.use("/api/visa", require("./routes/visa.routes"));
app.use("/api/documents", require("./routes/document.routes"));
app.use("/api/notifications", require("./routes/notification.routes"));

app.use(notFound);
app.use(errorHandler);

module.exports = app;
