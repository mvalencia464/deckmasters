import React from 'react';

interface FABIconProps {
  className?: string;
  onClick?: () => void;
}

const FABIcon: React.FC<FABIconProps> = ({ className = '', onClick }) => {
  return (
    <svg
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-16 h-16 ${className}`}
      onClick={onClick}
    >
      {/* Background circle */}
      <circle cx="100" cy="100" r="100" fill="#1a1a1a" />

      {/* Orange right triangle (upper right checkmark part) */}
      <polygon points="100,60 160,60 100,140" fill="#FF6600" />

      {/* White left triangle (upper left part) */}
      <polygon points="70,60 100,100 70,140" fill="#ffffff" />

      {/* Orange lower right accent */}
      <polygon points="100,140 140,140 100,180" fill="#FF8800" />
    </svg>
  );
};

export default FABIcon;
