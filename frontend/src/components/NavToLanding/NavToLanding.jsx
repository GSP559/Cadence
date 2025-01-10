import React from 'react';
import { useNavigate } from 'react-router-dom';

// This is a functional component
function NavigateToLandingButton() {
  const navigate = useNavigate(); // Call the useNavigate hook here

  function handleNavigate() {
    navigate('/landing'); // Replace with your path
  }

  // Render a button that navigates when clicked
  return (
    <button onClick={handleNavigate}>Create Account</button>
  );
}

export default NavigateToLandingButton;
