import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useSettings } from '../context/SettingsContext';
import { FiMoon, FiSun, FiThermometer, FiWind } from 'react-icons/fi';

const Settings = () => {
  const { theme } = useTheme();
  const { settings, updateSettings } = useSettings();

  const handleUnitChange = (type, value) => {
    updateSettings({ [type]: value });
  };

  const settingsGroups = [
    {
      title: 'Units',
      icon: <FiThermometer />,
      settings: [
        {
          name: 'Temperature Unit',
          description: 'Choose your preferred temperature unit',
          options: ['Celsius', 'Fahrenheit'],
          value: settings.temperatureUnit,
          key: 'temperatureUnit',
          icon: <FiThermometer />
        },
        {
          name: 'Wind Speed Unit',
          description: 'Choose your preferred wind speed unit',
          options: ['m/s', 'km/h', 'mph'],
          value: settings.windSpeedUnit,
          key: 'windSpeedUnit',
          icon: <FiWind />
        }
      ]
    }
  ];

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
        Settings
      </h1>

      {settingsGroups.map((group, index) => (
        <div
          key={index}
          className="mb-8 rounded-xl p-6"
          style={{
            background: theme.cardBg,
            borderColor: theme.cardBorder,
            borderWidth: '1px',
            boxShadow: theme.shadow
          }}
        >
          <div className="flex items-center mb-4">
            <span className="text-2xl mr-2" style={{ color: theme.accent }}>
              {group.icon}
            </span>
            <h2 className="text-2xl font-semibold" style={{ color: theme.text }}>
              {group.title}
            </h2>
          </div>

          <div className="space-y-6">
            {group.settings.map((setting, settingIndex) => (
              <div key={settingIndex} className="border-t" style={{ borderColor: `${theme.cardBorder}40` }}>
                <div className="pt-4">
                  <div className="flex items-center mb-2">
                    <span className="text-xl mr-2" style={{ color: theme.accent }}>
                      {setting.icon}
                    </span>
                    <h3 className="text-lg font-medium" style={{ color: theme.text }}>
                      {setting.name}
                    </h3>
                  </div>
                  <p className="text-sm mb-3" style={{ color: theme.textSecondary }}>
                    {setting.description}
                  </p>
                  <div className="flex gap-2">
                    {setting.options.map((option, optionIndex) => (
                      <button
                        key={optionIndex}
                        onClick={() => handleUnitChange(setting.key, option)}
                        className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                          option === setting.value ? 'font-medium' : ''
                        }`}
                        style={{
                          background: option === setting.value ? `${theme.accent}20` : `${theme.cardBg}80`,
                          color: option === setting.value ? theme.accent : theme.textSecondary,
                          border: `1px solid ${option === setting.value ? theme.accent : theme.cardBorder}40`
                        }}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div 
        className="mt-8 p-4 text-center rounded-lg"
        style={{
          background: `${theme.cardBg}60`,
          borderColor: theme.cardBorder,
          borderWidth: '1px'
        }}
      >
        <p className="text-sm" style={{ color: theme.textSecondary }}>
          Version 1.0.0 • Made with ❤️ by Atmosphera Team
        </p>
      </div>
    </motion.div>
  );
};

export default Settings;
