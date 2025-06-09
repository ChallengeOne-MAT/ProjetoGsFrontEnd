'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import BotaoVoltar from './BotaoVoltar';

export default function TelaCadastro() {
  const router = useRouter();
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [telefone, setTelefone] = useState('');
  const [erro, setErro] = useState('');

  // Validação completa de CPF
  const validarCPF = (cpf: string) => {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

    let soma = 0;
    for (let i = 0; i < 9; i++) soma += parseInt(cpf.charAt(i)) * (10 - i);
    let resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(9))) return false;

    soma = 0;
    for (let i = 0; i < 10; i++) soma += parseInt(cpf.charAt(i)) * (11 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    return resto === parseInt(cpf.charAt(10));
  };

  // Limpa o erro após 5 segundos
  useEffect(() => {
    if (erro) {
      const timer = setTimeout(() => setErro(''), 5000);
      return () => clearTimeout(timer);
    }
  }, [erro]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validarCPF(cpf)) return setErro('CPF inválido.');
    if (senha.length < 6) return setErro('Senha muito curta.');
    if (senha !== confirmarSenha) return setErro('As senhas não coincidem.');

    try {
      const response = await fetch('http://localhost:8080/usuario', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cpf, senha, telefone }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao cadastrar.');
      }

      alert('Cadastro realizado com sucesso!');
      router.push('/login'); // rota corrigida
    } catch (err: any) {
      setErro(err.message || 'Erro na requisição.');
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
            Cadastro
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

          <label className="block text-yellow-400 font-semibold mt-6 mb-2">Telefone</label>
          <input
            value={telefone}
            onChange={(e) => setTelefone(e.target.value.replace(/\D/g, ''))}
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

          <label className="block text-yellow-400 font-semibold mt-6 mb-2">
            Confirmar Senha
          </label>
          <input
            type="password"
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.target.value)}
            required
            placeholder="Confirme sua senha"
            className="w-full p-3 rounded-lg bg-gray-800 border-2 border-gray-700 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 text-white placeholder-gray-400 transition"
          />

          <button
            type="submit"
            className="w-full mt-8 py-4 font-bold bg-gradient-to-r from-yellow-400 via-orange-500 to-red-600 text-black rounded-lg hover:brightness-110 transition"
          >
            Cadastrar
          </button>

          <p className="mt-6 text-center text-sm text-gray-400">
            Já tem conta?{' '}
            <a
              href="/login"
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
            onClick={() => router.back()}
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
