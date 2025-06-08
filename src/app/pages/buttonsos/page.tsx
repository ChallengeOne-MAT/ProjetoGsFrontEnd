'use client'
import { FaMapMarkedAlt, FaUsers, FaComments, FaHandsHelping, FaPhoneAlt } from 'react-icons/fa'
import { MdSecurity, MdReport } from 'react-icons/md'
import Image from 'next/image';
import BotaoVoltar from '@/app/components/BotaoVoltar';

export default function ButtonSosPage() {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-10 flex flex-col items-center justify-center space-y-10">
      <section className="bg-gray-900 bg-opacity-90 backdrop-blur-md border border-yellow-500 shadow-2xl rounded-3xl p-8 max-w-3xl w-full animate-fade-in-up">
        <div className="flex mb-[5%] justify-center">
  <Image
    src="/icons/imgicon4.jpeg"
    alt="Logo"
    width={100}
    height={100}
  />
</div>

        <h1 className="text-4xl md:text-5xl font-extrabold text-yellow-400 text-center mb-6 tracking-wide">
          🚨 SafeCall: Sistema de Resposta Rápida
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-6 text-center leading-relaxed">
          O <span className="text-yellow-500 font-bold">SafeCall</span> é um WebApp inovador que oferece uma resposta eficiente a situações de emergência e desastres naturais. Com apenas um toque, cidadãos podem entrar em contato com autoridades, compartilhar sua localização e garantir que ajuda chegue rapidamente.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-start space-x-4">
            <FaPhoneAlt className="text-orange-400 text-3xl mt-1" />
            <div>
              <h3 className="text-xl font-semibold text-orange-400">Botão SOS</h3>
              <p className="text-gray-400">
                Acione os serviços de emergência com um único toque. Notificações automáticas e localização em tempo real garantem agilidade.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <FaMapMarkedAlt className="text-orange-400 text-3xl mt-1" />
            <div>
              <h3 className="text-xl font-semibold text-orange-400">Localização ao Vivo</h3>
              <p className="text-gray-400">
                Compartilhe sua posição em tempo real com autoridades e contatos para facilitar o resgate.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <FaUsers className="text-orange-400 text-3xl mt-1" />
            <div>
              <h3 className="text-xl font-semibold text-orange-400">Gerenciamento de Contatos</h3>
              <p className="text-gray-400">
                Adicione ou remova contatos de emergência conforme sua necessidade, com total controle.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <MdSecurity className="text-orange-400 text-3xl mt-1" />
            <div>
              <h3 className="text-xl font-semibold text-orange-400">Autoridades Integradas</h3>
              <p className="text-gray-400">
                Selecione entre bombeiros, polícia, SAMU, defesa civil e outras autoridades para um atendimento direcionado.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <MdReport className="text-orange-400 text-3xl mt-1" />
            <div>
              <h3 className="text-xl font-semibold text-orange-400">Envio de Relatórios</h3>
              <p className="text-gray-400">
                Registre o tipo de ocorrência, envie fotos e uma breve descrição antes do envio para a autoridade.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <FaComments className="text-orange-400 text-3xl mt-1" />
            <div>
              <h3 className="text-xl font-semibold text-orange-400">Chat Integrado</h3>
              <p className="text-gray-400">
                Converse com a autoridade responsável durante o atendimento, receba atualizações e instruções.
              </p>
            </div>
          </div>
        </div>
      </section>

        <div className="mt-20 w-full flex justify-center">
              <BotaoVoltar />
            </div>
    </main>
  )
}
