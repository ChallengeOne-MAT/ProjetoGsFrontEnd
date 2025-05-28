'use client'
import { useState } from 'react';
import useGeolocation from '../hooks/useGeolocation';
import callEmergency from '../lib/callEmergency';
import { useIndexedDB } from '../hooks/useIndexedDB';

export default function Emergencia() {
  const [emergencyType, setEmergencyType] = useState(null);
  const location = useGeolocation();
  const { call } = useCallEmergency();
  const { save } = useIndexedDB();

  const handleSOS = async () => {
    if (location) {
      save('emergency', { type: emergencyType, location });

      await call(location);

    }
  };

  return (
    <div>
      <h2>Selecione o tipo de desastre</h2>
      <button onClick={() => setEmergencyType('Incêndio')}>Incêndio</button>
      <button onClick={() => setEmergencyType('Terremoto')}>Terremoto</button>
      <button onClick={() => setEmergencyType('Enchente')}>Enchente</button>
      <button onClick={() => setEmergencyType('Deslizamento')}>Deslizamento</button>
      <button onClick={() => setEmergencyType('Outro')}>Outro</button>

      <button onClick={handleSOS}>SOS</button>
    </div>
  );
}
