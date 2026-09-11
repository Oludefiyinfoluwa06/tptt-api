const VisaRequest = require("../models/VisaRequest");

async function createVisaRequest(req, res, next) {
  try {
    const { country, visaType, purpose } = req.body;

    const visaRequest = await VisaRequest.create({
      userId: req.user._id,
      country,
      visaType,
      purpose,
    });

    res.status(201).json({ visaRequest });
  } catch (err) {
    next(err);
  }
}

async function getMyVisaRequests(req, res, next) {
  try {
    const visaRequests = await VisaRequest.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json({ visaRequests });
  } catch (err) {
    next(err);
  }
}

async function getAllVisaRequests(req, res, next) {
  try {
    const visaRequests = await VisaRequest.find()
      .populate("userId", "fullname email")
      .sort({ createdAt: -1 });
    res.status(200).json({ visaRequests });
  } catch (err) {
    next(err);
  }
}

async function updateVisaRequestStatus(req, res, next) {
  try {
    const { status } = req.body;

    const visaRequest = await VisaRequest.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    ).populate("userId", "fullname email");

    if (!visaRequest) {
      return res.status(404).json({ message: "Visa request not found" });
    }

    res.status(200).json({ visaRequest });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  createVisaRequest,
  getMyVisaRequests,
  getAllVisaRequests,
  updateVisaRequestStatus,
};
