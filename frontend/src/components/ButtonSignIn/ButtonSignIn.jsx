import React from 'react';
import PropTypes from 'prop-types';
import "./style.css";

const ButtonSignin = ({ className, vectorStroke = "https://c.animaapp.com/GEfjQbNn/img/vector-1--stroke--1.svg" }) => {
  return (
    <div className={`button-signin ${className}`}>
      <div className="text-wrapper">Sign in</div>
      <img className="vector-stroke" alt="Vector stroke" src={vectorStroke} />
    </div>
  );
};

ButtonSignin.propTypes = {
  className: PropTypes.string,
  vectorStroke: PropTypes.string
};

export default ButtonSignin;

