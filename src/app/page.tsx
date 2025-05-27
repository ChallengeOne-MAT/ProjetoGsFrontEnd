import { InformationCircleIcon } from '@heroicons/react/24/outline';

export default function Home() {
  const cards = [
    {
      title: 'Alertas Visuais e Táteis',
      description:
        'Notificações por luzes e vibração, ideais para pessoas com deficiência auditiva ou em ambientes silenciosos.',
      icon: <InformationCircleIcon className="h-12 w-12 text-indigo-600 group-hover:scale-110 transition-transform duration-300" />,
    },
    {
      title: 'Comunicação Direta',
      description:
        'Envio de mensagens rápidas, fotos e chamadas automáticas para serviços de emergência.',
      icon: <InformationCircleIcon className="h-12 w-12 text-indigo-600 group-hover:scale-110 transition-transform duration-300" />,
    },
    {
      title: 'Funcionalidade Offline',
      description:
        'Operação contínua mesmo sem conexão à internet, garantindo segurança em qualquer situação.',
      icon: <InformationCircleIcon className="h-12 w-12 text-indigo-600 group-hover:scale-110 transition-transform duration-300" />,
    },
  ];

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl transition-all duration-300">
            Sistema de Alerta Silencioso
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Um sistema inovador para alertar sobre desastres naturais, focado em acessibilidade e comunicação eficiente.
          </p>
        </div>

        <div className="mt-16 grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-8 flex flex-col items-center text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
            >
              {card.icon}
              <h3 className="mt-6 text-xl font-semibold text-gray-900">{card.title}</h3>
              <p className="mt-3 text-base text-gray-500">{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
