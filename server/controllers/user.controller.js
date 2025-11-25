import User from "../models/User.js";

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

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "An account with this email already exists",
            });
        }

        // Validate referral code if provided
        let referrerExists = false;
        if (referredBy && referredBy.trim() !== "") {
            const referrer = await User.findOne({ myReferralCode: referredBy });
            if (!referrer) {
                return res.status(400).json({
                    success: false,
                    message:
                        "Invalid referral code. Please check and try again.",
                });
            }
            referrerExists = true;
        }

        // Create new user enrollment
        const user = await User.create({
            email,
            password,
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
            role: "student",
        });

        // Update referrer's referral count
        if (referrerExists && referredBy) {
            await User.findOneAndUpdate(
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

        // Get user data without sensitive fields
        const enrolledUser = await User.findById(user._id).select(
            "-password -resetPasswordToken"
        );

        res.status(201).json({
            success: true,
            message: "Enrollment successful! Please proceed to payment.",
            data: {
                userId: enrolledUser._id,
                name: `${enrolledUser.name} ${enrolledUser.lastName}`,
                email: enrolledUser.email,
                myReferralCode: enrolledUser.myReferralCode,
                accountStatus: enrolledUser.accountStatus,
                collegeName: enrolledUser.collegeName,
                courseName: enrolledUser.courseName,
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

export const getEnrollmentDetails = async (req, res) => {
    try {
        const { userId } = req.params;

        const user = await User.findById(userId).select(
            "-password -resetPasswordToken -googleId -githubId -lmsPassword"
        );

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Enrollment not found",
            });
        }

        res.status(200).json({
            success: true,
            data: {
                fullName: `${user.name} ${user.middleName || ""} ${
                    user.lastName
                }`.trim(),
                email: user.email,
                phoneNumber: user.phoneNumber,
                alternatePhone: user.alternatePhone,
                collegeName: user.collegeName,
                courseName: user.courseName,
                yearOfStudy: user.yearOfStudy,
                accountStatus: user.accountStatus,
                myReferralCode: user.myReferralCode,
                referralCount: user.referralCount,
                createdAt: user.createdAt,
            },
        });
    } catch (error) {
        console.error("Get enrollment error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch enrollment details",
        });
    }
};
