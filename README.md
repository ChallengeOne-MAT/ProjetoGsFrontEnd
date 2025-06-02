🆘 SafeCall: Sistema de Resposta Rápida a Emergências e Desastres Naturais
Bem-vindo ao repositório do SafeCall!
Este WebApp foi desenvolvido para oferecer uma resposta eficiente a situações de emergência e desastres naturais, possibilitando comunicação rápida com autoridades e contatos de emergência.

👨‍💻 Integrantes do Time
Nome Lucas Almeida de Siqueira - RM XXXXXXX

Nome Sulamita Viégas dos Santos - RM 561089

Nome Matteus Viégas dos Santos- RM 561090

Obrigado por visitar o nosso repositório!

🧭 Objetivo do Projeto
O SafeCall permite que qualquer cidadão acione rapidamente os serviços de emergência, envie informações precisas sobre a situação, e mantenha comunicação ativa com autoridades responsáveis. O sistema também compartilha localização em tempo real com os contatos cadastrados para maior segurança.

✅ Funcionalidades Implementadas
1. Cadastro de Usuário e Autoridade
Usuário:

CPF

Senha

Número de celular

Autoridade (único cadastro para todos):

CNPJ (SAFECALL)

Senha

2. Tela de Emergência (Botão SOS)
Um botão central grande "SOS".

Ao ser pressionado:

Notifica todos os contatos de emergência.

Compartilha a localização em tempo real.

Permite:

Adicionar/Remover contatos de emergência.

3. Escolha da Autoridade
Lista de autoridades disponíveis:

Bombeiros

Polícia

SAMU

Controle de Zoonoses

Defesa Civil (✅ sugestão extra)

Guarda Municipal

Equipes de Resgate Voluntário

Força Nacional (em casos extremos)

Ações:

Selecionar autoridade e prosseguir.

Ícone de chamada rápida.

4. Filtragem Rápida da Situação
Exibe eventos possíveis conforme a autoridade selecionada.
Exemplo:

Bombeiros: incêndio, resgate em altura, desabamento.

Defesa Civil: enchentes, deslizamentos, evacuação preventiva.

Permite:

Enviar foto da situação (opcional).

Escrever descrição da ocorrência (opcional).

Enviar relatório para a autoridade.

5. Chat com a Autoridade
Exibe o status do atendimento:

Aguardando

Em atendimento

Encerrado

Interface de chat simples:

Envio e recebimento de mensagens.

Uso contínuo até a finalização do atendimento.

Autoridade pode solicitar mais detalhes ao chegar no local.

🛠 Roadmap do Projeto
📌 Fase 1: Planejamento e Protótipo
Criação de wireframes (Figma)

Definição de cores, tipografia e layout

🧱 Fase 2: Estrutura Inicial
Tela de cadastro

Tela SOS com botão funcional

Lista de autoridades

🔧 Fase 3: Funcionalidades Avançadas
Compartilhamento de localização

Filtro inteligente por tipo de desastre

Upload de imagem e descrição

Integração com chat

🧰 Tecnologias Utilizadas

Google Maps API (localização em tempo real)


📁 Estrutura de Pastas (Exemplo)
bash
Copiar
Editar
/src
  /screens
    CadastroUsuario.tsx
    CadastroAutoridade.tsx
    TelaSOStsx
    EscolhaAutoridade.tsx
    FiltragemSituacao.tsx
    Chat.tsx
  /components
    BotaoSOS.tsx
    ListaAutoridades.tsx
  /services
    auth.tsx
    api.tsx
  /assets
    icons/
    images/
🧪 Como Rodar o Projeto
bash
Copiar
Editar
git clone https://github.com/seuusuario/SafeCall-App.git
cd SafeCall-App
npm install
npm run android
Acesse o app em um dispositivo Android com emulador ou USB debugging ativado.

🎥 Demonstração
Clique aqui para ver o vídeo de apresentação do SafeCall

🌍 Exemplos de Uso
Usuário presencia um incêndio → Pressiona SOS → Escolhe "Bombeiros" → Tira foto do incêndio → Escreve "fogo em casa ao lado" → Envia → Chat aberto para suporte contínuo.

Enchente repentina no bairro → Escolhe "Defesa Civil" → Compartilha localização e estado do local.

🔐 Principais APIs do Projeto
📤 Envio de Relatório
css
Copiar
Editar
POST /api/emergencia/relatorio
Payload:
{
  cpfUsuario: "123.456.789-00",
  autoridade: "Bombeiros",
  descricao: "Incêndio em galpão",
  localizacao: { lat: -23.5, lng: -46.6 },
  imagem: "url_da_imagem"
}
💬 Mensagens em Tempo Real (WebSocket ou Firebase)

