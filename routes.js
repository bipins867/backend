const express = require("express");

const controller = require("./controller");
const { checkFileSize, fileDataMiddleware } = require("./middleware");

const router = express.Router();

router.post("/create",checkFileSize,fileDataMiddleware([{name:'evidenceImage',maxCount:1}]), controller.createCrimeReport);
router.post("/get", controller.getCrimeReportById);
router.get("/getAll", controller.getAllCrimeReports);

module.exports = router;
