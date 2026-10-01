import { useState } from 'react';
import { trackAction } from '../utils/tracking';

export default function ProjectCard({ project, index }) {
  const [expanded, setExpanded] = useState(false);

  const toggleProject = () => {
    const nextState = !expanded;

    setExpanded(nextState);

    if (nextState) {
      trackAction(`Proyecto abierto: ${project.title}`);
    }
  };

  return (
    <article
      className={`
        bg-white
        border
        rounded-3xl
        overflow-hidden
        transition-all
        duration-300
        ${
          project.featured
            ? 'border-blue-200 bg-gradient-to-br from-blue-50/60 to-violet-50/60'
            : 'border-slate-200'
        }
        ${expanded ? 'shadow-lg' : 'hover:-translate-y-1 hover:shadow-md'}
      `}
    >
      <button
        type="button"
        onClick={toggleProject}
        className="w-full text-left p-6"
        aria-expanded={expanded}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">

            <div
              className={`
                shrink-0
                w-11 h-11 rounded-xl
                flex items-center justify-center
                font-bold text-sm
                ${
                  project.type === 'professional'
                    ? 'bg-blue-50 text-blue-600'
                    : 'bg-violet-50 text-violet-600'
                }
              `}
            >
              {String(index + 1).padStart(2, '0')}
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">

                <span
                  className={`
                    px-2 py-1 rounded-full
                    text-[9px] font-bold uppercase tracking-wider
                    ${
                      project.type === 'professional'
                        ? 'bg-blue-100 text-blue-600'
                        : 'bg-violet-100 text-violet-600'
                    }
                  `}
                >
                  {project.type === 'professional'
                    ? 'Professional'
                    : 'Personal'}
                </span>

                {project.featured && (
                  <span className="px-2 py-1 rounded-full bg-slate-900 text-white text-[9px] font-bold uppercase tracking-wider">
                    Featured
                  </span>
                )}

              </div>

              <h3 className="font-bold text-lg text-slate-900 mt-3">
                {project.title}
              </h3>

              <p className="text-xs text-blue-500 font-medium mt-1">
                {project.category}
              </p>
            </div>

          </div>

          <span
            className={`
              shrink-0
              w-8 h-8 rounded-full
              border border-slate-200
              flex items-center justify-center
              text-slate-400
              transition-transform
              ${expanded ? 'rotate-180' : ''}
            `}
          >
            ↓
          </span>

        </div>

        <p className="text-sm text-slate-500 leading-relaxed mt-5">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mt-5">
          {project.technologies.slice(0, 6).map((technology) => (
            <span
              key={technology}
              className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-500 text-[10px]"
            >
              {technology}
            </span>
          ))}

          {project.technologies.length > 6 && (
            <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-400 text-[10px]">
              +{project.technologies.length - 6}
            </span>
          )}
        </div>

      </button>

      {expanded && (
        <div className="border-t border-slate-200/80 px-6 pb-6 pt-6">

          <div className="grid md:grid-cols-2 gap-6">

            <Detail title="Problem" text={project.problem} />

            <Detail title="Solution" text={project.solution} />

            <Detail title="My Role" text={project.role} />

            <Detail title="Impact" text={project.impact} />

          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-6">

            <div>
              <SectionLabel title="Technologies" />

              <div className="flex flex-wrap gap-2 mt-3">
                {project.technologies.map((technology) => (
                  <span
                    key={technology}
                    className="px-2.5 py-1.5 rounded-lg bg-slate-100 text-slate-600 text-[10px] font-medium"
                  >
                    {technology}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <SectionLabel title="Business Domain" />

              <div className="flex flex-wrap gap-2 mt-3">
                {project.businessDomain.map((domain) => (
                  <span
                    key={domain}
                    className="px-2.5 py-1.5 rounded-lg bg-blue-50 text-blue-600 text-[10px] font-medium"
                  >
                    {domain}
                  </span>
                ))}
              </div>
            </div>

          </div>

          <button
            type="button"
            onClick={toggleProject}
            className="mt-7 text-xs font-semibold text-blue-500 hover:text-blue-700"
          >
            Close details ↑
          </button>

        </div>
      )}
    </article>
  );
}

function Detail({ title, text }) {
  return (
    <div>
      <SectionLabel title={title} />

      <p className="text-sm text-slate-500 leading-relaxed mt-2">
        {text}
      </p>
    </div>
  );
}

function SectionLabel({ title }) {
  return (
    <h4 className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
      {title}
    </h4>
  );
}
