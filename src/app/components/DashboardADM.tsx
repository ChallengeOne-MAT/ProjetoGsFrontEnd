'use client'
import React from 'react';
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

const DashboardADM = () => {
  const data = {
    labels: ['Polícia', 'Ambulância', 'Bombeiros'],
    datasets: [
      {
        label: 'Ocorrências',
        data: [12, 19, 7],
        backgroundColor: ['#3b82f6', '#10b981', '#f59e0b'],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const, 
      },
      title: {
        display: true,
        text: 'Relatório de Emergência',
      },
    },
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-semibold mb-6">Painel do ADM</h1>
      <div className="w-full max-w-2xl">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default DashboardADM;
