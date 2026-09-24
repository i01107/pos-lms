# OpenLMS Course JSON Schema Spec

Every course file fed into OpenLMS must strictly adhere to the following structure.

## Core Schema
```typescript
interface Course {
  courseId: string;
  title: string;
  description: string;
  author: string;
  version: string;
  estimatedHours: number;
  lastActiveLessonId?: string; // Updated whenever a learner opens a lesson
  modules: Module[];
}

interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

interface Lesson {
  id: string;
  title: string;
  type: 'markdown' | 'quiz' | 'assignment';
  durationMinutes: number;
  completed?: boolean; // Defaults to false; updated when a learner marks it complete
  content?: string; // Required if type === 'markdown'
  quiz?: Quiz;       // Required if type === 'quiz'
  assignment?: Assignment; // Required if type === 'assignment'
}

interface Quiz {
  question: string;
  options: string[];
  correctIndex: number; // 0-based index
  explanation: string;
}

interface Assignment {
  instructions: string;
  submissionType: 'text' | 'file';
}
```

## Learner Progress

`completed` and `lastActiveLessonId` are optional so original course files remain valid. OpenLMS stores changes to these fields in browser localStorage while a course is open. Selecting **Save My Progress** downloads a copy of the course JSON with the current progress embedded, allowing a learner to upload that file later and resume the course.
