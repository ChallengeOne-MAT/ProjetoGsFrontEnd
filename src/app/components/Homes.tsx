'use client';

import { useState, useEffect } from 'react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import BotaoVoltar from './BotaoVoltar';
import Footer from './Footer';
import SosEnergency from './SosEnergency';

type Contato = {
  id: number;
  nome: string;
  telefone: string;
};

const sections = [
 {
  id: 'explicacoes',
  title: '📚 Como agir em desastres naturais',
  description:
    'Conheça atitudes rápidas e inteligentes para proteger vidas durante enchentes, terremotos e outros eventos críticos. 🧭🚨',
  link: '/pages/instrucao',
  image: '/icons/imgicon1.jpeg' 
},
 {
    id: 'sos-info',
    title: '🆘 Sobre o Botão SOS',
    description:
      'Entenda como o botão salva vidas com apenas um toque. Segurança garantida e notificação imediata. 🔒📡',
    link: '/pages/buttonsos',
  },
  {
    id: 'historico',
    title: '📜 Histórico de Ações',
    description:
      'Visualize cada passo tomado em emergências anteriores com registros claros e organizados. 🗂️📅',
    link: '/pages/HistoricoAcoes',
  },
  {
    id: 'dashboard',
    title: '📊 Painel de Ocorrências',
    description:
      'Acompanhe estatísticas vitais para análise e prevenção de futuros incidentes. 📈🧠',
    link: '/pages/PainelOcorrencia',
  },
];

