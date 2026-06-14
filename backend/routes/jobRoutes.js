const express = require("express");

const router = express.Router();

const {
  createJob,
  getAllJobs,
  getJobById,
  deleteJob,
  getMyJobs,
} = require("../controllers/jobController");

const {
  protect,
  recruiterOnly,
} = require("../middleware/authMiddleware");

router.post("/", protect, recruiterOnly, createJob);
router.get("/my-jobs", protect, recruiterOnly, getMyJobs);
router.get("/", getAllJobs);
router.get("/:id", getJobById);
router.delete("/:id", protect, recruiterOnly, deleteJob);

module.exports = router;