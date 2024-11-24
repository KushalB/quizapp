import React from 'react';
import { Trophy } from 'lucide-react';
import { useQuiz } from '../context/QuizContext';

export function Header() {
  const { participants } = useQuiz();
  const averageScore = participants.length
    ? participants.reduce((acc, p) => acc + p.score, 0) / participants.length
    : 0;

  return (
    <header className="bg-indigo-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Quiz Dashboard</h1>
          {participants.length > 0 && (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Trophy className="h-5 w-5" />
                <span className="font-semibold">
                  Average Score: {averageScore.toFixed(1)}%
                </span>
              </div>
              <div className="text-sm">
                Participants: {participants.length}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}