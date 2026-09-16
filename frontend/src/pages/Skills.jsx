import { useState } from 'react';

import SectionHeader from '../components/SectionHeader';
import { skills } from '../data/skills';
import { trackAction } from '../utils/tracking';

export default function Skills() {

  const [expanded, setExpanded] = useState(null);

  const toggle = (skill) => {

    const isOpening = expanded !== skill.id;

    setExpanded(isOpening ? skill.id : null);

    if (isOpening) {
      trackAction(`Skills: ${skill.title}`);
    }
  };

  return (
    <section className="max-w-6xl mx-auto px-5 md:px-8 py-10 md:py-14">

      <SectionHeader
        eyebrow="Technical Stack"
        title="Skills & Technologies"
        description="Click a category to explore the technologies and tools I work with."
      />

      <div className="mt-10 grid md:grid-cols-2 gap-4">

        {skills.map((skill) => {

          const isOpen = expanded === skill.id;

          return (

            <div
              key={skill.id}
              className={`
                bg-white
                border
                rounded-2xl
                overflow-hidden
                transition-all
                ${
                  isOpen
                    ? 'border-blue-200 shadow-md'
                    : 'border-slate-200'
                }
              `}
            >

              <button
                onClick={() => toggle(skill)}
                className="w-full p-5 text-left flex items-center justify-between"
              >

                <div>

                  <h3 className="font-bold text-sm text-slate-800">
                    {skill.title}
                  </h3>

                  <p className="text-xs text-slate-400 mt-1">
                    {skill.description}
                  </p>

                </div>

                <span className="text-slate-400 text-xl">
                  {isOpen ? '−' : '+'}
                </span>

              </button>

              {isOpen && (

                <div className="px-5 pb-5 flex flex-wrap gap-2">

                  {skill.items.map((item) => (

                    <span
                      key={item}
                      className="px-3 py-1.5 rounded-full bg-blue-50 text-blue-600 text-xs"
                    >
                      {item}
                    </span>

                  ))}

                </div>

              )}

            </div>

          );

        })}

      </div>

    </section>
  );
}
