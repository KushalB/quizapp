import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { useQuiz } from '../context/QuizContext';

export function Quiz() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { participants, questions, updateScore } = useQuiz();
  const participant = participants.find(p => p.quizUrl === `/quiz/${id}`);
  
  const [answers, setAnswers] = useState<Record<string, string>>(
    questions.reduce((acc, q) => ({ ...acc, [q.id]: '' }), {})
  );
  const [submitted, setSubmitted] = useState(false);

  if (!participant) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Quiz Not Found</h2>
          <button
            onClick={() => navigate('/')}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
          >
            Return Home
          </button>
        </div>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const totalQuestions = questions.length;
    const correctAnswers = questions.reduce((count, question) => (
      answers[question.id] === question.correctAnswer ? count + 1 : count
    ), 0);

    const score = Math.round((correctAnswers / totalQuestions) * 100);
    updateScore(participant.id, score);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center bg-white p-8 rounded-lg shadow-md">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Quiz Completed!
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Your score: {participant.score}%
          </p>
          <button
            onClick={() => navigate('/dashboard')}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Welcome, {participant.name}!
          </h2>
          <p className="text-gray-600">
            Please answer all questions below to complete the quiz.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {questions.map((question, index) => (
            <div key={question.id} className="border-b pb-6">
              <h4 className="text-lg font-medium mb-4">
                {index + 1}. {question.question}
              </h4>
              <div className="space-y-3">
                {question.options.map((option) => (
                  <label
                    key={option}
                    className="flex items-center p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <input
                      type="radio"
                      name={question.id}
                      value={option}
                      checked={answers[question.id] === option}
                      onChange={(e) => setAnswers(prev => ({
                        ...prev,
                        [question.id]: e.target.value
                      }))}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                      required
                    />
                    <span className="ml-3">{option}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
          >
            Submit Quiz
          </button>
        </form>
      </div>
    </div>
  );
}