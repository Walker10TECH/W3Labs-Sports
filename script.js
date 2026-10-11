/* ------------------------------------------------------------
 * 1.1 CLIENTE BASE (Reutilizável por todas as APIs)
 * ------------------------------------------------------------ */
class BaseClient {
    constructor(baseURL, defaultHeaders = {}) {
        this.baseURL = baseURL.replace(/\/$/, ""); // remove barra final
        this.defaultHeaders = {
            "Accept": "application/json",
            "User-Agent": "APIHubUnificado/1.0 (https://example.com)",
            ...defaultHeaders,
        };
        this.cache = new Map(); // cache simples em memória
    }

    /**
     * Requisição genérica com cache e tratamento de erro
     */
    async request(path, { method = "GET", params = {}, body = null, cacheTTL = 0 } = {}) {
        const url = new URL(this.baseURL + path);

        // Adiciona query params
        Object.entries(params).forEach(([k, v]) => {
            if (v !== undefined && v !== null) url.searchParams.append(k, v);
        });

        const cacheKey = `${method}:${url.toString()}`;
        const now = Date.now();

        // Retorna do cache se ainda válido
        if (cacheTTL > 0 && this.cache.has(cacheKey)) {
            const cached = this.cache.get(cacheKey);
            if (now - cached.timestamp < cacheTTL) return cached.data;
        }

        const options = {
            method,
            headers: { ...this.defaultHeaders },
        };

        if (body) {
            if (body instanceof URLSearchParams) {
                options.body = body.toString();
                options.headers["Content-Type"] = "application/x-www-form-urlencoded";
            } else {
                options.body = JSON.stringify(body);
                options.headers["Content-Type"] = "application/json";
            }
        }

        const response = await fetch(url.toString(), options);

        if (!response.ok) {
            throw new Error(`[${response.status}] ${response.statusText} → ${url}`);
        }

        const contentType = response.headers.get("content-type") || "";
        const data = contentType.includes("application/json")
            ? await response.json()
            : await response.text();

        // Salva no cache
        if (cacheTTL > 0) this.cache.set(cacheKey, { timestamp: now, data });

        return data;
    }
}

/* ------------------------------------------------------------
 * 1.2 WIKIPEDIA CLIENT
 *     - REST API  →  https://pt.wikipedia.org/api/rest_v1/
 *     - Action API → https://pt.wikipedia.org/w/api.php
 * ------------------------------------------------------------ */
class WikipediaClient {
    constructor(lang = "pt") {
        this.lang = lang;
        this.restBase = `https://${lang}.wikipedia.org/api/rest_v1`;
        this.actionBase = `https://${lang}.wikipedia.org/w/api.php`;
        this.rest = new BaseClient(this.restBase);
        this.action = new BaseClient(this.actionBase);
    }

    /* ---------- REST API ---------- */

    getSummary(title) {
        return this.rest.request(`/page/summary/${encodeURIComponent(title)}`, { cacheTTL: 5 * 60_000 });
    }
    getHtml(title) {
        return this.rest.request(`/page/html/${encodeURIComponent(title)}`);
    }
    getParsoid(title) {
        return this.rest.request(`/page/data-parsoid/${encodeURIComponent(title)}`);
    }
    getMetadata(title) {
        return this.rest.request(`/page/metadata/${encodeURIComponent(title)}`);
    }
    getMobileHtml(title) {
        return this.rest.request(`/page/mobile-html/${encodeURIComponent(title)}`);
    }
    getMediaList(title) {
        return this.rest.request(`/page/media-list/${encodeURIComponent(title)}`);
    }
    getManifest(title) {
        return this.rest.request(`/page/manifest/${encodeURIComponent(title)}`);
    }
    getFeaturedFeed(yyyy, mm, dd) {
        return this.rest.request(`/feed/featured/${yyyy}/${mm}/${dd}`, { cacheTTL: 60 * 60_000 });
    }
    getFeedAvailability() {
        return this.rest.request(`/feed/availability`);
    }

    /* ---------- Action API ---------- */

    query(params, cacheTTL = 0) {
        return this.action.request("", {
            params: { action: "query", format: "json", origin: "*", ...params },
            cacheTTL,
        });
    }
    opensearch(term) {
        return this.action.request("", {
            params: { action: "opensearch", search: term, format: "json", origin: "*" },
        });
    }
    parse(text, cacheTTL = 0) {
        return this.action.request("", {
            params: {
                action: "parse",
                text,
                contentmodel: "wikitext",
                format: "json",
                origin: "*",
            },
            cacheTTL,
        });
    }
    search(term, limit = 10) {
        return this.query({ list: "search", srsearch: term, srlimit: limit }, 60_000);
    }
    categoryMembers(category, limit = 50) {
        return this.query({ list: "categorymembers", cmtitle: `Categoria:${category}`, cmlimit: limit });
    }
    revisions(title, limit = 10) {
        return this.query({ prop: "revisions", titles: title, rvlimit: limit, rvprop: "user|timestamp|comment" });
    }
    pageImage(title) {
        return this.query({ prop: "pageimages", titles: title, pithumbsize: 400 });
    }
}

/* ------------------------------------------------------------
 * 1.3 ESPN CLIENT (Hidden API — sem autenticação)
 * ------------------------------------------------------------ */
class ESPNClient {
    constructor() {
        this.siteBase = "https://site.api.espn.com/apis/site/v2/sports";
        this.coreBase = "https://sports.core.api.espn.com/v2/sports";
        this.fantasyBase = "https://fantasy.espn.com/apis/v3/games";
        this.site = new BaseClient(this.siteBase);
        this.core = new BaseClient(this.coreBase);
        this.fantasy = new BaseClient(this.fantasyBase);
    }

    /* ---------- Site API v2 ---------- */
    scoreboard(sport, league, params = {}) {
        return this.site.request(`/${sport}/${league}/scoreboard`, { params, cacheTTL: 60_000 });
    }
    teams(sport, league) {
        return this.site.request(`/${sport}/${league}/teams`, { cacheTTL: 10 * 60_000 });
    }
    team(sport, league, id) {
        return this.site.request(`/${sport}/${league}/teams/${id}`);
    }
    teamRoster(sport, league, id) {
        return this.site.request(`/${sport}/${league}/teams/${id}/roster`);
    }
    teamSchedule(sport, league, id) {
        return this.site.request(`/${sport}/${league}/teams/${id}/schedule`);
    }
    teamDepthChart(sport, league, id) {
        return this.site.request(`/${sport}/${league}/teams/${id}/depthcharts`);
    }
    teamTransactions(sport, league, id) {
        return this.site.request(`/${sport}/${league}/teams/${id}/transactions`);
    }
    teamHistory(sport, league, id) {
        return this.site.request(`/${sport}/${league}/teams/${id}/history`);
    }
    news(sport, league) {
        return this.site.request(`/${sport}/${league}/news`, { cacheTTL: 5 * 60_000 });
    }
    standings(sport, league) {
        return this.site.request(`/${sport}/${league}/standings`, { cacheTTL: 5 * 60_000 });
    }
    summary(sport, league, eventId) {
        return this.site.request(`/${sport}/${league}/summary`, {
            params: { event: eventId },
            cacheTTL: 30_000,
        });
    }

    /* ---------- Core API v2/v3 ---------- */
    athletes(sport, league, params = {}) {
        return this.core.request(`/${sport}/${league}/athletes`, { params });
    }
    athlete(sport, league, id) {
        return this.core.request(`/${sport}/${league}/athletes/${id}`);
    }
    athleteStats(sport, league, id) {
        return this.core.request(`/${sport}/${league}/athletes/${id}/statistics`);
    }
    athleteStatsLog(sport, league, id) {
        return this.core.request(`/${sport}/${league}/athletes/${id}/statisticslog`);
    }
    athleteAwards(sport, league, id) {
        return this.core.request(`/${sport}/${league}/athletes/${id}/awards`);
    }
    odds(sport, league, eventId, competitionId = "1") {
        return this.core.request(`/${sport}/${league}/events/${eventId}/competitions/${competitionId}/odds`);
    }
    plays(sport, league, eventId, competitionId = "1") {
        return this.core.request(`/${sport}/${league}/events/${eventId}/competitions/${competitionId}/plays`);
    }
    probabilities(sport, league, eventId, competitionId = "1") {
        return this.core.request(`/${sport}/${league}/events/${eventId}/competitions/${competitionId}/probabilities`);
    }
    draft(sport, league, year) {
        return this.core.request(`/${sport}/${league}/seasons/${year}/draft`);
    }

    /* ---------- Fantasy API v3 ---------- */
    fantasy(game, year, views, extraParams = {}) {
        const viewList = Array.isArray(views) ? views : [views];
        const params = { ...extraParams };
        viewList.forEach((v) => {
            params.view = params.view ? [].concat(params.view, v) : v;
        });
        return this.fantasy.request(`/${game}/seasons/${year}`, { params });
    }
}

/* ------------------------------------------------------------
 * 1.4 REI DOS CANAIS CLIENT
 * ------------------------------------------------------------ */
class ReiDosCanaisClient {
    constructor() {
        this.base = "https://api.reidoscanais.si";
        this.client = new BaseClient(this.base);
    }
    getChannels() {
        return this.client.request("/channels", { cacheTTL: 5 * 60_000 });
    }
    getSports(status = "live") {
        return this.client.request("/sports", {
            params: { status },
            cacheTTL: status === "live" ? 30_000 : 5 * 60_000,
        });
    }
    search(term) {
        return this.client.request("/search", { params: { q: term } });
    }
}

/* ------------------------------------------------------------
 * 1.5 HUB UNIFICADO — fachada única para todas as APIs
 * ------------------------------------------------------------ */
class APIHub {
    constructor() {
        this.wikipedia = new WikipediaClient("pt");
        this.espn = new ESPNClient();
        this.reiDosCanais = new ReiDosCanaisClient();
    }
}

/* ------------------------------------------------------------
 * 1.6 DEMO (executada apenas em Node.js, quando rodado direto)
 * ------------------------------------------------------------ */
async function demoAPIHub() {
    const hub = new APIHub();

    console.log("\n📚 === WIKIPEDIA ===");
    try {
        const resumo = await hub.wikipedia.getSummary("Brasil");
        console.log("Resumo:", resumo.extract?.slice(0, 200) + "...");

        const busca = await hub.wikipedia.search("Inteligência Artificial", 3);
        console.log("Resultados:", busca.query?.search?.map((r) => r.title));

        const opensearch = await hub.wikipedia.opensearch("Fute");
        console.log("Autocomplete:", opensearch[1]);
    } catch (e) {
        console.error("Wikipedia erro:", e.message);
    }

    console.log("\n🏈 === ESPN ===");
    try {
        const placar = await hub.espn.scoreboard("soccer", "bra.1", { limit: 5 });
        console.log("Eventos Brasileirão:", placar.events?.length);

        const nbaStandings = await hub.espn.standings("basketball", "nba");
        console.log("NBA standings carregados:", !!nbaStandings);

        const nflNews = await hub.espn.news("football", "nfl");
        console.log("Manchetes NFL:", nflNews.articles?.slice(0, 2).map((a) => a.headline));
    } catch (e) {
        console.error("ESPN erro:", e.message);
    }

    console.log("\n📺 === REI DOS CANAIS ===");
    try {
        const canais = await hub.reiDosCanais.getChannels();
        console.log("Canais:", canais.data?.length ?? canais.length ?? "?");

        const aoVivo = await hub.reiDosCanais.getSports("live");
        console.log("Esportes ao vivo:", aoVivo.data?.length ?? "?");

        const busca = await hub.reiDosCanais.search("futebol");
        console.log("Busca 'futebol':", busca.data?.length ?? "?");
    } catch (e) {
        console.error("Rei dos Canais erro:", e.message);
    }
}

/* ============================================================
 * PARTE 2 — W3LABS SPORTS (aplicação)
 * ============================================================
 * Inclui: base original + modal novo + PiP aprimorado
 * ============================================================ */

const SPORTS_DB = {
    "soccer": {
        name: "Futebol",
        logo: "https://cdn-icons-png.flaticon.com/512/53/53283.png",
        views: [
            { id: 'matches', name: 'Jogos', icon: 'calendar-days' },
            { id: 'standings', name: 'Classificação', icon: 'trophy' },
            { id: 'clubs', name: 'Clubes', icon: 'shield' },
            { id: 'scorers', name: 'Artilharia', icon: 'target' },
            { id: 'news', name: 'Notícias', icon: 'zap' }
        ],
        leagues: {
            "brasileirao": { id: "bra.1", apiFootballId: 71, seasonId: 2026, name: "Brasileirão Série A", logo: "https://www.ogol.com.br//img/logos/edicoes/184443_imgbank_.png", bg: "https://s2-globo-play.glbimg.com/rHTMAA96-XWwbs6h4pEWeZXlREw=/https://s2.glbimg.com/aNGo_xeD86fO2XMCGBRlpe7rmmg=/i.s3.glbimg.com/v1/AUTH_c3c606ff68e7478091d1ca496f9c5625/internal_photos/bs/2025/L/P/Y3zKUbSTWAUtZN86BTzg/2025-4731-brasileirao-background.jpg" },
            "brasileiraob": { id: "bra.2", apiFootballId: 72, seasonId: 2026, name: "Brasileirão Série B", logo: "https://upload.wikimedia.org/wikipedia/pt/d/d6/Campeonato_Brasileiro_de_Futebol_S%C3%A9rie_B.png", bg: "https://s2-globo-play.glbimg.com/rHTMAA96-XWwbs6h4pEWeZXlREw=/https://s2.glbimg.com/aNGo_xeD86fO2XMCGBRlpe7rmmg=/i.s3.glbimg.com/v1/AUTH_c3c606ff68e7478091d1ca496f9c5625/internal_photos/bs/2025/L/P/Y3zKUbSTWAUtZN86BTzg/2025-4731-brasileirao-background.jpg" },
            "copadobrasil": { id: "bra.copa_do_brazil", apiFootballId: 73, seasonId: 2026, name: "Copa do Brasil", logo: "https://cdn-img.zerozero.pt/img/logos/competicoes/260_imgbank_cb_20250227155245.png", bg: "https://s2-globo-play.glbimg.com/rHTMAA96-XWwbs6h4pEWeZXlREw=/https://s2.glbimg.com/aNGo_xeD86fO2XMCGBRlpe7rmmg=/i.s3.glbimg.com/v1/AUTH_c3c606ff68e7478091d1ca496f9c5625/internal_photos/bs/2025/L/P/Y3zKUbSTWAUtZN86BTzg/2025-4731-brasileirao-background.jpg" },
            "premier": { id: "eng.1", apiFootballId: 39, seasonId: 2026, name: "Premier League", logo: "https://a.espncdn.com/i/leaguelogos/soccer/500/23.png", bg: "https://t4.ftcdn.net/jpg/05/99/15/97/360_F_599159727_pFIXrrEiyZnuSw5h0qOjAuVMeQfTYpQM.jpg" },
            "laliga": { id: "esp.1", apiFootballId: 140, seasonId: 2026, name: "La Liga", logo: "https://a.espncdn.com/i/leaguelogos/soccer/500/15.png", bg: "https://assets.goal.com/images/v3/blt054a5ddddf1e5a2b/158f203189e94419d7010667f379da35bcf16d8e.jpg" },
            "champions": { id: "uefa.champions", apiFootballId: 2, seasonId: 2026, name: "Champions League", logo: "https://a.espncdn.com/i/leaguelogos/soccer/500/2.png", bg: "https://editorial.uefa.com/resources/027f-1793cd516cbd-e4e5d9d1aedf-1000/fbl-eur-c1-draw.jpeg" },
            "libertadores": { id: "conmebol.libertadores", apiFootballId: 13, seasonId: 2026, name: "Libertadores", logo: "https://upload.wikimedia.org/wikipedia/pt/4/4b/Conmebol_Libertadores_Bridgestone_logo.png", bg: "https://lncimg.lance.com.br/cdn-cgi/image/width=950,quality=75,fit=pad,format=webp/uploads/2021/01/29/60141dfea45a6.jpeg" },
            "seriea": { id: "ita.1", apiFootballId: 135, seasonId: 2026, name: "Serie A", logo: "https://a.espncdn.com/i/leaguelogos/soccer/500/12.png", bg: "https://cloudfront-us-east-1.images.arcpublishing.com/newr7/L6ZP3CEJ6VMPNFT5HTW7H7L7LY.jpg", theme: { scoreboardBg: '#FFFFFF', scoreboardText: '#00387D' }, flagColors: ['#008C45', '#FFFFFF', '#CD212A'] },
            "bundesliga": { id: "ger.1", apiFootballId: 78, seasonId: 2026, name: "Bundesliga", logo: "https://a.espncdn.com/i/leaguelogos/soccer/500/10.png", bg: "https://s2-ge.glbimg.com/F2PP74GbwM16ougDWVMDhZzEp6U=/0x0:1024x659/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_bc8228b6673f488aa253bbcb03c80ec5/internal_photos/bs/2024/X/Y/3pfuBhTzuraB6EHOqszA/gettyimages-1742744089.jpg" },
            "saudi": { id: "ksa.1", apiFootballId: 307, seasonId: 2026, name: "Saudi Pro League", logo: "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fleaguelogos%2Fsoccer%2F500%2F2488.png", bg: "https://www.365scores.com/pt-br/news/magazine/wp-content/uploads/2023/11/366423961_5646928382077000_2604818796297545939_n-e1699379331310.jpg" },
            "paulista": { id: "bra.camp.paulista", apiFootballId: null, seasonId: 2026, name: "Paulistão", logo: "https://upload.wikimedia.org/wikipedia/pt/1/1c/Paulist%C3%A3o_2026.png", bg: "https://www.infomoney.com.br/wp-content/uploads/2025/03/copapaulistamar25-e1743017283823.jpg?fit=2500%2C1167&quality=50&strip=all", flagColors: ['#000000', '#FFFFFF', '#FF0000'] },
            "carioca": { id: "bra.camp.carioca", apiFootballId: null, seasonId: 2026, name: "Cariocão", logo: "https://upload.wikimedia.org/wikipedia/pt/3/3c/Carioca_2020_FERJ.jpg", bg: "https://i.metroimg.com/CN9inuWAEomvLQLMnCj7IjGrN5YQ9SZhw7Tbi1tIHjs/w:900/q:85/f:webp/plain/https://www.metropoles.com/wp-content/uploads/wp-content/uploads/2025/03/16165052/Taca-do-Campeonato-Carioca-1.jpg", flagColors: ['#FFFFFF', '#003366'] },
            "mineiro": { id: "bra.camp.mineiro", apiFootballId: null, seasonId: 2026, name: "Campeonato Mineiro", logo: "https://a.espncdn.com/i/leaguelogos/soccer/500/2360.png", bg: "https://s2-ge.glbimg.com/jDlPK0oNRm7JAib8jk8Y0Yt0YjU=/0x0:2048x1365/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_bc8228b6673f488aa253bbcb03c80ec5/internal_photos/bs/2022/Y/m/5ERG4iS62kBaYhB5XL2A/51181088676-973df72e83-k-cris-mattos-fmf.jpg", flagColors: ['#FFFFFF', '#FF0000', '#FFFFFF'] },
            "gaucho": { id: "bra.camp.gaucho", apiFootballId: null, seasonId: 2026, name: "Gauchão", logo: "https://upload.wikimedia.org/wikipedia/pt/7/7e/Gauch%C3%A3o_2025.png", bg: "https://s2-ge.glbimg.com/yK2ZKxnnDVvc50YxV6V68wGDE1E=/0x0:1280x960/1008x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_bc8228b6673f488aa253bbcb03c80ec5/internal_photos/bs/2021/9/L/lTsAFbTB6bmMB064vLpw/whatsapp-image-2021-03-24-at-11.57.47-1-.jpeg", flagColors: ['#008542', '#DA291C', '#FFCC00'] }
        }
    }
};

