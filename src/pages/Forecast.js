import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useSettings } from '../context/SettingsContext';
import { WiDaySunny, WiRain, WiSnow, WiCloudy, WiThunderstorm } from 'react-icons/wi';
import axios from 'axios';
import { API_KEY, BASE_URL } from '../config/api';

const Forecast = () => {
  const { theme } = useTheme();
  const { convertTemperature, convertWindSpeed, getTemperatureUnit, getWindSpeedUnit } = useSettings();
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        setLoading(true);
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude: lat, longitude: lon } = position.coords;
            const response = await axios.get(
              `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
            );
            setForecast(response.data);
            setError(null);
          }, (err) => {
            setError('Unable to get location. Please enable location services.');
          });
        } else {
          setError('Geolocation is not supported by your browser.');
        }
      } catch (err) {
        console.error('Error fetching forecast:', err);
        setError('Failed to fetch forecast data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchForecast();
  }, []);

  const getWeatherIcon = (weatherCode) => {
    const iconProps = {
      className: "text-4xl",
      style: { color: theme.accent }
    };

    if (weatherCode >= 200 && weatherCode < 300) {
      return <WiThunderstorm {...iconProps} />;
    } else if (weatherCode >= 300 && weatherCode < 600) {
      return <WiRain {...iconProps} />;
    } else if (weatherCode >= 600 && weatherCode < 700) {
      return <WiSnow {...iconProps} />;
    } else if (weatherCode === 800) {
      return <WiDaySunny {...iconProps} />;
    } else {
      return <WiCloudy {...iconProps} />;
    }
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    }).format(date);
  };

  // Group forecast data by day
  const groupedForecast = forecast?.list?.reduce((acc, item) => {
    const date = formatDate(item.dt);
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(item);
    return acc;
  }, {}) || {};

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div 
          className="animate-spin rounded-full h-12 w-12 mx-auto"
          style={{ 
            borderWidth: '2px',
            borderColor: `${theme.accent}40`,
            borderTopColor: theme.accent
          }}
        ></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="max-w-md mx-auto p-4 rounded-lg"
          style={{
            background: `${theme.cardBg}90`,
            borderColor: theme.cardBorder,
            borderWidth: '1px'
          }}
        >
          <p style={{ color: theme.text }}>{error}</p>
        </motion.div>
      </div>
    );
  }

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
        5-Day Forecast
      </h1>

      <div className="space-y-6">
        {Object.entries(groupedForecast).map(([date, items], dayIndex) => (
          <motion.div
            key={date}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: dayIndex * 0.1 }}
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
              {date}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {items.map((item, index) => (
                <div
                  key={item.dt}
                  className="p-4 rounded-lg"
                  style={{
                    background: `${theme.cardBg}80`,
                    borderColor: theme.cardBorder,
                    borderWidth: '1px'
                  }}
                >
                  <p 
                    className="text-sm mb-2"
                    style={{ color: theme.textSecondary }}
                  >
                    {formatTime(item.dt)}
                  </p>
                  
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      {getWeatherIcon(item.weather[0].id)}
                    </div>
                    <p 
                      className="text-2xl font-bold"
                      style={{ color: theme.text }}
                    >
                      {convertTemperature(item.main.temp)}{getTemperatureUnit()}
                    </p>
                  </div>
                  
                  <p 
                    className="text-sm capitalize"
                    style={{ color: theme.textSecondary }}
                  >
                    {item.weather[0].description}
                  </p>
                  
                  <div className="mt-2 pt-2 border-t" style={{ borderColor: `${theme.cardBorder}40` }}>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <p style={{ color: theme.textSecondary }}>Humidity</p>
                        <p style={{ color: theme.text }}>{item.main.humidity}%</p>
                      </div>
                      <div>
                        <p style={{ color: theme.textSecondary }}>Wind</p>
                        <p style={{ color: theme.text }}>
                          {convertWindSpeed(item.wind.speed)} {getWindSpeedUnit()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <div 
        className="mt-8 p-4 text-center rounded-lg"
        style={{
          background: `${theme.cardBg}60`,
          borderColor: theme.cardBorder,
          borderWidth: '1px'
        }}
      >
        <p 
          className="text-sm"
          style={{ color: theme.textSecondary }}
        >
          Forecast data provided by OpenWeatherMap
        </p>
      </div>
    </motion.div>
  );
};

export default Forecast;
