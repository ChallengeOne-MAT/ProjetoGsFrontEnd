'use client'
import { useState } from 'react';

const autoridades = [
  { id: 1, nome: 'Bombeiros', telefone: '193', eventos: ['Incêndio', 'Resgate', 'Alagamento'] },
  { id: 2, nome: 'Polícia', telefone: '190', eventos: ['Assalto', 'Violência', 'Perturbação'] },
  { id: 3, nome: 'Controle de Zoonoses', telefone: '0800-000-000', eventos: ['Animal perdido', 'Animal agressivo'] },
  { id: 4, nome: 'SAMU', telefone: '192', eventos: ['Desmaio', 'Acidente', 'Dor intensa'] },
];

export default function TelaEmergencia() {
  const [etapa, setEtapa] = useState(1);
  const [selecionada, setSelecionada] = useState<number | null>(null);
  const [eventoSelecionado, setEventoSelecionado] = useState('');
  const [descricao, setDescricao] = useState('');
  const [foto, setFoto] = useState<File | null>(null);

  const autoridade = autoridades.find(a => a.id === selecionada);

  const prosseguir = () => {
    if (!selecionada) {
      alert('Selecione uma autoridade');
      return;
    }
    setEtapa(2);
  };

  const enviar = () => {
    if (!eventoSelecionado) {
      alert('Escolha um evento');
      return;
    }

    console.log({
      autoridade: autoridade?.nome,
      evento: eventoSelecionado,
      descricao,
      foto
    });

    alert('Dados enviados com sucesso!');
    setEtapa(1);
    setSelecionada(null);
    setEventoSelecionado('');
    setDescricao('');
    setFoto(null);
  };

  return (
    <main className="p-6 max-w-md mx-auto bg-white rounded shadow mt-10 transition-all duration-500 ease-in-out">
      {etapa === 1 && (
        <>
          <h1 className="text-2xl font-bold mb-6 text-blue-700 text-center animate-fade-in">
            Escolha da Autoridade
          </h1>
          <ul className="space-y-3">
            {autoridades.map((a) => (
              <li
                key={a.id}
                className={`p-4 border rounded cursor-pointer transition-all duration-300 hover:scale-105 shadow-sm ${
                  selecionada === a.id ? 'bg-blue-100 border-blue-600 shadow-md' : 'border-gray-300'
                }`}
                onClick={() => setSelecionada(a.id)}
              >
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-800">{a.nome}</span>
                  <a
                    href={`tel:${a.telefone}`}
                    className="text-green-600 font-bold hover:underline"
                    onClick={(e) => e.stopPropagation()}
                    aria-label={`Ligar para ${a.nome}`}
                  >
                    📞
                  </a>
                </div>
                {selecionada === a.id && (
                  <div className="mt-2 text-sm text-gray-600 animate-fade-in">
                    <strong>Emergências:</strong> {a.eventos.join(', ')}
                  </div>
                )}
              </li>
            ))}
          </ul>
          <button
            onClick={prosseguir}
            className="w-full mt-6 bg-blue-600 text-white py-3 rounded font-semibold hover:bg-blue-700 transition-colors duration-300"
          >
            Prosseguir ➜
          </button>
        </>
      )}

      {etapa === 2 && autoridade && (
        <>
          <h2 className="text-xl font-semibold text-blue-700 mb-4 text-center animate-fade-in">
            Situação - {autoridade.nome}
          </h2>

          <label className="block font-medium mb-2">Escolha o evento:</label>
          <select
            className="w-full p-2 border rounded mb-4"
            value={eventoSelecionado}
            onChange={(e) => setEventoSelecionado(e.target.value)}
          >
            <option value="">-- Selecione --</option>
            {autoridade.eventos.map((ev, idx) => (
              <option key={idx} value={ev}>{ev}</option>
            ))}
          </select>

          <label className="block font-medium mb-2">Descrição (opcional):</label>
          <textarea
            className="w-full p-2 border rounded mb-4"
            rows={4}
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            placeholder="Descreva a situação..."
          ></textarea>

          <label className="block font-medium mb-2">Foto (opcional):</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFoto(e.target.files?.[0] || null)}
            className="mb-4"
          />

          <div className="flex justify-between gap-4">
            <button
              onClick={() => setEtapa(1)}
              className="w-1/2 bg-gray-400 text-white py-2 rounded hover:bg-gray-500 transition-colors duration-300"
            >
              ◀ Voltar
            </button>
            <button
              onClick={enviar}
              className="w-1/2 bg-green-600 text-white py-2 rounded hover:bg-green-700 transition-colors duration-300"
            >
              Enviar ✅
            </button>
          </div>
        </>
      )}
    </main>
  );
}
