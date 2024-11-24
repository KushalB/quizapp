import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, User } from 'lucide-react';
import { useQuiz } from '../context/QuizContext';

export function Dashboard() {
  const { participants } = useQuiz();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {participants.map((participant) => (
          <div
            key={participant.id}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <User className="text-indigo-600" />
                <h3 className="text-lg font-semibold">{participant.name}</h3>
              </div>
              <span className="text-sm font-medium px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full">
                Score: {participant.score}%
              </span>
            </div>
            
            <Link
              to={participant.quizUrl}
              className="flex items-center justify-center gap-2 w-full mt-4 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
              Take Quiz
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}