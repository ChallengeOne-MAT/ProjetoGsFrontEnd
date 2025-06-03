'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Usuario {
  cpf: string;
  nome: string;
  email: string;
  senha: string;
}

export default function TelaLogin() {
  const router = useRouter();

  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (cpf.length !== 11) {
      setErro('CPF deve conter 11 números.');
      return;
    }
    if (senha.length < 6) {
      setErro('Senha inválida.');
      return;
    }

    const usuarios: Usuario[] = JSON.parse(localStorage.getItem('usuarios') || '[]');

    const usuario = usuarios.find(
      (u) => u.cpf === cpf && u.senha === senha
    );

    if (!usuario) {
      setErro('CPF ou senha incorretos.');
      return;
    }

    setErro('');
    alert(`Bem-vindo(a), ${usuario.nome}!`);
    localStorage.setItem('logado', JSON.stringify(usuario));
    router.push('/dashboard');
  };

  return (
    <main className="min-h-screen flex flex-col justify-center items-center bg-black px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 p-8 rounded-lg shadow-lg w-[90%] sm:w-full max-w-md text-white"
      >
        <h1 className="text-3xl font-extrabold mb-6 text-orange-500 text-center tracking-wide">
          Login
        </h1>

        {erro && (
          <p className="mb-4 text-red-500 font-semibold border border-red-600 bg-red-900 bg-opacity-50 p-3 rounded">
            {erro}
          </p>
        )}

        <label className="block mb-1 font-semibold text-orange-400">CPF</label>
        <input
          type="text"
          maxLength={11}
          value={cpf}
          onChange={(e) => setCpf(e.target.value.replace(/\D/g, ''))}
          placeholder="Somente números"
          className="w-full p-3 border border-gray-700 rounded mb-5 bg-black text-white placeholder-gray-500 focus:border-orange-500 focus:outline-none"
          required
        />

        <label className="block mb-1 mt-[4%] font-semibold text-orange-400">Senha</label>
        <input
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          placeholder="Sua senha"
          className="w-full p-3 border border-gray-700 rounded mb-7 bg-black text-white placeholder-gray-500 focus:border-orange-500 focus:outline-none"
          required
        />

        <button
          type="submit"
          className="w-full bg-gradient-to-r mt-[9%] from-red-600 via-orange-500 to-yellow-400 text-black py-3 rounded-lg font-bold hover:brightness-110 transition duration-300"
        >
          Entrar
        </button>

        <p className="mt-6 text-center text-sm text-gray-400">
          Não tem conta?{' '}
          <a href="/pages/home" className="text-orange-500 hover:underline">
            Cadastre-se aqui
          </a>
        </p>
      </form>
    </main>
  );
}
