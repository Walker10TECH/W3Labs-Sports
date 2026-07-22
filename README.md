# W3Labs Sports 🏆

Bem-vindo ao manual do usuário do **W3Labs Sports**, a sua plataforma de esportes completa com placares atualizados, estatísticas de partidas, animações fluidas e um design premium, desenvolvida com React Native (Expo) para Web e Mobile.

---

## 📖 O que é o Site?

O **W3Labs Sports** é um *Dashboard* e aplicativo multiplataforma dedicado aos amantes de futebol. A proposta do site é centralizar todas as informações importantes dos principais campeonatos do mundo, oferecendo desde os placares de jogos ao vivo até as classificações e notícias mais recentes das ligas. Tudo isso embalado em uma interface dinâmica, elegante e altamente imersiva.

---

## 🏗️ Estrutura e Conteúdo

A plataforma é dividida de forma intuitiva, focada nas principais ligas e competições. A sua estrutura de navegação permite ao usuário alternar facilmente entre campeonatos, e, dentro de cada campeonato, navegar pelas suas diferentes vertentes (jogos, classificação, etc).

### ⚽ Ligas Cobertas
Os dados são atualizados dinamicamente integrando as melhores APIs de esportes (ESPN API). O sistema abrange os maiores campeonatos mundiais e nacionais:
- **Competições Nacionais (Brasil):** Brasileirão Série A e B, Copa do Brasil, Paulistão, Cariocão, Mineiro e Gauchão.
- **Ligas Europeias:** Premier League (Inglaterra), La Liga (Espanha), Serie A (Itália), Bundesliga (Alemanha).
- **Competições Continentais:** Conmebol Libertadores e UEFA Champions League.
- **Ligas Internacionais:** Saudi Pro League (Arábia Saudita).

### 📊 Funcionalidades Principais
Para cada liga selecionada, o aplicativo oferece **4 visões principais**:
1. **📅 Jogos (Matches):** Lista as partidas recentes e as próximas rodadas. Exibe placares dinâmicos personalizados que mudam a identidade visual (cores, escudos e animações de gol) de acordo com o estilo visual específico de cada campeonato (Estilo CBF, Libertadores, Serie A, etc.).
2. **🏆 Classificação (Standings):** Tabela de classificação em tempo real, informando pontos, vitórias, saldo de gols e marcando as zonas de classificação (Ex: Zona de Libertadores, Sul-Americana, Rebaixamento).
3. **🛡️ Clubes (Teams):** Uma aba dedicada a explorar os detalhes, escudos e a escalação do elenco de cada clube participante da liga.
4. **📰 Notícias (News):** Feed atualizado de notícias e artigos recentes exclusivos do campeonato em questão.

### 🎨 Design e Interface (Glassmorphism e Premium UI)
- **Scoreboards Personalizados:** Os placares de partidas (*Scoreboards*) não são genéricos. Cada competição tem uma arte e animação gráfica própria. Por exemplo, a Libertadores tem placares centralizados com gradientes em verde/azul, enquanto o Brasileirão usa barrinhas coloridas e animadas para indicar de qual lado saiu um GOL.
- **Temas Dinâmicos (Dark/Light Mode):** A interface toda foi desenhada visando cores fortes, responsividade total no mobile e fundos estilizados de acordo com cada campeonato.
- **Cronômetro Ao Vivo:** Partidas em andamento ("in") ganham um relógio integrado calculando minutos e acréscimos automaticamente.

---

## 🌐 Como Acessar o Site

O site foi publicado com sucesso e já está disponível para acesso online!

**Link de Produção:**
👉 [https://w3labssports.expo.app](https://w3labssports.expo.app)

Você pode acessar este link de qualquer dispositivo (Computador, Tablet ou Smartphone) diretamente através do seu navegador preferido.

### 📱 Experiência Mobile First
O projeto foi construído pensando primeiramente na experiência móvel, garantindo que tudo funcione perfeitamente tanto no celular quanto no computador, graças ao uso de Tailwind CSS (NativeWind) e design responsivo (Glassmorphism).

---

## 🚀 Como Rodar o Projeto Localmente (Para Desenvolvedores)

Se você desejar rodar o projeto em sua própria máquina, siga os passos abaixo:

### Pré-requisitos
- Node.js instalado na sua máquina
- Gerenciador de pacotes (npm ou yarn)

### Passos:
1. **Instale as dependências** do projeto:
   ```bash
   npm install
   ```

2. **Inicie o servidor de desenvolvimento** do Expo:
   ```bash
   npx expo start
   ```

3. **Acesse no navegador**:
   Após iniciar, pressione a tecla `w` no terminal para abrir o aplicativo diretamente na Web.

---

## ⚙️ Tecnologias Utilizadas
- **React Native & Expo**: Framework principal (funciona como Single Page Application na Web e Native App no Mobile).
- **NativeWind (Tailwind CSS)**: Para a estilização visual moderna e criação de UI.
- **Lucide React Native**: Para o sistema de ícones vetoriais.
- **ESPN API**: Fonte de dados para puxar calendário, notícias, plantéis e tabelas.
- **Expo EAS**: Para o deploy e hospedagem do aplicativo Web na nuvem.

---
*Desenvolvido por W3Labs.*
