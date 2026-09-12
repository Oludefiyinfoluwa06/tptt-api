const express = require("express");
const { body } = require("express-validator");
const validate = require("../middleware/validate");
const { protect, authorize } = require("../middleware/auth");
const {
  createVisaRequest,
  getMyVisaRequests,
  getAllVisaRequests,
  updateVisaRequestStatus,
} = require("../controllers/visa.controller");

const router = express.Router();

const STATUS_VALUES = ["submitted", "documents_received", "processing", "approved", "rejected"];

router.post(
  "/",
  protect,
  [
    body("country").trim().notEmpty().withMessage("Country is required"),
    body("visaType").trim().notEmpty().withMessage("Visa type is required"),
    body("purpose").trim().notEmpty().withMessage("Purpose is required"),
  ],
  validate,
  createVisaRequest
);

router.get("/my-requests", protect, getMyVisaRequests);

router.get("/", protect, authorize("admin"), getAllVisaRequests);

router.patch(
  "/:id/status",
  protect,
  authorize("admin"),
  [body("status").isIn(STATUS_VALUES).withMessage("Invalid status")],
  validate,
  updateVisaRequestStatus
);

module.exports = router;
