import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Users, Loader2 } from 'lucide-react';
import { useQuiz } from '../context/QuizContext';
import { generateQuestions } from '../services/openai';

export function LandingPage() {
  const navigate = useNavigate();
  const { setTranscript, setParticipants, setQuestions } = useQuiz();
  const [participantInput, setParticipantInput] = useState('');
  const [transcriptText, setTranscriptText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const questions = await generateQuestions(transcriptText);
      
      const participantList = participantInput
        .split(',')
        .map(name => name.trim())
        .filter(Boolean)
        .map(name => ({
          id: crypto.randomUUID(),
          name,
          score: 0,
          quizUrl: `/quiz/${crypto.randomUUID()}`
        }));

      setTranscript(transcriptText);
      setParticipants(participantList);
      setQuestions(questions);
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to generate quiz questions. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8 text-indigo-600">
            Create Quiz from your Course Transcript
          </h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center gap-2 mb-4">
                <FileText className="text-indigo-600" />
                <h2 className="text-xl font-semibold">Video Transcript</h2>
              </div>
              <textarea
                required
                value={transcriptText}
                onChange={(e) => setTranscriptText(e.target.value)}
                className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Paste your video transcript here..."
              />
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center gap-2 mb-4">
                <Users className="text-indigo-600" />
                <h2 className="text-xl font-semibold">Participants</h2>
              </div>
              <input
                required
                type="text"
                value={participantInput}
                onChange={(e) => setParticipantInput(e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Enter participant names (comma-separated)"
              />
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded-lg">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-indigo-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Generating Quiz...
                </>
              ) : (
                'Generate Quizzes'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}