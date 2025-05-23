const User = require("../Models/UserSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "zenith123";

// -------------------registration process-----------
const adminRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const foundAdmin = await User.findOne({});
    if (foundAdmin) {
      return res.status(403).json({ message: "Admin already exists" });
    }

    //  hashpassword

    const hashPassword = await bcrypt.hash(password, 12);
    const result = await User.create({
      fullname: name,
      email,
      password: hashPassword,
    });

    // Generate JWT token after user registration
    const user_token = jwt.sign({ id: result._id }, JWT_SECRET, {
      expiresIn: "3d",
    });

    // Store the token in an HTTP-only cookie
    res.cookie("token", user_token, {
      httpOnly: true,
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    });

    if (result) {
      return res.status(201).json({
        success: true,
        message: "Admin Registered",
      });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// -------------------login processs-------------
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const JWT_SECRET = process.env.JWT_SECRET || "defaultSecret"; // Use a default if not provided

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) return res.json({ message: "User not found" });

    // Check if the password is correct
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) return res.json({ message: "Invalid credentials" });

    // Generate a new JWT token
    const user_token = jwt.sign({ id: user._id }, JWT_SECRET, {
      expiresIn: "3d",
    });

    // Return the user data along with the JWT token, but exclude the password
    return res.status(200).json({
      success: true,
      message: "Login Successfully",
      _id: user._id,
      name: user.fullname,
      email: user.email,
      user_token: user_token,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

//--------------------logout user-------------
const logout = async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "Logout successfully",
  });
};

const checkAdmin = async (req, res) => {
  try {
    const foundAdmin = await User.findOne({});

    setTimeout(() => {
      if (foundAdmin) {
        return res.json({
          exists: true,
        });
      } else {
        return res.json({
          exists: false,
        });
      }
    }, 5000);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const getUserByToken = async (req, res) => {
  try {
    const userId = req.headers.authData.id;
    console.log(userId, "logged In userID");
    const loggedInUser = await User.findById(userId).select("-password");

    if (!loggedInUser) {
      return res.json({
        message: "user not found",
      });
    }

    // setTimeout(() => {
    res.json({
      success: true,
      user: loggedInUser,
    });
    // }, 6000);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "getting user by token failed",
    });
  }
};

module.exports = {
  adminRegister,
  adminLogin,
  logout,
  checkAdmin,
  getUserByToken,
};
