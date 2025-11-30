import mongoose from "mongoose";
import slugify from "slugify";
import aggregatePaginate from "mongoose-aggregate-paginate-v2";

// Quiz questions
const questionSchema = new mongoose.Schema(
    {
        questionText: { type: String, required: true },
        options: [{ type: String, required: true }],
        correctAnswer: { type: Number, required: true },
    },
    { _id: true }
);

// Quiz schema for modules
const quizSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        questions: [questionSchema],
    },
    { _id: true }
);

// Tasks/Assignments
const taskSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        description: { type: String },
    },
    { _id: true }
);

// Modules
const moduleSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        maxTimelineInDays: { type: Number, required: true },
        description: { type: String },
        textLinks: [{ type: String }],
        videoLinks: [{ type: String }],

        quizzes: [quizSchema],
        tasks: [taskSchema],

        order: { type: Number, default: 0 },
    },
    { _id: true }
);

// Capstone projects
const capstoneSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        description: { type: String },
    },
    { _id: true }
);

const courseSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, unique: true },
        slug: { type: String, lowercase: true, index: true },
        description: { type: String, required: true },
        thumbnail: { type: String },
        stream: { type: String, required: true, index: true },
        level: {
            type: String,
            enum: ["Beginner", "Intermediate", "Advanced"],
            default: "Beginner",
        },
        price: { type: Number, default: 500 },
        totalDuration: { type: String },
        isPublished: { type: Boolean, default: false, index: true },
        tags: [{ type: String }],
        modules: [moduleSchema],
        capstoneProjects: [capstoneSchema],
    },
    { timestamps: true }
);

courseSchema.plugin(aggregatePaginate);

// Auto slug if missing
courseSchema.pre("validate", function (next) {
    if (this.title && !this.slug) {
        this.slug = slugify(this.title, { lower: true });
    }
    next();
});

export default mongoose.model("Course", courseSchema);
