'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import Image from 'next/image';

export default function IntegrantesPage() {
  const [selectedUserIndex, setSelectedUserIndex] = useState<number | null>(null);

  const users = [
    {
      name: 'Lucas',
      rm: 'RM5',
      role: 'Responsável pelo back-end',
      contributions: 'Integração com APIs, autenticação e lógica de dados em tempo real.',
      details: 'Lucas é especializado em construir a base sólida do sistema. Trabalhou no backend e integração com serviços externos.',
      github: '',
      linkedin: '',
      photo: '/img/pedro.JPEG',
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
    <main className="p-6 max-w-xl mx-auto">
      <section className="mt-20">
        <h2 className="text-3xl font-bold text-[#42807D] text-center mb-20">Membros do Projeto</h2>
        <motion.div
          className="w-full grid sm:grid-cols-2 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {users.map((user, index) => (
            <motion.div
              key={index}
              className={`relative p-6 pt-20 mb-10 rounded-xl shadow-md bg-white border-4 
                ${
                  selectedUserIndex === index
                    ? 'border-green-600 scale-105 shadow-2xl'
                    : 'border-blue-600'
                }
                hover:shadow-xl cursor-pointer text-center transition-all duration-300`}
              whileHover={{ scale: 1.05 }}
              onClick={() => setSelectedUserIndex(index)}
            >
              <div className="absolute top-[-48px] left-1/2 transform -translate-x-1/2 w-24 h-24 rounded-full border-4 border-blue shadow-lg overflow-hidden">
                <Image
                  src={user.photo}
                  alt={user.name}
                  width={126}
                  height={126}
                  className="object-cover rounded-full"
                />
              </div>
              <h1 className="font-bold text-xl text-[#42807D] mt-3">{user.name}</h1>
              <p className="text-sm text-gray-500">{user.rm}</p>
              <div className="flex justify-center gap-4 mt-2">
                {user.github && (
                  <motion.a
                    href={user.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.3 }}
                  >
                    <FaGithub size={20} />
                  </motion.a>
                )}
                {user.linkedin && (
                  <motion.a
                    href={user.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.3 }}
                  >
                    <FaLinkedin size={20} />
                  </motion.a>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </main>
  );
}
