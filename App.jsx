import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Home, Trophy, Shield, Zap, CalendarDays, Target,
  Menu, X, ExternalLink, Sun, Moon, ArrowLeft, Tv2, Clock
} from 'lucide-react-native';
import './global.css';

const APIFOOTBALL_KEY = "9c617e9d2b646ee084b312546b1974fe"; // Note: This key is currently unused.

const SPORTS_DB = {
  "soccer": {
    name: "Futebol",
    logo: "https://cdn-icons-png.flaticon.com/512/53/53283.png",
    views: [
      { id: 'news', name: 'Notícias', icon: <Zap size={20} /> },
      { id: 'transmission', name: 'Transmissão', icon: <Tv2 size={20} /> },
      { id: 'clubs', name: 'Clubes', icon: <Shield size={20} /> },
      { id: 'scorers', name: 'Artilheiros', icon: <Target size={20} /> },
      { id: 'matches', name: 'Jogos', icon: <CalendarDays size={20} /> },
      { id: 'standings', name: 'Classificação', icon: <Trophy size={20} /> }
    ],
    leagues: {
      "brasileirao": {
          id: "bra.1", apiFootballId: 71, seasonId: 2026, name: "Brasileirão Série A",
          logo: "https://upload.wikimedia.org/wikipedia/commons/2/2b/Campeonato_Brasileiro_S%C3%A9rie_A_logo_%282024%29.svg",
          bg: "https://s2-globo-play.glbimg.com/rHTMAA96-XWwbs6h4pEWeZXlREw=/https://s2.glbimg.com/aNGo_xeD86fO2XMCGBRlpe7rmmg=/i.s3.glbimg.com/v1/AUTH_c3c606ff68e7478091d1ca496f9c5625/internal_photos/bs/2025/L/P/Y3zKUbSTWAUtZN86BTzg/2025-4731-brasileirao-background.jpg",
          clubs: ["Clube_Atlético_Mineiro", "Esporte_Clube_Bahia", "Botafogo_de_Futebol_e_Regatas", "Ceará_Sporting_Club", "Sport_Club_Corinthians_Paulista", "Cruzeiro_Esporte_Clube", "Clube_de_Regatas_do_Flamengo", "Fluminense_Football_Club", "Fortaleza_Esporte_Clube", "Grêmio_Foot-Ball_Porto_Alegrense", "Sport_Club_Internacional", "Esporte_Clube_Juventude", "Mirassol_Futebol_Clube", "Sociedade_Esportiva_Palmeiras", "Red_Bull_Bragantino", "Santos_Futebol_Clube", "São_Paulo_Futebol_Clube", "Sport_Club_do_Recife", "Club_de_Regatas_Vasco_da_Gama", "Esporte_Clube_Vitória"],
      },
      "brasileiraob": {
          id: "bra.2", apiFootballId: 72, seasonId: 2026, name: "Brasileirão Série B",
          logo: "https://upload.wikimedia.org/wikipedia/pt/d/d6/Campeonato_Brasileiro_de_Futebol_S%C3%A9rie_B.png",
          bg: "https://s2-globo-play.glbimg.com/rHTMAA96-XWwbs6h4pEWeZXlREw=/https://s2.glbimg.com/aNGo_xeD86fO2XMCGBRlpe7rmmg=/i.s3.glbimg.com/v1/AUTH_c3c606ff68e7478091d1ca496f9c5625/internal_photos/bs/2025/L/P/Y3zKUbSTWAUtZN86BTzg/2025-4731-brasileirao-background.jpg",
          clubs: ["Goiás_Esporte_Clube", "Sport_Club_do_Recife", "Ceará_Sporting_Club", "América_Futebol_Clube_(Minas_Gerais)", "Coritiba_Foot_Ball_Club", "Vila_Nova_Futebol_Clube", "Clube_de_Regatas_Brasil", "Grêmio_Novorizontino", "Mirassol_Futebol_Clube", "Operário_Ferroviário_Esporte_Clube", "Amazonas_Futebol_Clube", "Avaí_Futebol_Clube", "Associação_Chapecoense_de_Futebol", "Paysandu_Sport_Club", "Botafogo_Futebol_Clube_(Ribeirão_Preto)", "Guarani_Futebol_Clube", "Associação_Atlética_Ponte_Preta", "Ituano_Futebol_Clube", "Brusque_Futebol_Clube"],
      },
      "copadobrasil": {
          id: "bra.copa_do_brazil", apiFootballId: 73, seasonId: 2026, name: "Copa do Brasil",
          logo: "https://cdn-img.zerozero.pt/img/logos/competicoes/260_imgbank_cb_20250227155245.png",
          bg: "https://s2-globo-play.glbimg.com/rHTMAA96-XWwbs6h4pEWeZXlREw=/https://s2.glbimg.com/aNGo_xeD86fO2XMCGBRlpe7rmmg=/i.s3.glbimg.com/v1/AUTH_c3c606ff68e7478091d1ca496f9c5625/internal_photos/bs/2025/L/P/Y3zKUbSTWAUtZN86BTzg/2025-4731-brasileirao-background.jpg",
          clubs: ["Clube_Atlético_Mineiro", "Esporte_Clube_Bahia", "Botafogo_de_Futebol_e_Regatas", "Ceará_Sporting_Club", "Sport_Club_Corinthians_Paulista", "Cruzeiro_Esporte_Clube", "Clube_de_Regatas_do_Flamengo", "Fluminense_Football_Club", "Fortaleza_Esporte_Clube", "Grêmio_Foot-Ball_Porto_Alegrense", "Sport_Club_Internacional", "Esporte_Clube_Juventude", "Mirassol_Futebol_Clube", "Sociedade_Esportiva_Palmeiras", "Red_Bull_Bragantino", "Santos_Futebol_Clube", "São_Paulo_Futebol_Clube", "Sport_Club_do_Recife", "Club_de_Regatas_Vasco_da_Gama", "Esporte_Clube_Vitória", "Cuiabá_Esporte_Clube"],
      },
      "premier": {
          id: "eng.1", apiFootballId: 39, seasonId: 2026, name: "Premier League",
          logo: "https://a.espncdn.com/i/leaguelogos/soccer/500/23.png",
          bg: "https://t4.ftcdn.net/jpg/05/99/15/97/360_F_599159727_pFIXrrEiyZnuSw5h0qOjAuVMeQfTYpQM.jpg",
          clubs: ["Arsenal_Football_Club", "Aston_Villa_Football_Club", "A.F.C._Bournemouth", "Brentford_Football_Club", "Brighton_&_Hove_Albion_Football_Club", "Chelsea_Football_Club", "Crystal_Palace_Football_Club", "Everton_Football_Club", "Fulham_Football_Club", "Ipswich_Town_Football_Club", "Leicester_City_Football_Club", "Liverpool_Football_Club", "Manchester_City_Football_Club", "Manchester_United_Football_Club", "Newcastle_United_Football_Club", "Nottingham_Forest_Football_Club", "Southampton_Football_Club", "Tottenham_Hotspur_Football_Club", "West_Ham_United_Football_Club", "Wolverhampton_Wanderers_Football_Club"],
          logoOverrides: {
              "Arsenal": "https://a.espncdn.com/i/teamlogos/soccer/500/359.png",
              "Aston Villa": "https://a.espncdn.com/i/teamlogos/soccer/500/362.png",
              "Bournemouth": "https://a.espncdn.com/i/teamlogos/soccer/500/349.png",
              "Brentford": "https://a.espncdn.com/i/teamlogos/soccer/500/337.png",
              "Brighton & Hove Albion": "https://a.espncdn.com/i/teamlogos/soccer/500/331.png",
              "Chelsea": "https://a.espncdn.com/i/teamlogos/soccer/500/363.png",
              "Crystal Palace": "https://a.espncdn.com/i/teamlogos/soccer/500/364.png",
              "Everton": "https://a.espncdn.com/i/teamlogos/soccer/500/368.png",
              "Fulham": "https://a.espncdn.com/i/teamlogos/soccer/500/370.png",
              "Ipswich Town": "https://a.espncdn.com/i/teamlogos/soccer/500/378.png",
              "Leicester City": "https://a.espncdn.com/i/teamlogos/soccer/500/375.png",
              "Liverpool": "https://a.espncdn.com/i/teamlogos/soccer/500/379.png",
              "Manchester City": "https://a.espncdn.com/i/teamlogos/soccer/500/382.png",
              "Manchester United": "https://a.espncdn.com/i/teamlogos/soccer/500/360.png",
              "Newcastle United": "https://a.espncdn.com/i/teamlogos/soccer/500/384.png",
              "Nottingham Forest": "https://a.espncdn.com/i/teamlogos/soccer/500/385.png",
              "Southampton": "https://a.espncdn.com/i/teamlogos/soccer/500/376.png",
              "Tottenham Hotspur": "https://a.espncdn.com/i/teamlogos/soccer/500/367.png",
              "West Ham United": "https://a.espncdn.com/i/teamlogos/soccer/500/371.png",
              "Wolverhampton Wanderers": "https://a.espncdn.com/i/teamlogos/soccer/500/380.png"
          }
      },
      "laliga": {
          id: "esp.1", apiFootballId: 140, seasonId: 2026, name: "La Liga",
          logo: "https://a.espncdn.com/i/leaguelogos/soccer/500/15.png",
          bg: "https://assets.goal.com/images/v3/blt054a5ddddf1e5a2b/158f203189e94419d7010667f379da35bcf16d8e.jpg",
          clubs: ["Deportivo_Alavés", "Athletic_Club", "Atlético_de_Madrid", "Futbol_Club_Barcelona", "Real_Betis_Balompié", "Real_Club_Celta_de_Vigo", "Real_Club_Deportivo_Espanyol_de_Barcelona", "Getafe_Club_de_Fútbol", "Girona_Futbol_Club", "Unión_Deportiva_Las_Palmas", "Club_Deportivo_Leganés", "Real_Club_Deportivo_Mallorca", "Club_Atlético_Osasuna", "Rayo_Vallecano_de_Madrid", "Real_Madrid_Club_de_Fútbol", "Real_Sociedad_de_Fútbol", "Sevilla_Fútbol_Club", "Valencia_Club_de_Fútbol", "Real_Valladolid", "Villarreal_Club_de_Fútbol"],
          logoOverrides: {
              "Deportivo Alavés": "https://a.espncdn.com/i/teamlogos/soccer/500/93.png",
              "Athletic Bilbao": "https://a.espncdn.com/i/teamlogos/soccer/500/94.png",
              "Atlético Madrid": "https://a.espncdn.com/i/teamlogos/soccer/500/1068.png",
              "Barcelona": "https://a.espncdn.com/i/teamlogos/soccer/500/83.png",
              "Real Betis": "https://a.espncdn.com/i/teamlogos/soccer/500/91.png",
              "Celta Vigo": "https://a.espncdn.com/i/teamlogos/soccer/500/85.png",
              "Espanyol": "https://a.espncdn.com/i/teamlogos/soccer/500/86.png",
              "Getafe": "https://a.espncdn.com/i/teamlogos/soccer/500/97.png",
              "Girona": "https://a.espncdn.com/i/teamlogos/soccer/500/3709.png",
              "Las Palmas": "https://a.espncdn.com/i/teamlogos/soccer/500/98.png",
              "Leganés": "https://a.espncdn.com/i/teamlogos/soccer/500/2922.png",
              "RCD Mallorca": "https://a.espncdn.com/i/teamlogos/soccer/500/89.png",
              "Osasuna": "https://a.espncdn.com/i/teamlogos/soccer/500/99.png",
              "Rayo Vallecano": "https://a.espncdn.com/i/teamlogos/soccer/500/100.png",
              "Real Madrid": "https://a.espncdn.com/i/teamlogos/soccer/500/87.png",
              "Real Sociedad": "https://a.espncdn.com/i/teamlogos/soccer/500/92.png",
              "Sevilla": "https://a.espncdn.com/i/teamlogos/soccer/500/243.png",
              "Valencia": "https://a.espncdn.com/i/teamlogos/soccer/500/95.png",
              "Real Valladolid": "https://a.espncdn.com/i/teamlogos/soccer/500/101.png",
              "Villarreal": "https://a.espncdn.com/i/teamlogos/soccer/500/102.png"
          },
          theme: { scoreboardBg: '#1C1C23', scoreboardText: '#FFFFFF' },
          flagColors: ['#E81C23', '#E81C23']
      },
      "champions": {
          id: "uefa.champions", apiFootballId: 2, seasonId: 2026, name: "Champions League",
          logo: "https://a.espncdn.com/i/leaguelogos/soccer/500/2.png",
          bg: "https://editorial.uefa.com/resources/027f-1793cd516cbd-e4e5d9d1aedf-1000/fbl-eur-c1-draw.jpeg",
          clubs: ["Real_Madrid_Club_de_Fútbol", "Futbol_Club_Barcelona", "Atlético_de_Madrid", "Manchester_City_Football_Club", "Arsenal_Football_Club", "Liverpool_Football_Club", "Manchester_United_Football_Club", "Fußball-Club_Bayern_München", "Borussia_Dortmund", "Bayer_04_Leverkusen", "RB_Leipzig", "Paris_Saint-Germain_Football_Club", "Internazionale_Milano", "Associazione_Calcio_Milan", "Juventus_Football_Club", "Philips_Sport_Vereniging", "Feyenoord_Rotterdam", "Sport_Lisboa_e_Benfica", "Futebol_Clube_do_Porto", "Sporting_Clube_de_Portugal"],
          logoOverrides: {
              "Real Madrid": "https://a.espncdn.com/i/teamlogos/soccer/500/87.png",
              "Barcelona": "https://a.espncdn.com/i/teamlogos/soccer/500/83.png",
              "Atlético Madrid": "https://a.espncdn.com/i/teamlogos/soccer/500/1068.png",
              "Manchester City": "https://a.espncdn.com/i/teamlogos/soccer/500/382.png",
              "Arsenal": "https://a.espncdn.com/i/teamlogos/soccer/500/359.png",
              "Liverpool": "https://a.espncdn.com/i/teamlogos/soccer/500/379.png",
              "Manchester United": "https://a.espncdn.com/i/teamlogos/soccer/500/360.png",
              "Bayern Munich": "https://a.espncdn.com/i/teamlogos/soccer/500/132.png",
              "Borussia Dortmund": "https://a.espncdn.com/i/teamlogos/soccer/500/129.png",
              "Bayer Leverkusen": "https://a.espncdn.com/i/teamlogos/soccer/500/131.png",
              "RB Leipzig": "https://a.espncdn.com/i/teamlogos/soccer/500/9679.png",
              "Paris Saint-Germain": "https://a.espncdn.com/i/teamlogos/soccer/500/160.png",
              "Inter Milan": "https://a.espncdn.com/i/teamlogos/soccer/500/109.png",
              "AC Milan": "https://a.espncdn.com/i/teamlogos/soccer/500/108.png",
              "Juventus": "https://a.espncdn.com/i/teamlogos/soccer/500/111.png",
              "PSV Eindhoven": "https://a.espncdn.com/i/teamlogos/soccer/500/171.png",
              "Feyenoord": "https://a.espncdn.com/i/teamlogos/soccer/500/170.png",
              "Benfica": "https://a.espncdn.com/i/teamlogos/soccer/500/191.png",
              "FC Porto": "https://a.espncdn.com/i/teamlogos/soccer/500/192.png",
              "Sporting CP": "https://a.espncdn.com/i/teamlogos/soccer/500/194.png"
          }
      },
      "libertadores": {
          id: "conmebol.libertadores", apiFootballId: 13, seasonId: 2026, name: "Libertadores",
          logo: "https://upload.wikimedia.org/wikipedia/pt/4/4b/Conmebol_Libertadores_Bridgestone_logo.png",
          bg: "https://lncimg.lance.com.br/cdn-cgi/image/width=950,quality=75,fit=pad,format=webp/uploads/2021/01/29/60141dfea45a6.jpeg",
          clubs: ["Clube_de_Regatas_do_Flamengo", "Sociedade_Esportiva_Palmeiras", "São_Paulo_Futebol_Clube", "Fluminense_Football_Club", "Grêmio_Foot-Ball_Porto_Alegrense", "Sport_Club_Internacional", "Clube_Atlético_Mineiro", "Club_Atlético_Boca_Juniors", "Club_Atlético_River_Plate", "Racing_Club_de_Avellaneda", "Club_Atlético_Independiente", "Club_Atlético_San_Lorenzo_de_Almagro", "Club_Atlético_Peñarol", "Club_Nacional_de_Football", "Club_Olimpia", "Club_Cerro_Porteño", "Colo-Colo", "Club_Universidad_de_Chile", "Atlético_Nacional", "Liga_Deportiva_Universitaria_de_Quito"],
          logoOverrides: {
              "Flamengo": "https://a.espncdn.com/i/teamlogos/soccer/500/819.png",
              "Palmeiras": "https://a.espncdn.com/i/teamlogos/soccer/500/2029.png",
              "São Paulo": "https://a.espncdn.com/i/teamlogos/soccer/500/2030.png",
              "Fluminense": "https://a.espncdn.com/i/teamlogos/soccer/500/206.png",
              "Grêmio": "https://a.espncdn.com/i/teamlogos/soccer/500/824.png",
              "Internacional": "https://a.espncdn.com/i/teamlogos/soccer/500/826.png",
              "Atlético-MG": "https://a.espncdn.com/i/teamlogos/soccer/500/3445.png",
              "Boca Juniors": "https://a.espncdn.com/i/teamlogos/soccer/500/5.png",
              "River Plate": "https://a.espncdn.com/i/teamlogos/soccer/500/16.png",
              "Racing Club": "https://a.espncdn.com/i/teamlogos/soccer/500/15.png",
              "Independiente": "https://a.espncdn.com/i/teamlogos/soccer/500/9.png",
              "San Lorenzo": "https://a.espncdn.com/i/teamlogos/soccer/500/17.png",
              "Peñarol": "https://a.espncdn.com/i/teamlogos/soccer/500/255.png",
              "Nacional": "https://a.espncdn.com/i/teamlogos/soccer/500/254.png",
              "Olimpia": "https://a.espncdn.com/i/teamlogos/soccer/500/188.png",
              "Cerro Porteño": "https://a.espncdn.com/i/teamlogos/soccer/500/187.png",
              "Colo-Colo": "https://a.espncdn.com/i/teamlogos/soccer/500/246.png",
              "Universidad de Chile": "https://a.espncdn.com/i/teamlogos/soccer/500/249.png",
              "Atlético Nacional": "https://a.espncdn.com/i/teamlogos/soccer/500/258.png",
              "LDU Quito": "https://a.espncdn.com/i/teamlogos/soccer/500/265.png"
          }
      },
      "seriea": {
          id: "ita.1", apiFootballId: 135, seasonId: 2026, name: "Serie A",
          logo: "https://a.espncdn.com/i/leaguelogos/soccer/500/12.png",
          bg: "https://cloudfront-us-east-1.images.arcpublishing.com/newr7/L6ZP3CEJ6VMPNFT5HTW7H7L7LY.jpg",
          clubs: ["Atalanta_Bergamasca_Calcio", "Bologna_Football_Club_1909", "Cagliari_Calcio", "Como_1907", "Empoli_Football_Club", "ACF_Fiorentina", "Genoa_Cricket_and_Football_Club", "Internazionale_Milano", "Juventus_Football_Club", "Società_Sportiva_Lazio", "Unione_Sportiva_Lecce", "Associazione_Calcio_Milan", "Associazione_Calcio_Monza", "Società_Sportiva_Calcio_Napoli", "Parma_Calcio_1913", "Associazione_Sportiva_Roma", "Torino_Football_Club", "Udinese_Calcio", "Venezia_Football_Club", "Hellas_Verona_Football_Club"],
          logoOverrides: {
              "Atalanta": "https://a.espncdn.com/i/teamlogos/soccer/500/103.png",
              "Bologna": "https://a.espncdn.com/i/teamlogos/soccer/500/104.png",
              "Cagliari": "https://a.espncdn.com/i/teamlogos/soccer/500/105.png",
              "Como": "https://a.espncdn.com/i/teamlogos/soccer/500/106.png",
              "Empoli": "https://a.espncdn.com/i/teamlogos/soccer/500/118.png",
              "Fiorentina": "https://a.espncdn.com/i/teamlogos/soccer/500/107.png",
              "Genoa": "https://a.espncdn.com/i/teamlogos/soccer/500/119.png",
              "Inter Milan": "https://a.espncdn.com/i/teamlogos/soccer/500/109.png",
              "Juventus": "https://a.espncdn.com/i/teamlogos/soccer/500/111.png",
              "Lazio": "https://a.espncdn.com/i/teamlogos/soccer/500/112.png",
              "Lecce": "https://a.espncdn.com/i/teamlogos/soccer/500/113.png",
              "AC Milan": "https://a.espncdn.com/i/teamlogos/soccer/500/108.png",
              "Monza": "https://a.espncdn.com/i/teamlogos/soccer/500/7594.png",
              "Napoli": "https://a.espncdn.com/i/teamlogos/soccer/500/114.png",
              "Parma": "https://a.espncdn.com/i/teamlogos/soccer/500/115.png",
              "AS Roma": "https://a.espncdn.com/i/teamlogos/soccer/500/116.png",
              "Torino": "https://a.espncdn.com/i/teamlogos/soccer/500/117.png",
              "Udinese": "https://a.espncdn.com/i/teamlogos/soccer/500/121.png",
              "Venezia": "https://a.espncdn.com/i/teamlogos/soccer/500/122.png",
              "Hellas Verona": "https://a.espncdn.com/i/teamlogos/soccer/500/123.png"
          },
          theme: { scoreboardBg: '#FFFFFF', scoreboardText: '#00387D' },
          flagColors: ['#008C45', '#FFFFFF', '#CD212A']
      },
      "bundesliga": {
          id: "ger.1", apiFootballId: 78, seasonId: 2026, name: "Bundesliga",
          logo: "https://a.espncdn.com/i/leaguelogos/soccer/500/10.png",
          bg: "https://s2-ge.glbimg.com/F2PP74GbwM16ougDWVMDhZzEp6U=/0x0:1024x659/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_bc8228b6673f488aa253bbcb03c80ec5/internal_photos/bs/2024/X/Y/3pfuBhTzuraB6EHOqszA/gettyimages-1742744089.jpg",
          clubs: ["Bayer_04_Leverkusen", "VfB_Stuttgart", "Fußball-Club_Bayern_München", "RB_Leipzig", "Borussia_Dortmund", "Eintracht_Frankfurt", "TSG_1899_Hoffenheim", "1._FC_Heidenheim_1846", "SV_Werder_Bremen", "SC_Freiburg", "FC_Augsburg", "VfL_Wolfsburg", "1._FSV_Mainz_05", "Borussia_Mönchengladbach", "1._FC_Union_Berlin", "VfL_Bochum", "FC_St._Pauli", "Holstein_Kiel", "Hamburger_SV", "FC_Schalke_04"],
          logoOverrides: {
              "Bayer Leverkusen": "https://a.espncdn.com/i/teamlogos/soccer/500/131.png",
              "VfB Stuttgart": "https://a.espncdn.com/i/teamlogos/soccer/500/130.png",
              "Bayern Munich": "https://a.espncdn.com/i/teamlogos/soccer/500/132.png",
              "RB Leipzig": "https://a.espncdn.com/i/teamlogos/soccer/500/9679.png",
              "Borussia Dortmund": "https://a.espncdn.com/i/teamlogos/soccer/500/129.png",
              "Eintracht Frankfurt": "https://a.espncdn.com/i/teamlogos/soccer/500/134.png",
              "1899 Hoffenheim": "https://a.espncdn.com/i/teamlogos/soccer/500/295.png",
              "1. FC Heidenheim 1846": "https://a.espncdn.com/i/teamlogos/soccer/500/9683.png",
              "Werder Bremen": "https://a.espncdn.com/i/teamlogos/soccer/500/139.png",
              "SC Freiburg": "https://a.espncdn.com/i/teamlogos/soccer/500/135.png",
              "FC Augsburg": "https://a.espncdn.com/i/teamlogos/soccer/500/143.png",
              "VfL Wolfsburg": "https://a.espncdn.com/i/teamlogos/soccer/500/140.png",
              "1. FSV Mainz 05": "https://a.espncdn.com/i/teamlogos/soccer/500/159.png",
              "Borussia Monchengladbach": "https://a.espncdn.com/i/teamlogos/soccer/500/133.png",
              "1. FC Union Berlin": "https://a.espncdn.com/i/teamlogos/soccer/500/9682.png",
              "VfL Bochum": "https://a.espncdn.com/i/teamlogos/soccer/500/144.png",
              "FC St. Pauli": "https://a.espncdn.com/i/teamlogos/soccer/500/145.png",
              "Holstein Kiel": "https://a.espncdn.com/i/teamlogos/soccer/500/9681.png",
              "Hamburger SV": "https://a.espncdn.com/i/teamlogos/soccer/500/136.png",
              "FC Schalke 04": "https://a.espncdn.com/i/teamlogos/soccer/500/138.png"
          }
      },
      "saudi": {
          id: "ksa.1", apiFootballId: 307, seasonId: 2026, name: "Saudi Pro League",
          logo: "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fleaguelogos%2Fsoccer%2F500%2F2488.png",
          bg: "https://www.365scores.com/pt-br/news/magazine/wp-content/uploads/2023/11/366423961_5646928382077000_2604818796297545939_n-e1699379331310.jpg",
          clubs: ["Al-Ahli_Saudi_FC", "Al-Ettifaq_FC", "Al-Fateh_SC", "Al-Fayha_FC", "Al-Hilal_Saudi_Football_Club", "Al-Ittihad_Club", "Al-Khaleej_FC", "Al-Nassr_FC", "Al-Okhdood_Club", "Al-Qadsiah_FC", "Al-Raed_FC", "Al-Riyadh_SC", "Al-Shabab_Football_Club", "Al-Taawoun_FC", "Al-Wehda_Football_Club", "Damac_Football_Club", "Al-Kholood_Club", "Al-Orobah_FC", "Abha_Club", "Al-Hazem_SC"],
          logoOverrides: {
              "Al-Ahli": "https://a.espncdn.com/i/teamlogos/soccer/500/4659.png",
              "Al-Ettifaq": "https://a.espncdn.com/i/teamlogos/soccer/500/4660.png",
              "Al-Fateh": "https://a.espncdn.com/i/teamlogos/soccer/500/4661.png",
              "Al-Fayha": "https://a.espncdn.com/i/teamlogos/soccer/500/17109.png",
              "Al-Hilal": "https://a.espncdn.com/i/teamlogos/soccer/500/4662.png",
              "Al-Ittihad": "https://a.espncdn.com/i/teamlogos/soccer/500/4663.png",
              "Al-Khaleej": "https://a.espncdn.com/i/teamlogos/soccer/500/19491.png",
              "Al-Nassr": "https://a.espncdn.com/i/teamlogos/soccer/500/4664.png",
              "Al-Okhdood": "https://a.espncdn.com/i/teamlogos/soccer/500/22132.png",
              "Al-Qadsiah": "https://a.espncdn.com/i/teamlogos/soccer/500/4665.png",
              "Al-Raed": "https://a.espncdn.com/i/teamlogos/soccer/500/4666.png",
              "Al-Riyadh": "https://a.espncdn.com/i/teamlogos/soccer/500/22133.png",
              "Al-Shabab": "https://a.espncdn.com/i/teamlogos/soccer/500/4667.png",
              "Al-Taawoun": "https://a.espncdn.com/i/teamlogos/soccer/500/4668.png",
              "Al-Wehda": "https://a.espncdn.com/i/teamlogos/soccer/500/4669.png",
              "Damac": "https://a.espncdn.com/i/teamlogos/soccer/500/19490.png",
              "Al-Kholood": "https://www.ogol.com.br/img/logos/equipas/221321_imgbank.png",
              "Al-Orobah": "https://a.espncdn.com/i/teamlogos/soccer/500/19492.png",
              "Abha": "https://a.espncdn.com/i/teamlogos/soccer/500/19489.png",
              "Al-Hazem": "https://a.espncdn.com/i/teamlogos/soccer/500/4670.png"
          }
      },
      "paulista": {
          id: "bra.camp.paulista", apiFootballId: null, seasonId: 2026, name: "Paulistão",
          logo: "https://upload.wikimedia.org/wikipedia/pt/1/1c/Paulist%C3%A3o_2026.png",
          bg: "https://www.infomoney.com.br/wp-content/uploads/2025/03/copapaulistamar25-e1743017283823.jpg?fit=2500%2C1167&quality=50&strip=all",
          clubs: ["Sport_Club_Corinthians_Paulista", "Sociedade_Esportiva_Palmeiras", "Red_Bull_Bragantino", "Santos_Futebol_Clube", "São_Paulo_Futebol_Clube", "Esporte_Clube_Água_Santa", "Associação_Atlética_Ponte_Preta", "Associação_Portuguesa_de_Desportos", "Botafogo_Futebol_Clube_(Ribeirão_Preto)", "Guarani_Futebol_Clube", "Grêmio_Novorizontino", "Mirassol_Futebol_Clube", "Esporte_Clube_Noroeste", "Esporte_Clube_Santo_André", "Esporte_Clube_São_Bento", "Velo_Clube_Rioclarense"],
          logoOverrides: {
              "Corinthians": "https://a.espncdn.com/i/teamlogos/soccer/500/874.png",
              "Palmeiras": "https://a.espncdn.com/i/teamlogos/soccer/500/2029.png",
              "Red Bull Bragantino": "https://a.espncdn.com/i/teamlogos/soccer/500/3447.png",
              "Santos": "https://a.espncdn.com/i/teamlogos/soccer/500/837.png",
              "São Paulo": "https://a.espncdn.com/i/teamlogos/soccer/500/2030.png",
              "Água Santa": "https://a.espncdn.com/i/teamlogos/soccer/500/10087.png",
              "Ponte Preta": "https://a.espncdn.com/i/teamlogos/soccer/500/2028.png",
              "Portuguesa": "https://a.espncdn.com/i/teamlogos/soccer/500/878.png",
              "Botafogo-SP": "https://a.espncdn.com/i/teamlogos/soccer/500/3456.png",
              "Guarani": "https://a.espncdn.com/i/teamlogos/soccer/500/876.png",
              "Grêmio Novorizontino": "https://a.espncdn.com/i/teamlogos/soccer/500/19881.png",
              "Mirassol": "https://a.espncdn.com/i/teamlogos/soccer/500/4433.png",
              "Noroeste": "https://upload.wikimedia.org/wikipedia/pt/f/f9/Esporte_Clube_Noroeste.png",
              "Santo André": "https://a.espncdn.com/i/teamlogos/soccer/500/3462.png",
              "São Bento": "https://a.espncdn.com/i/teamlogos/soccer/500/4436.png",
              "Velo Clube": "https://upload.wikimedia.org/wikipedia/pt/thumb/a/a8/VeloClube.png/150px-VeloClube.png"
          },
          flagColors: ['#000000', '#FFFFFF', '#FF0000']
      },
      "carioca": {
          id: "bra.camp.carioca", apiFootballId: null, seasonId: 2026, name: "Cariocão",
          logo: "https://upload.wikimedia.org/wikipedia/pt/3/3c/Carioca_2020_FERJ.jpg",
          bg: "https://i.metroimg.com/CN9inuWAEomvLQLMnCj7IjGrN5YQ9SZhw7Tbi1tIHjs/w:900/q:85/f:webp/plain/https://www.metropoles.com/wp-content/uploads/wp-content/uploads/2025/03/16165052/Taca-do-Campeonato-Carioca-1.jpg",
          clubs: ["Bangu_Atlético_Clube", "Boavista_Sport_Club", "Botafogo_de_Futebol_e_Regatas", "Clube_de_Regatas_do_Flamengo", "Fluminense_Football_Club", "Madureira_Esporte_Clube", "Nova_Iguaçu_Futebol_Clube", "Club_de_Regatas_Vasco_da_Gama", "Volta_Redonda_Futebol_Clube", "Associação_Atlética_Portuguesa_(Rio_de_Janeiro)", "Audax_Rio_de_Janeiro_Esporte_Clube", "Sampaio_Corrêa_Futebol_e_Esporte"],
          logoOverrides: {
              "Bangu": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Bangu_Atl%C3%A9tico_Clube_logo.svg/150px-Bangu_Atl%C3%A9tico_Clube_logo.svg.png",
              "Boavista": "https://a.espncdn.com/i/teamlogos/soccer/500/10088.png",
              "Botafogo": "https://a.espncdn.com/i/teamlogos/soccer/500/205.png",
              "Flamengo": "https://a.espncdn.com/i/teamlogos/soccer/500/819.png",
              "Fluminense": "https://a.espncdn.com/i/teamlogos/soccer/500/206.png",
              "Madureira": "https://a.espncdn.com/i/teamlogos/soccer/500/3460.png",
              "Nova Iguaçu": "https://a.espncdn.com/i/teamlogos/soccer/500/19878.png",
              "Vasco da Gama": "https://a.espncdn.com/i/teamlogos/soccer/500/2031.png",
              "Volta Redonda": "https://a.espncdn.com/i/teamlogos/soccer/500/3464.png",
              "Portuguesa-RJ": "https://a.espncdn.com/i/teamlogos/soccer/500/10089.png",
              "Audax Rio": "https://a.espncdn.com/i/teamlogos/soccer/500/21516.png",
              "Sampaio Corrêa-RJ": "https://upload.wikimedia.org/wikipedia/en/thumb/7/73/Sampaio_Corr%C3%AAa_FE_logo.svg/1200px-Sampaio_Corr%C3%AAa_FE_logo.svg.png"
          },
          flagColors: ['#FFFFFF', '#003366']
      },
      "mineiro": {
          id: "bra.camp.mineiro", apiFootballId: null, seasonId: 2026, name: "Campeonato Mineiro",
          logo: "https://a.espncdn.com/i/leaguelogos/soccer/500/2360.png",
          bg: "https://s2-ge.glbimg.com/jDlPK0oNRm7JAib8jk8Y0Yt0YjU=/0x0:2048x1365/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_bc8228b6673f488aa253bbcb03c80ec5/internal_photos/bs/2022/Y/m/5ERG4iS62kBaYhB5XL2A/51181088676-973df72e83-k-cris-mattos-fmf.jpg",
          clubs: ["Clube_Atlético_Mineiro", "América_Futebol_Clube_(Minas_Gerais)", "Cruzeiro_Esporte_Clube", "Athletic_Club_(Minas_Gerais)", "Associação_Atlética_Caldense", "Democrata_Futebol_Clube", "Ipatinga_Futebol_Clube", "Patrocinense", "Pouso_Alegre_Futebol_Clube", "Tombense_Futebol_Clube", "Uberlândia_Esporte_Clube", "Villa_Nova_Atlético_Clube"],
          logoOverrides: {
              "Atlético-MG": "https://a.espncdn.com/i/teamlogos/soccer/500/3445.png",
              "América-MG": "https://a.espncdn.com/i/teamlogos/soccer/500/2025.png",
              "Cruzeiro": "https://a.espncdn.com/i/teamlogos/soccer/500/2026.png",
              "Athletic Club-MG": "https://a.espncdn.com/i/teamlogos/soccer/500/21515.png",
              "Caldense": "https://a.espncdn.com/i/teamlogos/soccer/500/4431.png",
              "Democrata GV": "https://upload.wikimedia.org/wikipedia/pt/thumb/c/c8/DemocrataGV2022.png/120px-DemocrataGV2022.png",
              "Ipatinga": "https://a.espncdn.com/i/teamlogos/soccer/500/877.png",
              "Patrocinense": "https://upload.wikimedia.org/wikipedia/pt/thumb/d/d3/C.A._Patrocinense.png/130px-C.A._Patrocinense.png",
              "Pouso Alegre": "https://a.espncdn.com/i/teamlogos/soccer/500/20703.png",
              "Tombense": "https://a.espncdn.com/i/teamlogos/soccer/500/10090.png",
              "Uberlândia": "https://a.espncdn.com/i/teamlogos/soccer/500/3463.png",
              "Villa Nova-MG": "https://a.espncdn.com/i/teamlogos/soccer/500/3452.png"
          },
          flagColors: ['#FFFFFF', '#FF0000', '#FFFFFF']
      },
      "gaucho": {
          id: "bra.camp.gaucho", apiFootballId: null, seasonId: 2026, name: "Gauchão",
          logo: "https://upload.wikimedia.org/wikipedia/pt/7/7e/Gauch%C3%A3o_2025.png",
          bg: "https://s2-ge.glbimg.com/yK2ZKxnnDVvc50YxV6V68wGDE1E=/0x0:1280x960/1008x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_bc8228b6673f488aa253bbcb03c80ec5/internal_photos/bs/2021/9/L/lTsAFbTB6bmMB064vLpw/whatsapp-image-2021-03-24-at-11.57.47-1-.jpeg",
          clubs: ["Grêmio_Foot-Ball_Porto_Alegrense", "Sport_Club_Internacional", "Esporte_Clube_Juventude", "Caxias_do_Sul", "Brasil_de_Pelotas", "Esporte_Clube_São_José", "Ypiranga_Futebol_Clube_(Erechim)", "Guarany_Futebol_Clube", "Esporte_Clube_Novo_Hamburgo", "Avenida", "Santa_Cruz_Futebol_Clube_(Santa_Cruz_do_Sul)", "Esporte_Clube_São_Luiz", "Monsoon_Futebol_Clube", "Esporte_Clube_Internacional_(Santa_Maria)"],
          flagColors: ['#008542', '#DA291C', '#FFCC00'],
          logoOverrides: {
              "Grêmio": "https://a.espncdn.com/i/teamlogos/soccer/500/824.png",
              "Internacional": "https://a.espncdn.com/i/teamlogos/soccer/500/826.png",
              "Juventude": "https://a.espncdn.com/i/teamlogos/soccer/500/3450.png",
              "Caxias": "https://a.espncdn.com/i/teamlogos/soccer/500/3458.png",
              "Brasil de Pelotas": "https://a.espncdn.com/i/teamlogos/soccer/500/4430.png",
              "São José-RS": "https://a.espncdn.com/i/teamlogos/soccer/500/4437.png",
              "Ypiranga-RS": "https://a.espncdn.com/i/teamlogos/soccer/500/19882.png",
              "Guarany de Bagé": "https://www.ogol.com.br/img/logos/equipas/3280_imgbank_1688482671.png",
              "Novo Hamburgo": "https://a.espncdn.com/i/teamlogos/soccer/500/4435.png",
              "Avenida": "https://upload.wikimedia.org/wikipedia/pt/thumb/d/d2/EC_Avenida.png/150px-EC_Avenida.png",
              "Santa Cruz-RS": "https://upload.wikimedia.org/wikipedia/pt/thumb/7/71/Fscscrs.png/120px-Fscscrs.png",
              "São Luiz de Ijuí": "https://upload.wikimedia.org/wikipedia/pt/thumb/b/b3/Esporte_Clube_S%C3%A3o_Luiz.png/150px-Esporte_Clube_S%C3%A3o_Luiz.png",
              "Monsoon": "https://upload.wikimedia.org/wikipedia/commons/0/09/Monsoon_Futebol_Clube_logo.png",
              "Internacional de Santa Maria": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Escudo_do_Inter_de_Santa_Maria.svg/1280px-Escudo_do_Inter_de_Santa_Maria.svg.png"
          }
      }
    }
  }
};

