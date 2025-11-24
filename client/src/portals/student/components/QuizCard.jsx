import React, { useState } from 'react';

const QuizCard = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selectedOption, setSelectedOption] = useState('');

  // Dummy data
  const quizData = {
    title: 'HTML & CSS Basics Quiz',
    questions: [
      {
        id: 1,
        question: 'Which HTML tag is used to define an internal style sheet?',
        options: ['<css>', '<script>', '<style>', '<link>'],
        correct: '<style>',
      },
      {
        id: 2,
        question: 'What does CSS stand for?',
        options: [
          'Cascading Style Sheets',
          'Computer Style Sheets',
          'Creative Style Sheets',
          'Colorful Style Sheets',
        ],
        correct: 'Cascading Style Sheets',
      },
      {
        id: 3,
        question: 'Which property is used to change the background color?',
        options: ['color', 'bgcolor', 'background-color', 'bg-color'],
        correct: 'background-color',
      },
      {
        id: 4,
        question: 'How do you select an element with id "demo"?',
        options: ['#demo', '.demo', 'demo', '*demo'],
        correct: '#demo',
      },
      {
        id: 5,
        question: 'Which HTML attribute is used to define inline styles?',
        options: ['class', 'style', 'font', 'styles'],
        correct: 'style',
      },
    ],
  };

  const currentQuestion = quizData.questions[currentQuestionIndex];
  const totalQuestions = quizData.questions.length;
  const attempted = currentQuestionIndex + 1;

  const handleNext = () => {
    if (selectedOption) {
      setAnswers({ ...answers, [currentQuestion.id]: selectedOption });
      if (currentQuestionIndex < totalQuestions - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedOption('');
      } else {
        // Submit
        console.log('Quiz submitted:', answers);
        alert('Quiz submitted!');
      }
    }
  };

  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;

  return (
    <div className="max-w-3xl mx-auto bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
      <div className="flex justify-between items-center mb-8 border-b border-zinc-800 pb-4">
        <h2 className="text-2xl font-bold">{quizData.title}</h2>
        <span className="bg-blue-900/30 text-blue-400 px-3 py-1 rounded text-sm font-bold">
          Question {attempted} of {totalQuestions}
        </span>
      </div>

      {/* Current Question */}
      <div className="space-y-6 mb-8">
        <div>
          <p className="text-lg font-medium mb-4">{currentQuestion.question}</p>
          <div className="space-y-3">
            {currentQuestion.options.map((opt, i) => (
              <label
                key={i}
                className="flex items-center p-4 border border-zinc-700 rounded-lg hover:bg-zinc-800 cursor-pointer transition-colors"
              >
                <input
                  type="radio"
                  name={`q${currentQuestion.id}`}
                  value={opt}
                  checked={selectedOption === opt}
                  onChange={e => setSelectedOption(e.target.value)}
                  className="mr-4 accent-blue-600 w-5 h-5"
                />
                <span>{opt}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleNext}
          disabled={!selectedOption}
          className={`px-8 py-3 rounded-lg font-bold text-white shadow-lg transition-colors ${
            selectedOption ? 'bg-green-600 hover:bg-green-700' : 'bg-zinc-700 cursor-not-allowed'
          }`}
        >
          {isLastQuestion ? 'Submit Quiz' : 'Next'}
        </button>
      </div>
    </div>
  );
};

export default QuizCard;
