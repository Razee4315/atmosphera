import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { FiGithub, FiMail } from 'react-icons/fi';

const About = () => {
  const { theme } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-4 py-8"
    >
      <h1 
        className="text-4xl font-bold mb-8"
        style={{ color: theme.text }}
      >
        About Atmosphera
      </h1>

      <div 
        className="rounded-xl p-6 mb-6"
        style={{
          background: theme.cardBg,
          borderColor: theme.cardBorder,
          borderWidth: '1px',
          boxShadow: theme.shadow
        }}
      >
        <h2 
          className="text-2xl font-semibold mb-4"
          style={{ color: theme.text }}
        >
          Project Overview
        </h2>
        <p 
          className="mb-4"
          style={{ color: theme.textSecondary }}
        >
          Atmosphera is a modern weather application built with React that provides current weather conditions and 5-day forecasts. 
          The app features a clean, intuitive interface and supports multiple units for temperature and wind speed.
        </p>
      </div>

      <div 
        className="rounded-xl p-6"
        style={{
          background: theme.cardBg,
          borderColor: theme.cardBorder,
          borderWidth: '1px',
          boxShadow: theme.shadow
        }}
      >
        <h2 
          className="text-2xl font-semibold mb-4"
          style={{ color: theme.text }}
        >
          Contact Information
        </h2>
        
        <div className="space-y-4">
          <a
            href="https://github.com/Razee4315"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 transition-opacity hover:opacity-80"
            style={{ color: theme.accent }}
          >
            <FiGithub className="text-xl" />
            <span>Razee4315</span>
          </a>
          
          <div 
            className="flex items-center gap-2"
            style={{ color: theme.accent }}
          >
            <FiMail className="text-xl" />
            <a 
              href="mailto:saqlainrazee@gmail.com"
              className="transition-opacity hover:opacity-80"
            >
              saqlainrazee@gmail.com
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default About;