const API_CONFIG = {
  espn: {
    baseSite: 'https://site.api.espn.com/apis/site/v2/sports',
    baseWeb: 'https://site.web.api.espn.com/apis',
    scoreboard: (sport, league, date) => `${API_CONFIG.espn.baseSite}/${sport}/${league}/scoreboard?lang=pt&region=br&dates=${date}&limit=100`,
    standings: (league) => `${API_CONFIG.espn.baseWeb}/v2/sports/soccer/${league}/standings?lang=pt`,
    gameSummary: (league, eventId) => `${API_CONFIG.espn.baseSite}/soccer/${league}/summary?event=${eventId}&lang=pt`,
    teamSchedule: (sport, league, teamId) => `${API_CONFIG.espn.baseSite}/${sport}/${league}/teams/${teamId}/schedule?lang=pt&region=br`,
    news: (sport, league) => `${API_CONFIG.espn.baseSite}/${sport}/${league}/news?lang=pt&region=br`,
    teams: (sport, league) => `${API_CONFIG.espn.baseSite}/${sport}/${league}/teams?lang=pt&region=br`,
    roster: (league, teamId) => `${API_CONFIG.espn.baseSite}/soccer/${league}/teams/${teamId}/roster?lang=pt`,
    statistics: (sport, league) => `${API_CONFIG.espn.baseSite}/${sport}/${league}/statistics?lang=pt&region=br`
  },
  reidoscanais: {
    sports: () => `https://api.reidoscanais.st/sports?category=Futebol`
  },
  utils: {
    formatDateForEspn: (date) => {
      if (!(date instanceof Date)) date = new Date(date);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}${month}${day}`;
    },
    formatDateInput: (date) => {
      if (!(date instanceof Date)) date = new Date(date);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    }
  }
};

function useMatchClock(status) {
  const [clockString, setClockString] = useState('');

  useEffect(() => {
    if (!status) return;
    if (status.type.state !== 'in') {
      setClockString(status.type.shortDetail || 'FIM');
      return;
    }

    const initialClock = status.displayClock || '00:00';
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

    const interval = setInterval(() => {
      const elapsedSeconds = Math.floor((Date.now() - fetchTimestamp) / 1000);
      const currentTotalSeconds = initialTotalSeconds + elapsedSeconds;
      const minutes = Math.floor(currentTotalSeconds / 60);
      const seconds = currentTotalSeconds % 60;
      setClockString(`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
    }, 1000);

    return () => clearInterval(interval);
  }, [status]);

  return clockString;
}

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => { ref.current = value; });
  return ref.current;
}

