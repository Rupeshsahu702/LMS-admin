import api from '../api';

// ============================================
// DASHBOARD
// ============================================

export const getDashboard = async () => {
  const response = await api.get('/admin/dashboard');
  return response.data;
};

export const getDashboardStats = async () => {
  const response = await api.get('/admin/dashboard/stats');
  return response.data;
};

// ============================================
// COURSES
// ============================================

export const getAllCourses = async (params = {}) => {
  const response = await api.get('/admin/course', { params });
  return response.data;
};

export const getCourseById = async courseId => {
  const response = await api.get(`/admin/course/${courseId}`);
  return response.data;
};

export const createCourse = async courseData => {
  const response = await api.post('/admin/course', courseData);
  return response.data;
};

export const updateCourse = async (courseId, courseData) => {
  const response = await api.put(`/admin/course/${courseId}`, courseData);
  return response.data;
};

export const deleteCourse = async courseId => {
  const response = await api.delete(`/admin/course/${courseId}`);
  return response.data;
};

// ============================================
// ONGOING STUDENTS
// ============================================

export const getOngoingStudents = async (params = {}) => {
  const response = await api.get('/admin/ongoing/students', { params });
  return response.data;
};

export const getOngoingStudentById = async studentId => {
  const response = await api.get(`/admin/ongoing/students/${studentId}`);
  return response.data;
};

export const approveOngoingStudent = async studentId => {
  const response = await api.post(`/admin/ongoing/students/${studentId}/approve`);
  return response.data;
};

export const rejectOngoingStudent = async (studentId, reason) => {
  const response = await api.post(`/admin/ongoing/students/${studentId}/reject`, {
    reason,
  });
  return response.data;
};

// ============================================
// ACTIVE STUDENTS
// ============================================

export const getActiveStudents = async (params = {}) => {
  const response = await api.get('/admin/active/students', { params });
  return response.data;
};

export const getActiveStudentById = async studentId => {
  const response = await api.get(`/admin/active/students/${studentId}`);
  return response.data;
};

export const updateStudentStatus = async (studentId, status) => {
  const response = await api.put(`/admin/active/students/${studentId}/status`, {
    status,
  });
  return response.data;
};

export const blockStudent = async (studentId, reason) => {
  const response = await api.post(`/admin/active/students/${studentId}/block`, {
    reason,
  });
  return response.data;
};

export const unblockStudent = async studentId => {
  const response = await api.post(`/admin/active/students/${studentId}/unblock`);
  return response.data;
};

// ============================================
// ANALYTICS
// ============================================

export const getAnalytics = async (params = {}) => {
  const response = await api.get('/admin/analytics', { params });
  return response.data;
};

export const getEnrollmentAnalytics = async (params = {}) => {
  const response = await api.get('/admin/analytics/enrollments', { params });
  return response.data;
};

export const getRevenueAnalytics = async (params = {}) => {
  const response = await api.get('/admin/analytics/revenue', { params });
  return response.data;
};

export const getCourseAnalytics = async courseId => {
  const response = await api.get(`/admin/analytics/courses/${courseId}`);
  return response.data;
};

// Export all admin service functions as a single object
const adminService = {
  getDashboard,
  getDashboardStats,
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
  getOngoingStudents,
  getOngoingStudentById,
  approveOngoingStudent,
  rejectOngoingStudent,
  getActiveStudents,
  getActiveStudentById,
  updateStudentStatus,
  blockStudent,
  unblockStudent,
  getAnalytics,
  getEnrollmentAnalytics,
  getRevenueAnalytics,
  getCourseAnalytics,
};

export default adminService;
