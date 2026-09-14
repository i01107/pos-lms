import React from 'react';
import { CheckCircle2, Circle, BookOpen, Layers } from 'lucide-react';

export default function Sidebar({ modules, activeLessonId, setActiveLessonId, completedLessons }) {
  const totalLessons = modules.flatMap(m => m.lessons).length;
  const progressPercent = totalLessons > 0 
    ? Math.round((completedLessons.length / totalLessons) * 100) 
    : 0;

  return (
    <aside className="w-80 bg-slate-50 border-r border-slate-200 flex flex-col shrink-0 h-full">
      {/* Progress Header */}
      <div className="p-6 border-b border-slate-200 bg-white">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5" />
            Progress
          </span>
          <span className="text-xs font-extrabold text-emerald-600">{progressPercent}%</span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
          <div 
            className="bg-emerald-500 h-full transition-all duration-300 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Module Navigation */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {modules.map((module, mIdx) => (
          <div key={module.id} className="space-y-2">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-2">
              Module {mIdx + 1}: {module.title}
            </h4>
            <div className="space-y-1">
              {module.lessons.map((lesson) => {
                const isActive = lesson.id === activeLessonId;
                const isDone = completedLessons.includes(lesson.id);

                return (
                  <button
                    key={lesson.id}
                    onClick={() => setActiveLessonId(lesson.id)}
                    className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium flex items-center justify-between transition-all ${
                      isActive 
                        ? 'bg-slate-900 text-white shadow-sm' 
                        : 'text-slate-700 hover:bg-slate-200/60'
                    }`}
                  >
                    <div className="flex items-center space-x-2.5 truncate">
                      {isDone ? (
                        <CheckCircle2 className={`w-4 h-4 shrink-0 ${isActive ? 'text-emerald-400' : 'text-emerald-600'}`} />
                      ) : (
                        <Circle className={`w-4 h-4 shrink-0 ${isActive ? 'text-slate-400' : 'text-slate-300'}`} />
                      )}
                      <span className="truncate">{lesson.title}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}