import React from 'react';
import { BookOpen, Lock, CheckCircle } from 'lucide-react';
import { useParams } from 'react-router-dom';

const StudentCourseModulesPage = () => {
  const { coursename } = useParams();

  // Mock courses data (same as in StudentLearningPage)
  const courses = {
    'full-stack-web-development': {
      id: 1,
      title: 'Full Stack Web Development',
      progress: 40,
      modules: [
        {
          id: 1,
          title: 'Module 1: HTML & CSS Fundamentals',
          isLocked: false,
          isCompleted: true,
          lessons: [
            {
              id: 'l1',
              title: 'Introduction to HTML5',
              type: 'video',
              duration: '10m',
              completed: true,
            },
            {
              id: 'l2',
              title: 'CSS Box Model & Flexbox',
              type: 'video',
              duration: '25m',
              completed: true,
            },
            {
              id: 'q1',
              title: 'Frontend Basics Quiz',
              type: 'quiz',
              completed: true,
              score: '8/10',
            },
            {
              id: 't1',
              title: 'Build a Landing Page',
              type: 'task',
              completed: true,
              status: 'Submitted',
            },
          ],
        },
        {
          id: 2,
          title: 'Module 2: JavaScript Essentials',
          isLocked: false,
          isCompleted: false,
          lessons: [
            {
              id: 'l3',
              title: 'Variables, Types & Functions',
              type: 'video',
              duration: '15m',
              completed: false,
            },
            {
              id: 'l4',
              title: 'DOM Manipulation',
              type: 'video',
              duration: '30m',
              completed: false,
            },
            {
              id: 'q2',
              title: 'JS Logic Quiz',
              type: 'quiz',
              completed: false,
            },
            {
              id: 't2',
              title: 'Interactive To-Do List',
              type: 'task',
              completed: false,
            },
          ],
        },
        {
          id: 3,
          title: 'Module 3: React Framework',
          isLocked: true,
          isCompleted: false,
          lessons: [],
        },
      ],
      capstone: { isLocked: true, title: 'Capstone: E-Commerce Platform' },
    },
    'data-structures-algorithms': {
      id: 2,
      title: 'Data Structures & Algorithms',
      progress: 10,
      modules: [
        {
          id: 1,
          title: 'Module 1: Introduction to DSA',
          isLocked: false,
          isCompleted: false,
          lessons: [
            { id: 'l1', title: 'What is DSA?', type: 'video', duration: '20m', completed: false },
          ],
        },
      ],
      capstone: { isLocked: true, title: 'Capstone: Sorting Algorithm' },
    },
  };

  const courseData = courses[coursename];

  if (!courseData) {
    return <div className="p-6 text-white">Course not found.</div>;
  }

  return (
    <div className="p-6 sm:p-8 h-full overflow-y-auto custom-scrollbar bg-black text-white w-full">
      <h1 className="text-2xl font-bold mb-6">{courseData.title} - Modules</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courseData.modules.map(module => (
          <ModuleCard key={module.id} module={module} />
        ))}
      </div>
    </div>
  );
};

const ModuleCard = ({ module }) => {
  const completedLessons = module.lessons.filter(lesson => lesson.completed).length;
  const totalLessons = module.lessons.length;

  return (
    <div
      className={`group block bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden hover:border-zinc-700 transition-all duration-300 hover:-translate-y-1 ${
        module.isLocked ? 'opacity-50' : ''
      }`}
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors line-clamp-1">
            {module.title}
          </h3>
          {module.isLocked ? (
            <Lock size={20} className="text-zinc-500" />
          ) : module.isCompleted ? (
            <CheckCircle size={20} className="text-green-500" />
          ) : (
            <BookOpen size={20} className="text-blue-400" />
          )}
        </div>

        <div className="mb-4">
          <div className="flex justify-between text-xs text-zinc-500 mb-2">
            <span>
              {completedLessons}/{totalLessons} Lessons Completed
            </span>
          </div>
          <div className="w-full bg-zinc-800 rounded-full h-2 overflow-hidden">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-500"
              style={{
                width: `${totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0}%`,
              }}
            ></div>
          </div>
        </div>

        <div className="text-sm text-zinc-400">
          {module.lessons.map(lesson => (
            <div key={lesson.id} className="flex items-center justify-between py-1">
              <span className={lesson.completed ? 'text-green-400' : ''}>{lesson.title}</span>
              <span>{lesson.duration || lesson.score || lesson.status}</span>
            </div>
          ))}
        </div>

        <button
          className={`w-full mt-4 py-3 rounded-xl font-medium transition-colors flex items-center justify-center gap-2 ${
            module.isLocked
              ? 'bg-zinc-700 text-zinc-500 cursor-not-allowed'
              : 'bg-zinc-800 text-white hover:bg-blue-600'
          }`}
          disabled={module.isLocked}
        >
          {module.isLocked ? 'Locked' : module.isCompleted ? 'Review Module' : 'Start Module'}
        </button>
      </div>
    </div>
  );
};

export default StudentCourseModulesPage;
