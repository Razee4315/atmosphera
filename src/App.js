import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { SettingsProvider } from './context/SettingsContext';
import Header from './components/Header';
import Home from './pages/Home';
import Forecast from './pages/Forecast';
import Settings from './pages/Settings';
import About from './pages/About';

function App() {
  return (
    <ThemeProvider>
      <SettingsProvider>
        <Router>
          <div className="min-h-screen bg-gradient-to-br from-primary to-secondary text-white">
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/forecast" element={<Forecast />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </div>
        </Router>
      </SettingsProvider>
    </ThemeProvider>
  );
}

export default App;
