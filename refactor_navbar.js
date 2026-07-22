const fs = require('fs');

function refactorApp() {
  const path = 'C:/Users/W3/Desktop/Projetos/W3Labs-Sports/App.jsx';
  let content = fs.readFileSync(path, 'utf8');

  // 1. Update SPORTS_DB views
  const oldViews = `    views: [
      { id: 'matches', name: 'Jogos', icon: <CalendarDays size={20} /> },
      { id: 'standings', name: 'Classificação', icon: <Trophy size={20} /> },
      { id: 'clubs', name: 'Clubes', icon: <Shield size={20} /> },
      { id: 'news', name: 'Notícias', icon: <Zap size={20} /> }
    ],`;
    
  const newViews = `    views: [
      { id: 'news', name: 'Notícias', icon: <Zap size={20} /> },
      { id: 'clubs', name: 'Clubes', icon: <Shield size={20} /> },
      { id: 'scorers', name: 'Artilheiros', icon: <Target size={20} /> },
      { id: 'matches', name: 'Jogos', icon: <CalendarDays size={20} /> },
      { id: 'standings', name: 'Classificação', icon: <Trophy size={20} /> }
    ],`;

  content = content.replace(oldViews, newViews);

  // 2. Replace MobileInterface bottom nav
  const oldNavStart = `{/* Bottom Navigation for Mobile */}`;
  const oldNavEnd = `</nav>`;
  const navStartIndex = content.indexOf(oldNavStart);
  if (navStartIndex !== -1) {
    const navEndIndex = content.indexOf(oldNavEnd, navStartIndex) + oldNavEnd.length;
    
    const newNav = `{/* Bottom Navigation for Mobile */}
      <div className="fixed bottom-6 left-0 right-0 flex justify-center z-50 px-4 pointer-events-none">
        <nav className="flex justify-between items-center bg-[#131417] p-2 rounded-[24px] w-full max-w-md shadow-2xl pointer-events-auto border border-white/5">
          <div className="flex w-full justify-around items-center bg-[#1D1F24] rounded-[18px] py-1 px-1 relative">
            {sportConfig.views.map((v, index) => {
              const isActive = view === v.id;
              const isCenter = index === 2;

              if (isCenter) {
                return (
                  <button
                    key={v.id}
                    onClick={() => setView(v.id)}
                    className="flex justify-center items-center -mt-8 rounded-full bg-[#539DF3] border-4 border-[#1D1F24] w-14 h-14 shadow-[0_4px_20px_rgba(83,157,243,0.4)] transition-transform hover:scale-105 z-10"
                  >
                    {React.cloneElement(v.icon, { color: '#FFF', size: 24 })}
                  </button>
                );
              }

              return (
                <button
                  key={v.id}
                  onClick={() => setView(v.id)}
                  className={\`flex flex-col items-center justify-center transition-all duration-300 rounded-[100px] h-[48px] px-3 \${
                    isActive ? 'bg-[rgba(83,157,243,0.15)] min-w-[74px]' : 'hover:bg-white/5 min-w-[50px]'
                  }\`}
                >
                  <div className={isActive ? 'text-[#539DF3]' : 'text-[#676D75]'}>
                    {React.cloneElement(v.icon, { 
                      color: isActive ? '#539DF3' : '#676D75',
                      size: isActive ? 22 : 24 
                    })}
                  </div>
                  {isActive && (
                    <span className="text-[11px] font-medium text-[#539DF3] mt-1 tracking-tight">
                      {v.name.split(' ')[0]}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </nav>
      </div>`;

    content = content.slice(0, navStartIndex) + newNav + content.slice(navEndIndex);
  }

  // 3. Add Scorers placeholder to mainContent
  const clubsView = `{view === 'clubs' && <WikiSearch />}`;
  const scorersPlaceholder = `
          {view === 'scorers' && (
            <div className="max-w-4xl mx-auto flex flex-col items-center justify-center py-20 text-center">
              <div className="w-20 h-20 bg-[#539DF3]/10 rounded-full flex items-center justify-center mb-6 border border-[#539DF3]/20">
                <Target size={40} color="#539DF3" />
              </div>
              <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-2">Artilheiros</h2>
              <p className="text-[var(--text-muted)] max-w-md">O ranking completo de artilheiros do campeonato estará disponível em breve com a nova integração de dados.</p>
            </div>
          )}
  `;
  content = content.replace(clubsView, clubsView + scorersPlaceholder);

  fs.writeFileSync(path, content);
  console.log("App.jsx refactored successfully.");
}

refactorApp();
