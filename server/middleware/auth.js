const jwt = require("jsonwebtoken");

module.exports.isAuthenticated = (req, res, next) => {
  try {
    const bearerToken = req.headers.authorization;

    if (typeof bearerToken !== "undefined") {
      const token = bearerToken.split(" ")[1];
      jwt.verify(token, process.env.JWT_SECRETE, (err, authData) => {
        if (err) {
          console.log(err);
          return res.json({
            success: false,
            message: "access denied",
          });
        } else {
          req.headers.authData = authData;
          setTimeout(() => {
            next();
          }, 0);
        }
      });
    } else {
      console.log("smthng went wrong validating token");
      return res.status(403).json({
        message: "something went wrong",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error,
    });
  }
};
