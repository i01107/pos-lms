# POS-LMS

POS-LMS (Portable Open Source Learning Management System) is a private, browser-based learning management system for studying courses stored as JSON files. It runs entirely on the learner's device: there is no server, account system, database, or external API required.

It is designed for individuals who want to create, share, and revisit structured learning material while retaining control of their course files and progress.

## Features

- Import a course by dragging in or selecting a JSON file.
- Organize content into modules and lessons.
- Render Markdown lessons with GitHub Flavored Markdown support and syntax-highlighted code blocks.
- Provide multiple-choice quizzes with immediate correctness feedback.
- Provide written assignments with an optional author-provided answer in Markdown.
- Track completed lessons and the last active lesson locally in the browser.
- Navigate lessons from a sticky sidebar, or with Previous and Next controls.
- Mark lessons complete directly, or when moving to the next lesson.
- Finish the final lesson with a completion confirmation.
- Export progress as an updated JSON file, ready to upload later and resume.
- Restart or switch courses, clearing the currently stored course and its local progress.

## Requirements

- A current version of [Node.js](https://nodejs.org/) (LTS recommended)
- npm

## Getting Started

Clone or download this project, then install its dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local address shown by Vite, then drag a course JSON file onto the upload area or select one from your computer.

To create a production build for static hosting:

```bash
npm run build
```

The built files are written to `dist/`. You can preview them locally with:

```bash
npm run preview
```

## Using POS-LMS

### Opening a course

Upload a JSON course file. The application opens the first lesson by default, unless the file contains a valid `lastActiveLessonId` saved from an earlier learning session.

### Completing lessons

Use **Mark as Complete** when you want to finish a lesson without leaving it. When selecting **Next**, incomplete lessons prompt you to either mark the lesson complete or continue without doing so. The final lesson uses **Finish**, which records completion and displays a congratulations dialog.

### Saving progress

POS-LMS keeps the current course and learning progress in the browser's local storage during use. Select **Save My Progress** to download an updated copy of the course file.

The downloaded file is named:

```text
[original course name] - update [dd-mm-yy].json
```

Upload that exported file later to restore completed lessons and resume at the last active lesson. Browsers cannot overwrite the original uploaded file directly.

### Restarting or changing course

- **Restart** asks for confirmation, then removes the currently loaded course and its unsaved local progress.
- **Switch Course** immediately removes the currently loaded course and its local progress.

Save progress before using either action if you want to continue the course later.

## Creating a Course

A course is a JSON file containing course metadata, modules, and lessons. Each lesson must have a unique `id` within the course and one of these types:

- `markdown` — explanatory material written in Markdown
- `quiz` — a multiple-choice question
- `assignment` — a written activity

Start with [`docs/EXAMPLE.json`](docs/EXAMPLE.json) as a template. The complete field reference is available in [`docs/JSON_SCHEMA.md`](docs/JSON_SCHEMA.md).

### Minimal course example

```json
{
  "courseId": "my-course",
  "title": "My Course",
  "description": "A short course description.",
  "author": "Your name",
  "version": "1.0.0",
  "estimatedHours": 1,
  "modules": [
    {
      "id": "module-1",
      "title": "Introduction",
      "lessons": [
        {
          "id": "lesson-1",
          "title": "Welcome",
          "type": "markdown",
          "durationMinutes": 5,
          "content": "# Welcome\\n\\nWrite your lesson in **Markdown**."
        }
      ]
    }
  ]
}
```

### Quiz lessons

```json
{
  "id": "quiz-1",
  "title": "Knowledge check",
  "type": "quiz",
  "durationMinutes": 5,
  "quiz": {
    "question": "Which value is correct?",
    "options": ["One", "Two", "Three"],
    "correctIndex": 1,
    "explanation": "Two is the correct answer.",
    "answer": "## Worked answer\\n\\nAn optional detailed answer in Markdown."
  }
}
```

`correctIndex` is zero-based: `0` selects the first option, `1` the second, and so on.

### Assignment lessons

```json
{
  "id": "assignment-1",
  "title": "Practice activity",
  "type": "assignment",
  "durationMinutes": 10,
  "assignment": {
    "instructions": "Explain your solution in your own words.",
    "submissionType": "text",
    "answer": "## Jawaban dari Pembuat Soal\\n\\nAn optional model answer in **Markdown**."
  }
}
```

After a learner submits an answer, POS-LMS displays the optional author answer in a separate green card. An optional Markdown `answer` may also be placed directly on a lesson or inside its `quiz` object.

### Progress fields

POS-LMS adds and updates these optional fields when progress is saved:

- `lesson.completed` — `true` only after the learner explicitly completes that lesson
- `course.lastActiveLessonId` — the lesson most recently opened by the learner

Both fields are optional, so an original course file does not need them. They are included in an exported progress file to enable resuming later.

## Privacy and Data

All course processing and progress storage happen in the browser. POS-LMS does not send course content or learner progress to a backend service.

Local browser data can be removed by using **Restart**, **Switch Course**, or clearing the browser's site data. Export a progress JSON file if the learning state needs to be retained independently of the browser.

At present, text entered into an assignment response field is used only for the current on-screen submission flow. It is not saved to local storage or included in exported progress files.

## Project Structure

```text
src/
  App.jsx                 Application state and browser persistence
  components/
    DropZone.jsx          Course-file upload interface
    Navbar.jsx            Course actions and restart confirmation
    Sidebar.jsx           Sticky module and lesson navigation
    LessonViewer.jsx      Lesson, quiz, assignment, and completion UI
docs/
  EXAMPLE.json            Starter course file
  JSON_SCHEMA.md          Complete course JSON reference
```

## Development Notes

POS-LMS uses React, Vite, Tailwind CSS, Lucide icons, and `react-markdown`. It is intentionally serverless and client-side only.

The encryption concept documented in [`docs/ROADMAP_AES.md`](docs/ROADMAP_AES.md) is a future roadmap item and is not currently implemented.
