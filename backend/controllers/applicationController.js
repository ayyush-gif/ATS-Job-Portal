const fs = require("fs");
const pdfParse = require("pdf-parse");

const Application = require("../models/Application");
const Job = require("../models/Job");

const calculateATSScore =
  require("../utils/atsScorer");

// Apply For Job
const applyForJob = async (req, res) => {
  try {
    const { jobId } = req.body;

    if (!jobId) {
      return res.status(400).json({
        success: false,
        message: "Job ID is required",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Resume file is required",
      });
    }

    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    // Prevent duplicate application
    const existingApplication =
      await Application.findOne({
        user: req.user.id,
        job: jobId,
      });

    if (existingApplication) {
      return res.status(400).json({
        success: false,
        message:
          "You have already applied for this job",
      });
    }

    // Read Resume
    const pdfBuffer = fs.readFileSync(
      req.file.path
    );

    const pdfData = await pdfParse(
      pdfBuffer
    );

    const resumeText = pdfData.text;

    const {
      score,
      matchedSkills,
      missingSkills,
    } = calculateATSScore(
      job.skills,
      resumeText
    );

    const application =
      await Application.create({
        user: req.user.id,
        job: jobId,
        resumeUrl: req.file.filename,

        atsScore: score,
        matchedSkills,
        missingSkills,

        status: "Applied",
      });

    res.status(201).json({
      success: true,
      message:
        "Application Submitted Successfully",

      atsScore: score,
      matchedSkills,
      missingSkills,

      application,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Recruiter View Applicants
const getApplicantsForJob =
  async (req, res) => {
    try {
      const applications =
        await Application.find({
          job: req.params.jobId,
        })
          .populate(
            "user",
            "name email"
          )
          .sort({
            atsScore: -1,
          });

      res.status(200).json({
        success: true,
        count: applications.length,
        applications,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

// Update Status
const updateApplicationStatus =
  async (req, res) => {
    try {
      const { status } = req.body;

      const application =
        await Application.findByIdAndUpdate(
          req.params.id,
          { status },
          {
            new: true,
          }
        );

      if (!application) {
        return res.status(404).json({
          success: false,
          message:
            "Application not found",
        });
      }

      res.status(200).json({
        success: true,
        message:
          "Status updated successfully",
        application,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

// Hiring Pipeline Stats
const getPipelineStats =
  async (req, res) => {
    try {
      const stats =
        await Application.aggregate([
          {
            $group: {
              _id: "$status",
              count: {
                $sum: 1,
              },
            },
          },
        ]);

      const pipeline = {
        Applied: 0,
        Shortlisted: 0,
        Interview: 0,
        Hired: 0,
        Rejected: 0,
      };

      stats.forEach((item) => {
        pipeline[item._id] =
          item.count;
      });

      res.json({
        success: true,
        pipeline,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

module.exports = {
  applyForJob,
  getApplicantsForJob,
  updateApplicationStatus,
  getPipelineStats,
};