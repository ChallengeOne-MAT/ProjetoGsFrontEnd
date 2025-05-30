'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation'; 

const validarCPF = (cpf: string) => {
  cpf = cpf.replace(/\D/g, '');
  if (cpf.length !== 11) return false;
  return true; 
};

export default function TelaCadastro() {
  const router = useRouter(); // ✅ OK para app/

  const [cpf, setCpf] = useState('');
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
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

    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    if (usuarios.find((u: any) => u.cpf === cpf)) {
      setErro('CPF já cadastrado.');
      return;
    }

    usuarios.push({ cpf, nome, email, senha });
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    alert('Cadastro realizado com sucesso! Agora faça login.');
    router.push('/login'); // ✅ funciona com next/navigation
  };

  return (
    <main className="min-h-screen flex flex-col justify-center items-center bg-gray-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-6 text-indigo-700">Cadastro</h1>

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

        <label className="block mb-1 font-medium">Nome</label>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Seu nome completo"
          className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-indigo-500"
          required
        />

        <label className="block mb-1 font-medium">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="exemplo@dominio.com"
          className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-indigo-500"
          required
        />

        <label className="block mb-1 font-medium">Senha</label>
        <input
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          placeholder="Mínimo 6 caracteres"
          minLength={6}
          className="w-full p-2 border border-gray-300 rounded mb-6 focus:outline-indigo-500"
          required
        />

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-3 rounded font-semibold hover:bg-indigo-700 transition"
        >
          Cadastrar
        </button>

        <p className="mt-4 text-center text-sm text-gray-600">
          Já tem conta?{' '}
          <a href="/pages/login" className="text-indigo-600 hover:underline">
            Faça login aqui
          </a>
        </p>
      </form>
    </main>
  );
}
