'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Home() {
  const router = useRouter();
  const [tipoSelecionado, setTipoSelecionado] = useState<null | 'usuario' | 'adm'>(null);
  const [cpfADM, setCpfADM] = useState('');
  const [senhaADM, setSenhaADM] = useState('');
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(false);

  const cpfCorretoADM = '987.654.321-00';
  const senhaCorretaADM = 'admin123';

  const handleEntrarUsuario = async () => {
    setLoading(true);
    setErro('');
    await new Promise((res) => setTimeout(res, 1000));
    setLoading(false);
    router.push('/pages/cadastro');
  };

  const handleEntrarADM = async () => {
    setLoading(true);
    setErro('');
    await new Promise((res) => setTimeout(res, 1000));

    if (cpfADM === cpfCorretoADM && senhaADM === senhaCorretaADM) {
      setLoading(false);
      router.push('/pages/dashboard');
    } else {
      setLoading(false);
      setErro('CPF ou senha incorretos');
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen px-4 bg-black">
      <div className="relative w-full max-w-md sm:max-w-lg md:max-w-xl animate-float">
        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-11/12 h-4 bg-white opacity-10 rounded-full blur-md"></div>

        <div className="p-6 sm:p-8 bg-gray-900 rounded-xl shadow-xl text-white text-center">
          <h1 className="text-2xl sm:text-3xl font-extrabold mb-8 text-yellow-300 tracking-wide">
            Escolha seu perfil
          </h1>

          {!tipoSelecionado && (
            <div className="flex flex-col gap-6">
              <button
                onClick={handleEntrarUsuario}
                disabled={loading}
                className={`w-full py-5 rounded-lg font-bold text-lg sm:text-xl bg-gradient-to-r from-yellow-400 via-orange-500 to-red-600 text-black hover:brightness-110 transition ${
                  loading ? 'cursor-not-allowed brightness-90' : ''
                }`}
              >
                {loading ? <Spinner /> : 'Sou Usuário'}
              </button>

              <button
                onClick={() => setTipoSelecionado('adm')}
                disabled={loading}
                className={`w-full py-5 rounded-lg font-bold text-lg sm:text-xl bg-gradient-to-r from-red-600 via-orange-500 to-yellow-400 text-black hover:brightness-110 transition ${
                  loading ? 'cursor-not-allowed brightness-90' : ''
                }`}
              >
                Sou ADM
              </button>
            </div>
          )}

          {tipoSelecionado === 'adm' && (
            <div className="mt-6">
              <h2 className="text-lg sm:text-xl font-semibold text-orange-400 mb-4">Digite seu CPF e a senha de ADM</h2>
              <input
                type="text"
                value={cpfADM}
                onChange={(e) => setCpfADM(e.target.value)}
                placeholder="CPF do ADM"
                className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white mb-4"
                disabled={loading}
              />
              <input
                type="password"
                value={senhaADM}
                onChange={(e) => setSenhaADM(e.target.value)}
                placeholder="Senha"
                className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white mb-4"
                disabled={loading}
              />
              <button
                onClick={handleEntrarADM}
                disabled={loading}
                className={`w-full py-3 rounded-lg font-bold bg-gradient-to-r from-orange-500 to-yellow-400 text-black hover:brightness-110 transition flex justify-center items-center ${
                  loading ? 'cursor-not-allowed brightness-90' : ''
                }`}
              >
                {loading ? <Spinner /> : 'Entrar como ADM'}
              </button>
              {erro && <p className="text-red-500 mt-2">{erro}</p>}

              <button
                onClick={() => {
                  setTipoSelecionado(null);
                  setCpfADM('');
                  setSenhaADM('');
                  setErro('');
                  setLoading(false);
                }}
                className="mt-4 text-sm text-gray-400 hover:underline"
                disabled={loading}
              >
                ⬅ Voltar
              </button>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
          100% {
            transform: translateY(0px);
          }
        }

        .animate-float {
          animation: float 4s ease-in-out infinite;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        .spinner {
          border: 3px solid transparent;
          border-top-color: black;
          border-radius: 50%;
          width: 18px;
          height: 18px;
          animation: spin 1s linear infinite;
          margin-left: 8px;
          margin-right: 8px;
        }
      `}</style>
    </main>
  );
}

function Spinner() {
  return <div className="spinner">Carregando...</div>;
}
