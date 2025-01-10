import React from 'react';

// This is a functional component that renders your SVG
const PrevSVGButton = ({ onClick }) => {
    return (
        <svg 
            focusable="false" 
            aria-hidden="true" // Set to true if you don't want screen readers to read this as an image
            role="img" 
            viewBox="0 0 24 24" 
            width="24px" 
            height="24px" 
            className="your-svg-class" 
            onClick={onClick} // Assuming onClick handling is passed via props
        >
            <path d="M13.98 20.717a1.79 1.79 0 0 0 2.685 0 1.79 1.79 0 0 0 0-2.684l-7.158-6.62 7.158-6.8a1.79 1.79 0 0 0 0-2.684 1.79 1.79 0 0 0-2.684 0L5.929 9.98a1.79 1.79 0 0 0 0 2.684l8.052 8.052z"></path>
            <title>Previous</title>
        </svg>
    );
};

export default PrevSVGButton;
