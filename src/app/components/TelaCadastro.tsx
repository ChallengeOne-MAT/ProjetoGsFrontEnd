'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function TelaCadastro() {
  const router = useRouter();
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [erro, setErro] = useState('');

  const validarCPF = (cpf: string) => cpf.replace(/\D/g, '').length === 11;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validarCPF(cpf)) return setErro('CPF inválido.');
    if (senha.length < 6) return setErro('Senha muito curta.');
    if (senha !== confirmarSenha) return setErro('As senhas não coincidem.');

    try {
      const response = await fetch('http://localhost:8080/usuario', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cpf, senha, telefone: null }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao cadastrar.');
      }

      alert('Cadastro realizado com sucesso!');
      router.push('/pages/login');
    } catch (err: any) {
      setErro(err.message || 'Erro na requisição.');
    }
  };

  return (
    <main className="min-h-screen flex justify-center items-center bg-black px-4">
      <form onSubmit={handleSubmit} className="bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-md text-white">
        <h1 className="text-3xl font-extrabold mb-6 text-orange-500 text-center">Cadastro</h1>
        {erro && <p className="mb-4 text-red-500 bg-red-900 p-3 rounded">{erro}</p>}

        <label className="block text-orange-400">CPF</label>
        <input value={cpf} maxLength={11} onChange={(e) => setCpf(e.target.value.replace(/\D/g, ''))} className="input" required />

        <label className="block mt-3 text-orange-400">Senha</label>
        <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} className="input" required />

        <label className="block mt-3 text-orange-400">Confirmar Senha</label>
        <input type="password" value={confirmarSenha} onChange={(e) => setConfirmarSenha(e.target.value)} className="input" required />

        <button type="submit" className="btn mt-6">Cadastrar</button>

        <p className="mt-4 text-center text-sm text-gray-400">
          Já tem conta? <a href="/login" className="text-orange-500 hover:underline">Faça login aqui!</a>
        </p>
      </form>
    </main>
  );
}
