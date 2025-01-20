import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SearchBar from '../components/SearchBar';
import WeatherCard from '../components/WeatherCard';
import { useTheme } from '../context/ThemeContext';
import axios from 'axios';
import { API_KEY, BASE_URL } from '../config/api';

const Home = () => {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { theme, updateTheme } = useTheme();

  const handleSearch = async (city) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.get(
        `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      
      setWeather(response.data);
      updateTheme(response.data);
    } catch (err) {
      if (err.response?.status === 404) {
        setError('City not found. Please check the spelling and try again.');
      } else {
        setError('Failed to fetch weather data. Please try again.');
      }
      console.error('Error fetching weather:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-center mb-8"
      >
        <h1 
          className="text-4xl font-bold mb-4"
          style={{ color: theme.text }}
        >
          Weather Forecast
        </h1>
        <p 
          className="text-xl"
          style={{ color: theme.textSecondary }}
        >
          Enter a city name to get the current weather
        </p>
      </motion.div>

      <SearchBar onSearch={handleSearch} />

      {loading && (
        <div className="text-center py-8">
          <div 
            className="animate-spin rounded-full h-12 w-12 mx-auto"
            style={{ 
              borderWidth: '2px',
              borderColor: `${theme.accent}40`,
              borderTopColor: theme.accent
            }}
          ></div>
        </div>
      )}

      {error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="max-w-md mx-auto mt-8 p-4 rounded-lg text-center"
          style={{
            background: `${theme.cardBg}90`,
            borderColor: theme.cardBorder,
            borderWidth: '1px'
          }}
        >
          <p style={{ color: theme.text }}>{error}</p>
        </motion.div>
      )}

      {weather && !loading && !error && (
        <WeatherCard weather={weather} />
      )}
    </div>
  );
};

export default Home;
