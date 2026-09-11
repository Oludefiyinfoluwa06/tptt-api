const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
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

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/packages", require("./routes/package.routes"));
app.use("/api/bookings", require("./routes/booking.routes"));

// Route mounts (added incrementally, one per feature):
// app.use("/api/visa", require("./routes/visa.routes"));
// app.use("/api/documents", require("./routes/document.routes"));
// app.use("/api/notifications", require("./routes/notification.routes"));

app.use(notFound);
app.use(errorHandler);

module.exports = app;
