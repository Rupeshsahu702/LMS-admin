import { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchDashboard, selectDashboard, invalidateDashboard } from '@/redux/slices';

// Cache duration: 2 minutes for dashboard (more frequently updated)
const CACHE_DURATION = 2 * 60 * 1000;

/**
 * Check if cache is still valid
 */
const isCacheValid = lastFetched => {
  if (!lastFetched) return false;
  return Date.now() - lastFetched < CACHE_DURATION;
};

/**
 * Hook for fetching dashboard data (Redux-powered)
 */
export const useDashboard = () => {
  const dispatch = useDispatch();
  const { data: dashboardData, loading, error, lastFetched } = useSelector(selectDashboard);

  const fetchDashboardData = useCallback(
    (force = false) => {
      if (force || !isCacheValid(lastFetched)) {
        dispatch(fetchDashboard());
      }
    },
    [dispatch, lastFetched],
  );

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  const invalidate = useCallback(() => {
    dispatch(invalidateDashboard());
  }, [dispatch]);

  return {
    dashboardData,
    loading,
    error,
    refetch: () => fetchDashboardData(true),
    invalidate,
  };
};
