import { PlayCircle, Clock } from 'lucide-react';

import { useNavigateWithRedux } from '@/common/hooks/useNavigateWithRedux';

const LearningCard = ({ course, destination }) => {
  const navigate = useNavigateWithRedux();
  return (
    <div
      onClick={() => navigate(`/student/${destination}`)}
      key={course.id}
      className="group block bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden hover:border-zinc-700 transition-all duration-300 hover:-translate-y-1"
    >
      {/* Course Thumbnail / Glimpse */}
      <div className={`h-40 w-full ${course.image} relative p-6 flex flex-col justify-between`}>
        <div className="bg-black/40 backdrop-blur-md p-3 rounded-xl w-fit border border-white/10">
          {course.icon}
        </div>
        <div className="flex items-center text-xs font-bold text-white/80 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full w-fit">
          <Clock size={12} className="mr-2" /> Last: {course.lastAccessed}
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold mb-4 text-white group-hover:text-blue-400 transition-colors line-clamp-1">
          {course.title}
        </h3>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-xs text-zinc-500 mb-2">
            <span>{course.progress}% Complete</span>
            <span>
              {course.completed}/{course.total} {course.type}
            </span>
          </div>
          <div className="w-full bg-zinc-800 rounded-full h-2 overflow-hidden">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${course.progress}%` }}
            ></div>
          </div>
        </div>

        <button className="w-full bg-zinc-800 text-white py-3 rounded-xl font-medium group-hover:bg-blue-600 transition-colors flex items-center justify-center gap-2">
          {course.buttonText}
        </button>
      </div>
    </div>
  );
};

export default LearningCard;
