# 🆘 SafeCall: Sistema de Resposta Rápida a Emergências e Desastres Naturais

Bem-vindo ao repositório do **SafeCall**!  
Este WebApp foi desenvolvido para oferecer uma resposta eficiente a situações de emergência e desastres naturais, possibilitando comunicação rápida com autoridades e contatos de emergência.

---

## 👨‍💻 Integrantes do Time

- **Lucas Almeida de Siqueira** - RM 560914  
- **Sulamita Viégas dos Santos** - RM 561089  
- **Matteus Viégas dos Santos** - RM 561090  

Obrigado por visitar o nosso repositório!

---

## 🧭 Objetivo do Projeto

O **SafeCall** permite que qualquer cidadão acione rapidamente os serviços de emergência, envie informações precisas sobre a situação e mantenha comunicação ativa com autoridades responsáveis.  
O sistema também compartilha **localização em tempo real** com os contatos cadastrados para maior segurança.

---

## 🌐 Acesse o Projeto

🔗 [Acesse o WebApp na Vercel:https://projeto-gs-front-end-9smh.vercel.app

---

## ✅ Funcionalidades Implementadas

### 📋 Cadastro de Usuário e Autoridade

**Usuário:**
- CPF  
- Senha  
- Número de celular  

**Autoridade (único cadastro para todos):**
- CPF (administrador da SAFECALL)  
- Senha  

---

### 🚨 Tela de Emergência (Botão SOS)

- Um botão central grande "SOS".  
- Ao ser pressionado:
  - Notifica todos os contatos de emergência.
  - Compartilha a localização em tempo real.  
- Permite:
  - Adicionar/Remover contatos de emergência.

---

### 🛂 Escolha da Autoridade

Lista de autoridades disponíveis:
- Bombeiros
- Polícia
- SAMU
- Controle de Zoonoses

**Ações:**
- Selecionar autoridade e prosseguir
- Ícone de chamada rápida

---

### 🔍 Filtragem Rápida da Situação

- Exibe eventos possíveis conforme a autoridade selecionada.  
- **Exemplo:**
  - Bombeiros: incêndio, resgate em altura, desabamento.
  - Defesa Civil: enchentes, deslizamentos, evacuação preventiva.

**Permite:**
- Enviar foto da situação (opcional)  
- Escrever descrição da ocorrência (opcional)  
- Enviar relatório para a autoridade

---

### 💬 Chat com a Autoridade

- Interface de chat simples
- Envio e recebimento de mensagens
- Uso contínuo até a finalização do atendimento
- Autoridade pode solicitar mais detalhes ao chegar no local

---

###   ---. ACESSO AO PAINEL ADM <----

         CPF: 987.654.321-00
         SENHA: admin123 

## 🧰 Tecnologias Utilizadas

- **Google Maps API** (localização em tempo real)  
- Front-end hospedado na Vercel  
- Git/GitHub  
- Node.js (presumido)

---

## 📦 Como Executar Localmente

```bash
git clone https://github.com/ChallengeOne-MAT/ProjetoGsFrontEnd.git
cd SafeCall-App
npm install
npm run dev



## 🎥 Demonstração
Clique aqui para ver o vídeo de apresentação do SafeCall:  
🎬 https://youtu.be/0_C4b_yxTHI?si=gTLIE9yuoGh1VJ92

---

## 🌍 Exemplos de Uso

**Incêndio:**  
Usuário presencia um incêndio → Pressiona **SOS** → Escolhe **"Bombeiros"** → Tira foto do incêndio → Escreve *"fogo em casa ao lado"* → Envia → Chat aberto para suporte contínuo.

**Enchente:**  
Enchente repentina no bairro → Escolhe **"Defesa Civil"** → Compartilha localização e estado do local.

---

## 🔐 Principais APIs do Projeto

### 📤 Envio de Relatório

**Endpoint:**  
`POST /api/emergencia/usuario`

**Payload de exemplo:**

```json
{
  "cpfUsuario": "123.456.789-00",
  "senha": "senhaJoao456",
  "telefone": "11915353752"
}
⚠️ Problema com CORS na API
Durante o desenvolvimento, foi identificado um problema relacionado a CORS (Cross-Origin Resource Sharing) ao tentar fazer requisições para a API.

❓ O que é o erro de CORS?
O erro de CORS ocorre quando o navegador bloqueia uma requisição feita por uma aplicação web para um domínio diferente daquele onde a aplicação está hospedada.
Isso acontece por motivos de segurança, para impedir que sites maliciosos façam requisições não autorizadas a outros servidores.

🧨 Como isso afeta a aplicação?
Ao tentar enviar dados para a API (http://localhost:8080/usuario), as requisições são bloqueadas pelo navegador, impedindo que o cadastro funcione corretamente.

🧩 Possível causa
A API não está configurada para aceitar requisições vindas do domínio onde a aplicação front-end está rodando (ex: http://localhost:3000).

perl
Copiar
Editar

Pode colar isso direto no seu `README.md` no GitHub. Se quiser que eu una tudo em um único arquivo com o restante 


## 🎥 Demonstração
Clique aqui para ver o vídeo de apresentação do SafeCall:  
🎬 https://youtu.be/0_C4b_yxTHI?si=gTLIE9yuoGh1VJ92

---

## 🌍 Exemplos de Uso

**Incêndio:**  
Usuário presencia um incêndio → Pressiona **SOS** → Escolhe **"Bombeiros"** → Tira foto do incêndio → Escreve *"fogo em casa ao lado"* → Envia → Chat aberto para suporte contínuo.

**Enchente:**  
Enchente repentina no bairro → Escolhe **"Defesa Civil"** → Compartilha localização e estado do local.

---

## 🔐 Principais APIs do Projeto

### 📤 Envio de Relatório

**Endpoint:**  
`POST /api/emergencia/usuario`

**Payload de exemplo:**

```json
{
  "cpfUsuario": "123.456.789-00",
  "senha": "senhaJoao456",
  "telefone": "11915353752"
}
