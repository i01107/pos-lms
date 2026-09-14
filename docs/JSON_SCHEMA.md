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