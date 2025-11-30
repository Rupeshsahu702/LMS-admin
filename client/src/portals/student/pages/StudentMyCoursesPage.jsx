import React from 'react';
import { NotepadText, Loader2, BookOpen } from 'lucide-react';

import LearningCard from '../components/LearningCard';
import { useMyCourses } from '../hooks';

// Color variants for course cards
const colorVariants = [
  { bg: 'bg-linear-to-br from-blue-900 to-slate-900', icon: 'text-blue-400' },
  { bg: 'bg-linear-to-br from-purple-900 to-slate-900', icon: 'text-purple-400' },
  { bg: 'bg-linear-to-br from-green-900 to-slate-900', icon: 'text-green-400' },
  { bg: 'bg-linear-to-br from-orange-900 to-slate-900', icon: 'text-orange-400' },
  { bg: 'bg-linear-to-br from-pink-900 to-slate-900', icon: 'text-pink-400' },
  { bg: 'bg-linear-to-br from-cyan-900 to-slate-900', icon: 'text-cyan-400' },
];

// Helper to format last accessed time
const formatLastAccessed = dateString => {
  if (!dateString) return 'Never';

  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins} min ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  return date.toLocaleDateString();
};

const StudentMyCoursesPage = () => {
  const { courses, loading, error, refetch } = useMyCourses();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] bg-black">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 bg-black text-white">
        <p className="text-red-400">{error}</p>
        <button
          onClick={refetch}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    );
  }

  // Transform API data to match LearningCard props
  const formattedCourses = courses.map((course, index) => {
    const colorIndex = index % colorVariants.length;
    return {
      id: course.id,
      title: course.title,
      slug: course.slug,
      progress: course.progress || 0,
      type: 'Modules',
      total: course.totalModules || 0,
      completed: course.completedModules || 0,
      lastAccessed: formatLastAccessed(course.lastAccessed),
      image: colorVariants[colorIndex].bg,
      icon: <NotepadText size={32} className={colorVariants[colorIndex].icon} />,
      buttonText: course.isCompleted ? 'Review Course' : 'Continue Learning',
      thumbnail: course.thumbnail,
    };
  });

  return (
    <div className="p-6 sm:p-8 h-full overflow-y-auto custom-scrollbar bg-black text-white w-full">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">My Courses</h1>
        <p className="text-zinc-400">Continue your learning journey</p>
      </div>

      {formattedCourses.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[40vh] gap-4">
          <BookOpen size={64} className="text-zinc-600" />
          <h2 className="text-xl font-bold text-zinc-300">No Enrolled Courses</h2>
          <p className="text-zinc-500 text-center max-w-md">
            You haven't enrolled in any courses yet. Browse our catalog to start your learning
            journey.
          </p>
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Browse Courses
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {formattedCourses.map(course => (
            <LearningCard
              key={course.id}
              course={course}
              destination={`my-courses/${course.slug}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentMyCoursesPage;