const getZoneClass = (note) => {
  if (!note?.description) return '';
  const desc = note.description.toLowerCase();
  if (desc.includes('libertadores') && !desc.includes('qualifying')) return 'zone-libertadores';
  if (desc.includes('libertadores') && desc.includes('qualifying')) return 'zone-prelibertadores';
  if (desc.includes('sul-americana')) return 'zone-sulamericana';
  if (desc.includes('relegation') && !desc.includes('play-off')) return 'zone-rebaixamento';
  // Add more specific rules as needed from API responses
  return '';
};



// --- CBF Style (Brasileirão / Copa do Brasil) ---
const CBFScoreboard = ({ event, league }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [goalSide, setGoalSide] = useState(null);
  const comp = event.competitions[0];
  const home = comp.competitors.find(c => c.homeAway === 'home');
  const away = comp.competitors.find(c => c.homeAway === 'away');
  const clock = useMatchClock(event.status);

  const prevHomeScore = usePrevious(home.score);
  const prevAwayScore = usePrevious(away.score);

  useEffect(() => {
    setTimeout(() => setIsMounted(true), 100);
  }, []);

  useEffect(() => {
    if (prevHomeScore !== undefined && home.score > prevHomeScore) { setGoalSide('home'); setTimeout(() => setGoalSide(null), 4000); }
    if (prevAwayScore !== undefined && away.score > prevAwayScore) { setGoalSide('away'); setTimeout(() => setGoalSide(null), 4000); }
  }, [home.score, away.score]);

  const hColor = home.team.color ? `#${home.team.color}` : '#0d80bf';
  const aColor = away.team.color ? `#${away.team.color}` : '#e50e18';

  return (
    <div className="cbf-widget-container py-4">
      <div className={`cbf-scoreboard-wrapper ${isMounted ? 'cbf-is-visible' : ''}`}>
        <div className="cbf-main-bar">
          <div className="cbf-team-side cbf-team-left">
            <img src={home.team.logo} alt={home.team.abbreviation} className="cbf-logo" />
            <span className="cbf-team-name">{home.team.abbreviation}</span>
            <div className="cbf-shape-left" style={{ backgroundColor: hColor }}></div>
          </div>
          <div className="cbf-team-side cbf-team-right">
            <div className="cbf-shape-right" style={{ backgroundColor: aColor }}></div>
            <span className="cbf-team-name">{away.team.abbreviation}</span>
            <img src={away.team.logo} alt={away.team.abbreviation} className="cbf-logo" />
          </div>
        </div>
        <div className="cbf-time-box">
          <span className="cbf-time-text">{clock}</span>
        </div>
        <div className="cbf-score-box">
          <span className={`cbf-score-number ${goalSide === 'home' ? 'pop' : ''}`}>{home.score ?? '0'}</span>
          <span className="cbf-score-divider">:</span>
          <span className={`cbf-score-number ${goalSide === 'away' ? 'pop' : ''}`}>{away.score ?? '0'}</span>
        </div>

        {goalSide && (
          <div className={`cbf-goal-banner ${goalSide ? 'show' : 'hide'}`} style={{ backgroundColor: goalSide === 'home' ? hColor : aColor }}>
            <img src={goalSide === 'home' ? home.team.logo : away.team.logo} className="cbf-goal-logo-img" />
            <span className="cbf-goal-text">GOOOOOOOOOOL</span>
          </div>
        )}
      </div>
    </div>
  );
};

