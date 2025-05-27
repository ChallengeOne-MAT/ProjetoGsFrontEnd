import { useState, useEffect } from 'react';

const useGeolocation = () => {
  const [location, setLocation] = useState<GeolocationPosition | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      console.error('Geolocalização não suportada.');
      return;
    }

    const success = (pos: GeolocationPosition) => setLocation(pos);
    const error = (err: GeolocationPositionError) => {
      console.error('Erro ao obter localização:', err.message);
    };

    navigator.geolocation.getCurrentPosition(success, error);
  }, []);

  return location;
};

export default useGeolocation;
