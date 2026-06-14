const express = require("express");

const router = express.Router();

const {
  applyForJob,
  getApplicantsForJob,
  updateApplicationStatus,
  getPipelineStats,
} = require(
  "../controllers/applicationController"
);

const {
  protect,
  recruiterOnly,
} = require(
  "../middleware/authMiddleware"
);

const upload =
  require("../middleware/uploadMiddleware");

// Apply For Job
router.post(
  "/apply",
  protect,
  upload.single("resume"),
  applyForJob
);

// Recruiter View Applicants
router.get(
  "/job/:jobId",
  protect,
  recruiterOnly,
  getApplicantsForJob
);

// Update Status
router.put(
  "/status/:id",
  protect,
  recruiterOnly,
  updateApplicationStatus
);

// Pipeline Stats
router.get(
  "/pipeline",
  protect,
  recruiterOnly,
  getPipelineStats
);

module.exports = router;