const Package = require("../models/Package");

async function listPackages(req, res, next) {
  try {
    const packages = await Package.find().sort({ createdAt: -1 });
    res.status(200).json({ packages });
  } catch (err) {
    next(err);
  }
}

async function getPackage(req, res, next) {
  try {
    const pkg = await Package.findById(req.params.id);
    if (!pkg) {
      return res.status(404).json({ message: "Package not found" });
    }
    res.status(200).json({ package: pkg });
  } catch (err) {
    next(err);
  }
}

async function createPackage(req, res, next) {
  try {
    const { title, destination, description, duration, price, image } = req.body;
    const pkg = await Package.create({ title, destination, description, duration, price, image });
    res.status(201).json({ package: pkg });
  } catch (err) {
    next(err);
  }
}

async function updatePackage(req, res, next) {
  try {
    const { title, destination, description, duration, price, image } = req.body;
    const pkg = await Package.findByIdAndUpdate(
      req.params.id,
      { title, destination, description, duration, price, image },
      { new: true, runValidators: true }
    );
    if (!pkg) {
      return res.status(404).json({ message: "Package not found" });
    }
    res.status(200).json({ package: pkg });
  } catch (err) {
    next(err);
  }
}

async function deletePackage(req, res, next) {
  try {
    const pkg = await Package.findByIdAndDelete(req.params.id);
    if (!pkg) {
      return res.status(404).json({ message: "Package not found" });
    }
    res.status(200).json({ message: "Package deleted" });
  } catch (err) {
    next(err);
  }
}

module.exports = { listPackages, getPackage, createPackage, updatePackage, deletePackage };