// --- Serie A Italia Style ---
const SerieAScoreboard = ({ event, league }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [goalSide, setGoalSide] = useState(null);
  const comp = event.competitions[0];
  const home = comp.competitors.find(c => c.homeAway === 'home');
  const away = comp.competitors.find(c => c.homeAway === 'away');
  const clock = useMatchClock(event.status);
  const prevHomeScore = usePrevious(home.score);
  const prevAwayScore = usePrevious(away.score);

  useEffect(() => { setTimeout(() => setIsMounted(true), 100); }, []);
  useEffect(() => {
    if (prevHomeScore !== undefined && home.score > prevHomeScore) { setGoalSide('home'); setTimeout(() => setGoalSide(null), 3000); }
    if (prevAwayScore !== undefined && away.score > prevAwayScore) { setGoalSide('away'); setTimeout(() => setGoalSide(null), 3000); }
  }, [home.score, away.score]);

  const hColor = home.team.color ? `#${home.team.color}` : '#030833';
  const aColor = away.team.color ? `#${away.team.color}` : '#d11b27';

  return (
    <div className="sa-widget-container py-4">
      <div className={`sa-scoreboard-container ${!isMounted ? 'sa-intro-mode' : ''}`}>
        <div className="sa-piece sa-layer-3d sa-home-3d" style={{ background: '#111' }}></div>
        <div className="sa-piece sa-layer-3d sa-away-3d" style={{ background: '#111' }}></div>
        <div className="sa-piece sa-layer-3d sa-score-l-3d"></div>
        <div className="sa-piece sa-layer-3d sa-score-r-3d"></div>

        <div className={`sa-piece sa-layer-front sa-home-front ${isMounted ? 'sa-anim-left' : ''} ${goalSide === 'home' ? 'sa-is-goal' : ''}`} style={{ background: hColor }}>
          <span className="sa-team-name">{home.team.abbreviation}</span>
          <span className="sa-goal-text">GOL!</span>
        </div>
        <div className={`sa-piece sa-layer-front sa-away-front ${isMounted ? 'sa-anim-right' : ''} ${goalSide === 'away' ? 'sa-is-goal' : ''}`} style={{ background: aColor }}>
          <span className="sa-team-name">{away.team.abbreviation}</span>
          <span className="sa-goal-text">GOL!</span>
        </div>

        <div className={`sa-piece sa-layer-front sa-score-l-front ${isMounted ? 'sa-anim-left' : ''}`}>
          <span className={`sa-score-number ${goalSide === 'home' ? 'sa-score-pop-l' : ''}`}>{home.score ?? '0'}</span>
        </div>
        <div className={`sa-piece sa-layer-front sa-score-r-front ${isMounted ? 'sa-anim-right' : ''}`}>
          <span className={`sa-score-number ${goalSide === 'away' ? 'sa-score-pop-r' : ''}`}>{away.score ?? '0'}</span>
        </div>

        <div className={`sa-timer-panel ${isMounted ? 'sa-anim-timer' : ''}`}><span>{clock}</span></div>
        <div className={`sa-shield-container ${isMounted ? 'sa-anim-shield' : ''}`}>
          <div className="sa-shield-base"></div><div className="sa-shield-outer"></div>
          <div className="sa-shield-inner"><img src={league.logo} alt="Serie A" className="sa-serie-a-logo" /></div>
        </div>
      </div>
    </div>
  );
};

