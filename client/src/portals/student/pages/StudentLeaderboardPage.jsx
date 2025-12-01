import React, { useState } from 'react';
import { Crown, Zap, Target, Loader2, AlertCircle, Users } from 'lucide-react';

import { useLeaderboard, useMyCourses } from '../hooks';

const StudentLeaderboardPage = () => {
  const [filterType, setFilterType] = useState('global');
  const [selectedCourseId, setSelectedCourseId] = useState(null);

  const { courses } = useMyCourses();
  const { leaderboard, userRank, userEntry, loading, error, refetch } = useLeaderboard(
    filterType,
    selectedCourseId,
  );

  const handleFilterChange = e => {
    const value = e.target.value;
    if (value === 'global') {
      setFilterType('global');
      setSelectedCourseId(null);
    } else {
      setFilterType('course');
      setSelectedCourseId(value);
    }
  };

  // Generate initials from name
  const getInitials = name => {
    if (!name) return '??';
    const parts = name.split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  // Get color based on rank
  const getRankColor = rank => {
    const colors = [
      'bg-blue-500',
      'bg-purple-500',
      'bg-green-500',
      'bg-orange-500',
      'bg-pink-500',
      'bg-cyan-500',
      'bg-red-500',
      'bg-indigo-500',
    ];
    return colors[rank % colors.length];
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full bg-black">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4 bg-black text-white">
        <AlertCircle size={48} className="text-red-400" />
        <p className="text-red-400">{error}</p>
        <button
          onClick={() => refetch()}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-8 custom-scrollbar relative bg-black text-white">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Hero Banner */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 bg-linear-to-r from-blue-900/40 to-purple-900/40 p-6 sm:p-8 rounded-3xl border border-white/10 relative overflow-hidden shadow-2xl">
          <div className="relative z-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 text-white">
              Hall of Fame 🏆
            </h2>
            <p className="text-blue-200 max-w-lg text-sm sm:text-base">
              Rise to the top! Earn XP by completing lessons, maintaining streaks, and acing
              quizzes.
            </p>
            {userEntry && (
              <div className="mt-4 flex items-center gap-4 text-sm">
                <span className="bg-blue-600/30 px-3 py-1 rounded-full text-blue-300">
                  Your Rank: #{userRank || '-'}
                </span>
                <span className="bg-purple-600/30 px-3 py-1 rounded-full text-purple-300">
                  XP: {userEntry.xp?.toLocaleString() || 0}
                </span>
              </div>
            )}
          </div>
          <div className="relative z-10 w-full sm:w-auto">
            <select
              className="w-full sm:w-auto bg-black/60 border border-zinc-600 text-white rounded-xl px-4 py-2.5 focus:outline-none focus:border-blue-500 cursor-pointer backdrop-blur-md hover:bg-black/80 transition-colors text-sm"
              value={filterType === 'global' ? 'global' : selectedCourseId}
              onChange={handleFilterChange}
            >
              <option value="global">Global Ranking</option>
              {courses?.map(course => (
                <option key={course.id} value={course.id}>
                  {course.title}
                </option>
              ))}
            </select>
          </div>
          <Crown
            size={150}
            className="absolute -top-6 -right-6 text-white/5 rotate-12 pointer-events-none hidden sm:block"
          />
        </div>

        {/* Leaderboard Table/List */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl sm:rounded-3xl overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-2 sm:gap-4 text-zinc-500 text-xs uppercase font-bold p-4 sm:p-6 border-b border-zinc-800 bg-black/20">
            <div className="col-span-7 sm:col-span-5">Rank & Student</div>
            <div className="col-span-3 sm:col-span-4 text-center">XP Earned</div>
            <div className="col-span-2 sm:col-span-3 text-right">Quizzes</div>
          </div>

          {leaderboard.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-zinc-500">
              <Users size={48} className="mb-4 opacity-50" />
              <p>No leaderboard data yet</p>
              <p className="text-sm mt-1">Complete quizzes to appear on the leaderboard!</p>
            </div>
          ) : (
            <div className="p-2 sm:p-4 space-y-2">
              {leaderboard.map(user => (
                <div
                  key={user.rank}
                  className={`grid grid-cols-12 gap-2 sm:gap-4 items-center p-3 sm:p-4 rounded-xl sm:rounded-2xl border transition-all duration-300 hover:scale-[1.01] cursor-default ${
                    user.isCurrentUser
                      ? 'bg-blue-900/20 border-blue-500/50 shadow-[0_0_20px_rgba(37,99,235,0.15)]'
                      : 'bg-zinc-900/50 border-transparent hover:border-zinc-700 hover:bg-zinc-800'
                  }`}
                >
                  {/* Rank & Avatar */}
                  <div className="col-span-7 sm:col-span-5 flex items-center gap-2 sm:gap-4">
                    <div
                      className={`w-7 h-7 sm:w-8 sm:h-8 flex shrink-0 items-center justify-center font-bold rounded-full text-xs sm:text-sm ${
                        user.rank === 1
                          ? 'bg-yellow-500 text-black shadow-lg shadow-yellow-500/50'
                          : user.rank === 2
                            ? 'bg-zinc-300 text-black shadow-lg shadow-zinc-300/50'
                            : user.rank === 3
                              ? 'bg-orange-500 text-black shadow-lg shadow-orange-500/50'
                              : 'text-zinc-500 bg-zinc-800'
                      }`}
                    >
                      {user.rank <= 3 ? <Crown size={14} /> : user.rank}
                    </div>

                    {user.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full shrink-0 object-cover"
                      />
                    ) : (
                      <div
                        className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex shrink-0 items-center justify-center font-bold text-xs sm:text-sm text-white shadow-inner ${getRankColor(user.rank)}`}
                      >
                        {getInitials(user.name)}
                      </div>
                    )}

                    <div className="min-w-0">
                      <p
                        className={`font-bold text-sm sm:text-base truncate ${user.isCurrentUser ? 'text-blue-400' : 'text-white'}`}
                      >
                        {user.name} {user.isCurrentUser && '(You)'}
                      </p>
                      {user.college && (
                        <p className="text-xs text-zinc-500 truncate hidden sm:block">
                          {user.college}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* XP */}
                  <div className="col-span-3 sm:col-span-4 flex items-center justify-center font-mono font-medium text-blue-400 text-sm sm:text-base">
                    <Zap size={14} className="mr-1 sm:mr-2 opacity-70 hidden sm:block" />
                    {user.xp?.toLocaleString() || 0}
                  </div>

                  {/* Quizzes */}
                  <div className="col-span-2 sm:col-span-3 text-right font-mono font-medium text-purple-400 flex items-center justify-end text-sm sm:text-base">
                    <Target size={14} className="mr-1 sm:mr-2 opacity-70 hidden sm:block" />
                    {user.quizzesCompleted || 0}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentLeaderboardPage;
