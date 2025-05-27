'use client'; 

import useGeolocation from '../hooks/useGeolocation';

export default function LocationStatus() {
  const location = useGeolocation();

  if (!location) return <p className="text-gray-500">Buscando localização...</p>;

  return (
    <div className="text-green-600">
      <p>Latitude: {location.coords.latitude.toFixed(4)}</p>
      <p>Longitude: {location.coords.longitude.toFixed(4)}</p>
    </div>
  );
}
