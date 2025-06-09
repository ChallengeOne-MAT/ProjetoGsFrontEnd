'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import Image from 'next/image';
import BotaoVoltar from '../components/BotaoVoltar';

export default function IntegrantesPage() {
  const [selectedUserIndex, setSelectedUserIndex] = useState<number | null>(null);

  const users = [
    {
      name: 'Lucas Almeida de Siqueira',
      rm: 'RM560914',
      role: 'Responsável pelo back-end',
      contributions: 'Integração com APIs, autenticação e lógica de dados em tempo real.',
      details: 'Lucas é especializado em construir a base sólida do sistema. Trabalhou no backend e integração com serviços externos.',
      github: '',
      linkedin: '',
      photo: '/img/lucass.JPG',
    },
    {
      name: 'Sulamita Viegas Dos Santos',
      rm: 'RM561089',
      role: 'UX/UI Designer & Inteligência Artificial',
      contributions: 'Criou a identidade visual e IA.',
      details: 'Sulamita foi uma das principais responsáveis pela criação da identidade visual do projeto, liderando o design de interface de usuário clara e acessível.',
      github: 'https://github.com/SulamitaViegas123',
      linkedin: 'https://www.linkedin.com/in/sulamita-viegas-dos-santos-280210223/',
      photo: '/img/sulamita.png',
    },
    {
      name: 'Matteus Viegas Dos Santos',
      rm: 'RM561090',
      role: 'Front-end Developer',
      contributions: 'Criou componentes dinâmicos e garantiu responsividade.',
      details: 'Matteus codificou a maior parte do layout com animações, performance e fluidez de navegação.',
      github: 'https://github.com/ChallengeOne-MAT',
      linkedin: 'https://www.linkedin.com/in/matteus-viegas-533437294/',
      photo: '/img/matteuss.png',
    },
  ];

  return (
    <main className="px-6 pb-20 pt-32 max-w-7xl mx-auto bg-black min-h-screen">
      <h2 className="text-4xl font-bold text-center text-orange-500 mb-20 drop-shadow-lg tracking-wide">
        Integrantes do Projeto
      </h2>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-14"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {users.map((user, index) => (
          <motion.div
            key={index}
            className={`relative rounded-3xl p-8 pt-24 bg-[#121212] border-4 cursor-pointer select-none transition-all
              ${
                selectedUserIndex === index
                  ? 'scale-105 border-orange-500 shadow-[0_15px_25px_rgba(255,140,0,0.8)]'
                  : 'hover:scale-[1.03] border-orange-400 hover:shadow-[0_10px_20px_rgba(255,140,0,0.6)]'
              }
            `}
            whileHover={{ scale: 1.03 }}
            onClick={() => setSelectedUserIndex(index)}
            tabIndex={0}
            role="button"
            aria-label={`Informações sobre ${user.name}`}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setSelectedUserIndex(index);
              }
            }}
            style={{
              filter: `drop-shadow(0 0 ${index * 4 + 8}px rgba(255,140,0,0.5))`,
              transition: 'all 0.3s ease',
            }}
          >
            <div className="absolute -top-14 left-1/2 transform -translate-x-1/2 w-28 h-28 rounded-full border-4 border-orange-400 shadow-md overflow-hidden bg-white">
              <Image
                src={user.photo}
                alt={user.name}
                width={112}
                height={112}
                className="object-cover rounded-full"
              />
            </div>

            <h3 className="mt-4 text-2xl font-bold text-orange-400 text-center">{user.name}</h3>
            <p className="text-sm text-orange-200 text-center">{user.rm}</p>
            <p className="mt-2 text-sm text-orange-300 text-center">{user.role}</p>

            {selectedUserIndex === index && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4 }}
                className="mt-4 text-orange-200 text-sm space-y-3"
              >
                <p className="text-center font-semibold">Contribuições:</p>
                <p className="text-center">{user.contributions}</p>
                <p className="text-center font-semibold">Detalhes:</p>
                <p className="text-center">{user.details}</p>
              </motion.div>
            )}

            <div className="flex justify-center gap-6 mt-6">
              {user.github && (
                <motion.a
                  href={user.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2 }}
                  className="text-orange-300 hover:text-orange-500 transition-colors"
                >
                  <FaGithub size={24} />
                </motion.a>
              )}
              {user.linkedin && (
                <motion.a
                  href={user.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2 }}
                  className="text-orange-300 hover:text-orange-500 transition-colors"
                >
                  <FaLinkedin size={24} />
                </motion.a>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="mt-20 w-full flex justify-center">
        <BotaoVoltar />
      </div>
    </main>
  );
}
