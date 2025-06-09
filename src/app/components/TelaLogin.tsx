'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import BotaoVoltar from './BotaoVoltar';

export default function TelaLogin() {
  const router = useRouter();
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (cpf.length !== 11) return setErro('CPF deve ter 11 números.');
    if (senha.length < 6) return setErro('Senha inválida.');

    try {
      const response = await fetch(`http://localhost:8080/usuario/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cpf, senha }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login falhou.');
      }

      const usuario = await response.json();
      localStorage.setItem('logado', JSON.stringify(usuario));
      alert(`Bem-vindo(a), ${usuario.nome}!`);
      router.push('/dashboard');
    } catch (err: any) {
      setErro(err.message);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-black px-4">
      
      {/* Formulário */}
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 border-4 border-orange-500 rounded-2xl shadow-xl p-8 w-full max-w-md text-white"
        style={{
          borderImageSlice: 1,
          borderImageSource: 'linear-gradient(to right, #f97316, #facc15, #f97316)',
        }}
      >
        <h1 className="text-3xl font-extrabold mb-6 text-orange-500 text-center">Login</h1>

        {erro && (
          <p className="mb-4 text-red-500 bg-red-900 p-3 rounded-lg font-semibold shadow-inner">
            {erro}
          </p>
        )}

        <label htmlFor="cpf" className="block text-orange-400 font-medium mb-1">
          CPF
        </label>
        <input
          id="cpf"
          value={cpf}
          maxLength={11}
          onChange={(e) => setCpf(e.target.value.replace(/\D/g, ''))}
          className="w-full p-3 rounded-xl bg-gray-800 border-2 border-gray-700 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 text-white placeholder-gray-400 transition"
          placeholder="Digite seu CPF"
          required
        />

        <label htmlFor="senha" className="block mt-5 text-orange-400 font-medium mb-1">
          Senha
        </label>
        <input
          id="senha"
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          className="w-full p-3 rounded-xl bg-gray-800 border-2 border-gray-700 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 text-white placeholder-gray-400 transition"
          placeholder="Digite sua senha"
          required
        />

        <button
          type="submit"
          className="w-full mt-8 py-3 rounded-full bg-gradient-to-r from-yellow-400 via-orange-500 to-red-600 text-black font-bold text-lg hover:brightness-110 transition"
        >
          Entrar
        </button>

        <p className="mt-6 text-center text-sm text-gray-400">
          Não tem conta?{' '}
          <a href="/pages/cadastro" className="text-orange-500 hover:underline font-semibold">
            Cadastre-se aqui
          </a>
        </p>
      </form>

      {/* Botão Voltar centralizado */}
      <div className="mt-6 flex justify-center w-full max-w-md">
        <BotaoVoltar
          texto="◀ Voltar"
          className="w-1/2 bg-gray-700 text-yellow-400 py-3 rounded-lg hover:bg-gray-600 transition focus:outline-none focus:ring-4 focus:ring-yellow-400"
        />
      </div>

    </main>
  );
}
