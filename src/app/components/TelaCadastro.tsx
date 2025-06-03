'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const validarCPF = (cpf: string): boolean => {
  cpf = cpf.replace(/\D/g, '');
  return cpf.length === 11;
};

interface Usuario {
  cpf: string;
  nome: string;
  email: string;
  senha: string;
}

export default function TelaCadastro() {
  const router = useRouter();

  const [cpf, setCpf] = useState('');
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validarCPF(cpf)) {
      setErro('CPF inválido. Deve conter 11 números.');
      return;
    }
    if (!nome.trim()) {
      setErro('Nome é obrigatório.');
      return;
    }
    if (!email.includes('@')) {
      setErro('Email inválido.');
      return;
    }
    if (senha.length < 6) {
      setErro('Senha deve ter ao menos 6 caracteres.');
      return;
    }

    const usuarios: Usuario[] = JSON.parse(localStorage.getItem('usuarios') || '[]');

    if (usuarios.find((u) => u.cpf === cpf)) {
      setErro('CPF já cadastrado.');
      return;
    }

    usuarios.push({ cpf, nome, email, senha });
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    alert('Cadastro realizado com sucesso! Agora faça login.');
    router.push('/pages/login');
  };

  return (
    <main className="min-h-screen flex flex-col justify-center items-center bg-black px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-md text-white"
      >
        <h1 className="text-3xl font-extrabold mb-6 text-orange-500 text-center tracking-wide">
          Cadastro
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

        <label className="block mb-1 font-semibold text-orange-400">Nome</label>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Seu nome completo"
          className="w-full p-3 border border-gray-700 rounded mb-5 bg-black text-white placeholder-gray-500 focus:border-orange-500 focus:outline-none"
          required
        />

        <label className="block mb-1 font-semibold text-orange-400">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="exemplo@dominio.com"
          className="w-full p-3 border border-gray-700 rounded mb-5 bg-black text-white placeholder-gray-500 focus:border-orange-500 focus:outline-none"
          required
        />

        <label className="block mb-1 font-semibold text-orange-400">Senha</label>
        <input
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          placeholder="Mínimo 6 caracteres"
          minLength={6}
          className="w-full p-3 border border-gray-700 rounded mb-7 bg-black text-white placeholder-gray-500 focus:border-orange-500 focus:outline-none"
          required
        />

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-red-600 via-orange-500 to-yellow-400 text-black py-3 rounded-lg font-bold hover:brightness-110 transition duration-300"
        >
          Cadastrar
        </button>

        <p className="mt-6 text-center text-sm text-gray-400">
          Já tem conta?{' '}
          <a href="/pages/login" className="text-orange-500 hover:underline">
            Faça login aqui!
          </a>
        </p>
      </form>
    </main>
  );
}
