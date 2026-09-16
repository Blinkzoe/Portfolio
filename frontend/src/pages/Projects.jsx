import SectionHeader from '../components/SectionHeader';
import { projects } from '../data/projects';
import { trackAction } from '../utils/tracking';

export default function Projects() {

  return (
    <section className="max-w-6xl mx-auto px-5 md:px-8 py-10 md:py-14">

      <SectionHeader
        eyebrow="Selected Work"
        title="Projects & Technical Highlights"
        description="Enterprise engineering combined with hands-on technical experimentation."
      />

      <div className="mt-10 grid md:grid-cols-2 gap-5">

        {projects.map((project, index) => (

          <button
            key={project.title}
            onClick={() => trackAction(`Proyecto: ${project.title}`)}
            className={`
              text-left
              bg-white
              border
              rounded-3xl
              p-6
              hover:-translate-y-1
              hover:shadow-lg
              transition-all
              ${
                project.featured
                  ? 'border-blue-200 md:col-span-2 bg-gradient-to-br from-blue-50/70 to-violet-50/70'
                  : 'border-slate-200'
              }
            `}
          >

            <div className="flex items-start justify-between">

              <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center font-bold">
                {String(index + 1).padStart(2, '0')}
              </div>

              <span className="text-[10px] text-blue-500 uppercase tracking-wider">
                {project.category}
              </span>

            </div>

            <h3 className="font-bold text-lg text-slate-900 mt-5">
              {project.title}
            </h3>

            <p className="text-sm text-slate-500 leading-relaxed mt-2">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mt-5">

              {project.technologies.map((technology) => (

                <span
                  key={technology}
                  className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-500 text-[10px]"
                >
                  {technology}
                </span>

              ))}

            </div>

          </button>

        ))}

      </div>

    </section>
  );
}
