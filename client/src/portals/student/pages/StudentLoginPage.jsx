import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Loader2, Eye, EyeOff, BookOpen } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';

import authService from '@/services/global/authService';
import { useNavigateWithRedux } from '@/common/hooks/useNavigateWithRedux';
import { login, selectIsAuthenticated } from '@/redux/slices';

const StudentLoginPage = () => {
  const navigate = useNavigateWithRedux();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/student/dashboard');
    }
  }, [isAuthenticated, navigate]);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // LMS Login fields
  const [lmsId, setLmsId] = useState('');
  const [lmsPassword, setLmsPassword] = useState('');

  const handleLmsLogin = async e => {
    e.preventDefault();
    if (!lmsId.trim() || !lmsPassword.trim()) return;

    setIsLoading(true);
    setError('');

    try {
      const response = await authService.lmsLogin(lmsId, lmsPassword);
      if (response.success) {
        // Extract auth data from response - tokens are already stored in localStorage by authService
        const { accessToken, refreshToken, user } = response.data;
        // Store auth data in Redux for app-wide access
        dispatch(login({ accessToken, refreshToken, user }));
        navigate('/student/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid LMS credentials. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto h-screen bg-black flex items-center justify-center p-4">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px]" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo & Branding */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-zinc-400">Sign in to continue your learning journey</p>
        </div>

        {/* Login Card */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-8 shadow-2xl">
          <div className="flex gap-2 items-center justify-center mb-6 text-white text-xl font-semibold">
            <BookOpen className="size-6" />
            LMS Login
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}

          <form onSubmit={handleLmsLogin} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="lmsId" className="block text-sm font-medium text-zinc-200 mb-2">
                  LMS ID
                </label>
                <input
                  type="text"
                  id="lmsId"
                  value={lmsId}
                  onChange={e => setLmsId(e.target.value)}
                  className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-white text-sm placeholder:text-zinc-500 hover:border-zinc-700 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                  placeholder="Enter your LMS ID"
                  required
                  disabled={isLoading}
                />
              </div>

              <div>
                <label
                  htmlFor="lmsPassword"
                  className="block text-sm font-medium text-zinc-200 mb-2"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="lmsPassword"
                    value={lmsPassword}
                    onChange={e => setLmsPassword(e.target.value)}
                    className="w-full px-4 py-3 pr-12 bg-zinc-900 border border-zinc-800 rounded-xl text-white text-sm placeholder:text-zinc-500 hover:border-zinc-700 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                    placeholder="Enter your password"
                    required
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
                  >
                    {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                  </button>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:bg-blue-600/50 disabled:cursor-not-allowed text-white text-base font-medium rounded-xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Footer Links */}
          <div className="mt-6 text-center space-y-3">
            <Link
              to="/forgot-password"
              className="text-sm text-zinc-400 hover:text-blue-400 transition-colors"
            >
              Forgot your password?
            </Link>
            <p className="text-sm text-zinc-500">
              Don't have an account?{' '}
              <Link to="/enroll" className="text-blue-400 hover:text-blue-300 font-medium">
                Enroll Now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentLoginPage;
