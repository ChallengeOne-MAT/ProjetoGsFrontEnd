'use client';
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
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [cep, setCep] = useState('');
  const [carregandoLocalizacao, setCarregandoLocalizacao] = useState(false);

  const autoridade = autoridades.find(a => a.id === selecionada);

  const prosseguir = () => {
    if (!selecionada) {
      alert('Selecione uma autoridade');
      return;
    }

    setCarregandoLocalizacao(true);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLatitude(pos.coords.latitude);
        setLongitude(pos.coords.longitude);
        setCarregandoLocalizacao(false);
        setEtapa(2);
      },
      (erro) => {
        console.error('Erro ao obter localização:', erro);
        alert('Não foi possível obter sua localização. Verifique as permissões do navegador.');
        setCarregandoLocalizacao(false);
      }
    );
  };

  const enviar = () => {
    if (!eventoSelecionado) {
      alert('Escolha um evento');
      return;
    }

    if (latitude === null || longitude === null) {
      alert('Localização não disponível. Tente novamente.');
      return;
    }

    const novaOcorrencia = {
      id_ocorrencia: Date.now(),
      id_autoridade: autoridade?.id,
      autoridade: autoridade?.nome,
      tipo: eventoSelecionado,
      descricao,
      foto: foto?.name || null,
      latitude,
      longitude,
      cep,
      status: 'pendente',
      dataHora: new Date().toLocaleString(),
    };

    const existentes = JSON.parse(localStorage.getItem('ocorrencias') || '[]');
    existentes.push(novaOcorrencia);
    localStorage.setItem('ocorrencias', JSON.stringify(existentes));

    alert('Ocorrência registrada com sucesso!');

    // Resetar estados
    setEtapa(1);
    setSelecionada(null);
    setEventoSelecionado('');
    setDescricao('');
    setFoto(null);
    setLatitude(null);
    setLongitude(null);
    setCep('');
  };

  return (
    <main className="p-6 max-w-md mx-auto bg-black rounded-lg shadow-lg mt-10 text-white font-sans">
      {etapa === 1 && (
        <>
          <h1 className="text-3xl font-extrabold mb-6 text-orange-500 text-center tracking-wide">
            Escolha da Autoridade
          </h1>
          <ul className="space-y-4">
            {autoridades.map((a) => (
              <li
                key={a.id}
                className={`p-5 border rounded-lg cursor-pointer transition-transform duration-300 hover:scale-105 shadow-md ${
                  selecionada === a.id
                    ? 'bg-red-700 border-red-500'
                    : 'border-gray-700 hover:border-orange-500'
                }`}
                onClick={() => setSelecionada(a.id)}
              >
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-yellow-400">{a.nome}</span>
                  <a
                    href={`tel:${a.telefone}`}
                    onClick={(e) => e.stopPropagation()}
                    className="text-green-400 font-bold text-lg hover:text-green-500"
                    title={`Ligar para ${a.nome}`}
                  >
                    📞
                  </a>
                </div>
                {selecionada === a.id && (
                  <div className="mt-3 text-sm text-gray-300">
                    <strong>Emergências:</strong> {a.eventos.join(', ')}
                  </div>
                )}
              </li>
            ))}
          </ul>

          <button
            onClick={prosseguir}
            disabled={carregandoLocalizacao}
            className={`w-full mt-8 py-3 rounded-lg font-bold transition duration-300 ${
              carregandoLocalizacao
                ? 'bg-gray-500 text-white cursor-not-allowed'
                : 'bg-gradient-to-r from-red-600 via-orange-500 to-yellow-400 text-black hover:brightness-110'
            }`}
          >
            {carregandoLocalizacao ? 'Obtendo localização...' : 'Prosseguir ➜'}
          </button>
        </>
      )}

      {etapa === 2 && autoridade && (
        <>
          <h2 className="text-2xl font-extrabold text-red-500 mb-5 text-center tracking-wide">
            Situação - {autoridade.nome}
          </h2>

          <label className="block font-semibold mb-2 text-orange-400">Escolha o evento:</label>
          <select
            className="w-full p-3 border border-gray-700 rounded-lg mb-5 bg-black text-white focus:border-orange-500 focus:outline-none"
            value={eventoSelecionado}
            onChange={(e) => setEventoSelecionado(e.target.value)}
          >
            <option value="">-- Selecione --</option>
            {autoridade.eventos.map((ev, idx) => (
              <option key={idx} value={ev}>
                {ev}
              </option>
            ))}
          </select>

          <label className="block font-semibold mb-2 text-orange-400">Descrição (opcional):</label>
          <textarea
            className="w-full p-3 border border-gray-700 rounded-lg mb-5 bg-black text-white focus:border-orange-500 focus:outline-none"
            rows={4}
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            placeholder="Descreva a situação..."
          ></textarea>

          <label className="block font-semibold mb-2 text-orange-400">Foto (opcional):</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFoto(e.target.files?.[0] || null)}
            className="mb-5 text-white"
          />

          <label className="block font-semibold mb-2 text-orange-400">CEP:</label>
          <input
            type="text"
            value={cep}
            onChange={(e) => setCep(e.target.value)}
            className="w-full p-3 border border-gray-700 rounded-lg mb-6 bg-black text-white focus:border-orange-500 focus:outline-none"
            placeholder="Digite seu CEP"
          />

          <div className="flex justify-between gap-4">
            <button
              onClick={() => setEtapa(1)}
              className="w-1/2 bg-gray-700 text-yellow-400 py-3 rounded-lg hover:bg-gray-600 transition"
            >
              ◀ Voltar
            </button>
            <button
              onClick={enviar}
              className="w-1/2 bg-gradient-to-r from-red-600 via-orange-500 to-yellow-400 text-black py-3 rounded-lg font-bold hover:brightness-110 transition"
            >
              Enviar ✅
            </button>
          </div>
        </>
      )}
    </main>
  );
}
