import React from 'react';
import { UploadCloud, FileJson } from 'lucide-react';

export default function DropZone({ onFileLoaded }) {
  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        onFileLoaded(parsed, file.name);
      } catch (err) {
        alert("Invalid JSON file formatting. Please check your course file.");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="w-full max-w-xl p-10 bg-white border-2 border-dashed border-slate-300 rounded-2xl text-center hover:border-emerald-500 transition-colors cursor-pointer shadow-sm">
      <input type="file" accept=".json" onChange={handleFile} className="hidden" id="json-input" />
      <label htmlFor="json-input" className="cursor-pointer block">
        <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-emerald-100 shadow-sm">
          <UploadCloud className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-1 flex items-center justify-center gap-2">
          <FileJson className="w-5 h-5 text-emerald-600" />
          Import Learning Material
        </h3>
        <p className="text-slate-500 text-sm mb-5">Drag & drop your course JSON file here, or click to browse.</p>
        <span className="inline-block px-5 py-2.5 bg-slate-900 text-white text-xs font-semibold rounded-xl shadow-sm hover:bg-slate-800 transition-all">
          Select JSON File
        </span>
      </label>
    </div>
  );
}
