'use client';

import { useState } from 'react';
import {
  ExclamationTriangleIcon,
  ArrowUpIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Sos from './SosEnergency';
import ButtonSos from './ButtonSos';

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

export default function Home() {
  const [sosStatus, setSosStatus] = useState(false);
  const [location, setLocation] = useState({ lat: -23.56, lng: -46.64 });

  return (
    <div className="bg-gradient-to-b from-indigo-100 to-white min-h-screen py-16 px-4 sm:px-6 lg:px-8 space-y-28 font-sans scroll-smooth">
      <section className="max-w-7xl mx-auto text-center">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl sm:text-6xl font-extrabold text-indigo-800 drop-shadow-xl"
        >
          Alerta{' '}
          <span className="text-red-600 hover:text-red-800 hover:brightness-125 transition duration-300">
            Silencioso
          </span>{' '}
          e{' '}
          <span className="text-blue-700 hover:text-blue-900 hover:brightness-125 transition duration-300">
            Inteligente
          </span>
        </motion.h1>
        <p className="mt-6 text-lg text-gray-700 max-w-2xl mx-auto">
          Uma solução de resposta rápida para emergências com foco em{' '}
          <span className="transition-all hover:neon text-indigo-600 font-bold">
            acessibilidade
          </span>
          ,{' '}
          <span className="transition-all hover:neon text-indigo-600 font-bold">
            tecnologia
          </span>{' '}
          e{' '}
          <span className="transition-all hover:neon text-indigo-600 font-bold">
            segurança
          </span>
          .
        </p>
      </section>

      <Sos />

      <motion.section
        className="max-w-4xl mx-auto text-center bg-white p-10 rounded-3xl shadow-2xl"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <ExclamationTriangleIcon className="mx-auto h-20 w-20 text-red-600 animate-bounce" />
        <p className="mt-4 text-gray-700">
          Clique abaixo em caso de emergência. Seu alerta será enviado automaticamente. 🚑📡
        </p>
        <motion.button
          title={sosStatus ? 'Em análise, aguarde retorno.' : ''}
          whileHover={sosStatus ? {} : { scale: 1.1, rotate: 2 }}
          whileTap={sosStatus ? {} : { scale: 0.95 }}
          className={`mt-6 px-10 py-4 rounded-full text-xl font-bold transition-all duration-300 shadow-lg ${sosStatus
              ? 'bg-gray-400 cursor-not-allowed text-white'
              : 'bg-red-600 text-white hover:shadow-red-500 hover:bg-red-700 hover:brightness-110 animate-pulse'
            }`}
        >
          <Link href="/pages/autoridades">
            <ButtonSos />

          </Link>
        </motion.button>
      </motion.section>

      <div className="space-y-24 max-w-7xl mx-auto">
        {sections.map((sec, i) => {
          const isEven = i % 2 === 0;
          return (
            <motion.section
              key={sec.id}
              id={sec.id}
              className={`w-full max-w-4xl bg-white p-10 rounded-3xl shadow-xl flex flex-col md:flex-row items-center ${isEven ? 'mr-auto justify-start' : 'ml-auto justify-end'
                }`}
              initial={{ opacity: 0, x: isEven ? -100 : 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="max-w-lg text-left">
                <h3 className="text-2xl font-semibold text-indigo-800 mb-3">{sec.title}</h3>
                <p className="text-gray-700 mb-4">{sec.description}</p>
                <Link href={sec.link}>
                  <motion.button
                    whileHover={{ scale: 1.1, boxShadow: '0 0 8px #6366f1' }}
                    whileTap={{ scale: 0.95 }}
                    className="px-5 py-2 bg-indigo-500 text-white rounded-full hover:bg-indigo-600 transition-all"
                  >
                    🔍 Ver mais
                  </motion.button>
                </Link>
              </div>
            </motion.section>
          );
        })}
      </div>

      <motion.section
        id="integrantes"
        className="max-w-7xl mx-auto bg-white rounded-2xl p-8 shadow-xl text-center mt-20"
        whileHover={{ scale: 1.01 }}
      >
        <h3 className="text-3xl font-bold text-gray-800 mb-4">👥 Nossa Equipe</h3>
        <div className="mt-6">
          <Link
            href="/integrantes"
            className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white font-semibold rounded-full hover:bg-indigo-700 transition-all"
          >
            🔍 Ver Integrantes
          </Link>
        </div>
      </motion.section>

      <section
        id="mapa-projeto"
        className="max-w-7xl mx-auto mt-16 rounded-2xl overflow-hidden shadow-lg"
        style={{ height: '400px' }}
      >
        <iframe
          title="Mapa do Projeto"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14672.392256799682!2d-46.66287286942015!3d-23.569647525682167"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
        ></iframe>
      </section>

      <section
        id="mapa-abrigos"
        className="max-w-7xl mx-auto mt-16 rounded-2xl overflow-hidden shadow-lg"
        style={{ height: '400px' }}
      >
        <iframe
          title="Abrigos Próximos"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          src={`https://www.google.com/maps/embed/v1/search?q=abrigos%20emergenciais%20perto%20de%20mim&key=YOUR_GOOGLE_MAPS_API_KEY&center=${location.lat},${location.lng}&zoom=13`}
          allowFullScreen
        ></iframe>
      </section>

      <div className="text-center mt-10">
        <Link
          href="/pages/cadastro"
          className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-all"
        >
          📄 Ir para Cadastro
        </Link>
      </div>
    </div>
  );
}
