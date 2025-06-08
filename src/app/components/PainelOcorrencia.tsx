import Image from 'next/image';
import BotaoVoltar from './BotaoVoltar';

const stats = [
  {
    title: 'Incidentes Registrados',
    value: 128,
    icon: '/icons/imgicon2.jpeg',
    color: 'text-orange-500',
    border: 'border-orange-500',
  },
  {
    title: 'Incidentes Resolvidos',
    value: 115,
    icon: '/icons/imgicon4.jpeg',
    color: 'text-green-500',
    border: 'border-green-500',
  },
  {
    title: 'Taxa de Prevenção',
    value: '90%',
    icon: '/icons/imgicon1.jpeg',
    color: 'text-yellow-400',
    border: 'border-yellow-400',
  },
  {
    title: 'Alertas Ativos',
    value: 5,
    icon: '/icons/imgicon3.jpeg',
    color: 'text-purple-500',
    border: 'border-purple-500',
  },
];

export default function PainelOcorrencias() {
  return (
    <section className="max-w-5xl mx-auto p-8 bg-[#121212] rounded-3xl border-4 border-orange-600 shadow-lg text-white">
      <h2 className="text-4xl font-extrabold text-orange-500 mb-10 text-center drop-shadow-lg">
        Painel de Ocorrências
      </h2>
      <p className="text-center text-orange-300 mb-12 max-w-3xl mx-auto">
        Acompanhe estatísticas vitais para análise e prevenção de futuros incidentes. 📈🧠
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map(({ title, value, icon, color, border }, i) => (
          <div
            key={i}
            className={`flex flex-col items-center p-6 rounded-3xl border-2 ${border} hover:scale-[1.05] transition-transform cursor-default`}
          >
            <div className="relative w-20 h-20 mb-4">
              <Image src={icon} alt={title} fill style={{ objectFit: 'contain' }} />
            </div>
            <h3 className={`text-xl font-semibold mb-2 ${color}`}>{title}</h3>
            <p className="text-3xl font-bold">{value}</p>
          </div>
        ))}
      </div>
       <div className="mt-20 w-full flex justify-center">
              <BotaoVoltar />
            </div>
    </section>
    
  );
}
