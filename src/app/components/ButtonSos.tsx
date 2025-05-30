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
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");

  const acionarSOS = () => {
    setErro("");
    setMensagem("");

    let listaContatos: Contato[] = [];

    if (contatos && contatos.length > 0) {
      listaContatos = contatos;
    } else {
      const dados = localStorage.getItem("contatosEmergencia");
      if (!dados) {
        setErro("Nenhum contato cadastrado.");
        return;
      }

      try {
        listaContatos = JSON.parse(dados);
      } catch {
        setErro("Erro ao ler contatos salvos.");
        return;
      }
    }

    if (!navigator.geolocation) {
      setErro("Geolocalização não suportada.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;

        listaContatos.forEach((contato) => {
          alert(`Mensagem enviada para ${contato.nome} (${contato.telefone}) com localização: https://maps.google.com/?q=${latitude},${longitude}`);
        });

        setMensagem("SOS acionado com sucesso!");
      },
      () => {
        setErro("Erro ao obter localização.");
      }
    );
  };

  return (
    <div>
      <button
        onClick={acionarSOS}
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
      >
        SOS
      </button>

      {mensagem && <p className="text-green-600 mt-2">{mensagem}</p>}
      {erro && <p className="text-red-600 mt-2">{erro}</p>}
    </div>
  );
}
