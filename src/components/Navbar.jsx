import React, { useEffect, useRef, useState } from 'react';
import { Download, TriangleAlert } from 'lucide-react';

export default function Navbar({ courseTitle, resetCourse, restartCourse, saveProgress }) {
  const [isRestartModalOpen, setIsRestartModalOpen] = useState(false);
  const restartModalRef = useRef(null);

  useEffect(() => {
    if (isRestartModalOpen) {
      restartModalRef.current?.focus();
    }
  }, [isRestartModalOpen]);

  const confirmRestart = () => {
    setIsRestartModalOpen(false);
    restartCourse();
  };

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-slate-900 text-emerald-400 rounded-lg flex items-center justify-center font-black text-lg shadow-sm">
            L
          </div>
          <span className="font-bold text-slate-900 text-lg tracking-tight">POS-LMS</span>
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
                type="button"
                onClick={() => setIsRestartModalOpen(true)}
                className="text-xs font-semibold text-amber-950 bg-amber-300 hover:bg-amber-400 px-3 py-1.5 rounded-lg transition-colors inline-flex items-center gap-1.5"
              >
                <TriangleAlert className="w-3.5 h-3.5" />
                Restart
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
      {isRestartModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4">
          <div
            ref={restartModalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="restart-title"
            aria-describedby="restart-description"
            tabIndex={-1}
            onKeyDown={(event) => {
              if (event.key === 'Escape') {
                setIsRestartModalOpen(false);
              }
            }}
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl outline-none"
          >
            <h2 id="restart-title" className="text-xl font-bold text-slate-900">
              Are you sure?
            </h2>
            <p id="restart-description" className="mt-2 text-sm leading-6 text-slate-600">
              All lesson progress and answers will be cleared.
            </p>
            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setIsRestartModalOpen(false)}
                className="rounded-xl bg-slate-100 px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
              >
                No, bring me back to my lesson
              </button>
              <button
                type="button"
                onClick={confirmRestart}
                className="rounded-xl bg-amber-400 px-4 py-2.5 text-sm font-semibold text-amber-950 transition-colors hover:bg-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
              >
                I am sure
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
