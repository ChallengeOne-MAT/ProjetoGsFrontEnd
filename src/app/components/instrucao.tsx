'use client';

import { motion, AnimatePresence } from 'framer-motion';
import {
  ExclamationCircleIcon,
  FireIcon,
  CloudIcon,
  GlobeAltIcon,
  BoltIcon,
  ArrowTrendingUpIcon,
} from '@heroicons/react/24/outline';
import { useState } from 'react';

const disasters = [
  {
    title: '🌪️ Tornado',
    icon: <GlobeAltIcon className="h-14 w-14 text-orange-500" />,
    content: [
      'Vá imediatamente para um cômodo interno, de preferência um porão ou banheiro sem janelas',
      'Proteja sua cabeça e corpo com colchões ou cobertores pesados',
      'Evite ficar em carros ou estruturas frágeis. Se estiver ao ar livre, procure um abrigo mais baixo que o solo',
    ],
  },
  {
    title: '🔥 Incêndio Florestal',
    icon: <FireIcon className="h-14 w-14 text-red-600" />,
    content: [
      'Evacue a área assim que autoridades recomendarem. Não espere o fogo se aproximar',
      'Mantenha janelas e portas fechadas para evitar entrada de fumaça',
      'Use panos molhados para cobrir a boca e nariz em caso de fumaça',
    ],
  },
  {
    title: '🌊 Tsunami',
    icon: <ArrowTrendingUpIcon className="h-14 w-14 text-cyan-400" />,
    content: [
      'Afaste-se da costa imediatamente ao sentir um terremoto ou receber alerta de tsunami',
      'Procure abrigo em terrenos altos ou prédios com andares superiores',
      'Não retorne até que as autoridades confirmem que é seguro',
    ],
  },
  {
    title: '⚡ Tempestade Elétrica',
    icon: <BoltIcon className="h-14 w-14 text-yellow-500" />,
    content: [
      'Fique dentro de casa e evite usar eletrônicos conectados à tomada',
      'Afaste-se de janelas, portas e objetos metálicos',
      'Evite contato com água corrente (chuveiro, torneiras)',
    ],
  },
  {
    title: '💧 Enchente',
    icon: <CloudIcon className="h-14 w-14 text-cyan-600" />,
    content: [
      'Não tente atravessar ruas alagadas a pé ou de carro',
      'Desligue a energia elétrica se a água estiver entrando em casa',
      'Procure abrigos em locais elevados e mantenha-se informado pelas autoridades',
    ],
  },
  {
    title: '🌍 Terremoto',
    icon: <ExclamationCircleIcon className="h-14 w-14 text-orange-600" />,
    content: [
      'Durante o tremor, proteja-se debaixo de móveis pesados como mesas',
      'Evite janelas e objetos que possam cair',
      'Após o tremor, vá para áreas abertas e longe de prédios danificados',
    ],
  },
];

export default function Instrucao() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleActive = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="bg-black py-16 px-4 sm:px-8 md:px-16 min-h-screen flex flex-col items-center relative z-0">
      <h2 className="text-4xl sm:text-5xl font-extrabold text-orange-500 mb-14 drop-shadow-lg tracking-wide text-center max-w-4xl relative z-10">
        Instruções em Caso de Desastres Naturais
      </h2>

      <div className="w-full max-w-7xl flex flex-col-reverse lg:flex-col lg:grid lg:grid-cols-1 relative gap-y-28 sm:gap-y-32">
        {disasters.map((item, index) => (
          <motion.div
            key={index}
            layout
            onClick={() => toggleActive(index)}
            className={`bg-[#121212] rounded-3xl p-8 shadow-xl border-4 border-orange-600 cursor-pointer select-none flex flex-col relative z-10
              ${activeIndex === index ? 'scale-105 shadow-[0_15px_25px_rgba(255,140,0,0.8)]' : 'hover:scale-[1.03] hover:shadow-[0_10px_20px_rgba(255,140,0,0.6)]'}
            `}
            tabIndex={0}
            role="button"
            aria-expanded={activeIndex === index}
            aria-label={`Instruções para ${item.title}`}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleActive(index);
              }
            }}
            style={{
              filter: `drop-shadow(0 0 ${index * 4 + 8}px rgba(255,140,0,0.5))`,
              marginTop: index === 0 ? 0 : `-${index * 14}px`,
              zIndex: activeIndex === index ? 1000 : 1000 - index,
              transition: 'all 0.3s ease',
            }}
          >
            <div className="flex items-center space-x-5 mb-6">
              {item.icon}
              <h3 className="text-2xl font-semibold text-orange-400 tracking-wide select-text">
                {item.title}
              </h3>
            </div>
            <AnimatePresence initial={false}>
              {activeIndex === index && (
                <motion.ul
                  key="content"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4 }}
                  className="list-disc pl-7 text-orange-300 space-y-3 text-lg leading-relaxed break-words"
                >
                  {item.content.map((text, idx) => (
                    <li key={idx}>{text.replace(/\./g, '')}</li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
