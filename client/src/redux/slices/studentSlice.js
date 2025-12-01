import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import studentService from '@/services/student/studentService';

// ============================================
// ASYNC THUNKS
// ============================================

// Dashboard
export const fetchDashboard = createAsyncThunk(
  'student/fetchDashboard',
  async (_, { rejectWithValue }) => {
    try {
      const response = await studentService.getDashboard();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch dashboard');
    }
  },
);

// Profile
export const fetchProfile = createAsyncThunk(
  'student/fetchProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await studentService.getProfile();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch profile');
    }
  },
);

// Courses
export const fetchMyCourses = createAsyncThunk(
  'student/fetchMyCourses',
  async (_, { rejectWithValue }) => {
    try {
      const response = await studentService.getMyCourses();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch courses');
    }
  },
);

export const fetchCourseDetails = createAsyncThunk(
  'student/fetchCourseDetails',
  async (slug, { rejectWithValue }) => {
    try {
      const response = await studentService.getCourseDetails(slug);
      return { slug, data: response.data };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch course details');
    }
  },
);

export const fetchCourseModules = createAsyncThunk(
  'student/fetchCourseModules',
  async (slug, { rejectWithValue }) => {
    try {
      const response = await studentService.getCourseModules(slug);
      return { slug, data: response.data };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch modules');
    }
  },
);

// Quizzes
export const fetchQuizzesByCourse = createAsyncThunk(
  'student/fetchQuizzesByCourse',
  async (_, { rejectWithValue }) => {
    try {
      const response = await studentService.getQuizzesByCourse();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch quizzes');
    }
  },
);

export const fetchCourseQuizzes = createAsyncThunk(
  'student/fetchCourseQuizzes',
  async (slug, { rejectWithValue }) => {
    try {
      const response = await studentService.getCourseQuizzes(slug);
      return { slug, data: response.data };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch course quizzes');
    }
  },
);

// Assignments
export const fetchAssignmentsByCourse = createAsyncThunk(
  'student/fetchAssignmentsByCourse',
  async (_, { rejectWithValue }) => {
    try {
      const response = await studentService.getAssignmentsByCourse();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch assignments');
    }
  },
);

export const fetchCourseAssignments = createAsyncThunk(
  'student/fetchCourseAssignments',
  async (slug, { rejectWithValue }) => {
    try {
      const response = await studentService.getCourseAssignments(slug);
      return { slug, data: response.data };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch course assignments');
    }
  },
);

// Certificates
export const fetchCertificates = createAsyncThunk(
  'student/fetchCertificates',
  async (_, { rejectWithValue }) => {
    try {
      const response = await studentService.getCertificates();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch certificates');
    }
  },
);

// Leaderboard
export const fetchLeaderboard = createAsyncThunk(
  'student/fetchLeaderboard',
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await studentService.getLeaderboard(params);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch leaderboard');
    }
  },
);

// Referral
export const fetchReferralInfo = createAsyncThunk(
  'student/fetchReferralInfo',
  async (_, { rejectWithValue }) => {
    try {
      const response = await studentService.getReferralInfo();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch referral info');
    }
  },
);

// Support
export const fetchSupportQueries = createAsyncThunk(
  'student/fetchSupportQueries',
  async (_, { rejectWithValue }) => {
    try {
      const response = await studentService.getSupportQueries();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch support queries');
    }
  },
);

// ============================================
// INITIAL STATE
// ============================================

const initialState = {
  // Dashboard
  dashboard: {
    data: null,
    loading: false,
    error: null,
    lastFetched: null,
  },

  // Profile
  profile: {
    data: null,
    loading: false,
    error: null,
    lastFetched: null,
  },

  // Courses
  courses: {
    list: [],
    loading: false,
    error: null,
    lastFetched: null,
  },

  // Course Details (cached by slug)
  courseDetails: {},

  // Course Modules (cached by slug)
  courseModules: {},

  // Quizzes
  quizzes: {
    byCourse: [],
    loading: false,
    error: null,
    lastFetched: null,
  },

  // Course-specific quizzes (cached by slug)
  courseQuizzes: {},

  // Assignments
  assignments: {
    byCourse: [],
    loading: false,
    error: null,
    lastFetched: null,
  },

  // Course-specific assignments (cached by slug)
  courseAssignments: {},

  // Certificates
  certificates: {
    list: [],
    loading: false,
    error: null,
    lastFetched: null,
  },

  // Leaderboard
  leaderboard: {
    data: [],
    userRank: null,
    userEntry: null,
    pagination: null,
    loading: false,
    error: null,
    lastFetched: null,
  },

  // Referral
  referral: {
    data: null,
    loading: false,
    error: null,
    lastFetched: null,
  },

  // Support
  support: {
    queries: [],
    loading: false,
    error: null,
    lastFetched: null,
  },
};

// ============================================
// SLICE
// ============================================

