'use client';

import callEmergency from '../lib/callEmergency';

export default function EmergencyButtons() {
  return (
    <div className="flex gap-4">
      <button
        onClick={() => callEmergency('police')}
        className="bg-red-600 text-white px-4 py-2 rounded"
      >
        Polícia
      </button>
      <button
        onClick={() => callEmergency('fire')}
        className="bg-orange-600 text-white px-4 py-2 rounded"
      >
        Bombeiros
      </button>
      <button
        onClick={() => callEmergency('ambulance')}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Ambulância
      </button>
    </div>
  );
}
