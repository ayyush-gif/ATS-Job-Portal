const jwt = require("jsonwebtoken");

const protect = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
      );

      console.log("DECODED TOKEN:", decoded);

      req.user = decoded;

      next();
    } else {
      return res.status(401).json({
        success: false,
        message: "No Token Found",
      });
    }
  } catch (error) {
    console.log("AUTH ERROR:", error.message);

    return res.status(401).json({
      success: false,
      message: "Invalid Token",
    });
  }
};

const recruiterOnly = (req, res, next) => {
  console.log("USER ROLE:", req.user.role);

  if (
    req.user.role === "recruiter" ||
    req.user.role === "admin"
  ) {
    next();
  } else {
    return res.status(403).json({
      success: false,
      message: "Access Denied. Recruiters Only",
    });
  }
};

module.exports = {
  protect,
  recruiterOnly,
};