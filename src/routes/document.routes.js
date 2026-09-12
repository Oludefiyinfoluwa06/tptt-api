const express = require("express");
const { body, param } = require("express-validator");
const validate = require("../middleware/validate");
const { protect } = require("../middleware/auth");
const upload = require("../middleware/upload");
const { uploadDocument, getDocuments } = require("../controllers/document.controller");

const router = express.Router();

router.post(
  "/upload",
  protect,
  upload.single("file"),
  [
    body("visaRequestId").isMongoId().withMessage("A valid visaRequestId is required"),
    body("documentType").trim().notEmpty().withMessage("documentType is required"),
  ],
  validate,
  uploadDocument
);

router.get(
  "/:visaRequestId",
  protect,
  [param("visaRequestId").isMongoId().withMessage("A valid visaRequestId is required")],
  validate,
  getDocuments
);

module.exports = router;
