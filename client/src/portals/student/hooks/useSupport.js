import { useState, useEffect, useCallback } from 'react';

import { createSupportQuery, getSupportQueries } from '@/services/student/studentService';

/**
 * Hook for fetching support queries
 */
export const useSupportQueries = () => {
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchQueries = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getSupportQueries();
      if (response.success) {
        setQueries(response.data || []);
      }
    } catch (err) {
      console.error('Failed to fetch support queries:', err);
      setError(err.response?.data?.message || 'Failed to load support queries');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchQueries();
  }, [fetchQueries]);

  return { queries, loading, error, refetch: fetchQueries };
};

/**
 * Hook for creating a support query
 */
export const useCreateSupportQuery = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const create = async queryData => {
    try {
      setLoading(true);
      setError(null);
      const response = await createSupportQuery(queryData);
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