const studentSlice = createSlice({
  name: 'student',
  initialState,

  reducers: {
    // Clear all student data (on logout)
    clearStudentData: () => initialState,

    // Update profile locally
    updateProfileLocal: (state, action) => {
      if (state.profile.data) {
        state.profile.data = { ...state.profile.data, ...action.payload };
      }
    },

    // Invalidate cache for specific data
    invalidateDashboard: state => {
      state.dashboard.lastFetched = null;
    },
    invalidateProfile: state => {
      state.profile.lastFetched = null;
    },
    invalidateCourses: state => {
      state.courses.lastFetched = null;
    },
    invalidateCertificates: state => {
      state.certificates.lastFetched = null;
    },
  },

  extraReducers: builder => {
    // Dashboard
    builder
      .addCase(fetchDashboard.pending, state => {
        state.dashboard.loading = true;
        state.dashboard.error = null;
      })
      .addCase(fetchDashboard.fulfilled, (state, action) => {
        state.dashboard.loading = false;
        state.dashboard.data = action.payload;
        state.dashboard.lastFetched = Date.now();
      })
      .addCase(fetchDashboard.rejected, (state, action) => {
        state.dashboard.loading = false;
        state.dashboard.error = action.payload;
      });

    // Profile
    builder
      .addCase(fetchProfile.pending, state => {
        state.profile.loading = true;
        state.profile.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.profile.loading = false;
        state.profile.data = action.payload;
        state.profile.lastFetched = Date.now();
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.profile.loading = false;
        state.profile.error = action.payload;
      });

    // Courses
    builder
      .addCase(fetchMyCourses.pending, state => {
        state.courses.loading = true;
        state.courses.error = null;
      })
      .addCase(fetchMyCourses.fulfilled, (state, action) => {
        state.courses.loading = false;
        state.courses.list = action.payload;
        state.courses.lastFetched = Date.now();
      })
      .addCase(fetchMyCourses.rejected, (state, action) => {
        state.courses.loading = false;
        state.courses.error = action.payload;
      });

    // Course Details
    builder
      .addCase(fetchCourseDetails.pending, (state, action) => {
        const slug = action.meta.arg;
        state.courseDetails[slug] = {
          ...state.courseDetails[slug],
          loading: true,
          error: null,
        };
      })
      .addCase(fetchCourseDetails.fulfilled, (state, action) => {
        const { slug, data } = action.payload;
        state.courseDetails[slug] = {
          data,
          loading: false,
          error: null,
          lastFetched: Date.now(),
        };
      })
      .addCase(fetchCourseDetails.rejected, (state, action) => {
        const slug = action.meta.arg;
        state.courseDetails[slug] = {
          ...state.courseDetails[slug],
          loading: false,
          error: action.payload,
        };
      });

    // Course Modules
    builder
      .addCase(fetchCourseModules.pending, (state, action) => {
        const slug = action.meta.arg;
        state.courseModules[slug] = {
          ...state.courseModules[slug],
          loading: true,
          error: null,
        };
      })
      .addCase(fetchCourseModules.fulfilled, (state, action) => {
        const { slug, data } = action.payload;
        state.courseModules[slug] = {
          modules: data.modules,
          courseTitle: data.courseTitle,
          loading: false,
          error: null,
          lastFetched: Date.now(),
        };
      })
      .addCase(fetchCourseModules.rejected, (state, action) => {
        const slug = action.meta.arg;
        state.courseModules[slug] = {
          ...state.courseModules[slug],
          loading: false,
          error: action.payload,
        };
      });

    // Quizzes by Course
    builder
      .addCase(fetchQuizzesByCourse.pending, state => {
        state.quizzes.loading = true;
        state.quizzes.error = null;
      })
      .addCase(fetchQuizzesByCourse.fulfilled, (state, action) => {
        state.quizzes.loading = false;
        state.quizzes.byCourse = action.payload;
        state.quizzes.lastFetched = Date.now();
      })
      .addCase(fetchQuizzesByCourse.rejected, (state, action) => {
        state.quizzes.loading = false;
        state.quizzes.error = action.payload;
      });

    // Course Quizzes
    builder
      .addCase(fetchCourseQuizzes.pending, (state, action) => {
        const slug = action.meta.arg;
        state.courseQuizzes[slug] = {
          ...state.courseQuizzes[slug],
          loading: true,
          error: null,
        };
      })
      .addCase(fetchCourseQuizzes.fulfilled, (state, action) => {
        const { slug, data } = action.payload;
        state.courseQuizzes[slug] = {
          quizzes: data.quizzes,
          courseId: data.courseId,
          courseTitle: data.courseTitle,
          loading: false,
          error: null,
          lastFetched: Date.now(),
        };
      })
      .addCase(fetchCourseQuizzes.rejected, (state, action) => {
        const slug = action.meta.arg;
        state.courseQuizzes[slug] = {
          ...state.courseQuizzes[slug],
          loading: false,
          error: action.payload,
        };
      });

    // Assignments by Course
    builder
      .addCase(fetchAssignmentsByCourse.pending, state => {
        state.assignments.loading = true;
        state.assignments.error = null;
      })
      .addCase(fetchAssignmentsByCourse.fulfilled, (state, action) => {
        state.assignments.loading = false;
        state.assignments.byCourse = action.payload;
        state.assignments.lastFetched = Date.now();
      })
      .addCase(fetchAssignmentsByCourse.rejected, (state, action) => {
        state.assignments.loading = false;
        state.assignments.error = action.payload;
      });

    // Course Assignments
    builder
      .addCase(fetchCourseAssignments.pending, (state, action) => {
        const slug = action.meta.arg;
        state.courseAssignments[slug] = {
          ...state.courseAssignments[slug],
          loading: true,
          error: null,
        };
      })
      .addCase(fetchCourseAssignments.fulfilled, (state, action) => {
        const { slug, data } = action.payload;
        state.courseAssignments[slug] = {
          assignments: data.assignments,
          courseId: data.courseId,
          courseTitle: data.courseTitle,
          loading: false,
          error: null,
          lastFetched: Date.now(),
        };
      })
      .addCase(fetchCourseAssignments.rejected, (state, action) => {
        const slug = action.meta.arg;
        state.courseAssignments[slug] = {
          ...state.courseAssignments[slug],
          loading: false,
          error: action.payload,
        };
      });

    // Certificates
    builder
      .addCase(fetchCertificates.pending, state => {
        state.certificates.loading = true;
        state.certificates.error = null;
      })
      .addCase(fetchCertificates.fulfilled, (state, action) => {
        state.certificates.loading = false;
        state.certificates.list = action.payload;
        state.certificates.lastFetched = Date.now();
      })
      .addCase(fetchCertificates.rejected, (state, action) => {
        state.certificates.loading = false;
        state.certificates.error = action.payload;
      });

    // Leaderboard
    builder
      .addCase(fetchLeaderboard.pending, state => {
        state.leaderboard.loading = true;
        state.leaderboard.error = null;
      })
      .addCase(fetchLeaderboard.fulfilled, (state, action) => {
        state.leaderboard.loading = false;
        state.leaderboard.data = action.payload.leaderboard;
        state.leaderboard.userRank = action.payload.userRank;
        state.leaderboard.userEntry = action.payload.userEntry;
        state.leaderboard.pagination = action.payload.pagination;
        state.leaderboard.lastFetched = Date.now();
      })
      .addCase(fetchLeaderboard.rejected, (state, action) => {
        state.leaderboard.loading = false;
        state.leaderboard.error = action.payload;
      });

    // Referral
    builder
      .addCase(fetchReferralInfo.pending, state => {
        state.referral.loading = true;
        state.referral.error = null;
      })
      .addCase(fetchReferralInfo.fulfilled, (state, action) => {
        state.referral.loading = false;
        state.referral.data = action.payload;
        state.referral.lastFetched = Date.now();
      })
      .addCase(fetchReferralInfo.rejected, (state, action) => {
        state.referral.loading = false;
        state.referral.error = action.payload;
      });

    // Support
    builder
      .addCase(fetchSupportQueries.pending, state => {
        state.support.loading = true;
        state.support.error = null;
      })
      .addCase(fetchSupportQueries.fulfilled, (state, action) => {
        state.support.loading = false;
        state.support.queries = action.payload || [];
        state.support.lastFetched = Date.now();
      })
      .addCase(fetchSupportQueries.rejected, (state, action) => {
        state.support.loading = false;
        state.support.error = action.payload;
      });
  },
});

