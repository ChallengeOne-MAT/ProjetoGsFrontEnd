'use client';

import { useState } from 'react';
import BotaoVoltar from './BotaoVoltar';
import SosEnergency from './SosEnergency';
import Footer from './Footer';

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

  const validarCEP = (cep: string) => {
    const cepLimpo = cep.replace(/\D/g, '');
    return cepLimpo.length === 8;
  };

  const prosseguir = () => {
    if (!selecionada) {
      alert('Selecione uma autoridade para continuar.');
      return;
    }

    setCarregandoLocalizacao(true);

    if (!navigator.geolocation) {
      alert('Geolocalização não é suportada pelo seu navegador.');
      setCarregandoLocalizacao(false);
      return;
    }

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
      },
      { timeout: 10000 }
    );
  };

  const salvarOcorrencia = (fotoBase64: string | null) => {
    const novaOcorrencia = {
      id_ocorrencia: Date.now(),
      id_autoridade: autoridade?.id,
      autoridade: autoridade?.nome,
      tipo: eventoSelecionado,
      descricao,
      foto: fotoBase64, 
      latitude,
      longitude,
      cep,
      status: 'pendente',
      dataHora: new Date().toLocaleString(),
    };

    try {
      const existentes = JSON.parse(localStorage.getItem('ocorrencias') || '[]');
      existentes.push(novaOcorrencia);
      localStorage.setItem('ocorrencias', JSON.stringify(existentes));
      alert('Ocorrência registrada com sucesso!');

      setEtapa(1);
      setSelecionada(null);
      setEventoSelecionado('');
      setDescricao('');
      setFoto(null);
      setLatitude(null);
      setLongitude(null);
      setCep('');
    } catch (error) {
      console.error('Erro ao salvar ocorrência:', error);
      alert('Erro ao salvar a ocorrência. Tente novamente.');
    }
  };

  const enviar = () => {
    if (!eventoSelecionado) {
      alert('Escolha um evento para continuar.');
      return;
    }

    if (latitude === null || longitude === null) {
      alert('Localização não disponível. Tente novamente.');
      return;
    }

    if (cep && !validarCEP(cep)) {
      alert('CEP inválido. Por favor, insira um CEP com 8 dígitos.');
      return;
    }

    if (descricao.length > 500) {
      alert('Descrição muito longa. Limite de 500 caracteres.');
      return;
    }

    if (foto) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const fotoBase64 = reader.result as string; 
        salvarOcorrencia(fotoBase64);
      };
      reader.readAsDataURL(foto);
    } else {
      salvarOcorrencia(null);
    }
  };

  return (
    <main
      className="p-6 max-w-md mx-auto bg-black rounded-lg shadow-lg mt-10 text-white font-sans"
      role="main"
      aria-labelledby="titulo-pagina"
    >
      {etapa === 1 && (
        <>
          <h1
            id="titulo-pagina"
            className="text-3xl font-extrabold mb-6 text-orange-500 text-center tracking-wide"
          >
            Escolha da Autoridade
          </h1>
          <ul className="space-y-4" role="list" aria-label="Lista de autoridades">
            {autoridades.map((a) => (
              <li
                key={a.id}
                className={`p-5 border rounded-lg cursor-pointer transition-transform duration-300 hover:scale-105 shadow-md focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                  selecionada === a.id
                    ? 'bg-gray-600 bg-opacity-60 border-gray-500 text-yellow-300'
                    : 'border-gray-700 hover:border-orange-500 text-white'
                }`}
                onClick={() => setSelecionada(a.id)}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelecionada(a.id);
                  }
                }}
                aria-selected={selecionada === a.id}
                role="option"
              >
                <div className="flex justify-between items-center">
                  <span className="font-semibold">{a.nome}</span>
                  <a
                    href={`tel:${a.telefone}`}
                    onClick={(e) => e.stopPropagation()}
                    className="text-green-400 font-bold text-lg hover:text-green-500"
                    title={`Ligar para ${a.nome}`}
                    aria-label={`Ligar para ${a.nome}`}
                  >
                    📞
                  </a>
                </div>
                {selecionada === a.id && (
                  <div className="mt-3 text-sm text-gray-300" aria-live="polite">
                    <strong>Emergências:</strong> {a.eventos.join(', ')}
                  </div>
                )}
              </li>
            ))}
          </ul>
