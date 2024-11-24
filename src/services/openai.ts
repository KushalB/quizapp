import OpenAI from 'openai';
import type { Question } from '../types';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

const SYSTEM_PROMPT = `You are a quiz generator. Create 5 multiple-choice questions based on the provided transcript. 
Each question should test understanding of key concepts from the content.
Return the response in the following JSON format:
{
  "questions": [
    {
      "question": "Question text here",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctAnswer": "Exact text of the correct option"
    }
  ]
}
Ensure each question has exactly 4 options, and the correctAnswer matches exactly with one of the options.`;

export async function generateQuestions(transcript: string): Promise<Question[]> {
  try {
    const completion = await openai.chat.completions.create({
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: transcript }
      ],
      model: 'gpt-3.5-turbo',
      response_format: { type: 'json_object' }
    });

    const response = JSON.parse(completion.choices[0].message.content || '{}');
    return response.questions.map((q: any) => ({
      id: crypto.randomUUID(),
      question: q.question,
      options: q.options,
      correctAnswer: q.correctAnswer
    }));
  } catch (error) {
    console.error('Error generating questions:', error);
    throw new Error('Failed to generate questions');
  }
}