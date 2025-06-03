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
    <main className="p-6 max-w-md mx-auto bg-black rounded-lg shadow-lg mt-10 text-white font-sans text-center">
      <h1 className="text-3xl font-extrabold mb-6 text-orange-500 tracking-wide">
        Escolha seu perfil
      </h1>

      {!tipoSelecionado && (
        <>
          <button
            onClick={() => router.push('/pages/cadastro')}
            className="w-full mb-4 py-3 rounded-lg font-bold bg-gradient-to-r from-yellow-400 via-orange-500 to-red-600 text-black hover:brightness-110 transition"
          >
            Sou Usuário
          </button>

          <button
            onClick={() => setTipoSelecionado('adm')}
            className="w-full py-3 rounded-lg font-bold bg-gradient-to-r from-red-600 via-orange-500 to-yellow-400 text-black hover:brightness-110 transition"
          >
            Sou ADM
          </button>
        </>
      )}

      {tipoSelecionado === 'adm' && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-orange-400 mb-4">Digite a senha de ADM</h2>
          <input
            type="password"
            value={senhaADM}
            onChange={(e) => setSenhaADM(e.target.value)}
            placeholder="Senha"
            className="w-full p-3 rounded-lg bg-gray-900 border border-gray-700 text-white mb-4"
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
    </main>
  );
}
