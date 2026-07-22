const fs = require('fs');
const path = 'C:/Users/W3/Desktop/Projetos/W3Labs-Sports/App.jsx';
let content = fs.readFileSync(path, 'utf8');

const topInsert = `function useIsMobile() {
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < 768 : true
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isMobile;
}

const WebInterface = ({
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
  <div className={\`h-screen w-full flex overflow-hidden \${theme === 'light' ? 'light-mode' : ''}\`}>
    <div id="app-background" style={{ backgroundImage: \`url(\${leagueConfig.bg})\` }}></div>

    {/* Sidebar Desktop */}
    <aside className="w-64 bg-[var(--bg-secondary)] border-r border-[var(--border-color)] flex flex-col z-20 p-6">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-[var(--accent)] flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
          <Trophy size={20} />
        </div>
        <span className="font-bold text-xl tracking-tight text-[var(--text-primary)]">W3Labs-Sports</span>
      </div>

      <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Navegação</div>
      <div className="space-y-1 mb-8">
        {sportConfig.views.map(v => (
          <button
            key={v.id}
            onClick={() => setView(v.id)}
            className={\`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition font-medium text-sm
              \${view === v.id ? 'bg-[var(--accent)]/10 text-[var(--text-primary)] border border-[var(--accent)]/20' : 'text-gray-400 hover:bg-white/5 hover:text-white'}
            \`}
          >
            <span className={view === v.id ? 'text-[var(--accent)]' : ''}>{v.icon}</span>
            {v.name}
          </button>
        ))}
      </div>

      <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Ligas</div>
      <div className="space-y-1 overflow-y-auto flex-1 custom-scroll">
        {Object.entries(sportConfig.leagues).map(([key, league]) => (
          <button
            key={key}
            onClick={() => setCurrentLeague(key)}
            className={\`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition
              \${currentLeague === key ? 'bg-white/10 text-[var(--text-primary)]' : 'text-gray-400 hover:bg-white/5 hover:text-white'}
            \`}
          >
            <img src={league.logo} alt={league.name} className="w-5 h-5 object-contain" />
            <span className="text-sm font-medium">{league.name}</span>
          </button>
        ))}
      </div>
    </aside>

    {/* Main Content Area */}
    <main className="flex-1 flex flex-col relative h-full overflow-hidden">
      {/* Header */}
      <header className="h-16 px-6 flex items-center justify-between border-b border-[var(--border-color)] bg-[var(--header-bg)] backdrop-blur-md z-10 sticky top-0">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <img src={leagueConfig.logo} alt="League" className="w-8 h-8 object-contain" />
            <h1 className="font-bold text-lg text-[var(--text-primary)]">{leagueConfig.name}</h1>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 border border-[var(--border-color)] text-[var(--text-primary)] hover:bg-white/10 transition"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </header>

      {children}
    </main>
  </div>
);

const MobileInterface = ({
  theme,
  setTheme,
  sportConfig,
  leagueConfig,
  view,
  setView,
  isSidebarOpen,
  setIsSidebarOpen,
  children
}) => (
  <div className={\`h-screen w-full flex flex-col overflow-hidden \${theme === 'light' ? 'light-mode' : ''}\`}>
    <div id="app-background" style={{ backgroundImage: \`url(\${leagueConfig.bg})\` }}></div>

    {/* Main Content Area */}
    <main className="flex-1 flex flex-col relative h-full overflow-hidden">
      {/* Header */}
      <header className="h-16 px-4 flex items-center justify-between border-b border-[var(--border-color)] bg-[var(--header-bg)] backdrop-blur-md z-10 sticky top-0">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <img src={leagueConfig.logo} alt="League" className="w-8 h-8 object-contain" />
            <h1 className="font-bold text-lg text-[var(--text-primary)] sm:block">{leagueConfig.name}</h1>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 border border-[var(--border-color)] text-[var(--text-primary)] hover:bg-white/10 transition"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </header>

      {children}

      {/* Bottom Navigation for Mobile */}
      <nav className="bottom-nav flex justify-around items-center bg-[var(--nav-bg)] backdrop-blur-md border border-[var(--border-color)] fixed bottom-6 left-[5%] right-[5%] py-3 px-6 rounded-full shadow-2xl z-50">
        {sportConfig.views.map(v => (
          <button
            key={v.id}
            onClick={() => setView(v.id)}
            className={\`flex flex-col items-center gap-1 text-[10px] transition \${view === v.id ? 'text-[var(--accent)] font-bold' : 'text-[var(--text-muted)]'}\`}
          >
            {v.icon}
            <span>{v.name.split(' ')[0]}</span>
          </button>
        ))}
      </nav>
    </main>
  </div>
);
`;

content = content.replace('export default function App() {', topInsert + '\nexport default function App() {\n  const isMobile = useIsMobile();');

const lines = content.split('\n');
const returnIndex = lines.findIndex((l, i) => i > 800 && l.trim() === 'return (');
if (returnIndex !== -1) {
  const replacementLines = `  const mainContent = (
    <div id="main-scroll" className="flex-1 overflow-y-auto p-4 md:p-8 pb-32">
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
                <div className="flex flex-col gap-6">
                  {matchesData.map(ev => (
                    <div key={ev.id} className="cursor-pointer hover:scale-[1.01] transition-transform duration-300" onClick={() => setSelectedMatchId(ev.id)}>
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
                      <div key={row.team.id} className={\`cbf-standings-row\`}>
                        <div className={\`cbf-rank-cell \${getZoneClass(row.note)}\`}><span>{val('rank')}</span></div>
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {newsData.length === 0 ? <div className="text-gray-500">Sem notícias no momento.</div> : newsData.map((n, i) => (
                  <a key={i} href={n.links?.web?.href} target="_blank" rel="noreferrer" className="glass-panel group block hover:-translate-y-1 transition duration-300">
                    <div className="aspect-video w-full overflow-hidden border-b border-[var(--border-color)] bg-black/50">
                      {n.images?.[0]?.url && <img src={n.images[0].url} alt="" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />}
                    </div>
                    <div className="p-4 flex flex-col h-full">
                      <h3 className="font-bold text-lg leading-snug group-hover:text-[var(--accent)] transition mb-4">{n.headline}</h3>
                      <p className="mt-auto text-xs text-gray-500 flex items-center gap-1"><Clock size={12} /> {n.published || 'Recente'}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}

          {view === 'clubs' && <WikiSearch />}
        </>
      )}
    </div>
  );

  if (isMobile) {
    return (
      <MobileInterface
        theme={theme}
        setTheme={setTheme}
        sportConfig={sportConfig}
        leagueConfig={leagueConfig}
        view={view}
        setView={setView}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      >
        {mainContent}
      </MobileInterface>
    );
  }

  return (
    <WebInterface
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
    </WebInterface>
  );
}`;
  
  const endBracketIndex = lines.lastIndexOf('}');
  const newLines = [...lines.slice(0, returnIndex), replacementLines, ...lines.slice(endBracketIndex + 1)];
  fs.writeFileSync(path, newLines.join('\n'));
}
