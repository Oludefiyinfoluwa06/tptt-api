const cloudinary = require("../config/cloudinary");
const Document = require("../models/Document");
const VisaRequest = require("../models/VisaRequest");
const bufferToDataUri = require("../utils/bufferToDataUri");

async function uploadDocument(req, res, next) {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const { visaRequestId, documentType } = req.body;

    const visaRequest = await VisaRequest.findById(visaRequestId);
    if (!visaRequest || String(visaRequest.userId) !== String(req.user._id)) {
      return res.status(404).json({ message: "Visa request not found" });
    }

    const uploadResult = await cloudinary.uploader.upload(bufferToDataUri(req.file), {
      folder: "tptt/documents",
      resource_type: "auto",
    });

    const document = await Document.create({
      userId: req.user._id,
      visaRequestId,
      documentType,
      fileUrl: uploadResult.secure_url,
    });

    res.status(201).json({ document });
  } catch (err) {
    next(err);
  }
}

async function getAllDocuments(req, res, next) {
  try {
    const documents = await Document.find()
      .populate("userId", "fullname email")
      .populate("visaRequestId", "country visaType status")
      .sort({ createdAt: -1 });
    res.status(200).json({ documents });
  } catch (err) {
    next(err);
  }
}

async function getDocuments(req, res, next) {
  try {
    const { visaRequestId } = req.params;

    const visaRequest = await VisaRequest.findById(visaRequestId);
    if (!visaRequest) {
      return res.status(404).json({ message: "Visa request not found" });
    }

    const isOwner = String(visaRequest.userId) === String(req.user._id);
    if (!isOwner && req.user.role !== "admin") {
      return res.status(404).json({ message: "Visa request not found" });
    }

    const documents = await Document.find({ visaRequestId }).sort({ createdAt: -1 });
    res.status(200).json({ documents });
  } catch (err) {
    next(err);
  }
}

module.exports = { uploadDocument, getAllDocuments, getDocuments };
