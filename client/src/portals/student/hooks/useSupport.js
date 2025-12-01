import { useEffect, useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchSupportQueries, selectSupport } from '@/redux/slices';
import { createSupportQuery } from '@/services/student/studentService';

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
 * Hook for fetching support queries (Redux-powered)
 */
export const useSupportQueries = () => {
  const dispatch = useDispatch();
  const { queries, loading, error, lastFetched } = useSelector(selectSupport);

  const fetchQueries = useCallback(
    (force = false) => {
      if (force || !isCacheValid(lastFetched)) {
        dispatch(fetchSupportQueries());
      }
    },
    [dispatch, lastFetched],
  );

  useEffect(() => {
    fetchQueries();
  }, [fetchQueries]);

  return {
    queries,
    loading,
    error,
    refetch: () => fetchQueries(true),
  };
};

/**
 * Hook for creating a support query
 */
export const useCreateSupportQuery = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const create = async queryData => {
    try {
      setLoading(true);
      setError(null);
      const response = await createSupportQuery(queryData);

      // Refetch support queries after creating new one
      if (response.success) {
        dispatch(fetchSupportQueries());
      }

      return response;
    } catch (err) {
      console.error('Failed to create support query:', err);
      setError(err.response?.data?.message || 'Failed to submit support query');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { create, loading, error };
};
