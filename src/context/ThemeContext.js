import React, { createContext, useContext, useState } from 'react';
import { weatherThemes, getThemeByWeather } from '../themes/weatherThemes';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState(weatherThemes.cloudy);

  const updateTheme = (weatherData) => {
    const newTheme = getThemeByWeather(weatherData);
    setCurrentTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme: currentTheme, updateTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
