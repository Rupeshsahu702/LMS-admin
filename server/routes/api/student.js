import express from "express";
import { isAuthenticated } from "../../middlewares/isAuthenticated.js";

import {
  // Dashboard
  getDashboard,
  
  // Profile
  getProfile,
  updateProfile,
  updateAvatar,
  
  // Settings
  updatePrivacy,
  changePassword,
  
  // Courses
  getMyCourses,
  getCourseDetails,
  getCourseModules,
  
  // Quizzes
  getQuizzesByCourse,
  getCourseQuizzes,
  getQuizQuestions,
  submitQuiz,
  
  // Assignments
  getAssignmentsByCourse,
  getCourseAssignments,
  submitAssignment,
  
  // Lessons
  markLessonComplete,
  
  // Certificates
  getCertificates,
  getCourseCertificate,
  
  // Leaderboard
  getLeaderboard,
  
  // Referral
  getReferralInfo,
  applyReferralCode,
  
  // Support
  createSupportQuery,
  getSupportQueries,
  
  // Streak
  updateStreak,
} from "../../controllers/studentController.js";

const router = express.Router();

// All routes require authentication
router.use(isAuthenticated);

// ============================================
// DASHBOARD
// ============================================
router.get("/dashboard", getDashboard);

// ============================================
// PROFILE
// ============================================
router.get("/profile", getProfile);
router.put("/profile", updateProfile);
router.put("/profile/avatar", updateAvatar);

// ============================================
// SETTINGS
// ============================================
router.put("/settings/privacy", updatePrivacy);
router.put("/settings/password", changePassword);

// ============================================
// COURSES
// ============================================
router.get("/courses", getMyCourses);
router.get("/courses/:slug", getCourseDetails);
router.get("/courses/:slug/modules", getCourseModules);

// ============================================
// QUIZZES
// ============================================
router.get("/quizzes", getQuizzesByCourse);
router.get("/courses/:slug/quizzes", getCourseQuizzes);
router.get("/courses/:slug/quizzes/:quizId", getQuizQuestions);
router.post("/quizzes/submit", submitQuiz);

// ============================================
// ASSIGNMENTS
// ============================================
router.get("/assignments", getAssignmentsByCourse);
router.get("/courses/:slug/assignments", getCourseAssignments);
router.post("/assignments/submit", submitAssignment);

// ============================================
// LESSONS
// ============================================
router.post("/lessons/complete", markLessonComplete);

// ============================================
// CERTIFICATES
// ============================================
router.get("/certificates", getCertificates);
router.get("/certificates/:courseSlug", getCourseCertificate);

// ============================================
// LEADERBOARD
// ============================================
router.get("/leaderboard", getLeaderboard);

// ============================================
// REFERRAL
// ============================================
router.get("/referral", getReferralInfo);
router.post("/referral/apply", applyReferralCode);

// ============================================
// SUPPORT
// ============================================
router.post("/support", createSupportQuery);
router.get("/support", getSupportQueries);

// ============================================
// STREAK
// ============================================
router.post("/streak/update", updateStreak);

export default router;
