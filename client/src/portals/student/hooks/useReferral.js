import { useState, useEffect, useCallback } from 'react';

import { getReferralInfo, applyReferralCode } from '@/services/student/studentService';

/**
 * Hook for fetching referral information
 */
export const useReferralInfo = () => {
  const [referralInfo, setReferralInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchReferralInfo = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getReferralInfo();
      if (response.success) {
        setReferralInfo(response.data);
      }
    } catch (err) {
      console.error('Failed to fetch referral info:', err);
      setError(err.response?.data?.message || 'Failed to load referral information');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReferralInfo();
  }, [fetchReferralInfo]);

  return { referralInfo, loading, error, refetch: fetchReferralInfo };
};

/**
 * Hook for applying a referral code
 */
export const useApplyReferralCode = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const apply = async code => {
    try {
      setLoading(true);
      setError(null);
      const response = await applyReferralCode(code);
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
