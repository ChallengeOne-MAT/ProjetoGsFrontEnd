'use client';
import { useState } from 'react';

export default function Buttonsos() {
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");

  const acionarSOS = () => {
    setErro("");
    setMensagem("");

    const dados = localStorage.getItem("contatosEmergencia");
    if (!dados) {
      setErro("Nenhum contato cadastrado.");
      return;
    }

    const contatos = JSON.parse(dados);

    if (!navigator.geolocation) {
      setErro("Geolocalização não suportada.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;

        contatos.forEach((contato: any) => {
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
