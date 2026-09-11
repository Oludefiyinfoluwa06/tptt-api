const mongoose = require("mongoose");

const visaRequestSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    country: { type: String, required: true, trim: true },
    visaType: { type: String, required: true, trim: true },
    purpose: { type: String, required: true, trim: true },
    status: {
      type: String,
      enum: ["submitted", "documents_received", "processing", "approved", "rejected"],
      default: "submitted",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("VisaRequest", visaRequestSchema);
