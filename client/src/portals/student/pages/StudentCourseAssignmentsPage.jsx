import React from 'react';
import { ClipboardList, ArrowLeft } from 'lucide-react';
import { useParams } from 'react-router-dom';

import ShortCard from '../components/ShortCard';
import QuizCard from '../components/QuizCard';
import AssignmentCard from '../components/AssignmentCard';

const StudentCourseAssignmentsPage = () => {
  // eslint-disable-next-line no-unused-vars
  const { coursename } = useParams();
  const [module, setModule] = React.useState(null);
  const allModules = [
    {
      id: 1,
      title: 'Full Stack Web Development',
      link: 'full-stack-web-development',
      progress: 65,
      type: 'Quizzes',
      total: 8,
      completed: 5,
      lastAccessed: '2 hours ago',
      image: 'bg-linear-to-br from-blue-900 to-slate-900',
      icon: <ClipboardList size={32} className="text-blue-400" />,
      buttonText: 'View Quiz',
    },
    {
      id: 2,
      title: 'Data Structures & Algorithms',
      link: 'data-structures-algorithms',
      progress: 10,
      type: 'Quizzes',
      total: 12,
      completed: 1,
      lastAccessed: '3 days ago',
      image: 'bg-linear-to-br from-purple-900 to-slate-900',
      icon: <ClipboardList size={32} className="text-purple-400" />,
      buttonText: 'View Quiz',
    },
  ];

  return (
    <div className="p-6 sm:p-8 h-full overflow-y-auto custom-scrollbar bg-black text-white w-full">
      {module ? (
        <div>
          <button onClick={() => setModule(null)} className="flex gap-2 cursor-pointer p-2">
            <ArrowLeft /> <span>back to modules</span>
          </button>
          <AssignmentCard />
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {allModules.map(course => (
            <ShortCard
              key={course.id}
              course={course}
              cardFor="assignments"
              setModule={setModule}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentCourseAssignmentsPage;
