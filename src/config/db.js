const mongoose = require("mongoose");

mongoose.connection.on("connected", () => {
  console.log(`MongoDB connected: ${mongoose.connection.host}`);
});

mongoose.connection.on("error", (err) => {
  console.error(`MongoDB connection error: ${err.message}`);
});

// Cached across invocations so warm serverless containers reuse the same
// connection instead of reconnecting on every request.
let connectionPromise = null;

async function connectDB() {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  if (!connectionPromise) {
    const uri = process.env.MONGO_URI;

    if (!uri) {
      throw new Error("MONGO_URI is not set in the environment");
    }

    connectionPromise = mongoose.connect(uri).catch((err) => {
      connectionPromise = null;
      throw err;
    });
  }

  return connectionPromise;
}

module.exports = connectDB;
