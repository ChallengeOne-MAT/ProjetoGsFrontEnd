export default function AjudaPage() {
  return (
    <main className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🆘 Rotas e Abrigos Seguros</h1>
      <ul className="space-y-4">
        <li className="bg-blue-50 p-4 rounded border-l-4 border-blue-500">
          <strong>Escola Municipal Ana Neri</strong><br />
          Endereço: Rua das Flores, 123<br />
          Recursos: Água, alimentos, atendimento médico
        </li>
        <li className="bg-blue-50 p-4 rounded border-l-4 border-blue-500">
          <strong>Clube Social do Bairro Nova Esperança</strong><br />
          Endereço: Av. Central, 500<br />
          Recursos: Abrigo temporário, Wi-Fi, roupas
        </li>
      </ul>

      <h2 className="mt-8 text-xl font-semibold">Recomendações Gerais:</h2>
      <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-700">
        <li>Leve documentos importantes com você.</li>
        <li>Mantenha seu celular carregado.</li>
        <li>Avise familiares do seu paradeiro.</li>
      </ul>
    </main>
  );
}
