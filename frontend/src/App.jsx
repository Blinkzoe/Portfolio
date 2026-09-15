import { useState } from 'react';

export default function App() {
  const [activeTech, setActiveTech] = useState(null);

  // Manejador del clic en los botones de habilidades
  const handleTechClick = (techName) => {
    setActiveTech(techName);
    
    // Si quieres intentar registrarlo en el backend sin que rompa la página si no existe la ruta:
    fetch(`/api/track`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ section: techName, timestamp: new Date().toISOString() })
    }).catch(() => {
      // Silenciamos cualquier error de red para que la experiencia de usuario sea fluida
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-indigo-500 selection:text-white">
      {/* Header */}
      <header className="border-b border-slate-800/80 bg-slate-900/50 backdrop-blur sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="font-bold text-sm tracking-wider text-indigo-400">ORLANDO MORALES</span>
          <a 
            href="/analytics" 
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold rounded-lg transition text-white shadow-lg shadow-indigo-500/20"
          >
            📊 Ver Panel de Analytics (IPs)
          </a>
        </div>
      </header>

      {/* Main Content (CV) */}
      <main className="max-w-4xl mx-auto px-6 py-12 w-full space-y-10">
        {/* Presentación */}
        <div className="border border-slate-800 bg-slate-900/60 p-8 rounded-2xl shadow-xl space-y-4">
          <span className="inline-block text-xs font-semibold px-3 py-1 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-full">
            Senior Software Integration & Automation Engineer
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">
            Orlando Morales
          </h1>
          <p className="text-slate-400 text-sm md:text-base leading-relaxed">
            Ingeniero en Sistemas Computacionales con amplia trayectoria en desarrollo full-stack, automatización de flujos empresariales y arquitecturas Linux auto-hospedadas con Docker. Residente en Guadalajara, México.
          </p>
        </div>

        {/* Experiencia */}
        <div className="border border-slate-800 bg-slate-900/60 p-8 rounded-2xl shadow-xl space-y-6">
          <h2 className="text-xl font-bold text-indigo-400 border-b border-slate-800 pb-3">Experiencia Profesional</h2>
          <div>
            <div className="flex justify-between items-center text-sm font-semibold text-white">
              <span>Senior Software Developer & Automation Lead</span>
              <span className="text-xs text-indigo-300 bg-indigo-950 px-2.5 py-1 rounded border border-indigo-800">OpenText / Micro Focus</span>
            </div>
            <p className="text-xs text-slate-400 mt-1">Liderazgo técnico en integración de software, automatización de procesos y arquitecturas escalables.</p>
          </div>
        </div>

        {/* Home Lab & Tecnologías (Interactivos para aprender React) */}
        <div className="border border-slate-800 bg-slate-900/60 p-8 rounded-2xl shadow-xl space-y-6">
          <h2 className="text-xl font-bold text-cyan-400 border-b border-slate-800 pb-3">Home Lab & Tecnologías</h2>
          <p className="text-xs text-slate-400">Haz clic en las tecnologías para interactuar con el estado de React:</p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <button 
              onClick={() => handleTechClick('Docker & Linux')}
              className={`p-3 border rounded-xl text-left text-xs font-medium transition ${
                activeTech === 'Docker & Linux' 
                  ? 'bg-indigo-600/30 border-indigo-500 text-indigo-200' 
                  : 'bg-slate-800/60 hover:bg-slate-800 border-slate-700/60 text-slate-200'
              }`}
            >
              🐳 Docker & Linux
            </button>
            <button 
              onClick={() => handleTechClick('React & Frontend')}
              className={`p-3 border rounded-xl text-left text-xs font-medium transition ${
                activeTech === 'React & Frontend' 
                  ? 'bg-indigo-600/30 border-indigo-500 text-indigo-200' 
                  : 'bg-slate-800/60 hover:bg-slate-800 border-slate-700/60 text-slate-200'
              }`}
            >
              ⚛️ React & Vite
            </button>
            <button 
              onClick={() => handleTechClick('FastAPI & Python')}
              className={`p-3 border rounded-xl text-left text-xs font-medium transition ${
                activeTech === 'FastAPI & Python' 
                  ? 'bg-indigo-600/30 border-indigo-500 text-indigo-200' 
                  : 'bg-slate-800/60 hover:bg-slate-800 border-slate-700/60 text-slate-200'
              }`}
            >
              🐍 FastAPI & Python
            </button>
          </div>

          {activeTech && (
            <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-xl flex items-center justify-between animate-fadeIn">
              <span className="text-xs text-slate-300">
                Seleccionado recientemente: <strong className="text-indigo-400">{activeTech}</strong>
              </span>
              <span className="text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-800 px-2 py-0.5 rounded">
                Estado Actualizado ⚡
              </span>
            </div>
          )}
        </div>
      </main>

      <footer className="border-t border-slate-900 py-6 text-center text-xs text-slate-600">
        <p>© {new Date().getFullYear()} Orlando Morales. Guadalajara, México.</p>
      </footer>
    </div>
  );
}