const API_CONFIG = {
    espn: {
        baseSite: 'https://site.api.espn.com/apis/site/v2/sports',
        baseWeb: 'https://site.web.api.espn.com/apis',
        baseCore: 'https://sports.core.api.espn.com',
        scoreboard: (sport, league, date) => `${API_CONFIG.espn.baseSite}/${sport}/${league}/scoreboard?lang=pt&region=br&dates=${date}&limit=100`,
        standings: (league) => `${API_CONFIG.espn.baseWeb}/v2/sports/soccer/${league}/standings?lang=pt`,
        gameSummary: (league, eventId) => `${API_CONFIG.espn.baseSite}/soccer/${league}/summary?event=${eventId}&lang=pt`,
        teamSchedule: (sport, league, teamId) => `${API_CONFIG.espn.baseSite}/${sport}/${league}/teams/${teamId}/schedule?lang=pt&region=br`,
        news: (sport, league) => `${API_CONFIG.espn.baseSite}/${sport}/${league}/news?lang=pt&region=br`,
        teams: (sport, league) => `${API_CONFIG.espn.baseSite}/${sport}/${league}/teams?lang=pt&region=br`,
        roster: (league, teamId) => `${API_CONFIG.espn.baseSite}/soccer/${league}/teams/${teamId}/roster?lang=pt`,
        leaders: (league, season) => `${API_CONFIG.espn.baseCore}/v2/sports/soccer/leagues/${league}/seasons/${season}/types/1/leaders?limit=50`,
        ref: (url) => url,
    },
    wikipedia: {
        base: 'https://pt.wikipedia.org/w/api.php',
        search: (query) =>
            `${API_CONFIG.wikipedia.base}?action=query&list=search` +
            `&srsearch=${encodeURIComponent(query)}` +
            `&srlimit=10&srnamespace=0&format=json&origin=*`,
        detail: (title) =>
            `${API_CONFIG.wikipedia.base}?action=query` +
            `&prop=extracts|pageimages|pageprops` +
            `&exintro&explaintext&redirects=1` +
            `&piprop=thumbnail|original&pithumbsize=600&pilicense=any` +
            `&titles=${encodeURIComponent(title)}` +
            `&format=json&origin=*`,
    },
    streaming: {
        base: 'https://api.reidoscanais.si',
        channels: (category) => `${API_CONFIG.streaming.base}/channels${category ? `?category=${encodeURIComponent(category)}` : ''}`,
        channelDetail: (id) => `${API_CONFIG.streaming.base}/channels/${id}`,
        channelCategories: () => `${API_CONFIG.streaming.base}/channels/categories`,
        sports: (params = '') => `${API_CONFIG.streaming.base}/sports${params}`,
        sportDetail: (id) => `${API_CONFIG.streaming.base}/sports/${id}`,
        sportCategories: () => `${API_CONFIG.streaming.base}/sports/categories`,
        search: (q) => `${API_CONFIG.streaming.base}/search?q=${encodeURIComponent(q)}`,
        health: () => `${API_CONFIG.streaming.base}/health`,
    },
    openF1: { base: 'https://api.openf1.org/v1' },
    utils: {
        formatDateForEspn: (date) => {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}${month}${day}`;
        }
    }
};

/* ============================================================
   CORS PROXIES (para o navegador)
   ============================================================ */
const ESPN_PROXIES = [
    (url) => url,
    (url) => `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`,
    (url) => `https://corsproxy.io/?url=${encodeURIComponent(url)}`,
    (url) => `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(url)}`,
    (url) => `https://test.cors.workers.dev/?${url}`,
    (url) => `https://cors.eu.org/${url}`,
    (url) => `https://api.cors.lol/?url=${encodeURIComponent(url)}`,
    (url) => `https://proxy.cors.sh/${url}`,
];

async function espnFetch(url) {
    let lastError = null;
    for (let i = 0; i < ESPN_PROXIES.length; i++) {
        const proxyFn = ESPN_PROXIES[i];
        const target = proxyFn(url);
        try {
            const res = await fetch(target, {
                method: 'GET',
                headers: { 'Accept': 'application/json' }
            });
            if (res.ok) return res;
            lastError = new Error(`HTTP ${res.status} via proxy #${i + 1}`);
            console.warn(`[ESPN] Proxy #${i + 1} retornou ${res.status}:`, target);
        } catch (e) {
            lastError = e;
            console.warn(`[ESPN] Proxy #${i + 1} falhou:`, e.message);
        }
    }
    console.error('[ESPN] Todos os proxies falharam para:', url, lastError);
    throw new Error(
        'Não foi possível conectar à API da ESPN. Os proxies CORS públicos estão instáveis no momento. ' +
        'Tente novamente em alguns instantes ou rode um backend próprio.'
    );
}

/* ============================================================
   APP
   ============================================================ */
const app = {
    formations: {
        '4-3-3': [{ t: 90, l: 50 }, { t: 75, l: 85 }, { t: 78, l: 60 }, { t: 78, l: 40 }, { t: 75, l: 15 }, { t: 55, l: 50 }, { t: 45, l: 70 }, { t: 45, l: 30 }, { t: 20, l: 80 }, { t: 25, l: 50 }, { t: 20, l: 20 }],
        '4-4-2': [{ t: 90, l: 50 }, { t: 75, l: 85 }, { t: 78, l: 60 }, { t: 78, l: 40 }, { t: 75, l: 15 }, { t: 50, l: 80 }, { t: 55, l: 60 }, { t: 55, l: 40 }, { t: 50, l: 20 }, { t: 20, l: 60 }, { t: 20, l: 40 }],
        '3-5-2': [{ t: 90, l: 50 }, { t: 78, l: 75 }, { t: 80, l: 50 }, { t: 78, l: 25 }, { t: 50, l: 85 }, { t: 55, l: 60 }, { t: 55, l: 40 }, { t: 50, l: 15 }, { t: 35, l: 50 }, { t: 20, l: 65 }, { t: 20, l: 35 }],
        '4-2-3-1': [{ t: 90, l: 50 }, { t: 75, l: 85 }, { t: 78, l: 60 }, { t: 78, l: 40 }, { t: 75, l: 15 }, { t: 60, l: 65 }, { t: 60, l: 35 }, { t: 35, l: 80 }, { t: 35, l: 50 }, { t: 35, l: 20 }, { t: 15, l: 50 }],
        'default': [{ t: 90, l: 50 }, { t: 75, l: 15 }, { t: 75, l: 40 }, { t: 75, l: 60 }, { t: 75, l: 85 }, { t: 50, l: 25 }, { t: 50, l: 50 }, { t: 50, l: 75 }, { t: 25, l: 20 }, { t: 25, l: 50 }, { t: 25, l: 80 }]
    },

    state: {
        currentSport: 'soccer',
        currentLeague: 'brasileirao',
        currentDate: new Date(),
        view: 'matches',
        selectedSeason: 2026,
        currentMatchData: null,
        theme: 'dark',
        espnTeamsCache: {},
        scorersCache: {},
        playerDatabaseCache: null,
        matchTimerInterval: null,
        matchCardTimers: [],
        liveUpdateInterval: null,
        liveModalUpdateInterval: null,
        pipWindow: null,
        pipUpdateInterval: null,
        libertadoresTimeouts: {}
    },

    /* ================= INIT ================= */
    init() {
        try {
            this.initTheme();
            this.renderSportsNav();
            this.renderPrimaryNavigation();
            this.renderSeasonSelector();
            this.setupEvents();
            this.loadDataForView();
            setTimeout(() => {
                const loader = document.getElementById('global-loader');
                if (loader) loader.classList.add('opacity-0', 'pointer-events-none');
            }, 800);
        } catch (e) { console.error("W3Labs Init Error:", e); }
    },

    initTheme() {
        let savedTheme = null;
        try { savedTheme = localStorage.getItem('sporting_theme'); } catch (e) { /* storage bloqueado */ }
        if (savedTheme) { this.setTheme(savedTheme); } else { this.setTheme('dark'); }
    },

    toggleTheme() {
        const newTheme = this.state.theme === 'dark' ? 'light' : 'dark';
        this.setTheme(newTheme);
    },

    setTheme(theme) {
        this.state.theme = theme;
        const moon = document.getElementById('theme-icon-moon');
        const sun = document.getElementById('theme-icon-sun');
        if (theme === 'light') {
            document.body.classList.add('light-mode');
            if (moon) moon.classList.remove('hidden');
            if (sun) sun.classList.add('hidden');
        } else {
            document.body.classList.remove('light-mode');
            if (moon) moon.classList.add('hidden');
            if (sun) sun.classList.remove('hidden');
        }
        try { localStorage.setItem('sporting_theme', theme); } catch (e) { /* storage bloqueado */ }

        if (this.state.pipWindow) {
            const pipBody = this.state.pipWindow.document.body;
            if (theme === 'light') pipBody.classList.add('light-mode');
            else pipBody.classList.remove('light-mode');
        }
    },

    async getEspnLeagueTeams(leagueId) {
        if (this.state.espnTeamsCache[leagueId]) return this.state.espnTeamsCache[leagueId];
        try {
            const res = await espnFetch(API_CONFIG.espn.teams('soccer', leagueId));
            const data = await res.json();
            const teams = data.sports?.[0]?.leagues?.[0]?.teams?.map(t => t.team) || [];
            this.state.espnTeamsCache[leagueId] = teams;
            return teams;
        } catch (e) {
            console.error("Error fetching ESPN teams:", e);
            return [];
        }
    },

    setupEvents() {
        if (typeof flatpickr !== 'undefined') {
            flatpickr("#date-picker", {
                defaultDate: "today",
                dateFormat: "d/m/Y",
                locale: "pt",
                onChange: (selectedDates) => {
                    this.state.currentDate = selectedDates[0];
                    if (this.state.view === 'matches') this.loadDataForView();
                }
            });
        }

        const seasonSelector = document.getElementById('season-selector');
        if (seasonSelector) {
            seasonSelector.addEventListener('change', (e) => {
                this.state.selectedSeason = e.target.value;
                if (this.state.view === 'scorers') this.fetchScorers(this.state.currentLeague);
            });
        }

        const gsi = document.getElementById('global-search-input');
        if (gsi) {
            gsi.addEventListener('input', (e) => this.handleGlobalSearch(e.target.value));
            gsi.addEventListener('focus', (e) => {
                if (e.target.value.length > 1) {
                    document.getElementById('global-search-results').classList.remove('hidden');
                }
            });
            document.addEventListener('click', (e) => {
                const searchContainer = gsi.parentElement;
                if (searchContainer && !searchContainer.contains(e.target)) {
                    document.getElementById('global-search-results').classList.add('hidden');
                }
            });
        }

        document.getElementById('wiki-search-input')?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.searchWiki();
        });

        window.addEventListener('pagehide', () => {
            if (this.state.pipWindow) {
                try { this.state.pipWindow.close(); } catch (e) { /* ignora */ }
            }
        });
    },

    renderSeasonSelector() {
        const sel = document.getElementById('season-selector');
        if (!sel) return;
        sel.innerHTML = '';
        for (let i = 0; i < 5; i++) {
            const opt = document.createElement('option');
            opt.value = 2026 - i;
            opt.innerText = 2026 - i;
            sel.appendChild(opt);
        }
    },

    loadPlayerDatabase() {
        if (this.state.playerDatabaseCache) return this.state.playerDatabaseCache;
        this.state.playerDatabaseCache = (typeof PLAYER_DB_DATA !== 'undefined') ? PLAYER_DB_DATA : { soccer: {} };
        return this.state.playerDatabaseCache;
    },

    async handleGlobalSearch(query) {
        const resultsContainer = document.getElementById('global-search-results');
        if (!resultsContainer) return;
        if (!query || query.length < 2) {
            resultsContainer.innerHTML = '';
            resultsContainer.classList.add('hidden');
            return;
        }

        resultsContainer.classList.remove('hidden');
        resultsContainer.innerHTML = '<div class="p-4 text-center text-sm text-gray-500">Buscando...</div>';

        const sportKey = this.state.currentSport;
        let results = [];
        const lowerQuery = query.toLowerCase();

        if (sportKey === 'soccer') {
            const playerDB = this.loadPlayerDatabase();
            if (playerDB.soccer && Object.keys(playerDB.soccer).length > 0) {
                Object.keys(playerDB.soccer).forEach(leagueKey => {
                    const league = SPORTS_DB.soccer.leagues[leagueKey];
                    if (league) {
                        const players = playerDB.soccer[leagueKey] || [];
                        players.forEach(player => {
                            const playerName = player.name || '';
                            const commonName = player.commonName || '';
                            if (playerName.toLowerCase().includes(lowerQuery) || commonName.toLowerCase().includes(lowerQuery)) {
                                if (!results.some(r => r.type === 'player' && r.name === playerName)) {
                                    results.push({
                                        type: 'player',
                                        name: playerName,
                                        subtitle: `Jogador • ${league.name}`,
                                        icon: 'user',
                                        action: () => this.loadWikiDetail(playerName)
                                    });
                                }
                            }
                        });
                    }
                });
            }

            const leagueKey = this.state.currentLeague;
            const league = SPORTS_DB.soccer.leagues[leagueKey];
            if (league) {
                const espnTeams = await this.getEspnLeagueTeams(league.id);
                espnTeams.forEach(team => {
                    const displayName = team.displayName || '';
                    if (displayName.toLowerCase().includes(lowerQuery)) {
                        const logoUrl = team.logos?.[0]?.href;
                        const clubWikiName = (team.name || '').replace(/ /g, '_');
                        results.push({
                            type: 'club', name: displayName, subtitle: league.name, logo: logoUrl,
                            action: () => { this.showTeamSchedule(team.id, team.displayName, logoUrl, clubWikiName); }
                        });
                    }
                });
            }
        }

        results.sort((a, b) => {
            if (a.type === 'player' && b.type !== 'player') return -1;
            if (a.type !== 'player' && b.type === 'player') return 1;
            return a.name.localeCompare(b.name);
        });

        this.renderGlobalSearchResults(results);
    },

    renderGlobalSearchResults(results) {
        const resultsContainer = document.getElementById('global-search-results');
        if (!resultsContainer) return;
        if (results.length === 0) {
            resultsContainer.innerHTML = '<div class="p-4 text-center text-sm text-gray-500">Nenhum resultado encontrado.</div>';
            return;
        }
        resultsContainer.innerHTML = '';
        results.forEach(result => {
            const item = document.createElement('div');
            item.className = 'flex items-center gap-3 p-3 hover:bg-white/10 cursor-pointer transition';
            const iconHtml = result.logo ? `<img src="${result.logo}" class="w-8 h-8 object-contain">` : (result.icon ? `<i data-lucide="${result.icon}" class="w-8 h-8 text-gray-400"></i>` : '');
            item.innerHTML = `${iconHtml}<div class="flex flex-col"><span class="font-bold text-sm text-[var(--text-primary)]">${result.name}</span><span class="text-xs text-gray-400">${result.subtitle}</span></div>`;
            item.onclick = () => {
                result.action();
                resultsContainer.classList.add('hidden');
                const inp = document.getElementById('global-search-input');
                if (inp) inp.value = '';
            };
            resultsContainer.appendChild(item);
        });
        if (window.lucide) lucide.createIcons();
    },

    renderSportsNav() {
        const menu = document.getElementById('sport-menu');
        if (!menu) return;
        menu.innerHTML = '';
        Object.entries(SPORTS_DB).forEach(([key, sport]) => {
            const item = document.createElement('div');
            item.className = 'flex items-center gap-2 p-2 hover:bg-white/10 rounded-lg cursor-pointer text-white text-sm';
            item.innerHTML = `<img src="${sport.logo}" class="w-5 h-5 object-contain" onerror="this.style.display='none'"> ${sport.name}`;
            item.onclick = () => this.changeSport(key);
            menu.appendChild(item);
        });
    },

    renderPrimaryNavigation() {
        const sport = SPORTS_DB[this.state.currentSport];
        const sidebarLeagues = document.getElementById('sidebar-league-list')?.parentElement;
        const navCard = document.querySelector('.nav-card');
        const bottomNav = document.querySelector('.bottom-nav');
        const headerSportName = document.getElementById('header-sport-name');

        if (headerSportName) headerSportName.innerText = sport.name;

        if (navCard) {
            navCard.innerHTML = sport.views.map(v =>
                `<button onclick="app.setView('${v.id}')" class="nav-btn" id="desk-nav-${v.id}"><i data-lucide="${v.icon}" class="w-5 h-5"></i> ${v.name}</button>`
            ).join('');
        }

        if (bottomNav) {
            bottomNav.innerHTML = sport.views.map(v =>
                `<button class="bottom-nav-item" onclick="app.setView('${v.id}')" id="mob-nav-${v.id}"><i data-lucide="${v.icon}"></i><span>${v.name.split(' ')[0]}</span></button>`
            ).join('');
        }

        if (this.state.currentSport === 'soccer' && sidebarLeagues) {
            sidebarLeagues.style.display = 'block';
            this.renderLeagueNav();
        } else if (sidebarLeagues) {
            sidebarLeagues.style.display = 'none';
        }

        this.updateActiveNav(this.state.view);
        if (window.lucide) lucide.createIcons();
    },

    renderLeagueNav() {
        const sidebar = document.getElementById('sidebar-league-list');
        const mobList = document.getElementById('mob-league-list');
        if (sidebar) sidebar.innerHTML = '';
        if (mobList) mobList.innerHTML = '';

        Object.entries(SPORTS_DB.soccer.leagues).forEach(([key, league]) => {
            if (sidebar) {
                const sideItem = document.createElement('button');
                sideItem.className = 'w-full text-left p-2 px-3 rounded-xl hover:bg-white/10 flex items-center gap-3 text-sm text-gray-400 hover:text-white transition group';
                sideItem.innerHTML = `<img src="${league.logo}" class="w-6 h-6 object-contain group-hover:scale-110 transition" onerror="this.style.display='none'"> <span class="font-medium">${league.name}</span>`;
                sideItem.onclick = () => this.changeSoccerLeague(key);
                sidebar.appendChild(sideItem);
            }
            if (mobList) {
                const mobItem = document.createElement('button');
                mobItem.className = 'flex items-center gap-4 p-3 rounded-lg bg-white/5 border border-white/10 w-full text-left hover:bg-white/10 transition text-white';
                mobItem.innerHTML = `<img src="${league.logo}" class="w-6 h-6 object-contain" onerror="this.style.display='none'"> <span class="font-bold text-sm">${league.name}</span>`;
                mobItem.onclick = () => { this.changeSoccerLeague(key); this.toggleMobileLeague(); };
                mobList.appendChild(mobItem);
            }
        });
    },

    changeSport(sportKey) {
        if (this.state.currentSport === sportKey) return;
        this.state.currentSport = sportKey;
        const sport = SPORTS_DB[sportKey];
        this.state.view = sport.views[0].id;
        if (sportKey === 'soccer') { this.state.currentLeague = 'brasileirao'; } else { this.state.currentLeague = null; }
        this.renderPrimaryNavigation();
        this.loadDataForView();
    },

    changeSoccerLeague(key) {
        this.state.currentLeague = key;
        this.loadDataForView();
        if (window.innerWidth < 1024) {
            const sidebar = document.getElementById('app-sidebar');
            if (sidebar) {
                sidebar.style.setProperty('display', 'none', 'important');
                sidebar.classList.remove('absolute', 'h-full', 'shadow-2xl');
            }
        }
    },

    async loadDataForView() {
        const sportKey = this.state.currentSport;
        const view = this.state.view;
        const sport = SPORTS_DB[sportKey];
        const leagueKey = this.state.currentLeague;

        const setText = (id, txt) => { const el = document.getElementById(id); if (el) el.innerText = txt; };
        const setSrc = (id, src) => { const el = document.getElementById(id); if (el) el.src = src; };

        if (sportKey === 'soccer') {
            const league = sport.leagues[leagueKey];
            if (!league) return;
            const dateStr = API_CONFIG.utils.formatDateForEspn(this.state.currentDate);

            setText('header-league-name', league.name);
            setSrc('mob-league-logo', league.logo);
            setText('page-league-name', league.name);
            setSrc('page-league-logo', league.logo);
            setText('page-league-country', "Temporada " + this.state.selectedSeason);

            const bgEl = document.getElementById('app-background');
            if (bgEl) { bgEl.style.backgroundImage = `url('${league.bg}')`; }

            if (view === 'matches') await this.fetchMatches(league.id, dateStr);
            if (view === 'standings') await this.fetchStandings(league.id);
            if (view === 'knockout') await this.fetchKnockout(league.id);
            if (view === 'scorers') await this.fetchScorers(leagueKey);
            if (view === 'news') await this.fetchNews(league.id);
            if (view === 'clubs') this.renderClubs(leagueKey);
        }
    },

    async fetchMatches(id, date) {
        const grid = document.getElementById('matches-grid'); if (!grid) return;
        grid.innerHTML = '<div class="col-span-full py-20 flex justify-center"><div class="loader-ring"></div></div>';

        if (this.state.liveUpdateInterval) {
            clearInterval(this.state.liveUpdateInterval);
            this.state.liveUpdateInterval = null;
        }

        try {
            const res = await espnFetch(API_CONFIG.espn.scoreboard('soccer', id, date));
            this.state.matchCardTimers.forEach(clearInterval);
            this.state.matchCardTimers = [];

            const data = await res.json();
            this.renderMatches(data.events || []);

            if (data.events && data.events.some(e => e.status?.type?.state === 'in')) {
                this.state.liveUpdateInterval = setInterval(() => this.updateLiveMatches(), 15000);
            }
        } catch (e) {
            console.error("Erro ao carregar partidas:", e);
            grid.innerHTML = `<div class="text-center text-red-400 col-span-full glass-panel p-10">
                <div class="text-lg font-bold mb-2">Não foi possível carregar as partidas</div>
                <div class="text-sm opacity-80">${e.message || 'Erro de conexão.'}</div>
                <button onclick="app.loadDataForView()" class="mt-4 px-4 py-2 rounded-lg bg-[var(--accent)] text-black font-bold">Tentar novamente</button>
            </div>`;
        }
    },

    renderMatches(events) {
        const grid = document.getElementById('matches-grid'); if (!grid) return;
        grid.innerHTML = '';
        if (!events.length) {
            grid.innerHTML = '<div class="text-center text-gray-500 col-span-full py-10 font-medium">Nenhum jogo programado para hoje.</div>';
            return;
        }
        const lConfig = SPORTS_DB.soccer.leagues[this.state.currentLeague];
        const liveIndicator = document.getElementById('live-indicator');
        if (liveIndicator) liveIndicator.classList.toggle('hidden', !events.some(e => e.status?.type?.state === 'in'));

        events.forEach((ev, index) => {
            const comp = ev.competitions[0];
            const home = comp.competitors.find(c => c.homeAway === 'home');
            const away = comp.competitors.find(c => c.homeAway === 'away');
            const status = ev.status?.type;
            const allEvents = comp.details || [];
            const cardEventsCount = allEvents.filter(e => e.type === 'yellowcard' || e.type === 'redcard').length;
            const subEventsCount = allEvents.filter(e => e.type === 'substitution').length;
            const varEventsCount = allEvents.filter(e => e.text && (e.text.toLowerCase().includes('var') || e.text.toLowerCase().includes('revisão'))).length;

            const card = document.createElement('div');
            card.setAttribute('data-event-id', ev.id);
            card.setAttribute('data-home-score', home.score || '0');
            card.setAttribute('data-away-score', away.score || '0');
            card.setAttribute('data-status-state', status?.state || 'post');
            card.setAttribute('data-card-events', cardEventsCount);
            card.setAttribute('data-substitution-events', subEventsCount);
            card.setAttribute('data-var-events', varEventsCount);
            card.onclick = () => this.openMatch(ev.id);
            card.style.cursor = 'pointer';

            card.innerHTML = this._getScoreboardHTML(ev, lConfig);
            grid.appendChild(card);

            if (['bra.1', 'bra.2', 'bra.copa_do_brazil'].includes(lConfig.id)) {
                this.playCbfIntro(ev.id, index);
            } else if (lConfig.id === 'ita.1') {
                this.playSerieAIntro(ev.id, index);
            } else if (lConfig.id === 'ger.1') {
                this.playBundesligaIntro(ev.id, index);
            } else if (['bra.camp.paulista', 'bra.camp.carioca', 'bra.camp.mineiro', 'bra.camp.gaucho'].includes(lConfig.id)) {
                this.playGloboIntro(ev.id, index);
            } else {
                this.playBrasileiraoIntro(ev.id, index);
            }

            if (status?.state === 'in') {
                const timerId = this.startLiveCardTimer(ev.id, comp.status);
                if (timerId) this.state.matchCardTimers.push(timerId);
            }
        });
        if (window.lucide) window.lucide.createIcons();
    },

    _getScoreboardHTML(ev, lConfig, options = {}) {
        const comp = ev.competitions[0];
        const home = comp.competitors.find(c => c.homeAway === 'home');
        const away = comp.competitors.find(c => c.homeAway === 'away');
        const status = ev.status?.type;
        const displayClock = ev.status?.displayClock;
        const isPip = options.isPip || false;
        const scaleStyle = isPip ? 'style="transform: scale(1); padding: 1rem;"' : '';

        if (['bra.1', 'bra.2', 'bra.copa_do_brazil'].includes(lConfig.id)) {
            const homeTeamColor = home.team.color ? `#${home.team.color}` : '#0d80bf';
            const awayTeamColor = away.team.color ? `#${away.team.color}` : '#e50e18';
            const timeBoxColor = lConfig.id === 'bra.2' ? '#FFD700' : '#c9f500';
            return `
                <div class="cbf-widget-container" id="widgetContainer-${ev.id}" ${scaleStyle}>
                    <div class="cbf-scoreboard-wrapper" id="scoreboardWrapper-${ev.id}">
                        <div class="cbf-main-bar">
                            <div class="cbf-team-side cbf-team-left" id="homeBox-${ev.id}" data-color="#${home.team.color || '0b071a'}" data-logo="${home.team.logo || ''}">
                                <img src="${home.team.logo || ''}" alt="${home.team.abbreviation}" class="cbf-logo">
                                <span class="cbf-team-name">${home.team.abbreviation}</span>
                                <div class="cbf-shape-left" style="background-color: ${homeTeamColor};"></div>
                            </div>
                            <div class="cbf-team-side cbf-team-right" id="awayBox-${ev.id}" data-color="#${away.team.color || '0b071a'}" data-logo="${away.team.logo || ''}">
                                <div class="cbf-shape-right" style="background-color: ${awayTeamColor};"></div>
                                <span class="cbf-team-name">${away.team.abbreviation}</span>
                                <img src="${away.team.logo || ''}" alt="${away.team.abbreviation}" class="cbf-logo">
                            </div>
                        </div>
                        <div class="cbf-time-box" id="timer-pill-${ev.id}" style="background-color: ${timeBoxColor};">
                            <span class="cbf-time-text">${status?.state === 'in' ? (displayClock || "45:00").replace("'", "") : (status?.shortDetail || 'FIM')}</span>
                        </div>
                        <div class="cbf-score-box">
                            <span class="cbf-score-number" id="score-home-${ev.id}">${home.score || '0'}</span>
                            <span class="cbf-score-divider">|</span>
                            <span class="cbf-score-number" id="score-away-${ev.id}">${away.score || '0'}</span>
                        </div>
                        <div class="cbf-goal-banner" id="goalBanner-${ev.id}">
                            <div class="cbf-goal-left"><img src="" class="cbf-goal-logo-img" id="goalLogo-${ev.id}"></div>
                            <div class="cbf-goal-right">
                                <span class="cbf-goal-text" id="goalText-${ev.id}">GOOOOOOOOOOL</span>
                                <img src="https://cdn-icons-png.flaticon.com/512/53/53283.png" class="cbf-goal-mascot-img" id="goalMascot-${ev.id}">
                            </div>
                        </div>
                    </div>
                </div>`;
        } else if (lConfig.id === 'ita.1') {
            const homeTeamColor = home.team.color ? `#${home.team.color}` : '#030833';
            const awayTeamColor = away.team.color ? `#${away.team.color}` : '#d11b27';
            const darkenColor = (hex, percent) => {
                if (!hex) return '#000000';
                hex = hex.replace('#', '');
                if (hex.length === 3) hex = hex.split('').map(x => x + x).join('');
                let r = parseInt(hex.substring(0, 2), 16), g = parseInt(hex.substring(2, 4), 16), b = parseInt(hex.substring(4, 6), 16);
                r = parseInt(r * (100 - percent) / 100); g = parseInt(g * (100 - percent) / 100); b = parseInt(b * (100 - percent) / 100);
                return `#${(r < 255 ? r < 1 ? 0 : r : 255).toString(16).padStart(2, '0')}${(g < 255 ? g < 1 ? 0 : g : 255).toString(16).padStart(2, '0')}${(b < 255 ? b < 1 ? 0 : b : 255).toString(16).padStart(2, '0')}`;
            };
            const homeDark = darkenColor(homeTeamColor, 40);
            const awayDark = darkenColor(awayTeamColor, 40);
            const homeAccentLight = home.team.alternateColor ? `#${home.team.alternateColor}` : '#5dfcfc';
            const homeAccentDark = darkenColor(homeAccentLight, 20);
            const awayAccentLight = away.team.alternateColor ? `#${away.team.alternateColor}` : '#d11b27';
            const awayAccentDark = darkenColor(awayAccentLight, 20);

            return `
                <div class="sa-widget-container" id="widgetContainer-${ev.id}" ${scaleStyle}>
                    <div class="sa-scoreboard-container">
                        <div class="sa-piece sa-layer-3d sa-home-3d" style="background: ${homeDark}"></div>
                        <div class="sa-piece sa-layer-3d sa-away-3d" style="background: ${awayDark}"></div>
                        <div class="sa-piece sa-layer-3d sa-accent-l-3d" style="background: ${darkenColor(homeAccentDark, 40)}"></div>
                        <div class="sa-piece sa-layer-3d sa-accent-r-3d" style="background: ${darkenColor(awayAccentDark, 40)}"></div>
                        <div class="sa-piece sa-layer-3d sa-score-l-3d"></div>
                        <div class="sa-piece sa-layer-3d sa-score-r-3d"></div>
                        <div class="sa-piece sa-layer-front sa-home-front" id="homeBox-${ev.id}" style="background: linear-gradient(to bottom, ${homeTeamColor}, ${homeDark})">
                            <span class="sa-team-name">${home.team.abbreviation}</span>
                            <span class="sa-goal-text">GOL!</span>
                        </div>
                        <div class="sa-piece sa-layer-front sa-away-front" id="awayBox-${ev.id}" style="background: linear-gradient(to bottom, ${awayTeamColor}, ${awayDark})">
                            <span class="sa-team-name">${away.team.abbreviation}</span>
                            <span class="sa-goal-text">GOL!</span>
                        </div>
                        <div class="sa-piece sa-layer-front sa-accent-l-front" style="background: linear-gradient(135deg, ${homeAccentLight}, ${homeAccentDark})"></div>
                        <div class="sa-piece sa-layer-front sa-accent-r-front" style="background: linear-gradient(135deg, ${awayAccentLight}, ${awayAccentDark})"></div>
                        <div class="sa-piece sa-layer-front sa-score-l-front"><span class="sa-score-number" id="score-home-${ev.id}">${home.score || '0'}</span></div>
                        <div class="sa-piece sa-layer-front sa-score-r-front"><span class="sa-score-number" id="score-away-${ev.id}">${away.score || '0'}</span></div>
                        <div class="sa-timer-panel" id="timer-pill-${ev.id}"><span>${status?.state === 'in' ? (displayClock || "45:00").replace("'", "") : (status?.shortDetail || 'FIM')}</span></div>
                        <div class="sa-shield-container"><div class="sa-shield-base"></div><div class="sa-shield-outer"></div><div class="sa-shield-inner"><img src="${lConfig.logo}" alt="Serie A" class="sa-serie-a-logo"></div></div>
                    </div>
                </div>`;
        } else if (lConfig.id === 'conmebol.libertadores') {
            const homeTeamColor = home.team.color ? `#${home.team.color}` : '#8CDEDC';
            const awayTeamColor = away.team.color ? `#${away.team.color}` : 'transparent';
            return `
                <div class="w-full flex justify-center py-4" id="widgetContainer-${ev.id}" ${scaleStyle}>
                    <div class="lib-placar-wrapper">
                        <div class="lib-scoreboard">
                            <div class="lib-box lib-logo-box"><img src="${lConfig.logo}" alt="Libertadores"></div>
                            <div class="lib-box lib-team-box lib-team-home" style="border-bottom-color: ${homeTeamColor}">${home.team.abbreviation}</div>
                            <div class="lib-box lib-score-box" id="score-box-${ev.id}"><span id="score-home-${ev.id}">${home.score || '0'}</span>-<span id="score-away-${ev.id}">${away.score || '0'}</span></div>
                            <div class="lib-box lib-team-box lib-team-away" style="border-bottom-color: ${awayTeamColor}">${away.team.abbreviation}</div>
                            <div class="lib-box lib-time-box" id="timer-pill-${ev.id}">${status?.state === 'in' ? (displayClock || "45:00").replace("'", "") : (status?.shortDetail || 'FIM')}</div>
                        </div>
                        <div class="lib-event-bar" id="eventBar-${ev.id}">
                            <div class="lib-event-content" id="eventContent-${ev.id}"></div>
                        </div>
                    </div>
                </div>`;
        } else if (lConfig.id === 'ger.1') {
            const homeTeamColor = home.team.color ? `#${home.team.color}` : '#1c1c1c';
            const awayTeamColor = away.team.color ? `#${away.team.color}` : '#1c1c1c';
            const timeText = status?.state === 'in' ? (displayClock || "00:00").replace("'", "") : (status?.shortDetail || 'FIM');
            return `
                <div class="bu-widget-container" id="widgetContainer-${ev.id}" ${scaleStyle}>
                    <div class="bu-time-block" id="timer-pill-${ev.id}"><span>${timeText}</span></div>
                    <div class="bu-top-bar">
                        <div class="bu-icon-block">
                            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2a2 2 0 100 4 2 2 0 000-4zm7 7.5V12h-3v7h-2v-3h-1v3h-2v-7H8v-2.5l3-1.5 3 1.5 4-1z"/><circle cx="16" cy="14" r="1.2"/></svg>
                        </div>
                        <div class="bu-teams-row">
                            <div class="bu-team-block" id="homeBox-${ev.id}" style="background: linear-gradient(180deg, ${homeTeamColor}, ${homeTeamColor}dd);">
                                <span class="bu-team-abbr">${home.team.abbreviation}</span>
                                <span class="bu-team-score" id="score-home-${ev.id}">${home.score || '0'}</span>
                                <div class="bu-underline" style="background-color: ${homeTeamColor};"></div>
                            </div>
                            <div class="bu-team-block" id="awayBox-${ev.id}" style="background: linear-gradient(180deg, ${awayTeamColor}, ${awayTeamColor}dd);">
                                <span class="bu-team-abbr">${away.team.abbreviation}</span>
                                <span class="bu-team-score" id="score-away-${ev.id}">${away.score || '0'}</span>
                                <div class="bu-underline" style="background-color: ${awayTeamColor};"></div>
                            </div>
                        </div>
                    </div>
                    ${status?.state === 'post' ? `<div class="bu-status-label">${status.shortDetail}</div>` : ''}
                </div>`;
        } else if (['bra.camp.paulista', 'bra.camp.carioca', 'bra.camp.mineiro', 'bra.camp.gaucho'].includes(lConfig.id)) {
            const homeTeamColor = home.team.color ? `#${home.team.color}` : '#006437';
            const awayTeamColor = away.team.color ? `#${away.team.color}` : '#1c1c1c';
            let timerText;
            if (status?.state === 'in') {
                const period = ev.status?.period || 1;
                const periodLabel = period === 1 ? '1T' : (period === 2 ? '2T' : (period === 3 ? '1P' : (period === 4 ? '2P' : `${period}T`)));
                const clock = (displayClock || "00:00").replace("'", "").trim();
                const cleanClock = clock.includes(':') ? clock.split(':').slice(0, 2).join(':') : clock;
                timerText = `${periodLabel} ${cleanClock}`;
            } else if (status?.state === 'pre') {
                timerText = ev.status?.shortDetail || 'PRÉ-JOGO';
            } else {
                timerText = status?.shortDetail || 'FIM';
            }
            return `
                <div class="rg-widget-container" id="widgetContainer-${ev.id}" ${scaleStyle}>
                    <div class="rg-timer ${status?.state === 'in' ? 'rg-is-live' : ''}" id="timer-pill-${ev.id}">${timerText}</div>
                    <div class="rg-scoreboard">
                        <div class="rg-team-block rg-home" id="homeBox-${ev.id}" style="background: linear-gradient(180deg, ${homeTeamColor}, ${homeTeamColor}dd);">
                            <span class="rg-abbr">${home.team.abbreviation}</span>
                            <span class="rg-score" id="score-home-${ev.id}">${home.score || '0'}</span>
                        </div>
                        <div class="rg-team-block rg-away" id="awayBox-${ev.id}" style="background: linear-gradient(180deg, ${awayTeamColor}, ${awayTeamColor}dd);">
                            <span class="rg-score" id="score-away-${ev.id}">${away.score || '0'}</span>
                            <span class="rg-abbr">${away.team.abbreviation}</span>
                        </div>
                    </div>
                    <div class="rg-bottom-strip">
                        <div class="rg-strip" style="background-color: ${homeTeamColor};"></div>
                        <div class="rg-strip" style="background-color: ${awayTeamColor};"></div>
                    </div>
                </div>`;
        } else {
            const homeTeamColor = home.team.color ? `#${home.team.color}` : '#c32a2a';
            const awayTeamColor = away.team.color ? `#${away.team.color}` : '#006437';
            return `
                <div class="br-widget-container" id="widgetContainer-${ev.id}" ${scaleStyle}>
                    <div class="br-scoreboard-bar">
                        <div class="br-team-box br-home-team" id="homeBox-${ev.id}"><div class="br-team-color-strip br-home-strip" id="homeStrip-${ev.id}" style="background-color: ${homeTeamColor};"></div><div class="br-team-text-wrapper" id="homeText-${ev.id}"><span class="br-team-name">${home.team.abbreviation}</span></div><div class="br-goal-overlay" id="homeGoalOverlay-${ev.id}" style="background-color: ${homeTeamColor};"><img src="${home.team.logo || ''}" class="br-team-logo-anim"><div class="br-goal-word"><span class="br-letter l1">G</span><span class="br-letter l2">O</span><span class="br-letter l3">L</span></div></div></div>
                        <div class="br-match-center" id="matchCenter-${ev.id}"><div class="br-score" id="score-home-${ev.id}">${home.score || '0'}</div><div class="br-logo-container"><img src="${lConfig.logo}" class="br-logo-img" alt="League Logo"></div><div class="br-score" id="score-away-${ev.id}">${away.score || '0'}</div></div>
                        <div class="br-team-box br-away-team" id="awayBox-${ev.id}"><div class="br-team-color-strip br-away-strip" id="awayStrip-${ev.id}" style="background-color: ${awayTeamColor};"></div><div class="br-team-text-wrapper" id="awayText-${ev.id}"><span class="br-team-name">${away.team.abbreviation}</span></div><div class="br-goal-overlay" id="awayGoalOverlay-${ev.id}" style="background-color: ${awayTeamColor};"><img src="${away.team.logo || ''}" class="br-team-logo-anim"><div class="br-goal-word"><span class="br-letter l1">G</span><span class="br-letter l2">O</span><span class="br-letter l3">L</span></div></div></div>
                    </div>
                    <div class="br-timer-container" id="timer-pill-${ev.id}">
                        <span>${status?.state === 'in' ? (displayClock || "45:00").replace("'", "") : (status?.shortDetail || 'FIM')}</span>
                    </div>
                </div>`;
        }
    },

    async updateLiveMatches() {
        if (this.state.view !== 'matches' || this.state.currentSport !== 'soccer') return;
        const league = SPORTS_DB.soccer.leagues[this.state.currentLeague];
        const dateStr = API_CONFIG.utils.formatDateForEspn(this.state.currentDate);

        try {
            const res = await espnFetch(API_CONFIG.espn.scoreboard('soccer', league.id, dateStr));
            const data = await res.json();
            const events = data.events || [];

            if (!events.some(e => e.status?.type?.state === 'in')) {
                if (this.state.liveUpdateInterval) {
                    clearInterval(this.state.liveUpdateInterval);
                    this.state.liveUpdateInterval = null;
                }
                document.getElementById('live-indicator')?.classList.add('hidden');
                events.forEach(ev => {
                    const timerPill = document.getElementById(`timer-pill-${ev.id}`);
                    if (timerPill) timerPill.innerHTML = `<span>${ev.status?.type?.shortDetail || 'FIM'}</span>`;
                });
                return;
            }

            document.getElementById('live-indicator')?.classList.remove('hidden');

            events.forEach(ev => {
                const matchCard = document.querySelector(`[data-event-id='${ev.id}']`);
                if (!matchCard) return;

                const comp = ev.competitions[0];
                const h = comp.competitors.find(c => c.homeAway === 'home');
                const a = comp.competitors.find(c => c.homeAway === 'away');
                const status = ev.status?.type;
                if (!status) return;

                const oldStatusState = matchCard.getAttribute('data-status-state');
                if (oldStatusState === 'in' && status.state === 'post') {
                    this.triggerEndOfGameAnimation(ev.id);
                } else if (oldStatusState === 'pre' && status.state === 'in') {
                    this.triggerStartOfGameAnimation(ev.id);
                }
                matchCard.setAttribute('data-status-state', status.state);

                const oldHomeScore = parseInt(matchCard.getAttribute('data-home-score')) || 0, newHomeScore = parseInt(h.score || '0');
                const oldAwayScore = parseInt(matchCard.getAttribute('data-away-score')) || 0, newAwayScore = parseInt(a.score || '0');

                if (newHomeScore > oldHomeScore) {
                    if (['bra.1', 'bra.2', 'bra.copa_do_brazil'].includes(league.id)) this.triggerCbfGoalAnimation(ev.id, 'home');
                    else if (league.id === 'ita.1') this.triggerSerieAGoalAnimation(ev.id, 'home');
                    else if (league.id === 'ger.1') this.triggerBundesligaGoalAnimation(ev.id, 'home');
                    else if (['bra.camp.paulista', 'bra.camp.carioca', 'bra.camp.mineiro', 'bra.camp.gaucho'].includes(league.id)) this.triggerGloboGoalAnimation(ev.id, 'home');
                    else if (league.id === 'conmebol.libertadores') { this.triggerLibertadoresEvent(ev.id, 'goal', h.team.abbreviation, 'GOL'); this.triggerLibertadoresGoalPop(ev.id); }
                    else this.triggerBrasileiraoGoalAnimation(ev.id, 'home');
                    const sh = document.getElementById(`score-home-${ev.id}`); if (sh) sh.innerText = newHomeScore;
                    matchCard.setAttribute('data-home-score', newHomeScore);
                }
                if (newAwayScore > oldAwayScore) {
                    if (['bra.1', 'bra.2', 'bra.copa_do_brazil'].includes(league.id)) this.triggerCbfGoalAnimation(ev.id, 'away');
                    else if (league.id === 'ita.1') this.triggerSerieAGoalAnimation(ev.id, 'away');
                    else if (league.id === 'ger.1') this.triggerBundesligaGoalAnimation(ev.id, 'away');
                    else if (['bra.camp.paulista', 'bra.camp.carioca', 'bra.camp.mineiro', 'bra.camp.gaucho'].includes(league.id)) this.triggerGloboGoalAnimation(ev.id, 'away');
                    else if (league.id === 'conmebol.libertadores') { this.triggerLibertadoresEvent(ev.id, 'goal', a.team.abbreviation, 'GOL'); this.triggerLibertadoresGoalPop(ev.id); }
                    else this.triggerBrasileiraoGoalAnimation(ev.id, 'away');
                    const sa = document.getElementById(`score-away-${ev.id}`); if (sa) sa.innerText = newAwayScore;
                    matchCard.setAttribute('data-away-score', newAwayScore);
                }

                if (status.state === 'in' && comp.details) {
                    const allEvents = comp.details, oldCardCount = parseInt(matchCard.getAttribute('data-card-events')) || 0;
                    const cardEvents = allEvents.filter(e => e.type === 'yellowcard' || e.type === 'redcard');
                    if (cardEvents.length > oldCardCount) {
                        const lastNewCard = cardEvents[cardEvents.length - 1], teamSide = h.team.id === lastNewCard.team.id ? 'home' : 'away';
                        if (['bra.1', 'bra.2', 'bra.copa_do_brazil'].includes(league.id)) this.triggerCbfCardAnimation(ev.id, teamSide, lastNewCard.type);
                        else if (league.id === 'ita.1') this.triggerSerieACardAnimation(ev.id, teamSide, lastNewCard.type);
                        else if (league.id === 'ger.1') this.triggerBundesligaCardAnimation(ev.id, teamSide, lastNewCard.type);
                        else if (['bra.camp.paulista', 'bra.camp.carioca', 'bra.camp.mineiro', 'bra.camp.gaucho'].includes(league.id)) this.triggerGloboCardAnimation(ev.id, teamSide, lastNewCard.type);
                        else if (league.id === 'conmebol.libertadores') {
                            const playerName = lastNewCard.athletesInvolved?.[0]?.shortName || 'JOGADOR';
                            this.triggerLibertadoresEvent(ev.id, lastNewCard.type === 'redcard' ? 'red' : 'yellow', teamSide === 'home' ? h.team.abbreviation : a.team.abbreviation, playerName);
                        }
                        else this.triggerBrasileiraoCardAnimation(ev.id, teamSide, lastNewCard.type);
                        matchCard.setAttribute('data-card-events', cardEvents.length);
                    }

                    const oldSubCount = parseInt(matchCard.getAttribute('data-substitution-events')) || 0;
                    const subEvents = allEvents.filter(e => e.type === 'substitution');
                    if (subEvents.length > oldSubCount) {
                        const lastNewSub = subEvents[subEvents.length - 1];
                        const team = h.team.id === lastNewSub.team.id ? h : a;
                        if (league.id === 'conmebol.libertadores') {
                            const pOut = lastNewSub.athletesInvolved?.find(x => x.type === 'athleteout');
                            const pIn = lastNewSub.athletesInvolved?.find(x => x.type === 'athletein');
                            const text = `EN: ${pIn?.shortName || ''} | SA: ${pOut?.shortName || ''}`;
                            this.triggerLibertadoresEvent(ev.id, 'sub', team.team.abbreviation, text);
                        } else this.triggerSubstitutionAnimation(ev.id, lastNewSub, team);
                        matchCard.setAttribute('data-substitution-events', subEvents.length);
                    }

                    const oldVarCount = parseInt(matchCard.getAttribute('data-var-events')) || 0;
                    const varEvents = allEvents.filter(e => e.text && (e.text.toLowerCase().includes('var') || e.text.toLowerCase().includes('revisão')));
                    if (varEvents.length > oldVarCount) {
                        const lastNewVar = varEvents[varEvents.length - 1];
                        if (league.id === 'conmebol.libertadores') this.triggerLibertadoresEvent(ev.id, 'var', '', lastNewVar.text || 'REVISÃO DE VÍDEO');
                        else this.triggerVARAnimation(ev.id, lastNewVar);
                        matchCard.setAttribute('data-var-events', varEvents.length);
                    }
                }

                const timerPill = document.getElementById(`timer-pill-${ev.id}`);
                if (timerPill && status.state === 'in' && !timerPill.dataset.timerActive) {
                    const timerId = this.startLiveCardTimer(ev.id, comp.status);
                    if (timerId) this.state.matchCardTimers.push(timerId);
                } else if (timerPill && status.state !== 'in') {
                    timerPill.innerHTML = `<span>${status.shortDetail}</span>`;
                }
            });
        } catch (e) { console.error("Erro ao atualizar partidas ao vivo:", e); }
    },

    /* ================= STANDINGS / KNOCKOUT / SCORERS / NEWS / CLUBS ================= */
    async fetchStandings(id) {
        const con = document.getElementById('standings-container'); if (!con) return;
        const legend = document.getElementById('standings-legend'); if (legend) legend.innerHTML = '';
        con.innerHTML = '<div class="col-span-full py-20 flex justify-center"><div class="loader-ring"></div></div>';
        try {
            const res = await espnFetch(API_CONFIG.espn.standings(id));
            const data = await res.json();
            const tableData = data.children?.find(c => c.standings?.type !== 'bracket' && c.standings?.entries?.length > 0);
            if (tableData) this.renderStandingsTable(data);
            else con.innerHTML = '<div class="text-center text-gray-500 glass-panel p-10">Tabela de classificação não disponível para esta competição.</div>';
        } catch (e) {
            console.error("Erro ao buscar a tabela:", e);
            con.innerHTML = `<div class="text-center text-red-400 glass-panel p-10"><div class="text-lg font-bold mb-2">Erro ao carregar a tabela</div><div class="text-sm opacity-80">${e.message || ''}</div></div>`;
        }
    },

    async fetchKnockout(id) {
        const con = document.getElementById('knockout-container'); if (!con) return;
        con.innerHTML = '<div class="col-span-full py-20 flex justify-center"><div class="loader-ring"></div></div>';
        try {
            const res = await espnFetch(API_CONFIG.espn.standings(id));
            const data = await res.json();
            const bracketData = data.children?.find(c => c.standings?.type === 'bracket');
            if (bracketData) this.renderKnockoutBracket(bracketData, 'knockout-container');
            else con.innerHTML = '<div class="text-center text-gray-500 glass-panel p-10">Não há chaveamento de mata-mata disponível para esta competição.</div>';
        } catch (e) { console.error("Erro ao buscar o chaveamento:", e); con.innerHTML = '<div class="text-center text-red-400">Erro ao carregar o chaveamento.</div>'; }
    },

    renderKnockoutBracket(bracketData, containerId) {
        const con = document.getElementById(containerId);
        if (!con) return;
        con.innerHTML = '';
        const rounds = {};
        const roundOrder = ['Oitavas de Final', 'Quartas de Final', 'Semifinal', 'Final'];
        const roundNameMapping = { 'Round of 16': 'Oitavas de Final', 'Quarterfinal': 'Quartas de Final', 'Quarterfinals': 'Quartas de Final', 'Semifinal': 'Semifinal', 'Semifinals': 'Semifinal', 'Final': 'Final' };
        const bracketEntries = bracketData.standings?.entries || [];
        bracketEntries.forEach(matchup => {
            const roundName = roundNameMapping[matchup.group?.name] || matchup.group?.name;
            if (!roundOrder.includes(roundName)) return;
            if (!rounds[roundName]) rounds[roundName] = [];
            const entry = matchup.entry;
            if (!entry || !entry.competitors || entry.competitors.length < 2) return;
            const home = entry.competitors.find(c => c.homeAway === 'home');
            const away = entry.competitors.find(c => c.homeAway === 'away');
            if (!home || !away) return;
            rounds[roundName].push({
                home: { name: home.team.displayName, logo: home.team.logos?.[0]?.href },
                away: { name: away.team.displayName, logo: away.team.logos?.[0]?.href },
                homeScore: home.score,
                awayScore: away.score,
                winner: entry.winner ? (String(entry.winner.id) === String(home.team.id) ? 'home' : 'away') : null,
                status: entry.status?.type?.detail || ''
            });
        });
        let bracketHTML = '<div class="bracket-container custom-scroll">';
        roundOrder.forEach(roundName => {
            if (rounds[roundName] && rounds[roundName].length > 0) {
                bracketHTML += `<div class="bracket-round">`;
                bracketHTML += `<h2 class="bracket-round-title">${roundName}</h2>`;
                rounds[roundName].forEach(match => {
                    bracketHTML += `
                        <div class="bracket-matchup">
                            <div class="bracket-team ${match.winner === 'home' ? 'winner' : (match.winner ? 'loser' : '')}">
                                <img src="${match.home.logo}" class="bracket-team-logo">
                                <span class="bracket-team-name">${match.home.name}</span>
                                <span class="bracket-team-score">${match.homeScore || '-'}</span>
                            </div>
                            <div class="matchup-divider"></div>
                            <div class="bracket-team ${match.winner === 'away' ? 'winner' : (match.winner ? 'loser' : '')}">
                                <img src="${match.away.logo}" class="bracket-team-logo">
                                <span class="bracket-team-name">${match.away.name}</span>
                                <span class="bracket-team-score">${match.awayScore || '-'}</span>
                            </div>
                        </div>`;
                });
                bracketHTML += `</div>`;
            }
        });
        bracketHTML += '</div>';
        con.innerHTML = bracketHTML;
        if (Object.keys(rounds).length === 0) con.innerHTML = '<div class="text-center text-gray-500 glass-panel p-10">Fase de mata-mata ainda não iniciada ou dados da API indisponíveis.</div>';
    },

    renderStandingsTable(data) {
        const con = document.getElementById('standings-container'); if (!con) return;
        const legend = document.getElementById('standings-legend'); if (legend) legend.innerHTML = '';
        con.innerHTML = '';
        const leagueKey = this.state.currentLeague;
        const isCbf = ['brasileirao', 'brasileiraob'].includes(leagueKey);
        let zones = {};
        let legendItems = [];
        if (leagueKey === 'brasileirao') {
            zones = { 1: 'libertadores', 2: 'libertadores', 3: 'libertadores', 4: 'libertadores', 5: 'prelibertadores', 6: 'prelibertadores', 7: 'sulamericana', 8: 'sulamericana', 9: 'sulamericana', 10: 'sulamericana', 11: 'sulamericana', 12: 'sulamericana', 17: 'rebaixamento', 18: 'rebaixamento', 19: 'rebaixamento', 20: 'rebaixamento' };
            legendItems = [{ color: 'bg-libertadores', text: 'Libertadores' }, { color: 'bg-prelibertadores', text: 'Pré-Libertadores' }, { color: 'bg-sulamericana', text: 'Sul-Americana' }, { color: 'bg-rebaixamento', text: 'Rebaixamento' }];
        } else if (leagueKey === 'brasileiraob') {
            zones = { 1: 'acesso', 2: 'acesso', 3: 'acesso', 4: 'acesso', 17: 'rebaixamento', 18: 'rebaixamento', 19: 'rebaixamento', 20: 'rebaixamento' };
            legendItems = [{ color: 'bg-acesso', text: 'Acesso à Série A' }, { color: 'bg-rebaixamento', text: 'Rebaixamento' }];
        } else if (['premier', 'laliga', 'seriea', 'bundesliga'].includes(leagueKey)) {
            zones = { 1: 'libertadores', 2: 'libertadores', 3: 'libertadores', 4: 'libertadores', 5: 'sulamericana', 6: 'sulamericana', 18: 'rebaixamento', 19: 'rebaixamento', 20: 'rebaixamento' };
            legendItems = [{ color: 'bg-libertadores', text: 'Champions League' }, { color: 'bg-sulamericana', text: 'Europa League' }, { color: 'bg-rebaixamento', text: 'Rebaixamento' }];
        }
        if (isCbf) {
            if (legend) {
                legend.className = 'cbf-standings-legend';
                legend.innerHTML = legendItems.map(i => `<div class="cbf-legend-item"><div class="cbf-legend-dot ${i.color}"></div><span>${i.text}</span></div>`).join('');
            }
            (data.children || []).forEach(g => {
                const scrollWrapper = document.createElement('div');
                scrollWrapper.className = 'standings-scroll';
                const card = document.createElement('div'); card.className = 'cbf-standings-card mb-6';
                let html = `<div class="cbf-standings-header"><div>#</div><div class="text-left">Clube</div><div class="text-center">Pts</div><div class="text-center hidden sm:block">J</div><div class="text-center hidden sm:block">V</div><div class="text-center hidden sm:block">E</div><div class="text-center hidden sm:block">D</div><div class="text-center hidden sm:block">SG</div><div class="text-center">%</div></div>`;
                (g.standings?.entries || []).forEach((e, i) => {
                    const val = n => e.stats?.find(s => s.name === n)?.value || 0;
                    const rank = i + 1;
                    const zoneClass = zones[rank] ? `zone-${zones[rank]}` : '';
                    html += `<div class="cbf-standings-row"><div class="cbf-rank-cell ${zoneClass}"><span>${rank}</span></div><div class="cbf-team-cell"><img src="${e.team.logos?.[0]?.href || ''}"> <span class="truncate">${e.team.shortDisplayName}</span></div><span class="cbf-points-cell">${val('points')}</span><span class="cbf-stats-cell hidden sm:block">${val('gamesPlayed')}</span><span class="cbf-stats-cell hidden sm:block">${val('wins')}</span><span class="cbf-stats-cell hidden sm:block">${val('ties')}</span><span class="cbf-stats-cell hidden sm:block">${val('losses')}</span><span class="cbf-stats-cell hidden sm:block">${val('pointDifferential')}</span><span class="cbf-stats-cell text-xs">${val('gamesPlayed') > 0 ? Math.round((val('points') / (val('gamesPlayed') * 3)) * 100) : 0}%</span></div>`;
                });
                card.innerHTML = html;
                scrollWrapper.appendChild(card);
                con.appendChild(scrollWrapper);
            });
        } else {
            if (legend) {
                legend.className = 'mt-6 flex flex-wrap gap-4 text-xs font-medium text-gray-400';
                legend.innerHTML = legendItems.map(i => `<div class="flex items-center gap-2"><div class="w-2 h-2 rounded-full ${i.color}"></div><span>${i.text}</span></div>`).join('');
            }
            (data.children || []).forEach(g => {
                const scrollWrapper = document.createElement('div');
                scrollWrapper.className = 'standings-scroll';
                const card = document.createElement('div'); card.className = 'glass-panel overflow-hidden mb-6';
                let html = `<div class="p-4 border-b border-[var(--border-color)] font-bold text-sm uppercase text-[var(--accent)] bg-white/5 tracking-wider">${g.name}</div>`;
                html += `<div class="std-table-header"><div>#</div><div class="text-left">Clube</div><div class="text-center">Pts</div><div class="text-center hidden sm:block">J</div><div class="text-center hidden sm:block">V</div><div class="text-center hidden sm:block">E</div><div class="text-center hidden sm:block">D</div><div class="text-center hidden sm:block">SG</div><div class="text-center">%</div></div>`;
                (g.standings?.entries || []).forEach((e, i) => {
                    const val = n => e.stats?.find(s => s.name === n)?.value || 0;
                    const rank = i + 1;
                    const bgZone = zones[rank] ? `bg-${zones[rank]}` : 'bg-transparent';
                    html += `<div class="std-row"><div class="rank-cell"><div class="rank-dot ${bgZone}"></div><span>${rank}</span></div><div class="team-cell"><img src="${e.team.logos?.[0]?.href || ''}"> <span class="truncate font-medium">${e.team.shortDisplayName}</span></div><span class="font-bold text-center text-lg">${val('points')}</span><span class="opacity-70 text-center hidden sm:block">${val('gamesPlayed')}</span><span class="opacity-70 text-center hidden sm:block">${val('wins')}</span><span class="opacity-70 text-center hidden sm:block">${val('ties')}</span><span class="opacity-70 text-center hidden sm:block">${val('losses')}</span><span class="opacity-70 text-center hidden sm:block">${val('pointDifferential')}</span><span class="opacity-70 text-center text-xs">${val('gamesPlayed') > 0 ? Math.round((val('points') / (val('gamesPlayed') * 3)) * 100) : 0}%</span></div>`;
                });
                card.innerHTML = html;
                scrollWrapper.appendChild(card);
                con.appendChild(scrollWrapper);
            });
        }
    },

    async fetchScorers(leagueKey) {
        const g = document.getElementById('scorers-grid'); if (!g) return;
        g.innerHTML = '<div class="col-span-full py-20 flex justify-center"><div class="loader-ring"></div></div>';
        const leagueData = SPORTS_DB.soccer.leagues[leagueKey];
        if (!leagueData) { g.innerHTML = '<div class="col-span-full text-center text-gray-500 glass-panel p-10">Dados indisponíveis.</div>'; return; }
        const season = this.state.selectedSeason;
        const cacheKey = `${leagueKey}_${season}`;

        const renderScorers = async (scorersData) => {
            if (!scorersData || scorersData.length === 0) {
                g.innerHTML = '<div class="col-span-full text-center text-gray-500 glass-panel p-10">Sem dados de artilharia para esta competição/temporada.</div>';
                return;
            }
            g.innerHTML = '';
            scorersData.slice(0, 20).forEach((item, i) => {
                const card = document.createElement('div');
                card.className = 'glass-panel !p-4 flex items-center gap-4 cursor-pointer hover:border-[var(--accent)] transition';
                card.onclick = () => this.loadWikiDetail(item.playerName, item.photo);
                const teamLogoImg = item.teamLogo ? `<img src="${item.teamLogo}" class="w-5 h-5 mr-2 object-contain">` : '';
                const playerPhoto = item.photo
                    ? `<img src="${item.photo}" class="w-12 h-12 rounded-full border border-[var(--border-color)] object-cover bg-[var(--bg-primary)]" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iI2EwYTBiMiI+PHBhdGggZD0iTTEyIDJDNi40OCAyIDIgNi40OCAyIDEyczQuNDggMTAgMTAgMTAgMTAtNC40OCAxMC0xMFMxNy41MiAyIDEyIDJ6bTAgMy41YzEuOTMgMCAzLjUgMS41NyAzLjUgMy41UzEzLjkzIDEyLjUgMTIgMTIuNXMtMy41LTEuNTctMy41LTMuNVMxMC4wNyA1LjUgMTIgNS41em0wIDEzLjVjLTIuOTcgMC02LjYxIDEuNDYtOC4wMyA0LjA0QzQuNDIgMjEuMjYgOC4wNiAyMiAxMiAyMnMyLjYxLS43NCAzLjk3LTEuNDZjLTEuNDItMi41OC01LjA2LTQuMDQtOC4wMy00LjA0eiIvPjwvc3ZnPg=='">`
                    : `<div class="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center"><i data-lucide="user" class="w-6 h-6 text-gray-400"></i></div>`;
                card.innerHTML = `<div class="font-bold text-2xl text-[var(--accent)] w-8 text-center">${i + 1}</div>
                            ${playerPhoto}
                            <div class="flex-1"><div class="font-bold text-lg text-white leading-tight">${item.playerName}</div><div class="text-sm font-medium flex items-center text-gray-400 mt-1">${teamLogoImg}<span>${item.teamName || '—'}</span></div></div>
                            <div class="font-black text-3xl text-white">${item.goals}</div>`;
                g.appendChild(card);
            });
            if (window.lucide) lucide.createIcons();
        };

        if (this.state.scorersCache[cacheKey]) { renderScorers(this.state.scorersCache[cacheKey]); return; }
        try {
            const url = API_CONFIG.espn.leaders(leagueData.id, season);
            const res = await espnFetch(url);
            const data = await res.json();
            const scorers = await this.parseEspnScorers(data);
            this.state.scorersCache[cacheKey] = scorers;
            renderScorers(scorers);
        } catch (e) {
            console.error("Erro ao buscar artilharia ESPN:", e);
            g.innerHTML = '<div class="col-span-full text-center text-red-400 glass-panel p-10">Erro ao carregar artilharia via ESPN.</div>';
        }
    },

    async parseEspnScorers(data) {
        if (!data) return [];
        const categories = data.categories || data.items || [];
        const goalsCategory = categories.find(c => {
            const n = (c.name || c.shortName || '').toLowerCase();
            return n.includes('goal') || n.includes('scorer') || n.includes('artilh');
        }) || categories[0];
        if (!goalsCategory || !goalsCategory.leaders) return [];
        const leaders = goalsCategory.leaders.slice(0, 20);

        const resolved = await Promise.all(leaders.map(async (l) => {
            try {
                const athleteRef = l.athlete?.$ref;
                const teamRef = l.team?.$ref;
                let playerName = l.athlete?.displayName || '';
                let photo = l.athlete?.headshot?.href || '';
                let teamName = l.team?.displayName || l.team?.name || '';
                let teamLogo = l.team?.logos?.[0]?.href || '';

                if (athleteRef) {
                    try {
                        const ar = await espnFetch(athleteRef);
                        const ad = await ar.json();
                        playerName = ad.displayName || ad.fullName || playerName;
                        if (ad.headshot?.href) photo = ad.headshot.href;
                    } catch (err) { /* ignora */ }
                }
                if (teamRef && !teamName) {
                    try {
                        const tr = await espnFetch(teamRef);
                        const td = await tr.json();
                        teamName = td.displayName || td.name || teamName;
                        if (td.logos?.[0]?.href) teamLogo = td.logos[0].href;
                    } catch (err) { /* ignora */ }
                }
                return { playerName: playerName || 'Jogador', photo, teamName, teamLogo, goals: l.value ?? l.displayValue ?? 0 };
            } catch (err) {
                return { playerName: l.athlete?.displayName || 'Jogador', photo: '', teamName: l.team?.displayName || '', teamLogo: '', goals: l.value ?? 0 };
            }
        }));

        return resolved.filter(r => r.playerName && r.playerName !== 'Jogador');
    },

    async fetchNews(id) {
        const g = document.getElementById('news-grid'); if (!g) return;
        g.innerHTML = '<div class="col-span-full py-20 flex justify-center"><div class="loader-ring"></div></div>';
        try {
            const res = await espnFetch(API_CONFIG.espn.news('soccer', id));
            const d = await res.json(); g.innerHTML = '';
            (d.articles || []).slice(0, 9).forEach(n => {
                if (!n.links?.web?.href) return;
                g.innerHTML += `<a href="${n.links.web.href}" target="_blank" class="glass-panel group block hover:-translate-y-1 transition duration-300">
                            <div class="aspect-video w-full overflow-hidden border-b border-[var(--border-color)] bg-black/50">${n.images?.[0]?.url ? `<img src="${n.images[0].url}" class="w-full h-full object-cover group-hover:scale-105 transition duration-500">` : ''}</div>
                            <div class="p-4 flex flex-col h-full">
                                <div class="text-[10px] font-bold uppercase tracking-widest text-[var(--accent)] mb-2">Notícia</div>
                                <h3 class="font-bold text-lg leading-snug group-hover:text-[var(--accent)] transition mb-4">${n.headline}</h3>
                                <p class="mt-auto text-xs text-gray-500 flex items-center gap-1"><i data-lucide="clock" class="w-3 h-3"></i> ${n.published || 'Recente'}</p>
                            </div>
                        </a>`;
            });
            if (window.lucide) window.lucide.createIcons();
        } catch (e) { console.error(e); g.innerHTML = '<div class="text-center text-red-400">Erro.</div>'; }
    },

    async renderClubs(leagueKey) {
        const container = document.getElementById('clubs-grid'); if (!container) return;
        this.closeWiki();
        const league = SPORTS_DB.soccer.leagues[leagueKey];
        container.innerHTML = '<div class="col-span-full py-20 flex justify-center"><div class="loader-ring"></div></div>';
        const teamsFromApi = await this.getEspnLeagueTeams(league.id);
        container.innerHTML = '';
        if (!teamsFromApi.length) { container.innerHTML = '<div class="col-span-full text-center text-gray-500 glass-panel p-10">Não foi possível carregar os clubes. Verifique a conexão.</div>'; return; }

        teamsFromApi.sort((a, b) => (a.displayName || '').localeCompare(b.displayName || '')).forEach(teamData => {
            const card = document.createElement('div');
            card.className = 'glass-panel !p-4 md:!p-6 flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-[var(--accent)] transition';
            const displayName = teamData.displayName;
            const logoUrl = teamData.logos?.[0]?.href || '';
            const clubWikiName = (teamData.name || '').replace(/ /g, '_');
            card.onclick = () => this.showTeamSchedule(teamData.id, displayName, logoUrl, clubWikiName);
            const imgContent = logoUrl
                ? `<img src="${logoUrl}" alt="${displayName}" class="w-14 h-14 md:w-20 md:h-20 object-contain" onerror="this.style.display='none'">`
                : `<div class="w-14 h-14 md:w-20 md:h-20 rounded-full bg-white/10 flex items-center justify-center text-2xl md:text-3xl">⚽</div>`;
            card.innerHTML = `${imgContent}<span class="font-bold text-[var(--text-primary)] text-center text-xs md:text-sm leading-tight line-clamp-2">${displayName}</span>`;
            container.appendChild(card);
        });
    },

    async showTeamSchedule(teamId, teamName, teamLogo, wikiName) {
        this.setView('team-schedule');
        const container = document.getElementById('view-team-schedule');
        if (!container) return;

        container.innerHTML = `
            <div class="flex items-center justify-between mb-6 md:mb-8">
                <button onclick="app.setView('clubs')" class="text-[var(--accent)] hover:text-white transition flex items-center gap-2 font-bold"><i data-lucide="arrow-left"></i> Voltar para Clubes</button>
            </div>
            <div class="flex flex-col md:flex-row items-center gap-4 md:gap-6 mb-6 md:mb-8 p-4 md:p-6 rounded-3xl bg-white/5 border border-[var(--border-color)]">
                ${teamLogo ? `<img src="${teamLogo}" class="w-16 h-16 md:w-20 md:h-20 object-contain" onerror="this.style.display='none'">` : ''}
                <div class="flex-1 text-center md:text-left">
                    <h2 class="text-xl md:text-3xl font-bold text-[var(--text-primary)]">${teamName}</h2>
                    <button onclick="app.loadWikiDetail('${wikiName}')" class="mt-2 text-sm text-gray-400 hover:text-[var(--accent)] transition flex items-center justify-center md:justify-start gap-1">Ver na Wikipedia <i data-lucide="external-link" class="w-3 h-3"></i></button>
                </div>
            </div>
            <div id="team-view-tabs" class="flex items-center border-b border-[var(--border-color)] mb-6 overflow-x-auto custom-scroll">
                <button data-tab="schedule" class="px-4 py-3 text-sm font-bold border-b-2 transition whitespace-nowrap text-[var(--text-primary)] border-[var(--accent)]">Jogos</button>
                <button data-tab="roster" class="px-4 py-3 text-sm font-bold border-b-2 transition whitespace-nowrap text-[var(--text-muted)] border-transparent hover:text-[var(--text-primary)]">Elenco</button>
            </div>
            <div id="team-tab-schedule">
                <h3 class="text-lg md:text-xl font-bold mb-4 md:mb-6 text-[var(--text-primary)]">Próximos Jogos</h3>
                <div id="team-schedule-list" class="space-y-3 md:space-y-4"><div class="col-span-full py-20 flex justify-center"><div class="loader-ring"></div></div></div>
                <h3 class="text-lg md:text-xl font-bold mt-8 md:mt-10 mb-4 md:mb-6 text-[var(--text-primary)]">Últimos Resultados</h3>
                <div id="team-results-list" class="space-y-3 md:space-y-4"></div>
            </div>
            <div id="team-tab-roster" class="hidden">
                <div id="team-roster-list" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4"><div class="col-span-full py-20 flex justify-center"><div class="loader-ring"></div></div></div>
            </div>
        `;
        if (window.lucide) lucide.createIcons();

        container.querySelectorAll('#team-view-tabs button').forEach(button => {
            button.addEventListener('click', () => {
                container.querySelectorAll('#team-view-tabs button').forEach(btn => { btn.className = 'px-4 py-3 text-sm font-bold border-b-2 transition whitespace-nowrap text-[var(--text-muted)] border-transparent hover:text-[var(--text-primary)]'; });
                button.className = 'px-4 py-3 text-sm font-bold border-b-2 transition whitespace-nowrap text-[var(--text-primary)] border-[var(--accent)]';
                document.getElementById('team-tab-schedule')?.classList.toggle('hidden', button.dataset.tab !== 'schedule');
                document.getElementById('team-tab-roster')?.classList.toggle('hidden', button.dataset.tab !== 'roster');
            });
        });

        const sport = this.state.currentSport;
        const league = SPORTS_DB[sport].leagues[this.state.currentLeague];
        try {
            const res = await espnFetch(API_CONFIG.espn.teamSchedule(sport, league.id, teamId));
            const data = await res.json();
            this.renderTeamScheduleAndResults(data.events || [], teamId);
        } catch (e) { console.error(e); const el = document.getElementById('team-schedule-list'); if (el) el.innerHTML = '<div class="text-center text-red-400">Erro.</div>'; }

        try {
            const res = await espnFetch(API_CONFIG.espn.roster(league.id, teamId));
            const data = await res.json();
            this.renderTeamRoster(data);
        } catch (e) { console.error(e); const el = document.getElementById('team-roster-list'); if (el) el.innerHTML = '<div class="text-center text-red-400">Erro.</div>'; }
    },

    renderTeamScheduleAndResults(events, teamId) {
        const upcomingList = document.getElementById('team-schedule-list');
        const resultsList = document.getElementById('team-results-list');
        if (!upcomingList || !resultsList) return;
        upcomingList.innerHTML = ''; resultsList.innerHTML = '';
        const now = new Date();
        const upcomingEvents = events.filter(e => new Date(e.date) >= now);
        const pastEvents = events.filter(e => new Date(e.date) < now).sort((a, b) => new Date(b.date) - new Date(a.date));

        if (upcomingEvents.length === 0) upcomingList.innerHTML = '<div class="text-center text-gray-500 glass-panel p-10">Nenhum jogo futuro.</div>';
        else {
            upcomingEvents.forEach(ev => {
                const comp = ev.competitions[0];
                const home = comp.competitors.find(c => c.homeAway === 'home');
                const away = comp.competitors.find(c => c.homeAway === 'away');
                const isHomeGame = String(home.id) === String(teamId);
                const opponent = isHomeGame ? away : home;
                const eventDate = new Date(ev.date);
                const item = document.createElement('div'); item.className = 'glass-panel !p-4 flex items-center gap-3 md:gap-4';
                item.innerHTML = `<div class="text-center w-16 md:w-20 shrink-0"><div class="font-bold text-xs md:text-sm text-[var(--text-primary)]">${eventDate.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}</div><div class="text-[10px] md:text-xs text-gray-400">${eventDate.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</div></div><div class="w-px h-10 bg-white/10"></div><div class="flex items-center gap-3 md:gap-4 flex-1 min-w-0"><img src="${opponent.team.logos?.[0]?.href || ''}" class="w-7 h-7 md:w-8 md:h-8 object-contain shrink-0"><div class="min-w-0"><div class="font-bold text-sm md:text-base text-[var(--text-primary)] truncate">${opponent.team.displayName}</div><div class="text-[10px] md:text-xs text-gray-400 truncate">${ev.shortName}</div></div></div><div class="text-[10px] md:text-xs font-bold uppercase text-gray-500 w-12 md:w-16 text-center shrink-0">${isHomeGame ? 'CASA' : 'FORA'}</div>`;
                upcomingList.appendChild(item);
            });
        }

        if (pastEvents.length === 0) resultsList.innerHTML = '<div class="text-center text-gray-500 glass-panel p-10">Nenhum resultado.</div>';
        else {
            pastEvents.slice(0, 5).forEach(ev => {
                const comp = ev.competitions[0];
                const home = comp.competitors.find(c => c.homeAway === 'home');
                const away = comp.competitors.find(c => c.homeAway === 'away');
                const isOurTeamHome = String(home.id) === String(teamId);
                const ourTeam = isOurTeamHome ? home : away;
                const opponent = isOurTeamHome ? away : home;
                const ourScore = parseInt(ourTeam.score || '0');
                const opponentScore = parseInt(opponent.score || '0');
                let resultIndicator = 'E', resultColorClass = 'bg-gray-500';
                if (ourScore > opponentScore) { resultIndicator = 'V'; resultColorClass = 'bg-green-500'; }
                else if (ourScore < opponentScore) { resultIndicator = 'D'; resultColorClass = 'bg-red-500'; }

                const item = document.createElement('div'); item.className = 'glass-panel !p-4 flex items-center gap-3 md:gap-4';
                item.innerHTML = `<div class="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-xl text-white font-bold text-base md:text-lg ${resultColorClass} shrink-0">${resultIndicator}</div>
                            <div class="flex-1 min-w-0"><div class="flex items-center gap-2 md:gap-3"><img src="${home.team.logos?.[0]?.href || ''}" class="w-5 h-5 md:w-6 md:h-6 object-contain shrink-0"><span class="font-medium text-white text-sm md:text-base truncate ${home.id === teamId ? 'font-bold' : ''}">${home.team.displayName}</span><span class="ml-auto font-bold text-base md:text-lg text-white shrink-0">${home.score || '0'}</span></div>
                            <div class="flex items-center gap-2 md:gap-3 mt-2"><img src="${away.team.logos?.[0]?.href || ''}" class="w-5 h-5 md:w-6 md:h-6 object-contain shrink-0"><span class="font-medium text-white text-sm md:text-base truncate ${away.id === teamId ? 'font-bold' : ''}">${away.team.displayName}</span><span class="ml-auto font-bold text-base md:text-lg text-white shrink-0">${away.score || '0'}</span></div></div>`;
                resultsList.appendChild(item);
            });
        }
    },

    renderTeamRoster(data) {
        const rosterList = document.getElementById('team-roster-list'); if (!rosterList) return;
        if (!data || !data.athletes || data.athletes.length === 0) { rosterList.innerHTML = '<div class="col-span-full text-center text-gray-500 glass-panel p-10">Elenco não disponível.</div>'; return; }
        rosterList.innerHTML = '';
        data.athletes.forEach(group => {
            rosterList.innerHTML += `<h4 class="col-span-full text-base md:text-lg font-bold text-[var(--accent)] mt-5 md:mt-6 mb-2">${group.position}</h4>`;
            group.items.forEach(p => {
                const card = document.createElement('div'); card.className = 'glass-panel !p-3 md:!p-4 flex items-center gap-3 md:gap-4';
                card.innerHTML = `<div class="font-bold text-xl md:text-2xl text-[var(--accent)] w-7 md:w-8 text-center">${p.jersey || ''}</div><img src="${p.headshot?.href || ''}" class="w-10 h-10 md:w-12 md:h-12 rounded-full border border-[var(--border-color)] object-cover bg-[var(--bg-primary)] shrink-0" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iI2EwYTBiMiI+PHBhdGggZD0iTTEyIDJDNi40OCAyIDIgNi40OCAyIDEyczQuNDggMTAgMTAgMTAgMTAtNC40OCAxMC0xMFMxNy41MiAyIDEyIDJ6bTAgMy41YzEuOTMgMCAzLjUgMS41NyAzLjUgMy41UzEzLjkzIDEyLjUgMTIgMTIuNXMtMy41LTEuNTctMy41LTMuNVMxMC4wNyA1LjUgMTIgNS41em0wIDEzLjVjLTIuOTcgMC02LjYxIDEuNDYtOC4wMyA0LjA0QzQuNDIgMjEuMjYgOC4wNiAyMiAxMiAyMnMyLjYxLS43NCAzLjk3LTEuNDZjLTEuNDItMi41OC01LjA2LTQuMDQtOC4wMy00LjA0eiIvPjwvc3ZnPg=='><div class="flex-1 min-w-0"><div class="font-bold text-base md:text-lg text-[var(--text-primary)] truncate">${p.fullName}</div><div class="text-xs md:text-sm font-medium text-gray-400 truncate">${p.nationality || ''}</div></div>`;
                rosterList.appendChild(card);
            });
        });
    },

    searchWiki() {
        let q = '';
        if (this.state.view === 'clubs') { const el = document.getElementById('wiki-search-input'); if (el) q = el.value; }
        if (!q) return;
        this.loadWikiDetail(q);
    },

    async loadWikiDetail(searchTerm, logoUrl = null) {
        const container = document.getElementById('wiki-content-area');
        const wikiDetail = document.getElementById('wiki-detail');
        if (!container || !wikiDetail) return;

        if (this.state.view === 'clubs') {
            document.getElementById('clubs-grid')?.classList.add('hidden');
            document.getElementById('wiki-search-input')?.parentElement?.classList.add('hidden');
        } else if (this.state.view === 'team-schedule') {
            document.getElementById('view-team-schedule')?.classList.add('hidden');
        } else if (this.state.view === 'scorers') {
            document.getElementById('scorers-grid')?.classList.add('hidden');
            document.getElementById('scorers-header')?.classList.add('hidden');
        }

        wikiDetail.classList.remove('hidden');
        container.innerHTML = '<div class="flex flex-col items-center justify-center py-20"><div class="loader-ring"></div></div>';

        try {
            const queryTerm = searchTerm.replace(/_/g, ' ').trim();
            const attempts = [queryTerm, `${queryTerm} futebolista`, `${queryTerm} jogador de futebol`, `${queryTerm} (futebolista)`];

            let searchResults = [];
            for (const q of attempts) {
                try {
                    const r = await fetch(API_CONFIG.wikipedia.search(q));
                    const d = await r.json();
                    const hits = d?.query?.search || [];
                    if (hits.length) {
                        searchResults = hits;
                        const first = hits[0].title.toLowerCase();
                        if (first === queryTerm.toLowerCase()) break;
                    }
                } catch (err) { /* tenta próximo */ }
            }

            if (!searchResults.length) {
                container.innerHTML = `<p class="text-center text-red-400">Conteúdo não encontrado para "${queryTerm}".</p>`;
                return;
            }

            let bestPage = null, bestImage = null, fallbackPage = null, fallbackImage = null;
            const stripHtml = (s) => (s || '').replace(/<[^>]*>/g, '');

            for (const hit of searchResults.slice(0, 6)) {
                try {
                    const r = await fetch(API_CONFIG.wikipedia.detail(hit.title));
                    const d = await r.json();
                    const pages = d?.query?.pages || {};
                    const page = Object.values(pages)[0];
                    if (!page || page.missing !== undefined) continue;
                    if (page.pageprops?.disambiguation !== undefined) continue;

                    const img = page.original?.source || page.thumbnail?.source || null;
                    const extract = stripHtml(page.extract);

                    if (!bestPage) bestPage = { page, extract };
                    if (!fallbackPage) fallbackPage = { page, extract };

                    if (img) { bestImage = img; bestPage = { page, extract }; break; }
                    if (!fallbackImage && img) fallbackImage = img;
                } catch (err) { console.warn('Erro detalhe Wikipedia:', err); }
            }

            const chosen = bestPage || fallbackPage;
            if (!chosen) {
                container.innerHTML = `<p class="text-center text-red-400">Conteúdo não encontrado.</p>`;
                return;
            }

            const { page, extract } = chosen;
            const finalImage = bestImage || fallbackImage || logoUrl;

            let html = `<div class="flex flex-col md:flex-row items-start gap-6 md:gap-8 mb-6 md:mb-8">`;
            if (finalImage) {
                html += `<img src="${finalImage}" alt="${page.title}" class="w-28 h-28 md:w-40 md:h-40 object-cover rounded-2xl border border-[var(--border-color)] bg-white/5 shrink-0 mx-auto md:mx-0 shadow-lg" onerror="this.onerror=null;this.style.display='none';">`;
            }
            html += `<div class="flex-1 pt-2 text-center md:text-left">
                        <h2 class="text-2xl md:text-4xl font-black leading-tight text-[var(--text-primary)]">${page.title}</h2>
                        <a href="https://pt.wikipedia.org/wiki/${encodeURIComponent(page.title)}" target="_blank" class="inline-flex items-center gap-1 text-xs text-gray-400 hover:text-[var(--accent)] mt-2 transition">
                            Abrir na Wikipedia <i data-lucide="external-link" class="w-3 h-3"></i>
                        </a>
                     </div></div>`;
            html += `<div class="text-base md:text-lg leading-relaxed text-[var(--text-muted)]">${extract ? extract.replace(/\n/g, '<br><br>') : 'Sem descrição disponível.'}</div>`;

            container.innerHTML = html;
            if (window.lucide) lucide.createIcons();
        } catch (e) {
            console.error('Erro loadWikiDetail:', e);
            container.innerHTML = '<p class="text-center text-red-400">Erro ao carregar conteúdo da Wikipedia.</p>';
        }
    },

    closeWiki() {
        const wikiDetail = document.getElementById('wiki-detail');
        if (wikiDetail) wikiDetail.classList.add('hidden');
        if (this.state.view === 'clubs') {
            document.getElementById('clubs-grid')?.classList.remove('hidden');
            document.getElementById('wiki-search-input')?.parentElement?.classList.remove('hidden');
        } else if (this.state.view === 'team-schedule') {
            this.setView('clubs');
        } else if (this.state.view === 'scorers') {
            document.getElementById('scorers-grid')?.classList.remove('hidden');
            document.getElementById('scorers-header')?.classList.remove('hidden');
        }
    },

    /* ================================================================
       MODAL DE PARTIDA — VERSÃO NOVA
       ================================================================ */
    async openMatch(id) {
        const m = document.getElementById('match-modal');
        if (!m) return;

        const pipButton = document.getElementById('pip-button');
        if ('documentPictureInPicture' in window && pipButton) {
            pipButton.classList.remove('hidden');
        }

        const l = SPORTS_DB.soccer.leagues[this.state.currentLeague];
        m.classList.add('open');

        const bgEl = document.getElementById('modal-bg');
        if (bgEl && l?.bg) bgEl.style.backgroundImage = `url('${l.bg}')`;

        this.switchMatchModalTab('summary');
        const bcPane = document.getElementById('match-tab-broadcast');
        if (bcPane) bcPane.dataset.loaded = '';

        const setText = (id, txt) => { const el = document.getElementById(id); if (el) el.innerText = txt; };
        setText('modal-home-name', 'Carregando...');
        setText('modal-away-name', 'Carregando...');
        setText('modal-score', '0 - 0');
        setText('modal-status', 'Carregando...');

        const audio = document.getElementById('silent-audio');
        if (audio) audio.play().catch(() => { /* autoplay bloqueado */ });

        try {
            const res = await espnFetch(API_CONFIG.espn.gameSummary(l.id, id));
            const d = await res.json();
            this.state.currentMatchData = d;
            this.renderMatchDetail(d);
            this.updateMediaSession();

            if (this.state.liveModalUpdateInterval) {
                clearInterval(this.state.liveModalUpdateInterval);
                this.state.liveModalUpdateInterval = null;
            }

            const statusObj = d?.header?.status || d?.header?.competitions?.[0]?.status;
            if (statusObj?.type?.state === 'in') {
                this.state.liveModalUpdateInterval = setInterval(async () => {
                    try {
                        const liveRes = await espnFetch(API_CONFIG.espn.gameSummary(l.id, id));
                        const liveData = await liveRes.json();
                        this.state.currentMatchData = liveData;
                        this.renderMatchDetail(liveData);
                    } catch (err) {
                        console.error('[Match live update]', err);
                    }
                }, 15000);
            }
        } catch (e) {
            console.error('Erro modal:', e);
            const tl = document.getElementById('modal-timeline');
            if (tl) tl.innerHTML = `<div class="md-empty">Erro ao carregar os detalhes da partida.</div>`;
        }
    },

    renderMatchDetail(d) {
        if (!d?.header) return;
        const competitors = d.header.competitions?.[0]?.competitors || [];
        const h = competitors.find(x => x.homeAway === 'home');
        const a = competitors.find(x => x.homeAway === 'away');
        if (!h || !a) return;

        const setText = (id, txt) => { const el = document.getElementById(id); if (el) el.innerText = txt; };
        const setSrc = (id, src) => { const el = document.getElementById(id); if (el && src) el.src = src; };

        setText('modal-home-name', h.team.displayName || h.team.shortDisplayName || '');
        setText('modal-away-name', a.team.displayName || a.team.shortDisplayName || '');
        setSrc('modal-home-logo', h.team.logos?.[0]?.href || '');
        setSrc('modal-away-logo', a.team.logos?.[0]?.href || '');
        setText('modal-score', `${h.score || '0'} - ${a.score || '0'}`);

        const status = d.header.status || d.header.competitions?.[0]?.status;
        if (this.state.matchTimerInterval) {
            clearInterval(this.state.matchTimerInterval);
            this.state.matchTimerInterval = null;
        }

        setText('modal-status', status?.type?.shortDetail || 'N/D');

        const comp = d.header.competitions?.[0];
        if (status?.type?.state === 'in' && comp?.status) {
            this.startLiveMatchTimer(comp.status, comp.details);
        } else {
            const timeEl = document.getElementById('modal-time');
            if (timeEl) {
                timeEl.innerText = status?.type?.state === 'pre'
                    ? (status?.type?.shortDetail || 'PRÉ-JOGO')
                    : (status?.type?.description || 'ENCERRADO');
            }
        }

        this.renderMatchTimeline(d);
        this.renderMatchStatsQuick(d);
        this.renderMatchStatsFull(d);
        this.renderEspnLineups(d);

        this.updatePipContent();
        this.updateMediaSession();

        if (window.lucide) window.lucide.createIcons();
    },

    switchMatchModalTab(tabId) {
        const tabsContainer = document.getElementById('match-modal-tabs');
        if (!tabsContainer) return;

        tabsContainer.querySelectorAll('.md-tab').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.tab === tabId);
        });

        document.querySelectorAll('.md-pane').forEach(pane => pane.classList.add('hidden'));
        const activePane = document.getElementById(`match-tab-${tabId}`);
        if (activePane) activePane.classList.remove('hidden');

        if (tabId === 'broadcast') {
            const bc = document.getElementById('match-tab-broadcast');
            if (bc && bc.dataset.loaded !== '1') {
                bc.dataset.loaded = '1';
                this.fetchBroadcastForMatch();
            }
        }

        if (window.lucide) window.lucide.createIcons();
    },

    renderMatchTimeline(d) {
        const tl = document.getElementById('modal-timeline');
        if (!tl) return;

        let events = d.keyEvents || [];
        if (!events.length && d.header?.competitions?.[0]?.details) {
            events = d.header.competitions[0].details.filter(e => e.clock && (e.text || e.shortText));
        }

        if (!events.length) {
            tl.innerHTML = `<div class="md-empty">Sem lances registrados.</div>`;
            return;
        }

        tl.innerHTML = events.slice().reverse().map(e => {
            const text = e.text || e.shortText || 'Lance';
            const type = e.type?.text || (typeof e.type === 'string' ? e.type : 'Jogo');
            const clock = e.clock?.displayValue || '—';
            const lower = type.toLowerCase();

            let icon = '•';
            if (lower.includes('goal')) icon = '⚽';
            else if (lower.includes('yellow')) icon = '🟨';
            else if (lower.includes('red')) icon = '🟥';
            else if (lower.includes('substitution')) icon = '🔄';
            else if (lower.includes('var')) icon = '📺';

            return `
                <div class="md-tl-item">
                    <div class="md-tl-clock">${this._esc(clock)}</div>
                    <div class="md-tl-icon">${icon}</div>
                    <div class="md-tl-body">
                        <div class="md-tl-text">${this._esc(text)}</div>
                        <div class="md-tl-type">${this._esc(type)}</div>
                    </div>
                </div>`;
        }).join('');
    },

    _esc(s) {
        return String(s ?? '').replace(/[&<>"']/g, m => ({
            '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
        }[m]));
    },

    _extractStats(d) {
        const boxscore = d.boxscore || d.gameInfo?.boxscore;
        if (!boxscore?.teams) return [];

        const competitors = d.header?.competitions?.[0]?.competitors || [];
        const h = competitors.find(x => x.homeAway === 'home');
        const a = competitors.find(x => x.homeAway === 'away');
        if (!h || !a) return [];

        const hS = boxscore.teams.find(t => String(t.team.id) === String(h.team.id))?.statistics || [];
        const aS = boxscore.teams.find(t => String(t.team.id) === String(a.team.id))?.statistics || [];

        return hS.map(s => {
            const awayStat = aS.find(x => x.label === s.label || x.name === s.name);
            const homeVal = s.displayValue ?? s.value ?? '0';
            const awayVal = awayStat?.displayValue ?? awayStat?.value ?? '0';
            const homeNum = parseFloat(String(homeVal).replace('%', '')) || 0;
            const awayNum = parseFloat(String(awayVal).replace('%', '')) || 0;
            return { label: s.label || s.name || 'Estatística', homeVal, awayVal, homeNum, awayNum };
        });
    },

    renderMatchStatsQuick(d) {
        const con = document.getElementById('modal-stats-quick');
        if (!con) return;

        const stats = this._extractStats(d);
        if (!stats.length) {
            con.innerHTML = `<div class="md-empty">Estatísticas indisponíveis.</div>`;
            return;
        }

        const priority = ['Possession', 'Shots on Goal', 'Shots', 'Corner', 'Fouls', 'Yellow'];
        const sorted = [...stats].sort((a, b) => {
            const ai = priority.findIndex(p => a.label.toLowerCase().includes(p.toLowerCase()));
            const bi = priority.findIndex(p => b.label.toLowerCase().includes(p.toLowerCase()));
            return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
        });

        con.innerHTML = sorted.slice(0, 6).map(s => {
            const total = (s.homeNum || 0) + (s.awayNum || 0);
            const hPct = total > 0 ? (s.homeNum / total) * 100 : 50;
            return `
                <div class="md-stat-row">
                    <div class="md-stat-head">
                        <span class="md-stat-val home">${this._esc(s.homeVal)}</span>
                        <span class="md-stat-label">${this._esc(s.label)}</span>
                        <span class="md-stat-val away">${this._esc(s.awayVal)}</span>
                    </div>
                    <div class="md-stat-bar">
                        <div class="md-stat-bar-fill home" style="width:${hPct}%"></div>
                        <div class="md-stat-bar-fill away" style="width:${100 - hPct}%"></div>
                    </div>
                </div>`;
        }).join('');
    },

    renderMatchStatsFull(d) {
        const con = document.getElementById('modal-stats');
        if (!con) return;

        const stats = this._extractStats(d);
        if (!stats.length) {
            con.innerHTML = `<div class="md-empty">Estatísticas indisponíveis para esta partida.</div>`;
            return;
        }

        const competitors = d.header.competitions?.[0]?.competitors || [];
        const h = competitors.find(x => x.homeAway === 'home');
        const a = competitors.find(x => x.homeAway === 'away');

        con.innerHTML = `
            <div class="md-stat-card">
                <div class="md-stat-card-head">
                    <div class="md-stat-card-team">
                        <img src="${h?.team?.logos?.[0]?.href || ''}" alt="">
                        <span>${this._esc(h?.team?.shortDisplayName || 'Casa')}</span>
                    </div>
                    <div class="md-stat-card-team">
                        <span>${this._esc(a?.team?.shortDisplayName || 'Visitante')}</span>
                        <img src="${a?.team?.logos?.[0]?.href || ''}" alt="">
                    </div>
                </div>
                ${stats.map(s => {
            const total = (s.homeNum || 0) + (s.awayNum || 0);
            const hPct = total > 0 ? (s.homeNum / total) * 100 : 50;
            return `
                        <div class="md-stat-row">
                            <div class="md-stat-head">
                                <span class="md-stat-val home">${this._esc(s.homeVal)}</span>
                                <span class="md-stat-label">${this._esc(s.label)}</span>
                                <span class="md-stat-val away">${this._esc(s.awayVal)}</span>
                            </div>
                            <div class="md-stat-bar">
                                <div class="md-stat-bar-fill home" style="width:${hPct}%"></div>
                                <div class="md-stat-bar-fill away" style="width:${100 - hPct}%"></div>
                            </div>
                        </div>`;
        }).join('')}
            </div>`;
    },

    async fetchBroadcastForMatch() {
        const container = document.getElementById('match-tab-broadcast');
        if (!container || !this.state.currentMatchData?.header) {
            if (container) container.innerHTML = '<div class="md-empty">Dados não encontrados.</div>';
            return;
        }

        container.innerHTML = `<div style="padding:60px;display:flex;justify-content:center;"><div class="loader-ring"></div></div>`;

        let matchName = this.state.currentMatchData.header.name;
        if (!matchName) {
            const c = this.state.currentMatchData.header.competitions?.[0];
            if (c) {
                const home = c.competitors.find(x => x.homeAway === 'home');
                const away = c.competitors.find(x => x.homeAway === 'away');
                matchName = `${home?.team?.displayName || ''} vs ${away?.team?.displayName || ''}`;
            }
        }
        if (!matchName) {
            container.innerHTML = '<div class="md-empty">Erro ao buscar nome da partida.</div>';
            return;
        }

        try {
            let embeds = [];

            try {
                const searchRes = await fetch(API_CONFIG.streaming.search(matchName));
                const searchData = await searchRes.json();
                if (searchData?.data?.events?.length > 0) {
                    const event = searchData.data.events[0];
                    try {
                        const eventRes = await fetch(API_CONFIG.streaming.sportDetail(event.id));
                        const eventData = await eventRes.json();
                        if (eventData?.data?.embeds?.length > 0) embeds = eventData.data.embeds;
                    } catch (err) { /* ignora */ }
                    if (!embeds.length && event.embeds?.length > 0) embeds = event.embeds;
                }
            } catch (err) { /* ignora */ }

            if (!embeds.length) {
                try {
                    const liveRes = await fetch(API_CONFIG.streaming.sports('?status=live'));
                    const liveData = await liveRes.json();
                    const nameKey = matchName.toLowerCase().split(' vs ')[0];
                    const liveEvent = (liveData?.data || []).find(ev => {
                        const t = (ev.title || '').toLowerCase();
                        return t.includes(nameKey) || matchName.toLowerCase().includes(t);
                    });
                    if (liveEvent?.embeds?.length > 0) embeds = liveEvent.embeds;
                    if (!embeds.length && liveEvent?.id) {
                        const detailRes = await fetch(API_CONFIG.streaming.sportDetail(liveEvent.id));
                        const detailData = await detailRes.json();
                        if (detailData?.data?.embeds?.length > 0) embeds = detailData.data.embeds;
                    }
                } catch (err) { /* ignora */ }
            }

            if (!embeds.length) {
                try {
                    const channelsRes = await fetch(API_CONFIG.streaming.channels('Esportes'));
                    const channelsData = await channelsRes.json();
                    (channelsData?.data || []).forEach(ch => {
                        if (ch.embeds?.length > 0) embeds.push(...ch.embeds);
                    });
                    embeds = embeds.slice(0, 6);
                } catch (err) { /* ignora */ }
            }

            if (!embeds.length) {
                container.innerHTML = `<div class="md-empty">Nenhuma transmissão disponível no momento.</div>`;
                return;
            }

            this.renderBroadcastForMatch(embeds);
        } catch (e) {
            console.error('[Broadcast] Erro:', e);
            container.innerHTML = '<div class="md-empty">Erro ao buscar transmissões.</div>';
        }
    },

    renderBroadcastForMatch(embeds) {
        const container = document.getElementById('match-tab-broadcast');
        if (!container) return;

        const firstUrl = this._safeEmbedUrl(embeds[0]?.embed_url || '');

        container.innerHTML = `
            <div class="md-broadcast-player">
                <iframe id="broadcast-player" src="${firstUrl}" allowfullscreen
                        allow="autoplay; encrypted-media; picture-in-picture"></iframe>
            </div>
            <div class="md-broadcast-title">Fontes de transmissão</div>
            <div class="md-broadcast-list" id="broadcast-channel-list"></div>
        `;

        const list = document.getElementById('broadcast-channel-list');
        const player = document.getElementById('broadcast-player');

        embeds.forEach((embed, index) => {
            const btn = document.createElement('button');
            btn.className = 'md-broadcast-item' + (index === 0 ? ' active' : '');
            btn.innerHTML = `
                <div class="md-broadcast-icon"><i data-lucide="tv-2"></i></div>
                <div class="md-broadcast-info">
                    <div class="md-broadcast-name">${this._esc(embed.provider || ('Opção ' + (index + 1)))}</div>
                    <div class="md-broadcast-quality">${this._esc(embed.quality || 'HD')}</div>
                </div>`;
            btn.onclick = () => {
                if (player) player.src = this._safeEmbedUrl(embed.embed_url || '');
                list.querySelectorAll('.md-broadcast-item').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            };
            list.appendChild(btn);
        });

        if (window.lucide) window.lucide.createIcons();
    },

    _safeEmbedUrl(url) {
        if (!url) return 'about:blank';
        return String(url);
    },

    /* ================================================================
       LINEUPS
       ================================================================ */
    renderEspnLineups(matchData) {
        const homeContainer = document.getElementById('home-lineup');
        const awayContainer = document.getElementById('away-lineup');
        if (!homeContainer || !awayContainer) return;
        const lineups = matchData.rosters || matchData.lineups;
        if (!lineups || lineups.length < 2) {
            homeContainer.innerHTML = awayContainer.innerHTML = `<div class="md-empty">Escalação não disponível.</div>`;
            return;
        }

        const competitors = matchData.header?.competitions?.[0]?.competitors || [];
        const h = competitors.find(c => c.homeAway === 'home');
        const a = competitors.find(c => c.homeAway === 'away');
        if (!h || !a) return;

        const hL = lineups.find(l => String(l.team.id) === String(h.team.id));
        const aL = lineups.find(l => String(l.team.id) === String(a.team.id));
        const coaches = matchData.coaches || [];
        const hC = coaches.find(c => String(c.team.id) === String(h.team.id));
        const aC = coaches.find(c => String(c.team.id) === String(a.team.id));

        if (hL) {
            homeContainer.innerHTML = this.generateTacticalBoardHTML(hL, h, hC, 'home');
            setTimeout(() => this.setTacticalFormation('home', (hL.formation && this.formations[hL.formation]) ? hL.formation : 'default'), 0);
        }
        if (aL) {
            awayContainer.innerHTML = this.generateTacticalBoardHTML(aL, a, aC, 'away');
            setTimeout(() => this.setTacticalFormation('away', (aL.formation && this.formations[aL.formation]) ? aL.formation : 'default'), 0);
        }
    },

    generateTacticalBoardHTML(lineupData, espnTeamData, coachData, teamType) {
        const players = lineupData?.roster || lineupData?.athletes || [];
        const formation = lineupData.formation;
        const starters = players.filter(p => p.starter);
        const subs = players.filter(p => !p.starter);
        const teamColor = espnTeamData.team.color || '004d2d';

        let html = `<div class="flex items-center gap-3 mb-4"><img src="${espnTeamData.team.logos?.[0]?.href || ''}" class="w-8 h-8 object-contain"><div><div class="font-bold text-base md:text-lg text-[var(--text-primary)]">${espnTeamData.team.displayName}</div>${formation ? `<div class="text-sm font-medium text-[var(--accent)]">${formation}</div>` : ''}</div></div>`;

        html += `<div class="stadium-container" style="background-color: #${teamColor};">
                    <div class="pitch" id="pitch-${teamType}">
                        <div class="pitch-gradient"></div>
                        <div class="marking m-center-line"></div>
                        <div class="marking center-circle"></div>
                        <div class="marking m-penalty-box"></div>
                        <div class="marking m-goal-box"></div>
                        <div class="marking m-penalty-spot"></div>`;

        const getTextColor = (hex) => {
            if (!hex || hex.length < 6) return '#fff';
            const r = parseInt(hex.substr(0, 2), 16), g = parseInt(hex.substr(2, 2), 16), b = parseInt(hex.substr(4, 2), 16);
            return ((r * 299) + (g * 587) + (b * 114)) / 1000 >= 128 ? '#000' : '#fff';
        };

        const kitColor = espnTeamData.team.color || '333333';

        html += starters.map((p, index) => {
            const isGk = p.athlete.position?.abbreviation === 'GK';
            const color = isGk ? '333333' : kitColor;
            const textColor = getTextColor(color);
            return `<div class="player" id="p-${teamType}-${index}" title="${p.athlete.displayName}">
                        <div class="kit" style="background-color: #${color}; color: ${textColor};">
                            <div class="kit-number">${p.athlete.jersey || '-'}</div>
                            <div class="kit-name">${p.athlete.shortName || p.athlete.displayName.split(' ').pop()}</div>
                        </div>
                    </div>`;
        }).join('') + `</div></div>`;

        if (subs.length) {
            html += '<h4 class="text-xs font-bold text-gray-500 uppercase mt-6 md:mt-8 mb-3 tracking-widest">Reservas</h4><div class="space-y-3">';
            subs.forEach(p => {
                html += `<div class="flex items-center text-sm opacity-80"><span class="font-mono font-bold w-8 text-gray-500">${p.athlete.jersey || '-'}</span><span class="text-[var(--text-primary)]">${p.athlete.displayName}</span><span class="ml-auto text-xs text-gray-500">${p.athlete.position?.abbreviation || ''}</span></div>`;
            });
            html += '</div>';
        }
        if (coachData) html += `<h4 class="text-xs font-bold text-gray-500 uppercase mt-6 mb-3 tracking-widest">Técnico</h4><div class="text-sm text-[var(--text-primary)]">${coachData.displayName || coachData.fullName}</div>`;
        return html;
    },

    setTacticalFormation(teamType, formationName) {
        const coords = this.formations[formationName] || this.formations['default'];
        const players = document.querySelectorAll(`#pitch-${teamType} .player`);
        players.forEach((el, index) => {
            if (coords[index]) {
                el.style.top = coords[index].t + '%';
                el.style.left = coords[index].l + '%';
            }
        });
    },

    /* ================================================================
       MEDIA SESSION + TIMERS
       ================================================================ */
    updateMediaSession() {
        if (!('mediaSession' in navigator) || !this.state.currentMatchData) {
            if ('mediaSession' in navigator) navigator.mediaSession.metadata = null;
            return;
        }
        const d = this.state.currentMatchData;
        if (!d.header?.competitions?.[0]?.competitors) return;
        const competitors = d.header.competitions[0].competitors;
        const h = competitors.find(x => x.homeAway === 'home');
        const a = competitors.find(x => x.homeAway === 'away');
        if (!h || !a) return;

        const lConfig = SPORTS_DB.soccer.leagues[this.state.currentLeague];
        const status = d.header.status || d.header.competitions?.[0]?.status;
        const displayClock = d.header.status?.displayClock || d.header.competitions?.[0]?.status?.displayClock;

        const score = `${h.score || '0'} - ${a.score || '0'}`;
        const time = status?.type?.state === 'in' ? (displayClock || "00:00").replace("'", "") : (status?.type?.shortDetail || 'FIM');

        try {
            navigator.mediaSession.metadata = new MediaMetadata({
                title: `${h.team.abbreviation} ${score} ${a.team.abbreviation}`,
                artist: time,
                album: lConfig.name,
                artwork: [
                    { src: h.team.logos?.[0]?.href || '', sizes: '256x256' },
                    { src: a.team.logos?.[0]?.href || '', sizes: '256x256' },
                    { src: lConfig.logo, sizes: '512x512', type: 'image/png' }
                ]
            });
        } catch (e) { /* ignora */ }
    },

    startLiveCardTimer(eventId, competitionStatus) {
        const timeEl = document.getElementById(`timer-pill-${eventId}`);
        if (!timeEl || timeEl.dataset.timerActive) return null;
        timeEl.dataset.timerActive = 'true';
        const initialClock = competitionStatus.displayClock || "0'";
        const period = competitionStatus.period || 1;
        const fetchTimestamp = Date.now();
        let baseMinutes = 0, addedMinutes = 0;
        if (initialClock.includes('+')) {
            const parts = initialClock.replace("'", "").split('+');
            baseMinutes = parseInt(parts[0]) || 0;
            addedMinutes = parseInt(parts[1]) || 0;
        } else {
            baseMinutes = parseInt(initialClock.replace("'", '')) || 0;
        }
        const initialTotalSeconds = (baseMinutes * 60) + (addedMinutes * 60);

        return setInterval(() => {
            const elapsedSeconds = Math.floor((Date.now() - fetchTimestamp) / 1000);
            const currentTotalSeconds = initialTotalSeconds + elapsedSeconds;
            let timeString;
            const regularTimeEnd = period === 1 ? 45 : 90;
            const regularTimeEndSeconds = regularTimeEnd * 60;
            if (currentTotalSeconds < regularTimeEndSeconds) {
                timeString = `${String(Math.floor(currentTotalSeconds / 60)).padStart(2, '0')}:${String(currentTotalSeconds % 60).padStart(2, '0')} +00:00`;
            } else {
                const stoppageSeconds = currentTotalSeconds - regularTimeEndSeconds;
                timeString = `${String(regularTimeEnd).padStart(2, '0')}:00 +${String(Math.floor(stoppageSeconds / 60)).padStart(2, '0')}:${String(stoppageSeconds % 60).padStart(2, '0')}`;
            }
            timeEl.innerHTML = `<span>${timeString}</span>`;
        }, 1000);
    },

    startLiveMatchTimer(competitionStatus, details) {
        const timeEl = document.getElementById('modal-time'); if (!timeEl) return;
        const initialClock = competitionStatus.displayClock || "0'";
        const period = competitionStatus.period || 1;
        const fetchTimestamp = Date.now();
        let baseMinutes = 0, addedMinutes = 0;
        if (initialClock.includes('+')) {
            const parts = initialClock.replace("'", "").split('+');
            baseMinutes = parseInt(parts[0]) || 0;
            addedMinutes = parseInt(parts[1]) || 0;
        } else {
            baseMinutes = parseInt(initialClock.replace("'", "")) || 0;
        }
        let initialTotalSeconds = (baseMinutes * 60) + (addedMinutes * 60);
        let stoppageTime = 0;
        const stoppageEvent = details?.find(e => e.period === period && e.type === 'stoppagetime');
        if (stoppageEvent && stoppageEvent.clock?.displayValue) {
            stoppageTime = parseInt(stoppageEvent.clock.displayValue.replace(/[+']/g, '')) || 0;
        }

        this.state.matchTimerInterval = setInterval(() => {
            const currentTotalSeconds = initialTotalSeconds + Math.floor((Date.now() - fetchTimestamp) / 1000);
            const regularTimeEnd = period === 1 ? 45 : 90;
            const regularTimeEndSeconds = regularTimeEnd * 60;
            let timeString;
            if (currentTotalSeconds < regularTimeEndSeconds) {
                timeString = `${String(Math.floor(currentTotalSeconds / 60)).padStart(2, '0')}:${String(currentTotalSeconds % 60).padStart(2, '0')} +00:00`;
            } else {
                const stoppageSeconds = currentTotalSeconds - regularTimeEndSeconds;
                const stoppageMinutes = Math.floor(stoppageSeconds / 60);
                const stoppageRemainingSeconds = stoppageSeconds % 60;
                if (stoppageTime > 0 && stoppageMinutes >= stoppageTime) {
                    timeString = `${String(regularTimeEnd).padStart(2, '0')}:00 +${String(stoppageTime).padStart(2, '0')}:00`;
                } else {
                    timeString = `${String(regularTimeEnd).padStart(2, '0')}:00 +${String(stoppageMinutes).padStart(2, '0')}:${String(stoppageRemainingSeconds).padStart(2, '0')}`;
                }
            }
            timeEl.innerText = timeString;
        }, 1000);
    },

    /* ================================================================
       ANIMAÇÕES POR LIGA
       ================================================================ */
    triggerStartOfGameAnimation(eventId) {
        const elSogOverlay = document.getElementById(`sog-overlay-${eventId}`);
        if (!elSogOverlay) return;
        elSogOverlay.classList.remove('active');
        setTimeout(() => elSogOverlay.classList.add('active'), 50);
        setTimeout(() => { elSogOverlay.classList.remove('active'); }, 4000);
    },

    triggerLibertadoresEvent(eventId, type, team, text) {
        const eventBar = document.getElementById(`eventBar-${eventId}`);
        const eventContent = document.getElementById(`eventContent-${eventId}`);
        if (!eventBar || !eventContent) return;

        if (this.state.libertadoresTimeouts[eventId]) clearTimeout(this.state.libertadoresTimeouts[eventId]);

        eventBar.classList.remove('show');
        setTimeout(() => {
            let htmlContent = '';
            switch (type) {
                case 'yellow': htmlContent = `<div class="lib-card-icon lib-card-yellow"></div> <div class="lib-event-text">${team} - ${text}</div>`; break;
                case 'red': htmlContent = `<div class="lib-card-icon lib-card-red"></div> <div class="lib-event-text">${team} - ${text}</div>`; break;
                case 'var': htmlContent = `<div class="lib-var-icon">VAR</div> <div class="lib-event-text">${text}</div>`; break;
                case 'sub': htmlContent = `<div class="lib-sub-icon"><span class="lib-sub-in">▲</span><span class="lib-sub-out">▼</span></div> <div class="lib-event-text">${team} - ${text}</div>`; break;
                case 'goal': htmlContent = `<div class="lib-goal-icon">⚽</div> <div class="lib-event-text">GOL ${team}</div>`; break;
            }
            eventContent.innerHTML = htmlContent;
            eventBar.classList.add('show');
            this.state.libertadoresTimeouts[eventId] = setTimeout(() => { eventBar.classList.remove('show'); }, 5000);
        }, 50);
    },

    triggerLibertadoresGoalPop(eventId) {
        const scoreBox = document.getElementById(`score-box-${eventId}`);
        if (scoreBox) {
            scoreBox.classList.add('pop');
            setTimeout(() => scoreBox.classList.remove('pop'), 500);
        }
    },

    playSerieAIntro(eventId, index) {
        const get = (id) => document.getElementById(id);
        const delay = index * 200;
        const widget = get(`widgetContainer-${eventId}`);
        if (!widget) return;
        widget.classList.add('sa-intro-mode');
        const container = widget.querySelector('.sa-scoreboard-container');
        if (!container) return;

        const leftElements = container.querySelectorAll('.sa-home-3d, .sa-home-front, .sa-accent-l-3d, .sa-accent-l-front, .sa-score-l-3d, .sa-score-l-front');
        const rightElements = container.querySelectorAll('.sa-away-3d, .sa-away-front, .sa-accent-r-3d, .sa-accent-r-front, .sa-score-r-3d, .sa-score-r-front');
        const timerPanel = container.querySelector('.sa-timer-panel');
        const shield = container.querySelector('.sa-shield-container');

        leftElements.forEach(el => el.classList.remove('sa-anim-left'));
        rightElements.forEach(el => el.classList.remove('sa-anim-right'));
        if (timerPanel) timerPanel.classList.remove('sa-anim-timer');
        if (shield) shield.classList.remove('sa-anim-shield');
        void widget.offsetWidth;

        setTimeout(() => {
            leftElements.forEach(el => el.classList.add('sa-anim-left'));
            rightElements.forEach(el => el.classList.add('sa-anim-right'));
            setTimeout(() => {
                if (shield) shield.classList.add('sa-anim-shield');
                if (timerPanel) timerPanel.classList.add('sa-anim-timer');
            }, 300);
            setTimeout(() => { widget.classList.remove('sa-intro-mode'); }, 1500);
        }, delay);
    },

    triggerSerieAGoalAnimation(eventId, teamSide) {
        const panel = document.getElementById(`${teamSide}Box-${eventId}`);
        const scoreEl = document.getElementById(`score-${teamSide}-${eventId}`);
        if (!panel || !scoreEl) return;
        panel.classList.add('sa-is-goal');
        setTimeout(() => {
            panel.classList.remove('sa-is-goal');
            setTimeout(() => {
                const animClass = teamSide === 'home' ? 'sa-score-pop-l' : 'sa-score-pop-r';
                scoreEl.classList.add(animClass);
                setTimeout(() => scoreEl.classList.remove(animClass), 600);
            }, 150);
        }, 3000);
    },

    triggerSerieACardAnimation(eventId, teamSide, cardType) {
        const boxEl = document.getElementById(`${teamSide}Box-${eventId}`);
        if (!boxEl) return;
        const className = cardType === 'redcard' ? 'sa-red-active' : 'sa-yellow-active';
        boxEl.classList.add(className);
        setTimeout(() => boxEl.classList.remove(className), 3000);
    },

    playCbfIntro(eventId, index) {
        const wrapper = document.getElementById(`scoreboardWrapper-${eventId}`);
        if (!wrapper) return;
        wrapper.classList.remove('cbf-is-visible');
        void wrapper.offsetWidth;
        setTimeout(() => { wrapper.classList.add('cbf-is-visible'); }, index * 200 + 100);
    },

    triggerCbfGoalAnimation(eventId, teamSide) {
        const scoreEl = document.getElementById(`score-${teamSide}-${eventId}`);
        if (scoreEl) { scoreEl.classList.add('pop'); setTimeout(() => scoreEl.classList.remove('pop'), 300); }

        const banner = document.getElementById(`goalBanner-${eventId}`);
        const logo = document.getElementById(`goalLogo-${eventId}`);
        const teamBox = document.getElementById(`${teamSide}Box-${eventId}`);

        if (banner && logo && teamBox) {
            const teamColor = teamBox.getAttribute('data-color') || '#0b071a';
            const teamLogo = teamBox.getAttribute('data-logo') || '';
            banner.style.backgroundColor = teamColor;
            logo.src = teamLogo;
            banner.classList.remove('hide', 'show');
            void banner.offsetWidth;
            banner.classList.add('show');
            setTimeout(() => {
                if (banner.classList.contains('show')) {
                    banner.classList.remove('show');
                    banner.classList.add('hide');
                }
            }, 5000);
        }
    },

    triggerCbfCardAnimation(eventId, teamSide, cardType) {
        const boxEl = document.getElementById(`${teamSide}Box-${eventId}`);
        if (!boxEl) return;
        const className = cardType === 'redcard' ? 'red-active' : 'yellow-active';
        boxEl.classList.add(className);
        setTimeout(() => boxEl.classList.remove(className), 3000);
    },

    playBrasileiraoIntro(eventId, index) {
        const get = (id) => document.getElementById(id);
        const delay = index * 200;
        const widget = get(`widgetContainer-${eventId}`);
        const matchCenter = get(`matchCenter-${eventId}`);
        const homeBox = get(`homeBox-${eventId}`);
        const awayBox = get(`awayBox-${eventId}`);
        const homeText = get(`homeText-${eventId}`);
        const awayText = get(`awayText-${eventId}`);
        const homeStrip = get(`homeStrip-${eventId}`);
        const awayStrip = get(`awayStrip-${eventId}`);
        const matchTimer = get(`timer-pill-${eventId}`);

        const elements = [widget, matchCenter, homeBox, awayBox, homeText, awayText, homeStrip, awayStrip, matchTimer];
        if (elements.some(el => !el)) return;

        const animationClasses = ['br-intro-mode', 'br-anim-center', 'br-anim-home', 'br-anim-away', 'br-anim-text', 'br-anim-strip', 'br-anim-timer'];
        elements.forEach(el => el.classList.remove(...animationClasses));
        void widget.offsetWidth;

        setTimeout(() => {
            widget.classList.add('br-intro-mode');
            void widget.offsetWidth;
            setTimeout(() => matchCenter.classList.add('br-anim-center'), 100);
            setTimeout(() => { homeBox.classList.add('br-anim-home'); awayBox.classList.add('br-anim-away'); }, 500);
            setTimeout(() => {
                homeText.classList.add('br-anim-text');
                awayText.classList.add('br-anim-text');
                homeStrip.classList.add('br-anim-strip');
                awayStrip.classList.add('br-anim-strip');
            }, 900);
            setTimeout(() => matchTimer.classList.add('br-anim-timer'), 1200);
            setTimeout(() => widget.classList.remove('br-intro-mode'), 2600);
        }, delay);
    },

    playBundesligaIntro(eventId, index) {
        const delay = index * 200;
        const widget = document.getElementById(`widgetContainer-${eventId}`);
        if (!widget) return;
        const timeBlock = widget.querySelector('.bu-time-block');
        const teamBlocks = widget.querySelectorAll('.bu-team-block');
        const underlines = widget.querySelectorAll('.bu-underline');

        widget.classList.add('bu-intro-mode');
        [timeBlock, ...teamBlocks, ...underlines].forEach(el => {
            if (!el) return;
            el.classList.remove('bu-anim-time', 'bu-anim-team', 'bu-anim-underline');
        });
        void widget.offsetWidth;

        setTimeout(() => {
            if (timeBlock) timeBlock.classList.add('bu-anim-time');
            teamBlocks.forEach((el, i) => setTimeout(() => el.classList.add('bu-anim-team'), 150 + i * 120));
            setTimeout(() => {
                underlines.forEach(el => el.classList.add('bu-anim-underline'));
                widget.classList.remove('bu-intro-mode');
            }, 700);
        }, delay);
    },

    playGloboIntro(eventId, index) {
        const delay = index * 200;
        const widget = document.getElementById(`widgetContainer-${eventId}`);
        if (!widget) return;
        const timer = widget.querySelector('.rg-timer');
        const homeBlock = widget.querySelector('.rg-team-block.rg-home');
        const awayBlock = widget.querySelector('.rg-team-block.rg-away');
        const strip = widget.querySelector('.rg-bottom-strip');

        widget.classList.add('rg-intro-mode');
        [timer, homeBlock, awayBlock, strip].forEach(el => {
            if (!el) return;
            el.classList.remove('rg-anim-timer', 'rg-anim-home', 'rg-anim-away', 'rg-anim-strip');
        });
        void widget.offsetWidth;

        setTimeout(() => {
            if (timer) timer.classList.add('rg-anim-timer');
            if (homeBlock) homeBlock.classList.add('rg-anim-home');
            if (awayBlock) awayBlock.classList.add('rg-anim-away');
            if (strip) strip.classList.add('rg-anim-strip');
            setTimeout(() => widget.classList.remove('rg-intro-mode'), 1200);
        }, delay);
    },

    triggerBrasileiraoGoalAnimation(eventId, teamSide) {
        const scoreEl = document.getElementById(`score-${teamSide}-${eventId}`);
        const overlayEl = document.getElementById(`${teamSide}GoalOverlay-${eventId}`);
        if (!scoreEl || !overlayEl) return;
        scoreEl.classList.add('pop');
        setTimeout(() => scoreEl.classList.remove('pop'), 300);
        overlayEl.classList.add('active');
        setTimeout(() => { overlayEl.classList.remove('active'); }, 3500);
    },

    triggerBrasileiraoCardAnimation(eventId, teamSide, cardType) {
        const boxEl = document.getElementById(`${teamSide}Box-${eventId}`);
        if (!boxEl) return;
        const className = cardType === 'redcard' ? 'red-active' : 'yellow-active';
        boxEl.classList.add(className);
        setTimeout(() => boxEl.classList.remove(className), 3000);
    },

    triggerBundesligaGoalAnimation(eventId, teamSide) {
        const scoreEl = document.getElementById(`score-${teamSide}-${eventId}`);
        const boxEl = document.getElementById(`${teamSide}Box-${eventId}`);
        if (!boxEl) return;
        boxEl.classList.add('bu-is-goal');
        if (scoreEl) { scoreEl.classList.add('pop'); setTimeout(() => scoreEl.classList.remove('pop'), 400); }
        setTimeout(() => boxEl.classList.remove('bu-is-goal'), 3500);
    },

    triggerGloboGoalAnimation(eventId, teamSide) {
        const scoreEl = document.getElementById(`score-${teamSide}-${eventId}`);
        const boxEl = document.getElementById(`${teamSide}Box-${eventId}`);
        if (!boxEl) return;
        boxEl.classList.add('rg-is-goal');
        if (scoreEl) { scoreEl.classList.add('pop'); setTimeout(() => scoreEl.classList.remove('pop'), 400); }
        setTimeout(() => boxEl.classList.remove('rg-is-goal'), 3500);
    },

    triggerBundesligaCardAnimation(eventId, teamSide, cardType) {
        const boxEl = document.getElementById(`${teamSide}Box-${eventId}`);
        if (!boxEl) return;
        const className = cardType === 'redcard' ? 'bu-red-active' : 'bu-yellow-active';
        boxEl.classList.add(className);
        setTimeout(() => boxEl.classList.remove(className), 3000);
    },

    triggerGloboCardAnimation(eventId, teamSide, cardType) {
        const boxEl = document.getElementById(`${teamSide}Box-${eventId}`);
        if (!boxEl) return;
        const className = cardType === 'redcard' ? 'rg-red-active' : 'rg-yellow-active';
        boxEl.classList.add(className);
        setTimeout(() => boxEl.classList.remove(className), 3000);
    },

    triggerSubstitutionAnimation(eventId, subEvent, team) {
        const el = document.getElementById(`sub-overlay-${eventId}`); if (!el) return;
        const pOut = subEvent.athletesInvolved?.find(a => a.type === 'athleteout');
        const pIn = subEvent.athletesInvolved?.find(a => a.type === 'athletein');
        if (!pIn || !pOut) return;
        el.className = "unified-full-overlay bg-sub-overlay";
        const logoEl = document.getElementById(`sub-overlay-logo-${eventId}`); if (logoEl) logoEl.src = team.team.logos?.[0]?.href || '';
        const outNameEl = document.getElementById(`sub-player-out-name-${eventId}`); if (outNameEl) outNameEl.innerText = pOut.displayName.toUpperCase();
        const inNameEl = document.getElementById(`sub-player-in-name-${eventId}`); if (inNameEl) inNameEl.innerText = pIn.displayName.toUpperCase();
        el.classList.remove('active');
        setTimeout(() => el.classList.add('active'), 50);
        setTimeout(() => el.classList.remove('active'), 4500);
    },

    triggerVARAnimation(eventId, varEvent) {
        const el = document.getElementById(`var-overlay-${eventId}`); if (!el) return;
        el.className = "unified-full-overlay bg-[var(--bg-secondary)]";
        const title = document.getElementById(`var-title-${eventId}`);
        const sub = document.getElementById(`var-subtitle-${eventId}`);
        if (title) title.innerText = "CHECANDO LANCE";
        if (sub) sub.innerText = varEvent.text || "ÁRBITRO DE VÍDEO";
        el.classList.remove('active');
        setTimeout(() => el.classList.add('active'), 50);
        setTimeout(() => {
            let decision = "LANCE CHECADO";
            const txt = (varEvent.text || "").toLowerCase();
            if (txt.includes('confirmado') || txt.includes('awarded')) decision = "GOL CONFIRMADO";
            else if (txt.includes('anulado') || txt.includes('disallowed')) decision = "GOL ANULADO";
            else if (txt.includes('pênalti')) decision = "PÊNALTI";
            else if (txt.includes('vermelho')) decision = "CARTÃO VERMELHO";
            if (title) title.innerText = decision;
            if (sub) sub.innerText = "REVISÃO CONCLUÍDA";
            setTimeout(() => el.classList.remove('active'), 3000);
        }, 5000);
    },

    triggerEndOfGameAnimation(eventId) {
        const el = document.getElementById(`eog-overlay-${eventId}`); if (!el) return;
        el.classList.remove('active');
        setTimeout(() => el.classList.add('active'), 50);
        setTimeout(() => el.classList.remove('active'), 5000);
    },

    /* ================================================================
       MODAL CONTROL
       ================================================================ */
    closeModal() {
        document.getElementById('match-modal')?.classList.remove('open');
        if (this.state.matchTimerInterval) {
            clearInterval(this.state.matchTimerInterval);
            this.state.matchTimerInterval = null;
        }
        if (this.state.liveModalUpdateInterval) {
            clearInterval(this.state.liveModalUpdateInterval);
            this.state.liveModalUpdateInterval = null;
        }
        this.closePip();
        const audio = document.getElementById('silent-audio');
        if (audio) audio.pause();
        if ('mediaSession' in navigator) navigator.mediaSession.metadata = null;
    },

    /* ================================================================
       PICTURE-IN-PICTURE DO PLACAR
       ================================================================ */
    togglePip() {
        if (this.state.pipWindow) this.closePip();
        else this.openPip();
    },

    async openPip() {
        if (!('documentPictureInPicture' in window)) {
            alert(
                'Seu navegador não suporta o modo Picture-in-Picture para este conteúdo.\n\n' +
                'Use Chrome, Edge ou Opera (versão 116+) para aproveitar este recurso.'
            );
            return;
        }
        if (!this.state.currentMatchData) {
            alert('Abra uma partida primeiro para usar o Picture-in-Picture do placar.');
            return;
        }
        if (this.state.pipWindow) return;

        const pipButton = document.getElementById('pip-button');
        if (pipButton) pipButton.classList.add('pip-active');

        try {
            const pipWindow = await documentPictureInPicture.requestWindow({
                width: 520,
                height: 200,
                disallowReturnToOpener: false,
                preferInitialWindowPlacement: false
            });
            this.state.pipWindow = pipWindow;

            this._copyStylesToPip(pipWindow);

            const tailwind = pipWindow.document.createElement('script');
            tailwind.src = "https://cdn.tailwindcss.com";
            pipWindow.document.head.appendChild(tailwind);

            pipWindow.document.title = 'W3Labs Sports — Placar';
            pipWindow.document.documentElement.setAttribute('lang', 'pt-BR');

            pipWindow.document.body.style.cssText = `
                margin: 0;
                padding: 12px;
                background-color: var(--bg-primary);
                color: var(--text-primary);
                font-family: var(--font-family-primary);
                display: flex;
                align-items: center;
                justify-content: center;
                min-height: 100vh;
                overflow: hidden;
            `;
            if (this.state.theme === 'light') pipWindow.document.body.classList.add('light-mode');

            pipWindow.document.body.innerHTML = `<div id="pip-content-wrapper" style="width:100%;display:flex;align-items:center;justify-content:center;"></div>`;

            this.updatePipContent();
            this._startPipLiveUpdates();

            pipWindow.addEventListener('pagehide', () => {
                this._cleanupPip();
            });

        } catch (e) {
            console.error('[PiP] Erro ao abrir:', e);
            if (pipButton) pipButton.classList.remove('pip-active');
            this.state.pipWindow = null;
            alert('Não foi possível abrir o Picture-in-Picture. Tente novamente.');
        }
    },

    _copyStylesToPip(pipWindow) {
        [...document.styleSheets].forEach((styleSheet) => {
            try {
                const cssRules = [...styleSheet.cssRules].map((rule) => rule.cssText).join('');
                const style = pipWindow.document.createElement('style');
                style.textContent = cssRules;
                pipWindow.document.head.appendChild(style);
            } catch (e) {
                if (styleSheet.href) {
                    const link = pipWindow.document.createElement('link');
                    link.rel = 'stylesheet';
                    link.type = styleSheet.type || 'text/css';
                    link.media = styleSheet.media ? styleSheet.media.mediaText : 'all';
                    link.href = styleSheet.href;
                    pipWindow.document.head.appendChild(link);
                }
            }
        });
    },

    _startPipLiveUpdates() {
        if (this.state.pipUpdateInterval) {
            clearInterval(this.state.pipUpdateInterval);
            this.state.pipUpdateInterval = null;
        }
        this.state.pipUpdateInterval = setInterval(() => {
            if (!this.state.pipWindow) {
                this._stopPipLiveUpdates();
                return;
            }
            try {
                this.updatePipContent();
            } catch (e) {
                console.warn('[PiP] Erro no update periódico:', e);
            }
        }, 15000);
    },

    _stopPipLiveUpdates() {
        if (this.state.pipUpdateInterval) {
            clearInterval(this.state.pipUpdateInterval);
            this.state.pipUpdateInterval = null;
        }
    },

    _cleanupPip() {
        this._stopPipLiveUpdates();
        this.state.pipWindow = null;
        const pipButton = document.getElementById('pip-button');
        if (pipButton) pipButton.classList.remove('pip-active');
    },

    closePip() {
        if (this.state.pipWindow) {
            try { this.state.pipWindow.close(); } catch (e) { /* ignora */ }
            this._cleanupPip();
        }
    },

    updatePipContent() {
        if (!this.state.pipWindow || !this.state.currentMatchData) return;
        const pipBody = this.state.pipWindow.document.body;
        const wrapper = pipBody.querySelector('#pip-content-wrapper');
        if (!wrapper) return;
        const d = this.state.currentMatchData;
        const lConfig = SPORTS_DB.soccer.leagues[this.state.currentLeague];
        if (!lConfig) return;

        if (this.state.theme === 'light') pipBody.classList.add('light-mode');
        else pipBody.classList.remove('light-mode');

        const comp = d.header?.competitions?.[0];
        const status = d.header?.status || comp?.status;
        const isLive = status?.type?.state === 'in';

        wrapper.innerHTML = `
            <div style="width:100%;display:flex;flex-direction:column;align-items:center;gap:8px;">
                ${this._getScoreboardHTML(d.header, lConfig, { isPip: true })}
                ${isLive ? `<div style="font-size:11px;font-weight:800;letter-spacing:.1em;text-transform:uppercase;color:var(--accent);">● AO VIVO</div>` : ''}
            </div>
        `;

        if (isLive && comp?.status) {
            const evId = 'pip';
            const fakeEventId = `pip-timer-${d.header.id || 'live'}`;
            const timeEl = wrapper.querySelector('#timer-pill-' + (d.header.competitions?.[0]?.id || ''));
        }

        if (window.lucide && this.state.pipWindow) {
            try {
                const lucideScript = this.state.pipWindow.document.createElement('script');
                lucideScript.src = 'https://unpkg.com/lucide@latest';
                lucideScript.onload = () => {
                    if (this.state.pipWindow && this.state.pipWindow.lucide) {
                        this.state.pipWindow.lucide.createIcons();
                    }
                };
                this.state.pipWindow.document.head.appendChild(lucideScript);
            } catch (e) { /* ignora */ }
        }
    },

    /* ================================================================
       NAVEGAÇÃO / UI
       ================================================================ */
    toggleMobileLeague() {
        const m = document.getElementById('mob-league-menu');
        if (m) { m.classList.toggle('hidden'); m.classList.toggle('flex'); }
    },

    toggleSidebar() {
        const sidebar = document.getElementById('app-sidebar');
        if (!sidebar) return;
        if (window.getComputedStyle(sidebar).display === 'none') {
            sidebar.style.setProperty('display', 'flex', 'important');
            if (window.innerWidth < 1024) sidebar.classList.add('absolute', 'h-full', 'shadow-2xl');
        } else {
            sidebar.style.setProperty('display', 'none', 'important');
            sidebar.classList.remove('absolute', 'h-full', 'shadow-2xl');
        }
    },

    updateActiveNav(viewId) {
        document.querySelectorAll('.nav-btn, .bottom-nav-item').forEach(b => b.classList.remove('active'));
        const deskBtn = document.getElementById(`desk-nav-${viewId}`); if (deskBtn) deskBtn.classList.add('active');
        const mobBtn = document.getElementById(`mob-nav-${viewId}`); if (mobBtn) mobBtn.classList.add('active');
    },

    setView(v) {
        this.state.view = v;
        this.closeWiki();
        document.querySelectorAll('.view-section').forEach(e => e.classList.add('hidden'));
        const viewEl = document.getElementById(`view-${v}`); if (viewEl) viewEl.classList.remove('hidden');
        const mainScroll = document.getElementById('main-scroll'); if (mainScroll) mainScroll.scrollTop = 0;
        this.updateActiveNav(v);
        this.loadDataForView();
    }
};

/* ============================================================
 * PARTE 3 — BOOTSTRAP / EXPORTAÇÕES
 * ============================================================ */

/* ------------------------------------------------------------
 * 3.1 Bootstrap do app no navegador
 * ------------------------------------------------------------ */
if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
        if (window.lucide) window.lucide.createIcons();
        app.init();
    });
}

