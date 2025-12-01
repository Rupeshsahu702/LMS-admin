import { useEffect, useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchProfile, selectProfile, updateProfileLocal, invalidateProfile } from '@/redux/slices';
import {
  updateProfile,
  updateAvatar,
  updatePrivacy,
  changePassword,
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
 * Hook for fetching and managing student profile (Redux-powered)
 */
export const useProfile = () => {
  const dispatch = useDispatch();
  const { data: profile, loading, error, lastFetched } = useSelector(selectProfile);

  const fetchProfileData = useCallback(
    (force = false) => {
      if (force || !isCacheValid(lastFetched)) {
        dispatch(fetchProfile());
      }
    },
    [dispatch, lastFetched],
  );

  useEffect(() => {
    fetchProfileData();
  }, [fetchProfileData]);

  return {
    profile,
    loading,
    error,
    refetch: () => fetchProfileData(true),
  };
};

/**
 * Hook for updating student profile
 */
export const useUpdateProfile = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const update = async profileData => {
    try {
      setLoading(true);
      setError(null);
      const response = await updateProfile(profileData);

      // Update local Redux state on success
      if (response.success) {
        dispatch(updateProfileLocal(profileData));
      }

      return response;
    } catch (err) {
      console.error('Failed to update profile:', err);
      setError(err.response?.data?.message || 'Failed to update profile');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { update, loading, error };
};

/**
 * Hook for updating avatar
 */
export const useUpdateAvatar = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const update = async avatarUrl => {
    try {
      setLoading(true);
      setError(null);
      const response = await updateAvatar(avatarUrl);

      // Update local Redux state on success
      if (response.success) {
        dispatch(updateProfileLocal({ avatar: avatarUrl }));
      }

      return response;
    } catch (err) {
      console.error('Failed to update avatar:', err);
      setError(err.response?.data?.message || 'Failed to update avatar');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { update, loading, error };
};

/**
 * Hook for updating privacy settings
 */
export const useUpdatePrivacy = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const update = async isProfileLocked => {
    try {
      setLoading(true);
      setError(null);
      const response = await updatePrivacy(isProfileLocked);

      // Update local Redux state on success
      if (response.success) {
        dispatch(updateProfileLocal({ isProfileLocked }));
      }

      return response;
    } catch (err) {
      console.error('Failed to update privacy:', err);
      setError(err.response?.data?.message || 'Failed to update privacy settings');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { update, loading, error };
};

/**
 * Hook for changing password
 */
export const useChangePassword = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const change = async passwordData => {
    try {
      setLoading(true);
      setError(null);
      const response = await changePassword(passwordData);
      return response;
    } catch (err) {
      console.error('Failed to change password:', err);
      setError(err.response?.data?.message || 'Failed to change password');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { change, loading, error };
};
