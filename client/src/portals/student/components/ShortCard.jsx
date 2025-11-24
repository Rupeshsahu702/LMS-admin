import { LockOpen, Clock, Lock, CheckCircle } from 'lucide-react';

const ShortCard = ({ course, setModule, cardFor }) => {
  const getStatusIcon = () => {
    if (course.isLocked) return <Lock size={20} className="text-zinc-500" />;
    if (course.isCompleted) return <CheckCircle size={20} className="text-green-500" />;
    return <LockOpen size={20} className="text-blue-400" />;
  };

  const handleClick = () => {
    if (!course.isLocked) {
      if (cardFor === 'certificates') {
        // Logic to download certificate
        alert(`Downloading certificate for ${course.title}`);
      } else {
        setModule(course);
      }
    }
  };

  return (
    <div className="group flex items-center bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden hover:border-zinc-700 transition-all duration-300 hover:-translate-y-1 p-4">
      <div className="bg-black/40 backdrop-blur-md p-3 rounded-xl w-fit border border-white/10 mr-4">
        {getStatusIcon()}
      </div>

      <div className="flex-1">
        <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors line-clamp-1">
          {course.title}
        </h3>
        {cardFor !== 'certificates' && (
          <p className="text-sm text-zinc-400">
            {course.total} {cardFor === 'assignments' ? 'Assignments' : 'Quizzes'}
          </p>
        )}
      </div>

      <button
        className={`px-4 py-2 rounded-xl font-medium transition-colors ${
          course.isLocked
            ? 'bg-zinc-700 text-zinc-500 cursor-not-allowed'
            : 'bg-blue-600 text-white hover:bg-blue-700'
        }`}
        disabled={course.isLocked}
        onClick={handleClick}
      >
        {course.isLocked
          ? 'Locked'
          : cardFor === 'certificates'
            ? 'Download Certificate'
            : course.isCompleted
              ? `Review ${cardFor === 'assignments' ? 'Assignment' : 'Quiz'}`
              : `Take ${cardFor === 'assignments' ? 'Assignment' : 'Quiz'}`}
      </button>
    </div>
  );
};

export default ShortCard;