// --- Libertadores Style ---
const LibScoreboard = ({ event, league }) => {
  const [goalSide, setGoalSide] = useState(null);
  const comp = event.competitions[0];
  const home = comp.competitors.find(c => c.homeAway === 'home');
  const away = comp.competitors.find(c => c.homeAway === 'away');
  const clock = useMatchClock(event.status);

  const prevHomeScore = usePrevious(home.score);
  const prevAwayScore = usePrevious(away.score);

  useEffect(() => {
    if (prevHomeScore !== undefined && home.score > prevHomeScore) { setGoalSide('home'); setTimeout(() => setGoalSide(null), 1000); }
    if (prevAwayScore !== undefined && away.score > prevAwayScore) { setGoalSide('away'); setTimeout(() => setGoalSide(null), 1000); }
  }, [home.score, away.score]);

  const hColor = home.team.color ? `#${home.team.color}` : '#8CDEDC';
  const aColor = away.team.color ? `#${away.team.color}` : 'transparent';

  return (
    <div className="w-full flex justify-center py-6">
      <div className="lib-placar-wrapper">
        <div className="lib-scoreboard">
          <div className="lib-box lib-logo-box"><img src={league.logo} alt="Lib" /></div>
          <div className="lib-box lib-team-box lib-team-home" style={{ borderBottomColor: hColor }}>{home.team.abbreviation}</div>
          <div className={`lib-box lib-score-box ${goalSide ? 'pop' : ''} gap-1`}>
            <span>{home.score ?? '0'}</span>
            <span>-</span>
            <span>{away.score ?? '0'}</span>
          </div>
          <div className="lib-box lib-team-box lib-team-away" style={{ borderBottomColor: aColor }}>{away.team.abbreviation}</div>
          <div className="lib-box lib-time-box">{clock}</div>
        </div>
      </div>
    </div>
  );
};

// --- Generic / Premier League Style ---
const GenericScoreboard = ({ event, league }) => {
  const comp = event.competitions[0];
  const home = comp.competitors.find(c => c.homeAway === 'home');
  const away = comp.competitors.find(c => c.homeAway === 'away');
  const clock = useMatchClock(event.status);
  const hColor = home.team.color ? `#${home.team.color}` : '#efefef';
  const aColor = away.team.color ? `#${away.team.color}` : '#efefef';

  return (
    <div className="flex flex-col items-center py-4 w-full justify-center">
      <div className="pl-scoreboard-bar">
        <div className="pl-team-box">
          <div className="pl-team-color-strip" style={{ backgroundColor: hColor }}></div>
          <div className="pl-logo-container">
            <img src={home.team.logo} className="pl-logo-img" alt={home.team.abbreviation} />
          </div>
          {home.team.abbreviation}
        </div>
        <div className="pl-match-center">
          <div className="pl-score">{home.score ?? '0'}</div>
          <div className="pl-score">-</div>
          <div className="pl-score">{away.score ?? '0'}</div>
        </div>
        <div className="pl-team-box">
          <div className="pl-team-color-strip" style={{ backgroundColor: aColor, left: 'auto', right: 0 }}></div>
          {away.team.abbreviation}
          <div className="pl-logo-container">
            <img src={away.team.logo} className="pl-logo-img" alt={away.team.abbreviation} />
          </div>
        </div>
      </div>
      <div className="pl-timer-container">
        <span>{clock}</span>
      </div>
    </div>
  );
};

