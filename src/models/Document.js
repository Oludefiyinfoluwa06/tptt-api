const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    visaRequestId: { type: mongoose.Schema.Types.ObjectId, ref: "VisaRequest", required: true },
    documentType: { type: String, required: true, trim: true },
    fileUrl: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Document", documentSchema);
