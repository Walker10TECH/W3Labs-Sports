# 🏆 W3Labs Sports — v2.0

> Plataforma web moderna de acompanhamento esportivo com placares ao vivo, animações customizadas por campeonato, tabelas de classificação, artilharia, notícias e transmissões — tudo em um único painel responsivo.

![Versão](https://img.shields.io/badge/versão-2.0.0-blue)
![Status](https://img.shields.io/badge/status-ativo-success)
![Licença](https://img.shields.io/badge/licença-MIT-green)

---

## 📖 Sobre

O **W3Labs Sports v2.0** é uma reescrita completa da plataforma, trazendo um **Design System refinado**, **placares animados por competição**, integração com **múltiplas APIs** (ESPN, Wikipedia, ReidosCanais, OpenF1) e suporte a **Picture-in-Picture** para acompanhar partidas ao vivo em uma janela flutuante.

O foco da versão 2.0 é entregar uma experiência visual imersiva, com identidade própria para cada campeonato (cores, tipografia, animações de gol, cartões, substituições e VAR), além de performance otimizada e suporte completo a temas claro/escuro.

---

## ✨ Principais Recursos

### 🎨 Design System
- **Tema escuro / claro** com transição suave e persistência via `localStorage`
- Paleta de cores baseada em CSS Custom Properties (`--bg-primary`, `--accent`, `--card-bg`, etc.)
- Componentes de vidro (`glass-panel`), navbar flutuante e sidebar colapsável
- Tipografia: **Lexend**, **Montserrat**, **Oswald** e **Roboto Condensed**

### ⚽ Múltiplas Competições
13 campeonatos pré-configurados, cada um com **logo, background temático, clubes e overrides de escudos**:

| Região | Competições |
|--------|-------------|
| 🇧🇷 Brasil | Brasileirão Série A · Série B · Copa do Brasil · Paulistão · Cariocão · Mineiro · Gauchão |
| 🌍 Europa | Premier League · La Liga · Serie A (ITA) · Bundesliga · Champions League |
| 🌎 América do Sul | Libertadores |
| 🌍 Oriente Médio | Saudi Pro League |

### 📺 Placares Animados por Liga
Cada campeonato possui um **widget de placar único**, com animações de intro, gol, cartão, substituição e VAR:

- **CBF Theme** — Brasileirão A/B e Copa do Brasil (barra branca com faixas coloridas)
- **Serie A Italiana** — placar 3D com escudo central e clip-paths diagonais
- **Libertadores** — barra preta estilo CONMEBOL com event bar dinâmico
- **Gauchão** — placar moderno com faixa de bandeira no rodapé
- **Brasileirão Default** — placar clássico com overlay de GOL animado
- **Premier League** — gradiente verde/ciano com gradiente roxo no gol

### 📊 Views Disponíveis (por liga)
- **Jogos** — scoreboard ao vivo com filtro por data (Flatpickr)
- **Classificação** — tabela com zonas coloridas (Libertadores, Pré-Libertadores, Sul-Americana, Rebaixamento)
- **Clubes** — grid de times com integração Wikipedia + agenda + elenco
- **Artilharia** — top 20 goleadores via ESPN Leaders API
- **Notícias** — últimas manchetes do ESPN
- **Mata-Mata** — chaveamento dinâmico (bracket) para torneios eliminatórios

### 🔍 Busca Global
- Busca unificada por **clubes** e **jogadores** em tempo real
- Integração com o banco de jogadores (`PLAYER_DB_DATA`)
- Ações diretas: abre agenda do time ou wiki do atleta

### 📺 Transmissão & PiP
- Detecção automática de **fontes de stream** via API ReidosCanais
- Fallback em cascata: busca por nome → eventos ao vivo → canais da categoria
- **Picture-in-Picture** nativo (`documentPictureInPicture`) com placar em miniatura
- **Media Session API** — controles de mídia no sistema operacional com placar e tempo em tempo real

### ⏱️ Atualização ao Vivo
- Polling automático de partidas em andamento a cada **15 segundos**
- Timer de jogo recalculado localmente (minuto + acréscimos)
- Detecção de eventos novos: gols, cartões, substituições e VAR

---

## 🛠️ Stack Tecnológica

| Camada | Tecnologia |
|--------|------------|
| **Markup** | HTML5 semântico |
| **Estilos** | CSS3 (Custom Properties, Grid, Flexbox, clip-path, animations) |
| **UI Framework** | Tailwind CSS (via CDN) |
| **Lógica** | JavaScript vanilla (ES6+), arquitetura em objeto `app` |
| **Ícones** | [Lucide Icons](https://lucide.dev/) |
| **Datepicker** | [Flatpickr](https://flatpickr.js.org/) com locale PT-BR |
| **Fontes** | Google Fonts (Lexend, Montserrat, Oswald, Roboto Condensed) |

---

## 🔌 APIs Utilizadas

```javascript
API_CONFIG = {
  espn:        'https://site.api.espn.com'   // Scoreboard, Standings, News, Roster, Leaders
  wikipedia:   'https://pt.wikipedia.org'    // Wiki de clubes e jogadores
  streaming:   'https://api.reidoscanais.si' // Fontes de transmissão
  openF1:      'https://api.openf1.org/v1'   // (reservado para futuras modalidades)
}
```

### Endpoints ESPN utilizados
- `/scoreboard` — partidas por data
- `/standings` — classificação e bracket
- `/summary` — detalhes da partida (stats, lineups, timeline)
- `/teams` — lista de clubes
- `/teams/{id}/schedule` — agenda do time
- `/teams/{id}/roster` — elenco
- `/news` — notícias
- `/leagues/{id}/seasons/{season}/types/1/leaders` — artilharia

---

## 📁 Estrutura do Projeto

```
W3Labs-Sports/
├── index.html          # Estrutura da aplicação (header, sidebar, views, modais)
├── style.css           # Design System completo + temas de placar por liga
├── script.js           # Lógica principal (SPORTS_DB, API_CONFIG, objeto app)
└── README.md           # Este arquivo
```

### Organização do `script.js`

```javascript
SPORTS_DB      // Configuração das ligas (id, apiFootballId, logo, bg, clubs, logoOverrides)
API_CONFIG     // Endpoints centralizados das APIs
app            // Objeto com todo o estado e métodos da aplicação
  ├── state              // Estado global (sport, league, date, view, theme...)
  ├── init()             // Bootstrap
  ├── loadDataForView()  // Roteador de views
  ├── fetchMatches()     // Jogos + polling ao vivo
  ├── fetchStandings()   // Classificação
  ├── fetchScorers()     // Artilharia
  ├── fetchNews()        // Notícias
  ├── renderClubs()      // Grid de clubes
  ├── showTeamSchedule() // Agenda + elenco
  ├── loadWikiDetail()   // Wiki Wikipedia
  ├── openMatch()        // Modal detalhado
  ├── fetchBroadcast…()  // Transmissões
  ├── trigger*Animation()// Animações (gol, cartão, sub, VAR)
  └── Pip / MediaSession // PiP e controles de mídia
```

---

## 🚀 Como Executar

### Pré-requisitos
- Navegador moderno (Chrome 116+, Edge 116+ para suporte completo a PiP)
- Conexão com a internet (APIs externas)

### Execução local

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/W3Labs-Sports.git
cd W3Labs-Sports

# Sirva com qualquer servidor estático
python -m http.server 8080
# ou
npx serve .
```

Depois acesse `http://localhost:8080`.

> ⚠️ **Importante:** não abra o `index.html` diretamente via `file://` — algumas APIs (CORS + `origin=*` da Wikipedia) exigem um servidor HTTP.

---

## 🎮 Como Usar

| Ação | Como fazer |
|------|-----------|
| Trocar de esporte | Sidebar → seção "Esportes" |
| Trocar de liga | Sidebar → "Competições" (ou menu mobile) |
| Alterar data dos jogos | Ícone de calendário no topo da view "Jogos" |
| Ver detalhes de uma partida | Clique no card do placar |
| Ativar Picture-in-Picture | Abra uma partida → botão PiP no header do modal |
| Alternar tema | Botão de lua/sol no header |
| Buscar clubes/jogadores | Campo de busca no header |
| Ver wiki do clube | View "Clubes" → clique no card |

---

## 🎬 Sistema de Animações

Cada liga dispara animações específicas a partir de eventos da API:

| Evento | Método | Ligas |
|--------|--------|-------|
| Intro do placar | `playCbfIntro` / `playSerieAIntro` / `playGauchaoIntro` / `playBrasileiraoIntro` | Todas |
| Gol | `triggerCbfGoalAnimation` / `triggerSerieAGoalAnimation` / `triggerGauchaoGoalAnimation` / `triggerBrasileiraoGoalAnimation` | Todas |
| Cartão amarelo/vermelho | `trigger*CardAnimation` | Todas |
| Substituição | `triggerSubstitutionAnimation` | Padrão |
| VAR | `triggerVARAnimation` | Padrão |
| Início/Fim de jogo | `triggerStartOfGameAnimation` / `triggerEndOfGameAnimation` | Todas |

---

## 🎨 Personalização de Liga

Para adicionar uma nova liga, edite o objeto `SPORTS_DB.soccer.leagues`:

```javascript
"minhaliga": {
  id: "esp.1",                    // ID ESPN
  apiFootballId: 140,             // (opcional) API-Football
  seasonId: 2026,
  name: "Minha Liga",
  logo: "https://.../logo.png",
  bg: "https://.../background.jpg",
  clubs: ["Clube_A", "Clube_B"],  // nomes no padrão Wikipedia
  logoOverrides: {                // opcional — sobrescreve logos ESPN
    "Clube A": "https://.../logo.png"
  },
  theme: {                        // opcional
    scoreboardBg: '#1C1C23',
    scoreboardText: '#FFFFFF'
  },
  flagColors: ['#FF0000', '#FFFFFF'] // opcional — bandeira no rodapé
}
```

---

## 🎨 Temas

O Design System utiliza **CSS Custom Properties** que são alternadas pela classe `.light-mode` no `<body>`:

```css
:root {
  --bg-primary:   #0B1220;   /* Dark */
  --accent:       #137FEC;
  --text-primary: #F1F5F9;
  ...
}

.light-mode {
  --bg-primary:   #F4F7FB;
  --text-primary: #0B1220;
  ...
}
```

A preferência é salva em `localStorage.sporting_theme` e restaurada na inicialização.

---

## 📱 Responsividade

| Breakpoint | Comportamento |
|-----------|--------------|
| **< 640px** (mobile) | Sidebar oculta, navegação via navbar flutuante + menu de ligas modal, placares em `scale(0.35–0.55)` |
| **641–1023px** (tablet) | Sidebar visível (220px), placares em `scale(0.7)`, navbar centralizada |
| **≥ 1024px** (desktop) | Sidebar completa (260px), placares em `scale(0.88)`, layout em grid multi-coluna |

---

## 🔄 Changelog — v2.0.0

### 🎉 Adicionado
- **Design System refinado** com nova paleta, sombras, tipografia e raios
- **Temas de placar exclusivos** para CBF, Serie A ITA, Libertadores, Gauchão, Premier League
- **Picture-in-Picture** nativo com placar em miniatura
- **Media Session API** para controles de mídia no SO
- **Busca global** unificada (clubes + jogadores)
- **Integração Wikipedia** para páginas de clubes e atletas
- **Transmissões ao vivo** via API ReidosCanais com múltiplos fallbacks
- **Chaveamento (bracket)** para torneios eliminatórios
- **Atualização automática** de partidas ao vivo (15s)
- **Novas ligas**: Série B, Copa do Brasil, Saudi Pro League, Gauchão, Mineiro, Carioca

### 🔧 Melhorado
- Performance de renderização (menos reflows, cache de logos e respostas ESPN)
- Sistema de animações com classes reutilizáveis (`br-anim-*`, `ga-anim-*`, `sa-anim-*`)
- Acessibilidade das tabelas de classificação com zonas coloridas
- Tratamento de erros de API com mensagens amigáveis

### 🐛 Corrigido
- Timer de partidas em tempo real com acréscimos precisos
- Layout de placares em telas pequenas (escala fluida por breakpoint)
- Persistência correta do tema entre sessões

---

## 🧪 Roadmap Futuro

- [ ] Módulo **F1** completo (integração OpenF1 já configurada)
- [ ] **NBA / NFL** via ESPN
- [ ] Notificações push para gols dos times favoritos
- [ ] Estatísticas avançadas (xG, mapas de calor)
- [ ] Modo offline com service worker
- [ ] Login e sincronização de favoritos

---

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch: `git checkout -b feature/minha-feature`
3. Commit: `git commit -m 'feat: adiciona minha feature'`
4. Push: `git push origin feature/minha-feature`
5. Abra um Pull Request

---

## 📄 Licença

Distribuído sob a licença **MIT**. Veja `LICENSE` para mais informações.

---

## 🙏 Créditos

- **Dados esportivos:** [ESPN API](https://www.espn.com/)
- **Wiki:** [Wikipedia PT](https://pt.wikipedia.org/)
- **Transmissões:** [ReidosCanais](https://reidoscanais.si/)
- **Fórmula 1:** [OpenF1](https://openf1.org/)
- **Ícones:** [Lucide](https://lucide.dev/)
- **Fontes:** [Google Fonts](https://fonts.google.com/)

---

<div align="center">

**⚽ W3LABS SPORTS © 2026 — Feito com paixão por esporte e código**

</div>