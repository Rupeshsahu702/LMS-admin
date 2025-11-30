import crypto from "crypto";
import { User, RefreshToken } from "../../models/index.js";

/**
 * Initiates password reset process by generating a secure reset token.
 * Returns generic success message regardless of whether email exists to prevent email enumeration attacks.
 *
 * @async
 * @function forgotPassword
 * @param {Object} req - Express request object
 * @param {Object} req.validatedData - Validated request data from middleware
 * @param {string} req.validatedData.email - User's email address
 * @param {Object} res - Express response object
 * @returns {Promise<void>} JSON response with generic success message
 */
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.validatedData;

    const user = await User.findOne({ email: email.toLowerCase() });

    // Always return success to prevent email enumeration
    if (!user) {
      return res.json({
        success: true,
        message: "If an account exists with this email, you will receive a password reset link",
      });
    }

    // Generate reset token
    const resetToken = user.createResetPasswordToken();
    await user.save();

    // TODO: Send email with reset link
    // const resetUrl = `${process.env.CLIENT_URL}/reset-password?token=${resetToken}`;
    // await sendEmail({ to: user.email, subject: 'Password Reset', ... });

    res.json({
      success: true,
      message: "If an account exists with this email, you will receive a password reset link",
      // DEV ONLY: Remove in production
      devToken: process.env.NODE_ENV === "development" ? resetToken : undefined,
    });
  } catch (error) {
    console.error("Forgot password error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to process request",
    });
  }
};

/**
 * Resets user password using a valid reset token from forgot password flow.
 * Validates token, updates password, and revokes all existing refresh tokens for security.
 *
 * @async
 * @function resetPassword
 * @param {Object} req - Express request object
 * @param {Object} req.validatedData - Validated request data from middleware
 * @param {string} req.validatedData.token - Password reset token from email link
 * @param {string} req.validatedData.password - New password (will be hashed before saving)
 * @param {Object} res - Express response object
 * @returns {Promise<void>} JSON response confirming password reset
 */
export const resetPassword = async (req, res) => {
  try {
    const { token, password } = req.validatedData;

    // Hash token to query database
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    // Find user and select reset fields
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
    }).select("+resetPasswordToken +resetPasswordExpire");

    if (!user || !user.matchResetPasswordToken(token)) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired reset token",
      });
    }

    // Update password
    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    // Revoke all existing refresh tokens
    await RefreshToken.revokeAllUserTokens(user._id);

    res.json({
      success: true,
      message: "Password reset successful. Please login with your new password.",
    });
  } catch (error) {
    console.error("Reset password error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to reset password",
    });
  }
};
