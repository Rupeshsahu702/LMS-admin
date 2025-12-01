import mongoose from "mongoose";

const referralSchema = new mongoose.Schema(
    {
        referrer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Student",
            required: true,
        },

        referee: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Student",
            required: true,
        },

        referralCode: { type: String },

        credited: { type: Boolean, default: false },
    },
    { timestamps: true }
);

export default mongoose.model("Referral", referralSchema);
