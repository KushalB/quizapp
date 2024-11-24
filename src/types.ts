export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface Participant {
  id: string;
  name: string;
  score: number;
  quizUrl: string;
}

export interface QuizContext {
  transcript: string;
  participants: Participant[];
  questions: Question[];
  setTranscript: (transcript: string) => void;
  setParticipants: (participants: Participant[]) => void;
  setQuestions: (questions: Question[]) => void;
  updateScore: (participantId: string, score: number) => void;
}