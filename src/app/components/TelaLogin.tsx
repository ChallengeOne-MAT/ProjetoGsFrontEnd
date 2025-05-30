'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function TelaLogin() {
  const router = useRouter();

  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (cpf.length !== 11) {
      setErro('CPF deve conter 11 números.');
      return;
    }
    if (senha.length < 6) {
      setErro('Senha inválida.');
      return;
    }

    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    const usuario = usuarios.find(
      (u: any) => u.cpf === cpf && u.senha === senha
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
    <main className="min-h-screen flex flex-col justify-center items-center bg-gray-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-6 text-indigo-700">Login</h1>

        {erro && (
          <p className="mb-4 text-red-600 font-semibold border border-red-400 bg-red-100 p-2 rounded">
            {erro}
          </p>
        )}

        <label className="block mb-1 font-medium">CPF</label>
        <input
          type="text"
          maxLength={11}
          value={cpf}
          onChange={(e) => setCpf(e.target.value.replace(/\D/g, ''))}
          placeholder="Somente números"
          className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-indigo-500"
          required
        />

        <label className="block mb-1 font-medium">Senha</label>
        <input
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          placeholder="Sua senha"
          className="w-full p-2 border border-gray-300 rounded mb-6 focus:outline-indigo-500"
          required
        />

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-3 rounded font-semibold hover:bg-indigo-700 transition"
        >
          Entrar
        </button>

        <p className="mt-4 text-center text-sm text-gray-600">
          Não tem conta?{' '}
          <a href="/pages/home" className="text-indigo-600 hover:underline">
            Cadastre-se aqui
          </a>
        </p>
      </form>
    </main>
  );
}
