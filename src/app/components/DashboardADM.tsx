'use client';
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function DashboardADM() {
  const [ocorrencias, setOcorrencias] = useState<any[]>([]);

  useEffect(() => {
    const dados = JSON.parse(localStorage.getItem('ocorrencias') || '[]');
    setOcorrencias(dados);
  }, []);

  const agrupados: Record<string, number> = {};
  ocorrencias.forEach((o) => {
    agrupados[o.tipo] = (agrupados[o.tipo] || 0) + 1;
  });

  const data = {
    labels: Object.keys(agrupados),
    datasets: [
      {
        label: 'Ocorrências',
        data: Object.values(agrupados),
        backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#a855f7'],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' as const },
      title: { display: true, text: 'Gráfico de Ocorrências' },
    },
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">Painel do Administrador</h1>

      <div className="mb-10">
        <Bar data={data} options={options} />
      </div>

      <h2 className="text-xl font-semibold mb-4">Relatório Detalhado</h2>
      <table className="w-full table-auto border text-sm">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Data/Hora</th>
            <th className="border p-2">Autoridade</th>
            <th className="border p-2">Tipo</th>
            <th className="border p-2">Descrição</th>
            <th className="border p-2">CEP</th>
            <th className="border p-2">Localização</th>
            <th className="border p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {ocorrencias.map((o, idx) => (
            <tr key={idx} className="hover:bg-gray-100">
              <td className="border p-2">{o.dataHora}</td>
              <td className="border p-2">{o.autoridade}</td>
              <td className="border p-2">{o.tipo}</td>
              <td className="border p-2">{o.descricao}</td>
              <td className="border p-2">{o.cep}</td>
              <td className="border p-2">
                {o.latitude?.toFixed(4)}, {o.longitude?.toFixed(4)}
              </td>
              <td className="border p-2">{o.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
