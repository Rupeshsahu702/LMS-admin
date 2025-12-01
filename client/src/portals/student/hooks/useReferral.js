import { useEffect, useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchReferralInfo, selectReferral } from '@/redux/slices';
import { applyReferralCode } from '@/services/student/studentService';

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
 * Hook for fetching referral information (Redux-powered)
 */
export const useReferralInfo = () => {
  const dispatch = useDispatch();
  const { data: referralInfo, loading, error, lastFetched } = useSelector(selectReferral);

  const fetchReferral = useCallback(
    (force = false) => {
      if (force || !isCacheValid(lastFetched)) {
        dispatch(fetchReferralInfo());
      }
    },
    [dispatch, lastFetched],
  );

  useEffect(() => {
    fetchReferral();
  }, [fetchReferral]);

  return {
    referralInfo,
    loading,
    error,
    refetch: () => fetchReferral(true),
  };
};

/**
 * Hook for applying a referral code
 */
export const useApplyReferralCode = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const apply = async code => {
    try {
      setLoading(true);
      setError(null);
      const response = await applyReferralCode(code);

      // Refetch referral info after applying code
      if (response.success) {
        dispatch(fetchReferralInfo());
      }

      return response;
    } catch (err) {
      console.error('Failed to apply referral code:', err);
      setError(err.response?.data?.message || 'Failed to apply referral code');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { apply, loading, error };
};
