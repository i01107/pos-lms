import React from 'react';
import { Download } from 'lucide-react';

export default function Navbar({ courseTitle, resetCourse, saveProgress }) {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-slate-900 text-emerald-400 rounded-lg flex items-center justify-center font-black text-lg shadow-sm">
            L
          </div>
          <span className="font-bold text-slate-900 text-lg tracking-tight">OpenLMS</span>
        </div>

        {/* Active Course Title & Reset Action */}
        <div className="flex items-center space-x-4">
          {courseTitle && (
            <>
              <span className="hidden md:inline-block text-xs font-semibold px-3 py-1 bg-slate-100 text-slate-600 rounded-full truncate max-w-xs">
                {courseTitle}
              </span>
              <button
                onClick={saveProgress}
                className="text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 px-3 py-1.5 rounded-lg transition-colors inline-flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                Save My Progress
              </button>
              <button
                onClick={resetCourse}
                className="text-xs font-medium text-slate-600 hover:text-rose-600 border border-slate-200 hover:border-rose-200 px-3 py-1.5 rounded-lg transition-colors"
              >
                Switch Course
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