// --- Premiere Style (Brasileirão / Mineiro) ---
const PremiereScoreboard = ({ event, league }) => {
  const [goalSide, setGoalSide] = useState(null);
  const comp = event.competitions[0];
  const home = comp.competitors.find(c => c.homeAway === 'home');
  const away = comp.competitors.find(c => c.homeAway === 'away');
  
  const clock = useMatchClock(event.status);

  const prevHomeScore = usePrevious(home.score);
  const prevAwayScore = usePrevious(away.score);

  useEffect(() => {
    if (prevHomeScore !== undefined && home.score > prevHomeScore) { setGoalSide('home'); setTimeout(() => setGoalSide(null), 4000); }
    if (prevAwayScore !== undefined && away.score > prevAwayScore) { setGoalSide('away'); setTimeout(() => setGoalSide(null), 4000); }
  }, [home.score, away.score]);

  const hColor = home.team.color ? `#${home.team.color}` : '#0d5bb5'; 
  const aColor = away.team.color ? `#${away.team.color}` : '#ffde00';

  return (
    <div className="premiere-widget-container">
      <div className="premiere-scoreboard">
        
        <div className="premiere-team premiere-home">
          <img src={home.team.logo} className="premiere-logo" alt={home.team.abbreviation} />
          <span className="premiere-name">{home.team.abbreviation}</span>
          <div className="premiere-color" style={{ backgroundColor: hColor }}></div>
        </div>

        <div className="premiere-center">
          <div className="premiere-score-box">
            <span className={`premiere-score ${goalSide === 'home' ? 'pop' : ''}`}>{home.score ?? '0'}</span>
            <div className="premiere-divider"></div>
            <span className={`premiere-score ${goalSide === 'away' ? 'pop' : ''}`}>{away.score ?? '0'}</span>
          </div>
          <div className="premiere-time-box">
            {event.status?.period ? `${event.status.period}T ` : ''}{clock}
          </div>
        </div>

        <div className="premiere-team premiere-away">
          <div className="premiere-color" style={{ backgroundColor: aColor }}></div>
          <span className="premiere-name">{away.team.abbreviation}</span>
          <img src={away.team.logo} className="premiere-logo" alt={away.team.abbreviation} />
        </div>

      </div>
    </div>
  );
};

const ScoreboardCard = ({ event, league }) => {
  // Create a deep copy of the event to avoid prop mutation and inject logos.
  const eventWithLogos = useMemo(() => {
    const newEvent = JSON.parse(JSON.stringify(event));
    const competitors = newEvent.competitions[0].competitors;
    competitors.forEach(competitor => {
      competitor.team.logo = league.logoOverrides?.[competitor.team.displayName] || competitor.team.logo || competitor.team.logos?.[0]?.href;
    });
    return newEvent;
  }, [event, league]);

  if (['bra.1', 'bra.2', 'bra.copa_do_brazil'].includes(league.id)) return <PremiereScoreboard event={eventWithLogos} league={league} />;
  if (league.id === 'ita.1') return <SerieAScoreboard event={eventWithLogos} league={league} />;
  if (league.id === 'conmebol.libertadores') return <LibScoreboard event={eventWithLogos} league={league} />;

  // Fallback generic style
  return <GenericScoreboard event={eventWithLogos} league={league} />;
};

const WikiArticleModal = ({ article, onClose }) => {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      setLoading(true);
      try {
        const res = await fetch(`https://pt.wikipedia.org/w/api.php?action=query&prop=extracts&pageids=${article.pageid}&format=json&origin=*&exintro=false`);
        const data = await res.json();
        const page = data.query?.pages?.[article.pageid];
        if (page) {
          setContent(page.extract);
        }
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };
    fetchArticle();
  }, [article.pageid]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 md:p-8">
      <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-2xl w-full max-w-4xl h-full max-h-[90vh] overflow-hidden flex flex-col shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative">
        <div className="p-4 md:p-6 border-b border-[var(--border-color)] flex justify-between items-center bg-[var(--header-bg)] sticky top-0 z-10 backdrop-blur-xl">
          <h3 className="text-xl md:text-2xl font-bold text-[var(--text-primary)]" dangerouslySetInnerHTML={{ __html: article.title }} />
          <button onClick={onClose} className="p-2 bg-white/5 rounded-full text-gray-400 hover:text-white hover:bg-[var(--accent)] transition">
            <X size={24} />
          </button>
        </div>
        <div className="p-6 md:p-10 overflow-y-auto flex-1 custom-scroll wiki-content text-[var(--text-primary)]">
          {loading ? (
             <div className="w-full py-20 flex justify-center"><div className="loader-ring"></div></div>
          ) : content ? (
             <div dangerouslySetInnerHTML={{ __html: content }} />
          ) : (
             <p className="text-center text-gray-500">Conteúdo indisponível.</p>
          )}
        </div>
      </div>
    </div>
  );
};

const WikiSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);

  const searchWiki = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    try {
      const res = await fetch(`https://pt.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&utf8=&format=json&origin=*`);
      const data = await res.json();
      setResults(data.query?.search || []);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="glass-panel p-6 mb-8 text-center">
        <Shield size={48} className="mx-auto mb-4 text-[var(--accent)] opacity-80" />
        <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-2">Pesquisa de Clubes e Jogadores</h3>
        <p className="text-[var(--text-muted)] mb-6">Busque informações na Wikipedia sobre seus times e ídolos.</p>
        
        <form onSubmit={searchWiki} className="flex gap-2 max-w-lg mx-auto">
          <input 
            type="text" 
            value={query} 
            onChange={(e) => setQuery(e.target.value)} 
            placeholder="Ex: Neymar, Cruzeiro, Real Madrid..." 
            className="flex-1 bg-white/5 border border-[var(--border-color)] rounded-xl px-4 py-3 text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]"
          />
          <button type="submit" disabled={loading} className="bg-[var(--accent)] text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-600 transition disabled:opacity-50">
            {loading ? 'Buscando...' : 'Buscar'}
          </button>
        </form>
      </div>

      <div className="space-y-4">
        {results.map(r => (
          <button 
            key={r.pageid} 
            onClick={() => setSelectedArticle({ title: r.title, pageid: r.pageid })}
            className="w-full text-left glass-panel p-5 block hover:border-[var(--accent)] transition hover:-translate-y-1"
          >
            <h4 className="text-lg font-bold text-[var(--accent)] mb-2" dangerouslySetInnerHTML={{ __html: r.title }} />
            <p className="text-sm text-[var(--text-muted)] leading-relaxed" dangerouslySetInnerHTML={{ __html: r.snippet + '...' }} />
          </button>
        ))}
      </div>
      
      {selectedArticle && <WikiArticleModal article={selectedArticle} onClose={() => setSelectedArticle(null)} />}
    </div>
  );
};

const MatchDetailsModal = ({ eventId, leagueId, onClose }) => {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      try {
        const res = await fetch(API_CONFIG.espn.gameSummary(leagueId, eventId));
        const data = await res.json();
        setDetails(data);
      } catch(err) {
        console.error(err);
      }
      setLoading(false);
    };
    fetchDetails();
  }, [eventId, leagueId]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl relative">
        <div className="p-4 border-b border-[var(--border-color)] flex justify-between items-center bg-[var(--header-bg)]">
          <h3 className="text-xl font-bold text-[var(--text-primary)]">Detalhes da Partida</h3>
          <button onClick={onClose} className="p-2 bg-white/5 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition">
            <X size={20} />
          </button>
        </div>
        <div className="p-6 overflow-y-auto flex-1 custom-scroll">
          {loading ? (
             <div className="w-full py-10 flex justify-center"><div className="loader-ring"></div></div>
          ) : details ? (
             <div className="space-y-6 text-[var(--text-primary)]">
               <div className="text-center font-bold text-2xl mb-4">
                 {details.header?.competitions?.[0]?.competitors?.find(c=>c.homeAway==='home')?.team?.displayName} {details.header?.competitions?.[0]?.competitors?.find(c=>c.homeAway==='home')?.score} x {details.header?.competitions?.[0]?.competitors?.find(c=>c.homeAway==='away')?.score} {details.header?.competitions?.[0]?.competitors?.find(c=>c.homeAway==='away')?.team?.displayName}
               </div>
               {details.keyEvents && details.keyEvents.length > 0 && (
                 <div className="glass-panel p-4">
                   <h4 className="font-bold text-lg mb-3 border-b border-[var(--border-color)] pb-2">Eventos Principais</h4>
                   <ul className="space-y-2">
                     {details.keyEvents.map((evt, idx) => (
                       <li key={idx} className="flex items-center gap-3 text-sm border-b border-white/5 py-1 last:border-0">
                         <span className="text-[var(--accent)] font-bold">{evt.clock?.displayValue}</span>
                         <span>{evt.type?.text}: {evt.text}</span>
                       </li>
                     ))}
                   </ul>
                 </div>
               )}
               {details.gameInfo?.venue?.fullName && (
                 <p className="text-sm text-[var(--text-muted)] mt-4">Local: {details.gameInfo.venue.fullName}</p>
               )}
             </div>
          ) : (
             <div className="text-center text-gray-500">Detalhes não encontrados.</div>
          )}
        </div>
      </div>
    </div>
  );
};

