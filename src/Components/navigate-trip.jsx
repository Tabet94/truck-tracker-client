import { Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const NavigateTrip = ({ tripId, children }) => {
  const navigate = useNavigate();

  const handleTripClick = () => {
    navigate(`/trip/${tripId}`);
  };

  return (
    <Button onClick={handleTripClick} style={{ cursor: 'pointer' }} variant="link" >
      {children}
    </Button>
  );
};

export default NavigateTrip;