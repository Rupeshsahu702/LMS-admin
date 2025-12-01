import React, { useState } from 'react';
import { ArrowLeft, Loader2, AlertCircle, ClipboardList, CheckCircle } from 'lucide-react';
import { useParams } from 'react-router-dom';

import QuizCard from '../components/QuizCard';
import { useCourseQuizzes } from '../hooks';

const StudentCourseQuizzesPage = () => {
  const { coursename } = useParams();
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const { quizzes, courseId, courseTitle, loading, error, refetch } = useCourseQuizzes(coursename);

  const handleQuizComplete = () => {
    refetch();
    setSelectedQuiz(null);
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
          onClick={refetch}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    );
  }

  if (selectedQuiz) {
    return (
      <div className="p-6 sm:p-8 h-full overflow-y-auto custom-scrollbar bg-black text-white w-full">
        <button
          onClick={() => setSelectedQuiz(null)}
          className="flex gap-2 cursor-pointer p-2 mb-4 hover:text-blue-400 transition-colors"
        >
          <ArrowLeft /> <span>Back to quizzes</span>
        </button>
        <QuizCard
          courseSlug={coursename}
          quizId={selectedQuiz.id}
          courseId={courseId}
          moduleId={selectedQuiz.moduleId}
          onComplete={handleQuizComplete}
        />
      </div>
    );
  }

  return (
    <div className="p-6 sm:p-8 h-full overflow-y-auto custom-scrollbar bg-black text-white w-full">
      <h1 className="text-2xl font-bold mb-6">{courseTitle} - Quizzes</h1>

      {!quizzes || quizzes.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16">
          <ClipboardList size={64} className="text-zinc-600 mb-4" />
          <p className="text-zinc-400">No quizzes available for this course</p>
        </div>
      ) : (
        <div className="space-y-4">
          {quizzes.map(quiz => (
            <div
              key={quiz.id}
              className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-zinc-700 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <ClipboardList size={20} className="text-blue-400" />
                    <h3 className="font-bold text-lg">{quiz.title}</h3>
                    {quiz.isCompleted && <CheckCircle size={18} className="text-green-500" />}
                  </div>
                  <p className="text-zinc-500 text-sm mb-1">{quiz.moduleTitle}</p>
                  <p className="text-zinc-400 text-sm">
                    {quiz.questionsCount} Questions
                    {quiz.score && <span className="ml-4 text-green-400">Score: {quiz.score}</span>}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedQuiz(quiz)}
                  className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                    quiz.isCompleted
                      ? 'bg-zinc-700 hover:bg-zinc-600 text-white'
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  {quiz.isCompleted ? 'Retake Quiz' : 'Start Quiz'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentCourseQuizzesPage;
