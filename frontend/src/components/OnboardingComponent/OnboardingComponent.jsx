import React from 'react';
import { useNavigate } from 'react-router-dom';

const NavigateToOnboarding = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/onboarding'); // This navigates to the onboarding route when the button is clicked
  };

  return (
    <button onClick={handleNavigate} style={{ cursor: 'pointer' }}>
      Go to Onboarding
    </button>
  );
};

export default NavigateToOnboarding;
