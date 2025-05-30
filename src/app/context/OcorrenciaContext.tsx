'use client'
import { createContext, useContext, useState, ReactNode } from 'react';

type Ocorrencia = {
  autoridade: string;
  evento: string;
  descricao?: string;
  foto?: File | null;
  localizacao?: string;
  cep?: string;
};

type OcorrenciaContextType = {
  ocorrencias: Ocorrencia[];
  adicionarOcorrencia: (oc: Ocorrencia) => void;
};

const OcorrenciaContext = createContext<OcorrenciaContextType | undefined>(undefined);

export function OcorrenciaProvider({ children }: { children: ReactNode }) {
  const [ocorrencias, setOcorrencias] = useState<Ocorrencia[]>([]);

  const adicionarOcorrencia = (oc: Ocorrencia) => {
    setOcorrencias(prev => [...prev, oc]);
  };

  return (
    <OcorrenciaContext.Provider value={{ ocorrencias, adicionarOcorrencia }}>
      {children}
    </OcorrenciaContext.Provider>
  );
}

export function useOcorrencia() {
  const context = useContext(OcorrenciaContext);
  if (!context) throw new Error('useOcorrencia precisa estar dentro de OcorrenciaProvider');
  return context;
}
