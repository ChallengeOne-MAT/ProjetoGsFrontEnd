'use client';
import Image from 'next/image';

import { useEffect, useState } from 'react';
import BotaoVoltar from './BotaoVoltar';

interface Ocorrencia {
  id_ocorrencia: number;
  id_autoridade: number;
  autoridade: string;
  tipo: string;
  descricao: string;
  foto: string | null;
  latitude: number | null;
  longitude: number | null;
  cep: string;
  status: string;
  dataHora: string;
}

export default function HistoricoAcoes() {
  const [ocorrencias, setOcorrencias] = useState<Ocorrencia[]>([]);

  useEffect(() => {
    const dados = localStorage.getItem('ocorrencias');
    if (dados) {
      setOcorrencias(JSON.parse(dados));
    }
  }, []);

  return (
    <main className="p-6 max-w-3xl mx-auto bg-black text-white mt-10 rounded-lg shadow-lg w-full">
      <div className="flex justify-center items-center h-[200px]">
  <Image
    src="/icons/imgicon1.jpeg"
    alt="Logo"
    width={130}
    height={20}
  />
</div>

      <h1 className="text-3xl mb-[20%] font-extrabold text-yellow-400 text-center">Histórico de Ocorrências</h1>

      {ocorrencias.length === 0 ? (
        <p className="text-center text-gray-400">Nenhuma ocorrência registrada ainda.</p>
      ) : (
        <ul className="space-y-6">
          {ocorrencias.map((ocorrencia) => (
            <li
              key={ocorrencia.id_ocorrencia}
              className="border border-gray-600 rounded-lg p-4 bg-gray-900"
            >
              <h2 className="text-xl font-bold text-orange-400 mb-2">
                {ocorrencia.tipo} - {ocorrencia.autoridade}
              </h2>
              <p className="text-sm text-gray-300 mb-1"><strong>Data/Hora:</strong> {ocorrencia.dataHora}</p>
              {ocorrencia.descricao && (
                <p className="text-sm text-gray-300 mb-1"><strong>Descrição:</strong> {ocorrencia.descricao}</p>
              )}
              {ocorrencia.cep && (
                <p className="text-sm text-gray-300 mb-1"><strong>CEP:</strong> {ocorrencia.cep}</p>
              )}
              {ocorrencia.foto && (
                <div className="mt-3">
                  <p className="text-sm text-gray-400 mb-1">Foto enviada:</p>
                  <img
                    src={ocorrencia.foto}
                    alt="Foto da ocorrência"
                    className="w-full max-h-60 object-cover rounded border border-gray-700"
                  />
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
      <div className="mt-20 w-full flex justify-center">
        <BotaoVoltar />
      </div>
    </main>
  );
}
