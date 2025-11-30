import { User, RefreshToken } from "../../models/index.js";
import { setAuthCookies, formatUserResponse } from "./utils.js";

/**
 * Authenticates a user with email and password credentials.
 * Validates credentials, checks account status, generates JWT tokens, and sets secure HTTP-only cookies.
 *
 * @async
 * @function login
 * @param {Object} req - Express request object
 * @param {Object} req.validatedData - Validated request data from middleware
 * @param {string} req.validatedData.email - User's email address
 * @param {string} req.validatedData.password - User's password
 * @param {Object} res - Express response object
 * @returns {Promise<void>} JSON response with authentication result
 */
export const login = async (req, res) => {
  try {
    const { email, password } = req.validatedData;

    // Find user with password field
    const user = await User.findOne({ email: email.toLowerCase() }).select("+password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Check if user has a password (OAuth users might not)
    if (!user.password) {
      return res.status(401).json({
        success: false,
        message: "Please login using Google or GitHub",
      });
    }

    // Verify password
    const isPasswordValid = await user.matchPassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Check account status
    if (user.accountStatus === "blocked") {
      return res.status(403).json({
        success: false,
        message: "Your account has been blocked. Please contact support.",
      });
    }

    // Generate tokens
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    // Save refresh token to DB
    await RefreshToken.saveRefreshToken(user._id, refreshToken, req);

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Set tokens in httpOnly cookies
    setAuthCookies(res, accessToken, refreshToken);

    res.json({
      success: true,
      message: "Login successful",
      data: {
        user: formatUserResponse(user),
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Login failed",
      error: error.message,
    });
  }
};

/**
 * Authenticates students using Learning Management System (LMS) issued credentials.
 * Validates LMS ID and password, checks account status, generates tokens, and sets secure cookies.
 *
 * @async
 * @function lmsLogin
 * @param {Object} req - Express request object
 * @param {Object} req.validatedData - Validated request data from middleware
 * @param {string} req.validatedData.lmsId - Student's LMS ID
 * @param {string} req.validatedData.lmsPassword - Student's LMS password
 * @param {Object} res - Express response object
 * @returns {Promise<void>} JSON response with authentication result and tokens
 */
export const lmsLogin = async (req, res) => {
  try {
    const { lmsId, lmsPassword } = req.validatedData;

    // Find user by LMS ID
    const user = await User.findOne({ lmsId }).select("+lmsPassword");
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid LMS ID or password",
      });
    }

    // Verify LMS password
    const isPasswordValid = await user.matchLmsPassword(lmsPassword);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid LMS ID or password",
      });
    }

    // Check account status
    if (user.accountStatus === "blocked") {
      return res.status(403).json({
        success: false,
        message: "Your account has been blocked. Please contact support.",
      });
    }

    // Generate tokens
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    // Save refresh token to DB
    await RefreshToken.saveRefreshToken(user._id, refreshToken, req);

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Set tokens in httpOnly cookies
    setAuthCookies(res, accessToken, refreshToken);

    res.json({
      success: true,
      message: "LMS Login successful",
      data: {
        user: formatUserResponse(user),
        accessToken,
        refreshToken,
        expiresIn: 15 * 60,
      },
    });
  } catch (error) {
    console.error("LMS Login error:", error);
    res.status(500).json({
      success: false,
      message: "Login failed",
      error: error.message,
    });
  }
};
