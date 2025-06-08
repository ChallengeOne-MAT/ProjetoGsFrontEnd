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

cpf (administrador da SAFECALL)

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


Interface de chat simples:

Envio e recebimento de mensagens.

Uso contínuo até a finalização do atendimento.

Autoridade pode solicitar mais detalhes ao chegar no local.


🧰 Tecnologias Utilizadas

Google Maps API (localização em tempo real)



git clone https://github.com/seuusuario/SafeCall-App.git
cd SafeCall-App
npm install
nmp run dev
Acesse o app em um dispositivo mobile ou outros tipos de telas.

🎥 Demonstração
Clique aqui para ver o vídeo de apresentação do SafeCall:
hhtps:

🌍 Exemplos de Uso
Usuário presencia um incêndio → Pressiona SOS → Escolhe "Bombeiros" → Tira foto do incêndio → Escreve "fogo em casa ao lado" → Envia → Chat aberto para suporte contínuo.

Enchente repentina no bairro → Escolhe "Defesa Civil" → Compartilha localização e estado do local.

🔐 Principais APIs do Projeto
📤 Envio de Relatório

Copiar
Editar
POST /api/emergencia/usuario
Payload:
{
  cpfUsuario: "123.456.789-00",
  senha: "senhaJoao456",
  telefone: "11915353752"
}

