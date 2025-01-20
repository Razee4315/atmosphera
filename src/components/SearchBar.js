import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSearch } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const { theme } = useTheme();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <motion.form
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="max-w-md mx-auto"
      onSubmit={handleSubmit}
    >
      <div 
        className="flex items-center p-3 rounded-lg"
        style={{ 
          background: theme.cardBg,
          borderColor: theme.cardBorder,
          borderWidth: '1px'
        }}
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a city..."
          className="flex-1 bg-transparent outline-none px-2"
          style={{ 
            color: theme.text,
            '::placeholder': { color: theme.textSecondary }
          }}
        />
        <button
          type="submit"
          className="p-2 rounded-lg transition-colors duration-200 hover:bg-opacity-80"
          style={{ background: theme.accent }}
        >
          <FiSearch className="text-white" />
        </button>
      </div>
    </motion.form>
  );
};

export default SearchBar;
