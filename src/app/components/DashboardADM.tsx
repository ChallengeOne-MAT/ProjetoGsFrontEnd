'use client';
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
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
  Polícia: '#2563eb',   
  Samu: '#facc15',      
  Zoonoses: '#facc15',  
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

  const agrupadosPorAutoridade: Record<string, number> = {};
  ocorrenciasFiltradas.forEach(o => {
    agrupadosPorAutoridade[o.autoridade] = (agrupadosPorAutoridade[o.autoridade] || 0) + 1;
  });

  const data = {
    labels: Object.keys(agrupadosPorAutoridade),
    datasets: [
      {
        label: 'Ocorrências',
        data: Object.values(agrupadosPorAutoridade),
        backgroundColor: Object.keys(agrupadosPorAutoridade).map(autoridade => autoridadeColors[autoridade] || '#facc15'),
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
        text: 'Gráfico de Ocorrências por Autoridade',
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
        <table className="w-full table-auto text-white bg-transparent rounded border border-gray-700 hidden md:table">
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
                  <td className="border border-gray-700 p-2 flex items-center gap-1">
                    <span
                      className="inline-block w-3 h-3 rounded-full"
                      style={{ backgroundColor: autoridadeColors[o.autoridade] || '#facc15' }}
                    />
                    {o.autoridade}
                  </td>
                  <td className="border border-gray-700 p-2">{o.tipo}</td>
                  <td className="border border-gray-700 p-2">{o.descricao}</td>
                  <td className="border border-gray-700 p-2">{o.cep}</td>
                  <td className="border border-gray-700 p-2">
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${o.latitude},${o.longitude}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-yellow-400 hover:underline"
                      aria-label={`Abrir localização de ${o.tipo} no Google Maps`}
                    >
                      Ver Mapa
                    </a>
                  </td>
                  <td className="border border-gray-700 p-2">
                    {o.foto ? (
                      <a
                        href={o.foto}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-yellow-400 hover:underline"
                        aria-label={`Abrir foto da ocorrência de ${o.tipo}`}
                      >
                        Foto
                      </a>
                    ) : (
                      '-'
                    )}
                  </td>
                  <td className="border border-gray-700 p-2">{o.status}</td>
                  <td className="border border-gray-700 p-2 text-center">
                    <button
                      onClick={() => marcarComoResolvida(indexGlobal)}
                      disabled={o.status === 'Resolvida' || isResolving}
                      className={`bg-yellow-400 text-black font-semibold rounded px-4 py-2 text-lg hover:bg-yellow-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors`}
                      aria-label={`Marcar ocorrência de ${o.tipo} como resolvida`}
                    >
                      Marcar Resolvida
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className="md:hidden flex flex-col gap-8">
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
                className="p-3 rounded bg-gray-900 shadow"
              >
                <p className="mb-1">
                  <strong>Data/Hora:</strong> {o.dataHora}
                </p>
                <p className="mb-1 flex items-center gap-1">
                  <strong>Autoridade:</strong>{' '}
                  <span
                    className="inline-block w-3 h-3 rounded-full"
                    style={{ backgroundColor: autoridadeColors[o.autoridade] || '#facc15' }}
                  />
                  {o.autoridade}
                </p>
                <p className="mb-1">
                  <strong>Tipo:</strong> {o.tipo}
                </p>
                <p className="mb-1">
                  <strong>Descrição:</strong> {o.descricao}
                </p>
                <p className="mb-1">
                  <strong>CEP:</strong> {o.cep}
                </p>
                <p className="mb-1">
                  <strong>Localização:</strong>{' '}
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${o.latitude},${o.longitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-yellow-400 hover:underline"
                    aria-label={`Abrir localização de ${o.tipo} no Google Maps`}
                  >
                    Ver Mapa
                  </a>
                </p>
                <p className="mb-1">
                  <strong>Foto:</strong>{' '}
                  {o.foto ? (
                    <a
                      href={o.foto}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-yellow-400 hover:underline"
                      aria-label={`Abrir foto da ocorrência de ${o.tipo}`}
                    >
                      Foto
                    </a>
                  ) : (
                    '-'
                  )}
                </p>
                <p className="mb-3">
                  <strong>Status:</strong> {o.status}
                </p>
                <button
                  onClick={() => marcarComoResolvida(indexGlobal)}
                  disabled={o.status === 'Resolvida' || isResolving}
                  className={`bg-yellow-400 text-black font-semibold rounded px-4 py-2 text-lg hover:bg-yellow-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors mt-4 w-full`}
                  aria-label={`Marcar ocorrência de ${o.tipo} como resolvida`}
                >
                  Marcar Resolvida
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-6 flex justify-center gap-3 text-yellow-400">
        <button
          onClick={() => setPagina(p => Math.max(1, p - 1))}
          disabled={pagina === 1}
          aria-label="Página anterior"
          className="font-bold text-lg disabled:opacity-40 disabled:cursor-not-allowed"
        >
          &lt;
        </button>
        {[...Array(totalPaginas)].map((_, i) => (
          <button
            key={i}
            onClick={() => setPagina(i + 1)}
            className={`px-3 py-1 rounded ${
              pagina === i + 1 ? 'bg-yellow-400 text-black font-bold' : 'hover:bg-yellow-600'
            }`}
            aria-label={`Ir para página ${i + 1}`}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => setPagina(p => Math.min(totalPaginas, p + 1))}
          disabled={pagina === totalPaginas}
          aria-label="Próxima página"
          className="font-bold text-lg disabled:opacity-40 disabled:cursor-not-allowed"
        >
          &gt;
        </button>
      </div>

      {popupMsg && (
        <div
          className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-black px-6 py-3 rounded shadow-lg text-center font-bold animate-fade-in-out"
          role="alert"
        >
          {popupMsg}
        </div>
      )}
    </div>
  );
}
