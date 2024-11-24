import React, { createContext, useContext, useState } from 'react';
import type { Participant, Question, QuizContext as QuizContextType } from '../types';

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export function QuizProvider({ children }: { children: React.ReactNode }) {
  const [transcript, setTranscript] = useState('');
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);

  const updateScore = (participantId: string, score: number) => {
    setParticipants((prev) =>
      prev.map((p) =>
        p.id === participantId ? { ...p, score } : p
      )
    );
  };

  return (
    <QuizContext.Provider
      value={{
        transcript,
        participants,
        questions,
        setTranscript,
        setParticipants,
        setQuestions,
        updateScore,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

export function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
}