import React, { useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { 
  CheckCircle, 
  Clock, 
  BookOpen, 
  HelpCircle, 
  FileText, 
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Lightbulb,
  PartyPopper,
  Sparkles
} from 'lucide-react';

function MarkdownContent({ children, className = '' }) {
  return (
    <div className={`prose prose-slate max-w-none text-slate-700 leading-relaxed ${className}`}>
      <ReactMarkdown
        components={{
          h1: ({node, ...props}) => <h1 className="text-2xl font-bold text-slate-900 mt-6 mb-3" {...props} />,
          h2: ({node, ...props}) => <h2 className="text-xl font-bold text-slate-900 mt-5 mb-2" {...props} />,
          h3: ({node, ...props}) => <h3 className="text-lg font-semibold text-slate-800 mt-4 mb-2" {...props} />,
          p: ({node, ...props}) => <p className="mb-4 leading-7" {...props} />,
          ul: ({node, ...props}) => <ul className="list-disc list-inside mb-4 space-y-1" {...props} />,
          ol: ({node, ...props}) => <ol className="list-decimal list-inside mb-4 space-y-1" {...props} />,
          blockquote: ({node, ...props}) => (
            <blockquote className="border-l-4 border-emerald-500 bg-emerald-50/50 p-4 rounded-r-lg my-4 text-slate-700 italic" {...props} />
          ),
          table: ({node, ...props}) => (
            <div className="my-6 overflow-x-auto rounded-xl border border-slate-200 shadow-sm">
              <table className="min-w-full border-collapse text-left text-sm" {...props} />
            </div>
          ),
          thead: ({node, ...props}) => <thead className="bg-slate-100 text-slate-900" {...props} />,
          tbody: ({node, ...props}) => <tbody className="divide-y divide-slate-200 bg-white" {...props} />,
          tr: ({node, ...props}) => <tr className="border-b border-slate-200 last:border-b-0" {...props} />,
          th: ({node, ...props}) => (
            <th className="whitespace-nowrap px-4 py-3 font-semibold" {...props} />
          ),
          td: ({node, ...props}) => <td className="px-4 py-3 align-top" {...props} />,
          code({ node, inline, className, children: codeChildren, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
              <div className="rounded-xl overflow-hidden my-4 shadow-sm border border-slate-800">
                <SyntaxHighlighter
                  style={oneDark}
                  language={match[1]}
                  PreTag="div"
                  customStyle={{ margin: 0, padding: '1.25rem', fontSize: '0.875rem' }}
                  {...props}
                >
                  {String(codeChildren).replace(/\n$/, '')}
                </SyntaxHighlighter>
              </div>
            ) : (
              <code className="bg-slate-100 text-emerald-700 px-1.5 py-0.5 rounded text-sm font-mono" {...props}>
                {codeChildren}
              </code>
            );
          }
        }}
        remarkPlugins={[remarkGfm]}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}

export default function LessonViewer({
  lesson,
  learnerState = {},
  onLearnerStateChange,
  isCompleted,
  onToggleComplete,
  hasPreviousLesson,
  hasNextLesson,
  onPreviousLesson,
  onNextLesson,
  onFinishCourse,
}) {
  const [isFinishModalOpen, setIsFinishModalOpen] = useState(false);
  const finishModalRef = useRef(null);
  const answer = lesson?.answer ?? lesson?.quiz?.answer ?? lesson?.assignment?.answer;
  const selectedOption = learnerState.selectedOption ?? null;
  const quizSubmitted = learnerState.quizSubmitted === true;
  const assignmentResponse = learnerState.assignmentResponse ?? '';
  const assignmentSubmitted = learnerState.assignmentSubmitted === true;

  useEffect(() => {
    setIsFinishModalOpen(false);
  }, [lesson?.id]);

  useEffect(() => {
    if (isFinishModalOpen) {
      finishModalRef.current?.focus();
    }
  }, [isFinishModalOpen]);

  const handleNext = () => {
    if (hasNextLesson) onNextLesson();
  };

  const updateLearnerState = (changes) => {
    onLearnerStateChange({ ...learnerState, ...changes });
  };

  const finishCourse = () => {
    onFinishCourse();
    setIsFinishModalOpen(true);
  };

  const AnswerCard = () => (
    <div className="border border-emerald-200 bg-emerald-50/40 rounded-2xl p-6 space-y-4">
      <div className="flex items-center gap-2 text-emerald-950 font-bold">
        <Lightbulb className="w-5 h-5 text-amber-400 fill-amber-200" />
        <h3>Jawaban dari Pembuat Soal</h3>
      </div>
      <MarkdownContent className="text-sm">{answer}</MarkdownContent>
    </div>
  );

  if (!lesson) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-slate-400 space-y-2">
        <BookOpen className="w-10 h-10 text-slate-300" />
        <p className="text-sm font-medium">Select a lesson from the sidebar to begin.</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Lesson Header */}
      <div className="border-b border-slate-200 pb-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className="text-xs uppercase tracking-wider font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md flex items-center gap-1.5">
              {lesson.type === 'quiz' && <HelpCircle className="w-3.5 h-3.5" />}
              {lesson.type === 'assignment' && <FileText className="w-3.5 h-3.5" />}
              {lesson.type === 'markdown' && <BookOpen className="w-3.5 h-3.5" />}
              {lesson.type}
            </span>
            <span className="text-xs text-slate-500 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {lesson.durationMinutes} mins
            </span>
          </div>

          <button 
            onClick={onToggleComplete}
            className={`text-xs font-semibold px-3.5 py-1.5 rounded-full flex items-center gap-1.5 transition-all ${
              isCompleted 
                ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200' 
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <CheckCircle className={`w-4 h-4 ${isCompleted ? 'text-emerald-600' : 'text-slate-400'}`} />
            {isCompleted ? 'Completed' : 'Mark as Complete'}
          </button>
        </div>
        
        <h1 className="text-3xl font-extrabold text-slate-900">{lesson.title}</h1>
      </div>

      {/* Lesson Type: Markdown with Code Highlighting */}
      {lesson.type === 'markdown' && (
        <MarkdownContent className="space-y-4">{lesson.content}</MarkdownContent>
      )}

      {/* Lesson Type: Quiz */}
      {lesson.type === 'quiz' && lesson.quiz && (
        <>
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-5">
            <div className="flex items-start gap-3">
              <HelpCircle className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
              <h3 className="font-bold text-slate-900 text-base">{lesson.quiz.question}</h3>
            </div>

            <div className="space-y-2.5">
              {lesson.quiz.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => !quizSubmitted && updateLearnerState({ selectedOption: idx })}
                  className={`w-full text-left p-4 rounded-xl border text-sm font-medium transition-all flex items-center justify-between ${
                    quizSubmitted && selectedOption !== lesson.quiz.correctIndex && selectedOption === idx
                      ? 'border-rose-500 bg-rose-50 text-rose-950'
                      : quizSubmitted && lesson.quiz.correctIndex === idx
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-950'
                        : selectedOption === idx
                          ? 'border-emerald-600 bg-emerald-50/60 text-emerald-950 shadow-sm'
                          : 'border-slate-200 bg-white hover:bg-slate-100/80 text-slate-700'
                  }`}
                >
                  <span>{option}</span>
                  <span className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                    quizSubmitted && selectedOption !== lesson.quiz.correctIndex && selectedOption === idx
                      ? 'border-rose-600 bg-rose-600'
                      : quizSubmitted && lesson.quiz.correctIndex === idx
                        ? 'border-emerald-600 bg-emerald-600'
                        : selectedOption === idx ? 'border-emerald-600 bg-emerald-600' : 'border-slate-300'
                  }`}>
                    {selectedOption === idx && <span className="w-1.5 h-1.5 bg-white rounded-full" />}
                  </span>
                </button>
              ))}
            </div>

            {!quizSubmitted ? (
              <button
                disabled={selectedOption === null}
                onClick={() => updateLearnerState({ quizSubmitted: true })}
                className="w-full py-3 bg-slate-900 text-white rounded-xl text-sm font-semibold hover:bg-slate-800 disabled:opacity-40 transition-all shadow-sm"
              >
                Submit Answer
              </button>
            ) : (
              <div className={`p-4 rounded-xl text-sm border flex items-start gap-3 ${
                selectedOption === lesson.quiz.correctIndex
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                  : 'bg-rose-50 border-rose-200 text-rose-900'
              }`}>
                {selectedOption === lesson.quiz.correctIndex
                  ? <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  : <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                }
                <div>
                  <p className="font-bold mb-1">
                    {selectedOption === lesson.quiz.correctIndex ? 'Correct!' : 'Incorrect'}
                  </p>
                  <p className="text-xs opacity-90 leading-relaxed">{lesson.quiz.explanation}</p>
                </div>
              </div>
            )}
          </div>
          {quizSubmitted && answer && <AnswerCard />}
        </>
      )}

      {/* Lesson Type: Assignment */}
      {lesson.type === 'assignment' && lesson.assignment && (
        <>
          <div className="border border-indigo-200 bg-indigo-50/40 rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-2 text-indigo-950 font-bold">
              <FileText className="w-5 h-5 text-indigo-600" />
              <h3>Practical Assignment</h3>
            </div>
            <MarkdownContent className="text-sm">
              {lesson.assignment.instructions}
            </MarkdownContent>
            <textarea
              rows="4"
              value={assignmentResponse}
              onChange={(event) => updateLearnerState({ assignmentResponse: event.target.value })}
              placeholder="Type your response or paste project links here..."
              className="w-full p-3.5 border border-slate-200 rounded-xl text-sm bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all shadow-sm"
            />
            <button
              type="button"
              disabled={!assignmentResponse.trim()}
              onClick={() => updateLearnerState({ assignmentSubmitted: true })}
              className="w-full py-3 bg-slate-900 text-white rounded-xl text-sm font-semibold hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40 transition-all shadow-sm"
            >
              Submit Answer
            </button>
          </div>
          {assignmentSubmitted && answer && <AnswerCard />}
        </>
      )}

      <nav className="flex items-center justify-between gap-4 border-t border-slate-200 pt-6" aria-label="Lesson navigation">
        <button
          type="button"
          onClick={onPreviousLesson}
          disabled={!hasPreviousLesson}
          className="inline-flex items-center gap-2 rounded-xl bg-slate-100 px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ArrowLeft className="h-4 w-4" />
          Previous
        </button>

        {hasNextLesson ? (
          <button
            type="button"
            onClick={handleNext}
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
          >
            Next
            <ArrowRight className="h-4 w-4" />
          </button>
        ) : (
          <button
            type="button"
            onClick={finishCourse}
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
          >
            Finish
            <PartyPopper className="h-4 w-4" />
          </button>
        )}
      </nav>

      {isFinishModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4">
          <div
            ref={finishModalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="finish-title"
            aria-describedby="finish-description"
            tabIndex={-1}
            onKeyDown={(event) => {
              if (event.key === 'Escape') {
                setIsFinishModalOpen(false);
              }
            }}
            className="w-full max-w-md overflow-hidden rounded-2xl bg-white text-center shadow-2xl outline-none"
          >
            <div className="relative overflow-hidden bg-gradient-to-br from-emerald-500 to-teal-600 px-6 pb-8 pt-10 text-white">
              <Sparkles className="absolute left-8 top-6 h-5 w-5 animate-pulse text-amber-200" />
              <Sparkles className="absolute right-10 top-12 h-4 w-4 animate-pulse text-amber-100 [animation-delay:300ms]" />
              <PartyPopper className="mx-auto h-16 w-16 animate-bounce text-amber-200" />
              <h2 id="finish-title" className="mt-4 text-2xl font-extrabold">
                Congratulations!
              </h2>
            </div>
            <div className="p-6">
              <p id="finish-description" className="text-sm leading-6 text-slate-600">
                You have finished this module. Your final lesson has been marked as complete.
              </p>
              <button
                type="button"
                onClick={() => setIsFinishModalOpen(false)}
                className="mt-6 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
              >
                Celebrate!
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
