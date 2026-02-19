import React, { useState } from 'react';
import FABIcon from './FABIcon';

interface FloatingActionButtonProps {
  onClick?: () => void;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  label?: string;
  actions?: Array<{ label: string; onClick: () => void; icon?: React.ReactNode }>;
}

/**
 * FloatingActionButton Component
 * 
 * A stylish FAB with optional menu actions.
 * 
 * Example:
 * <FloatingActionButton 
 *   onClick={() => scrollToTop()}
 *   label="Back to top"
 * />
 */
const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  onClick,
  position = 'bottom-right',
  label = 'Contact',
  actions = [],
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const positionClasses = {
    'bottom-right': 'bottom-6 right-6',
    'bottom-left': 'bottom-6 left-6',
    'top-right': 'top-6 right-6',
    'top-left': 'top-6 left-6',
  };

  const handleMainClick = () => {
    if (actions.length > 0) {
      setIsOpen(!isOpen);
    } else if (onClick) {
      onClick();
    }
  };

  return (
    <div className={`fixed ${positionClasses[position]} z-40 group`}>
      {/* Action menu items */}
      {isOpen && actions.length > 0 && (
        <div className="absolute bottom-full right-0 mb-3 flex flex-col gap-2 animate-in fade-in zoom-in duration-200">
          {actions.map((action, idx) => (
            <button
              key={idx}
              onClick={() => {
                action.onClick();
                setIsOpen(false);
              }}
              className="flex items-center justify-end gap-3 bg-stone-900 hover:bg-stone-800 text-white px-4 py-2.5 rounded-lg shadow-lg transition-all duration-200 border border-stone-800 hover:border-orange-600 group/item"
            >
              <span className="text-xs font-semibold uppercase tracking-wide">{action.label}</span>
              {action.icon && <div className="w-5 h-5">{action.icon}</div>}
            </button>
          ))}
        </div>
      )}

      {/* Main FAB button */}
      <button
        onClick={handleMainClick}
        className="relative w-16 h-16 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 active:scale-95 border-2 border-orange-600 hover:border-orange-500 group/fab"
        title={label}
      >
        <FABIcon className="text-orange-600" />

        {/* Tooltip */}
        <div className="absolute bottom-full right-0 mb-3 bg-stone-900 text-white px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap opacity-0 group-hover/fab:opacity-100 transition-opacity duration-300 pointer-events-none border border-stone-800">
          {label}
        </div>

        {/* Pulse animation when actions available */}
        {actions.length > 0 && !isOpen && (
          <div className="absolute inset-0 rounded-full bg-orange-600 opacity-0 group-hover/fab:opacity-20 animate-pulse"></div>
        )}
      </button>
    </div>
  );
};

export default FloatingActionButton;
