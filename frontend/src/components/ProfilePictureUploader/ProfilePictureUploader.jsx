// ProfilePictureUploader.jsx
import React, { useState } from 'react';
import './style.css'; // Ensure this path is correct for your CSS file

const ProfilePictureUploader = ({ onPictureSelected, index }) => {
  const [imageUploaded, setImageUploaded] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    if (file) {
      onPictureSelected(file, index); // Pass the selected file and index up to the parent component
      setImageUploaded(true); // Update the state to indicate the image is uploaded
      setUploadedImageUrl(URL.createObjectURL(file)); // Create a URL for the uploaded image to display it
    }
  };

  return (
    <label className={`profile-picture-uploader ${imageUploaded ? 'uploaded' : ''}`}>
      {imageUploaded ? (
        <img src={uploadedImageUrl} alt={`Uploaded profile ${index}`} />
      ) : (
        <div className="upload-placeholder">+</div>
      )}
      <input
        type="file"
        onChange={handleFileInput}
        accept="image/*"
        style={{ display: 'none' }} // Hide the file input
      />
    </label>
  );
};

export default ProfilePictureUploader;
