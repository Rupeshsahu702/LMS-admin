import { submitQuizSchema } from "../../validation/student.zod.js";
import { updateLeaderboard } from "./leaderboard.controller.js";
import { Student, Course, Enrollment, Submission } from "../../models/index.js";

/**
 * Helper function to calculate progress percentage
 */
const calculateProgress = (course, completedQuizzes, completedTasks) => {
    let totalItems = 0;
    let completedItems = 0;

    course.modules.forEach((module) => {
        totalItems += module.quizzes.length + module.tasks.length;
        completedItems += module.quizzes.filter((q) =>
            completedQuizzes.includes(q._id.toString())
        ).length;
        completedItems += module.tasks.filter((t) =>
            completedTasks.includes(t._id.toString())
        ).length;
    });

    if (totalItems === 0) return 0;
    return Math.round((completedItems / totalItems) * 100);
};

/**
 * GET /api/student/quizzes
 * Get all courses with quiz progress
 */
export const getQuizzesByCourse = async (req, res) => {
    try {
        const enrollments = await Enrollment.find({
            student: req.userId,
            paymentStatus: "paid",
        }).populate("course", "title slug thumbnail modules");

        const coursesWithQuizzes = enrollments.map((enrollment) => {
            const course = enrollment.course;
            let totalQuizzes = 0;
            let completedQuizzes = 0;

            const completedQuizIds = enrollment.completedQuizzes.map((id) =>
                id.toString()
            );

            course.modules.forEach((module) => {
                totalQuizzes += module.quizzes.length;
                completedQuizzes += module.quizzes.filter((q) =>
                    completedQuizIds.includes(q._id.toString())
                ).length;
            });

            return {
                id: course._id,
                title: course.title,
                slug: course.slug,
                thumbnail: course.thumbnail,
                totalQuizzes,
                completedQuizzes,
                progress:
                    totalQuizzes > 0
                        ? Math.round((completedQuizzes / totalQuizzes) * 100)
                        : 0,
            };
        });

        res.json({ success: true, data: coursesWithQuizzes });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

/**
 * GET /api/student/courses/:slug/quizzes
 * Get quizzes for a specific course
 */
export const getCourseQuizzes = async (req, res) => {
    try {
        const { slug } = req.params;

        const course = await Course.findOne({ slug }).select("title modules");
        if (!course) {
            return res
                .status(404)
                .json({ success: false, message: "Course not found" });
        }

        const enrollment = await Enrollment.findOne({
            student: req.userId,
            course: course._id,
            paymentStatus: "paid",
        });

        if (!enrollment) {
            return res.status(403).json({
                success: false,
                message: "You are not enrolled in this course",
            });
        }

        // Get quiz submissions
        const submissions = await Submission.find({
            student: req.userId,
            course: course._id,
            type: "quiz",
        });

        const completedQuizIds = enrollment.completedQuizzes.map((id) =>
            id.toString()
        );

        const quizzes = [];
        course.modules.forEach((module) => {
            module.quizzes.forEach((quiz) => {
                const submission = submissions.find(
                    (s) => s.lessonId.toString() === quiz._id.toString()
                );

                quizzes.push({
                    id: quiz._id,
                    moduleId: module._id,
                    moduleTitle: module.title,
                    title: quiz.title,
                    questionsCount: quiz.questions.length,
                    isCompleted: completedQuizIds.includes(quiz._id.toString()),
                    score: submission
                        ? `${submission.quizScore}/${submission.totalQuestions}`
                        : null,
                });
            });
        });

        res.json({
            success: true,
            data: {
                courseTitle: course.title,
                quizzes,
            },
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

/**
 * GET /api/student/courses/:slug/quizzes/:quizId
 * Get quiz questions
 */
export const getQuizQuestions = async (req, res) => {
    try {
        const { slug, quizId } = req.params;

        const course = await Course.findOne({ slug });
        if (!course) {
            return res
                .status(404)
                .json({ success: false, message: "Course not found" });
        }

        // Check enrollment
        const enrollment = await Enrollment.findOne({
            student: req.userId,
            course: course._id,
            paymentStatus: "paid",
        });

        if (!enrollment) {
            return res.status(403).json({
                success: false,
                message: "You are not enrolled in this course",
            });
        }

        // Find the quiz
        let quiz = null;
        let moduleTitle = "";
        for (const module of course.modules) {
            const foundQuiz = module.quizzes.find(
                (q) => q._id.toString() === quizId
            );
            if (foundQuiz) {
                quiz = foundQuiz;
                moduleTitle = module.title;
                break;
            }
        }

        if (!quiz) {
            return res
                .status(404)
                .json({ success: false, message: "Quiz not found" });
        }

        // Return questions without correct answers
        const questions = quiz.questions.map((q) => ({
            id: q._id,
            question: q.questionText,
            options: q.options,
        }));

        res.json({
            success: true,
            data: {
                title: quiz.title,
                moduleTitle,
                questions,
                totalQuestions: questions.length,
            },
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

/**
 * POST /api/student/quizzes/submit
 * Submit quiz answers
 */
export const submitQuiz = async (req, res) => {
    try {
        const validation = submitQuizSchema.safeParse(req.body);
        if (!validation.success) {
            return res.status(400).json({
                success: false,
                errors: validation.error.errors,
            });
        }

        const { courseId, moduleId, quizId, answers } = validation.data;

        const course = await Course.findById(courseId);
        if (!course) {
            return res
                .status(404)
                .json({ success: false, message: "Course not found" });
        }

        const enrollment = await Enrollment.findOne({
            student: req.userId,
            course: courseId,
            paymentStatus: "paid",
        });

        if (!enrollment) {
            return res.status(403).json({
                success: false,
                message: "You are not enrolled in this course",
            });
        }

        // Find quiz and calculate score
        let quiz = null;
        for (const module of course.modules) {
            const foundQuiz = module.quizzes.find(
                (q) => q._id.toString() === quizId
            );
            if (foundQuiz) {
                quiz = foundQuiz;
                break;
            }
        }

        if (!quiz) {
            return res
                .status(404)
                .json({ success: false, message: "Quiz not found" });
        }

        // Calculate score
        let score = 0;
        const results = [];
        quiz.questions.forEach((question) => {
            const userAnswer = answers[question._id.toString()];
            const isCorrect = userAnswer === question.correctAnswer;
            if (isCorrect) score++;
            results.push({
                questionId: question._id,
                userAnswer,
                correctAnswer: question.correctAnswer,
                isCorrect,
                explanation: question.explanation,
            });
        });

        // Create or update submission
        const submission = await Submission.findOneAndUpdate(
            {
                student: req.userId,
                course: courseId,
                lessonId: quizId,
                type: "quiz",
            },
            {
                enrollment: enrollment._id,
                student: req.userId,
                course: courseId,
                lessonId: quizId,
                type: "quiz",
                quizScore: score,
                totalQuestions: quiz.questions.length,
                status: "graded",
            },
            { upsert: true, new: true }
        );

        // Mark quiz as completed if not already
        if (!enrollment.completedQuizzes.includes(quizId)) {
            enrollment.completedQuizzes.push(quizId);

            // Recalculate progress
            const completedQuizzes = enrollment.completedQuizzes.map((id) =>
                id.toString()
            );
            const completedTasks = enrollment.completedTasks.map((id) =>
                id.toString()
            );
            enrollment.progressPercentage = calculateProgress(
                course,
                completedQuizzes,
                completedTasks
            );

            // Check if course is completed
            if (enrollment.progressPercentage === 100) {
                enrollment.isCompleted = true;
                enrollment.completionDate = new Date();
            }

            await enrollment.save();
        }

        // Update user stats
        await Student.findByIdAndUpdate(req.userId, {
            $inc: { xp: score * 10, quizzesCompleted: 1 },
        });

        // Update leaderboard
        await updateLeaderboard(req.userId, courseId, score * 10);

        res.json({
            success: true,
            data: {
                score,
                totalQuestions: quiz.questions.length,
                percentage: Math.round((score / quiz.questions.length) * 100),
                results,
            },
            message: `Quiz submitted! You scored ${score}/${quiz.questions.length}`,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
