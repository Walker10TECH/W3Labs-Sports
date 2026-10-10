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
            "brasileirao": {
                id: "bra.1", apiFootballId: 71, seasonId: 2026, name: "Brasileirão Série A",
                logo: "https://www.ogol.com.br//img/logos/edicoes/184443_imgbank_.png",
                bg: "https://s2-globo-play.glbimg.com/rHTMAA96-XWwbs6h4pEWeZXlREw=/https://s2.glbimg.com/aNGo_xeD86fO2XMCGBRlpe7rmmg=/i.s3.glbimg.com/v1/AUTH_c3c606ff68e7478091d1ca496f9c5625/internal_photos/bs/2025/L/P/Y3zKUbSTWAUtZN86BTzg/2025-4731-brasileirao-background.jpg",
                clubs: ["Clube_Atlético_Mineiro", "Esporte_Clube_Bahia", "Botafogo_de_Futebol_e_Regatas", "Ceará_Sporting_Club", "Sport_Club_Corinthians_Paulista", "Cruzeiro_Esporte_Clube", "Clube_de_Regatas_do_Flamengo", "Fluminense_Football_Club", "Fortaleza_Esporte_Clube", "Grêmio_Foot-Ball_Porto_Alegrense", "Sport_Club_Internacional", "Esporte_Clube_Juventude", "Mirassol_Futebol_Clube", "Sociedade_Esportiva_Palmeiras", "Red_Bull_Bragantino", "Santos_Futebol_Clube", "São_Paulo_Futebol_Clube", "Sport_Club_do_Recife", "Club_de_Regatas_Vasco_da_Gama", "Esporte_Clube_Vitória"],
                logoOverrides: {
                    "Atlético-MG": "https://a.espncdn.com/i/teamlogos/soccer/500/3445.png",
                    "Bahia": "https://a.espncdn.com/i/teamlogos/soccer/500/3441.png",
                    "Botafogo": "https://a.espncdn.com/i/teamlogos/soccer/500/205.png",
                    "Ceará SC": "https://a.espncdn.com/i/teamlogos/soccer/500/3442.png",
                    "Corinthians": "https://a.espncdn.com/i/teamlogos/soccer/500/874.png",
                    "Cruzeiro": "https://a.espncdn.com/i/teamlogos/soccer/500/2026.png",
                    "Flamengo": "https://a.espncdn.com/i/teamlogos/soccer/500/819.png",
                    "Fluminense": "https://a.espncdn.com/i/teamlogos/soccer/500/206.png",
                    "Fortaleza": "https://a.espncdn.com/i/teamlogos/soccer/500/3443.png",
                    "Grêmio": "https://a.espncdn.com/i/teamlogos/soccer/500/824.png",
                    "Internacional": "https://a.espncdn.com/i/teamlogos/soccer/500/826.png",
                    "Juventude": "https://a.espncdn.com/i/teamlogos/soccer/500/3450.png",
                    "Mirassol": "https://a.espncdn.com/i/teamlogos/soccer/500/4433.png",
                    "Palmeiras": "https://a.espncdn.com/i/teamlogos/soccer/500/2029.png",
                    "Red Bull Bragantino": "https://a.espncdn.com/i/teamlogos/soccer/500/3447.png",
                    "Santos": "https://a.espncdn.com/i/teamlogos/soccer/500/837.png",
                    "São Paulo": "https://a.espncdn.com/i/teamlogos/soccer/500/2030.png",
                    "Sport Recife": "https://a.espncdn.com/i/teamlogos/soccer/500/838.png",
                    "Vasco da Gama": "https://a.espncdn.com/i/teamlogos/soccer/500/2031.png",
                    "Vitória": "https://a.espncdn.com/i/teamlogos/soccer/500/3454.png"
                }
            },
            "brasileiraob": {
                id: "bra.2", apiFootballId: 72, seasonId: 2026, name: "Brasileirão Série B",
                logo: "https://upload.wikimedia.org/wikipedia/pt/d/d6/Campeonato_Brasileiro_de_Futebol_S%C3%A9rie_B.png",
                bg: "https://s2-globo-play.glbimg.com/rHTMAA96-XWwbs6h4pEWeZXlREw=/https://s2.glbimg.com/aNGo_xeD86fO2XMCGBRlpe7rmmg=/i.s3.glbimg.com/v1/AUTH_c3c606ff68e7478091d1ca496f9c5625/internal_photos/bs/2025/L/P/Y3zKUbSTWAUtZN86BTzg/2025-4731-brasileirao-background.jpg",
                clubs: ["Goiás_Esporte_Clube", "Sport_Club_do_Recife", "Ceará_Sporting_Club", "América_Futebol_Clube_(Minas_Gerais)", "Coritiba_Foot_Ball_Club", "Vila_Nova_Futebol_Clube", "Clube_de_Regatas_Brasil", "Grêmio_Novorizontino", "Mirassol_Futebol_Clube", "Operário_Ferroviário_Esporte_Clube", "Amazonas_Futebol_Clube", "Avaí_Futebol_Clube", "Associação_Chapecoense_de_Futebol", "Paysandu_Sport_Club", "Botafogo_Futebol_Clube_(Ribeirão_Preto)", "Guarani_Futebol_Clube", "Associação_Atlética_Ponte_Preta", "Ituano_Futebol_Clube", "Brusque_Futebol_Clube"],
                logoOverrides: {
                    "Goiás": "https://a.espncdn.com/i/teamlogos/soccer/500/825.png",
                    "Sport Recife": "https://a.espncdn.com/i/teamlogos/soccer/500/838.png",
                    "Ceará SC": "https://a.espncdn.com/i/teamlogos/soccer/500/3442.png",
                    "América-MG": "https://a.espncdn.com/i/teamlogos/soccer/500/2025.png",
                    "Coritiba": "https://a.espncdn.com/i/teamlogos/soccer/500/2027.png",
                    "Vila Nova": "https://a.espncdn.com/i/teamlogos/soccer/500/3453.png",
                    "CRB": "https://a.espncdn.com/i/teamlogos/soccer/500/3457.png",
                    "Grêmio Novorizontino": "https://a.espncdn.com/i/teamlogos/soccer/500/19881.png",
                    "Mirassol": "https://a.espncdn.com/i/teamlogos/soccer/500/4433.png",
                    "Operário-PR": "https://a.espncdn.com/i/teamlogos/soccer/500/19880.png",
                    "Amazonas": "https://a.espncdn.com/i/teamlogos/soccer/500/22131.png",
                    "Avaí": "https://a.espncdn.com/i/teamlogos/soccer/500/3440.png",
                    "Chapecoense": "https://a.espncdn.com/i/teamlogos/soccer/500/4432.png",
                    "Paysandu": "https://a.espncdn.com/i/teamlogos/soccer/500/3461.png",
                    "Botafogo-SP": "https://a.espncdn.com/i/teamlogos/soccer/500/3456.png",
                    "Guarani": "https://a.espncdn.com/i/teamlogos/soccer/500/876.png",
                    "Ponte Preta": "https://a.espncdn.com/i/teamlogos/soccer/500/2028.png",
                    "Ituano": "https://a.espncdn.com/i/teamlogos/soccer/500/4434.png",
                    "Brusque": "https://a.espncdn.com/i/teamlogos/soccer/500/19879.png"
                }
            },
            "copadobrasil": {
                id: "bra.copa_do_brazil", apiFootballId: 73, seasonId: 2026, name: "Copa do Brasil",
                logo: "https://cdn-img.zerozero.pt/img/logos/competicoes/260_imgbank_cb_20250227155245.png",
                bg: "https://s2-globo-play.glbimg.com/rHTMAA96-XWwbs6h4pEWeZXlREw=/https://s2.glbimg.com/aNGo_xeD86fO2XMCGBRlpe7rmmg=/i.s3.glbimg.com/v1/AUTH_c3c606ff68e7478091d1ca496f9c5625/internal_photos/bs/2025/L/P/Y3zKUbSTWAUtZN86BTzg/2025-4731-brasileirao-background.jpg",
                clubs: ["Clube_Atlético_Mineiro", "Esporte_Clube_Bahia", "Botafogo_de_Futebol_e_Regatas", "Ceará_Sporting_Club", "Sport_Club_Corinthians_Paulista", "Cruzeiro_Esporte_Clube", "Clube_de_Regatas_do_Flamengo", "Fluminense_Football_Club", "Fortaleza_Esporte_Clube", "Grêmio_Foot-Ball_Porto_Alegrense", "Sport_Club_Internacional", "Esporte_Clube_Juventude", "Mirassol_Futebol_Clube", "Sociedade_Esportiva_Palmeiras", "Red_Bull_Bragantino", "Santos_Futebol_Clube", "São_Paulo_Futebol_Clube", "Sport_Club_do_Recife", "Club_de_Regatas_Vasco_da_Gama", "Esporte_Clube_Vitória", "Cuiabá_Esporte_Clube"],
                logoOverrides: {
                    "Atlético-MG": "https://a.espncdn.com/i/teamlogos/soccer/500/3445.png",
                    "Bahia": "https://a.espncdn.com/i/teamlogos/soccer/500/3441.png",
                    "Botafogo": "https://a.espncdn.com/i/teamlogos/soccer/500/205.png",
                    "Ceará SC": "https://a.espncdn.com/i/teamlogos/soccer/500/3442.png",
                    "Corinthians": "https://a.espncdn.com/i/teamlogos/soccer/500/874.png",
                    "Cruzeiro": "https://a.espncdn.com/i/teamlogos/soccer/500/2026.png",
                    "Flamengo": "https://a.espncdn.com/i/teamlogos/soccer/500/819.png",
                    "Fluminense": "https://a.espncdn.com/i/teamlogos/soccer/500/206.png",
                    "Fortaleza": "https://a.espncdn.com/i/teamlogos/soccer/500/3443.png",
                    "Grêmio": "https://a.espncdn.com/i/teamlogos/soccer/500/824.png",
                    "Internacional": "https://a.espncdn.com/i/teamlogos/soccer/500/826.png",
                    "Juventude": "https://a.espncdn.com/i/teamlogos/soccer/500/3450.png",
                    "Mirassol": "https://a.espncdn.com/i/teamlogos/soccer/500/4433.png",
                    "Palmeiras": "https://a.espncdn.com/i/teamlogos/soccer/500/2029.png",
                    "Red Bull Bragantino": "https://a.espncdn.com/i/teamlogos/soccer/500/3447.png",
                    "Santos": "https://a.espncdn.com/i/teamlogos/soccer/500/837.png",
                    "São Paulo": "https://a.espncdn.com/i/teamlogos/soccer/500/2030.png",
                    "Sport Recife": "https://a.espncdn.com/i/teamlogos/soccer/500/838.png",
                    "Vasco da Gama": "https://a.espncdn.com/i/teamlogos/soccer/500/2031.png",
                    "Vitória": "https://a.espncdn.com/i/teamlogos/soccer/500/3454.png",
                    "Cuiabá": "https://a.espncdn.com/i/teamlogos/soccer/500/10091.png"
                }
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
        search: (query) => `${API_CONFIG.wikipedia.base}?action=query&list=search&srsearch=${encodeURIComponent(query)}&format=json&origin=*`,
        detail: (title) => `${API_CONFIG.wikipedia.base}?action=query&prop=extracts|pageimages&exintro&explaintext&pithumbsize=500&titles=${encodeURIComponent(title)}&format=json&origin=*`,
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
    openF1: {
        base: 'https://api.openf1.org/v1',
    },
    utils: {
        formatDateForEspn: (date) => {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}${month}${day}`;
        }
    }
};

const app = {
    formations: {
        '4-3-3': [{ t: 90, l: 50 }, { t: 75, l: 85 }, { t: 78, l: 60 }, { t: 78, l: 40 }, { t: 75, l: 15 }, { t: 55, l: 50 }, { t: 45, l: 70 }, { t: 45, l: 30 }, { t: 20, l: 80 }, { t: 25, l: 50 }, { t: 20, l: 20 }],
        '4-4-2': [{ t: 90, l: 50 }, { t: 75, l: 85 }, { t: 78, l: 60 }, { t: 78, l: 40 }, { t: 75, l: 15 }, { t: 50, l: 80 }, { t: 55, l: 60 }, { t: 55, l: 40 }, { t: 50, l: 20 }, { t: 20, l: 60 }, { t: 20, l: 40 }],
        '3-5-2': [{ t: 90, l: 50 }, { t: 78, l: 75 }, { t: 80, l: 50 }, { t: 78, l: 25 }, { t: 50, l: 85 }, { t: 55, l: 60 }, { t: 55, l: 40 }, { t: 50, l: 15 }, { t: 35, l: 50 }, { t: 20, l: 65 }, { t: 20, l: 35 }],
        '4-2-3-1': [{ t: 90, l: 50 }, { t: 75, l: 85 }, { t: 78, l: 60 }, { t: 78, l: 40 }, { t: 75, l: 15 }, { t: 60, l: 65 }, { t: 60, l: 35 }, { t: 35, l: 80 }, { t: 35, l: 50 }, { t: 35, l: 20 }, { t: 15, l: 50 }],
        'default': [{ t: 90, l: 50 }, { t: 75, l: 15 }, { t: 75, l: 40 }, { t: 75, l: 60 }, { t: 75, l: 85 }, { t: 50, l: 25 }, { t: 50, l: 50 }, { t: 50, l: 75 }, { t: 25, l: 20 }, { t: 25, l: 50 }, { t: 25, l: 80 }]
    },

    triggerStartOfGameAnimation(eventId) {
        const elSogOverlay = document.getElementById(`sog-overlay-${eventId}`);
        if (!elSogOverlay) return;

        elSogOverlay.classList.remove('active');
        setTimeout(() => elSogOverlay.classList.add('active'), 50);

        setTimeout(() => { elSogOverlay.classList.remove('active'); }, 4000);
    },

    state: { currentSport: 'soccer', currentLeague: 'brasileirao', currentDate: new Date(), view: 'matches', selectedSeason: 2026, currentMatchData: null, theme: 'dark', espnTeamsCache: {}, f1ScoreboardCache: {}, scorersCache: {}, playerDatabaseCache: null, matchTimerInterval: null, matchCardTimers: [], liveUpdateInterval: null, goalIntervals: {}, pipWindow: null, liveModalUpdateInterval: null },

    init() {
        try {
            this.initTheme();
            this.renderSportsNav();
            this.renderPrimaryNavigation();
            this.renderSeasonSelector();
            this.setupEvents();
            this.loadDataForView();
            setTimeout(() => document.getElementById('global-loader').classList.add('opacity-0', 'pointer-events-none'), 800);
        } catch (e) { console.error("W3Labs Init Error:", e); }
    },

    initTheme() {
        const savedTheme = localStorage.getItem('sporting_theme');
        if (savedTheme) {
            this.setTheme(savedTheme);
        } else {
            this.setTheme('dark');
        }
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
            moon.classList.remove('hidden');
            sun.classList.add('hidden');
        } else {
            document.body.classList.remove('light-mode');
            moon.classList.add('hidden');
            sun.classList.remove('hidden');
        }
        localStorage.setItem('sporting_theme', theme);
    },

    async getEspnLeagueTeams(leagueId) {
        if (this.state.espnTeamsCache[leagueId]) {
            return this.state.espnTeamsCache[leagueId];
        }
        try {
            const res = await fetch(API_CONFIG.espn.teams('soccer', leagueId));
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
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
            flatpickr("#date-picker", { defaultDate: "today", dateFormat: "d/m/Y", locale: "pt", onChange: (selectedDates) => { this.state.currentDate = selectedDates[0]; if (this.state.view === 'matches') this.loadDataForView(); } });
        }
        const seasonSelector = document.getElementById('season-selector');
        if (seasonSelector) { seasonSelector.addEventListener('change', (e) => { this.state.selectedSeason = e.target.value; if (this.state.view === 'scorers') this.fetchScorers(this.state.currentLeague); }); }

        const gsi = document.getElementById('global-search-input');
        if (gsi) {
            gsi.addEventListener('input', (e) => this.handleGlobalSearch(e.target.value));
            gsi.addEventListener('focus', (e) => {
                if (e.target.value.length > 1) { document.getElementById('global-search-results').classList.remove('hidden'); }
            });
            document.addEventListener('click', (e) => {
                const searchContainer = gsi.parentElement;
                if (searchContainer && !searchContainer.contains(e.target)) {
                    document.getElementById('global-search-results').classList.add('hidden');
                }
            });
        }
        document.getElementById('wiki-search-input')?.addEventListener('keypress', (e) => { if (e.key === 'Enter') this.searchWiki(); });
    },

    renderSeasonSelector() {
        const sel = document.getElementById('season-selector');
        if (!sel) return;
        sel.innerHTML = '';
        for (let i = 0; i < 5; i++) { const opt = document.createElement('option'); opt.value = 2026 - i; opt.innerText = 2026 - i; sel.appendChild(opt); }
    },

    loadPlayerDatabase() {
        if (this.state.playerDatabaseCache) {
            return this.state.playerDatabaseCache;
        }
        this.state.playerDatabaseCache = (typeof PLAYER_DB_DATA !== 'undefined') ? PLAYER_DB_DATA : { soccer: {} };
        return this.state.playerDatabaseCache;
    },

    async handleGlobalSearch(query) {
        const resultsContainer = document.getElementById('global-search-results');
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
            // Busca de jogadores (se DB estiver preenchido)
            const playerDB = this.loadPlayerDatabase();
            if (playerDB.soccer && Object.keys(playerDB.soccer).length > 0) {
                Object.keys(playerDB.soccer).forEach(leagueKey => {
                    const league = SPORTS_DB.soccer.leagues[leagueKey] || Object.values(SPORTS_DB.soccer.leagues).find(l => l.id === leagueKey);
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

            // Busca de clubes
            const leagueKey = this.state.currentLeague;
            const league = SPORTS_DB.soccer.leagues[leagueKey];
            const espnTeams = await this.getEspnLeagueTeams(league.id);

            espnTeams.forEach(team => {
                const displayName = team.displayName;
                if (displayName.toLowerCase().includes(lowerQuery)) {
                    const logoUrl = team.logos?.[0]?.href;
                    const clubWikiName = league.clubs.find(c => c.replace(/_/g, ' ').toLowerCase() === team.name.toLowerCase()) || team.name.replace(/ /g, '_');
                    results.push({
                        type: 'club', name: displayName, subtitle: league.name, logo: logoUrl,
                        action: () => { this.showTeamSchedule(team.id, team.displayName, logoUrl, clubWikiName); }
                    });
                }
            });
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
            item.onclick = () => { result.action(); resultsContainer.classList.add('hidden'); document.getElementById('global-search-input').value = ''; };
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
        const sidebarLeagues = document.getElementById('sidebar-league-list').parentElement;
        const navCard = document.querySelector('.nav-card');
        const bottomNav = document.querySelector('.bottom-nav');

        document.getElementById('header-sport-name').innerText = sport.name;

        // Sidebar Nav Buttons
        navCard.innerHTML = sport.views.map(v =>
            `<button onclick="app.setView('${v.id}')" class="nav-btn" id="desk-nav-${v.id}"><i data-lucide="${v.icon}" class="w-5 h-5"></i> ${v.name}</button>`
        ).join('');

        // Bottom Nav Buttons
        let bottomNavHtml = sport.views.map(v =>
            `<button class="bottom-nav-item" onclick="app.setView('${v.id}')" id="mob-nav-${v.id}"><i data-lucide="${v.icon}"></i><span>${v.name.split(' ')[0]}</span></button>`
        ).join('');

        if (this.state.currentSport === 'soccer') {
            sidebarLeagues.style.display = 'block';
            this.renderLeagueNav();
        } else {
            sidebarLeagues.style.display = 'none';
        }
        bottomNav.innerHTML = bottomNavHtml;

        this.updateActiveNav(this.state.view);
        if (window.lucide) lucide.createIcons();
    },

    renderLeagueNav() {
        const sidebar = document.getElementById('sidebar-league-list');
        const mobList = document.getElementById('mob-league-list');
        if (sidebar) sidebar.innerHTML = ''; if (mobList) mobList.innerHTML = '';

        Object.entries(SPORTS_DB.soccer.leagues).forEach(([key, league]) => {
            // Sidebar Item
            if (sidebar) {
                const sideItem = document.createElement('button');
                sideItem.className = 'w-full text-left p-2 px-3 rounded-xl hover:bg-white/10 flex items-center gap-3 text-sm text-gray-400 hover:text-white transition group';
                sideItem.innerHTML = `<img src="${league.logo}" class="w-6 h-6 object-contain group-hover:scale-110 transition" onerror="this.style.display='none'"> <span class="font-medium">${league.name}</span>`;
                sideItem.onclick = () => this.changeSoccerLeague(key);
                sidebar.appendChild(sideItem);
            }
            // Mobile Item
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
        if (sportKey === 'soccer') {
            this.state.currentLeague = 'brasileirao';
        } else {
            this.state.currentLeague = null;
        }

        this.renderPrimaryNavigation();
        this.loadDataForView();
    },

    changeSoccerLeague(key) {
        this.state.currentLeague = key;
        this.loadDataForView();

        // Oculta a sidebar automaticamente no mobile após escolher uma nova liga
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
            const dateStr = API_CONFIG.utils.formatDateForEspn(this.state.currentDate);

            setText('header-league-name', league.name); // Usado em logica interna
            setSrc('mob-league-logo', league.logo);
            setText('page-league-name', league.name);
            setSrc('page-league-logo', league.logo); // IDs virtuais, mantidos pela lógica
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
            const res = await fetch(API_CONFIG.espn.scoreboard('soccer', id, date));
            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

            this.state.matchCardTimers.forEach(clearInterval);
            this.state.matchCardTimers = [];

            const data = await res.json();
            this.renderMatches(data.events || []);

            if (data.events && data.events.some(e => e.status.type.state === 'in')) {
                this.state.liveUpdateInterval = setInterval(() => this.updateLiveMatches(), 15000);
            }
        } catch (e) { console.error("Erro ao carregar partidas:", e); grid.innerHTML = '<div class="text-center text-red-400 col-span-full">Erro ao carregar partidas.</div>'; }
    },

    renderMatches(events) {
        const grid = document.getElementById('matches-grid'); if (!grid) return; grid.innerHTML = '';
        if (!events.length) { grid.innerHTML = '<div class="text-center text-gray-500 col-span-full py-10 font-medium">Nenhum jogo programado para hoje.</div>'; return; }
        const lConfig = SPORTS_DB.soccer.leagues[this.state.currentLeague];
        const liveIndicator = document.getElementById('live-indicator');
        if (liveIndicator) liveIndicator.classList.toggle('hidden', !events.some(e => e.status.type.state === 'in'));

        events.forEach((ev, index) => {
            const comp = ev.competitions[0];
            const home = comp.competitors.find(c => c.homeAway === 'home');
            const away = comp.competitors.find(c => c.homeAway === 'away');
            const status = ev.status?.type;
            const displayClock = ev.status?.displayClock;
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
            } else if (lConfig.id === 'bra.camp.gaucho') {
                this.playGauchaoIntro(ev.id, index);
            } else {
                this.playBrasileiraoIntro(ev.id, index);
            }
            if (status.state === 'in') {
                const timerId = this.startLiveCardTimer(ev.id, comp.status);
                this.state.matchCardTimers.push(timerId);
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

        // Conditional rendering based on league
        if (['bra.1', 'bra.2', 'bra.copa_do_brazil'].includes(lConfig.id)) { // NOVO CBF Theme
            const homeTeamColor = home.team.color ? `#${home.team.color}` : '#0d80bf';
            const awayTeamColor = away.team.color ? `#${away.team.color}` : '#e50e18';
            const timeBoxColor = lConfig.id === 'bra.2' ? '#FFD700' : '#c9f500'; // Amarelo para Série B
            return `
                        <div class="cbf-widget-container" id="widgetContainer-${ev.id}" ${scaleStyle}>
                            <div class="cbf-scoreboard-wrapper" id="scoreboardWrapper-${ev.id}">
                                <!-- Barra Branca de Fundo -->
                                <div class="cbf-main-bar">
                                    <!-- Lado Esquerdo -->
                                    <div class="cbf-team-side cbf-team-left" id="homeBox-${ev.id}" data-color="#${home.team.color || '0b071a'}" data-logo="${home.team.logo}">
                                        <img src="${home.team.logo}" alt="${home.team.abbreviation}" class="cbf-logo">
                                        <span class="cbf-team-name">${home.team.abbreviation}</span>
                                        <div class="cbf-shape-left" style="background-color: ${homeTeamColor};"></div>
                                    </div>
                                    <!-- Lado Direito -->
                                    <div class="cbf-team-side cbf-team-right" id="awayBox-${ev.id}" data-color="#${away.team.color || '0b071a'}" data-logo="${away.team.logo}">
                                        <div class="cbf-shape-right" style="background-color: ${awayTeamColor};"></div>
                                        <span class="cbf-team-name">${away.team.abbreviation}</span>
                                        <img src="${away.team.logo}" alt="${away.team.abbreviation}" class="cbf-logo">
                                    </div>
                                </div>
                                <!-- Barra de Tempo -->
                                <div class="cbf-time-box" id="timer-pill-${ev.id}" style="background-color: ${timeBoxColor};">
                                    <span class="cbf-time-text">${status?.state === 'in' ? (displayClock || "45:00").replace("'", "") : (status?.shortDetail || 'FIM')}</span>
                                </div>
                                <!-- Caixa do Placar Central -->
                                <div class="cbf-score-box">
                                    <span class="cbf-score-number" id="score-home-${ev.id}">${home.score || '0'}</span>
                                    <span class="cbf-score-divider">|</span>
                                    <span class="cbf-score-number" id="score-away-${ev.id}">${away.score || '0'}</span>
                                </div>

                                <!-- Animação Gigante de Gol -->
                                <div class="cbf-goal-banner" id="goalBanner-${ev.id}">
                                    <div class="cbf-goal-left">
                                        <img src="" class="cbf-goal-logo-img" id="goalLogo-${ev.id}">
                                    </div>
                                    <div class="cbf-goal-right">
                                        <span class="cbf-goal-text" id="goalText-${ev.id}">GOOOOOOOOOOL</span>
                                        <!-- Mascote Genérico -->
                                        <img src="https://cdn-icons-png.flaticon.com/512/53/53283.png" class="cbf-goal-mascot-img" id="goalMascot-${ev.id}">
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
        } else if (lConfig.id === 'ita.1') { // Serie A Theme
            const homeTeamColor = home.team.color ? `#${home.team.color}` : '#030833';
            const awayTeamColor = away.team.color ? `#${away.team.color}` : '#d11b27';

            const darkenColor = (hex, percent) => {
                if (!hex) return '#000000';
                hex = hex.replace('#', '');
                if (hex.length === 3) hex = hex.split('').map(x => x + x).join('');
                let r = parseInt(hex.substring(0, 2), 16);
                let g = parseInt(hex.substring(2, 4), 16);
                let b = parseInt(hex.substring(4, 6), 16);
                r = parseInt(r * (100 - percent) / 100);
                g = parseInt(g * (100 - percent) / 100);
                b = parseInt(b * (100 - percent) / 100);
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
                                <!-- 3D Layers -->
                                <div class="sa-piece sa-layer-3d sa-home-3d" style="background: ${homeDark}"></div>
                                <div class="sa-piece sa-layer-3d sa-away-3d" style="background: ${awayDark}"></div>
                                
                                <div class="sa-piece sa-layer-3d sa-accent-l-3d" style="background: ${darkenColor(homeAccentDark, 40)}"></div>
                                <div class="sa-piece sa-layer-3d sa-accent-r-3d" style="background: ${darkenColor(awayAccentDark, 40)}"></div>
                                
                                <div class="sa-piece sa-layer-3d sa-score-l-3d"></div>
                                <div class="sa-piece sa-layer-3d sa-score-r-3d"></div>

                                <!-- Front Layers -->
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

                                <!-- Timer & Shield -->
                                <div class="sa-timer-panel" id="timer-pill-${ev.id}"><span>${status?.state === 'in' ? (displayClock || "45:00").replace("'", "") : (status?.shortDetail || 'FIM')}</span></div>
                                <div class="sa-shield-container"><div class="sa-shield-base"></div><div class="sa-shield-outer"></div><div class="sa-shield-inner"><img src="${lConfig.logo}" alt="Serie A" class="sa-serie-a-logo"></div></div>
                            </div>
                        </div>
                    `;
        } else if (lConfig.id === 'conmebol.libertadores') { // Libertadores Theme
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
                        </div>
                    `;
        } else if (lConfig.id === 'bra.camp.gaucho') { // Modern Scoreboard Theme (Gauchão style)
            const theme = lConfig.theme || {};
            const homeTeamColor = home.team.color ? `#${home.team.color}` : (theme.teamColorFallbackHome || '#0d80bf');
            const awayTeamColor = away.team.color ? `#${away.team.color}` : (theme.teamColorFallbackAway || '#e50e18');

            const themeStyle = lConfig.theme
                ? `style="--ga-bg: ${lConfig.theme.scoreboardBg}; --ga-text: ${lConfig.theme.scoreboardText};"`
                : '';

            const flagColors = lConfig.flagColors || [];
            let flagGradientStyle = '';
            if (flagColors.length > 0) {
                const stops = flagColors.map((color, index) => {
                    const start = (100 / flagColors.length) * index;
                    const end = (100 / flagColors.length) * (index + 1);
                    return `${color} ${start}%, ${color} ${end}%`;
                }).join(', ');
                flagGradientStyle = `style="--flag-gradient: linear-gradient(90deg, ${stops})"`;
            }

            return `
                        <div class="ga-widget-container" id="widgetContainer-${ev.id}" ${themeStyle} ${scaleStyle}>
                            <div class="ga-scoreboard-bar">
                                <div class="ga-team-box ga-home-team" id="homeBox-${ev.id}">
                                    <div class="ga-team-color-strip ga-home-strip" id="homeStrip-${ev.id}" style="background-color: ${homeTeamColor};"></div>
                                    <div class="ga-team-text-wrapper" id="homeText-${ev.id}"><span class="ga-team-name">${home.team.abbreviation}</span></div>
                                    <div class="ga-goal-overlay" id="homeGoalOverlay-${ev.id}" style="background-color: ${homeTeamColor};">
                                        <img src="${home.team.logo}" class="ga-team-logo-anim">
                                        <div class="ga-goal-word"><span class="ga-letter l1">G</span><span class="ga-letter l2">O</span><span class="ga-letter l3">L</span></div>
                                    </div>
                                </div>
                                <div class="ga-match-center" id="matchCenter-${ev.id}" ${flagGradientStyle}>
                                    <div class="ga-score" id="score-home-${ev.id}">${home.score || '0'}</div>
                                    <div class="ga-logo-container"><img src="${lConfig.logo}" class="ga-logo-img" alt="League Logo"></div>
                                    <div class="ga-score" id="score-away-${ev.id}">${away.score || '0'}</div>
                                </div>
                                <div class="ga-team-box ga-away-team" id="awayBox-${ev.id}">
                                    <div class="ga-team-color-strip ga-away-strip" id="awayStrip-${ev.id}" style="background-color: ${awayTeamColor};"></div>
                                    <div class="ga-team-text-wrapper" id="awayText-${ev.id}"><span class="ga-team-name">${away.team.abbreviation}</span></div>
                                    <div class="ga-goal-overlay" id="awayGoalOverlay-${ev.id}" style="background-color: ${awayTeamColor};">
                                        <img src="${away.team.logo}" class="ga-team-logo-anim">
                                        <div class="ga-goal-word"><span class="ga-letter l1">G</span><span class="ga-letter l2">O</span><span class="ga-letter l3">L</span></div>
                                    </div>
                                </div>
                            </div>
                            <div class="ga-timer-container" id="timer-pill-${ev.id}">
                                <span>${status?.state === 'in' ? (displayClock || "45:00").replace("'", "") : (status?.shortDetail || 'FIM')}</span>
                            </div>
                        </div>
                    `;
        } else { // Default Theme (based on Brasileirão style)
            const homeTeamColor = home.team.color ? `#${home.team.color}` : '#c32a2a';
            const awayTeamColor = away.team.color ? `#${away.team.color}` : '#006437';
            return `
                        <div class="br-widget-container" id="widgetContainer-${ev.id}" ${scaleStyle}>
                            <div class="br-scoreboard-bar">
                                <div class="br-team-box br-home-team" id="homeBox-${ev.id}"><div class="br-team-color-strip br-home-strip" id="homeStrip-${ev.id}" style="background-color: ${homeTeamColor};"></div><div class="br-team-text-wrapper" id="homeText-${ev.id}"><span class="br-team-name">${home.team.abbreviation}</span></div><div class="br-goal-overlay" id="homeGoalOverlay-${ev.id}" style="background-color: ${homeTeamColor};"><img src="${home.team.logo}" class="br-team-logo-anim"><div class="br-goal-word"><span class="br-letter l1">G</span><span class="br-letter l2">O</span><span class="br-letter l3">L</span></div></div></div>
                                <div class="br-match-center" id="matchCenter-${ev.id}"><div class="br-score" id="score-home-${ev.id}">${home.score || '0'}</div><div class="br-logo-container"><img src="${lConfig.logo}" class="br-logo-img" alt="League Logo"></div><div class="br-score" id="score-away-${ev.id}">${away.score || '0'}</div></div>
                                <div class="br-team-box br-away-team" id="awayBox-${ev.id}"><div class="br-team-color-strip br-away-strip" id="awayStrip-${ev.id}" style="background-color: ${awayTeamColor};"></div><div class="br-team-text-wrapper" id="awayText-${ev.id}"><span class="br-team-name">${away.team.abbreviation}</span></div><div class="br-goal-overlay" id="awayGoalOverlay-${ev.id}" style="background-color: ${awayTeamColor};"><img src="${away.team.logo}" class="br-team-logo-anim"><div class="br-goal-word"><span class="br-letter l1">G</span><span class="br-letter l2">O</span><span class="br-letter l3">L</span></div></div></div>
                            </div>
                            <div class="br-timer-container" id="timer-pill-${ev.id}">
                                <span>${status?.state === 'in' ? (displayClock || "45:00").replace("'", "") : (status?.shortDetail || 'FIM')}</span>
                            </div>
                        </div>
                    `;
        }
    },

    async updateLiveMatches() {
        if (this.state.view !== 'matches' || this.state.currentSport !== 'soccer') return;
        const league = SPORTS_DB.soccer.leagues[this.state.currentLeague];
        const dateStr = API_CONFIG.utils.formatDateForEspn(this.state.currentDate);

        try {
            const res = await fetch(API_CONFIG.espn.scoreboard('soccer', league.id, dateStr));
            if (!res.ok) return;
            const data = await res.json();
            const events = data.events || [];

            if (!events.some(e => e.status.type.state === 'in')) {
                if (this.state.liveUpdateInterval) {
                    clearInterval(this.state.liveUpdateInterval);
                    this.state.liveUpdateInterval = null;
                }
                document.getElementById('live-indicator')?.classList.add('hidden');
                events.forEach(ev => {
                    const timerPill = document.getElementById(`timer-pill-${ev.id}`);
                    if (timerPill) timerPill.innerHTML = `<span>${ev.status.type.shortDetail}</span>`;
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
                const status = ev.status.type;

                const oldStatusState = matchCard.getAttribute('data-status-state');
                if (oldStatusState === 'in' && status.state === 'post') {
                    this.triggerEndOfGameAnimation(ev.id);
                } else if (oldStatusState === 'pre' && status.state === 'in') {
                    this.triggerStartOfGameAnimation(ev.id);
                }
                matchCard.setAttribute('data-status-state', status.state);

                const oldHomeScore = parseInt(matchCard.getAttribute('data-home-score')) || 0, newHomeScore = parseInt(h.score || '0');
                const oldAwayScore = parseInt(matchCard.getAttribute('data-away-score')) || 0, newAwayScore = parseInt(a.score || '0');
                const isGauchao = league.id === 'bra.camp.gaucho';

                if (newHomeScore > oldHomeScore) {
                    if (['bra.1', 'bra.2', 'bra.copa_do_brazil'].includes(league.id)) {
                        this.triggerCbfGoalAnimation(ev.id, 'home');
                    } else if (league.id === 'ita.1') {
                        this.triggerSerieAGoalAnimation(ev.id, 'home');
                    } else if (league.id === 'conmebol.libertadores') {
                        this.triggerLibertadoresEvent(ev.id, 'goal', h.team.abbreviation, 'GOL');
                        this.triggerLibertadoresGoalPop(ev.id);
                    } else if (isGauchao) {
                        this.triggerGauchaoGoalAnimation(ev.id, 'home');
                    } else {
                        this.triggerBrasileiraoGoalAnimation(ev.id, 'home');
                    }
                    document.getElementById(`score-home-${ev.id}`).innerText = newHomeScore;
                    matchCard.setAttribute('data-home-score', newHomeScore);
                }
                if (newAwayScore > oldAwayScore) {
                    if (['bra.1', 'bra.2', 'bra.copa_do_brazil'].includes(league.id)) {
                        this.triggerCbfGoalAnimation(ev.id, 'away');
                    } else if (league.id === 'ita.1') {
                        this.triggerSerieAGoalAnimation(ev.id, 'away');
                    } else if (league.id === 'conmebol.libertadores') {
                        this.triggerLibertadoresEvent(ev.id, 'goal', a.team.abbreviation, 'GOL');
                        this.triggerLibertadoresGoalPop(ev.id);
                    } else if (isGauchao) {
                        this.triggerGauchaoGoalAnimation(ev.id, 'away');
                    } else {
                        this.triggerBrasileiraoGoalAnimation(ev.id, 'away');
                    }
                    document.getElementById(`score-away-${ev.id}`).innerText = newAwayScore;
                    matchCard.setAttribute('data-away-score', newAwayScore);
                }

                if (status.state === 'in' && comp.details) {
                    const allEvents = comp.details, oldCardCount = parseInt(matchCard.getAttribute('data-card-events')) || 0;
                    const cardEvents = allEvents.filter(e => e.type === 'yellowcard' || e.type === 'redcard');
                    if (cardEvents.length > oldCardCount) {
                        const lastNewCard = cardEvents[cardEvents.length - 1], teamSide = h.team.id === lastNewCard.team.id ? 'home' : 'away';
                        if (['bra.1', 'bra.2', 'bra.copa_do_brazil'].includes(league.id)) {
                            this.triggerCbfCardAnimation(ev.id, teamSide, lastNewCard.type);
                        } else if (league.id === 'ita.1') {
                            this.triggerSerieACardAnimation(ev.id, teamSide, lastNewCard.type);
                        } else if (league.id === 'conmebol.libertadores') {
                            const playerName = lastNewCard.athletesInvolved?.[0]?.shortName || 'JOGADOR';
                            this.triggerLibertadoresEvent(ev.id, lastNewCard.type === 'redcard' ? 'red' : 'yellow', teamSide === 'home' ? h.team.abbreviation : a.team.abbreviation, playerName);
                        } else if (isGauchao) {
                            this.triggerGauchaoCardAnimation(ev.id, teamSide, lastNewCard.type);
                        } else {
                            this.triggerBrasileiraoCardAnimation(ev.id, teamSide, lastNewCard.type);
                        }
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
                        } else {
                            this.triggerSubstitutionAnimation(ev.id, lastNewSub, team);
                        }
                        matchCard.setAttribute('data-substitution-events', subEvents.length);
                    }

                    const oldVarCount = parseInt(matchCard.getAttribute('data-var-events')) || 0;
                    const varEvents = allEvents.filter(e => e.text && (e.text.toLowerCase().includes('var') || e.text.toLowerCase().includes('revisão')));
                    if (varEvents.length > oldVarCount) {
                        const lastNewVar = varEvents[varEvents.length - 1];
                        if (league.id === 'conmebol.libertadores') {
                            this.triggerLibertadoresEvent(ev.id, 'var', '', lastNewVar.text || 'REVISÃO DE VÍDEO');
                        } else {
                            this.triggerVARAnimation(ev.id, lastNewVar);
                        }
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

    async fetchStandings(id) {
        const con = document.getElementById('standings-container'); if (!con) return;
        const legend = document.getElementById('standings-legend'); if (legend) legend.innerHTML = '';
        con.innerHTML = '<div class="col-span-full py-20 flex justify-center"><div class="loader-ring"></div></div>';
        try {
            const res = await fetch(API_CONFIG.espn.standings(id));
            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
            const data = await res.json();

            const tableData = data.children?.find(c => c.standings?.type !== 'bracket' && c.standings?.entries?.length > 0);
            if (tableData) {
                this.renderStandingsTable(data);
            } else {
                con.innerHTML = '<div class="text-center text-gray-500 glass-panel p-10">Tabela de classificação não disponível para esta competição.</div>';
            }

        } catch (e) { console.error("Erro ao buscar a tabela:", e); con.innerHTML = '<div class="text-center text-red-400">Erro ao carregar a tabela.</div>'; }
    },

    async fetchKnockout(id) {
        const con = document.getElementById('knockout-container'); if (!con) return;
        con.innerHTML = '<div class="col-span-full py-20 flex justify-center"><div class="loader-ring"></div></div>';
        try {
            const res = await fetch(API_CONFIG.espn.standings(id));
            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
            const data = await res.json();

            const bracketData = data.children?.find(c => c.standings?.type === 'bracket');
            if (bracketData) {
                this.renderKnockoutBracket(bracketData, 'knockout-container');
            } else {
                con.innerHTML = '<div class="text-center text-gray-500 glass-panel p-10">Não há chaveamento de mata-mata disponível para esta competição.</div>';
            }
        } catch (e) { console.error("Erro ao buscar o chaveamento:", e); con.innerHTML = '<div class="text-center text-red-400">Erro ao carregar o chaveamento.</div>'; }
    },

    renderKnockoutBracket(bracketData, containerId) {
        const con = document.getElementById(containerId);
        con.innerHTML = '';

        const rounds = {};
        const roundOrder = ['Oitavas de Final', 'Quartas de Final', 'Semifinal', 'Final'];
        const roundNameMapping = {
            'Round of 16': 'Oitavas de Final',
            'Quarterfinal': 'Quartas de Final',
            'Quarterfinals': 'Quartas de Final',
            'Semifinal': 'Semifinal',
            'Semifinals': 'Semifinal',
            'Final': 'Final'
        };

        const bracketEntries = bracketData.standings?.entries || [];

        bracketEntries.forEach(matchup => {
            const roundName = roundNameMapping[matchup.group.name] || matchup.group.name;
            if (!roundOrder.includes(roundName)) return;

            if (!rounds[roundName]) {
                rounds[roundName] = [];
            }

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
                                    <span class="bracket-team-score">${match.away.score || '-'}</span>
                                </div>
                            </div>
                            `;
                });

                bracketHTML += `</div>`;
            }
        });

        bracketHTML += '</div>';
        con.innerHTML = bracketHTML;

        if (Object.keys(rounds).length === 0) {
            con.innerHTML = '<div class="text-center text-gray-500 glass-panel p-10">Fase de mata-mata ainda não iniciada ou dados da API indisponíveis.</div>';
        }
    },

    renderStandingsTable(data) {
        const con = document.getElementById('standings-container'); if (!con) return;
        const legend = document.getElementById('standings-legend'); if (legend) legend.innerHTML = '';
        con.innerHTML = '';

        const leagueKey = this.state.currentLeague;
        const isCbf = ['brasileirao', 'brasileiraob'].includes(leagueKey);

        let zones = {};
        let legendItems = [];

        // ATENÇÃO: As zonas de classificação (Libertadores, rebaixamento, etc.) abaixo são
        // definidas manualmente. Elas devem ser revisadas a cada nova temporada ou
        // quando o regulamento da competição mudar.
        if (leagueKey === 'brasileirao') {
            zones = { 1: 'libertadores', 2: 'libertadores', 3: 'libertadores', 4: 'libertadores', 5: 'prelibertadores', 6: 'prelibertadores', 7: 'sulamericana', 8: 'sulamericana', 9: 'sulamericana', 10: 'sulamericana', 11: 'sulamericana', 12: 'sulamericana', 17: 'rebaixamento', 18: 'rebaixamento', 19: 'rebaixamento', 20: 'rebaixamento' };
            legendItems = [
                { color: 'bg-libertadores', text: 'Libertadores' },
                { color: 'bg-prelibertadores', text: 'Pré-Libertadores' },
                { color: 'bg-sulamericana', text: 'Sul-Americana' },
                { color: 'bg-rebaixamento', text: 'Rebaixamento' }
            ];
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
                const card = document.createElement('div'); card.className = 'cbf-standings-card mb-6';
                let html = `<div class="cbf-standings-header"><div>#</div><div class="text-left">Clube</div><div class="text-center">Pts</div><div class="text-center hidden sm:block">J</div><div class="text-center hidden sm:block">V</div><div class="text-center hidden sm:block">E</div><div class="text-center hidden sm:block">D</div><div class="text-center hidden sm:block">SG</div><div class="text-center">%</div></div>`;
                (g.standings.entries || []).forEach((e, i) => {
                    const val = n => e.stats.find(s => s.name === n)?.value || 0;
                    const rank = i + 1;
                    const zoneClass = zones[rank] ? `zone-${zones[rank]}` : '';
                    html += `<div class="cbf-standings-row"><div class="cbf-rank-cell ${zoneClass}"><span>${rank}</span></div><div class="cbf-team-cell"><img src="${e.team.logos?.[0]?.href}"> <span class="truncate">${e.team.shortDisplayName}</span></div><span class="cbf-points-cell">${val('points')}</span><span class="cbf-stats-cell hidden sm:block">${val('gamesPlayed')}</span><span class="cbf-stats-cell hidden sm:block">${val('wins')}</span><span class="cbf-stats-cell hidden sm:block">${val('ties')}</span><span class="cbf-stats-cell hidden sm:block">${val('losses')}</span><span class="cbf-stats-cell hidden sm:block">${val('pointDifferential')}</span><span class="cbf-stats-cell text-xs">${val('gamesPlayed') > 0 ? Math.round((val('points') / (val('gamesPlayed') * 3)) * 100) : 0}%</span></div>`;
                });
                card.innerHTML = html; con.appendChild(card);
            });
        } else {
            if (legend) {
                legend.className = 'mt-6 flex flex-wrap gap-4 text-xs font-medium text-gray-400';
                legend.innerHTML = legendItems.map(i => `<div class="flex items-center gap-2"><div class="w-2 h-2 rounded-full ${i.color}"></div><span>${i.text}</span></div>`).join('');
            }
            (data.children || []).forEach(g => {
                const card = document.createElement('div'); card.className = 'glass-panel overflow-hidden mb-6';
                let html = `<div class="p-4 border-b border-[var(--border-color)] font-bold text-sm uppercase text-[var(--accent)] bg-white/5 tracking-wider">${g.name}</div>`;
                html += `<div class="std-table-header"><div>#</div><div class="text-left">Clube</div><div class="text-center">Pts</div><div class="text-center hidden sm:block">J</div><div class="text-center hidden sm:block">V</div><div class="text-center hidden sm:block">E</div><div class="text-center hidden sm:block">D</div><div class="text-center hidden sm:block">SG</div><div class="text-center">%</div></div>`;
                (g.standings.entries || []).forEach((e, i) => {
                    const val = n => e.stats.find(s => s.name === n)?.value || 0;
                    const rank = i + 1;
                    const bgZone = zones[rank] ? `bg-${zones[rank]}` : 'bg-transparent';
                    html += `<div class="std-row"><div class="rank-cell"><div class="rank-dot ${bgZone}"></div><span>${rank}</span></div><div class="team-cell"><img src="${e.team.logos?.[0]?.href}"> <span class="truncate font-medium">${e.team.shortDisplayName}</span></div><span class="font-bold text-center text-lg">${val('points')}</span><span class="opacity-70 text-center hidden sm:block">${val('gamesPlayed')}</span><span class="opacity-70 text-center hidden sm:block">${val('wins')}</span><span class="opacity-70 text-center hidden sm:block">${val('ties')}</span><span class="opacity-70 text-center hidden sm:block">${val('losses')}</span><span class="opacity-70 text-center hidden sm:block">${val('pointDifferential')}</span><span class="opacity-70 text-center text-xs">${val('gamesPlayed') > 0 ? Math.round((val('points') / (val('gamesPlayed') * 3)) * 100) : 0}%</span></div>`;
                });
                card.innerHTML = html; con.appendChild(card);
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
            const res = await fetch(url);
            if (!res.ok) throw new Error("API Error");
            const data = await res.json();
            const scorers = await this.parseEspnScorers(data);
            this.state.scorersCache[cacheKey] = scorers;
            renderScorers(scorers);
        } catch (e) {
            console.error("Erro ao buscar artilharia ESPN:", e);
            g.innerHTML = '<div class="col-span-full text-center text-red-400 glass-panel p-10">Erro ao carregar artilharia via ESPN.</div>';
        }
    },

    // Converte a resposta do endpoint /leaders do ESPN Core para o formato da UI.
    // O endpoint do ESPN retorna referências ($ref) que precisam ser resolvidas.
    async parseEspnScorers(data) {
        if (!data) return [];
        const categories = data.categories || data.items || [];

        // Procura uma categoria de gols (nomes podem variar: "goals", "goalsLeaders", "topScorers"...)
        const goalsCategory = categories.find(c => {
            const n = (c.name || c.shortName || '').toLowerCase();
            return n.includes('goal') || n.includes('scorer') || n.includes('artilh');
        }) || categories[0];

        if (!goalsCategory || !goalsCategory.leaders) return [];

        const leaders = goalsCategory.leaders.slice(0, 20);

        // Resolve referências em paralelo (athlete + team)
        const resolved = await Promise.all(leaders.map(async (l) => {
            try {
                const athleteRef = l.athlete?.$ref;
                const teamRef = l.team?.$ref;
                let playerName = l.athlete?.displayName || '';
                let photo = l.athlete?.headshot?.href || '';
                let teamName = l.team?.displayName || l.team?.name || '';
                let teamLogo = l.team?.logos?.[0]?.href || '';

                if (athleteRef) {
                    const ar = await fetch(athleteRef);
                    if (ar.ok) {
                        const ad = await ar.json();
                        playerName = ad.displayName || ad.fullName || playerName;
                        if (ad.headshot?.href) photo = ad.headshot.href;
                    }
                }
                if (teamRef && !teamName) {
                    const tr = await fetch(teamRef);
                    if (tr.ok) {
                        const td = await tr.json();
                        teamName = td.displayName || td.name || teamName;
                        if (td.logos?.[0]?.href) teamLogo = td.logos[0].href;
                    }
                }
                return {
                    playerName: playerName || 'Jogador',
                    photo,
                    teamName,
                    teamLogo,
                    goals: l.value ?? l.displayValue ?? 0
                };
            } catch (err) {
                return {
                    playerName: l.athlete?.displayName || 'Jogador',
                    photo: '',
                    teamName: l.team?.displayName || '',
                    teamLogo: '',
                    goals: l.value ?? 0
                };
            }
        }));

        return resolved.filter(r => r.playerName && r.playerName !== 'Jogador');
    },

    async fetchNews(id) {
        const g = document.getElementById('news-grid'); if (!g) return;
        g.innerHTML = '<div class="col-span-full py-20 flex justify-center"><div class="loader-ring"></div></div>';
        try {
            const res = await fetch(API_CONFIG.espn.news('soccer', id));
            if (!res.ok) throw new Error("API Error");
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
        } catch (e) { g.innerHTML = '<div class="text-center text-red-400">Erro.</div>'; }
    },

    async renderClubs(leagueKey) {
        const container = document.getElementById('clubs-grid'); if (!container) return;
        this.closeWiki();
        const league = SPORTS_DB.soccer.leagues[leagueKey];
        container.innerHTML = '<div class="col-span-full py-20 flex justify-center"><div class="loader-ring"></div></div>';
        const teamsFromApi = await this.getEspnLeagueTeams(league.id);
        container.innerHTML = '';
        if (!teamsFromApi.length) { container.innerHTML = '<div class="col-span-full text-center text-gray-500 glass-panel p-10">Erro.</div>'; return; }

        teamsFromApi.sort((a, b) => a.displayName.localeCompare(b.displayName)).forEach(teamData => {
            const card = document.createElement('div');
            card.className = 'glass-panel !p-6 flex flex-col items-center justify-center gap-4 cursor-pointer hover:border-[var(--accent)] transition';
            const displayName = teamData.displayName;
            let logoUrl = teamData.logos?.[0]?.href;
            if (league.logoOverrides && league.logoOverrides[displayName]) { logoUrl = league.logoOverrides[displayName]; }
            const clubWikiName = league.clubs.find(c => c.replace(/_/g, ' ').toLowerCase() === teamData.name.toLowerCase()) || teamData.name.replace(/ /g, '_');
            card.onclick = () => this.showTeamSchedule(teamData.id, displayName, logoUrl, clubWikiName);
            const imgContent = logoUrl ? `<img src="${logoUrl}" alt="${displayName}" class="w-20 h-20 object-contain">` : `<div class="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center text-3xl">⚽</div>`;
            card.innerHTML = `${imgContent}<span class="font-bold text-[var(--text-primary)] text-center text-sm">${displayName}</span>`;
            container.appendChild(card);
        });
    },

    async showTeamSchedule(teamId, teamName, teamLogo, wikiName) {
        this.setView('team-schedule');
        const container = document.getElementById('view-team-schedule');
        if (!container) return;

        container.innerHTML = `
                    <div class="flex items-center justify-between mb-8">
                        <button onclick="app.setView('clubs')" class="text-[var(--accent)] hover:text-white transition flex items-center gap-2 font-bold"><i data-lucide="arrow-left"></i> Voltar para Clubes</button>
                    </div>
                    <div class="flex flex-col md:flex-row items-center gap-6 mb-8 p-6 rounded-3xl bg-white/5 border border-[var(--border-color)]">
                        <img src="${teamLogo}" class="w-20 h-20 object-contain">
                        <div class="flex-1 text-center md:text-left">
                        <h2 class="text-3xl font-bold text-[var(--text-primary)]">${teamName}</h2>
                            <button onclick="app.loadWikiDetail('${wikiName}')" class="mt-2 text-sm text-gray-400 hover:text-[var(--accent)] transition flex items-center justify-center md:justify-start gap-1">Ver na Wikipedia <i data-lucide="external-link" class="w-3 h-3"></i></button>
                        </div>
                    </div>
                    <div id="team-view-tabs" class="flex items-center border-b border-[var(--border-color)] mb-6">
                    <button data-tab="schedule" class="px-4 py-3 text-sm font-bold border-b-2 transition whitespace-nowrap text-[var(--text-primary)] border-[var(--accent)]">Jogos</button>
                    <button data-tab="roster" class="px-4 py-3 text-sm font-bold border-b-2 transition whitespace-nowrap text-[var(--text-muted)] border-transparent hover:text-[var(--text-primary)]">Elenco</button>
                    </div>
                    <div id="team-tab-schedule">
                    <h3 class="text-xl font-bold mb-6 text-[var(--text-primary)]">Próximos Jogos</h3>
                        <div id="team-schedule-list" class="space-y-4"><div class="col-span-full py-20 flex justify-center"><div class="loader-ring"></div></div></div>
                    <h3 class="text-xl font-bold mt-10 mb-6 text-[var(--text-primary)]">Últimos Resultados</h3>
                        <div id="team-results-list" class="space-y-4"></div>
                    </div>
                    <div id="team-tab-roster" class="hidden">
                        <div id="team-roster-list" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"><div class="col-span-full py-20 flex justify-center"><div class="loader-ring"></div></div></div>
                    </div>
                `;
        if (window.lucide) lucide.createIcons();

        container.querySelectorAll('#team-view-tabs button').forEach(button => {
            button.addEventListener('click', () => {
                container.querySelectorAll('#team-view-tabs button').forEach(btn => { btn.className = 'px-4 py-3 text-sm font-bold border-b-2 transition whitespace-nowrap text-[var(--text-muted)] border-transparent hover:text-[var(--text-primary)]'; });
                button.className = 'px-4 py-3 text-sm font-bold border-b-2 transition whitespace-nowrap text-[var(--text-primary)] border-[var(--accent)]';
                document.getElementById('team-tab-schedule').classList.toggle('hidden', button.dataset.tab !== 'schedule');
                document.getElementById('team-tab-roster').classList.toggle('hidden', button.dataset.tab !== 'roster');
            });
        });

        const sport = this.state.currentSport;
        const league = SPORTS_DB[sport].leagues[this.state.currentLeague];
        try {
            const res = await fetch(API_CONFIG.espn.teamSchedule(sport, league.id, teamId));
            const data = await res.json();
            this.renderTeamScheduleAndResults(data.events || [], teamId);
        } catch (e) { document.getElementById('team-schedule-list').innerHTML = '<div class="text-center text-red-400">Erro.</div>'; }

        try {
            const res = await fetch(API_CONFIG.espn.roster(league.id, teamId));
            const data = await res.json();
            this.renderTeamRoster(data);
        } catch (e) { document.getElementById('team-roster-list').innerHTML = '<div class="text-center text-red-400">Erro.</div>'; }
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
                const item = document.createElement('div'); item.className = 'glass-panel !p-4 flex items-center gap-4';
                item.innerHTML = `<div class="text-center w-20 shrink-0"><div class="font-bold text-sm text-[var(--text-primary)]">${eventDate.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}</div><div class="text-xs text-gray-400">${eventDate.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</div></div><div class="w-px h-10 bg-white/10"></div><div class="flex items-center gap-4 flex-1"><img src="${opponent.team.logos?.[0]?.href}" class="w-8 h-8 object-contain"><div><div class="font-bold text-[var(--text-primary)]">${opponent.team.displayName}</div><div class="text-xs text-gray-400">${ev.shortName}</div></div></div><div class="text-xs font-bold uppercase text-gray-500 w-16 text-center">${isHomeGame ? 'CASA' : 'FORA'}</div>`;
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

                const item = document.createElement('div'); item.className = 'glass-panel !p-4 flex items-center gap-4';
                item.innerHTML = `<div class="flex items-center justify-center w-12 h-12 rounded-xl text-white font-bold text-lg ${resultColorClass} shrink-0">${resultIndicator}</div>
                            <div class="flex-1"><div class="flex items-center gap-3"><img src="${home.team.logos?.[0]?.href}" class="w-6 h-6 object-contain"><span class="font-medium text-white ${home.id === teamId ? 'font-bold' : ''}">${home.team.displayName}</span><span class="ml-auto font-bold text-lg text-white">${home.score || '0'}</span></div>
                            <div class="flex items-center gap-3 mt-2"><img src="${away.team.logos?.[0]?.href}" class="w-6 h-6 object-contain"><span class="font-medium text-white ${away.id === teamId ? 'font-bold' : ''}">${away.team.displayName}</span><span class="ml-auto font-bold text-lg text-white">${away.score || '0'}</span></div></div>`;
                resultsList.appendChild(item);
            });
        }
    },

    renderTeamRoster(data) {
        const rosterList = document.getElementById('team-roster-list'); if (!rosterList) return;
        if (!data || !data.athletes || data.athletes.length === 0) { rosterList.innerHTML = '<div class="col-span-full text-center text-gray-500 glass-panel p-10">Elenco não disponível.</div>'; return; }
        rosterList.innerHTML = '';
        data.athletes.forEach(group => {
            rosterList.innerHTML += `<h4 class="col-span-full text-lg font-bold text-[var(--accent)] mt-6 mb-2">${group.position}</h4>`;
            group.items.forEach(p => {
                const card = document.createElement('div'); card.className = 'glass-panel !p-4 flex items-center gap-4';
                card.innerHTML = `<div class="font-bold text-2xl text-[var(--accent)] w-8 text-center">${p.jersey}</div><img src="${p.headshot?.href || ''}" class="w-12 h-12 rounded-full border border-[var(--border-color)] object-cover bg-[var(--bg-primary)]" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iI2EwYTBiMiI+PHBhdGggZD0iTTEyIDJDNi40OCAyIDIgNi40OCAyIDEyczQuNDggMTAgMTAgMTAgMTAtNC40OCAxMC0xMFMxNy41MiAyIDEyIDJ6bTAgMy41YzEuOTMgMCAzLjUgMS41NyAzLjUgMy41UzEzLjkzIDEyLjUgMTIgMTIuNXMtMy41LTEuNTctMy41LTMuNVMxMC4wNyA1LjUgMTIgNS41em0wIDEzLjVjLTIuOTcgMC02LjYxIDEuNDYtOC4wMyA0LjA0QzQuNDIgMjEuMjYgOC4wNiAyMiAxMiAyMnMyLjYxLS43NCAzLjk3LTEuNDZjLTEuNDItMi41OC01LjA2LTQuMDQtOC4wMy00LjA0eiIvPjwvc3ZnPg=='"><div class="flex-1"><div class="font-bold text-lg text-[var(--text-primary)]">${p.fullName}</div><div class="text-sm font-medium text-gray-400">${p.nationality}</div></div>`;
                rosterList.appendChild(card);
            });
        });
    },

    searchWiki() {
        let q = '';
        if (this.state.view === 'clubs') q = document.getElementById('wiki-search-input').value;
        if (!q) return;
        this.loadWikiDetail(q);
    },

    async loadWikiDetail(searchTerm, logoUrl = null) {
        const container = document.getElementById('wiki-content-area');
        const wikiDetail = document.getElementById('wiki-detail');
        if (!container || !wikiDetail) return;

        if (this.state.view === 'clubs') {
            document.getElementById('clubs-grid').classList.add('hidden');
            document.getElementById('wiki-search-input').parentElement.classList.add('hidden');
        } else if (this.state.view === 'team-schedule') {
            document.getElementById('view-team-schedule').classList.add('hidden');
        } else if (this.state.view === 'scorers') {
            document.getElementById('scorers-grid').classList.add('hidden');
            document.getElementById('scorers-header').classList.add('hidden');
        }
        wikiDetail.classList.remove('hidden');
        container.innerHTML = '<div class="flex flex-col items-center justify-center py-20"><div class="loader-ring"></div></div>';

        try {
            const queryTerm = searchTerm.replace(/_/g, ' ');
            const searchRes = await fetch(API_CONFIG.wikipedia.search(queryTerm));
            const searchData = await searchRes.json();
            if (!searchData.query?.search?.length) { container.innerHTML = `<p class="text-center text-red-400">Conteúdo não encontrado.</p>`; return; }

            const detailRes = await fetch(API_CONFIG.wikipedia.detail(searchData.query.search[0].title));
            const detailData = await detailRes.json();
            const page = Object.values(detailData.query.pages)[0];
            const finalLogoUrl = page.thumbnail?.source || logoUrl;

            let html = `<div class="flex flex-col md:flex-row items-start gap-8 mb-8">`;
            if (finalLogoUrl) html += `<img src="${finalLogoUrl}" class="w-32 h-32 object-cover md:object-contain rounded-2xl border border-[var(--border-color)] p-2 bg-white/5 shrink-0 mx-auto md:mx-0">`;
            html += `<div class="flex-1 pt-2 text-center md:text-left"><h2 class="text-4xl font-black leading-tight text-[var(--text-primary)]">${page.title}</h2></div></div>`;
            html += `<div class="text-lg leading-relaxed text-[var(--text-muted)]">${page.extract ? page.extract.replace(/\n/g, '<br><br>') : 'Sem descrição.'}</div>`;
            container.innerHTML = html;
        } catch (e) { container.innerHTML = '<p class="text-center text-red-400">Erro.</p>'; }
    },

    closeWiki() {
        document.getElementById('wiki-detail').classList.add('hidden');
        if (this.state.view === 'clubs') {
            document.getElementById('clubs-grid').classList.remove('hidden');
            document.getElementById('wiki-search-input').parentElement.classList.remove('hidden');
        } else if (this.state.view === 'team-schedule') {
            this.setView('clubs');
        } else if (this.state.view === 'scorers') {
            document.getElementById('scorers-grid').classList.remove('hidden');
            document.getElementById('scorers-header').classList.remove('hidden');
        }
    },

    async openMatch(id) {
        const m = document.getElementById('match-modal');
        if (!m) return;
        const pipButton = document.getElementById('pip-button');
        if ('documentPictureInPicture' in window) {
            pipButton.classList.remove('hidden');
        }
        const matchCard = document.querySelector(`[data-event-id='${id}']`);
        const l = SPORTS_DB.soccer.leagues[this.state.currentLeague];
        m.classList.add('open');
        document.getElementById('modal-bg').style.backgroundImage = `url('${l.bg}')`;

        const audio = document.getElementById('silent-audio');
        if (audio) {
            audio.play().catch(e => console.log("Audio play failed, media session might not work."));
        }

        try {
            const res = await fetch(API_CONFIG.espn.gameSummary(l.id, id)); // This is fine, keep it for initial load
            const d = await res.json();
            this.state.currentMatchData = d;
            this.renderMatchDetail(d);
            this.updateMediaSession();

            if (d.header.status.type.state === 'in') {
                if (this.state.liveModalUpdateInterval) clearInterval(this.state.liveModalUpdateInterval);
                this.state.liveModalUpdateInterval = setInterval(async () => {
                    const liveRes = await fetch(API_CONFIG.espn.gameSummary(l.id, id));
                    const liveData = await liveRes.json();
                    this.state.currentMatchData = liveData;
                    this.renderMatchDetail(liveData);
                }, 15000);
            }
        } catch (e) { console.error("Erro modal:", e); }
    },

    renderMatchDetail(d) {
        if (!d?.header) return;
        const h = d.header.competitions[0].competitors.find(x => x.homeAway === 'home');
        const a = d.header.competitions[0].competitors.find(x => x.homeAway === 'away');
        const setText = (id, txt) => { const el = document.getElementById(id); if (el) el.innerText = txt; };
        const setSrc = (id, src) => { const el = document.getElementById(id); if (el) el.src = src; };

        setText('modal-home-name', h.team.displayName); setText('modal-away-name', a.team.displayName);
        setSrc('modal-home-logo', h.team.logos?.[0]?.href); setSrc('modal-away-logo', a.team.logos?.[0]?.href);
        setText('modal-score', `${h.score || '0'} - ${a.score || '0'}`);

        const status = d.header.status || d.header.competitions[0].status;
        if (this.state.matchTimerInterval) { clearInterval(this.state.matchTimerInterval); this.state.matchTimerInterval = null; }

        setText('modal-status', status?.type?.shortDetail || 'N/D');
        if (status?.type?.state === 'in' && d.header.competitions[0].status) {
            this.startLiveMatchTimer(d.header.competitions[0].status, d.header.competitions[0].details);
        } else {
            setText('modal-time', status?.type?.state !== 'pre' ? (status?.type?.description || '') : '');
        }

        const tabsContainer = document.getElementById('match-modal-tabs');
        tabsContainer.innerHTML = `<button data-tab="summary" onclick="app.switchMatchModalTab('summary')">Resumo</button><button data-tab="broadcast" onclick="app.switchMatchModalTab('broadcast')">Transmissão</button><button data-tab="lineups" onclick="app.switchMatchModalTab('lineups')">Escalações</button>`;
        this.switchMatchModalTab('summary');

        const statDiv = document.getElementById('modal-stats');
        if (statDiv) {
            const boxscore = d.boxscore || d.gameInfo?.boxscore;
            if (boxscore?.teams) {
                const hS = boxscore.teams.find(t => t.team.id === h.team.id)?.statistics || [];
                const aS = boxscore.teams.find(t => t.team.id === a.team.id)?.statistics || [];
                statDiv.innerHTML = hS.map(s => {
                    const hV = s.displayValue; const aV = aS.find(x => x.label === s.label)?.displayValue || '0';
                    const hNum = parseFloat(String(hV).replace('%', '')); const aNum = parseFloat(String(aV).replace('%', ''));
                    const tot = (hNum || 0) + (aNum || 0) || 1; const hPercent = (hNum / tot) * 100;
                    return `<div class="mb-4"><div class="flex justify-between text-xs font-bold uppercase text-gray-400 mb-2"><span>${hV}</span><span>${s.label}</span><span>${aV}</span></div><div class="h-2 bg-white/10 rounded-full flex overflow-hidden"><div class="bg-[var(--accent)] h-full" style="width:${hPercent}%"></div></div></div>`;
                }).join('');
            } else { statDiv.innerHTML = '<div class="text-center text-gray-500 py-4">Estatísticas não disponíveis.</div>'; }
        }

        const tl = document.getElementById('modal-timeline');
        if (tl) {
            let events = d.keyEvents || [];
            if (!events.length && d.header?.competitions?.[0]?.details) events = d.header.competitions[0].details.filter(e => e.clock && (e.text || e.shortText));

            if (events.length > 0) {
                tl.innerHTML = events.slice().reverse().map(e => {
                    const text = e.text || e.shortText || "Lance";
                    const type = e.type?.text || (typeof e.type === 'string' && e.type) || "Jogo";
                    const clock = e.clock?.displayValue || "-";
                    let icon = '•'; const lowerType = type.toLowerCase();
                    if (lowerType.includes('goal')) icon = '⚽️'; else if (lowerType.includes('yellow card')) icon = '🟨'; else if (lowerType.includes('red card')) icon = '🟥'; else if (lowerType.includes('substitution')) icon = '🔄';
                    return `<div class="relative pb-6 border-l border-[var(--glass-border)] pl-6 last:pb-0 last:border-transparent"><span class="absolute -left-[9px] bg-black text-xs font-bold text-[var(--accent)] border border-[var(--accent)] rounded px-1">${clock}</span><div class="text-sm font-bold text-[var(--text-primary)]">${icon} ${text}</div><div class="text-xs text-gray-500 uppercase mt-1">${type}</div></div>`;
                }).join('');
            } else { tl.innerHTML = '<div class="text-center text-gray-500 py-4">Sem lances.</div>'; }
        }
        this.renderEspnLineups(d);
        this.updatePipContent();
        this.updateMediaSession();
    },

    async fetchBroadcastForMatch() {
        const container = document.getElementById('match-tab-broadcast');
        if (!container || !this.state.currentMatchData?.header) {
            if (container) container.innerHTML = '<div class="text-center text-gray-500 p-10">Dados não encontrados.</div>';
            return;
        }
        container.innerHTML = '<div class="py-20 flex justify-center"><div class="loader-ring"></div></div>';

        let matchName = this.state.currentMatchData.header.name;
        if (!matchName) {
            const c = this.state.currentMatchData.header.competitions?.[0];
            if (c) matchName = `${c.competitors.find(x => x.homeAway === 'home').team.displayName} vs ${c.competitors.find(x => x.homeAway === 'away').team.displayName}`;
        }
        if (!matchName) { container.innerHTML = '<div class="text-center text-gray-500 p-10">Erro ao buscar nome.</div>'; return; }

        try {
            // 1) Busca global por nome da partida na API pública (reidoscanais.si)
            const searchRes = await fetch(API_CONFIG.streaming.search(matchName));
            const searchData = await searchRes.json();

            let embeds = [];

            // 2) Se encontrou um evento correspondente, busca os detalhes dele
            if (searchData?.data?.events?.length > 0) {
                const event = searchData.data.events[0];
                // Tenta pegar detalhes completos do evento (embeds podem vir em /sports/{id})
                try {
                    const eventRes = await fetch(API_CONFIG.streaming.sportDetail(event.id));
                    const eventData = await eventRes.json();
                    if (eventData?.data?.embeds?.length > 0) {
                        embeds = eventData.data.embeds;
                    } else if (event.embeds?.length > 0) {
                        embeds = event.embeds;
                    }
                } catch (innerErr) {
                    if (event.embeds?.length > 0) embeds = event.embeds;
                }
            }

            // 3) Fallback: também busca nas categorias de esportes ao vivo
            if (embeds.length === 0) {
                try {
                    const liveRes = await fetch(API_CONFIG.streaming.sports('?status=live'));
                    const liveData = await liveRes.json();
                    const liveEvent = (liveData?.data || []).find(ev => {
                        const t = (ev.title || '').toLowerCase();
                        return t.includes(matchName.toLowerCase().split(' vs ')[0]) || matchName.toLowerCase().includes(t);
                    });
                    if (liveEvent?.embeds?.length > 0) embeds = liveEvent.embeds;
                    if (embeds.length === 0 && liveEvent?.id) {
                        const detailRes = await fetch(API_CONFIG.streaming.sportDetail(liveEvent.id));
                        const detailData = await detailRes.json();
                        if (detailData?.data?.embeds?.length > 0) embeds = detailData.data.embeds;
                    }
                } catch (innerErr) { /* silencioso */ }
            }

            // 4) Fallback final: canais da categoria "Esportes"
            if (embeds.length === 0) {
                try {
                    const channelsRes = await fetch(API_CONFIG.streaming.channels('Esportes'));
                    const channelsData = await channelsRes.json();
                    (channelsData?.data || []).forEach(ch => {
                        if (ch.embeds?.length > 0) embeds.push(...ch.embeds);
                    });
                    // Limita a quantidade para não poluir
                    embeds = embeds.slice(0, 6);
                } catch (innerErr) { /* silencioso */ }
            }

            if (embeds.length === 0) {
                container.innerHTML = '<div class="text-center text-gray-500 p-10">Nenhuma transmissão disponível para esta partida no momento.</div>';
                return;
            }

            this.renderBroadcastForMatch(embeds);
        } catch (e) {
            console.error("Erro ao buscar transmissões:", e);
            container.innerHTML = '<div class="text-center text-red-400 p-10">Erro ao buscar transmissões.</div>';
        }
    },

    renderBroadcastForMatch(embeds) {
        const container = document.getElementById('match-tab-broadcast');
        if (!container) return;
        container.innerHTML = `
                    <div class="aspect-video bg-black rounded-xl mb-6 overflow-hidden border border-[var(--glass-border)]">
                        <iframe id="broadcast-player" class="w-full h-full" src="${embeds[0].embed_url}" frameborder="0" allowfullscreen allow="autoplay; encrypted-media; picture-in-picture"></iframe>
                    </div>
                    <div>
                        <h4 class="text-xs font-bold text-gray-500 uppercase mb-3 tracking-widest">Fontes de Transmissão</h4>
                        <div id="broadcast-channel-list" class="grid grid-cols-1 sm:grid-cols-2 gap-3"></div>
                    </div>
                `;
        const list = document.getElementById('broadcast-channel-list');
        const player = document.getElementById('broadcast-player');
        embeds.forEach((embed, index) => {
            const card = document.createElement('button');
            card.className = `glass-panel !p-3 flex items-center gap-3 cursor-pointer hover:border-[var(--accent)] w-full ${index === 0 ? 'border-[var(--accent)]' : ''}`;
            card.innerHTML = `<div class="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center shrink-0"><i data-lucide="tv-2" class="w-5 h-5 text-[var(--accent)]"></i></div><div class="flex-1 text-left"><div class="font-bold text-base text-[var(--text-primary)]">${embed.provider || ('Opção ' + (index + 1))}</div><div class="text-xs text-gray-400">${embed.quality || 'HD'}</div></div>`;
            card.onclick = () => { player.src = embed.embed_url; list.querySelectorAll('button').forEach(b => b.classList.remove('border-[var(--accent)]')); card.classList.add('border-[var(--accent)]'); };
            list.appendChild(card);
        });
        if (window.lucide) lucide.createIcons();
    },

    renderEspnLineups(matchData) {
        const homeContainer = document.getElementById('home-lineup');
        const awayContainer = document.getElementById('away-lineup');
        const lineups = matchData.rosters || matchData.lineups;
        if (!lineups || lineups.length < 2) { homeContainer.innerHTML = awayContainer.innerHTML = `<div class="text-center text-gray-500 py-10">Escalação não disponível.</div>`; return; }

        const h = matchData.header.competitions[0].competitors.find(c => c.homeAway === 'home');
        const a = matchData.header.competitions[0].competitors.find(c => c.homeAway === 'away');
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
        const teamColor = espnTeamData.team.color || '004d2d'; // Default to a dark green

        let html = `<div class="flex items-center gap-3 mb-4"><img src="${espnTeamData.team.logos[0].href}" class="w-8 h-8 object-contain"><div><div class="font-bold text-lg text-[var(--text-primary)]">${espnTeamData.team.displayName}</div>${formation ? `<div class="text-sm font-medium text-[var(--accent)]">${formation}</div>` : ''}</div></div>`;

        // Apply team color to stadium container
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
            // Use a distinct color for the GK, like gray or black
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
            html += '<h4 class="text-xs font-bold text-gray-500 uppercase mt-8 mb-3 tracking-widest">Reservas</h4><div class="space-y-3">';
            subs.forEach(p => { html += `<div class="flex items-center text-sm opacity-80"><span class="font-mono font-bold w-8 text-gray-500">${p.athlete.jersey || '-'}</span><span class="text-[var(--text-primary)]">${p.athlete.displayName}</span><span class="ml-auto text-xs text-gray-500">${p.athlete.position?.abbreviation || ''}</span></div>`; });
            html += '</div>';
        }
        if (coachData) html += `<h4 class="text-xs font-bold text-gray-500 uppercase mt-6 mb-3 tracking-widest">Técnico</h4><div class="text-sm text-[var(--text-primary)]">${coachData.displayName || coachData.fullName}</div>`;
        return html;
    },

    updateMediaSession() {
        if (!('mediaSession' in navigator) || !this.state.currentMatchData) {
            if ('mediaSession' in navigator) navigator.mediaSession.metadata = null;
            return;
        }

        const d = this.state.currentMatchData;
        const h = d.header.competitions[0].competitors.find(x => x.homeAway === 'home');
        const a = d.header.competitions[0].competitors.find(x => x.homeAway === 'away');
        const lConfig = SPORTS_DB.soccer.leagues[this.state.currentLeague];
        const status = d.header.status?.type;
        const displayClock = d.header.status?.displayClock;

        const score = `${h.score || '0'} - ${a.score || '0'}`;
        const time = status?.state === 'in' ? (displayClock || "00:00").replace("'", "") : (status?.shortDetail || 'FIM');

        navigator.mediaSession.metadata = new MediaMetadata({
            title: `${h.team.abbreviation} ${score} ${a.team.abbreviation}`,
            artist: time,
            album: lConfig.name,
            artwork: [
                { src: h.team.logos?.[0]?.href, sizes: '256x256' },
                { src: a.team.logos?.[0]?.href, sizes: '256x256' },
                { src: lConfig.logo, sizes: '512x512', type: 'image/png' }
            ]
        });
    },

    // ---- ANIMAÇÕES DO PLACAR LIBERTADORES ----
    triggerLibertadoresEvent(eventId, type, team, text) {
        const eventBar = document.getElementById(`eventBar-${eventId}`);
        const eventContent = document.getElementById(`eventContent-${eventId}`);
        if (!eventBar || !eventContent) return;

        if (this.state.libertadoresTimeouts && this.state.libertadoresTimeouts[eventId]) {
            clearTimeout(this.state.libertadoresTimeouts[eventId]);
        } else if (!this.state.libertadoresTimeouts) {
            this.state.libertadoresTimeouts = {};
        }

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

    triggerLibertadoresGoalPop(eventId) { const scoreBox = document.getElementById(`score-box-${eventId}`); if (scoreBox) { scoreBox.classList.add('pop'); setTimeout(() => scoreBox.classList.remove('pop'), 500); } },

    // ---- ANIMAÇÕES DO PLACAR SERIE A ITALIA ----
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
            setTimeout(() => { const animClass = teamSide === 'home' ? 'sa-score-pop-l' : 'sa-score-pop-r'; scoreEl.classList.add(animClass); setTimeout(() => scoreEl.classList.remove(animClass), 600); }, 150);
        }, 3000);
    },
    triggerSerieACardAnimation(eventId, teamSide, cardType) { const boxEl = document.getElementById(`${teamSide}Box-${eventId}`); if (!boxEl) return; const className = cardType === 'redcard' ? 'sa-red-active' : 'sa-yellow-active'; boxEl.classList.add(className); setTimeout(() => boxEl.classList.remove(className), 3000); },

    // ---- ANIMAÇÕES DO PLACAR CBF (BRASILEIRÃO/COPA) ----
    playCbfIntro(eventId, index) {
        const get = (id) => document.getElementById(id);
        const delay = index * 200;
        const wrapper = get(`scoreboardWrapper-${eventId}`);
        if (!wrapper) return;

        wrapper.classList.remove('cbf-is-visible');
        void wrapper.offsetWidth; // Força o reflow para resetar a animação

        setTimeout(() => {
            wrapper.classList.add('cbf-is-visible');
        }, delay + 100);
    },

    triggerCbfGoalAnimation(eventId, teamSide) {
        const scoreEl = document.getElementById(`score-${teamSide}-${eventId}`);
        if (scoreEl) {
            scoreEl.classList.add('pop');
            setTimeout(() => scoreEl.classList.remove('pop'), 300);
        }

        const banner = document.getElementById(`goalBanner-${eventId}`);
        const logo = document.getElementById(`goalLogo-${eventId}`);
        const teamBox = document.getElementById(`${teamSide}Box-${eventId}`);

        if (banner && logo && teamBox) {
            const teamColor = teamBox.getAttribute('data-color') || '#0b071a';
            const teamLogo = teamBox.getAttribute('data-logo') || '';

            banner.style.backgroundColor = teamColor;
            logo.src = teamLogo;

            banner.classList.remove('hide', 'show');
            void banner.offsetWidth; // Força o reflow
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
    // ----------------------------------------------------

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
            setTimeout(() => {
                homeBox.classList.add('br-anim-home');
                awayBox.classList.add('br-anim-away');
            }, 500);
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

    playGauchaoIntro(eventId, index) {
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

        const animationClasses = ['ga-intro-mode', 'ga-anim-center', 'ga-anim-home', 'ga-anim-away', 'ga-anim-text', 'ga-anim-strip', 'ga-anim-timer'];
        elements.forEach(el => el.classList.remove(...animationClasses));

        void widget.offsetWidth;

        setTimeout(() => {
            widget.classList.add('ga-intro-mode');
            void widget.offsetWidth;

            setTimeout(() => matchCenter.classList.add('ga-anim-center'), 100);
            setTimeout(() => { homeBox.classList.add('ga-anim-home'); awayBox.classList.add('ga-anim-away'); }, 500);
            setTimeout(() => { homeText.classList.add('ga-anim-text'); awayText.classList.add('ga-anim-text'); homeStrip.classList.add('ga-anim-strip'); awayStrip.classList.add('ga-anim-strip'); }, 900);
            setTimeout(() => matchTimer.classList.add('ga-anim-timer'), 1200);
            setTimeout(() => widget.classList.remove('ga-intro-mode'), 2600);
        }, delay);
    },

    playLfuIntro(eventId, index) {
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

        const animationClasses = ['lfu-intro-mode', 'lfu-anim-center', 'lfu-anim-home', 'lfu-anim-away', 'lfu-anim-text', 'lfu-anim-strip', 'lfu-anim-timer'];
        elements.forEach(el => el.classList.remove(...animationClasses));

        void widget.offsetWidth;

        setTimeout(() => {
            widget.classList.add('lfu-intro-mode'); void widget.offsetWidth;
            setTimeout(() => matchCenter.classList.add('lfu-anim-center'), 100);
            setTimeout(() => { homeBox.classList.add('lfu-anim-home'); awayBox.classList.add('lfu-anim-away'); }, 500);
            setTimeout(() => { homeText.classList.add('lfu-anim-text'); awayText.classList.add('lfu-anim-text'); homeStrip.classList.add('lfu-anim-strip'); awayStrip.classList.add('lfu-anim-strip'); }, 900);
            setTimeout(() => matchTimer.classList.add('lfu-anim-timer'), 1200);
            setTimeout(() => widget.classList.remove('lfu-intro-mode'), 2600);
        }, delay);
    },

    triggerBrasileiraoGoalAnimation(eventId, teamSide) {
        const scoreEl = document.getElementById(`score-${teamSide}-${eventId}`);
        const overlayEl = document.getElementById(`${teamSide}GoalOverlay-${eventId}`);
        if (!scoreEl || !overlayEl) return;

        // 1. Pop Score
        scoreEl.classList.add('pop');
        setTimeout(() => scoreEl.classList.remove('pop'), 300);

        // 2. Activate Goal Overlay
        overlayEl.classList.add('active');

        // 3. Remove after animation
        setTimeout(() => {
            overlayEl.classList.remove('active');
        }, 3500);
    },

    triggerGauchaoGoalAnimation(eventId, teamSide) {
        const scoreEl = document.getElementById(`score-${teamSide}-${eventId}`);
        const overlayEl = document.getElementById(`${teamSide}GoalOverlay-${eventId}`);
        if (!scoreEl || !overlayEl) return;

        scoreEl.classList.add('pop');
        setTimeout(() => scoreEl.classList.remove('pop'), 300);

        overlayEl.classList.add('active');

        setTimeout(() => {
            overlayEl.classList.remove('active');
        }, 3500);
    },

    triggerLfuGoalAnimation(eventId, teamSide) {
        const scoreEl = document.getElementById(`score-${teamSide}-${eventId}`);
        const overlayEl = document.getElementById(`${teamSide}GoalOverlay-${eventId}`);
        if (!scoreEl || !overlayEl) return;

        scoreEl.classList.add('pop');
        setTimeout(() => scoreEl.classList.remove('pop'), 200);

        overlayEl.classList.add('active');
        setTimeout(() => overlayEl.classList.remove('active'), 3500);
    },

    triggerLfuCardAnimation(eventId, teamSide, cardType) {
        const boxEl = document.getElementById(`${teamSide}Box-${eventId}`);
        if (!boxEl) return;
        const className = cardType === 'redcard' ? 'lfu-red-active' : 'lfu-yellow-active';
        boxEl.classList.add(className);
        setTimeout(() => boxEl.classList.remove(className), 3000);
    },

    triggerBrasileiraoCardAnimation(eventId, teamSide, cardType) {
        const boxEl = document.getElementById(`${teamSide}Box-${eventId}`);
        if (!boxEl) return;

        const className = cardType === 'redcard' ? 'red-active' : 'yellow-active';

        boxEl.classList.add(className);
        setTimeout(() => boxEl.classList.remove(className), 3000);
    },

    triggerGauchaoCardAnimation(eventId, teamSide, cardType) {
        const boxEl = document.getElementById(`${teamSide}Box-${eventId}`);
        if (!boxEl) return;

        const className = cardType === 'redcard' ? 'ga-red-active' : 'ga-yellow-active';

        boxEl.classList.add(className);
        setTimeout(() => boxEl.classList.remove(className), 3000);
    },

    triggerGoalAnimation(eventId, scoringTeam) {

        const elGoalOverlay = document.getElementById(`goal-overlay-${eventId}`);
        if (!elGoalOverlay) return; // Early exit if overlay is removed
        const elGoalContent = elGoalOverlay.querySelector('.unified-goal-content');
        const elGoalLogo = document.getElementById(`goal-overlay-logo-${eventId}`);
        const elGoalOs = document.getElementById(`goal-text-os-${eventId}`);
        elGoalLogo.src = scoringTeam.team.logos?.[0]?.href || '';
        elGoalOverlay.className = "unified-full-overlay";
        if (scoringTeam.team.color) {
            elGoalOverlay.style.background = `linear-gradient(90deg, #${scoringTeam.team.color} 0%, #${scoringTeam.team.alternateColor || scoringTeam.team.color} 100%)`;
        } else { elGoalOverlay.classList.add('bg-goal-generic'); }

        elGoalContent.classList.remove('animate'); elGoalOs.innerText = "";
        elGoalOverlay.classList.remove('active');
        setTimeout(() => elGoalOverlay.classList.add('active'), 50);

        setTimeout(() => {
            elGoalContent.classList.add('animate'); elGoalOs.style.opacity = 1;
            let oCount = 0; if (this.state.goalIntervals[eventId]) clearInterval(this.state.goalIntervals[eventId]);
            this.state.goalIntervals[eventId] = setInterval(() => {
                elGoalOs.innerText += "O"; oCount++; if (oCount >= 10) clearInterval(this.state.goalIntervals[eventId]);
            }, 30);
        }, 200);

        setTimeout(() => {
            elGoalOverlay.classList.remove('active');
            setTimeout(() => { elGoalContent.classList.remove('animate'); elGoalOs.innerText = ""; }, 500);
        }, 4000);
    },

    triggerCardAnimation(eventId, cardEvent, team) {
        const el = document.getElementById(`card-overlay-${eventId}`);
        if (!el) return;
        const isRed = cardEvent.type === 'redcard';
        el.className = `unified-full-overlay ${isRed ? 'bg-red-overlay' : 'bg-yellow-overlay'}`;
        document.getElementById(`card-overlay-label-${eventId}`).innerText = isRed ? "Cartão Vermelho" : "Cartão Amarelo";
        document.getElementById(`card-overlay-player-${eventId}`).innerText = (cardEvent.athletesInvolved?.[0]?.displayName || 'Jogador').toUpperCase();
        document.getElementById(`card-overlay-logo-${eventId}`).src = team.team.logos?.[0]?.href || '';
        const pPhoto = document.getElementById(`card-overlay-photo-${eventId}`);
        pPhoto.src = cardEvent.athletesInvolved?.[0]?.headshot?.href || 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iI2EwYTBiMiI+PHBhdGggZD0iTTEyIDJDNi40OCAyIDIgNi40OCAyIDEyczQuNDggMTAgMTAgMTAgMTAtNC40OCAxMC0xMFMxNy41MiAyIDEyIDJ6bTAgMy41YzEuOTMgMCAzLjUgMS41NyAzLjUgMy41UzEzLjkzIDEyLjUgMTIgMTIuNXMtMy41LTEuNTctMy41LTMuNVMxMC4wNyA1LjUgMTIgNS41em0wIDEzLjVjLTIuOTcgMC02LjYxIDEuNDYtOC4wMyA0LjA0QzQuNDIgMjEuMjYgOC4wNiAyMiAxMiAyMnMyLjYxLS43NCAzLjk3LTEuNDZjLTEuNDItMi41OC01LjA2LTQuMDQtOC4wMy00LjA0eiIvPjwvc3ZnPg==';
        el.classList.remove('active'); setTimeout(() => el.classList.add('active'), 50); setTimeout(() => el.classList.remove('active'), 4000);
    },

    triggerSubstitutionAnimation(eventId, subEvent, team) {
        const el = document.getElementById(`sub-overlay-${eventId}`); if (!el) return;
        const pOut = subEvent.athletesInvolved?.find(a => a.type === 'athleteout');
        const pIn = subEvent.athletesInvolved?.find(a => a.type === 'athletein');
        if (!pIn || !pOut) return;
        el.className = "unified-full-overlay bg-sub-overlay";
        document.getElementById(`sub-overlay-logo-${eventId}`).src = team.team.logos?.[0]?.href || '';
        document.getElementById(`sub-player-out-name-${eventId}`).innerText = pOut.displayName.toUpperCase();
        document.getElementById(`sub-player-in-name-${eventId}`).innerText = pIn.displayName.toUpperCase();
        document.getElementById(`sub-player-out-photo-${eventId}`).src = pOut.headshot?.href || 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iI2EwYTBiMiI+PHBhdGggZD0iTTEyIDJDNi40OCAyIDIgNi40OCAyIDEyczQuNDggMTAgMTAgMTAgMTAtNC40OCAxMC0xMFMxNy41MiAyIDEyIDJ6bTAgMy41YzEuOTMgMCAzLjUgMS41NyAzLjUgMy41UzEzLjkzIDEyLjUgMTIgMTIuNXMtMy41LTEuNTctMy41LTMuNVMxMC4wNyA1LjUgMTIgNS41em0wIDEzLjVjLTIuOTcgMC02LjYxIDEuNDYtOC4wMyA0LjA0QzQuNDIgMjEuMjYgOC4wNiAyMiAxMiAyMnMyLjYxLS43NCAzLjk3LTEuNDZjLTEuNDItMi41OC01LjA2LTQuMDQtOC4wMy00LjA0eiIvPjwvc3ZnPg==';
        document.getElementById(`sub-player-in-photo-${eventId}`).src = pIn.headshot?.href || 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iI2EwYTBiMiI+PHBhdGggZD0iTTEyIDJDNi40OCAyIDIgNi40OCAyIDEyczQuNDggMTAgMTAgMTAgMTAtNC40OCAxMC0xMFMxNy41MiAyIDEyIDJ6bTAgMy41YzEuOTMgMCAzLjUgMS41NyAzLjUgMy41UzEzLjkzIDEyLjUgMTIgMTIuNXMtMy41LTEuNTctMy41LTMuNVMxMC4wNyA1LjUgMTIgNS41em0wIDEzLjVjLTIuOTcgMC02LjYxIDEuNDYtOC4wMyA0LjA0QzQuNDIgMjEuMjYgOC4wNiAyMiAxMiAyMnMyLjYxLS43NCAzLjk3LTEuNDZjLTEuNDItMi41OC01LjA2LTQuMDQtOC4wMy00LjA0eiIvPjwvc3ZnPg==';
        el.classList.remove('active'); setTimeout(() => el.classList.add('active'), 50); setTimeout(() => el.classList.remove('active'), 4500);
    },

    triggerVARAnimation(eventId, varEvent) {
        const el = document.getElementById(`var-overlay-${eventId}`); if (!el) return;
        el.className = "unified-full-overlay bg-[var(--bg-secondary)]";
        const title = document.getElementById(`var-title-${eventId}`);
        const sub = document.getElementById(`var-subtitle-${eventId}`);
        title.innerText = "CHECANDO LANCE"; sub.innerText = varEvent.text || "ÁRBITRO DE VÍDEO";
        el.classList.remove('active'); setTimeout(() => el.classList.add('active'), 50);
        setTimeout(() => {
            let decision = "LANCE CHECADO";
            const txt = (varEvent.text || "").toLowerCase();
            if (txt.includes('confirmado') || txt.includes('awarded')) decision = "GOL CONFIRMADO";
            else if (txt.includes('anulado') || txt.includes('disallowed')) decision = "GOL ANULADO";
            else if (txt.includes('pênalti')) decision = "PÊNALTI";
            else if (txt.includes('vermelho')) decision = "CARTÃO VERMELHO";
            title.innerText = decision; sub.innerText = "REVISÃO CONCLUÍDA";
            setTimeout(() => el.classList.remove('active'), 3000);
        }, 5000);
    },

    triggerEndOfGameAnimation(eventId) {
        const el = document.getElementById(`eog-overlay-${eventId}`); if (!el) return;
        el.classList.remove('active'); setTimeout(() => el.classList.add('active'), 50); setTimeout(() => el.classList.remove('active'), 5000);
    },

    startLiveCardTimer(eventId, competitionStatus) {
        const timeEl = document.getElementById(`timer-pill-${eventId}`);
        if (!timeEl || timeEl.dataset.timerActive) return null;
        timeEl.dataset.timerActive = 'true';
        const initialClock = competitionStatus.displayClock;
        const period = competitionStatus.period;
        const fetchTimestamp = Date.now();
        let baseMinutes = 0, addedMinutes = 0;
        if (initialClock.includes('+')) { const parts = initialClock.replace("'", "").split('+'); baseMinutes = parseInt(parts[0]) || 0; addedMinutes = parseInt(parts[1]) || 0; }
        else { baseMinutes = parseInt(initialClock.replace("'", '')) || 0; }
        const initialTotalSeconds = (baseMinutes * 60) + (addedMinutes * 60);

        return setInterval(() => {
            const elapsedSeconds = Math.floor((Date.now() - fetchTimestamp) / 1000);
            const currentTotalSeconds = initialTotalSeconds + elapsedSeconds;
            const isPL = timeEl.classList.contains('pl-timer-container');
            let timeString;

            if (isPL) {
                const minutes = Math.floor(currentTotalSeconds / 60);
                const seconds = currentTotalSeconds % 60;
                timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            } else {
                const regularTimeEnd = period === 1 ? 45 : 90;
                const regularTimeEndSeconds = regularTimeEnd * 60;
                if (currentTotalSeconds < regularTimeEndSeconds) {
                    timeString = `${String(Math.floor(currentTotalSeconds / 60)).padStart(2, '0')}:${String(currentTotalSeconds % 60).padStart(2, '0')} +00:00`;
                } else {
                    const stoppageSeconds = currentTotalSeconds - regularTimeEndSeconds;
                    timeString = `${String(regularTimeEnd).padStart(2, '0')}:00 +${String(Math.floor(stoppageSeconds / 60)).padStart(2, '0')}:${String(stoppageSeconds % 60).padStart(2, '0')}`;
                }
            }
            timeEl.innerHTML = `<span>${timeString}</span>`;
        }, 1000);
    },

    startLiveMatchTimer(competitionStatus, details) {
        const timeEl = document.getElementById('modal-time'); if (!timeEl) return;
        const initialClock = competitionStatus.displayClock; const period = competitionStatus.period; const fetchTimestamp = Date.now();
        let baseMinutes = 0, addedMinutes = 0;
        if (initialClock.includes('+')) { const parts = initialClock.replace("'", "").split('+'); baseMinutes = parseInt(parts[0]) || 0; addedMinutes = parseInt(parts[1]) || 0; } else { baseMinutes = parseInt(initialClock.replace("'", "")) || 0; }
        let initialTotalSeconds = (baseMinutes * 60) + (addedMinutes * 60);
        let stoppageTime = 0;
        const stoppageEvent = details?.find(e => e.period === period && e.type === 'stoppagetime');
        if (stoppageEvent && stoppageEvent.clock?.displayValue) { stoppageTime = parseInt(stoppageEvent.clock.displayValue.replace(/[+']/g, '')) || 0; }

        this.state.matchTimerInterval = setInterval(() => {
            const currentTotalSeconds = initialTotalSeconds + Math.floor((Date.now() - fetchTimestamp) / 1000);
            const regularTimeEnd = period === 1 ? 45 : 90; const regularTimeEndSeconds = regularTimeEnd * 60;
            let timeString;
            if (currentTotalSeconds < regularTimeEndSeconds) { timeString = `${String(Math.floor(currentTotalSeconds / 60)).padStart(2, '0')}:${String(currentTotalSeconds % 60).padStart(2, '0')} +00:00`; }
            else {
                const stoppageSeconds = currentTotalSeconds - regularTimeEndSeconds; const stoppageMinutes = Math.floor(stoppageSeconds / 60); const stoppageRemainingSeconds = stoppageSeconds % 60;
                if (stoppageTime > 0 && stoppageMinutes >= stoppageTime) { timeString = `${String(regularTimeEnd).padStart(2, '0')}:00 +${String(stoppageTime).padStart(2, '0')}:00`; }
                else { timeString = `${String(regularTimeEnd).padStart(2, '0')}:00 +${String(stoppageMinutes).padStart(2, '0')}:${String(stoppageRemainingSeconds).padStart(2, '0')}`; }
            }
            timeEl.innerText = timeString;
        }, 1000);
    },

    closeModal() {
        document.getElementById('match-modal').classList.remove('open');
        if (this.state.matchTimerInterval) { clearInterval(this.state.matchTimerInterval); this.state.matchTimerInterval = null; }
        if (this.state.liveModalUpdateInterval) { clearInterval(this.state.liveModalUpdateInterval); this.state.liveModalUpdateInterval = null; }
        this.closePip();

        const audio = document.getElementById('silent-audio');
        if (audio) {
            audio.pause();
        }
        if ('mediaSession' in navigator) navigator.mediaSession.metadata = null;

    },

    togglePip() {
        if (this.state.pipWindow) { this.closePip(); }
        else { this.openPip(); }
    },

    async openPip() {
        if (!('documentPictureInPicture' in window)) { alert('Seu navegador não suporta o modo Picture-in-Picture para este conteúdo.'); return; }
        if (!this.state.currentMatchData) return;
        document.getElementById('pip-button').classList.add('text-[var(--accent)]');
        const pipWindow = await documentPictureInPicture.requestWindow({ width: 500, height: 180 });
        this.state.pipWindow = pipWindow;

        [...document.styleSheets].forEach((styleSheet) => {
            try {
                const cssRules = [...styleSheet.cssRules].map((rule) => rule.cssText).join('');
                const style = document.createElement('style');
                style.textContent = cssRules;
                pipWindow.document.head.appendChild(style);
            } catch (e) {
                const link = document.createElement('link');
                link.rel = 'stylesheet'; link.type = styleSheet.type; link.media = styleSheet.media; link.href = styleSheet.href;
                pipWindow.document.head.appendChild(link);
            }
        });
        const tailwind = document.createElement('script');
        tailwind.src = "https://cdn.tailwindcss.com";
        pipWindow.document.head.appendChild(tailwind);
        pipWindow.document.body.style.backgroundColor = 'var(--bg-primary)';
        pipWindow.document.body.innerHTML = `<div id="pip-content-wrapper" class="p-2"></div>`;
        this.updatePipContent();
        pipWindow.addEventListener('pagehide', () => {
            this.state.pipWindow = null;
            const pipButton = document.getElementById('pip-button');
            if (pipButton) pipButton.classList.remove('text-[var(--accent)]');
        });
    },

    closePip() {
        if (this.state.pipWindow) {
            this.state.pipWindow.close();
            this.state.pipWindow = null;
            const pipButton = document.getElementById('pip-button');
            if (pipButton) pipButton.classList.remove('text-[var(--accent)]');
        }
    },

    updatePipContent() {
        if (!this.state.pipWindow || !this.state.currentMatchData) return;
        const pipBody = this.state.pipWindow.document.body;
        const wrapper = pipBody.querySelector('#pip-content-wrapper');
        if (!wrapper) return;

        const d = this.state.currentMatchData;
        const lConfig = SPORTS_DB.soccer.leagues[this.state.currentLeague];

        wrapper.innerHTML = this._getScoreboardHTML(d.header, lConfig, { isPip: true });

        if (this.state.theme === 'light') { pipBody.classList.add('light-mode'); } else { pipBody.classList.remove('light-mode'); }
    },

    setTacticalFormation(teamType, formationName) {
        const coords = this.formations[formationName] || this.formations['default'];
        const players = document.querySelectorAll(`#pitch-${teamType} .player`);
        players.forEach((el, index) => { if (coords[index]) { el.style.top = coords[index].t + '%'; el.style.left = coords[index].l + '%'; } });
    },

    switchMatchModalTab(tabId) {
        const tabsContainer = document.getElementById('match-modal-tabs'); if (!tabsContainer) return;
        const inactiveClass = 'px-6 py-4 text-sm font-bold border-b-2 transition whitespace-nowrap text-[var(--text-muted)] border-transparent hover:text-[var(--text-primary)]';
        const activeClass = 'px-6 py-4 text-sm font-bold border-b-2 transition whitespace-nowrap text-[var(--text-primary)] border-[var(--accent)]';
        tabsContainer.querySelectorAll('button').forEach(btn => { btn.className = (btn.dataset.tab === tabId) ? activeClass : inactiveClass; });
        document.querySelectorAll('.match-tab-pane').forEach(pane => { pane.classList.add('hidden'); });
        const activePane = document.getElementById(`match-tab-${tabId}`);
        if (tabId === 'broadcast') { this.fetchBroadcastForMatch(); }
        if (activePane) { activePane.classList.remove('hidden'); }
    },

    toggleMobileLeague() {
        const m = document.getElementById('mob-league-menu');
        if (m) { m.classList.toggle('hidden'); m.classList.toggle('flex'); }
    },

    toggleSidebar() {
        const sidebar = document.getElementById('app-sidebar');
        if (!sidebar) return;

        // Se estiver oculto, exibe
        if (window.getComputedStyle(sidebar).display === 'none') {
            sidebar.style.setProperty('display', 'flex', 'important');
            if (window.innerWidth < 1024) {
                sidebar.classList.add('absolute', 'h-full', 'shadow-2xl');
            }
        } else { // Se estiver visível, oculta
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
        this.state.view = v; this.closeWiki();
        document.querySelectorAll('.view-section').forEach(e => e.classList.add('hidden'));
        const viewEl = document.getElementById(`view-${v}`); if (viewEl) viewEl.classList.remove('hidden');
        const mainScroll = document.getElementById('main-scroll'); if (mainScroll) mainScroll.scrollTop = 0;
        this.updateActiveNav(v);
        this.loadDataForView();
    }
};

document.addEventListener('DOMContentLoaded', () => {
    if (window.lucide) window.lucide.createIcons();
    app.init();
});