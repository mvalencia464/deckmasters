import React from 'react';
import { X } from 'lucide-react';
import QuoteForm from './QuoteForm';

const LeadCaptureModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-stone-950/90 backdrop-blur-md" onClick={onClose}></div>

      <div className="relative w-full max-w-2xl shadow-2xl animate-fade-in-up">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-[110]"
        >
          <X className="w-6 h-6" />
        </button>

        <QuoteForm />
      </div>
    </div>
  );
};

export default LeadCaptureModal;