const PremiumWebInterface = ({
  theme,
  setTheme,
  sportConfig,
  leagueConfig,
  currentLeague,
  setCurrentLeague,
  view,
  setView,
  children
}) => (
  <div id="app-layout" className={theme === 'light' ? 'light-mode' : ''}>
    <div id="app-background" style={{ backgroundImage: `url(${leagueConfig.bg})` }}></div>
    
    <div className="premium-wrapper">
      {/* Desktop Sidebar */}
      <aside className="premium-sidebar">
        <div className="premium-logo">W3Labs</div>
        <nav className="premium-nav">
          {sportConfig.views.map((v) => {
            const isActive = view === v.id;
            return (
              <button
                key={v.id}
                onClick={() => setView(v.id)}
                className={`premium-nav-item ${isActive ? 'active' : ''}`}
              >
                {React.cloneElement(v.icon, { 
                  color: isActive ? 'var(--accent)' : 'var(--text-muted)',
                  size: 24
                })}
                <span>{v.name}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Main Feed Area */}
      <main className="premium-main">
        <header className="premium-header">
          <div className="mobile-logo">W3Labs</div>
          <button 
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="w-10 h-10 rounded-full flex items-center justify-center bg-[var(--hover-bg)] text-[var(--text-primary)] transition hover:scale-105"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </header>

        <div className="stories-container">
          {Object.entries(sportConfig.leagues).map(([key, league]) => {
            const isActive = currentLeague === key;
            return (
              <div key={key} className="story-item" onClick={() => setCurrentLeague(key)}>
                <div className={`story-ring ${isActive ? 'active' : ''}`}>
                  <div className="story-avatar">
                    <img src={league.logo} alt={league.name} />
                  </div>
                </div>
                <span className="story-name">{league.name}</span>
              </div>
            );
          })}
        </div>

        {children}
      </main>

      {/* Mobile Bottom Nav */}
      <nav className="mobile-bottom-nav">
        {sportConfig.views.map((v) => {
          const isActive = view === v.id;
          return (
            <button
              key={v.id}
              onClick={() => setView(v.id)}
              className={`mobile-nav-item ${isActive ? 'active' : ''}`}
            >
              {React.cloneElement(v.icon, { 
                color: isActive ? 'var(--accent)' : 'var(--text-muted)',
                size: isActive ? 24 : 22
              })}
            </button>
          );
        })}
      </nav>
    </div>
  </div>
);
const WikiPlayerImage = ({ playerName, defaultImage, className, alt }) => {
  const [imgSrc, setImgSrc] = useState(defaultImage || 'https://via.placeholder.com/150');
  const [triedWiki, setTriedWiki] = useState(false);

  useEffect(() => {
    // Only fetch from Wiki if no valid headshot was provided
    const isPlaceholder = !defaultImage || defaultImage.includes('placeholder.com') || defaultImage.includes('default');
    
    if (isPlaceholder && !triedWiki) {
      const fetchWiki = async () => {
        try {
          const searchRes = await fetch(`https://pt.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(playerName + ' futebol')}&utf8=&format=json&origin=*`);
          const searchData = await searchRes.json();
          
          if (searchData.query?.search?.length > 0) {
            const title = searchData.query.search[0].title;
            const imgRes = await fetch(`https://pt.wikipedia.org/w/api.php?action=query&prop=pageimages&titles=${encodeURIComponent(title)}&pithumbsize=300&format=json&origin=*`);
            const imgData = await imgRes.json();
            const pages = imgData.query?.pages;
            
            if (pages) {
              const pageId = Object.keys(pages)[0];
              if (pages[pageId].thumbnail?.source) {
                setImgSrc(pages[pageId].thumbnail.source);
              }
            }
          }
        } catch (e) {
          console.error("Wiki image fetch failed for", playerName);
        }
        setTriedWiki(true);
      };
      fetchWiki();
    } else if (defaultImage && !isPlaceholder) {
      setImgSrc(defaultImage);
    }
  }, [playerName, defaultImage, triedWiki]);

  return <img src={imgSrc} alt={alt} className={className} />;
};

export default function App() {
  const [currentSport, setCurrentSport] = useState('soccer');
  const [currentLeague, setCurrentLeague] = useState('brasileirao');
  const [view, setView] = useState('matches');
  const [theme, setTheme] = useState('dark');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedMatchId, setSelectedMatchId] = useState(null);

  const [matchesData, setMatchesData] = useState([]);
  const [standingsData, setStandingsData] = useState(null);
  const [newsData, setNewsData] = useState([]);
  const [scorersData, setScorersData] = useState([]);
  const [transmissionData, setTransmissionData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedNewsArticle, setSelectedNewsArticle] = useState(null);
  const [selectedTransmission, setSelectedTransmission] = useState(null);
  const [activeEmbedIndex, setActiveEmbedIndex] = useState(0);

  const sportConfig = SPORTS_DB[currentSport];
  const leagueConfig = sportConfig.leagues[currentLeague];

  // Fetch API Data
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        if (view === 'matches') {
          const dateStr = API_CONFIG.utils.formatDateForEspn(currentDate);
          const res = await fetch(API_CONFIG.espn.scoreboard(currentSport, leagueConfig.id, dateStr));
          const data = await res.json();
          setMatchesData(data.events || []);
        } else if (view === 'standings') {
          const res = await fetch(API_CONFIG.espn.standings(leagueConfig.id));
          const data = await res.json();
          setStandingsData(data);
        } else if (view === 'news') {
          const res = await fetch(API_CONFIG.espn.news(currentSport, leagueConfig.id));
          const data = await res.json();
          setNewsData(data.articles || []);
        } else if (view === 'scorers') {
          const res = await fetch(API_CONFIG.espn.statistics(currentSport, leagueConfig.id));
          const data = await res.json();
          // Find the goalsLeaders array
          const goalsStat = data.stats?.find(s => s.name === 'goalsLeaders' || s.name === 'totalGoals');
          setScorersData(goalsStat?.leaders || []);
        } else if (view === 'transmission') {
          const res = await fetch(API_CONFIG.reidoscanais.sports());
          const json = await res.json();
          setTransmissionData(json.data || []);
        }
      } catch (err) {
        console.error("Failed fetching data", err);
      }
      setLoading(false);
    };
    loadData();
  }, [view, currentLeague, currentDate]);

  // Live update interval for matches
  useEffect(() => {
    let interval;
    if (view === 'matches' && matchesData.some(e => e.status?.type?.state === 'in')) {
      interval = setInterval(async () => {
        try {
          const dateStr = API_CONFIG.utils.formatDateForEspn(currentDate);
          const res = await fetch(API_CONFIG.espn.scoreboard(currentSport, leagueConfig.id, dateStr));
          const data = await res.json();
          setMatchesData(data.events || []);
        } catch (e) { }
      }, 15000);
    }
    return () => clearInterval(interval);
  }, [view, matchesData, currentLeague, currentDate]);

  const mainContent = (
    <div id="main-scroll" className="feed-post p-2 md:p-4">
      {selectedMatchId && <MatchDetailsModal eventId={selectedMatchId} leagueId={leagueConfig.id} onClose={() => setSelectedMatchId(null)} />}

      {loading ? (
        <div className="w-full py-20 flex justify-center"><div className="loader-ring"></div></div>
      ) : (
        <>
          {view === 'matches' && (
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-[var(--text-primary)] flex items-center gap-3">
                  Jogos do Dia
                  <input 
                    type="date" 
                    value={API_CONFIG.utils.formatDateInput(currentDate)}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val) {
                        const [y, m, d] = val.split('-');
                        setCurrentDate(new Date(y, m - 1, d));
                      }
                    }}
                    className="text-sm font-normal bg-black/30 border border-white/10 rounded-lg px-2 py-1 text-white outline-none focus:border-[var(--accent)]"
                  />
                </h2>
              </div>
              {matchesData.length === 0 ? (
                <div className="glass-panel p-10 text-center text-gray-500">Nenhum jogo programado para esta data.</div>
              ) : (
                <div className="premium-grid">
                  {matchesData.map((ev, index) => (
                    <div 
                      key={ev.id} 
                      className="cursor-pointer hover:-translate-y-1 transition duration-300 scoreboard-enter" 
                      style={{ '--stagger-idx': index }}
                      onClick={() => setSelectedMatchId(ev.id)}
                    >
                      <ScoreboardCard event={ev} league={leagueConfig} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {view === 'standings' && standingsData && (
            <div className="max-w-4xl mx-auto">
              <h2 className="text-xl font-bold text-[var(--text-primary)] mb-6">Classificação</h2>
              {standingsData.children?.map((group, idx) => (
                <div key={idx} className="cbf-standings-card mb-8">
                  <div className="cbf-standings-header">
                    <div>#</div><div className="text-left">Clube</div><div className="text-center">Pts</div>
                    <div className="text-center hidden sm:block">J</div><div className="text-center hidden sm:block">V</div>
                    <div className="text-center hidden sm:block">E</div><div className="text-center hidden sm:block">D</div>
                    <div className="text-center hidden sm:block">SG</div><div className="text-center">%</div>
                  </div>
                  {group.standings?.entries?.map((row, rIdx) => {
                    const val = n => row.stats.find(s => s.name === n)?.value || 0;
                    const points = val('points');
                    const gp = val('gamesPlayed');
                    return (
                      <div key={row.team.id} className={`cbf-standings-row`}>
                        <div className={`cbf-rank-cell ${getZoneClass(row.note)}`}><span>{val('rank')}</span></div>
                        <div className="cbf-team-cell">
                          <img src={row.team.logos?.[0]?.href} alt="" />
                          <span className="truncate text-sm">{row.team.shortDisplayName}</span>
                        </div>
                        <span className="cbf-points-cell">{points}</span>
                        <span className="cbf-stats-cell hidden sm:block">{gp}</span>
                        <span className="cbf-stats-cell hidden sm:block">{val('wins')}</span>
                        <span className="cbf-stats-cell hidden sm:block">{val('ties')}</span>
                        <span className="cbf-stats-cell hidden sm:block">{val('losses')}</span>
                        <span className="cbf-stats-cell hidden sm:block">{val('pointDifferential')}</span>
                        <span className="cbf-stats-cell text-xs">{gp > 0 ? Math.round((points / (gp * 3)) * 100) : 0}%</span>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          )}

          {view === 'news' && (
            <div className="max-w-6xl mx-auto">
              <h2 className="text-xl font-bold text-[var(--text-primary)] mb-6">Últimas Notícias</h2>
              <div className="news-widget-grid">
                {newsData.length === 0 ? <div className="text-gray-500">Sem notícias no momento.</div> : newsData.map((n, i) => (
                  <div key={i} onClick={() => setSelectedNewsArticle(n)} className={`glass-panel group relative overflow-hidden flex flex-col cursor-pointer transition duration-300 hover:shadow-2xl hover:shadow-[var(--accent)]/20 hover:-translate-y-1 ${i === 0 ? 'news-hero' : 'news-item'}`}>
                    <div className="news-img-wrapper w-full overflow-hidden bg-black/50 absolute inset-0 z-0">
                      {n.images?.[0]?.url && <img src={n.images[0].url} alt="" className="w-full h-full object-cover group-hover:scale-110 transition duration-700 opacity-60 group-hover:opacity-80" />}
                      <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-[var(--bg-primary)]/80 to-transparent"></div>
                    </div>
                    <div className="p-5 flex flex-col h-full relative z-10 mt-auto">
                      <div className="mt-auto">
                        <p className="text-xs font-bold text-[var(--accent)] flex items-center gap-1 mb-2 uppercase tracking-wider"><Clock size={12} /> {n.published ? new Date(n.published).toLocaleDateString() : 'Recente'}</p>
                        <h3 className={`font-bold leading-snug text-[var(--text-primary)] transition ${i === 0 ? 'text-2xl md:text-3xl' : 'text-lg'}`}>{n.headline}</h3>
                        {i === 0 && <p className="text-sm text-[var(--text-muted)] line-clamp-3 mt-3">{n.description}</p>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {view === 'scorers' && (
            <div className="max-w-4xl mx-auto mb-10">
              <h2 className="text-xl font-bold text-[var(--text-primary)] mb-12">Artilharia</h2>
              
              {scorersData && scorersData.length >= 3 ? (
                <>
                  <div className="podium-container">
                    {/* Posição 2 */}
                    <div className="podium-item podium-2 animate-in slide-in-from-bottom-8 duration-700 delay-100 fill-mode-both">
                      <div className="podium-player">
                        <WikiPlayerImage playerName={scorersData[1].athlete.displayName} defaultImage={scorersData[1].athlete.headshot?.href} alt={scorersData[1].athlete.displayName} />
                        {scorersData[1].team?.logos?.[0]?.href && <div className="podium-team-logo"><img src={scorersData[1].team.logos[0].href} alt=""/></div>}
                      </div>
                      <div className="podium-base base-2">
                        <span className="podium-rank">2º</span>
                        <span className="podium-name">{scorersData[1].athlete.shortName}</span>
                        <span className="podium-goals">{scorersData[1].value} gols</span>
                      </div>
                    </div>
                    
                    {/* Posição 1 */}
                    <div className="podium-item podium-1 animate-in slide-in-from-bottom-12 duration-700 fill-mode-both">
                      <div className="podium-player">
                        <div className="podium-crown">👑</div>
                        <WikiPlayerImage playerName={scorersData[0].athlete.displayName} defaultImage={scorersData[0].athlete.headshot?.href} alt={scorersData[0].athlete.displayName} />
                        {scorersData[0].team?.logos?.[0]?.href && <div className="podium-team-logo"><img src={scorersData[0].team.logos[0].href} alt=""/></div>}
                      </div>
                      <div className="podium-base base-1">
                        <span className="podium-rank">1º</span>
                        <span className="podium-name">{scorersData[0].athlete.shortName}</span>
                        <span className="podium-goals">{scorersData[0].value} gols</span>
                      </div>
                    </div>
                    
                    {/* Posição 3 */}
                    <div className="podium-item podium-3 animate-in slide-in-from-bottom-4 duration-700 delay-200 fill-mode-both">
                      <div className="podium-player">
                        <WikiPlayerImage playerName={scorersData[2].athlete.displayName} defaultImage={scorersData[2].athlete.headshot?.href} alt={scorersData[2].athlete.displayName} />
                        {scorersData[2].team?.logos?.[0]?.href && <div className="podium-team-logo"><img src={scorersData[2].team.logos[0].href} alt=""/></div>}
                      </div>
                      <div className="podium-base base-3">
                        <span className="podium-rank">3º</span>
                        <span className="podium-name">{scorersData[2].athlete.shortName}</span>
                        <span className="podium-goals">{scorersData[2].value} gols</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Restante dos artilheiros */}
                  {scorersData.length > 3 && (
                    <div className="mt-8 glass-panel p-2 animate-in fade-in duration-1000 delay-300 fill-mode-both">
                      {scorersData.slice(3, 10).map((scorer, i) => (
                        <div key={i} className="flex items-center justify-between p-4 border-b border-[var(--border-color)] last:border-0 hover:bg-[var(--hover-bg)] transition rounded-xl">
                          <div className="flex items-center gap-4">
                            <span className="text-lg font-bold text-[var(--text-muted)] w-6 text-center">{i + 4}º</span>
                            <WikiPlayerImage playerName={scorer.athlete.displayName} defaultImage={scorer.athlete.headshot?.href} className="w-12 h-12 rounded-full object-cover bg-[var(--bg-primary)] border border-[var(--border-color)]" alt="" />
                            <div>
                              <p className="font-bold text-[var(--text-primary)]">{scorer.athlete.displayName}</p>
                              <div className="flex items-center gap-2 mt-1">
                                {scorer.team?.logos?.[0]?.href && <img src={scorer.team.logos[0].href} className="w-4 h-4 object-contain" alt=""/>}
                                <span className="text-xs text-[var(--text-muted)]">{scorer.team?.displayName || scorer.team?.name}</span>
                              </div>
                            </div>
                          </div>
                          <div className="text-xl font-bold text-[var(--text-primary)]">{scorer.value} <span className="text-xs text-[var(--text-muted)] font-normal">gols</span></div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <div className="glass-panel p-10 text-center text-[var(--text-muted)]">Carregando artilheiros ou dados indisponíveis para esta liga...</div>
              )}
            </div>
          )}

          {view === 'transmission' && (
            <div className="max-w-6xl mx-auto mb-10">
              <h2 className="text-xl font-bold text-[var(--text-primary)] mb-8 flex items-center gap-2">
                <Tv2 className="text-red-500" /> Transmissões Ao Vivo
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {transmissionData.length === 0 && !loading ? (
                  <div className="col-span-full glass-panel p-10 text-center text-[var(--text-muted)]">Nenhuma transmissão disponível no momento.</div>
                ) : (
                  transmissionData.map((event) => (
                    <div key={event.id} onClick={() => { setSelectedTransmission(event); setActiveEmbedIndex(0); }} className="glass-panel group relative overflow-hidden flex flex-col cursor-pointer transition duration-300 hover:shadow-2xl hover:shadow-red-500/20 hover:-translate-y-1">
                      <div className="aspect-video w-full overflow-hidden bg-black/50 relative">
                        {event.poster && <img src={event.poster} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500 opacity-80" />}
                        <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded animate-pulse shadow-lg">
                          {event.status === 'live' ? 'AO VIVO' : 'EM BREVE'}
                        </div>
                        <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs font-bold px-2 py-1 rounded backdrop-blur-md">
                          {new Date(event.start_timestamp * 1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                        </div>
                      </div>
                      <div className="p-4 flex flex-col h-full bg-[var(--bg-primary)]">
                        <p className="text-xs font-bold text-[var(--accent)] mb-1 uppercase tracking-wider">{event.competition}</p>
                        <h3 className="font-bold text-lg leading-snug text-[var(--text-primary)] group-hover:text-red-500 transition line-clamp-2">{event.title}</h3>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {view === 'clubs' && <WikiSearch />}
          
          {/* Transmission Player Modal */}
          {selectedTransmission && (
            <div className="fixed inset-0 z-[70] flex items-center justify-center p-0 md:p-4 bg-black/90 backdrop-blur-md" onClick={() => setSelectedTransmission(null)}>
              <div className="bg-[#0f0f13] border border-white/10 md:rounded-2xl w-full h-full md:h-auto max-w-5xl flex flex-col shadow-2xl relative animate-in fade-in zoom-in duration-300 overflow-hidden" onClick={e => e.stopPropagation()}>
                
                <div className="flex items-center justify-between p-4 border-b border-white/10 bg-black/40">
                  <h3 className="font-bold text-white flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                    {selectedTransmission.title}
                  </h3>
                  <button onClick={() => setSelectedTransmission(null)} className="w-8 h-8 rounded-full bg-white/10 hover:bg-red-500 text-white flex items-center justify-center transition">
                    <X size={18} />
                  </button>
                </div>
                
                <div className="w-full aspect-video bg-black relative">
                  {selectedTransmission.embeds && selectedTransmission.embeds.length > 0 ? (
                    <iframe 
                      src={selectedTransmission.embeds[activeEmbedIndex].embed_url} 
                      className="w-full h-full absolute inset-0"
                      allowFullScreen 
                      frameBorder="0"
                      scrolling="no"
                      allow="encrypted-media"
                    ></iframe>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-500">Transmissão indisponível</div>
                  )}
                </div>
                
                <div className="p-4 bg-[#0f0f13] flex flex-wrap gap-2">
                  {selectedTransmission.embeds?.map((embed, idx) => (
                    <button 
                      key={idx}
                      onClick={() => setActiveEmbedIndex(idx)}
                      className={`px-4 py-2 rounded-lg text-sm font-bold transition ${activeEmbedIndex === idx ? 'bg-red-600 text-white shadow-lg shadow-red-500/20' : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'}`}
                    >
                      {embed.provider} ({embed.quality})
                    </button>
                  ))}
                </div>
                
              </div>
            </div>
          )}
          
          {selectedNewsArticle && (
            <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md" onClick={() => setSelectedNewsArticle(null)}>
              <div className="bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl relative animate-in fade-in zoom-in duration-300" onClick={e => e.stopPropagation()}>
                <button 
                  onClick={() => setSelectedNewsArticle(null)}
                  className="absolute top-4 right-4 w-10 h-10 bg-black/50 hover:bg-[var(--accent)] rounded-full flex items-center justify-center text-white z-10 transition backdrop-blur-md"
                >
                  <X size={20} />
                </button>
                {selectedNewsArticle.images?.[0]?.url && (
                  <div className="w-full h-64 md:h-96 relative">
                    <img src={selectedNewsArticle.images[0].url} alt="" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-[var(--bg-primary)]/40 to-transparent"></div>
                  </div>
                )}
                <div className={`p-6 md:p-10 ${selectedNewsArticle.images?.[0]?.url ? '-mt-24 relative z-10' : ''}`}>
                  <p className="text-sm font-bold text-[var(--accent)] flex items-center gap-2 mb-3 uppercase tracking-wider"><Clock size={14} /> {selectedNewsArticle.published ? new Date(selectedNewsArticle.published).toLocaleDateString() : 'Recente'}</p>
                  <h2 className="text-2xl md:text-4xl font-black text-[var(--text-primary)] mb-6 leading-tight">{selectedNewsArticle.headline}</h2>
                  <div className="text-[var(--text-secondary)] text-lg leading-relaxed mb-8 space-y-4" dangerouslySetInnerHTML={{ __html: selectedNewsArticle.story || selectedNewsArticle.description }} />
                  
                  {selectedNewsArticle.links?.web?.href && (
                    <a href={selectedNewsArticle.links.web.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-[var(--accent)] hover:bg-blue-600 text-white font-bold py-4 px-8 rounded-xl transition shadow-xl shadow-[var(--accent)]/30">
                      Ler Artigo Completo na ESPN <ExternalLink size={20} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );

  return (
    <PremiumWebInterface
      theme={theme}
      setTheme={setTheme}
      sportConfig={sportConfig}
      leagueConfig={leagueConfig}
      currentLeague={currentLeague}
      setCurrentLeague={setCurrentLeague}
      view={view}
      setView={setView}
    >
      {mainContent}
    </PremiumWebInterface>
  );
}