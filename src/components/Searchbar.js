import React, { useState, useEffect } from 'react';

const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(query);
  };

  useEffect(() => {
    const handleInputChange = e => {
      setQuery(e.target.value);
    };

    document.addEventListener('input', handleInputChange);
    return () => {
      document.removeEventListener('input', handleInputChange);
    };
  }, []);

  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={handleSubmit}>
        <button type="submit" className="SearchForm-button"></button>
        <input
          className="SearchForm-input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Шукати зображення та фотографії"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
      </form>
    </header>
  );
};

export default Searchbar;
