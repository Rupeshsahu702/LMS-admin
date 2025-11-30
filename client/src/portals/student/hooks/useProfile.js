import { useState, useEffect, useCallback } from 'react';

import {
  getProfile,
  updateProfile,
  updateAvatar,
  updatePrivacy,
  changePassword,
} from '@/services/student/studentService';

/**
 * Hook for fetching and managing student profile
 */
export const useProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProfile = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getProfile();
      if (response.success) {
        setProfile(response.data);
      }
    } catch (err) {
      console.error('Failed to fetch profile:', err);
      setError(err.response?.data?.message || 'Failed to load profile');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return { profile, loading, error, refetch: fetchProfile };
};

/**
 * Hook for updating student profile
 */
export const useUpdateProfile = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const update = async profileData => {
    try {
      setLoading(true);
      setError(null);
      const response = await updateProfile(profileData);
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const update = async avatarUrl => {
    try {
      setLoading(true);
      setError(null);
      const response = await updateAvatar(avatarUrl);
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const update = async isProfileLocked => {
    try {
      setLoading(true);
      setError(null);
      const response = await updatePrivacy(isProfileLocked);
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
