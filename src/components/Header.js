import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const Header = () => {
  const location = useLocation();
  const { theme } = useTheme();

  const links = [
    { path: '/', label: 'Home' },
    { path: '/forecast', label: 'Forecast' },
    { path: '/settings', label: 'Settings' },
    { path: '/about', label: 'About' },
  ];

  return (
    <header 
      className="py-4 px-6 backdrop-blur-md"
      style={{ 
        background: `${theme.primary}20`,
        borderBottom: `1px solid ${theme.accent}40`
      }}
    >
      <nav className="container mx-auto">
        <ul className="flex justify-center space-x-8">
          {links.map((link) => (
            <motion.li key={link.path}>
              <Link
                to={link.path}
                className={`relative px-3 py-2 rounded-lg transition-colors duration-300 ${
                  location.pathname === link.path
                    ? 'text-white'
                    : 'text-gray-300 hover:text-white'
                }`}
                style={{
                  color: location.pathname === link.path ? theme.accent : theme.text,
                }}
              >
                {location.pathname === link.path && (
                  <motion.div
                    layoutId="active-pill"
                    className="absolute inset-0 rounded-lg -z-10"
                    style={{ background: `${theme.accent}30` }}
                    transition={{ type: 'spring', duration: 0.5 }}
                  />
                )}
                {link.label}
              </Link>
            </motion.li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
