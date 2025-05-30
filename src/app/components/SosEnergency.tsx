  'use client'
  import Link from "next/link";
  import { useState, useEffect } from "react";
  import { Plus, X } from 'lucide-react'; // Ícones

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
            className="bg-red-600 hover:bg-red-700 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg"
            aria-label="Abrir botão SOS"
          >
            <Plus className="w-6 h-6" />
          </button>
        ) : (
          <div className="w-[90vw] max-w-md bg-white p-6 rounded-xl shadow-xl relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              aria-label="Fechar"
            >
              <X className="w-5 h-5" />
            </button>

            <h1 className="text-2xl font-bold mb-4 text-red-600 text-center">Botão SOS</h1>

        

            <Link href="/pages/autoridades">
              <h1 className="text-blue-600 underline text-sm text-center mb-4 cursor-pointer hover:text-blue-800">AUTORIDADES</h1>
            </Link>

            {mensagem && (
              <p className="mb-4 text-green-700 font-semibold text-center">{mensagem}</p>
            )}

            {erro && (
              <p className="mb-4 text-red-600 font-semibold text-center">{erro}</p>
            )}

            <h2 className="text-xl font-semibold mb-2">Contatos de Emergência</h2>

            {contatos.length === 0 && <p className="mb-4 text-gray-600">Nenhum contato cadastrado.</p>}

            <ul className="mb-6 max-h-40 overflow-y-auto border border-gray-200 rounded">
              {contatos.map((contato) => (
                <li
                  key={contato.id}
                  className="flex justify-between items-center border-b last:border-none py-2 px-2"
                >
                  <div>
                    <p className="font-semibold">{contato.nome}</p>
                    <p className="text-sm text-gray-600">{contato.telefone}</p>
                  </div>
                  <button
                    onClick={() => removerContato(contato.id)}
                    className="text-red-600 hover:text-red-800 font-bold"
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
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <input
                type="tel"
                placeholder="Telefone (ex: 11999999999 ou +5511999999999)"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                onClick={adicionarContato}
                className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition-colors duration-300"
              >
                Adicionar Contato
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
