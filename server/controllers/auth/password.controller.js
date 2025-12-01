import crypto from "crypto";
import { Admin, RefreshToken } from "../../models/index.js";

/**
 * Initiates password reset process for admin by generating a secure reset token.
 */
export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.validatedData;

        const admin = await Admin.findOne({ email: email.toLowerCase() });

        // Always return success to prevent email enumeration
        if (!admin) {
            return res.json({
                success: true,
                message:
                    "If an account exists with this email, you will receive a password reset link",
            });
        }

        // Generate reset token
        const resetToken = admin.createResetPasswordToken();
        await admin.save();

        // TODO: Send email with reset link
        // const resetUrl = `${process.env.CLIENT_URL}/reset-password?token=${resetToken}`;
        // await sendEmail({ to: admin.email, subject: 'Password Reset', ... });

        res.json({
            success: true,
            message:
                "If an account exists with this email, you will receive a password reset link",
            // DEV ONLY: Remove in production
            devToken:
                process.env.NODE_ENV === "development" ? resetToken : undefined,
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
 * Resets admin password using a valid reset token from forgot password flow.
 */
export const resetPassword = async (req, res) => {
    try {
        const { token, password } = req.validatedData;

        // Hash token to query database
        const hashedToken = crypto
            .createHash("sha256")
            .update(token)
            .digest("hex");

        // Find admin and select reset fields
        const admin = await Admin.findOne({
            resetPasswordToken: hashedToken,
        }).select("+resetPasswordToken +resetPasswordExpire");

        if (!admin || !admin.matchResetPasswordToken(token)) {
            return res.status(400).json({
                success: false,
                message: "Invalid or expired reset token",
            });
        }

        // Update password
        admin.password = password;
        admin.resetPasswordToken = undefined;
        admin.resetPasswordExpire = undefined;
        await admin.save();

        // Revoke all existing refresh tokens
        await RefreshToken.revokeAllUserTokens(admin._id);

        res.json({
            success: true,
            message:
                "Password reset successful. Please login with your new password.",
        });
    } catch (error) {
        console.error("Reset password error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to reset password",
        });
    }
};
