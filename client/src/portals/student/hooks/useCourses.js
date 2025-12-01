import { useEffect, useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  fetchMyCourses,
  fetchCourseDetails,
  fetchCourseModules,
  fetchQuizzesByCourse,
  fetchCourseQuizzes,
  fetchAssignmentsByCourse,
  fetchCourseAssignments,
  fetchLeaderboard,
  selectCourses,
  selectCourseDetails,
  selectCourseModules,
  selectQuizzes,
  selectCourseQuizzes,
  selectAssignments,
  selectCourseAssignments,
  selectLeaderboard,
} from '@/redux/slices';
import {
  markModuleAccessed,
  getCourseProgress,
  getQuizQuestions,
  submitQuiz,
  submitAssignment,
} from '@/services/student/studentService';

// Cache duration: 5 minutes
const CACHE_DURATION = 5 * 60 * 1000;

/**
 * Check if cache is still valid
 */
const isCacheValid = lastFetched => {
  if (!lastFetched) return false;
  return Date.now() - lastFetched < CACHE_DURATION;
};

/**
 * Hook for fetching enrolled courses (Redux-powered)
 */
export const useMyCourses = () => {
  const dispatch = useDispatch();
  const { list: courses, loading, error, lastFetched } = useSelector(selectCourses);

  const fetchCourses = useCallback(
    (force = false) => {
      if (force || !isCacheValid(lastFetched)) {
        dispatch(fetchMyCourses());
      }
    },
    [dispatch, lastFetched],
  );

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  return {
    courses,
    loading,
    error,
    refetch: () => fetchCourses(true),
  };
};

/**
 * Hook for fetching course details (Redux-powered with caching)
 */
export const useCourseDetails = slug => {
  const dispatch = useDispatch();
  const courseData = useSelector(selectCourseDetails(slug));

  const { data: course, loading, error, lastFetched } = courseData || {};

  const fetchDetails = useCallback(
    (force = false) => {
      if (slug && (force || !isCacheValid(lastFetched))) {
        dispatch(fetchCourseDetails(slug));
      }
    },
    [dispatch, slug, lastFetched],
  );

  useEffect(() => {
    fetchDetails();
  }, [fetchDetails]);

  return {
    course,
    loading: loading ?? true,
    error,
    refetch: () => fetchDetails(true),
  };
};

/**
 * Hook for fetching course modules (Redux-powered with caching)
 */
export const useCourseModules = slug => {
  const dispatch = useDispatch();
  const moduleData = useSelector(selectCourseModules(slug));

  const { modules, courseTitle, loading, error, lastFetched } = moduleData || {};

  const fetchModules = useCallback(
    (force = false) => {
      if (slug && (force || !isCacheValid(lastFetched))) {
        dispatch(fetchCourseModules(slug));
      }
    },
    [dispatch, slug, lastFetched],
  );

  useEffect(() => {
    fetchModules();
  }, [fetchModules]);

  return {
    modules: modules || [],
    courseTitle: courseTitle || '',
    loading: loading ?? true,
    error,
    refetch: () => fetchModules(true),
  };
};

/**
 * Hook for marking module as accessed (action-based, no Redux state needed)
 */
