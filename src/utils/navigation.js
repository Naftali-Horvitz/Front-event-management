// features/navigation/utils/navigation.js
import { useNavigate } from 'react-router-dom';

export const useBackNavigation = () => {
  const navigate = useNavigate();
  
  const handleBack = () => {
    navigate(-1);
  };

  return handleBack;
};