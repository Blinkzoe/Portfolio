import { useEffect } from 'react';
import { trackAction } from '../utils/tracking';
import perfilImg from '../assets/perfil.jpg';

export default function Home({ onNavigate }) {

  useEffect(() => {
    trackAction('Home: View');
  }, []);

  const goTo = (tab, name) => {
    trackAction(`Home: ${name}`);
    onNavigate(tab, name);
  };

  return (
    <div className="max-w-6xl mx-auto px-5 md:px-8 py-10 md:py-14">
      <div className="space-y-10">

        {/* HERO */}
        <section className="relative overflow-hidden rounded-[2rem] bg-white border border-slate-200 shadow-sm">
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-70" />
          <div className="absolute -bottom-40 left-20 w-96 h-96 bg-violet-100 rounded-full blur-3xl opacity-60" />

          <div className="relative grid md:grid-cols-[1.2fr_0.8fr] gap-10 items-center p-8 md:p-14">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-[11px] font-semibold mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                DATA ENGINEER & SOFTWARE ENGINEER
              </div>

              <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-[1.05] text-slate-900">
                Orlando Zoé
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-violet-500">
                  Morales Lomelí
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-base md:text-lg leading-relaxed text-slate-500">
                14 years building enterprise software, data solutions,
                automation workflows and system integrations.
              </p>

              <div className="flex flex-wrap gap-3 mt-7">
                <button
                  onClick={() => goTo('experience', 'Experience')}
                  className="px-5 py-3 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-blue-600 transition shadow-lg"
                >
                  View Experience →
                </button>
                <button
                  onClick={() => goTo('projects', 'Projects')}
                  className="px-5 py-3 rounded-xl border border-slate-200 bg-white text-slate-700 text-xs font-semibold hover:border-blue-300 hover:text-blue-600 transition"
                >
                  Explore Projects
                </button>
              </div>

              <div className="flex flex-wrap gap-x-6 gap-y-2 mt-7 text-xs text-slate-400">
                <span>📍 Guadalajara, Mexico</span>
                <a
                  href="mailto:Orlando_zoe_m@hotmail.com"
                  onClick={() => trackAction('Home: Email')}
                  className="hover:text-blue-500"
                >
                  ✉ Orlando_zoe_m@hotmail.com
                </a>
              </div>
            </div>

            {/* PROFILE CARD CON FOTO */}
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-200 to-violet-200 rounded-[3rem] rotate-6 scale-95" />

                <div className="relative w-56 h-64 md:w-64 md:h-72 rounded-[3rem] bg-gradient-to-br from-slate-800 to-slate-950 overflow-hidden border-8 border-white shadow-xl flex items-center justify-center">
                  <img 
                    src={perfilImg} 
                    alt="Orlando Zoé Morales Lomelí" 
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="absolute -bottom-4 -left-5 px-4 py-3 bg-white rounded-2xl shadow-lg border border-slate-100">
                  <div className="text-[10px] text-slate-400">Experience</div>
                  <div className="font-bold text-slate-800">14+ years</div>
                </div>
              </div>
            </div>

          </div>
        </section>


        {/* QUICK SUMMARY */}
        <section>
          <div className="flex items-end justify-between mb-5">
            <div>
              <p className="text-xs font-semibold text-blue-500 uppercase tracking-widest">
                Overview
              </p>
              <h2 className="text-2xl font-bold text-slate-900 mt-1">
                What I work with
              </h2>
            </div>
            <button
              onClick={() => goTo('skills', 'Skills')}
              className="hidden sm:block text-xs text-blue-500 hover:text-blue-700"
            >
              Explore all skills →
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                icon: '◉',
                title: 'Data',
                text: 'Python · SQL · Spark'
              },
              {
                icon: '⚡',
                title: 'Automation',
                text: 'APIs · RPA · Scraping'
              },
              {
                icon: '◇',
                title: 'Integration',
                text: 'Systems · Enterprise'
              },
              {
                icon: '▥',
                title: 'Analytics',
                text: 'Power BI · Tableau'
              }
            ].map((item) => (
              <button
                key={item.title}
                onClick={() => goTo('skills', `Skills: ${item.title}`)}
                className="text-left p-5 bg-white border border-slate-200 rounded-2xl hover:-translate-y-1 hover:shadow-md hover:border-blue-200 transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center text-lg mb-4">
                  {item.icon}
                </div>
                <h3 className="font-bold text-sm text-slate-800">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  {item.text}
                </p>
              </button>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
