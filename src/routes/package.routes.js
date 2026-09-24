const express = require("express");
const { body } = require("express-validator");
const validate = require("../middleware/validate");
const { protect, authorize } = require("../middleware/auth");
const uploadImage = require("../middleware/uploadImage");
const {
  listPackages,
  getPackage,
  createPackage,
  updatePackage,
  deletePackage,
} = require("../controllers/package.controller");

const router = express.Router();

const packageValidators = [
  body("title").trim().notEmpty().withMessage("Title is required"),
  body("destination").trim().notEmpty().withMessage("Destination is required"),
  body("description").trim().notEmpty().withMessage("Description is required"),
  body("duration").trim().notEmpty().withMessage("Duration is required"),
  body("price").isFloat({ min: 0 }).withMessage("Price must be a positive number"),
];

router.get("/", listPackages);
router.get("/:id", getPackage);
router.post(
  "/",
  protect,
  authorize("admin"),
  uploadImage.single("image"),
  packageValidators,
  validate,
  createPackage
);
router.put(
  "/:id",
  protect,
  authorize("admin"),
  uploadImage.single("image"),
  packageValidators,
  validate,
  updatePackage
);
router.delete("/:id", protect, authorize("admin"), deletePackage);

module.exports = router;
