import React from 'react';
import { FileText, Loader2, AlertCircle, BookOpen } from 'lucide-react';

import LearningCard from '../components/LearningCard';
import { useAssignmentsByCourse } from '../hooks';

const StudentAssignmentsPage = () => {
  const { courses, loading, error, refetch } = useAssignmentsByCourse();

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
          onClick={refetch}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!courses || courses.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-black text-white">
        <BookOpen size={64} className="text-zinc-600 mb-4" />
        <p className="text-zinc-400">No assignments available</p>
        <p className="text-zinc-500 text-sm mt-2">Enroll in courses to access assignments</p>
      </div>
    );
  }

  // Transform API data to match LearningCard format
  const formattedCourses = courses.map(course => ({
    id: course.id,
    title: course.title,
    link: course.slug,
    progress: course.progress,
    type: 'Assignments',
    total: course.totalAssignments,
    completed: course.completedAssignments,
    image: 'bg-linear-to-br from-green-900 to-slate-900',
    icon: <FileText size={32} className="text-green-400" />,
    buttonText: 'View Assignments',
    thumbnail: course.thumbnail,
  }));

  return (
    <div className="p-6 sm:p-8 h-full overflow-y-auto custom-scrollbar bg-black text-white w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {formattedCourses.map(course => (
          <LearningCard
            key={course.id}
            course={course}
            destination={`assignments/${course.link}`}
          />
        ))}
      </div>
    </div>
  );
};

export default StudentAssignmentsPage;
