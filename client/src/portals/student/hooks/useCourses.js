import { useState, useEffect, useCallback } from 'react';

import {
  getMyCourses,
  getCourseDetails,
  getCourseModules,
  markModuleAccessed,
  getCourseProgress,
  getQuizQuestions,
  submitQuiz,
  getQuizzesByCourse,
  getCourseQuizzes,
  getAssignmentsByCourse,
  getCourseAssignments,
  submitAssignment,
} from '@/services/student/studentService';

/**
 * Hook for fetching enrolled courses
 */
export const useMyCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCourses = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getMyCourses();
      if (response.success) {
        setCourses(response.data);
      }
    } catch (err) {
      console.error('Failed to fetch courses:', err);
      setError(err.response?.data?.message || 'Failed to load courses');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  return { courses, loading, error, refetch: fetchCourses };
};

/**
 * Hook for fetching course details for learning
 */
export const useCourseDetails = slug => {
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCourseDetails = useCallback(async () => {
    if (!slug) return;

    try {
      setLoading(true);
      setError(null);
      const response = await getCourseDetails(slug);
      if (response.success) {
        setCourse(response.data);
      }
    } catch (err) {
      console.error('Failed to fetch course details:', err);
      setError(err.response?.data?.message || 'Failed to load course');
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    fetchCourseDetails();
  }, [fetchCourseDetails]);

  return { course, loading, error, refetch: fetchCourseDetails };
};

/**
 * Hook for fetching course modules
 */
export const useCourseModules = slug => {
  const [modules, setModules] = useState([]);
  const [courseTitle, setCourseTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchModules = useCallback(async () => {
    if (!slug) return;

    try {
      setLoading(true);
      setError(null);
      const response = await getCourseModules(slug);
      if (response.success) {
        setModules(response.data.modules);
        setCourseTitle(response.data.courseTitle);
      }
    } catch (err) {
      console.error('Failed to fetch modules:', err);
      setError(err.response?.data?.message || 'Failed to load modules');
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    fetchModules();
  }, [fetchModules]);

  return { modules, courseTitle, loading, error, refetch: fetchModules };
};

/**
 * Hook for marking module as accessed
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
 * Hook for fetching course quizzes
 */
export const useCourseQuizzes = slug => {
  const [quizzes, setQuizzes] = useState([]);
  const [courseId, setCourseId] = useState(null);
  const [courseTitle, setCourseTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchQuizzes = useCallback(async () => {
    if (!slug) return;

    try {
      setLoading(true);
      setError(null);
      const response = await getCourseQuizzes(slug);
      if (response.success) {
        setQuizzes(response.data.quizzes);
        setCourseId(response.data.courseId);
        setCourseTitle(response.data.courseTitle);
      }
    } catch (err) {
      console.error('Failed to fetch quizzes:', err);
      setError(err.response?.data?.message || 'Failed to load quizzes');
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    fetchQuizzes();
  }, [fetchQuizzes]);

  return { quizzes, courseId, courseTitle, loading, error, refetch: fetchQuizzes };
};

/**
 * Hook for fetching course assignments
 */
export const useCourseAssignments = slug => {
  const [assignments, setAssignments] = useState([]);
  const [courseId, setCourseId] = useState(null);
  const [courseTitle, setCourseTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAssignments = useCallback(async () => {
    if (!slug) return;

    try {
      setLoading(true);
      setError(null);
      const response = await getCourseAssignments(slug);
      if (response.success) {
        setAssignments(response.data.assignments);
        setCourseId(response.data.courseId);
        setCourseTitle(response.data.courseTitle);
      }
    } catch (err) {
      console.error('Failed to fetch assignments:', err);
      setError(err.response?.data?.message || 'Failed to load assignments');
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    fetchAssignments();
  }, [fetchAssignments]);

  return { assignments, courseId, courseTitle, loading, error, refetch: fetchAssignments };
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
 * Hook for fetching all courses with quiz progress
 */
export const useQuizzesByCourse = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCourses = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getQuizzesByCourse();
      if (response.success) {
        setCourses(response.data);
      }
    } catch (err) {
      console.error('Failed to fetch quizzes by course:', err);
      setError(err.response?.data?.message || 'Failed to load quizzes');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  return { courses, loading, error, refetch: fetchCourses };
};

/**
 * Hook for fetching all courses with assignment progress
 */
export const useAssignmentsByCourse = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCourses = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getAssignmentsByCourse();
      if (response.success) {
        setCourses(response.data);
      }
    } catch (err) {
      console.error('Failed to fetch assignments by course:', err);
      setError(err.response?.data?.message || 'Failed to load assignments');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  return { courses, loading, error, refetch: fetchCourses };
};
