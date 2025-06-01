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

        const linkMapa = `https://maps.google.com/?q=${latitude},${longitude}`;
        const texto = encodeURIComponent(
          `🚨 ALERTA DE EMERGÊNCIA 🚨\n\nRecebemos um pedido de socorro agora.\n\n📍 Localização: ${linkMapa}\n\n⚠️ Entre em contato imediatamente!`
        );

        listaContatos.forEach((contato) => {
          const tel = contato.telefone.replace(/\D/g, "");
          const linkWhats = `https://wa.me/${tel}?text=${texto}`;
          window.open(linkWhats, "_blank");
        });

        const telefoneADM = "+5511915353752"; 
        const linkADM = `https://wa.me/${telefoneADM.replace(/\D/g, "")}?text=${texto}`;
        window.open(linkADM, "_blank");

        setMensagem("Mensagens de emergência foram preparadas no WhatsApp.");
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
        className="bg-red-600 text-white px-6 py-3 rounded hover:bg-red-700 font-bold text-lg"
      >
        🚨 Acionar SOS
      </button>

      {mensagem && <p className="text-green-600 mt-3">{mensagem}</p>}
      {erro && <p className="text-red-600 mt-3">{erro}</p>}
    </div>
  );
}
