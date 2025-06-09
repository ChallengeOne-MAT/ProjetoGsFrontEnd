'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import BotaoVoltar from './BotaoVoltar';

export default function TelaCadastro() {
  const router = useRouter();
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [telefone, setTelefone] = useState('');
  const [erro, setErro] = useState('');
  const [modo, setModo] = useState<'cadastro' | 'atualizar' | 'deletar'>('cadastro');

  const validarCPF = (cpf: string) => cpf.replace(/\D/g, '').length === 11;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validarCPF(cpf)) return setErro('CPF inválido.');
    if (modo !== 'deletar') {
      if (senha.length < 6) return setErro('Senha muito curta.');
      if (senha !== confirmarSenha) return setErro('As senhas não coincidem.');
    }

    try {
      let response;
      const url = `http://localhost:8080/usuario${modo === 'deletar' ? `/${cpf}` : ''}`;
      const headers = { 'Content-Type': 'application/json' };

      if (modo === 'cadastro') {
        response = await fetch(url, {
          method: 'POST',
          headers,
          body: JSON.stringify({ cpf, senha, telefone }),
        });
      } else if (modo === 'atualizar') {
        response = await fetch(url, {
          method: 'PUT',
          headers,
          body: JSON.stringify({ cpf, senha, telefone }),
        });
      } else if (modo === 'deletar') {
        response = await fetch(url, {
          method: 'DELETE',
          headers,
        });
      }

      const contentType = response.headers.get('Content-Type');
      const isJSON = contentType && contentType.includes('application/json');
      const responseData = isJSON ? await response.json() : null;

      if (!response.ok) {
        const message = responseData?.message || response.statusText || 'Erro na requisição.';
        throw new Error(message);
      }

      alert(
        modo === 'cadastro'
          ? 'Cadastro realizado com sucesso!'
          : modo === 'atualizar'
          ? 'Dados atualizados com sucesso!'
          : 'Usuário deletado com sucesso!'
      );

      router.push('/pages/login');
    } catch (err: any) {
      setErro(err.message || 'Erro desconhecido.');
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen px-4 bg-black">
      <div className="relative w-full max-w-md sm:max-w-lg md:max-w-xl animate-float">
        <div className="absolute -bottom-4 rounded-[3px] left-1/2 transform -translate-x-1/2 w-11/12 h-4 bg-white opacity-10 rounded-full blur-md"></div>

        <form
          onSubmit={handleSubmit}
          className="p-8 sm:p-10 bg-gray-900 rounded-xl shadow-xl text-white border-4"
          style={{
            borderImageSlice: 1,
            borderImageSource: 'linear-gradient(to right, #f97316, #facc15, #f97316)',
          }}
        >
          <h1 className="text-3xl font-extrabold mb-8 text-yellow-400 tracking-wide text-center">
            {modo === 'cadastro' ? 'Cadastro' : modo === 'atualizar' ? 'Atualizar Dados' : 'Deletar Usuário'}
          </h1>

          {erro && (
            <p className="mb-6 text-red-500 bg-red-900 p-4 rounded-md font-semibold">
              {erro}
            </p>
          )}

          <label className="block text-yellow-400 font-semibold mb-2">CPF</label>
          <input
            value={cpf}
            maxLength={11}
            onChange={(e) => setCpf(e.target.value.replace(/\D/g, ''))}
            required
            placeholder="Digite seu CPF (apenas números)"
            className="w-full p-3 rounded-lg bg-gray-800 border-2 border-gray-700 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 text-white placeholder-gray-400 transition"
          />

          {modo !== 'deletar' && (
            <>
              <label className="block text-yellow-400 font-semibold mt-6 mb-2">Telefone</label>
              <input
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
                required
                placeholder="Digite seu telefone"
                className="w-full p-3 rounded-lg bg-gray-800 border-2 border-gray-700 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 text-white placeholder-gray-400 transition"
              />

              <label className="block text-yellow-400 font-semibold mt-6 mb-2">Senha</label>
              <input
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
                placeholder="Digite sua senha"
                className="w-full p-3 rounded-lg bg-gray-800 border-2 border-gray-700 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 text-white placeholder-gray-400 transition"
              />

              <label className="block text-yellow-400 font-semibold mt-6 mb-2">Confirmar Senha</label>
              <input
                type="password"
                value={confirmarSenha}
                onChange={(e) => setConfirmarSenha(e.target.value)}
                required
                placeholder="Confirme sua senha"
                className="w-full p-3 rounded-lg bg-gray-800 border-2 border-gray-700 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 text-white placeholder-gray-400 transition"
              />
            </>
          )}

          <button
            type="submit"
            className="w-full mt-8 py-4 font-bold bg-gradient-to-r from-yellow-400 via-orange-500 to-red-600 text-black rounded-lg hover:brightness-110 transition"
          >
            {modo === 'cadastro' ? 'Cadastrar' : modo === 'atualizar' ? 'Atualizar' : 'Deletar'}
          </button>

          <div className="flex justify-around mt-4">
            <button
              type="button"
              onClick={() => setModo('cadastro')}
              className="text-sm text-yellow-400 hover:underline"
            >
              Modo Cadastro
            </button>
            <button
              type="button"
              onClick={() => setModo('atualizar')}
              className="text-sm text-yellow-400 hover:underline"
            >
              Modo Atualizar
            </button>
            <button
              type="button"
              onClick={() => setModo('deletar')}
              className="text-sm text-red-500 hover:underline"
            >
              Modo Deletar
            </button>
          </div>

          <p className="mt-6 text-center text-sm text-gray-400">
            Já tem conta?{' '}
            <a
              href="/pages/login"
              className="text-yellow-400 hover:underline font-semibold"
            >
              Faça login aqui!
            </a>
          </p>
        </form>

        <div className="flex justify-center mt-4">
          <BotaoVoltar
            texto="◀ Voltar"
            className="w-1/2 bg-gray-700 text-yellow-400 py-3 rounded-lg hover:bg-gray-600 transition focus:outline-none focus:ring-4 focus:ring-yellow-400"
          />
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
