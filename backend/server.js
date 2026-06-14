const express = require("express");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const jobRoutes = require("./routes/jobRoutes");
const applicationRoutes = require("./routes/applicationRoutes");

const connectDB = require("./config/db");

dotenv.config();

connectDB();

const app = express();


app.use(cors({
    origin:"https://ats-job-portal-ecru.vercel.app", credentials: true,
}));


app.use(express.json());
app.use(
  "/uploads",
  express.static(
    path.join(__dirname, "uploads")
  )
);
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/application", applicationRoutes);

app.get("/", (req, res) => {
  res.send("Job Portal API Running");
});

app.get("/api/test", (req, res) => {
  res.json({
    success: true,
    message: "Backend Working Successfully",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});