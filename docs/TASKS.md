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

# Task 4
I want to implement a NEXT and PREV button at the end of each lesson

- PREV button should have a very light grey background just to make it seen
- give me advice on what color suitable for the NEXT button
- when the NEXT button is clicked, show a focused modal box, which makes the rest of the page covered in a dark color with certain opacity
- the modal box should ask whether the user wants to mark the current lesson as complete or not
- YES answer makes the lesson marked as complete and the lesson move to the next one
- NO answer only makes the lesson move to the next one
- When the current lesson is already complete, clicking NEXT should move directly to the next lesson without showing the modal.
<!-- End of task 4 -->

# Task 5
I want some behavior updates :
- I want the left sidebar to be sticky, so when I scroll, I want to keep seeing it
- I want to have a `Restart` button with an exclamation icon, background yellow. Details are below
- If the user jump between lessons through the sidebar menu, I want the lesson to open the lesson from the beginning, not in the middle of the page ( lesson )

## RESTART button detail
When user click it, it will :
- show a modal box just like when you click NEXT button
- it should ask : "Are you sure ? Any unsaved progress will be lost forever"
- it has 2 button : "I am sure", "No, bring me back to my lesson"
- clicking "I am sure" button will lead to module reset, just like when you hit the `Switch Course` button
- clicking "No, bring me back to my lesson" button will just simply close the modal box
- give a proper background for each button
<!-- End of task 5 -->

# Task 6
For every essai ( assignment ) type of lesson, I like to introduce new key called "answer". You can see the example on `course3.json` file.

What I want you to do is :
- Assignment should also have a "Submit Answer" button like quiz, right below the text area
- In any lesson / quiz / assignment which has "answer", when user Submit Answer, show the answer ( which is in markdown format ) properly in a separate card below the `Practical Assignment` card. Same design with the Practical Assignment card, but I want the background to be green with the same opacity with the Practical Assignment
- The title of the card will be `Jawaban dari Pembuat Soal`, use a bright light bulb icon
<!-- End of task 6 -->

# Task 7
On the last lesson, I want the Next button changed into Finish button. When user click it, it will :
- Update the lesson state into complete
- Show a congratulations modal box and congrats the user that he already finish the module
- A bit of animation using javacript or animated gif / png image like trumpet or anything which showing a celebration would be nice
<!-- End of task 7 -->

# Task 8
Implement these updates :
- When the user hit the `RESTART` button, I want the module start from the beginning as if the user just uploaded the material. So, if the user already answer 1 or more questions, the answers get flush and we start all over again
- When the user hit `NEXT` button, it will directly move to the next lesson WITHOUT the confirmation modal. And the current lesson will automatically marked as complete
- After user answer a problem, whatever the format is, I want the answer and the explanation stays, so when the user going back and forth between lessons, the answer remain. It will only restart to the first state when the user hit the `RESTART` button
- In multiple choice problem ( quiz ), when the user answer with the wrong choice, I want the original answer turn red and the correct answer turn green. The behaviour of the explanation below remain as it is now
<!-- End of task 8 -->