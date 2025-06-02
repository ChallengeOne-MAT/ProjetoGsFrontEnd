'use client';
import { useState } from 'react';

type Contato = {
  nome: string;
  telefone: string;
};

type ButtonSosProps = {
  contatos?: Contato[];
};

export default function ButtonSos({ contatos }: ButtonSosProps) {
  const [mensagem, setMensagem] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  const acionarSOS = () => {
    setErro('');
    setMensagem('');
    setCarregando(true);

    let listaContatos: Contato[] = [];

    if (contatos && contatos.length > 0) {
      listaContatos = contatos;
    } else {
      const dados = localStorage.getItem('contatosEmergencia');
      if (!dados) {
        setErro('Nenhum contato cadastrado.');
        setCarregando(false);
        return;
      }
      try {
        listaContatos = JSON.parse(dados);
      } catch {
        setErro('Erro ao ler contatos salvos.');
        setCarregando(false);
        return;
      }
    }

    if (!navigator.geolocation) {
      setErro('Geolocalização não suportada pelo navegador.');
      setCarregando(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        const linkMapa = `https://maps.google.com/?q=${latitude},${longitude}`;

        try {
          const response = await fetch('/api/notificar-contatos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contatos: listaContatos, linkMapa }),
          });

          const data = await response.json();

          if (response.ok && data.sucesso) {
            setMensagem('Mensagens enviadas automaticamente via WhatsApp.');
          } else {
            setErro(data.erro || 'Erro ao enviar mensagens.');
          }
        } catch {
          setErro('Erro de conexão com o servidor.');
        }

        setCarregando(false);
      },
      () => {
        setErro('Erro ao obter localização.');
        setCarregando(false);
      }
    );
  };

  return (
    <div>
      <button
        onClick={acionarSOS}
        disabled={carregando}
        className={`bg-red-600 text-white px-6 py-3 rounded font-bold text-lg hover:bg-red-700 ${
          carregando ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {carregando ? 'Enviando...' : '🚨 Acionar SOS'}
      </button>

      {mensagem && <p className="text-green-600 mt-3">{mensagem}</p>}
      {erro && <p className="text-red-600 mt-3">{erro}</p>}
    </div>
  );
}
