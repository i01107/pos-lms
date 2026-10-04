# POS-LMS Course JSON Schema Spec

Every course file fed into POS-LMS must strictly adhere to the following structure.

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
  type: 'lesson' | 'abcd_challenge' | 'essay_challenge';
  durationMinutes: number;
  completed?: boolean; // Defaults to false; updated when a learner marks it complete
  learnerState?: LearnerState; // Optional saved quiz/essay responses for this learner
  answer?: string; // Optional Markdown answer shown after a quiz is submitted
  content?: string; // Required if type === 'lesson'
  quiz?: Quiz; // Required if type === 'abcd_challenge'
  questions?: EssayQuestion[]; // Required if type === 'essay_challenge'
}

interface LearnerState {
  selectedOption?: number; // Selected quiz option (0-based)
  quizSubmitted?: boolean;
  questionResponses?: Record<number, {
    response?: string;
    submitted?: boolean;
  }>;
}

interface Quiz {
  question: string;
  options: string[];
  correctIndex: number; // 0-based index
  explanation: string;
  answer?: string; // Optional Markdown answer shown after submission
}

interface EssayQuestion {
  question: string; // Markdown prompt displayed above a multiline response field
  answer: string; // Markdown answer displayed after the learner checks this question
}
```

## Learner Progress

`completed`, `learnerState`, and `lastActiveLessonId` are optional so original course files remain valid. POS-LMS stores lesson completion and submitted or in-progress quiz and essay responses in browser localStorage while a course is open. Selecting **Save My Progress** downloads a copy of the course JSON with the current progress embedded, allowing a learner to upload that file later and resume the course. **Restart** clears completion and response state and returns to the first lesson while keeping the uploaded course open.

Older files using lesson types `markdown`, `quiz`, `assignment`, or the misspelled `essai_challenge` are accepted. On upload, POS-LMS converts them to `lesson`, `abcd_challenge`, and `essay_challenge`. A legacy assignment becomes a single essay question using its `instructions` and `answer` values.