// Actions
export const {
  clearStudentData,
  updateProfileLocal,
  invalidateDashboard,
  invalidateProfile,
  invalidateCourses,
  invalidateCertificates,
} = studentSlice.actions;

// ============================================
// SELECTORS
// ============================================

// Dashboard
export const selectDashboard = state => state.student.dashboard;
export const selectDashboardData = state => state.student.dashboard.data;
export const selectDashboardLoading = state => state.student.dashboard.loading;

// Profile
export const selectProfile = state => state.student.profile;
export const selectProfileData = state => state.student.profile.data;
export const selectProfileLoading = state => state.student.profile.loading;

// Courses
export const selectCourses = state => state.student.courses;
export const selectCoursesList = state => state.student.courses.list;
export const selectCoursesLoading = state => state.student.courses.loading;

// Course Details
export const selectCourseDetails = slug => state => state.student.courseDetails[slug];

// Course Modules
export const selectCourseModules = slug => state => state.student.courseModules[slug];

// Quizzes
export const selectQuizzes = state => state.student.quizzes;
export const selectQuizzesByCourse = state => state.student.quizzes.byCourse;
export const selectCourseQuizzes = slug => state => state.student.courseQuizzes[slug];

// Assignments
export const selectAssignments = state => state.student.assignments;
export const selectAssignmentsByCourse = state => state.student.assignments.byCourse;
export const selectCourseAssignments = slug => state => state.student.courseAssignments[slug];

// Certificates
export const selectCertificates = state => state.student.certificates;
export const selectCertificatesList = state => state.student.certificates.list;

// Leaderboard
export const selectLeaderboard = state => state.student.leaderboard;

// Referral
export const selectReferral = state => state.student.referral;
export const selectReferralData = state => state.student.referral.data;

// Support
export const selectSupport = state => state.student.support;
export const selectSupportQueries = state => state.student.support.queries;

export default studentSlice.reducer;
