'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function EscolhaPerfil() {
  const [tipoUsuario, setTipoUsuario] = useState<"usuario" | "adm" | null>(null);
  const [senhaADM, setSenhaADM] = useState('');
  const [carregando, setCarregando] = useState(false);
  const router = useRouter();

  const senhaCorreta = 'admin123';

  useEffect(() => {
    if (carregando && tipoUsuario === 'usuario') {
      const timer = setTimeout(() => {
        setCarregando(false);
        router.push('/pages/cadastro'); // redireciona para o cadastro
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [carregando, tipoUsuario, router]);

  const handleTipoSelecionado = (tipo: "usuario" | "adm") => {
    setTipoUsuario(tipo);
    setCarregando(tipo === 'usuario');
  };

  const handleLoginADM = () => {
    if (senhaADM === senhaCorreta) {
      router.push('/dashboard'); // redireciona para o dashboard
    }
  };

  if (carregando) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="text-center">
          <div className="w-20 h-20 border-4 border-yellow-500 border-dashed rounded-full animate-spin mx-auto"></div>
          <p className="mt-6 text-yellow-400 text-xl font-semibold">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8 bg-black text-white">
      <div className="text-6xl mb-6">🚨</div>
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-yellow-400 text-center">
        Você é Usuário ou ADM?
      </h1>

      <div className="bg-gray-800 p-6 md:p-8 rounded-2xl shadow-lg w-full max-w-md md:max-w-lg border border-gray-700">
        {!tipoUsuario && (
          <div className="flex flex-col items-center">
            <div className="flex flex-col md:flex-row gap-4 w-full mb-4">
              <button
                onClick={() => handleTipoSelecionado('usuario')}
                className="bg-yellow-500 hover:bg-yellow-600 text-black text-lg px-8 py-3 rounded-xl shadow-lg font-bold w-full transition-all duration-200"
              >
                Usuário
              </button>
              <button
                onClick={() => handleTipoSelecionado('adm')}
                className="bg-red-600 hover:bg-red-700 text-white text-lg px-8 py-3 rounded-xl shadow-lg font-bold w-full transition-all duration-200"
              >
                ADM
              </button>
            </div>
            <p className="text-sm md:text-base text-gray-300 text-center">
              Escolha seu perfil para continuar.
            </p>
          </div>
        )}

        {tipoUsuario === 'adm' && (
          <div className="mt-4">
            <h2 className="text-xl md:text-2xl mb-4 text-center font-semibold text-orange-400">
              Digite a senha de ADM
            </h2>
            <input
              type="password"
              className="w-full p-3 text-base rounded border border-gray-700 bg-black text-white placeholder-gray-400"
              value={senhaADM}
              onChange={(e) => setSenhaADM(e.target.value)}
              placeholder="Senha"
            />
            <button
              onClick={handleLoginADM}
              className="mt-4 bg-orange-500 hover:bg-orange-600 text-white text-lg px-6 py-3 rounded w-full font-semibold transition-all duration-200"
            >
              Entrar
            </button>
            {senhaADM && senhaADM !== senhaCorreta && (
              <p className="text-red-500 text-sm mt-2 text-center font-medium">
                Senha incorreta
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
