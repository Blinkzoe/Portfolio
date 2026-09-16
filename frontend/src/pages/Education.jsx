import SectionHeader from '../components/SectionHeader';

export default function Education() {

  return (
    <section className="max-w-6xl mx-auto px-5 md:px-8 py-10 md:py-14">

      <SectionHeader
        eyebrow="Background"
        title="Education & Certifications"
        description="Academic background and professional certifications."
      />

      <div className="mt-10 grid md:grid-cols-2 gap-5">

        <div className="bg-white border border-slate-200 rounded-3xl p-7">

          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-500 flex items-center justify-center font-bold">
            UDG
          </div>

          <p className="text-xs text-blue-500 font-semibold uppercase tracking-wider mt-6">
            Universidad de Guadalajara
          </p>

          <h2 className="text-xl font-black text-slate-900 mt-2">
            Bachelor of Science in Systems Engineering
          </h2>

          <div className="mt-5 p-4 rounded-2xl bg-slate-50">

            <div className="text-xs text-slate-400">
              Final Grade
            </div>

            <div className="text-2xl font-black text-slate-800 mt-1">
              9.7 / 10.0
            </div>

          </div>

        </div>


        <div className="bg-white border border-slate-200 rounded-3xl p-7">

          <div className="w-12 h-12 rounded-2xl bg-violet-50 text-violet-500 flex items-center justify-center font-bold">
            ✓
          </div>

          <p className="text-xs text-violet-500 font-semibold uppercase tracking-wider mt-6">
            Certifications
          </p>

          <div className="mt-5 space-y-4">

            <div className="p-4 rounded-2xl bg-slate-50">

              <div className="font-bold text-sm text-slate-800">
                Java SE Programmer Certification
              </div>

              <div className="text-xs text-slate-400 mt-1">
                1Z0-851 — Oracle
              </div>

            </div>

            <div className="p-4 rounded-2xl bg-slate-50">

              <div className="font-bold text-sm text-slate-800">
                Lean Six Sigma Green Belt
              </div>

              <div className="text-xs text-slate-400 mt-1">
                Process Improvement
              </div>

            </div>

          </div>

        </div>

      </div>


      <div className="mt-5 bg-white border border-slate-200 rounded-3xl p-7">

        <p className="text-xs text-slate-400 uppercase tracking-wider">
          Languages
        </p>

        <div className="grid sm:grid-cols-2 gap-4 mt-5">

          <div className="p-4 rounded-2xl bg-slate-50">
            <div className="font-bold text-sm text-slate-800">
              Spanish
            </div>
            <div className="text-xs text-slate-400 mt-1">
              Native
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50">
            <div className="font-bold text-sm text-slate-800">
              English
            </div>
            <div className="text-xs text-slate-400 mt-1">
              Fluent / Professional Proficiency
            </div>
          </div>

        </div>

      </div>

    </section>
  );
}
