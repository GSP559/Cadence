// GenresPopup.jsx
import React, { useState } from 'react';
import './style.css'; // Make sure this path is correct

const GenresPopup = ({ genres, onSelect, onClose }) => {
  const [selectedGenres, setSelectedGenres] = useState([]);
  const maxGenres = 5; // Maximum number of selectable genres

  const toggleGenre = (genre) => {
    setSelectedGenres((prevSelectedGenres) => {
      const isSelected = prevSelectedGenres.includes(genre);
      if (isSelected) {
        return prevSelectedGenres.filter((g) => g !== genre); // Deselect
      } else if (prevSelectedGenres.length < maxGenres) {
        return [...prevSelectedGenres, genre]; // Select
      }
      return prevSelectedGenres;
    });
  };

  const handleContinue = () => {
    onSelect(selectedGenres); // Pass the selected genres to the parent component
    onClose(); // Close the popup
  };

  return (
    <div className="genres-popup">
      <div className="genres-popup-header">
        Genres <span className="genre-counter">{`${selectedGenres.length}/${maxGenres}`}</span>
        <button className="close-button" onClick={onClose}>✕</button>
      </div>
      <div className="genres-list">
        {genres.map((genre) => (
          <button
            key={genre}
            className={`genre-item ${selectedGenres.includes(genre) ? 'selected' : ''}`}
            onClick={() => toggleGenre(genre)}
          >
            {genre}
          </button>
        ))}
      </div>
      <button className="continue-button" onClick={handleContinue}>
        Continue
      </button>
    </div>
  );
};

export default GenresPopup;
