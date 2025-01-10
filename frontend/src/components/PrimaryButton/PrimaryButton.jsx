import PropTypes from 'prop-types';
import './style.css';

// Define the component
const PrimaryButton = ({ className, text = 'Sign Up', vector = 'https://c.animaapp.com/GEfjQbNn/img/vector-1--stroke--1.svg' }) => {
  return (
    <div className={`primary-button ${className}`}>
      <div className="text">{text}</div>
      <img className="vector" alt="Vector" src={vector} />
    </div>
  );
};

// Define PropTypes
PrimaryButton.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string,
  vector: PropTypes.string,
};

// Export the component
export default PrimaryButton;
