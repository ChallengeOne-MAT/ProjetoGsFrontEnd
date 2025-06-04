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

import { useMap } from 'react-leaflet';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });

function SetViewOnCoords({ coords }: { coords: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(coords);
  }, [coords, map]);
  return null;
}

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

const autoridadeColors: Record<string, string> = {
  Bombeiros: '#dc2626',
  Suma: '#2563eb',
  Polícia: '#059669',
  Guarda: '#d97706',
  DefesaCivil: '#7c3aed',
};

const tipoColors: Record<string, string> = {
  Acidente: '#f97316',
  Incêndio: '#dc2626',
  Roubo: '#2563eb',
  Desastre: '#059669',
  Outra: '#6b7280',
};

export default function DashboardADM() {
  const [ocorrencias, setOcorrencias] = useState<Ocorrencia[]>([]);
  const [filtroTipo, setFiltroTipo] = useState<string>('Todos');
  const [filtroStatus, setFiltroStatus] = useState<string>('Todos');
  const [pagina, setPagina] = useState<number>(1);
  const [resolvendoId, setResolvendoId] = useState<string | null>(null);
  const [popupMsg, setPopupMsg] = useState<string | null>(null);
  const porPagina = 5;

  useEffect(() => {
    const dados = JSON.parse(localStorage.getItem('ocorrencias') || '[]') as Ocorrencia[];
    setOcorrencias(dados);
  }, []);

  const ocorrenciasFiltradas = ocorrencias.filter(o => {
    const tipoOk = filtroTipo === 'Todos' || o.tipo === filtroTipo;
    const statusOk = filtroStatus === 'Todos' || o.status === filtroStatus;
    return tipoOk && statusOk;
  });

  const agrupados: Record<string, number> = {};
  ocorrenciasFiltradas.forEach(o => {
    agrupados[o.tipo] = (agrupados[o.tipo] || 0) + 1;
  });

  const data = {
    labels: Object.keys(agrupados),
    datasets: [
      {
        label: 'Ocorrências',
        data: Object.values(agrupados),
        backgroundColor: Object.keys(agrupados).map(tipo => tipoColors[tipo] || '#facc15'),
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

  const tipos = ['Todos', ...Array.from(new Set(ocorrencias.map(o => o.tipo)))];
  const statusList = ['Todos', ...Array.from(new Set(ocorrencias.map(o => o.status)))];

  const marcarComoResolvida = (indexGlobal: number) => {
    if (resolvendoId) return;
    setResolvendoId(ocorrencias[indexGlobal].dataHora);
    setTimeout(() => {
      const novas = [...ocorrencias];
      novas[indexGlobal].status = 'Resolvida';
      setOcorrencias(novas);
      localStorage.setItem('ocorrencias', JSON.stringify(novas));
      setPopupMsg(`Ocorrência de ${novas[indexGlobal].autoridade} resolvida!`);
      setResolvendoId(null);
    }, 600);
    setTimeout(() => setPopupMsg(null), 3000);
  };
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
            onChange={(e) => {
              setFiltroTipo(e.target.value);
              setPagina(1);
            }}
          >
            {tipos.map((tipo, idx) => (
              <option key={idx} value={tipo}>
                {tipo}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="font-semibold mr-2 text-yellow-400">Filtrar por Status:</label>
          <select
            className="bg-gray-800 border border-gray-700 px-2 py-1 rounded text-white"
            value={filtroStatus}
            onChange={(e) => {
              setFiltroStatus(e.target.value);
              setPagina(1);
            }}
          >
            {statusList.map((s, idx) => (
              <option key={idx} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>
      <h2 className="text-2xl font-semibold mb-4 text-yellow-400">Relatório Detalhado</h2>

      <div className="overflow-auto text-sm rounded-lg shadow border border-gray-700">
        <div className="hidden md:block overflow-auto text-sm rounded-lg shadow border border-gray-700">
          <table className="w-full table-auto text-white bg-transparent rounded border border-gray-700">
            <thead className="bg-gray-900 text-yellow-400">
              <tr>
                {['Data/Hora', 'Autoridade', 'Tipo', 'Descrição', 'CEP', 'Localização', 'Foto', 'Status', 'Ação'].map(
                  (col, i) => (
                    <th key={i} className="border border-gray-700 p-2 text-sm font-semibold">
                      {col}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {ocorrenciasPaginadas.map((o, idx) => {
                const indexGlobal = ocorrencias.findIndex((oc) => oc.dataHora === o.dataHora);
                const isResolving = resolvendoId === o.dataHora;
                return (
                  <tr
                    key={idx}
                    style={{
                      borderColor: autoridadeColors[o.autoridade] || '#374151',
                      borderStyle: 'solid',
                      borderWidth: '1px',
                      transition: 'transform 0.5s ease, opacity 0.5s ease',
                      transform: isResolving ? 'translateX(100%)' : 'translateX(0)',
                      opacity: isResolving ? 0 : 1,
                    }}
                    className="text-white hover:brightness-90"
                  >
                    <td className="border border-gray-700 p-2">{o.dataHora}</td>
                    <td className="border border-gray-700 p-2 flex items-center gap-2">
                      <span>{o.autoridade}</span>
                      {o.foto && (o.foto.startsWith('http') || o.foto.startsWith('data:image')) && (
                        <Image src={o.foto} alt="Foto Autoridade" width={30} height={30} className="rounded-full object-cover" />
                      )}
                    </td>
                    <td
                      className="border border-gray-700 p-2"
                      style={{ backgroundColor: 'transparent', color: '#000' }}
                    >
                      {o.tipo}
                    </td>
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
                      {o.foto && (o.foto.startsWith('http') || o.foto.startsWith('data:image')) ? (
                        <a
                          href={o.foto}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline text-blue-400 hover:text-blue-600"
                        >
                          Ver Foto
                        </a>
                      ) : (
                        'Sem foto'
                      )}
                    </td>
                    <td className="border border-gray-700 p-2">{o.status}</td>
                    <td className="border border-gray-700 p-2 text-center">
                      {o.status !== 'Resolvida' && (
                        <button
                          disabled={!!resolvendoId}
                          onClick={() => marcarComoResolvida(indexGlobal)}
                          className="bg-orange-500 text-white px-3 py-1 rounded hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed"
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

        <div className="md:hidden space-y-4">
          {ocorrenciasPaginadas.map((o, idx) => {
            const indexGlobal = ocorrencias.findIndex((oc) => oc.dataHora === o.dataHora);
            const isResolving = resolvendoId === o.dataHora;
            return (
              <div
                key={idx}
                style={{
                  borderColor: autoridadeColors[o.autoridade] || '#374151',
                  borderStyle: 'solid',
                  borderWidth: '1px',
                  transition: 'transform 0.5s ease, opacity 0.5s ease',
                  transform: isResolving ? 'translateX(100%)' : 'translateX(0)',
                  opacity: isResolving ? 0 : 1,
                }}
                className="p-4 rounded shadow border text-white"
              >
                <p>
                  <strong className="text-yellow-400">Data/Hora:</strong> {o.dataHora}
                </p>
                <p className="flex items-center gap-2">
                  <strong className="text-yellow-400">Autoridade:</strong> {o.autoridade}
                  {o.foto && (o.foto.startsWith('http') || o.foto.startsWith('data:image')) && (
                    <Image src={o.foto} alt="Foto Autoridade" width={30} height={30} className="rounded-full object-cover" />
                  )}
                </p>
                <p style={{ backgroundColor: 'transparent', color: '#000', padding: '2px 6px', borderRadius: '4px' }}>
                  <strong className="text-yellow-400">Tipo:</strong> {o.tipo}
                </p>
                <p>
                  <strong className="text-yellow-400">Descrição:</strong> {o.descricao}
                </p>
                <p>
                  <strong className="text-yellow-400">CEP:</strong> {o.cep}
                </p>
                <p>
                  <strong className="text-yellow-400">Localização:</strong>{' '}
                  <a
                    className="text-blue-400 underline"
                    href={`https://www.google.com/maps?q=${o.latitude},${o.longitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Ver no Mapa
                  </a>
                </p>
                <p>
                  <strong className="text-yellow-400">Foto:</strong>{' '}
                  {o.foto && (o.foto.startsWith('http') || o.foto.startsWith('data:image')) ? (
                    <a
                      href={o.foto}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline text-blue-400 hover:text-blue-600"
                    >
                      Ver Foto
                    </a>
                  ) : (
                    'Sem foto'
                  )}
                </p>
                <p>
                  <strong className="text-yellow-400">Status:</strong> {o.status}
                </p>
                {o.status !== 'Resolvida' && (
                  <button
                    disabled={!!resolvendoId}
                    onClick={() => marcarComoResolvida(indexGlobal)}
                    className="mt-2 bg-orange-500 text-white px-3 py-1 rounded hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Resolver
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-6 flex justify-center flex-wrap gap-2">
        {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((num) => (
          <button
            key={num}
            onClick={() => setPagina(num)}
            className={`px-3 py-1 rounded ${
              num === pagina ? 'bg-yellow-400 text-black' : 'bg-gray-700 hover:bg-yellow-400 hover:text-black'
            }`}
          >
            {num}
          </button>
        ))}
      </div>

      {popupMsg && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded shadow-lg animate-fadeInOut">
          {popupMsg}
        </div>
      )}
    </div>
  );
}
