# OpenLMS Architecture & Rules

## Project Summary
OpenLMS is an open-source, serverless, client-side LMS engine built with Vite + React + Tailwind CSS. It parses local JSON course files via drag-and-drop or file selection and dynamically renders lessons, interactive quizzes, markdown content, and assignments without a backend server.

## Tech Stack
- **Framework:** React 18 (Vite SPA)
- **Styling:** Tailwind CSS + `@tailwindcss/typography`
- **Icons:** `lucide-react`
- **Content Engine:** `react-markdown` + `react-syntax-highlighter` (Prism `oneDark` theme)
- **Persistence:** Browser `localStorage` (Tracks course data & completion arrays)

## Code Standards & Conventions
1. **Component Pattern:** Pure functional components with hooks.
2. **Styling:** Strict utility-first Tailwind CSS. Do not create custom CSS files unless modifying `@layer` directives in `src/index.css`.
3. **State Rule:** Main course state and completion logic live top-level in `App.jsx`. Sub-components receive props & callbacks.
4. **No External Server APIs:** All file parsing and progress storage MUST stay 100% client-side.

## Directory Structure
- `src/App.jsx` — State root, localStorage hydration, layouts.
- `src/components/DropZone.jsx` — JSON file reader & drop handler.
- `src/components/Navbar.jsx` — Global header & course switcher.
- `src/components/Sidebar.jsx` — Module/Lesson navigation & completion bar.
- `src/components/LessonViewer.jsx` — Dynamic lesson renderer (Markdown, Quiz, Assignment).
