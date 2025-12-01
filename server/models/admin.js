// models/admin.model.js
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import aggregatePaginate from "mongoose-aggregate-paginate-v2";

const adminSchema = new mongoose.Schema(
    {
        // BASIC AUTH
        email: { type: String, unique: true, lowercase: true, trim: true },
        password: { type: String, select: false },

        // PROFILE
        name: { type: String, required: true, trim: true },
        middleName: { type: String },
        lastName: { type: String },
        phoneNumber: { type: String },
        alternatePhone: { type: String },
        avatar: { type: String },

        // SECURITY
        resetPasswordToken: { type: String, select: false },
        resetPasswordExpire: { type: Date },

        lastLogin: { type: Date },
    },
    { timestamps: true }
);

adminSchema.plugin(aggregatePaginate);

// Password hashing middleware
adminSchema.pre("save", async function (next) {
    if (this.isModified("password") && this.password) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});

adminSchema.methods.matchPassword = function (enteredPassword) {
    return bcrypt.compare(enteredPassword, this.password);
};

adminSchema.methods.matchResetPasswordToken = function (plainToken) {
    const hashedToken = crypto
        .createHash("sha256")
        .update(plainToken)
        .digest("hex");

    return (
        this.resetPasswordToken === hashedToken &&
        this.resetPasswordExpire > Date.now()
    );
};

adminSchema.methods.createResetPasswordToken = function () {
    const rawToken = crypto.randomBytes(20).toString("hex");
    this.resetPasswordToken = crypto
        .createHash("sha256")
        .update(rawToken)
        .digest("hex");
    this.resetPasswordExpire = Date.now() + 3600000;
    return rawToken;
};

adminSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            id: this._id,
            email: this.email,
            role: "admin",
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
        }
    );
};

adminSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            id: this._id,
            role: "admin",
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
        }
    );
};

export default mongoose.model("Admin", adminSchema);
