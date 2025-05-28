'use client';

import { motion } from 'framer-motion';
import {
  ExclamationCircleIcon,
  FireIcon,
  CloudIcon,
  GlobeAltIcon,
  BoltIcon,
  ArrowTrendingUpIcon, 
} from '@heroicons/react/24/outline';

const disasters = [
  {
    title: '🌪️ Tornado',
    icon: <GlobeAltIcon className="h-10 w-10 text-indigo-600" />,
    content: [
      'Vá imediatamente para um cômodo interno, de preferência um porão ou banheiro sem janelas.',
      'Proteja sua cabeça e corpo com colchões ou cobertores pesados.',
      'Evite ficar em carros ou estruturas frágeis. Se estiver ao ar livre, procure um abrigo mais baixo que o solo.',
    ],
  },
  {
    title: '🔥 Incêndio Florestal',
    icon: <FireIcon className="h-10 w-10 text-red-600" />,
    content: [
      'Evacue a área assim que autoridades recomendarem. Não espere o fogo se aproximar.',
      'Mantenha janelas e portas fechadas para evitar entrada de fumaça.',
      'Use panos molhados para cobrir a boca e nariz em caso de fumaça.',
    ],
  },
  {
    title: '🌊 Tsunami',
    icon: <ArrowTrendingUpIcon className="h-10 w-10 text-blue-600" />,
    content: [
      'Afaste-se da costa imediatamente ao sentir um terremoto ou receber alerta de tsunami.',
      'Procure abrigo em terrenos altos ou prédios com andares superiores.',
      'Não retorne até que as autoridades confirmem que é seguro.',
    ],
  },
  {
    title: '⚡ Tempestade Elétrica',
    icon: <BoltIcon className="h-10 w-10 text-yellow-500" />,
    content: [
      'Fique dentro de casa e evite usar eletrônicos conectados à tomada.',
      'Afaste-se de janelas, portas e objetos metálicos.',
      'Evite contato com água corrente (chuveiro, torneiras).',
    ],
  },
  {
    title: '💧 Enchente',
    icon: <CloudIcon className="h-10 w-10 text-cyan-600" />,
    content: [
      'Não tente atravessar ruas alagadas a pé ou de carro.',
      'Desligue a energia elétrica se a água estiver entrando em casa.',
      'Procure abrigos em locais elevados e mantenha-se informado pelas autoridades.',
    ],
  },
  {
    title: '🌍 Terremoto',
    icon: <ExclamationCircleIcon className="h-10 w-10 text-orange-500" />,
    content: [
      'Durante o tremor, proteja-se debaixo de móveis pesados como mesas.',
      'Evite janelas e objetos que possam cair.',
      'Após o tremor, vá para áreas abertas e longe de prédios danificados.',
    ],
  },
];

export default function Instrucao() {
  return (
    <div className="bg-white py-20 px-6 sm:px-12 lg:px-24 min-h-screen">
      <h2 className="text-4xl font-bold text-center text-indigo-700 mb-16">
        Instruções em Caso de Desastres Naturais
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {disasters.map((item, index) => (
          <motion.div
            key={index}
            className="bg-indigo-50 rounded-xl p-6 shadow-md hover:shadow-xl transition-all border-l-4 border-indigo-400"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="flex items-center space-x-3 mb-4">
              {item.icon}
              <h3 className="text-xl font-semibold text-indigo-800">{item.title}</h3>
            </div>
            <ul className="list-disc pl-5 text-gray-700 space-y-2">
              {item.content.map((text, idx) => (
                <li key={idx} className="leading-relaxed">{text}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
