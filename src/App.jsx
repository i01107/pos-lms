import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import LessonViewer from './components/LessonViewer';
import DropZone from './components/DropZone';

export default function App() {
  const [course, setCourse] = useState(null);
  const [activeLessonId, setActiveLessonId] = useState(null);
  const [completedLessons, setCompletedLessons] = useState([]);

  // Load course & progress from local storage on startup
  useEffect(() => {
    const savedCourse = localStorage.getItem('lms_course_data');
    const savedProgress = localStorage.getItem('lms_progress');
    
    if (savedCourse) {
      const parsed = JSON.parse(savedCourse);
      setCourse(parsed);
      setActiveLessonId(parsed.modules[0]?.lessons[0]?.id || null);
    }
    if (savedProgress) {
      setCompletedLessons(JSON.parse(savedProgress));
    }
  }, []);

  const handleJsonUpload = (jsonData) => {
    setCourse(jsonData);
    localStorage.setItem('lms_course_data', JSON.stringify(jsonData));
    if (jsonData.modules?.[0]?.lessons?.[0]) {
      setActiveLessonId(jsonData.modules[0].lessons[0].id);
    }
  };

  const toggleLessonComplete = (lessonId) => {
    const updated = completedLessons.includes(lessonId)
      ? completedLessons.filter(id => id !== lessonId)
      : [...completedLessons, lessonId];
    
    setCompletedLessons(updated);
    localStorage.setItem('lms_progress', JSON.stringify(updated));
  };

  const activeLesson = course?.modules
    .flatMap(m => m.lessons)
    .find(l => l.id === activeLessonId);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      <Navbar courseTitle={course?.title} resetCourse={() => setCourse(null)} />

      {!course ? (
        <main className="flex-1 flex items-center justify-center p-6">
          <DropZone onFileLoaded={handleJsonUpload} />
        </main>
      ) : (
        <div className="flex-1 flex max-w-7xl w-full mx-auto overflow-hidden shadow-sm border-x border-slate-200 bg-white">
          <Sidebar 
            modules={course.modules} 
            activeLessonId={activeLessonId} 
            setActiveLessonId={setActiveLessonId}
            completedLessons={completedLessons}
          />
          <main className="flex-1 overflow-y-auto p-8 lg:p-12">
            <LessonViewer 
              lesson={activeLesson} 
              isCompleted={completedLessons.includes(activeLessonId)}
              onToggleComplete={() => toggleLessonComplete(activeLessonId)}
            />
          </main>
        </div>
      )}
    </div>
  );
}