export default function Home() {
  const [sosStatus, setSosStatus] = useState(false);
  const [popupMessage, setPopupMessage] = useState<string | null>(null);
  const [contatos, setContatos] = useState<Contato[]>([]);
  const router = useRouter();

  useEffect(() => {
    const dados = localStorage.getItem('contatosEmergencia');
    if (dados) {
      try {
        setContatos(JSON.parse(dados));
      } catch {
        setContatos([]);
      }
    }
  }, []);

  const salvarLocalizacao = (lat: number, lng: number) => {
    const localizacao = { latitude: lat, longitude: lng, timestamp: Date.now() };
    localStorage.setItem('ultimaLocalizacao', JSON.stringify(localizacao));
    console.log('Localização salva no localStorage:', localizacao);
  };

  const mostrarPopup = (mensagem: string) => {
    setPopupMessage(mensagem);
    setTimeout(() => setPopupMessage(null), 7000);
  };

  const dispararNotificacoes = () => {
    if (typeof window === 'undefined' || typeof Notification === 'undefined') return;

    if (!('Notification' in window)) {
      mostrarPopup('Seu navegador não suporta notificações.');
      return;
    }

    if (Notification.permission === 'granted') {
      contatos.forEach((contato) => {
        new Notification('Alerta SOS!', {
          body: `O usuário acionou o SOS. Notificando: ${contato.nome} (${contato.telefone})`,
        });
      });
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          contatos.forEach((contato) => {
            new Notification('Alerta SOS!', {
              body: `O usuário acionou o SOS. Notificando: ${contato.nome} (${contato.telefone})`,
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

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;

          salvarLocalizacao(lat, lng);

          mostrarPopup(
            `📲 Contatos notificados:\n${contatos
              .map((c) => `- ${c.nome}: ${c.telefone}`)
              .join('\n')}\n⚠️ Siga as instruções a seguir!`
          );

          dispararNotificacoes();

          setTimeout(() => {
            router.push('/pages/autoridades');
          }, 2000);
        },
        () => {
          mostrarPopup(
            `❌ Não foi possível obter localização.\n📲 Contatos notificados:\n${contatos
              .map((c) => `- ${c.nome}: ${c.telefone}`)
              .join('\n')}`
          );

          dispararNotificacoes();

          setTimeout(() => {
            router.push('/pages/autoridades');
          }, 2000);
        }
      );
    } else {
      mostrarPopup('❌ Geolocalização não suportada pelo navegador.');

      dispararNotificacoes();

      setTimeout(() => {
        router.push('/pages/autoridades');
      }, 2000);
    }
  };

  return (
    <div className="bg-black text-white min-h-screen py-16 px-4 sm:px-6 lg:px-8 space-y-8 font-sans scroll-smooth relative">
    
    
      <section className="max-w-7xl text-center px-4 sm:px-6 lg:px-8">
        
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4 }}
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold drop-shadow-lg tracking-wider text-orange-400"
        >
          Proteção{' '}
          <span className="text-red-500 hover:text-red-600 transition duration-300">Imediata</span>{' '}
          na{' '}
          <span className="text-yellow-400 hover:text-yellow-500 transition duration-300">
            Palma da Mão
          </span>
        </motion.h1>
        <p className="mt-8 text-white text-lg sm:text-xl md:text-2xl max-w-4xl mx-auto font-semibold text-center leading-relaxed tracking-wide drop-shadow-xl">
          Um sistema inteligente que te conecta à ajuda em segundos.
          <br className="hidden sm:block" /> Pensado para salvar vidas com{' '}
          <span className="text-orange-400">tecnologia</span>,{' '}
          <span className="text-yellow-400">acessibilidade</span> e{' '}
          <span className="text-red-500">velocidade</span>.
        </p>
            <SosEnergency/>

        <p className="mt-16 text-white text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto font-semibold text-center leading-relaxed tracking-wide drop-shadow-xl animate-pulse">
          Toque abaixo em caso de emergência.
          <br className="hidden sm:block" />
          <span className="text-orange-500">Notificações automáticas</span> serão enviadas instantaneamente. 🚑📡
        </p>
      </section>

      <motion.section
        className="max-w-4xl mx-auto text-center p-8 sm:p-10 rounded-3xl shadow-2xl "
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5 }}
      >
        <ExclamationTriangleIcon className="mx-auto h-20 w-20 text-red-500 animate-pulse" />
        <motion.button
          onClick={handleSosClick}
          disabled={sosStatus}
          whileHover={sosStatus ? {} : { scale: 1.05 }}
          whileTap={sosStatus ? {} : { scale: 0.95 }}
          className={`mt-6 w-full sm:w-[60%] md:w-[50%] lg:w-[40%] px-10 py-6 sm:px-12 sm:py-5 rounded-full font-extrabold text-white text-xl sm:text-lg ${
            sosStatus
              ? 'bg-gray-600 cursor-not-allowed'
              : 'bg-red-600 animate-pulse hover:bg-red-700'
          } transition-all shadow-[0_0_20px_4px_rgba(255,0,0,0.5)]`}
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
              className={`
                w-full max-w-4xl bg-zinc-800 p-8 sm:p-10 rounded-3xl shadow-xl flex flex-col ${
                  isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                } items-center gap-6
                border-4
                hover:animate-[pulseBorder_4s_infinite]
                ${isEven ? 'border-orange-500' : 'border-yellow-400'}
              `}
              initial={{ opacity: 0, x: isEven ? -100 : 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2 }}
              whileHover={{ scale: 1.01 }}
            >
              <div className="max-w-lg text-center sm:text-left font-light tracking-wide w-full">
        
                <h3 className="text-2xl sm:text-3xl font-bold text-orange-300 mb-4 drop-shadow-md tracking-wide">
                  {sec.title}
                </h3>
                <p className="text-gray-200 mb-6 brightness-125 leading-relaxed text-base sm:text-lg">
                  {sec.description}
                </p>
                <div
                  className={`w-full flex ${
                    isEven ? 'justify-center md:justify-start' : 'justify-center md:justify-end'
                  }`}
                >
                  <Link href={sec.link}>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-400 transition-all font-semibold text-base sm:text-lg shadow-md hover:shadow-orange-300"
                    >
                      🔍 Ver mais
                    </motion.button>
                  </Link>
                </div>
              </div>
            </motion.section>
          );
        })}
      </div>

      <motion.section
        id="integrantes"
        className="max-w-5xl mx-auto bg-zinc-900 rounded-2xl p-8 shadow-xl text-center mt-20 border-4 border-yellow-500 hover:border-orange-400 transition-all"
        whileHover={{ scale: 1.01 }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      >
        
        <h3 className="text-2xl sm:text-3xl font-bold text-yellow-400 mb-4 tracking-wide drop-shadow-lg">
          👥 Nossa Equipe
        </h3>
        <div className="mt-6">
          <Link
            href="/integrantes"
            className="inline-flex items-center px-6 py-3 bg-yellow-500 text-black font-semibold rounded-full hover:bg-yellow-400 transition-all text-base sm:text-lg shadow-md"
          >
            🔍 Ver Integrantes
          </Link>
        </div>
         <div className="mt-20 w-full flex justify-center">
                <BotaoVoltar />
              </div>
      </motion.section>
                <Footer/>


      {popupMessage && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-6 right-6 max-w-sm bg-gray-800 bg-opacity-70 text-white p-4 rounded-lg shadow-lg z-50 whitespace-pre-line font-semibold text-sm leading-relaxed"
        >
          {popupMessage}
        </motion.div>
      )}

      <style jsx>{`
        @keyframes pulseBorder {
          0% {
            border-color: red;
          }
          50% {
            border-color: yellow;
          }
          100% {
            border-color: red;
          }
        }
      `}</style>
    </div>
    
  );
}
