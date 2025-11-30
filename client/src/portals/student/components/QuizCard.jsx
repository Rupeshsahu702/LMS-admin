import React, { useState, useEffect } from 'react';
import { Loader2, AlertCircle, CheckCircle, XCircle } from 'lucide-react';

import { useQuizQuestions, useSubmitQuiz } from '../hooks';

const QuizCard = ({ courseSlug, quizId, courseId, moduleId, onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selectedOption, setSelectedOption] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [quizResults, setQuizResults] = useState(null);

  const { quiz, loading: loadingQuiz, error: quizError } = useQuizQuestions(courseSlug, quizId);
  const { submit, loading: submitting, error: submitError } = useSubmitQuiz();

  // Reset state when quiz changes
  useEffect(() => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setSelectedOption(null);
    setShowResults(false);
    setQuizResults(null);
  }, [quizId]);

  if (loadingQuiz) {
    return (
      <div className="max-w-3xl mx-auto bg-zinc-900 border border-zinc-800 rounded-2xl p-8 flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (quizError || !quiz) {
    return (
      <div className="max-w-3xl mx-auto bg-zinc-900 border border-zinc-800 rounded-2xl p-8 flex flex-col items-center justify-center min-h-[400px] gap-4">
        <AlertCircle size={48} className="text-red-400" />
        <p className="text-red-400">{quizError || 'Failed to load quiz'}</p>
      </div>
    );
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const totalQuestions = quiz.questions.length;
  const attempted = currentQuestionIndex + 1;
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;

  const handleNext = async () => {
    if (selectedOption === null) return;

    // Save current answer
    const newAnswers = { ...answers, [currentQuestion.id]: selectedOption };
    setAnswers(newAnswers);

    if (!isLastQuestion) {
      // Move to next question
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
    } else {
      // Submit quiz
      try {
        const response = await submit({
          courseId,
          moduleId,
          quizId,
          answers: newAnswers,
        });

        if (response.success) {
          setQuizResults(response.data);
          setShowResults(true);
          onComplete?.();
        }
      } catch (err) {
        console.error('Quiz submission failed:', err);
      }
    }
  };

  // Results Screen
  if (showResults && quizResults) {
    return (
      <div className="max-w-3xl mx-auto bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
        <div className="text-center mb-8">
          <div
            className={`w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center ${
              quizResults.percentage >= 70 ? 'bg-green-900/30' : 'bg-yellow-900/30'
            }`}
          >
            {quizResults.percentage >= 70 ? (
              <CheckCircle size={40} className="text-green-500" />
            ) : (
              <AlertCircle size={40} className="text-yellow-500" />
            )}
          </div>
          <h2 className="text-2xl font-bold mb-2">Quiz Complete!</h2>
          <p className="text-zinc-400">
            You scored{' '}
            <span className="text-white font-bold">
              {quizResults.score}/{quizResults.totalQuestions}
            </span>{' '}
            ({quizResults.percentage}%)
          </p>
        </div>

        {/* Question Results */}
        <div className="space-y-4 mb-8">
          <h3 className="font-bold text-lg border-b border-zinc-800 pb-2">Review Answers</h3>
          {quizResults.results.map((result, index) => {
            const question = quiz.questions.find(q => q.id === result.questionId);
            return (
              <div
                key={result.questionId}
                className={`p-4 rounded-lg border ${
                  result.isCorrect
                    ? 'border-green-500/30 bg-green-900/10'
                    : 'border-red-500/30 bg-red-900/10'
                }`}
              >
                <div className="flex items-start gap-3">
                  {result.isCorrect ? (
                    <CheckCircle size={20} className="text-green-500 mt-0.5 shrink-0" />
                  ) : (
                    <XCircle size={20} className="text-red-500 mt-0.5 shrink-0" />
                  )}
                  <div>
                    <p className="font-medium mb-2">
                      Q{index + 1}: {question?.question}
                    </p>
                    <p className="text-sm text-zinc-400">
                      Your answer:{' '}
                      <span className={result.isCorrect ? 'text-green-400' : 'text-red-400'}>
                        {question?.options[result.userAnswer]}
                      </span>
                    </p>
                    {!result.isCorrect && (
                      <p className="text-sm text-zinc-400">
                        Correct answer:{' '}
                        <span className="text-green-400">
                          {question?.options[result.correctAnswer]}
                        </span>
                      </p>
                    )}
                    {result.explanation && (
                      <p className="text-sm text-zinc-500 mt-2 italic">{result.explanation}</p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={() => {
            setCurrentQuestionIndex(0);
            setAnswers({});
            setSelectedOption(null);
            setShowResults(false);
            setQuizResults(null);
          }}
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-bold text-white transition-colors"
        >
          Retake Quiz
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
      <div className="flex justify-between items-center mb-8 border-b border-zinc-800 pb-4">
        <div>
          <h2 className="text-2xl font-bold">{quiz.title}</h2>
          {quiz.moduleTitle && (
            <p className="text-sm text-zinc-500 mt-1">{quiz.moduleTitle}</p>
          )}
        </div>
        <span className="bg-blue-900/30 text-blue-400 px-3 py-1 rounded text-sm font-bold">
          Question {attempted} of {totalQuestions}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-zinc-800 rounded-full h-2 mb-8">
        <div
          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${(attempted / totalQuestions) * 100}%` }}
        ></div>
      </div>

      {/* Current Question */}
      <div className="space-y-6 mb-8">
        <div>
          <p className="text-lg font-medium mb-4">{currentQuestion.question}</p>
          <div className="space-y-3">
            {currentQuestion.options.map((opt, i) => (
              <label
                key={i}
                className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                  selectedOption === i
                    ? 'border-blue-500 bg-blue-900/20'
                    : 'border-zinc-700 hover:bg-zinc-800'
                }`}
              >
                <input
                  type="radio"
                  name={`q${currentQuestion.id}`}
                  value={i}
                  checked={selectedOption === i}
                  onChange={() => setSelectedOption(i)}
                  className="mr-4 accent-blue-600 w-5 h-5"
                />
                <span>{opt}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {submitError && (
        <div className="mb-4 p-3 bg-red-900/30 border border-red-500/30 rounded-lg text-red-400 text-sm">
          {submitError}
        </div>
      )}

      <div className="flex justify-end">
        <button
          onClick={handleNext}
          disabled={selectedOption === null || submitting}
          className={`px-8 py-3 rounded-lg font-bold text-white shadow-lg transition-colors flex items-center gap-2 ${
            selectedOption !== null && !submitting
              ? 'bg-green-600 hover:bg-green-700'
              : 'bg-zinc-700 cursor-not-allowed'
          }`}
        >
          {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
          {isLastQuestion ? (submitting ? 'Submitting...' : 'Submit Quiz') : 'Next'}
        </button>
      </div>
    </div>
  );
};

export default QuizCard;
