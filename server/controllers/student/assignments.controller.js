import { Student, Course, Enrollment, Submission } from "../../models/index.js";
import { submitAssignmentSchema } from "../../validation/student.zod.js";
import { updateLeaderboard } from "./leaderboard.controller.js";

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
 * GET /api/student/assignments
 * Get all courses with assignment progress
 */
export const getAssignmentsByCourse = async (req, res) => {
    try {
        const enrollments = await Enrollment.find({
            student: req.userId,
            paymentStatus: "paid",
        }).populate("course", "title slug thumbnail modules");

        const coursesWithAssignments = enrollments.map((enrollment) => {
            const course = enrollment.course;
            let totalAssignments = 0;
            let completedAssignments = 0;

            const completedTaskIds = enrollment.completedTasks.map((id) =>
                id.toString()
            );

            course.modules.forEach((module) => {
                totalAssignments += module.tasks.length;
                completedAssignments += module.tasks.filter((t) =>
                    completedTaskIds.includes(t._id.toString())
                ).length;
            });

            return {
                id: course._id,
                title: course.title,
                slug: course.slug,
                thumbnail: course.thumbnail,
                totalAssignments,
                completedAssignments,
                progress:
                    totalAssignments > 0
                        ? Math.round(
                              (completedAssignments / totalAssignments) * 100
                          )
                        : 0,
            };
        });

        res.json({ success: true, data: coursesWithAssignments });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

/**
 * GET /api/student/courses/:slug/assignments
 * Get assignments for a specific course
 */
export const getCourseAssignments = async (req, res) => {
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

        // Get assignment submissions
        const submissions = await Submission.find({
            student: req.userId,
            course: course._id,
            type: "assignment",
        });

        const completedTaskIds = enrollment.completedTasks.map((id) =>
            id.toString()
        );

        const assignments = [];
        course.modules.forEach((module) => {
            module.tasks.forEach((task) => {
                const submission = submissions.find(
                    (s) => s.lessonId.toString() === task._id.toString()
                );

                assignments.push({
                    id: task._id,
                    moduleId: module._id,
                    moduleTitle: module.title,
                    title: task.title,
                    description: task.description,
                    isSubmitted: !!submission,
                    isCompleted: completedTaskIds.includes(task._id.toString()),
                    status: submission?.status || "pending",
                    grade: submission?.grade,
                    feedback: submission?.feedback,
                    githubLink: submission?.githubLink,
                });
            });
        });

        res.json({
            success: true,
            data: {
                courseId: course._id,
                courseTitle: course.title,
                assignments,
            },
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

/**
 * POST /api/student/assignments/submit
 * Submit assignment
 */
export const submitAssignment = async (req, res) => {
    try {
        const validation = submitAssignmentSchema.safeParse(req.body);
        if (!validation.success) {
            return res.status(400).json({
                success: false,
                errors: validation.error.errors,
            });
        }

        const { courseId, moduleId, taskId, githubLink, additionalNotes } =
            validation.data;

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

        // Create or update submission
        const submission = await Submission.findOneAndUpdate(
            {
                student: req.userId,
                course: courseId,
                lessonId: taskId,
                type: "assignment",
            },
            {
                enrollment: enrollment._id,
                student: req.userId,
                course: courseId,
                lessonId: taskId,
                type: "assignment",
                githubLink,
                status: "submitted",
            },
            { upsert: true, new: true }
        );

        // Mark task as completed if not already and award XP
        const isFirstSubmission = !enrollment.completedTasks.includes(taskId);
        if (isFirstSubmission) {
            enrollment.completedTasks.push(taskId);

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

            // Update user stats - only on first submission
            await Student.findByIdAndUpdate(req.userId, {
                $inc: { xp: 50, assignmentsCompleted: 1 },
            });

            // Update leaderboard with XP and assignment completion - only on first submission
            await updateLeaderboard(req.userId, courseId, 50, {
                assignmentsCompleted: 1,
            });
        }

        res.json({
            success: true,
            data: submission,
            message: isFirstSubmission
                ? "Assignment submitted successfully! You earned 50 XP!"
                : "Assignment updated successfully",
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
