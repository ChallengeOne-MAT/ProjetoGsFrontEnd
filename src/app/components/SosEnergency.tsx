'use client'
import Link from "next/link";
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
      setErro("Por favor, preencha nome e telefone.");
      return;
    }

    if (!validarTelefone(telefone)) {
      setErro("Telefone inválido. Use o formato: 11999999999 ou +5511999999999");
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
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-white-700 hover:bg-red-800 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg shadow-red-900/70"
          aria-label="Abrir botão SOS"
        >
          <Plus className="w-6 h-6" />
        </button>
      ) : (
        <div className="w-[90vw] max-w-md bg-[#0B3B3A] p-6 rounded-xl shadow-xl relative border-4 border-orange-600">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-3 right-3 text-orange-400 hover:text-orange-600"
            aria-label="Fechar"
          >
            <X className="w-6 h-6" />
          </button>

          <h1 className="text-3xl font-extrabold mb-5 text-orange-500 text-center drop-shadow-lg">
            Botão SOS
          </h1>

          <Link href="/pages/autoridades" className="block mb-5 text-center text-orange-400 hover:text-orange-600 underline font-semibold cursor-pointer">
            AUTORIDADES
          </Link>

          {mensagem && (
            <p className="mb-5 text-green-4b00 font-semiold text-center drop-shadow-md">{mensagem}</p>
          )}

          {erro && (
            <p className="mb-5 text-red-400 font-semibold text-center drop-shadow-md">{erro}</p>
          )}

          <h2 className="text-xl font-semibold mb-3 text-orange-300">Contatos de Emergência</h2>

          {contatos.length === 0 && <p className="mb-5 text-orange-200">Nenhum contato cadastrado.</p>}

          <ul className="mb-6 max-h-40 overflow-y-auto border border-red-700 rounded bg-[#07312F] shadow-inner">
            {contatos.map((contato) => (
              <li
                key={contato.id}
                className="flex justify-between items-center border-b border-red-800 last:border-none py-3 px-3 text-orange-300"
              >
                <div>
                  <p className="font-semibold text-red-400">{contato.nome}</p>
                  <p className="text-sm text-orange-300">{contato.telefone}</p>
                </div>
                <button
                  onClick={() => removerContato(contato.id)}
                  className="text-red-600 hover:text-red-800 font-bold transition-colors duration-300"
                  aria-label={`Remover contato ${contato.nome}`}
                >
                  Remover
                </button>
              </li>
            ))}
          </ul>

          <div className="space-y-4">
            <input
              type="text"
              placeholder="Nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="w-full p-3 border border-red-600 rounded bg-[#0B3B3A] text-orange-300 placeholder-orange-400 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
            />
            <input
              type="tel"
              placeholder="Telefone (ex: 11999999999 ou +5511999999999)"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              className="w-full p-3 border border-red-600 rounded bg-[#0B3B3A] text-orange-300 placeholder-orange-400 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
            />
            <button
              onClick={adicionarContato}
              className="w-full bg-red-600 text-white py-3 rounded hover:bg-red-700 transition-colors duration-300 font-bold shadow-md shadow-red-900/50"
            >
              Adicionar Contato
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
