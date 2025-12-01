import { Student, RefreshToken } from "../../models/index.js";

export const createEnrollment = async (req, res) => {
    try {
        // Data is already validated by middleware
        const {
            email,
            password,
            name,
            middleName,
            lastName,
            phoneNumber,
            alternatePhone,
            collegeName,
            courseName,
            yearOfStudy,
            referredBy,
        } = req.validatedData;

        // Check if student already exists
        const existingStudent = await Student.findOne({ email });
        if (existingStudent) {
            return res.status(409).json({
                success: false,
                message: "An account with this email already exists",
            });
        }

        // Validate referral code if provided
        let referrerExists = false;
        if (referredBy && referredBy.trim() !== "") {
            const referrer = await Student.findOne({
                myReferralCode: referredBy,
            });
            if (!referrer) {
                return res.status(400).json({
                    success: false,
                    message:
                        "Invalid referral code. Please check and try again.",
                });
            }
            referrerExists = true;
        }

        // Create new student enrollment
        const student = await Student.create({
            email,
            lmsPassword: password, // Will be hashed by pre-save hook
            name,
            middleName: middleName || undefined,
            lastName,
            phoneNumber,
            alternatePhone: alternatePhone || undefined,
            collegeName,
            courseName,
            yearOfStudy,
            referredBy: referredBy || undefined,
            accountStatus: "pending",
        });

        // Update referrer's referral count
        if (referrerExists && referredBy) {
            await Student.findOneAndUpdate(
                { myReferralCode: referredBy },
                {
                    $inc: { referralCount: 1 },
                    // Unlock premium after 5 referrals (optional logic)
                    $set: {
                        isPremiumUnlocked: { $gte: ["$referralCount", 5] },
                    },
                }
            );
        }

        // Get student data without sensitive fields
        const enrolledStudent = await Student.findById(student._id).select(
            "-lmsPassword -resetPasswordToken"
        );

        res.status(201).json({
            success: true,
            message: "Enrollment successful! Please proceed to payment.",
            data: {
                userId: enrolledStudent._id,
                name: `${enrolledStudent.name} ${enrolledStudent.lastName}`,
                email: enrolledStudent.email,
                myReferralCode: enrolledStudent.myReferralCode,
                accountStatus: enrolledStudent.accountStatus,
                collegeName: enrolledStudent.collegeName,
                courseName: enrolledStudent.courseName,
            },
        });
    } catch (error) {
        console.error("Enrollment error:", error);

        // Handle duplicate key errors
        if (error.code === 11000) {
            return res.status(409).json({
                success: false,
                message: "This email is already registered",
            });
        }

        res.status(500).json({
            success: false,
            message: "Enrollment failed. Please try again later.",
        });
    }
};

// ============================================
// GET CURRENT USER PROFILE
// ============================================
export const getCurrentUser = async (req, res) => {
    try {
        const student = await Student.findById(req.userId).select(
            "-lmsPassword -resetPasswordToken -resetPasswordExpire -googleId -githubId"
        );

        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student not found",
            });
        }

        res.json({
            success: true,
            data: { user: student },
        });
    } catch (error) {
        console.error("Get current user error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to get user",
            error: error.message,
        });
    }
};

// ============================================
// GET ACTIVE SESSIONS
// ============================================
export const getActiveSessions = async (req, res) => {
    try {
        const sessions = await RefreshToken.find({
            user: req.userId,
            isRevoked: false,
            isUsed: false,
            expiresAt: { $gt: new Date() },
        })
            .select("userAgent ipAddress createdAt family")
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            data: { sessions },
        });
    } catch (error) {
        console.error("Get sessions error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to get sessions",
        });
    }
};
