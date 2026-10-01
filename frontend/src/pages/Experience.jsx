import { useEffect } from 'react';
import { trackAction } from '../utils/tracking';
import SectionHeader from '../components/SectionHeader';
import { experience } from '../data/experience';

export default function Experience() {

  useEffect(() => {
    trackAction('Experience: View');
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-5 md:px-8 py-10 md:py-14">

      <SectionHeader
        eyebrow="Career"
        title="Experience"
        description="14+ years combining enterprise systems, software engineering, data, automation and business operations."
      />

      <div className="relative mt-10">

        {/* Timeline line */}
        <div className="absolute left-[11px] top-2 bottom-2 w-px bg-slate-200 hidden md:block" />

        <div className="space-y-8">

          {experience.map((job, index) => (

            <article
              key={`${job.company}-${index}`}
              className="relative md:pl-12"
            >

              {/* Timeline point */}
              <div className="hidden md:flex absolute left-0 top-6 w-6 h-6 rounded-full bg-white border-4 border-blue-500 shadow-sm z-10" />

              <div className="bg-white border border-slate-200 rounded-[1.75rem] p-6 md:p-8 shadow-sm hover:shadow-md hover:border-blue-200 transition-all">

                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">

                  <div>

                    <div className="flex flex-wrap items-center gap-2 mb-2">

                      <span className="text-[10px] uppercase tracking-widest font-bold text-blue-500">
                        {job.period}
                      </span>

                      {index === 0 && (
                        <span className="px-2 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-[9px] font-bold uppercase tracking-wide">
                          Most Recent
                        </span>
                      )}

                    </div>

                    <h2 className="text-xl md:text-2xl font-bold text-slate-900">
                      {job.title}
                    </h2>

                    <p className="mt-1 text-sm font-semibold text-slate-500">
                      {job.company}
                    </p>

                    {job.previous && (
                      <p className="mt-1 text-xs text-slate-400">
                        {job.previous}
                      </p>
                    )}

                  </div>

                  <div className="text-xs text-slate-400 whitespace-nowrap">
                    📍 {job.location}
                  </div>

                </div>


                {/* Highlights */}
                <div className="mt-7">

                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-4">
                    Key Contributions
                  </p>

                  <div className="grid md:grid-cols-2 gap-x-8 gap-y-3">

                    {job.highlights.map((highlight, highlightIndex) => (

                      <div
                        key={highlightIndex}
                        className="flex items-start gap-3"
                      >

                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />

                        <p className="text-sm leading-relaxed text-slate-500">
                          {highlight}
                        </p>

                      </div>

                    ))}

                  </div>

                </div>

              </div>

            </article>

          ))}

        </div>

      </div>


      {/* Career profile */}
      <section className="mt-12 bg-gradient-to-br from-slate-900 to-slate-800 rounded-[2rem] p-7 md:p-10 text-white">

        <div className="grid md:grid-cols-[1fr_auto] gap-8 items-center">

          <div>

            <p className="text-xs font-semibold text-blue-300 uppercase tracking-widest">
              Professional Profile
            </p>

            <h2 className="text-2xl md:text-3xl font-bold mt-2">
              Business knowledge + engineering execution
            </h2>

            <p className="mt-4 text-sm leading-relaxed text-slate-300 max-w-2xl">
              My experience sits at the intersection of business operations,
              enterprise systems and software engineering. I work with data,
              understand the process behind it, and build the automation or
              software needed to improve it.
            </p>

          </div>

          <div className="grid grid-cols-2 gap-3 min-w-[220px]">

            <div className="rounded-2xl bg-white/10 border border-white/10 p-4">
              <div className="text-2xl font-black">
                14+
              </div>
              <div className="text-[10px] text-slate-400 uppercase tracking-wide mt-1">
                Years
              </div>
            </div>

            <div className="rounded-2xl bg-white/10 border border-white/10 p-4">
              <div className="text-2xl font-black">
                4
              </div>
              <div className="text-[10px] text-slate-400 uppercase tracking-wide mt-1">
                Developers led
              </div>
            </div>

            <div className="rounded-2xl bg-white/10 border border-white/10 p-4">
              <div className="text-2xl font-black">
                Data
              </div>
              <div className="text-[10px] text-slate-400 uppercase tracking-wide mt-1">
                Engineering
              </div>
            </div>

            <div className="rounded-2xl bg-white/10 border border-white/10 p-4">
              <div className="text-2xl font-black">
                AI
              </div>
              <div className="text-[10px] text-slate-400 uppercase tracking-wide mt-1">
                Modern stack
              </div>
            </div>

          </div>

        </div>

      </section>

    </div>
  );
}
