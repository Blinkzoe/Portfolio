import { useMemo, useState } from 'react';

import SectionHeader from '../components/SectionHeader';
import ProjectCard from '../components/ProjectCard';
import { projects } from '../data/projects';
import { trackAction } from '../utils/tracking';

export default function Projects() {
  const [activeType, setActiveType] = useState('all');
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = useMemo(() => {
    const filteredByType =
      activeType === 'all'
        ? projects
        : projects.filter((project) => project.type === activeType);

    return [
      'all',
      ...new Set(filteredByType.map((project) => project.category))
    ];
  }, [activeType]);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesType =
        activeType === 'all' || project.type === activeType;

      const matchesCategory =
        activeCategory === 'all' ||
        project.category === activeCategory;

      return matchesType && matchesCategory;
    });
  }, [activeType, activeCategory]);

  const changeType = (type) => {
    setActiveType(type);
    setActiveCategory('all');
    trackAction(`Projects filter: ${type}`);
  };

  const changeCategory = (category) => {
    setActiveCategory(category);
    trackAction(`Projects category: ${category}`);
  };

  return (
    <section className="max-w-6xl mx-auto px-5 md:px-8 py-10 md:py-14">

      <SectionHeader
        eyebrow="Selected Work"
        title="Projects & Technical Highlights"
        description="A combination of enterprise engineering, data, automation and hands-on technical projects."
      />

      <div className="mt-10 flex flex-wrap gap-2">

        <FilterButton
          active={activeType === 'all'}
          onClick={() => changeType('all')}
        >
          All Projects
        </FilterButton>

        <FilterButton
          active={activeType === 'professional'}
          onClick={() => changeType('professional')}
        >
          Professional
        </FilterButton>

        <FilterButton
          active={activeType === 'personal'}
          onClick={() => changeType('personal')}
        >
          Personal / Technical
        </FilterButton>

      </div>

      <div className="mt-4 flex flex-wrap gap-2">

        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => changeCategory(category)}
            className={`
              px-3 py-1.5 rounded-full
              text-[10px] font-medium
              transition
              ${
                activeCategory === category
                  ? 'bg-slate-800 text-white'
                  : 'bg-white border border-slate-200 text-slate-500 hover:bg-slate-100'
              }
            `}
          >
            {category === 'all' ? 'All Categories' : category}
          </button>
        ))}

      </div>

      <div className="flex items-center justify-between mt-8 mb-4">

        <p className="text-xs text-slate-400">
          Showing{' '}
          <span className="font-semibold text-slate-600">
            {filteredProjects.length}
          </span>{' '}
          {filteredProjects.length === 1 ? 'project' : 'projects'}
        </p>

        <p className="hidden sm:block text-[10px] text-slate-400">
          Click a project to explore the details
        </p>

      </div>

      <div className="grid md:grid-cols-2 gap-5">

        {filteredProjects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
          />
        ))}

      </div>

      {filteredProjects.length === 0 && (
        <div className="mt-8 p-10 text-center bg-white border border-slate-200 rounded-3xl">

          <p className="text-sm font-semibold text-slate-700">
            No projects found.
          </p>

          <button
            type="button"
            onClick={() => {
              setActiveType('all');
              setActiveCategory('all');
            }}
            className="mt-3 text-xs text-blue-500 hover:text-blue-700"
          >
            Clear filters
          </button>

        </div>
      )}

    </section>
  );
}

function FilterButton({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        px-4 py-2 rounded-xl
        text-xs font-semibold
        transition-all
        ${
          active
            ? 'bg-slate-900 text-white shadow-sm'
            : 'bg-white border border-slate-200 text-slate-500 hover:border-blue-200 hover:text-blue-500'
        }
      `}
    >
      {children}
    </button>
  );
}
