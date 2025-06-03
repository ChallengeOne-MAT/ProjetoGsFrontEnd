'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Home() {
  const router = useRouter();
  const [tipoSelecionado, setTipoSelecionado] = useState<null | 'usuario' | 'adm'>(null);
  const [senhaADM, setSenhaADM] = useState('');
  const [erro, setErro] = useState('');

  const senhaCorreta = 'admin123';

  const handleEntrarADM = () => {
    if (senhaADM === senhaCorreta) {
      router.push('pages/dashboard');
    } else {
      setErro('Senha incorreta');
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen px-4">
      <div className="relative w-full max-w-md sm:max-w-lg md:max-w-xl animate-float">
        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-11/12 h-4 bg-white opacity-10 rounded-full blur-md"></div>

        <div className="p-6 sm:p-8 bg-gray-900 rounded-xl shadow-xl text-white text-center">
        <h1 className="text-2xl sm:text-3xl font-extrabold mb-8 text-yellow-300 tracking-wide">
  Escolha seu perfil
</h1>

          {!tipoSelecionado && (
            <div className="flex flex-col gap-13">
              <button
                onClick={() => router.push('/pages/cadastro')}
                className="w-full py-5 rounded-lg font-bold text-lg sm:text-xl bg-gradient-to-r from-yellow-400 via-orange-500 to-red-600 text-black hover:brightness-110 transition"
              >
                Sou Usuário
              </button>

              <button
                onClick={() => setTipoSelecionado('adm')}
                className="w-full py-5 rounded-lg font-bold text-lg sm:text-xl bg-gradient-to-r from-red-600 via-orange-500 to-yellow-400 text-black hover:brightness-110 transition"
              >
                Sou ADM
              </button>
            </div>
          )}

          {tipoSelecionado === 'adm' && (
            <div className="mt-6">
              <h2 className="text-lg sm:text-xl font-semibold text-orange-400 mb-4">Digite a senha de ADM</h2>
              <input
                type="password"
                value={senhaADM}
                onChange={(e) => setSenhaADM(e.target.value)}
                placeholder="Senha"
                className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white mb-4"
              />
              <button
                onClick={handleEntrarADM}
                className="w-full py-3 rounded-lg font-bold bg-gradient-to-r from-orange-500 to-yellow-400 text-black hover:brightness-110 transition"
              >
                Entrar como ADM
              </button>
              {erro && <p className="text-red-500 mt-2">{erro}</p>}

              <button
                onClick={() => {
                  setTipoSelecionado(null);
                  setSenhaADM('');
                  setErro('');
                }}
                className="mt-4 text-sm text-gray-400 hover:underline"
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
      `}</style>
    </main>
  );
}
