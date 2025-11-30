import { RefreshToken } from "../../models/index.js";
import { clearAuthCookies } from "./utils.js";

/**
 * Logs out the current user session by revoking the refresh token and clearing authentication cookies.
 * Only invalidates the current device/session.
 *
 * @async
 * @function logout
 * @param {Object} req - Express request object
 * @param {Object} [req.cookies] - HTTP cookies
 * @param {string} [req.cookies.refreshToken] - Refresh token to revoke
 * @param {Object} [req.body] - Request body (fallback)
 * @param {string} [req.body.refreshToken] - Refresh token to revoke (fallback)
 * @param {Object} res - Express response object
 * @returns {Promise<void>} JSON response confirming logout
 */
export const logout = async (req, res) => {
  try {
    // Get refresh token from cookie or body
    const refreshToken = req.cookies?.refreshToken || req.body?.refreshToken;

    if (refreshToken) {
      // Revoke the specific refresh token
      await RefreshToken.findOneAndUpdate({ token: refreshToken }, { isRevoked: true });
    }

    // Clear cookies
    clearAuthCookies(res);

    res.json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({
      success: false,
      message: "Logout failed",
      error: error.message,
    });
  }
};

/**
 * Logs out user from all devices by revoking all refresh tokens associated with the user account.
 * Clears authentication cookies for the current session and invalidates all other active sessions.
 *
 * @async
 * @function logoutAll
 * @param {Object} req - Express request object
 * @param {string} req.userId - Authenticated user ID from auth middleware
 * @param {Object} res - Express response object
 * @returns {Promise<void>} JSON response confirming logout from all devices
 */
export const logoutAll = async (req, res) => {
  try {
    const userId = req.userId;

    // Revoke all refresh tokens for this user
    await RefreshToken.revokeAllUserTokens(userId);

    // Clear cookies
    clearAuthCookies(res);

    res.json({
      success: true,
      message: "Logged out from all devices successfully",
    });
  } catch (error) {
    console.error("Logout all error:", error);
    res.status(500).json({
      success: false,
      message: "Logout failed",
      error: error.message,
    });
  }
};
