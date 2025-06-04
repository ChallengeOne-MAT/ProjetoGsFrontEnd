'use client'
import { useState, useEffect } from "react";
import { Plus, X } from 'lucide-react';

type Contato = {
  id: number;
  nome: string;
  telefone: string;
};

export default function TelaSOS() {
  const [contatos, setContatos] = useState<Contato[]>([]);
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const dados = localStorage.getItem("contatosEmergencia");
    if (dados) setContatos(JSON.parse(dados));
  }, []);

  const salvarContatos = (novosContatos: Contato[]) => {
    setContatos(novosContatos);
    localStorage.setItem("contatosEmergencia", JSON.stringify(novosContatos));
  };

  const validarTelefone = (telefone: string) => {
    const telLimpo = telefone.replace(/\D/g, "");
    const regex = /^(55)?\d{11}$/;
    return regex.test(telLimpo);
  };

  const adicionarContato = () => {
    setErro(null);
    setMensagem("");

    if (!nome.trim() || !telefone.trim()) {
      setErro("Preencha nome e telefone.");
      return;
    }

    if (!validarTelefone(telefone)) {
      setErro("Telefone inválido. Use: 11999999999 ou +5511999999999");
      return;
    }

    let telLimpo = telefone.replace(/\D/g, "");
    if (!telLimpo.startsWith("55")) {
      telLimpo = "55" + telLimpo;
    }
    telLimpo = "+" + telLimpo;

    const novo: Contato = {
      id: Date.now(),
      nome,
      telefone: telLimpo,
    };

    const novosContatos = [...contatos, novo];
    salvarContatos(novosContatos);
    setNome("");
    setTelefone("");
    setMensagem("Contato adicionado com sucesso!");
  };

  const removerContato = (id: number) => {
    const novosContatos = contatos.filter((c) => c.id !== id);
    salvarContatos(novosContatos);
    setMensagem("Contato removido.");
    setErro(null);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-red-700 hover:bg-red-800 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg shadow-red-900/50 transition-transform hover:scale-105"
          aria-label="Abrir botão SOS"
        >
          <Plus className="w-6 h-6" />
        </button>
      ) : (
        <div className="w-[90vw] max-w-md bg-[#111] p-6 rounded-2xl shadow-2xl border border-orange-600 relative animate-fadeIn text-white">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 text-orange-400 hover:text-orange-500 transition"
            aria-label="Fechar"
          >
            <X className="w-6 h-6" />
          </button>

          <h1 className="text-2xl font-bold mb-6 text-orange-500 text-center tracking-wide">
            Contatos de Emergência
          </h1>

          {mensagem && (
            <p className="mb-4 text-green-400 text-center font-medium">{mensagem}</p>
          )}

          {erro && (
            <p className="mb-4 text-red-400 text-center font-medium">{erro}</p>
          )}

          <h2 className="text-lg font-bold mb-3 text-orange-500">Contatos:</h2>

          {contatos.length === 0 && (
            <p className="mb-4 text-white">Nenhum contato cadastrado.</p>
          )}

          <ul className="mb-5 max-h-48 overflow-y-auto divide-y divide-[#222] rounded-md border border-orange-600 bg-[#1a1a1a]">
            {contatos.map((contato) => (
              <li
                key={contato.id}
                className="flex justify-between items-center px-4 py-3"
              >
                <div>
                  <p className="font-semibold text-white">{contato.nome}</p>
                  <p className="text-sm text-white">{contato.telefone}</p>
                </div>
                <button
                  onClick={() => removerContato(contato.id)}
                  className="text-red-400 hover:text-red-600 text-sm font-medium transition"
                >
                  Remover
                </button>
              </li>
            ))}
          </ul>

          <div className="space-y-4">
            <label className="block text-orange-500 font-bold">Nome:</label>
            <input
              type="text"
              placeholder="Nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="w-full px-4 py-3 border border-orange-500 rounded-lg bg-[#1a1a1a] text-white placeholder-orange-300 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
            />
            <label className="block text-orange-500 font-bold">Telefone:</label>
            <input
              type="tel"
              placeholder="11999999999 ou +5511999999999"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              className="w-full px-4 py-3 border border-orange-500 rounded-lg bg-[#1a1a1a] text-white placeholder-orange-300 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
            />
            <button
              onClick={adicionarContato}
              className="w-full bg-red-700 text-white py-3 rounded-lg hover:bg-red-800 transition font-semibold shadow-md shadow-red-900/40"
            >
              Adicionar Contato
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