<div className="flex justify-center">
  <BotaoVoltar
    texto=" ◀ Voltar"
    className="w-1/2 bg-gray-700 mt-14 text-yellow-400 py-3 rounded-lg hover:bg-gray-600 transition focus:outline-none focus:ring-4 focus:ring-yellow-400"
  />
</div>
        <SosEnergency/>
            
          <button
            onClick={prosseguir}
            disabled={carregandoLocalizacao}
            className={`w-full mt-8 py-3 rounded-lg font-bold transition duration-300 focus:outline-none focus:ring-4 focus:ring-yellow-400 ${
              carregandoLocalizacao
                ? 'bg-gray-500 text-white cursor-not-allowed'
                : 'bg-gradient-to-r from-red-600 via-orange-500 to-yellow-400 text-black hover:brightness-110'
            }`}
            aria-disabled={carregandoLocalizacao}
            aria-busy={carregandoLocalizacao}
          >
            {carregandoLocalizacao ? 'Obtendo localização...' : 'Prosseguir ➜'}
          </button>
                          <Footer/>

        </>
      )}

      {etapa === 2 && autoridade && (
        <>
          <h2
            className="text-2xl font-extrabold text-red-500 mb-5 text-center tracking-wide"
            tabIndex={-1}
          >
            Situação - {autoridade.nome}
          </h2>

          <label
            htmlFor="evento-select"
            className="block font-semibold mb-2 text-orange-400"
          >
            Escolha o evento:
          </label>
          <select
            id="evento-select"
            className="w-full p-3 border border-gray-700 rounded-lg mb-5 bg-black text-white focus:border-orange-500 focus:outline-none"
            value={eventoSelecionado}
            onChange={(e) => setEventoSelecionado(e.target.value)}
            aria-required="true"
          >
            <option value="" disabled>
              -- Selecione --
            </option>
            {autoridade.eventos.map((ev, idx) => (
              <option key={idx} value={ev}>
                {ev}
              </option>
            ))}
          </select>

          <label
            htmlFor="descricao"
            className="block font-semibold mb-2 text-orange-400"
          >
            Descrição (opcional):
          </label>
          <textarea
            id="descricao"
            className="w-full p-3 border border-gray-700 rounded-lg mb-5 bg-black text-white focus:border-orange-500 focus:outline-none"
            rows={4}
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            placeholder="Descreva a situação (máx. 500 caracteres)..."
            maxLength={500}
            aria-describedby="descricao-contador"
          ></textarea>
          <div id="descricao-contador" className="text-right text-gray-400 mb-4 text-sm">
            {descricao.length} / 500
          </div>
        <SosEnergency/>

          <label
            htmlFor="foto"
            className="block font-semibold mb-2 text-orange-400"
          >
            Foto (opcional):
          </label>
          <input
            id="foto"
            type="file"
            accept="image/*"
            capture="environment"
            onChange={(e) => setFoto(e.target.files?.[0] || null)}
            className="mb-5 text-white"
            aria-describedby="foto-ajuda"
          />
          <div id="foto-ajuda" className="text-gray-400 text-sm mb-5">
            Tire uma foto com a câmera ou escolha um arquivo.
          </div>

          <label
            htmlFor="cep"
            className="block font-semibold mb-2 text-orange-400"
          >
            CEP:
          </label>
          <input
            id="cep"
            type="text"
            value={cep}
            onChange={(e) => setCep(e.target.value)}
            className="w-full p-3 border border-gray-700 rounded-lg mb-6 bg-black text-white focus:border-orange-500 focus:outline-none"
            placeholder="Digite seu CEP"
            maxLength={9}
            aria-describedby="cep-ajuda"
          />
          <div id="cep-ajuda" className="text-gray-400 text-sm mb-6">
            Formato esperado: 00000-000 ou 00000000
          </div>

          <div className="flex justify-between gap-4">
                     <BotaoVoltar texto=" ◀ Voltar" className="w-1/2 bg-gray-700 text-yellow-400 py-3 rounded-lg hover:bg-gray-600 transition focus:outline-none focus:ring-4 focus:ring-yellow-4 " />

            <button
              onClick={enviar}
              className="w-[94%] bg-gradient-to-r from-red-600 via-orange-500 to-yellow-400 text-black py-3 rounded-lg font-bold hover:brightness-110 transition focus:outline-none focus:ring-4 focus:ring-yellow-400"
            >
              Enviar ✅
            </button>
          </div>
                <Footer/>

        </>
      )}
    </main>
  );
}
