import React from 'react';
import {
  BookOpen,
  Lock,
  CheckCircle,
  FileText,
  Video,
  Notebook,
  UploadCloud,
  Loader2,
  AlertCircle,
} from 'lucide-react';
import { useParams } from 'react-router-dom';

import { useCourseModules, useCourseProgress } from '../hooks';

import { useNavigateWithRedux } from '@/common/hooks/useNavigateWithRedux';

const StudentCourseModulesPage = () => {
  const { coursename } = useParams();
  const navigate = useNavigateWithRedux();

  // Fetch course modules and progress
  const { modules, courseTitle, loading, error, refetch } = useCourseModules(coursename);
  const { progress } = useCourseProgress(coursename);

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

  if (!modules || modules.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-black text-white">
        <BookOpen size={64} className="text-zinc-600 mb-4" />
        <p className="text-zinc-400">No modules found for this course</p>
      </div>
    );
  }

  return (
    <div className="p-6 sm:p-8 h-full overflow-y-auto custom-scrollbar bg-black text-white w-full">
      <h1 className="text-2xl font-bold mb-6">{courseTitle} - Modules</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((module, index) => (
          <ModuleCard
            key={module._id || module.id || index}
            module={module}
            progress={progress}
            coursename={coursename}
            onStartModule={() => navigate(`/student/learning/${coursename}`)}
          />
        ))}
      </div>
    </div>
  );
};

const ModuleCard = ({ module, progress, coursename, onStartModule }) => {
  // Find module progress data
  const moduleProgress = progress?.moduleProgress?.find(
    mp => mp.moduleId?.toString() === (module._id || module.id)?.toString(),
  );

  // Calculate completion stats
  const totalQuizzes = module.quizzes?.length || 0;
  const totalTasks = module.tasks?.length || 0;
  const totalItems = totalQuizzes + totalTasks;

  const completedQuizzes = moduleProgress?.completedQuizzes || 0;
  const completedTasks = moduleProgress?.completedTasks || 0;
  const completedItems = completedQuizzes + completedTasks;

  const isCompleted = totalItems > 0 && completedItems === totalItems;
  const progressPercentage = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 100;

  // Count content items (textLinks and videoLinks are now string arrays)
  const textLinksCount = module.textLinks?.length || 0;
  const videoLinksCount = module.videoLinks?.length || 0;

  return (
    <div
      className={`group block bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden hover:border-zinc-700 transition-all duration-300 hover:-translate-y-1`}
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors line-clamp-1">
              {module.title}
            </h3>
            {module.maxTimelineInDays && (
              <span className="text-xs text-zinc-500">{module.maxTimelineInDays} days</span>
            )}
          </div>
          {isCompleted ? (
            <CheckCircle size={20} className="text-green-500" />
          ) : (
            <BookOpen size={20} className="text-blue-400" />
          )}
        </div>

        <div className="mb-4">
          <div className="flex justify-between text-xs text-zinc-500 mb-2">
            <span>
              {completedItems}/{totalItems} Items Completed
            </span>
            <span>{progressPercentage}%</span>
          </div>
          <div className="w-full bg-zinc-800 rounded-full h-2 overflow-hidden">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>

        {/* Content Summary */}
        <div className="text-sm text-zinc-400 space-y-1">
          {textLinksCount > 0 && (
            <div className="flex items-center gap-2 py-1">
              <FileText size={12} />
              <span>
                {textLinksCount} Reading Material{textLinksCount > 1 ? 's' : ''}
              </span>
            </div>
          )}
          {videoLinksCount > 0 && (
            <div className="flex items-center gap-2 py-1">
              <Video size={12} />
              <span>
                {videoLinksCount} Video Lesson{videoLinksCount > 1 ? 's' : ''}
              </span>
            </div>
          )}
          {totalQuizzes > 0 && (
            <div className="flex items-center gap-2 py-1">
              <Notebook size={12} />
              <span>
                {totalQuizzes} Quiz{totalQuizzes > 1 ? 'zes' : ''}
              </span>
            </div>
          )}
          {totalTasks > 0 && (
            <div className="flex items-center gap-2 py-1">
              <UploadCloud size={12} />
              <span>
                {totalTasks} Assignment{totalTasks > 1 ? 's' : ''}
              </span>
            </div>
          )}
        </div>

        <button
          onClick={onStartModule}
          className="w-full mt-4 py-3 rounded-xl font-medium transition-colors flex items-center justify-center gap-2 bg-zinc-800 text-white hover:bg-blue-600"
        >
          {isCompleted ? 'Review Module' : 'Start Module'}
        </button>
      </div>
    </div>
  );
};

export default StudentCourseModulesPage;
