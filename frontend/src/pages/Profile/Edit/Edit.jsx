import React, { useState } from 'react';
import "./style.css"; // Ensure your CSS is correctly referenced

export default function EditProfile() {
  // State for the current selected picture index
  const [selectedPictureIndex, setSelectedPictureIndex] = useState(0);

  // Array of picture URLs
  const pictures = [
        'https://c.animaapp.com/I2nDhD6p/img/rectangle-17.png',
        'https://c.animaapp.com/I2nDhD6p/img/ellipse-8@2x.png',
        'https://c.animaapp.com/I2nDhD6p/img/ellipse-10@2x.png',
  ];

  // Render the component
  return (
    <div className="edit-page">
      <div className="overlap-wrapper">
        <div className="overlap">
          <div className="group">
            <div className="ProfileViewBackground">
              <div className="profile-picture-container">
                {/* Loop through the pictures and render them inside rectangles */}
                {pictures.map((picture, index) => (
                  <div
                    key={index}
                    className={`profile-picture-wrapper ${selectedPictureIndex === index ? 'selected' : ''}`}
                    onClick={() => setSelectedPictureIndex(index)}>
                    <img 
                      className="ProfilePicture1" 
                      src={picture} 
                      alt={`Edit Profile ${index + 1}`}
                    />
                  </div>
                ))}
              </div>
            </div>
            {/* Other components can go here if needed */}
          </div>
        </div>
      </div>
    </div>
  );
}
