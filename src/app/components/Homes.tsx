'use client';

import { useState, useEffect } from 'react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const sections = [
  {
    id: 'explicacoes',
    title: '📚 Como agir em desastres naturais',
    description:
      'Saiba os primeiros passos em situações de emergência, como evacuação e contato com autoridades. 🧭📢',
    link: '/pages/instrucao',
  },
  {
    id: 'chat',
    title: '💬 Chat de Emergência 24h',
    description:
      'Fale com nossa equipe especializada em situações críticas. Atendimento rápido, humano e eficaz. 🧑‍🚒📱',
    link: '/chat',
  },
  {
    id: 'sos-info',
    title: '🆘 Sobre o Botão SOS',
    description:
      'Saiba como o botão atua em situações extremas e por que ele é essencial para sua segurança. 🔒📡',
    link: '/pages/buttonsos',
  },
  {
    id: 'historico',
    title: '📜 Histórico de Ações',
    description:
      'Acompanhe todas as suas ações de emergência registradas para referência futura. 🗂️🕒',
    link: '/historico',
  },
  {
    id: 'dashboard',
    title: '📊 Painel de Ocorrências',
    description:
      'Visualize estatísticas detalhadas sobre suas ações de emergência, incluindo horários e níveis de criticidade. 📈🕒',
    link: '/dashboard',
  },
];

// Simulando contatos cadastrados para receber SOS
const contatos = [
  { id: 1, nome: 'Maria', contato: '+55 11 99999-1111' },
  { id: 2, nome: 'João', contato: '+55 11 99999-2222' },
  { id: 3, nome: 'Ana', contato: '+55 11 99999-3333' },
];

export default function Home() {
  const [sosStatus, setSosStatus] = useState(false);
  const router = useRouter();

  // Função para pedir permissão e disparar notificações para contatos
  const dispararNotificacoes = () => {
    if (!("Notification" in window)) {
      alert("Seu navegador não suporta notificações.");
      return;
    }

    if (Notification.permission === "granted") {
      contatos.forEach((contato) => {
        new Notification(`Alerta SOS!`, {
          body: `O usuário acionou o SOS. Notificando: ${contato.nome} (${contato.contato})`,
          icon: '/icons/alert-icon.png', // opcional, coloque seu ícone
        });
      });
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then(permission => {
        if (permission === "granted") {
          contatos.forEach((contato) => {
            new Notification(`Alerta SOS!`, {
              body: `O usuário acionou o SOS. Notificando: ${contato.nome} (${contato.contato})`,
              icon: '/icons/alert-icon.png',
            });
          });
        }
      });
    }
  };

  const handleSosClick = () => {
    if (sosStatus) return; 
    setSosStatus(true);

    dispararNotificacoes();

    setTimeout(() => {
      router.push('/pages/autoridades');
    }, 1500);
  };

  return (
    <div className="bg-black text-white min-h-screen py-16 px-4 sm:px-6 lg:px-8 space-y-28 font-sans scroll-smooth">
      <section className="max-w-7xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold drop-shadow-lg"
        >
          Alerta{' '}
          <span className="text-red-500 hover:text-red-600 transition duration-300">
            Silencioso
          </span>{' '}
          e{' '}
          <span className="text-orange-400 hover:text-orange-500 transition duration-300">
            Inteligente
          </span>
        </motion.h1>
        <p className="mt-6 text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
          Uma solução de resposta rápida para emergências com foco em{' '}
          <span className="text-orange-400 font-bold">acessibilidade</span>,{' '}
          <span className="text-yellow-400 font-bold">tecnologia</span> e{' '}
          <span className="text-red-400 font-bold">segurança</span>.
        </p>
      </section>

      <motion.section
        className="max-w-4xl mx-auto text-center bg-zinc-900 p-8 sm:p-10 rounded-3xl shadow-2xl"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <ExclamationTriangleIcon className="mx-auto h-20 w-20 text-red-500 animate-bounce" />
        <p className="mt-4 text-gray-300 text-base sm:text-lg">
          Clique abaixo em caso de emergência. Seu alerta será enviado automaticamente. 🚑📡
        </p>
        <motion.button
          onClick={handleSosClick}
          disabled={sosStatus}
          whileHover={sosStatus ? {} : { scale: 1.05 }}
          whileTap={sosStatus ? {} : { scale: 0.95 }}
          className={`mt-6 px-10 py-4 rounded-full font-bold text-white text-lg sm:text-xl
            ${
              sosStatus
                ? 'bg-gray-600 cursor-not-allowed'
                : 'bg-red-600 hover:bg-red-700 cursor-pointer'
            }
            transition-all shadow-lg`}
          aria-label="Botão de emergência SOS"
        >
          {sosStatus ? 'Alerta enviado!' : 'Botão SOS'}
        </motion.button>
      </motion.section>

      <div className="space-y-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {sections.map((sec, i) => {
          const isEven = i % 2 === 0;
          return (
            <motion.section
              key={sec.id}
              id={sec.id}
              className={`w-full max-w-4xl bg-zinc-800 p-8 sm:p-10 rounded-3xl shadow-xl flex flex-col md:flex-row items-center ${
                isEven ? 'mr-auto justify-start' : 'ml-auto justify-end'
              }`}
              initial={{ opacity: 0, x: isEven ? -100 : 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="max-w-lg text-left">
                <h3 className="text-2xl font-semibold text-orange-400 mb-3">{sec.title}</h3>
                <p className="text-gray-300 mb-4">{sec.description}</p>
                <Link href={sec.link}>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-5 py-2 bg-orange-600 text-white rounded-full hover:bg-orange-500 transition-all"
                  >
                    🔍 Ver mais
                  </motion.button>
                </Link>
              </div>
            </motion.section>
          );
        })}
      </div>

      {/* Equipe */}
      <motion.section
        id="integrantes"
        className="max-w-7xl mx-auto bg-zinc-900 rounded-2xl p-8 shadow-xl text-center mt-20"
        whileHover={{ scale: 1.01 }}
      >
        <h3 className="text-3xl font-bold text-orange-400 mb-4">👥 Nossa Equipe</h3>
        <div className="mt-6">
          <Link
            href="/integrantes"
            className="inline-flex items-center px-6 py-3 bg-orange-600 text-white font-semibold rounded-full hover:bg-orange-500 transition-all"
          >
            🔍 Ver Integrantes
          </Link>
        </div>
      </motion.section>

      {/* Cadastro */}
      <div className="text-center mt-10">
        <Link
          href="/pages/cadastro"
          className="inline-flex items-center px-6 py-3 bg-yellow-500 text-black font-semibold rounded-full hover:bg-yellow-400 transition-all"
        >
          📄 Ir para Cadastro
        </Link>
      </div>
    </div>
  );
}
