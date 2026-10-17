import type { Body } from './lessons';

const o = (a: string, b: string, c: string) => [{ id: 'a', label: a }, { id: 'b', label: b }, { id: 'c', label: c }];

export const MORE: Record<string, Body> = {
  'confident-and-wrong': {
    intro: 'A language model writes the most likely next words. Most of the time that produces something right. Sometimes it produces something that only sounds right, in exactly the same confident tone.',
    sections: [
      { h: 'Why fluency fools us', p: ['We are used to people who sound sure being sure. A model has no such link: its tone is the same whether it is reciting a well-known fact or inventing a citation.', 'That is why made-up references, wrong API names and plausible but false numbers are so easy to miss.'] },
      { h: 'What to do instead', p: ['Treat every specific claim (a name, a number, a function, a quote) as a lead, not a fact. Check it against the source before it goes into your work.'] },
    ],
    rule: 'A confident tone is not evidence. Check names, numbers and citations at the source.',
    checks: [
      { q: 'The model cites a paper with authors and a year. What do you do?', options: o('Copy the citation; it looks complete', 'Search for the paper yourself before using it', 'Ask the model if the paper is real'), correct: 'b', right: 'Yes. Find it at the source; models can invent citations.', wrong: 'Not quite. A complete-looking citation can still be invented, and asking the model again proves nothing.' },
      { q: 'Which output most needs checking?', options: o('A rephrased paragraph you wrote', 'A specific statistic in an answer', 'A list of synonyms'), correct: 'b', right: 'Right. Specific numbers are where confident errors hide.', wrong: 'Not quite. Specific claims like statistics are the riskiest part.' },
    ],
    prompt: 'List three claims in this paragraph that I should verify before using it, and say where I could check each one.',
    answer: '1. “Released in 2019”: check the project’s official changelog.\n2. “Used by 40% of companies”: find the original survey.\n3. The quoted definition: check the textbook it is attributed to.',
    tutor: { 'Give me an example': 'You ask for the Python function to merge dicts and it says dict.merge(). It sounds right; it does not exist. Running it would tell you in one second.', 'Summarise in one line': 'Sounding sure and being right are unrelated in a model; check specifics.' },
  },
  'context-windows': {
    intro: 'A model only sees what is in front of it in this conversation. It does not see your repo, your earlier chats, or the file you forgot to paste, unless your tool explicitly gives it that.',
    sections: [
      { h: 'Why pasting everything backfires', p: ['More text is not more understanding. Long, mixed context makes it easier for the model to latch onto the wrong part.', 'The best context is the smallest piece that contains the problem: the failing function, the error, and what you expected.'] },
      { h: 'A quick habit', p: ['Before you ask, write one line: “Here is X, I expected Y, I got Z.” Then paste only what that sentence needs.'] },
    ],
    rule: 'Give the smallest context that contains the problem: what you have, what you expected, what you got.',
    checks: [
      { q: 'Your test fails. What should you paste?', options: o('The whole repository', 'The failing test, the function it calls, and the error', 'Just “it doesn’t work”'), correct: 'b', right: 'Yes. Small and complete beats big and noisy.', wrong: 'Not quite. Too much or too little context both make answers worse.' },
      { q: 'The model suggests a function name that is not in your code. Most likely…', options: o('It saw a different version of your code', 'It could not see your code and guessed', 'Your code is wrong'), correct: 'b', right: 'Right. It fills gaps with plausible guesses.', wrong: 'Not quite. Without your code in context, it guesses.' },
    ],
    prompt: 'Here is my function and the error. I expected a sorted list and got None. In two lines, why?',
    answer: 'list.sort() sorts in place and returns None, so assigning its result gives you None.\nUse sorted(items) if you want a new list back.',
    tutor: { 'Give me an example': '“Here is calc_total(), I expected 120, I got 100.” plus the 10 lines of the function is a better ask than pasting the whole file.', 'Summarise in one line': 'The model only knows what you show it; show the smallest complete piece.' },
  },
  'five-tools': {
    intro: 'There are dozens of AI products and the names change every month. Underneath, they fall into five kinds of tool. Know which kind you are holding and you know what it is good for.',
    sections: [
      { h: 'The shelf', p: ['Chat assistants for explaining and brainstorming. Code assistants inside your editor for small, checkable edits. Search tools that cite sources for finding facts. Notebook and data helpers for exploring a dataset. Diagram and image makers for visuals.', 'Each is strong at one job and weak when you push it into another, like asking a chat assistant for facts without sources.'] },
      { h: 'When to leave each closed', p: ['Close the chat when you need a source. Close the code assistant when you cannot read what it wrote. Close all of them in an exam or a live round.'] },
    ],
    rule: 'Pick the tool by the job: explain, edit, find, explore or draw. Then check its output the way that job needs.',
    checks: [
      { q: 'You need a fact you can cite in a report. Which tool fits?', options: o('A chat assistant with no sources', 'A search tool that shows its sources', 'An image generator'), correct: 'b', right: 'Yes. You need a source you can open and read.', wrong: 'Not quite. For facts you can cite, you need visible sources.' },
      { q: 'When should the code assistant stay closed?', options: o('When the change is small', 'When you cannot read or test what it would write', 'When you are in a hurry'), correct: 'b', right: 'Right. If you can’t check it, don’t ship it.', wrong: 'Not quite. The deciding factor is whether you can check the result.' },
    ],
    prompt: 'I need to compare two databases for my project. Which kind of AI tool should I use first, and what should I verify?',
    answer: 'Start with a search tool that cites sources to find each database’s official docs.\nVerify: licence, hosting cost, and whether the feature you need is in the free tier.',
    tutor: { 'Give me an example': 'Need a diagram of your architecture? A diagram tool. Need to know if a library supports Python 3.12? A search tool with sources, then the library’s own docs.', 'Summarise in one line': 'Five kinds of tool, five jobs: match the tool to the job.' },
  },
  'when-to-close-it': {
    intro: 'Some rooms are not for AI. Knowing which ones, before you walk in, saves you from the one mistake that is hard to undo.',
    sections: [
      { h: 'Rooms where it stays closed', p: ['Closed-book exams and online tests. Live coding rounds and vivas. Anything you sign as your own original work where the rules say no assistance.', 'If you are not sure what the rules are, ask before, not after.'] },
      { h: 'Rooms where it helps', p: ['Preparing for those rooms is different. Using AI to quiz yourself, explain a concept, or run a mock viva is preparation, and it makes you better in the room where it stays closed.'] },
    ],
    rule: 'Prepare with it. Perform without it, whenever the room says so.',
    checks: [
      { q: 'A take-home test says “no external help”. What applies?', options: o('AI is fine because it isn’t a person', 'No AI tools for the test itself', 'Only use it for the hard questions'), correct: 'b', right: 'Yes. “No external help” includes AI tools.', wrong: 'Not quite. Read “no external help” as including AI.' },
      { q: 'Using AI to run a mock viva the night before is…', options: o('Preparation, and a good use', 'Cheating', 'Pointless'), correct: 'a', right: 'Right. Practising with it makes you stronger without it.', wrong: 'Not quite. Preparing with AI is different from using it during the assessment.' },
    ],
    prompt: 'I have a viva tomorrow on my final-year project. Quiz me with one question at a time and tell me what a strong answer would include.',
    answer: 'Question 1: What problem does your project solve, and who has that problem?\nA strong answer names a real user, the pain, and one number that shows it matters.',
    tutor: { 'Give me an example': 'Night before: ask the model to play examiner. In the room: laptop closed, and you answer from what you practised.', 'Summarise in one line': 'Prepare with AI; perform without it when the rules say so.' },
  },
  'small-checkable-asks': {
    intro: 'The single biggest upgrade to how you prompt: ask for less. A small, specific ask gives you an answer you can verify in a minute.',
    sections: [
      { h: 'Big asks, unchecked answers', p: ['“Write my report” gives you pages you cannot verify. “Explain this paragraph in two lines” gives you something you can hold up against the original.', 'The smaller the ask, the faster the check, and the more the work stays yours.'] },
      { h: 'The shape of a good ask', p: ['Context in one line, the exact thing you want, the size you want it in, and how you will check it.'] },
    ],
    rule: 'Ask for something small enough that you can check every word.',
    checks: [
      { q: 'Which is the better prompt?', options: o('“Improve my code”', '“Why does this loop run one extra time? Two lines.”', '“Make it production-ready”'), correct: 'b', right: 'Yes. Specific, small and checkable by running it.', wrong: 'Not quite. Vague asks produce answers you can’t check.' },
      { q: 'Adding “in two lines” to a prompt mainly helps you…', options: o('Save money', 'Check the answer quickly', 'Sound smarter'), correct: 'b', right: 'Right. Short answers are fast to verify.', wrong: 'Not quite. The point is a fast, reliable check.' },
    ],
    prompt: 'Explain in two lines why this loop prints 11 numbers instead of 10, then give the one-character fix.',
    answer: 'range(0, 11) includes 0 through 10, which is 11 numbers.\nFix: change 11 to 10.',
    tutor: { 'Give me an example': '“Summarise this paper” is big. “What dataset does section 3 use?” is small and you can check it on the page.', 'Summarise in one line': 'Small asks make checkable answers.' },
  },
  'debug-a-failing-test': {
    intro: 'A failing test is the best possible place to use a model, because the test tells you whether the answer is right.',
    sections: [
      { h: 'Explanation first', p: ['Paste the test, the function and the error. Ask what is happening before asking for a fix. If the explanation does not match what you see, the fix will not either.'] },
      { h: 'Then a fix you can verify', p: ['Ask for the smallest change. Apply it, run the test, and read the diff line by line before you commit. In review you will be asked about that one line.'] },
    ],
    rule: 'Explanation, then the smallest fix, then the test decides.',
    checks: [
      { q: 'What should you ask for first?', options: o('A complete rewrite', 'An explanation of why the test fails', 'Ten possible fixes'), correct: 'b', right: 'Yes. Understanding first, fix second.', wrong: 'Not quite. Start with why it fails.' },
      { q: 'The fix passes the test. Before committing you should…', options: o('Commit immediately', 'Read the diff and be able to explain each changed line', 'Ask the model to commit it'), correct: 'b', right: 'Right. Your reviewer will ask about it.', wrong: 'Not quite. Passing tests is not the same as understanding the change.' },
    ],
    prompt: 'This test expects 200 but gets 201. Explain why in two lines, then suggest the smallest fix and how to verify it.',
    answer: 'The handler returns 201 Created on POST, while the test expects 200.\nSmallest fix: check the API spec; if 201 is correct, update the test’s expected status. Verify by re-running the test.',
    tutor: { 'Give me an example': 'Error: expected 3 got 2. Ask “why would this count be one short?” before “fix it”. The answer is usually an off-by-one you can now see.', 'Summarise in one line': 'Let the model explain, keep the fix small, let the test decide.' },
  },
  'demo-day-prompts': {
    intro: 'Founders need speed. A model can scaffold a demo in an hour. The risk is standing in front of investors with a product you cannot explain.',
    sections: [
      { h: 'Scaffold fast, mark what you don’t know', p: ['Let the model draft the boring parts: boilerplate, forms, glue code. As you go, keep a list of every piece you did not write and do not yet understand.', 'Before the demo, that list must be empty or honestly labelled.'] },
      { h: 'The demo question', p: ['Someone will ask “how does this part work?”. Practise answering it for the piece the model wrote.'] },
    ],
    rule: 'Move fast, but keep a list of everything you can’t explain yet, and empty it before demo day.',
    checks: [
      { q: 'An investor asks how a feature works. The model wrote it. You…', options: o('Say “AI did it” and move on', 'Explain how it works because you reviewed it', 'Change the subject'), correct: 'b', right: 'Yes. Owning the explanation is what earns trust.', wrong: 'Not quite. You need to be able to explain it.' },
      { q: 'The “don’t understand yet” list is for…', options: o('Blaming the model', 'Knowing what to learn before you present', 'Investors'), correct: 'b', right: 'Right. It is your pre-demo homework.', wrong: 'Not quite. It is your list of what to learn before presenting.' },
    ],
    prompt: 'Here is the signup flow the model wrote. List the three parts I most need to understand before a live demo, and one question an investor might ask about each.',
    answer: '1. Password hashing: “How do you store passwords?”\n2. Email verification: “What stops fake signups?”\n3. Rate limiting: “What happens if someone hammers this?”',
    tutor: { 'Give me an example': 'You shipped a payments page from a template. Before demo day you learn exactly what happens when a card fails. That is the question you will get.', 'Summarise in one line': 'Demo fast, but never demo what you can’t explain.' },
  },
  'explain-every-line': {
    intro: 'This is the routine that turns a model’s draft into your work. It takes ten minutes and it is the difference between using AI and being replaced by it.',
    sections: [
      { h: 'The walkthrough', p: ['Go through the draft line by line. For each line, say out loud what it does and why it is there. Wherever you cannot, ask the model to explain just that line, then rewrite it in your own words or your own code.', 'At the end you should be able to delete the draft and rebuild the important parts yourself.'] },
    ],
    rule: 'If you can’t explain a line, you don’t own it yet.',
    checks: [
      { q: 'You hit a line you can’t explain. Next step?', options: o('Skip it, it works', 'Ask about that line, then rewrite it in your words', 'Delete the whole draft'), correct: 'b', right: 'Yes. Targeted questions, then make it yours.', wrong: 'Not quite. Ask about that one line and rewrite it.' },
      { q: 'The walkthrough is finished when…', options: o('The code runs', 'You could rebuild the key parts without the draft', 'The model says it is good'), correct: 'b', right: 'Right. Ownership is the finish line.', wrong: 'Not quite. Running is not the same as understanding.' },
    ],
    prompt: 'Explain line 4 of this function as if to a classmate, in two sentences, and tell me what breaks if I remove it.',
    answer: 'Line 4 strips spaces from the user’s input so “ abc ” and “abc” match.\nRemove it and logins fail for anyone who types a trailing space.',
    tutor: { 'Give me an example': 'Draft has `if not items: return []`. Say it out loud: “guard for an empty list”. If you couldn’t, that is the line to ask about.', 'Summarise in one line': 'Walk through every line; ask about the ones you can’t explain.' },
  },
  'mock-viva': {
    intro: 'A viva tests whether you know your own project. A model makes a patient examiner: it will ask, wait, and ask again.',
    sections: [
      { h: 'Set it up', p: ['Give it a short description of your project. Ask it to play a strict examiner, ask one question at a time, and wait for your answer before giving feedback.'] },
      { h: 'Use the feedback', p: ['Each time it points at a gap, write the better answer down in your own words. That page is what you revise from the night before.'] },
    ],
    rule: 'One question at a time, answer in your own words, keep the better answers.',
    checks: [
      { q: 'Why ask for one question at a time?', options: o('It is faster', 'So you answer each one yourself before seeing feedback', 'The model needs it'), correct: 'b', right: 'Yes. You practise answering, not reading.', wrong: 'Not quite. The point is you answer first.' },
      { q: 'What should you keep after the mock viva?', options: o('The model’s answers, to memorise', 'Your improved answers, in your own words', 'Nothing'), correct: 'b', right: 'Right. Your words are what you’ll say in the room.', wrong: 'Not quite. Keep your own improved answers.' },
    ],
    prompt: 'Act as a strict examiner for my final-year project on crop disease detection. Ask one question at a time and wait for my answer.',
    answer: 'Question 1: Why did you choose this model architecture over a simpler baseline, and how much better did it actually do?',
    tutor: { 'Give me an example': 'Examiner asks “why this dataset?”. You answer. It replies: “You didn’t mention class imbalance.” You write a better answer that does.', 'Summarise in one line': 'Let the model examine you; keep your improved answers.' },
  },
  'exams-and-data': {
    intro: 'Most AI mistakes are fixable. A few are not. This lesson names them plainly so you never make them by accident.',
    sections: [
      { h: 'The lines', p: ['Using AI in an assessment that forbids it. Pasting other people’s private data, your employer’s code, or confidential documents into a public tool. Submitting someone else’s work, or a model’s, as your own original work where originality is required.', 'Each can end a course, an internship or a job, and none can be undone by an apology.'] },
      { h: 'When in doubt', p: ['Ask the person who sets the rules, before you start. Write down the answer. That one message protects you.'] },
    ],
    rule: 'No AI where it’s forbidden, no private data in public tools, no passing off work as yours. Ask first when unsure.',
    checks: [
      { q: 'Your internship code has a bug. Can you paste it into a public chatbot?', options: o('Yes, it’s just code', 'Only if your company allows that tool for its code', 'Yes, if you delete it after'), correct: 'b', right: 'Yes. Company code follows company rules.', wrong: 'Not quite. Pasting it may share confidential code; check the policy.' },
      { q: 'You are unsure if AI is allowed on an assignment. Best move?', options: o('Use it quietly', 'Ask the instructor before starting', 'Avoid the assignment'), correct: 'b', right: 'Right. A quick question before is worth everything.', wrong: 'Not quite. Ask first and keep the answer.' },
    ],
    prompt: 'Help me write a short, polite message to my professor asking whether AI tools are allowed for brainstorming on assignment 3.',
    answer: 'Hi Professor, for assignment 3, may we use AI tools to brainstorm ideas if all writing and analysis is our own? I want to make sure I follow the course policy. Thank you!',
    tutor: { 'Give me an example': 'A friend shares their solved assignment “for reference”. Using it as your own crosses the line, with or without AI.', 'Summarise in one line': 'Forbidden rooms, private data, and passing off work: never. Ask first.' },
  },
};
