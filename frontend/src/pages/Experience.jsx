import SectionHeader from '../components/SectionHeader';
import { experience } from '../data/experience';

export default function Experience() {

  return (
    <section className="max-w-6xl mx-auto px-5 md:px-8 py-10 md:py-14">

      <SectionHeader
        eyebrow="Career"
        title="Professional Experience"
        description="14 years of enterprise software, data, automation and integration experience."
      />

      <div className="mt-10 space-y-5">

        {experience.map((job) => (

          <div
            key={`${job.company}-${job.title}`}
            className="bg-white rounded-3xl border border-slate-200 p-7 md:p-9 shadow-sm"
          >

            <div className="flex flex-col md:flex-row md:justify-between gap-4">

              <div>

                <h2 className="text-xl font-black text-slate-900">
                  {job.company}
                </h2>

                {job.previous && (
                  <p className="text-xs text-slate-400 mt-1">
                    {job.previous}
                  </p>
                )}

                <p className="text-sm font-semibold text-blue-600 mt-3">
                  {job.title}
                </p>

                <p className="text-xs text-slate-400 mt-1">
                  {job.location}
                </p>

              </div>

              <div className="text-xs text-blue-500 bg-blue-50 px-3 py-2 rounded-lg h-fit">
                {job.period}
              </div>

            </div>

            <div className="mt-7 space-y-3">

              {job.highlights.map((item) => (

                <p
                  key={item}
                  className="text-sm text-slate-500 leading-relaxed"
                >
                  <span className="text-blue-400 mr-2">•</span>
                  {item}
                </p>

              ))}

            </div>

          </div>

        ))}

      </div>

    </section>
  );
}
