import React from 'react';
import { motion } from 'framer-motion';
import { WiDaySunny, WiRain, WiSnow, WiCloudy, WiThunderstorm } from 'react-icons/wi';
import { useTheme } from '../context/ThemeContext';
import { useSettings } from '../context/SettingsContext';

const WeatherCard = ({ weather }) => {
  const { theme } = useTheme();
  const { convertTemperature, convertWindSpeed, getTemperatureUnit, getWindSpeedUnit } = useSettings();

  const getWeatherIcon = (weatherCode) => {
    const iconProps = {
      className: "text-6xl",
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

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="rounded-xl p-8 max-w-md mx-auto mt-8 backdrop-blur-md"
      style={{ 
        background: theme.cardBg,
        borderColor: theme.cardBorder,
        borderWidth: '1px',
        boxShadow: theme.shadow
      }}
    >
      <div className="text-center">
        <h2 className="text-4xl font-bold mb-6" style={{ color: theme.text }}>
          {weather.name}
        </h2>
        
        <div className="flex justify-center items-center mb-6">
          {getWeatherIcon(weather.weather[0].id)}
        </div>
        
        <div className="mb-8">
          <p className="text-6xl font-bold" style={{ color: theme.text }}>
            {convertTemperature(weather.main.temp)}{getTemperatureUnit()}
          </p>
          <p className="text-xl mt-2 capitalize" style={{ color: theme.textSecondary }}>
            {weather.weather[0].description}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8">
          <div className="p-4 rounded-lg" style={{ background: `${theme.cardBg}80` }}>
            <p style={{ color: theme.textSecondary }} className="text-sm mb-1">
              Humidity
            </p>
            <p className="text-2xl font-semibold" style={{ color: theme.text }}>
              {weather.main.humidity}%
            </p>
          </div>
          <div className="p-4 rounded-lg" style={{ background: `${theme.cardBg}80` }}>
            <p style={{ color: theme.textSecondary }} className="text-sm mb-1">
              Wind Speed
            </p>
            <p className="text-2xl font-semibold" style={{ color: theme.text }}>
              {convertWindSpeed(weather.wind.speed)} {getWindSpeedUnit()}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default WeatherCard;
