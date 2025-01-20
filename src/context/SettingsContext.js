import React, { createContext, useContext, useState, useEffect } from 'react';

const SettingsContext = createContext();

export const useSettings = () => useContext(SettingsContext);

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(() => {
    const savedSettings = localStorage.getItem('weatherSettings');
    return savedSettings ? JSON.parse(savedSettings) : {
      temperatureUnit: 'Celsius',
      windSpeedUnit: 'm/s'
    };
  });

  useEffect(() => {
    localStorage.setItem('weatherSettings', JSON.stringify(settings));
  }, [settings]);

  const updateSettings = (newSettings) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const convertTemperature = (temp) => {
    if (settings.temperatureUnit === 'Fahrenheit') {
      return Math.round((temp * 9/5) + 32);
    }
    return Math.round(temp);
  };

  const convertWindSpeed = (speed) => {
    switch (settings.windSpeedUnit) {
      case 'km/h':
        return Math.round(speed * 3.6);
      case 'mph':
        return Math.round(speed * 2.237);
      default:
        return Math.round(speed);
    }
  };

  const getTemperatureUnit = () => {
    return settings.temperatureUnit === 'Fahrenheit' ? '°F' : '°C';
  };

  const getWindSpeedUnit = () => {
    return settings.windSpeedUnit;
  };

  return (
    <SettingsContext.Provider value={{
      settings,
      updateSettings,
      convertTemperature,
      convertWindSpeed,
      getTemperatureUnit,
      getWindSpeedUnit
    }}>
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsContext;
