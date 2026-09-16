import { trackAction } from '../utils/tracking';

export default function Header() {

  const handleContact = () => {
    trackAction('Header: Contact');

    window.location.href = 'mailto:Orlando_zoe_m@hotmail.com';
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-slate-200/70">

      <div className="max-w-6xl mx-auto px-5 md:px-8 h-16 flex items-center justify-between">

        <div className="flex items-center gap-3">

          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-blue-200/50">
            OM
          </div>

          <div className="hidden sm:block">
            <div className="text-sm font-bold text-slate-800">
              Orlando Morales
            </div>

            <div className="text-[10px] text-slate-400">
              Data & Software Engineer
            </div>
          </div>

        </div>

        <div className="flex items-center gap-4">

          <div className="hidden md:flex items-center gap-2 text-xs text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            Guadalajara, MX
          </div>

          <button
            onClick={handleContact}
            className="px-4 py-2 rounded-full bg-slate-900 text-white text-xs font-semibold hover:bg-blue-600 transition"
          >
            Contact
          </button>

        </div>

      </div>

    </header>
  );
}
