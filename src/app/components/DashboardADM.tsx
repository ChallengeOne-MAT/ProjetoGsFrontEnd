'use client';
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import 'leaflet/dist/leaflet.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Map = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });

interface Ocorrencia {
  dataHora: string;
  autoridade: string;
  tipo: string;
  descricao: string;
  cep: string;
  latitude: number;
  longitude: number;
  foto?: string;
  status: string;
}

export default function DashboardADM() {
  const [ocorrencias, setOcorrencias] = useState<Ocorrencia[]>([]);
  const [filtroTipo, setFiltroTipo] = useState<string>('Todos');
  const [filtroStatus, setFiltroStatus] = useState<string>('Todos');
  const [pagina, setPagina] = useState<number>(1);
  const porPagina = 5;

  useEffect(() => {
    const dados = JSON.parse(localStorage.getItem('ocorrencias') || '[]') as Ocorrencia[];
    setOcorrencias(dados);
  }, []);

  const ocorrenciasFiltradas = ocorrencias.filter((o) => {
    const tipoOk = filtroTipo === 'Todos' || o.tipo === filtroTipo;
    const statusOk = filtroStatus === 'Todos' || o.status === filtroStatus;
    return tipoOk && statusOk;
  });

  const agrupados: Record<string, number> = {};
  ocorrenciasFiltradas.forEach((o) => {
    agrupados[o.tipo] = (agrupados[o.tipo] || 0) + 1;
  });

  const data = {
    labels: Object.keys(agrupados),
    datasets: [
      {
        label: 'Ocorrências',
        data: Object.values(agrupados),
        backgroundColor: ['#facc15', '#ef4444', '#f97316', '#6b7280', '#1f2937'],
        borderColor: '#e5e7eb',
        borderWidth: 1,
      },
    ],
  };

  const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#facc15',
        },
      },
      title: {
        display: true,
        text: 'Gráfico de Ocorrências',
        color: '#facc15',
      },
    },
    scales: {
      x: {
        ticks: { color: '#e5e7eb' },
        grid: { color: '#374151' },
      },
      y: {
        ticks: { color: '#e5e7eb' },
        grid: { color: '#374151' },
      },
    },
  };

  const totalPaginas = Math.ceil(ocorrenciasFiltradas.length / porPagina);
  const inicio = (pagina - 1) * porPagina;
  const fim = inicio + porPagina;
  const ocorrenciasPaginadas = ocorrenciasFiltradas.slice(inicio, fim);

  const tipos = ['Todos', ...Array.from(new Set(ocorrencias.map((o) => o.tipo)))];
  const statusList = ['Todos', ...Array.from(new Set(ocorrencias.map((o) => o.status)))];

  const marcarComoResolvida = (indexGlobal: number) => {
    const novas = [...ocorrencias];
    novas[indexGlobal].status = 'Resolvida';
    setOcorrencias(novas);
    localStorage.setItem('ocorrencias', JSON.stringify(novas));
  };

  const ultimaOcorrencia = ocorrencias[ocorrencias.length - 1];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 text-white p-4 md:p-6 lg:p-10 font-sans">
      <h1 className="text-4xl font-bold text-center mb-10 text-yellow-400">Painel do Administrador</h1>

      <div className="mb-10 bg-gray-900 p-4 rounded shadow w-full h-[350px] sm:h-[400px] md:h-[450px]">
        <Bar data={data} options={options} />
      </div>

      <div className="flex flex-wrap gap-4 mb-6">
        <div>
          <label className="font-semibold mr-2 text-yellow-400">Filtrar por Tipo:</label>
          <select
            className="bg-gray-800 border border-gray-700 px-2 py-1 rounded text-white"
            value={filtroTipo}
            onChange={(e) => setFiltroTipo(e.target.value)}
          >
            {tipos.map((tipo, idx) => (
              <option key={idx} value={tipo}>{tipo}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="font-semibold mr-2 text-yellow-400">Filtrar por Status:</label>
          <select
            className="bg-gray-800 border border-gray-700 px-2 py-1 rounded text-white"
            value={filtroStatus}
            onChange={(e) => setFiltroStatus(e.target.value)}
          >
            {statusList.map((s, idx) => (
              <option key={idx} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      <h2 className="text-2xl font-semibold mb-4 text-yellow-400">Relatório Detalhado</h2>
      <div className="overflow-auto text-sm rounded-lg shadow border border-gray-700">
        <table className="w-full table-auto text-white bg-gray-800 rounded">
          <thead className="bg-gray-900 text-yellow-400">
            <tr>
              {['Data/Hora', 'Autoridade', 'Tipo', 'Descrição', 'CEP', 'Localização', 'Foto', 'Status', 'Ação'].map((col, i) => (
                <th key={i} className="border border-gray-700 p-2 text-sm font-semibold">{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ocorrenciasPaginadas.map((o, idx) => {
              const indexGlobal = ocorrencias.findIndex((oc) => oc.dataHora === o.dataHora);
              return (
                <tr key={idx} className="hover:bg-gray-700">
                  <td className="border border-gray-700 p-2">{o.dataHora}</td>
                  <td className="border border-gray-700 p-2">{o.autoridade}</td>
                  <td className="border border-gray-700 p-2">{o.tipo}</td>
                  <td className="border border-gray-700 p-2">{o.descricao}</td>
                  <td className="border border-gray-700 p-2">{o.cep}</td>
                  <td className="border border-gray-700 p-2">
                    <a
                      className="text-blue-400 underline"
                      href={`https://www.google.com/maps?q=${o.latitude},${o.longitude}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Ver no Mapa
                    </a>
                  </td>
                  <td className="border border-gray-700 p-2">
                    {o.foto ? (
                      <Image
                        src={o.foto}
                        alt="Foto"
                        width={80}
                        height={80}
                        className="object-cover rounded"
                      />
                    ) : 'Sem foto'}
                  </td>
                  <td className="border border-gray-700 p-2">{o.status}</td>
                  <td className="border border-gray-700 p-2 text-center">
                    {o.status !== 'Resolvida' && (
                      <button
                        onClick={() => marcarComoResolvida(indexGlobal)}
                        className="bg-orange-500 text-white px-3 py-1 rounded hover:bg-orange-600"
                      >
                        Resolver
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex justify-center flex-wrap gap-2">
        {Array.from({ length: totalPaginas }, (_, i) => (
          <button
            key={i}
            onClick={() => setPagina(i + 1)}
            className={`px-3 py-1 rounded border font-semibold ${
              pagina === i + 1
                ? 'bg-yellow-400 text-black'
                : 'bg-gray-800 text-white hover:bg-gray-700'
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-4 text-yellow-400">Última Localização Registrada</h2>
        <div className="w-full h-[300px] md:h-[400px] lg:h-[500px] border border-white rounded overflow-hidden">
          {ultimaOcorrencia && (
            <Map
              center={[ultimaOcorrencia.latitude, ultimaOcorrencia.longitude]}
              zoom={15}
              scrollWheelZoom={false}
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker position={[ultimaOcorrencia.latitude, ultimaOcorrencia.longitude]} />
            </Map>
          )}
        </div>
      </div>
    </div>
  );
}
