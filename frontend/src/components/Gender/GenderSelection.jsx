
// GenderSelection.jsx
import React, { useState } from 'react';
import './style.css'; // Ensure this path is correct for your CSS file

const GenderSelection = ({ onSelect }) => {
    const [selectedGender, setSelectedGender] = useState('');
    const [showMoreOptions, setShowMoreOptions] = useState(false);
    const [moreGenderSelected, setMoreGenderSelected] = useState(false);

    const handleSelectGender = (gender) => {
        setSelectedGender(gender);
        onSelect(gender); // Call the passed onSelect function with the new gender
        setShowMoreOptions(false);

        if (gender === 'More') {
            setShowMoreOptions(current => !current);
            if (!showMoreOptions) {
                setMoreGenderSelected(false);
            }
        } else {
            setMoreGenderSelected(gender !== 'Man' && gender !== 'Woman');
        }
    };

    const moreGenders = ['Non-binary', 'Transgender', 'Genderqueer', 'Other'];

    return (
        <div className="gender-selection-container">
            <button
                className={`gender-button ${selectedGender === 'Man' && !moreGenderSelected ? 'selected' : ''}`}
                onClick={() => handleSelectGender('Man')}
            >
                Man
            </button>
            <button
                className={`gender-button ${selectedGender === 'Woman' && !moreGenderSelected ? 'selected' : ''}`}
                onClick={() => handleSelectGender('Woman')}
            >
                Woman
            </button>
            <button
                className={`gender-button ${moreGenderSelected || showMoreOptions ? 'selected' : ''}`}
                onClick={() => handleSelectGender('More')}
            >
                More
            </button>


            {showMoreOptions && (
                <ul className="more-genders-dropdown">
                    {moreGenders.map((gender) => (
                        <li
                            key={gender}
                            className={`dropdown-item ${selectedGender === gender ? 'selected' : ''}`}
                            onClick={() => handleSelectGender(gender)}
                        >
                            {gender}
                        </li> // Added the missing closing </li> tag
                    ))}
                </ul>
            )}
        </div>
    );
};

export default GenderSelection;
