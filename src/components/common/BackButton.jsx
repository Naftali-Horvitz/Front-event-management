import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useBackNavigation } from '../../utils/navigation';

const BackButton = () => {
  const location = useLocation();
  const handleBack = useBackNavigation();
  const showButton = location.pathname !== '/' && location.pathname !== '/home';

  if (!showButton) {
    return null;
  }

  return (
    <button 
      onClick={handleBack}
      className="p-1 md:p-2 text-gray-700 bg-white border border-gray-300 rounded-full hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
      aria-label="חזור לדף הקודם"
    >
      <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
    </button>
  );
};

export default BackButton;