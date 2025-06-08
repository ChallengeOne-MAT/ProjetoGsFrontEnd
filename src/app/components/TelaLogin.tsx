'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

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
    <main className="min-h-screen flex justify-center items-center bg-black px-4">
      <form onSubmit={handleSubmit} className="bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-md text-white">
        <h1 className="text-3xl font-extrabold mb-6 text-orange-500 text-center">Login</h1>
        {erro && <p className="mb-4 text-red-500 bg-red-900 p-3 rounded">{erro}</p>}

        <label className="block text-orange-400">CPF</label>
        <input
          value={cpf}
          maxLength={11}
          onChange={(e) => setCpf(e.target.value.replace(/\D/g, ''))}
          className="input"
          required
        />

        <label className="block mt-3 text-orange-400">Senha</label>
        <input
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          className="input"
          required
        />

        <button type="submit" className="btn mt-6">Entrar</button>

        <p className="mt-4 text-center text-sm text-gray-400">
          Não tem conta? <a href="/cadastro" className="text-orange-500 hover:underline">Cadastre-se aqui</a>
        </p>
      </form>
    </main>
  );
}
