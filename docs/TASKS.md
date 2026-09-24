# General rules
- Analyze the whold app, especially the documentation in `@docs/` folder if you don't have the context yet
- Context are defined in `@LLM_CONTEXT.md`
- If there's a significant changes in the app, look at the docs/ folder and update related files accordingly
- Always ask me for some uncertain in running the task
- If you have to run a terminal command, pause your activities, give me the command, and I will give you the `continue` signal after I did the command

# Task 1
I want you to update the app. If I click the `Switch Course` button, I want you to clean the localStorage so that it should start from the beginning. No completed course marked yet.
<!-- End of task 1 -->

# Task 2
I want to mark my last completed page / chapter. I'm thinking to add `completed: true | false` to each lesson. It will be marked as completed after the learner explicitly marked complete. It won't take effect now, but later, I want to have something like `Save My Progress` button, which will trigger an update json file download which contain the original material with the updated `completed` value. So, next time the learner wish to continue the lesson, s/he will only need to upload the updated json and continue the lesson.

Give me your opinion if it is a good idea. And give me your own idea if you have any. Interview me if you need me to clarify some things

At the end of the conversation, after you can conclude our discussion, I want you to add `Task 3` to this file for me to execute later regarding this update
<!-- End of task 2 -->

# Task 3
Implement portable course-progress saving.

- Keep learner progress in `localStorage` during the current learning session.
- Add an optional `completed: true | false` property to each lesson. Set it to `true` only when the learner explicitly marks that lesson complete.
- Add a course-level `lastActiveLessonId`. Update it whenever the learner opens a lesson.
- When a learner uploads a saved course JSON, restore completion states and resume at `lastActiveLessonId`; fall back safely to the first lesson when it is absent or invalid.
- Add a primary `Save My Progress` button to the Navbar, immediately before `Switch Course`.
- Clicking `Save My Progress` must download an updated copy of the currently uploaded course JSON named `[original course name] - update [dd-mm-yy].json`, containing the latest lesson `completed` values and `lastActiveLessonId`. A browser cannot overwrite the original uploaded file directly.
- Preserve backward compatibility with existing course JSON files that do not yet include these fields.
- Update the applicable documentation, including the JSON schema, as part of the implementation.
<!-- End of task 3 -->
