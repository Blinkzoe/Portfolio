import { useEffect } from 'react';
import { trackAction } from '../utils/tracking';

export default function Contact() {

  useEffect(() => {
    trackAction('Contact: View');
  }, []);

  const handleLink = (name) => {
    trackAction(`Contact: ${name}`);
  };

  return (
    <div className="max-w-6xl mx-auto px-5 md:px-8 py-10 md:py-14">

      {/* HEADER */}
      <section className="relative overflow-hidden rounded-[2rem] bg-white border border-slate-200 shadow-sm">

        <div className="absolute -top-32 -right-32 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-70" />
        <div className="absolute -bottom-40 left-20 w-96 h-96 bg-violet-100 rounded-full blur-3xl opacity-60" />

        <div className="relative p-8 md:p-14">

          <p className="text-xs font-semibold text-blue-500 uppercase tracking-widest">
            Get in touch
          </p>

          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 mt-2">
            Let's build something useful.
          </h1>

          <p className="mt-5 text-base md:text-lg leading-relaxed text-slate-500 max-w-2xl">
            I'm open to conversations about software engineering, data,
            automation, enterprise systems and technology projects.
          </p>

          <div className="grid md:grid-cols-3 gap-4 mt-10">

            {/* EMAIL */}
            <a
              href="mailto:Orlando_zoe_m@hotmail.com"
              onClick={() => handleLink('Email')}
              className="group bg-slate-50 border border-slate-200 rounded-2xl p-5 hover:bg-white hover:border-blue-300 hover:shadow-md transition-all"
            >

              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center text-lg mb-4">
                ✉
              </div>

              <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400">
                Email
              </p>

              <p className="text-sm font-semibold text-slate-700 mt-1 break-all group-hover:text-blue-600 transition">
                Orlando_zoe_m@hotmail.com
              </p>

            </a>


            {/* LINKEDIN */}
            <a
              href="https://www.linkedin.com/in/orlando-morales-820790178/"
              target="_blank"
              rel="noreferrer"
              onClick={() => handleLink('LinkedIn')}
              className="group bg-slate-50 border border-slate-200 rounded-2xl p-5 hover:bg-white hover:border-blue-300 hover:shadow-md transition-all"
            >

              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center text-lg mb-4">
                in
              </div>

              <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400">
                LinkedIn
              </p>

              <p className="text-sm font-semibold text-slate-700 mt-1 group-hover:text-blue-600 transition">
                Professional Profile →
              </p>

            </a>


            {/* GITHUB */}
            <a
              href="https://github.com/Blinkzoe"
              target="_blank"
              rel="noreferrer"
              onClick={() => handleLink('GitHub')}
              className="group bg-slate-50 border border-slate-200 rounded-2xl p-5 hover:bg-white hover:border-blue-300 hover:shadow-md transition-all"
            >

              <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center text-lg mb-4">
                GH
              </div>

              <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400">
                GitHub
              </p>

              <p className="text-sm font-semibold text-slate-700 mt-1 group-hover:text-blue-600 transition">
                Blinkzoe →
              </p>

            </a>

          </div>

        </div>
      </section>


      {/* PROFILE */}
      <section className="mt-8 grid md:grid-cols-[1.2fr_0.8fr] gap-5">

        <div className="bg-slate-900 rounded-[2rem] p-7 md:p-10 text-white">

          <p className="text-xs font-semibold text-blue-300 uppercase tracking-widest">
            Professional Focus
          </p>

          <h2 className="text-2xl md:text-3xl font-bold mt-2">
            Software · Data · Automation · Enterprise
          </h2>

          <p className="text-sm leading-relaxed text-slate-300 mt-4 max-w-2xl">
            My background combines software development, data analysis,
            enterprise business systems and process automation. More recently,
            I've been expanding into local AI, RAG, distributed systems and
            self-hosted infrastructure.
          </p>

        </div>


        <div className="bg-white border border-slate-200 rounded-[2rem] p-7 md:p-8">

          <p className="text-xs font-semibold text-violet-500 uppercase tracking-widest">
            Location
          </p>

          <h2 className="text-xl font-bold text-slate-900 mt-2">
            Guadalajara, Jalisco
          </h2>

          <p className="text-sm text-slate-400 mt-1">
            Mexico
          </p>

          <div className="h-px bg-slate-100 my-6" />

          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
            Availability
          </p>

          <p className="text-sm text-slate-600 mt-2">
            Open to professional and technical opportunities.
          </p>

        </div>

      </section>


      {/* FOOTER CTA */}
      <section className="text-center py-12">

        <p className="text-sm text-slate-400">
          Have a project, technical challenge or opportunity?
        </p>

        <a
          href="mailto:Orlando_zoe_m@hotmail.com"
          onClick={() => handleLink('Contact CTA')}
          className="inline-flex mt-4 px-6 py-3 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-blue-600 transition shadow-lg"
        >
          Send me an email →
        </a>

      </section>

    </div>
  );
}