export const useMarkModuleAccessed = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const markAccessed = async (courseId, moduleId) => {
    try {
      setLoading(true);
      setError(null);
      const response = await markModuleAccessed({ courseId, moduleId });
      return response;
    } catch (err) {
      console.error('Failed to mark module accessed:', err);
      setError(err.response?.data?.message || 'Failed to mark module accessed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { markAccessed, loading, error };
};

/**
 * Hook for fetching course progress
 */
export const useCourseProgress = slug => {
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProgress = useCallback(async () => {
    if (!slug) return;

    try {
      setLoading(true);
      setError(null);
      const response = await getCourseProgress(slug);
      if (response.success) {
        setProgress(response.data);
      }
    } catch (err) {
      console.error('Failed to fetch course progress:', err);
      setError(err.response?.data?.message || 'Failed to load progress');
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    fetchProgress();
  }, [fetchProgress]);

  return { progress, loading, error, refetch: fetchProgress };
};

/**
 * Hook for fetching quiz questions
 */
export const useQuizQuestions = (slug, quizId) => {
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchQuiz = useCallback(async () => {
    if (!slug || !quizId) return;

    try {
      setLoading(true);
      setError(null);
      const response = await getQuizQuestions(slug, quizId);
      if (response.success) {
        setQuiz(response.data);
      }
    } catch (err) {
      console.error('Failed to fetch quiz:', err);
      setError(err.response?.data?.message || 'Failed to load quiz');
    } finally {
      setLoading(false);
    }
  }, [slug, quizId]);

  useEffect(() => {
    fetchQuiz();
  }, [fetchQuiz]);

  return { quiz, loading, error, refetch: fetchQuiz };
};

/**
 * Hook for submitting quiz
 */
export const useSubmitQuiz = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  const submit = async quizData => {
    try {
      setLoading(true);
      setError(null);
      const response = await submitQuiz(quizData);
      if (response.success) {
        setResult(response.data);
      }
      return response;
    } catch (err) {
      console.error('Failed to submit quiz:', err);
      setError(err.response?.data?.message || 'Failed to submit quiz');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { submit, loading, error, result };
};

/**
 * Hook for fetching course quizzes (Redux-powered)
 */
export const useCourseQuizzes = slug => {
  const dispatch = useDispatch();
  const quizData = useSelector(selectCourseQuizzes(slug));

  const { quizzes, courseId, courseTitle, loading, error, lastFetched } = quizData || {};

  const fetchQuizzes = useCallback(
    (force = false) => {
      if (slug && (force || !isCacheValid(lastFetched))) {
        dispatch(fetchCourseQuizzes(slug));
      }
    },
    [dispatch, slug, lastFetched],
  );

  useEffect(() => {
    fetchQuizzes();
  }, [fetchQuizzes]);

  return {
    quizzes: quizzes || [],
    courseId,
    courseTitle: courseTitle || '',
    loading: loading ?? true,
    error,
    refetch: () => fetchQuizzes(true),
  };
};

/**
 * Hook for fetching course assignments (Redux-powered)
 */
export const useCourseAssignments = slug => {
  const dispatch = useDispatch();
  const assignmentData = useSelector(selectCourseAssignments(slug));

  const { assignments, courseId, courseTitle, loading, error, lastFetched } = assignmentData || {};

  const fetchAssignments = useCallback(
    (force = false) => {
      if (slug && (force || !isCacheValid(lastFetched))) {
        dispatch(fetchCourseAssignments(slug));
      }
    },
    [dispatch, slug, lastFetched],
  );

  useEffect(() => {
    fetchAssignments();
  }, [fetchAssignments]);

  return {
    assignments: assignments || [],
    courseId,
    courseTitle: courseTitle || '',
    loading: loading ?? true,
    error,
    refetch: () => fetchAssignments(true),
  };
};

/**
 * Hook for submitting assignment
 */
export const useSubmitAssignment = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const submit = async assignmentData => {
    try {
      setLoading(true);
      setError(null);
      const response = await submitAssignment(assignmentData);
      return response;
    } catch (err) {
      console.error('Failed to submit assignment:', err);
      setError(err.response?.data?.message || 'Failed to submit assignment');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { submit, loading, error };
};

/**
 * Hook for fetching all courses with quiz progress (Redux-powered)
 */
export const useQuizzesByCourse = () => {
  const dispatch = useDispatch();
  const { byCourse: courses, loading, error, lastFetched } = useSelector(selectQuizzes);

  const fetchCourses = useCallback(
    (force = false) => {
      if (force || !isCacheValid(lastFetched)) {
        dispatch(fetchQuizzesByCourse());
      }
    },
    [dispatch, lastFetched],
  );

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  return {
    courses,
    loading,
    error,
    refetch: () => fetchCourses(true),
  };
};

/**
 * Hook for fetching all courses with assignment progress (Redux-powered)
 */
export const useAssignmentsByCourse = () => {
  const dispatch = useDispatch();
  const { byCourse: courses, loading, error, lastFetched } = useSelector(selectAssignments);

  const fetchCourses = useCallback(
    (force = false) => {
      if (force || !isCacheValid(lastFetched)) {
        dispatch(fetchAssignmentsByCourse());
      }
    },
    [dispatch, lastFetched],
  );

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  return {
    courses,
    loading,
    error,
    refetch: () => fetchCourses(true),
  };
};

/**
 * Hook for fetching leaderboard data (Redux-powered)
 */
export const useLeaderboard = (type = 'global', courseId = null) => {
  const dispatch = useDispatch();
  const {
    data: leaderboard,
    userRank,
    userEntry,
    pagination,
    loading,
    error,
  } = useSelector(selectLeaderboard);

  const fetchLeaderboardData = useCallback(
    (page = 1) => {
      const params = { type, limit: 50, page };
      if (type === 'course' && courseId) {
        params.courseId = courseId;
      }
      dispatch(fetchLeaderboard(params));
    },
    [dispatch, type, courseId],
  );

  useEffect(() => {
    fetchLeaderboardData();
  }, [fetchLeaderboardData]);

  return {
    leaderboard,
    userRank,
    userEntry,
    pagination,
    loading,
    error,
    refetch: fetchLeaderboardData,
  };
};
