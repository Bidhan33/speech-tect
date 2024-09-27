import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import TranscriptionApp from './components/TranscriptionApp.jsx';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/transcribe" element={<TranscriptionApp />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
