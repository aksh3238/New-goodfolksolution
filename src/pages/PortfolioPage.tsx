import React, { useState } from 'react';
import { portfolioProjects, ProjectItem } from '../data/portfolioData';
import { CreativeVisual } from '../components/CreativeVisuals';
import { ProjectDetailModal } from '../components/ProjectDetailModal';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

interface PortfolioPageProps {
  onNavigate: (path: string) => void;
  onOpenContactModal: () => void;
}

type CategoryFilter =
  | 'All'
  | 'Branding'
  | 'Packaging'
  | 'Creative Design'
  | 'E-commerce'
  | 'Performance Marketing'
  | 'Video & Social';

export const PortfolioPage: React.FC<PortfolioPageProps> = ({
  onNavigate,
  onOpenContactModal: _onOpenContactModal,
}) => {
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>('All');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const filters: CategoryFilter[] = [
    'All',
    'Branding',
    'Packaging',
    'Creative Design',
    'E-commerce',
    'Performance Marketing',
    'Video & Social',
  ];

  const filteredProjects =
    activeFilter === 'All'
      ? portfolioProjects
      : portfolioProjects.filter((p) => p.category === activeFilter);

  return (
    <div className="w-full bg-white">
      {/* Hero Section */}
      <section className="pt-16 pb-16 bg-gradient-to-b from-white to-[#F7F7F5] border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#123578] bg-slate-100 px-3 py-1.5 rounded-full mb-4">
            <span className="w-2 h-2 rounded-full bg-[#ED650B]" />
            Creative Portfolio
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold text-[#123578] tracking-tight">
            Selected Work
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 mt-4 max-w-2xl mx-auto leading-relaxed">
            Explore creative concepts across branding, packaging, digital campaigns and visual communication.
          </p>

          {/* Interactive Filter Controls */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-2 p-1.5 bg-white/80 backdrop-blur-xs rounded-2xl border border-slate-200 max-w-fit mx-auto shadow-xs">
            {filters.map((filter) => {
              const isActive = activeFilter === filter;
              return (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-xl transition-all duration-150 whitespace-nowrap ${
                    isActive
                      ? 'bg-[#123578] text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                  }`}
                >
                  {filter}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className="cursor-pointer group bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-[#123578]/40 hover:shadow-xl transition-all duration-200 flex flex-col"
              >
                <div className="h-64 relative overflow-hidden bg-slate-100">
                  <CreativeVisual
                    type={project.visualType}
                    className="h-full rounded-none"
                  />
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                      <span className="font-mono text-[#ED650B] font-semibold">
                        {project.category}
                      </span>
                      <span className="bg-slate-100 px-2 py-0.5 rounded text-[11px] text-slate-500">
                        Concept Project
                      </span>
                    </div>

                    <h3 className="font-heading font-bold text-xl text-[#123578] group-hover:text-[#ED650B] transition-colors">
                      {project.title}
                    </h3>

                    <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                      {project.shortDesc}
                    </p>
                  </div>

                  <div className="pt-5 mt-6 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#123578]">
                    <span>View Case Details</span>
                    <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-[#ED650B] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-16">
              <p className="text-slate-500 text-sm">
                No projects found in this category filter.
              </p>
              <button
                onClick={() => setActiveFilter('All')}
                className="mt-4 text-xs font-semibold text-[#ED650B] underline"
              >
                Show All Projects
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Closing CTA */}
      <section className="py-20 bg-[#F7F7F5] border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-[#123578] tracking-tight">
            Have a project in mind? Let's create something meaningful.
          </h2>
          <p className="text-base text-slate-600 max-w-xl mx-auto leading-relaxed">
            Whether you are launching a new consumer brand or elevating an existing product line, we bring clarity and craft to every asset.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onNavigate('/contact')}
              className="bg-[#ED650B] hover:bg-[#d95605] active:scale-[0.98] text-white font-semibold text-base px-8 py-3.5 rounded-xl shadow-md transition-all duration-150 inline-flex items-center gap-2"
            >
              Start a Project
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Project Detail Modal */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onStartProject={() => onNavigate('/contact')}
      />
    </div>
  );
};
