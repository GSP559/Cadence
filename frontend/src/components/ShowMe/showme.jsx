// AudienceSelection.jsx
import React, { useState } from 'react';
import './style.css'; // Update with the correct path to your CSS file

const AudienceSelection = ({ onSelect }) => {
  const [selectedAudience, setSelectedAudience] = useState('');

  const handleSelectAudience = (audience) => {
    setSelectedAudience(audience);
    onSelect(audience);  // Call the passed onSelect function with the new audience
  };

  return (
    <div className="audience-selection-container">
      <button
        className={`audience-button ${selectedAudience === 'men' ? 'selected' : ''}`}
        onClick={() => handleSelectAudience('men')}
      >
        Men
      </button>
      <button
        className={`audience-button ${selectedAudience === 'women' ? 'selected' : ''}`}
        onClick={() => handleSelectAudience('women')}
      >
        Women
      </button>
      <button
        className={`audience-button ${selectedAudience === 'everyone' ? 'selected' : ''}`}
        onClick={() => handleSelectAudience('everyone')}
      >
        Everyone
      </button>
    </div>
  );
};

export default AudienceSelection;
