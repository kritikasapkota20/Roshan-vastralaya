const jwt = require("jsonwebtoken");

module.exports.isAuthenticated = (req, res, next) => {
  try {
    const bearerToken = req.headers.authorization;

    if (typeof bearerToken !== "undefined") {
      const token = bearerToken.split(" ")[1];
      jwt.verify(token, process.env.JWT_SECRET || "zenith123", (err, authData) => {
        if (err) {
          console.log("Token verification error:", err);
          return res.status(403).json({
            success: false,
            message: "Invalid or expired token",
          });
        } else {
          req.headers.authData = authData;
          next();
        }
      });
    } else {
      console.log("No token provided");
      return res.status(403).json({
        success: false,
        message: "No token provided",
      });
    }
  } catch (error) {
    console.log("Auth middleware error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
