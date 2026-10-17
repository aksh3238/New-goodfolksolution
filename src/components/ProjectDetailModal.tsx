import React, { useEffect } from 'react';
import { ProjectItem } from '../data/portfolioData';
import { CreativeVisual } from './CreativeVisuals';
import { X, ArrowRight, Check } from 'lucide-react';

interface ProjectDetailModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onStartProject: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
  onStartProject,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#123578]/70 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-3xl max-h-[90vh] bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-y-auto transform transition-all duration-200">
        {/* Sticky Close Button */}
        <button
          onClick={onClose}
          aria-label="Close project modal"
          className="absolute top-5 right-5 z-20 p-2.5 rounded-full bg-white/90 backdrop-blur-sm text-slate-600 hover:text-[#123578] shadow-md hover:bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#ED650B]"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Visual Hero Mockup Banner */}
        <div className="w-full h-72 sm:h-80 bg-slate-100 relative">
          <CreativeVisual type={project.visualType} className="h-full rounded-none" />
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-10 space-y-8">
          {/* Header */}
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#ED650B] bg-orange-50 px-2.5 py-1 rounded-md border border-orange-100">
                {project.category}
              </span>
              {project.isConcept && (
                <span className="text-xs font-mono text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
                  Concept Project
                </span>
              )}
            </div>
            <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-[#123578]">
              {project.title}
            </h2>
            <p className="text-base text-slate-600 mt-2 leading-relaxed">
              {project.shortDesc}
            </p>
          </div>

          {/* Brief & Approach Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
            <div className="space-y-2">
              <h3 className="font-heading font-bold text-sm text-[#123578] uppercase tracking-wider">
                The Brief
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {project.brief}
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-heading font-bold text-sm text-[#123578] uppercase tracking-wider">
                Our Creative Approach
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {project.approach}
              </p>
            </div>
          </div>

          {/* Deliverables */}
          <div className="space-y-3 pt-4 border-t border-slate-100">
            <h3 className="font-heading font-bold text-sm text-[#123578] uppercase tracking-wider">
              Visual Deliverables
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {project.deliverables.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2.5 text-xs text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-100"
                >
                  <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <Check className="w-2.5 h-2.5" />
                  </div>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-400">
              Honest illustrative concept showcase by Goodfolk Solution.
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-5 py-2.5 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => {
                  onClose();
                  onStartProject();
                }}
                className="w-full sm:w-auto bg-[#ED650B] hover:bg-[#d95605] text-white font-semibold text-sm px-6 py-2.5 rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5"
              >
                Start a Similar Project
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
