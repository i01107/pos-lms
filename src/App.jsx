import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import LessonViewer from './components/LessonViewer';
import DropZone from './components/DropZone';

const getLessons = (course) => course?.modules?.flatMap((module) => module.lessons) ?? [];

const prepareCourse = (courseData, legacyCompletedLessons = []) => {
  const legacyCompleted = new Set(legacyCompletedLessons);
  const lessons = getLessons(courseData);
  const firstLessonId = lessons[0]?.id ?? null;
  const validLastActiveLessonId = lessons.some(
    (lesson) => lesson.id === courseData.lastActiveLessonId,
  )
    ? courseData.lastActiveLessonId
    : firstLessonId;

  return {
    ...courseData,
    lastActiveLessonId: validLastActiveLessonId,
    modules: (courseData.modules ?? []).map((module) => ({
      ...module,
      lessons: module.lessons.map((lesson) => ({
        ...lesson,
        completed: lesson.completed === true || legacyCompleted.has(lesson.id),
      })),
    })),
  };
};

export default function App() {
  const [course, setCourse] = useState(null);
  const [activeLessonId, setActiveLessonId] = useState(null);
  const [originalFileName, setOriginalFileName] = useState(null);

  const persistCourse = (updatedCourse) => {
    localStorage.setItem('lms_course_data', JSON.stringify(updatedCourse));
  };

  // Load course & progress from local storage on startup
  useEffect(() => {
    const savedCourse = localStorage.getItem('lms_course_data');
    const savedProgress = localStorage.getItem('lms_progress');

    if (savedCourse) {
      const parsed = JSON.parse(savedCourse);
      const migratedCourse = prepareCourse(parsed, savedProgress ? JSON.parse(savedProgress) : []);
      setCourse(migratedCourse);
      setActiveLessonId(migratedCourse.lastActiveLessonId);
      persistCourse(migratedCourse);
      localStorage.removeItem('lms_progress');
      setOriginalFileName(localStorage.getItem('lms_course_file_name'));
    }
  }, []);

  const handleJsonUpload = (jsonData, fileName) => {
    const uploadedCourse = prepareCourse(jsonData);
    setCourse(uploadedCourse);
    setActiveLessonId(uploadedCourse.lastActiveLessonId);
    setOriginalFileName(fileName);
    persistCourse(uploadedCourse);
    localStorage.setItem('lms_course_file_name', fileName);
    localStorage.removeItem('lms_progress');
  };

  const resetCourse = () => {
    localStorage.removeItem('lms_course_data');
    localStorage.removeItem('lms_progress');
    localStorage.removeItem('lms_course_file_name');
    setCourse(null);
    setActiveLessonId(null);
    setOriginalFileName(null);
  };

  const toggleLessonComplete = (lessonId) => {
    const updatedCourse = {
      ...course,
      modules: course.modules.map((module) => ({
        ...module,
        lessons: module.lessons.map((lesson) => (
          lesson.id === lessonId
            ? { ...lesson, completed: !lesson.completed }
            : lesson
        )),
      })),
    };

    setCourse(updatedCourse);
    persistCourse(updatedCourse);
  };

  const completeLessonAndOpenNext = (lessonId, nextLessonId) => {
    const updatedCourse = {
      ...course,
      lastActiveLessonId: nextLessonId,
      modules: course.modules.map((module) => ({
        ...module,
        lessons: module.lessons.map((lesson) => (
          lesson.id === lessonId
            ? { ...lesson, completed: true }
            : lesson
        )),
      })),
    };

    setActiveLessonId(nextLessonId);
    setCourse(updatedCourse);
    persistCourse(updatedCourse);
  };

  const openLesson = (lessonId) => {
    const updatedCourse = { ...course, lastActiveLessonId: lessonId };
    setActiveLessonId(lessonId);
    setCourse(updatedCourse);
    persistCourse(updatedCourse);
  };

  const saveProgress = () => {
    const baseName = (originalFileName || course.title || 'course').replace(/\.json$/i, '');
    const now = new Date();
    const date = [
      String(now.getDate()).padStart(2, '0'),
      String(now.getMonth() + 1).padStart(2, '0'),
      String(now.getFullYear()).slice(-2),
    ].join('-');
    const file = new Blob([JSON.stringify(course, null, 2)], { type: 'application/json' });
    const downloadUrl = URL.createObjectURL(file);
    const link = document.createElement('a');

    link.href = downloadUrl;
    link.download = `${baseName} - update ${date}.json`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(downloadUrl);
  };

  const lessons = getLessons(course);
  const activeLessonIndex = lessons.findIndex((lesson) => lesson.id === activeLessonId);
  const activeLesson = lessons[activeLessonIndex];
  const previousLesson = activeLessonIndex > 0 ? lessons[activeLessonIndex - 1] : null;
  const nextLesson = activeLessonIndex >= 0 && activeLessonIndex < lessons.length - 1
    ? lessons[activeLessonIndex + 1]
    : null;
  const completedLessons = lessons
    .filter((lesson) => lesson.completed)
    .map((lesson) => lesson.id);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      <Navbar
        courseTitle={course?.title}
        resetCourse={resetCourse}
        saveProgress={saveProgress}
      />

      {!course ? (
        <main className="flex-1 flex items-center justify-center p-6">
          <DropZone onFileLoaded={handleJsonUpload} />
        </main>
      ) : (
        <div className="flex-1 flex max-w-7xl w-full mx-auto overflow-hidden shadow-sm border-x border-slate-200 bg-white">
          <Sidebar 
            modules={course.modules} 
            activeLessonId={activeLessonId} 
            setActiveLessonId={openLesson}
            completedLessons={completedLessons}
          />
          <main className="flex-1 overflow-y-auto p-8 lg:p-12">
            <LessonViewer 
              lesson={activeLesson} 
              isCompleted={completedLessons.includes(activeLessonId)}
              onToggleComplete={() => toggleLessonComplete(activeLessonId)}
              hasPreviousLesson={Boolean(previousLesson)}
              hasNextLesson={Boolean(nextLesson)}
              onPreviousLesson={() => previousLesson && openLesson(previousLesson.id)}
              onNextLesson={() => nextLesson && openLesson(nextLesson.id)}
              onCompleteAndNext={() => (
                nextLesson && completeLessonAndOpenNext(activeLessonId, nextLesson.id)
              )}
            />
          </main>
        </div>
      )}
    </div>
  );
}
