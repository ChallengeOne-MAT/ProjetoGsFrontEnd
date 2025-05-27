
'use client';

import { useEffect, useState } from "react";

type Alerta = {
  tipo: string;
  mensagem: string;
  data: string;
};

export default function AlertasPage() {
  const [alertas, setAlertas] = useState<Alerta[]>([]);

  useEffect(() => {
    const local = localStorage.getItem("alertas");
    if (local) {
      setAlertas(JSON.parse(local));
    }
  }, []);

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">📢 Alertas Ativos e Histórico</h1>
      {alertas.length === 0 ? (
        <p className="text-gray-500">Nenhum alerta recente.</p>
      ) : (
        <ul className="space-y-4">
          {alertas.map((alerta, i) => (
            <li key={i} className="bg-red-100 border-l-4 border-red-500 p-4 rounded shadow">
              <p className="font-semibold">{alerta.tipo}</p>
              <p>{alerta.mensagem}</p>
              <p className="text-sm text-gray-600">{alerta.data}</p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
