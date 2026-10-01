import { useEffect } from 'react';
import { trackAction } from '../utils/tracking';

export default function Education() {

  useEffect(() => {
    trackAction('Education: View');
  }, []);

  const education = [
    {
      institution: 'Universidad de Guadalajara',
      title: 'B.S. in Computer Systems Engineering',
      location: 'Guadalajara, Jalisco, Mexico',
      type: 'University Education',
      description:
        'Computer systems engineering foundation covering software development, databases, systems, programming and technology.'
    },
    {
      institution: 'Centro de Enseñanza Técnica Industrial (CETI)',
      title: 'Technical Education in Informatics & Computing',
      location: 'Guadalajara, Jalisco, Mexico',
      type: 'Technical Education',
      description:
        'Four-year technical program with strong foundations in programming, computer systems, electronics, digital logic, mathematics, engineering fundamentals and practical laboratory work.'
    }
  ];

  const certifications = [
    {
      name: 'Oracle Certified Java Programmer',
      code: '1Z0-851',
      issuer: 'Oracle'
    },
    {
      name: 'Lean Six Sigma Yellow Belt',
      code: null,
      issuer: 'Lean Six Sigma'
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-5 md:px-8 py-10 md:py-14">

      {/* HEADER */}
      <section className="mb-10">

        <p className="text-xs font-semibold text-blue-500 uppercase tracking-widest">
          Education & Certifications
        </p>

        <h1 className="text-3xl md:text-4xl font-black text-slate-900 mt-2">
          Education & Credentials
        </h1>

        <p className="text-sm md:text-base text-slate-400 mt-3 max-w-2xl">
          Formal engineering education combined with technical training and
          certifications across software development, process improvement and
          enterprise platforms.
        </p>

      </section>


      {/* EDUCATION */}
      <section>

        <div className="flex items-center gap-3 mb-5">

          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center">
            🎓
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Education
            </h2>

            <p className="text-xs text-slate-400">
              Engineering and technical foundations
            </p>
          </div>

        </div>


        <div className="grid md:grid-cols-2 gap-5">

          {education.map((item) => (

            <article
              key={item.institution}
              className="bg-white border border-slate-200 rounded-[1.75rem] p-6 md:p-7 shadow-sm hover:shadow-md hover:border-blue-200 transition-all"
            >

              <span className="inline-flex px-3 py-1 rounded-full bg-slate-50 border border-slate-200 text-[9px] font-bold uppercase tracking-widest text-slate-500">
                {item.type}
              </span>

              <h3 className="text-xl font-bold text-slate-900 mt-4">
                {item.title}
              </h3>

              <p className="text-sm font-semibold text-blue-500 mt-2">
                {item.institution}
              </p>

              <p className="text-xs text-slate-400 mt-1">
                📍 {item.location}
              </p>

              <p className="text-sm leading-relaxed text-slate-500 mt-5">
                {item.description}
              </p>

            </article>

          ))}

        </div>

      </section>


      {/* CERTIFICATIONS */}
      <section className="mt-12">

        <div className="flex items-center gap-3 mb-5">

          <div className="w-10 h-10 rounded-xl bg-violet-50 text-violet-500 flex items-center justify-center">
            ✓
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Certifications
            </h2>

            <p className="text-xs text-slate-400">
              Professional credentials
            </p>
          </div>

        </div>


        <div className="grid md:grid-cols-3 gap-5">

          {certifications.map((cert) => (

            <article
              key={cert.name}
              className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-violet-200 transition-all"
            >

              <div className="w-10 h-10 rounded-xl bg-violet-50 text-violet-500 flex items-center justify-center font-bold mb-5">
                ✓
              </div>

              <h3 className="font-bold text-slate-800 leading-snug">
                {cert.name}
              </h3>

              {cert.code && (
                <p className="text-xs font-mono text-violet-500 mt-2">
                  {cert.code}
                </p>
              )}

              <p className="text-xs text-slate-400 mt-3">
                {cert.issuer}
              </p>

            </article>

          ))}

        </div>

      </section>


      {/* PROFILE STATEMENT */}
      <section className="mt-12 rounded-[2rem] bg-slate-50 border border-slate-200 p-7 md:p-10">

        <div className="max-w-3xl">

          <p className="text-xs font-semibold text-blue-500 uppercase tracking-widest">
            Continuous Learning
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-2">
            Engineering foundation, business experience and continuous learning
          </h2>

          <p className="text-sm leading-relaxed text-slate-500 mt-4">
            My technical background has evolved from traditional software
            engineering and enterprise systems into data engineering,
            automation, distributed infrastructure and local AI technologies.
            I continue learning by building and operating real systems.
          </p>

        </div>

      </section>

    </div>
  );
}
