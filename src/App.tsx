import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QuizProvider } from './context/QuizContext';
import { Header } from './components/Header';
import { LandingPage } from './components/LandingPage';
import { Dashboard } from './components/Dashboard';
import { Quiz } from './components/Quiz';

function App() {
  return (
    <BrowserRouter>
      <QuizProvider>
        <div className="min-h-screen bg-gray-50">
          <Header />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/quiz/:id" element={<Quiz />} />
          </Routes>
        </div>
      </QuizProvider>
    </BrowserRouter>
  );
}

export default App;