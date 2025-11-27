import React, { useState } from 'react';
import { Mail, Lock, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { Toaster } from '@/common/components/ui/sonner';

const AdminLogin = () => {
  const [adminId, setAdminId] = useState('');
  const [password, setPassword] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [errors, setErrors] = useState({});

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Validation
    const newErrors = {};
    if (!adminId.trim()) newErrors.adminId = 'Admin ID is required';
    if (!password.trim()) newErrors.password = 'Password is required';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Clear errors
    setErrors({});

    // TODO: Replace with your actual login API call
    console.log('Login:', { adminId, password });
    toast.success('Login successful!');
    
    // Redirect to admin dashboard or handle login
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    
    if (!forgotEmail.trim()) {
      toast.error('Please enter your email address');
      return;
    }

    // TODO: Replace with your actual forgot password API call
    console.log('Forgot password for:', forgotEmail);
    
    toast.success(
      `New credentials have been sent to your email: ${forgotEmail}`,
      { duration: 5000 }
    );
    
    setShowForgotPassword(false);
    setForgotEmail('');
  };

  const handleForgotPasswordClick = () => {
    setShowForgotPassword(true);
    setErrors({});
  };

  const handleBackToLogin = () => {
    setShowForgotPassword(false);
    setForgotEmail('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 flex items-center justify-center p-4 relative overflow-hidden">
        <Toaster position="top-right" />
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent_50%)]" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />

      {/* Login Card */}
      <div className="relative w-full max-w-md">
        <div className="bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 rounded-3xl shadow-2xl p-8">
          
          {/* Logo/Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-500/20">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">
              {showForgotPassword ? 'Reset Password' : 'Admin Login'}
            </h1>
            <p className="text-sm text-zinc-400">
              {showForgotPassword 
                ? 'Enter your email to receive new credentials' 
                : 'Enter your credentials to access the admin panel'}
            </p>
          </div>

          {/* Login Form */}
          {!showForgotPassword ? (
            <form onSubmit={handleLogin} className="space-y-5">
              {/* Admin ID Field */}
              <div>
                <label htmlFor="adminId" className="block text-sm font-medium text-zinc-200 mb-2">
                  Admin ID <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Mail className="w-5 h-5 text-zinc-500" />
                  </div>
                  <input
                    type="text"
                    id="adminId"
                    value={adminId}
                    onChange={(e) => {
                      setAdminId(e.target.value);
                      if (errors.adminId) setErrors({ ...errors, adminId: '' });
                    }}
                    className={`w-full pl-10 pr-4 py-3 bg-zinc-950 border ${
                      errors.adminId ? 'border-red-500' : 'border-zinc-800'
                    } rounded-xl text-white text-sm placeholder:text-zinc-500 hover:border-zinc-700 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-colors`}
                    placeholder="Enter your admin ID"
                  />
                </div>
                {errors.adminId && (
                  <div className="flex items-center gap-1 mt-2 text-red-400 text-xs">
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors.adminId}</span>
                  </div>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-zinc-200 mb-2">
                  Password <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Lock className="w-5 h-5 text-zinc-500" />
                  </div>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errors.password) setErrors({ ...errors, password: '' });
                    }}
                    className={`w-full pl-10 pr-4 py-3 bg-zinc-950 border ${
                      errors.password ? 'border-red-500' : 'border-zinc-800'
                    } rounded-xl text-white text-sm placeholder:text-zinc-500 hover:border-zinc-700 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-colors`}
                    placeholder="Enter your password"
                  />
                </div>
                {errors.password && (
                  <div className="flex items-center gap-1 mt-2 text-red-400 text-xs">
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors.password}</span>
                  </div>
                )}
              </div>

              {/* Forgot Password Link */}
              <div className="text-right">
                <button
                  type="button"
                  onClick={handleForgotPasswordClick}
                  className="text-sm text-blue-400 hover:text-blue-300 transition-colors hover:underline"
                >
                  Forgot Password?
                </button>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-xl transition-all duration-200 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-zinc-950"
              >
                Sign In
              </button>
            </form>
          ) : (
            // Forgot Password Form
            <form onSubmit={handleForgotPassword} className="space-y-5">
              {/* Email Field */}
              <div>
                <label htmlFor="forgotEmail" className="block text-sm font-medium text-zinc-200 mb-2">
                  Email Address <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Mail className="w-5 h-5 text-zinc-500" />
                  </div>
                  <input
                    type="email"
                    id="forgotEmail"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white text-sm placeholder:text-zinc-500 hover:border-zinc-700 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-colors"
                    placeholder="admin@example.com"
                    required
                  />
                </div>
                <p className="mt-2 text-xs text-zinc-500">
                  We'll send your new credentials to this email address
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleBackToLogin}
                  className="flex-1 py-3 px-4 bg-zinc-800 hover:bg-zinc-700 text-white font-medium rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-500"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-xl transition-all duration-200 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Send Credentials
                </button>
              </div>
            </form>
          )}

          {/* Footer Text */}
          <div className="mt-8 text-center">
            <p className="text-xs text-zinc-500">
              Secure admin access • Protected by encryption
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
