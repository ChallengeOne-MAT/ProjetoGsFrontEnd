import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const EscolhaPerfil = () => {
  const [tipoUsuario, setTipoUsuario] = useState<"usuario" | "adm" | null>(null);
  const [senhaADM, setSenhaADM] = useState('');
  const [carregando, setCarregando] = useState(false);
  const navigate = useNavigate();

  const senhaCorreta = 'admin123';

  useEffect(() => {
    if (carregando && tipoUsuario) {
      const timer = setTimeout(() => {
        setCarregando(false);
        if (tipoUsuario === 'usuario') {
          navigate('/home');
        }
      }, 2000); 
      return () => clearTimeout(timer);
    }
  }, [carregando, tipoUsuario, navigate]);

  const handleTipoSelecionado = (tipo: "usuario" | "adm") => {
    setTipoUsuario(tipo);
    setCarregando(true);
  };

  const handleLoginADM = () => {
    if (senhaADM === senhaCorreta) {
      navigate('/dashboard');
    }
  };

  if (carregando) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-700 text-lg">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      {!tipoUsuario && (
        <>
          <div className="text-6xl mb-6">🚨</div>
          <h1 className="text-2xl font-semibold mb-4">Você é Usuário ou ADM?</h1>
          <div className="flex gap-4">
            <button
              onClick={() => handleTipoSelecionado('usuario')}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-xl shadow"
            >
              Usuário
            </button>
            <button
              onClick={() => handleTipoSelecionado('adm')}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-xl shadow"
            >
              ADM
            </button>
          </div>
        </>
      )}

      {tipoUsuario === 'adm' && (
        <div className="mt-6 w-full max-w-sm">
          <h2 className="text-xl mb-2 text-center font-semibold">Digite a senha de ADM</h2>
          <input
            type="password"
            className="w-full p-2 rounded border"
            value={senhaADM}
            onChange={(e) => setSenhaADM(e.target.value)}
          />
          <button
            onClick={handleLoginADM}
            className="mt-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded w-full"
          >
            Entrar
          </button>
          {senhaADM && senhaADM !== senhaCorreta && (
            <p className="text-red-600 text-sm mt-2">Senha incorreta</p>
          )}
        </div>
      )}
    </div>
  );
};

export default EscolhaPerfil;