/* ------------------------------------------------------------
 * 3.2 Execução automática do demo do API Hub (apenas Node.js,
 *     e somente se o arquivo for executado diretamente)
 * ------------------------------------------------------------ */
if (typeof module !== "undefined" && typeof require !== "undefined" && require.main === module) {
    demoAPIHub().then(() => console.log("\n✅ Demo API Hub finalizada."));
}

/* ------------------------------------------------------------
 * 3.3 Exportação CommonJS
 * ------------------------------------------------------------ */
if (typeof module !== "undefined" && module.exports) {
    module.exports = {
        // API Hub
        BaseClient,
        WikipediaClient,
        ESPNClient,
        ReiDosCanaisClient,
        APIHub,
        demoAPIHub,
        // W3Labs Sports
        SPORTS_DB,
        API_CONFIG,
        ESPN_PROXIES,
        espnFetch,
        app,
    };
}

/* ------------------------------------------------------------
 * 3.4 Exportação para o Browser (window.*)
 * ------------------------------------------------------------ */
if (typeof window !== "undefined") {
    // API Hub
    window.APIHub = APIHub;
    window.BaseClient = BaseClient;
    window.WikipediaClient = WikipediaClient;
    window.ESPNClient = ESPNClient;
    window.ReiDosCanaisClient = ReiDosCanaisClient;

    // W3Labs Sports
    window.SPORTS_DB = SPORTS_DB;
    window.API_CONFIG = API_CONFIG;
    window.espnFetch = espnFetch;
    window.app = app; // já é referenciado por onclick inline: app.setView(...)
}