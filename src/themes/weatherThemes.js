export const weatherThemes = {
  // Hot/Sunny weather theme
  hot: {
    primary: '#FF6B6B',
    secondary: '#FFA07A',
    accent: '#FFD700', // Brighter yellow for better visibility
    background: 'linear-gradient(135deg, #FF8C42 0%, #F96767 100%)',
    text: '#FFFFFF',
    textSecondary: 'rgba(255, 255, 255, 0.8)',
    cardBg: 'rgba(255, 255, 255, 0.15)',
    cardBorder: 'rgba(255, 255, 255, 0.3)',
    shadow: '0 8px 32px rgba(255, 107, 107, 0.2)',
  },
  
  // Cold weather theme
  cold: {
    primary: '#4A90E2',
    secondary: '#64B5F6',
    accent: '#00E5FF', // Bright cyan for better contrast
    background: 'linear-gradient(135deg, #2196F3 0%, #1976D2 100%)',
    text: '#FFFFFF',
    textSecondary: 'rgba(255, 255, 255, 0.8)',
    cardBg: 'rgba(255, 255, 255, 0.15)',
    cardBorder: 'rgba(255, 255, 255, 0.3)',
    shadow: '0 8px 32px rgba(33, 150, 243, 0.2)',
  },
  
  // Rainy weather theme
  rainy: {
    primary: '#546E7A',
    secondary: '#78909C',
    accent: '#4FC3F7', // Bright blue for rain accent
    background: 'linear-gradient(135deg, #37474F 0%, #263238 100%)',
    text: '#FFFFFF',
    textSecondary: 'rgba(255, 255, 255, 0.8)',
    cardBg: 'rgba(255, 255, 255, 0.12)',
    cardBorder: 'rgba(255, 255, 255, 0.25)',
    shadow: '0 8px 32px rgba(38, 50, 56, 0.3)',
  },
  
  // Cloudy weather theme
  cloudy: {
    primary: '#78909C',
    secondary: '#90A4AE',
    accent: '#E0E0E0', // Light gray for cloud accent
    background: 'linear-gradient(135deg, #607D8B 0%, #455A64 100%)',
    text: '#FFFFFF',
    textSecondary: 'rgba(255, 255, 255, 0.8)',
    cardBg: 'rgba(255, 255, 255, 0.15)',
    cardBorder: 'rgba(255, 255, 255, 0.3)',
    shadow: '0 8px 32px rgba(96, 125, 139, 0.2)',
  },
  
  // Snow weather theme
  snow: {
    primary: '#90CAF9',
    secondary: '#BBDEFB',
    accent: '#E3F2FD', // Very light blue for snow accent
    background: 'linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 100%)',
    text: '#1A237E', // Dark blue text for contrast on light background
    textSecondary: 'rgba(26, 35, 126, 0.8)',
    cardBg: 'rgba(255, 255, 255, 0.25)',
    cardBorder: 'rgba(255, 255, 255, 0.5)',
    shadow: '0 8px 32px rgba(187, 222, 251, 0.3)',
  },
};

export const getThemeByWeather = (weatherData) => {
  if (!weatherData) return weatherThemes.cloudy;

  const temp = weatherData.main.temp;
  const weatherId = weatherData.weather[0].id;
  const hour = new Date().getHours();
  const isNight = hour < 6 || hour > 18;
  
  // Add slight color adjustments for night time
  const adjustThemeForNight = (theme) => {
    if (!isNight) return theme;
    return {
      ...theme,
      background: theme.background.replace('gradient', 'gradient(to right'),
      primary: theme.primary + 'dd',
      secondary: theme.secondary + 'dd',
      cardBg: 'rgba(0, 0, 0, 0.2)',
    };
  };

  let theme;
  
  // Temperature based conditions
  if (temp > 30) {
    theme = weatherThemes.hot;
  } else if (temp < 10) {
    theme = weatherThemes.cold;
  } else {
    // Weather ID based conditions (using OpenWeatherMap weather condition codes)
    if (weatherId >= 200 && weatherId < 300) {
      // Thunderstorm
      theme = {
        ...weatherThemes.rainy,
        accent: '#FFD700', // Yellow accent for lightning
        shadow: '0 8px 32px rgba(38, 50, 56, 0.4)',
      };
    } else if (weatherId >= 300 && weatherId < 600) {
      // Drizzle and Rain
      theme = weatherThemes.rainy;
    } else if (weatherId >= 600 && weatherId < 700) {
      // Snow
      theme = weatherThemes.snow;
    } else if (weatherId === 800) {
      // Clear
      theme = temp > 25 ? weatherThemes.hot : weatherThemes.cold;
    } else {
      // Clouds
      theme = weatherThemes.cloudy;
    }
  }

  return adjustThemeForNight(theme);
};
