import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Search, BookOpen } from 'lucide-react';

const PageNotFound = () => {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center relative overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 text-center px-4 max-w-2xl mx-auto">
        {/* 404 Number */}
        <div className="mb-8">
          <h1 className="text-[150px] md:text-[200px] font-extrabold leading-none text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-purple-500 to-cyan-400 animate-pulse">
            404
          </h1>
        </div>

        {/* Error Message */}
        <div className="space-y-4 mb-10">
          <h2 className="text-3xl md:text-4xl font-bold">Page Not Found</h2>
          <p className="text-lg text-zinc-400 max-w-md mx-auto">
            Oops! The page you&apos;re looking for seems to have wandered off into the digital void.
            Let&apos;s get you back on track.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/"
            className="flex items-center gap-2 px-8 py-4 rounded-full bg-blue-600 hover:bg-blue-700 font-bold text-lg transition-all duration-300 shadow-[0_0_20px_rgba(37,99,235,0.5)] hover:shadow-[0_0_30px_rgba(37,99,235,0.7)]"
          >
            <Home className="size-5" />
            Back to Home
          </Link>

          <Link
            to="/browse"
            className="flex items-center gap-2 px-8 py-4 rounded-full border border-zinc-600 hover:border-blue-500 hover:text-blue-400 font-bold text-lg transition-all duration-300"
          >
            <Search className="size-5" />
            Browse Courses
          </Link>
        </div>

        {/* Quick Links */}
        <div className="mt-16 pt-8 border-t border-zinc-800">
          <p className="text-sm text-zinc-500 mb-6">Or try these popular pages:</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/howitworks"
              className="text-sm text-zinc-400 hover:text-blue-400 transition-colors px-4 py-2 rounded-lg bg-zinc-900/50 border border-zinc-800 hover:border-blue-500/50"
            >
              How It Works
            </Link>
            <Link
              to="/pricing"
              className="text-sm text-zinc-400 hover:text-blue-400 transition-colors px-4 py-2 rounded-lg bg-zinc-900/50 border border-zinc-800 hover:border-blue-500/50"
            >
              Pricing
            </Link>
            <Link
              to="/aboutus"
              className="text-sm text-zinc-400 hover:text-blue-400 transition-colors px-4 py-2 rounded-lg bg-zinc-900/50 border border-zinc-800 hover:border-blue-500/50"
            >
              About Us
            </Link>
            <Link
              to="/student"
              className="text-sm text-zinc-400 hover:text-blue-400 transition-colors px-4 py-2 rounded-lg bg-zinc-900/50 border border-zinc-800 hover:border-blue-500/50 flex items-center gap-2"
            >
              <BookOpen className="size-4" />
              LMS Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
