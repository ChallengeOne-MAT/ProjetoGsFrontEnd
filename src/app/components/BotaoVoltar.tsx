// components/BotaoVoltar.tsx
"use client";

import { useRouter } from "next/navigation";

interface BotaoVoltarProps {
  texto?: string;
  className?: string;
}

export default function BotaoVoltar({
  texto = "◀ Voltar",
  className = "",
}: BotaoVoltarProps) {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className={`
        w-[90%]          
        sm:w-2/3          
        md:w-1/2          
        lg:w-1/3          

        py-4            
        sm:py-3         
        bg-gray-700
        text-yellow-400
        rounded-lg
        hover:bg-gray-600
        transition
        focus:outline-none
        focus:ring-4
        focus:ring-yellow-400

        ${className}
      `}
    >
      {texto}
    </button>
  );
}
