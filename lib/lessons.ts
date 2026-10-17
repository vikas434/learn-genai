import { MORE } from './lessons-more';
// Lesson bodies for the prototype. Plain, short, written for the situation.
export type Check = { q: string; options: { id: string; label: string }[]; correct: string; right: string; wrong: string };
export type Body = { intro: string; sections: { h: string; p: string[] }[]; rule: string; checks: [Check, Check]; prompt: string; answer: string; tutor: Record<string, string> };

const opts = (a: string, b: string, c: string) => [{ id: 'a', label: a }, { id: 'b', label: b }, { id: 'c', label: c }];

export const BODIES: Record<string, Body> = {
  'what-the-drive-is-testing': {
    intro: 'A placement drive is not checking whether you avoided AI. It is checking whether you understand the work you hand in: can you explain it, change it, and defend a choice when someone pushes back?',
    sections: [
      { h: 'What the interviewer is scoring', p: ['Most technical rounds score three things: whether you can reason about a problem out loud, whether you know why your own project is built the way it is, and whether you can adapt when the question changes.', 'None of those are about the tool you used. All of them fall apart if a tool did the thinking and you did not.'] },
      { h: 'Where AI genuinely helps', p: ['Use a chat tool to get unstuck, to compare two approaches, or to explain an error you do not recognise. Those uses make you understand more, not less.', 'Do not use it to produce something you could not rebuild on a whiteboard. That is the line the interview finds.'] },
    ],
    rule: 'If an interviewer pointed at any line and asked “why this?”, could you answer without the chat window open?',
    checks: [
      { q: 'A recruiter asks how you built your project. What matters most?', options: opts('That you didn’t use any AI tools', 'That you can explain every part, including what the model drafted', 'That the code has no comments'), correct: 'b', right: 'Yes. Using AI is fine; not being able to explain it is not.', wrong: 'Not quite. They care whether you understand what you built, whoever drafted it.' },
      { q: 'The model gives you a working fix you don’t understand. What’s the right next step?', options: opts('Ship it. It passes the tests.', 'Delete it and never use the tool again', 'Ask it to walk through the fix line by line, then decide'), correct: 'c', right: 'Right. Understand it first, then keep it or rewrite it.', wrong: 'Not quite. Shipping code you can’t explain is exactly what a drive catches.' },
    ],
    prompt: 'I have a placement interview Friday. Ask me three questions about my final-year project that a reviewer would ask, one at a time.',
    answer: 'Question 1 of 3:\nWhy did you choose this approach over the simplest one that would have worked? Walk me through the trade-off.',
    tutor: { 'Give me an example': 'Example from this lesson: you used a model to write a SQL query for your project. In the interview, they ask why you used a JOIN instead of two queries. If you can answer that, the tool helped you. If you can’t, it replaced you.', 'Is using ChatGPT cheating?': 'Not by itself. This lesson’s rule: it is fine when it helps you understand, and a problem when it produces something you could not rebuild or explain. Check your college’s own policy for exams.', 'Summarise in one line': 'Drives test whether you understand your work, not whether you avoided AI.' },
  },
  'a-pocket-rule': {
    intro: 'You will not remember a policy document in the moment. You will remember one sentence. Here is the one to keep.',
    sections: [
      { h: 'The rule', p: ['Use AI for things you could check, never for things you would have to trust.', 'If you can verify the output yourself in a minute, by running it, reading it, or looking it up, go ahead. If you would have to take it on faith, stop and do it yourself or ask a person.'] },
      { h: 'Why it works', p: ['It moves the question from “is this allowed?” to “can I stand behind this?”. That second question has the same answer in a classroom, a code review and a pitch meeting.'] },
    ],
    rule: 'Use AI for things you could check, never for things you would have to trust.',
    checks: [
      { q: 'Which use passes the pocket rule?', options: opts('Asking for a summary of a paper you won’t read', 'Asking it to explain an error message, then testing the fix', 'Asking it to write your SOP and submitting it as-is'), correct: 'b', right: 'Yes. You can check the explanation by running the fix.', wrong: 'Not quite. That one asks you to trust output you can’t verify.' },
      { q: 'The rule is mainly about…', options: opts('Which tools are allowed', 'Whether you can stand behind the result', 'How fast you finish'), correct: 'b', right: 'Exactly. Checkability, not permission.', wrong: 'Not quite. It is about whether you can stand behind what you hand in.' },
    ],
    prompt: 'Here is an error message from my Python script: KeyError: \'user_id\'. Explain in two lines what it means and one thing I can check.',
    answer: 'A KeyError means you asked a dictionary for a key it does not have, here \'user_id\'.\nCheck: print the dictionary’s keys right before that line and compare the spelling.',
    tutor: { 'Give me an example': 'Checkable: “What does this regex match?” — you can test it. Not checkable: “Is this legal clause enforceable?” — you would have to trust it.', 'Summarise in one line': 'Use AI for what you can check, not what you must trust.' },
  },
};

// Lessons without a hand-written body get a short, honest outline built from their summary.
export function bodyFor(slug: string, title: string, summary: string): Body {
  if (BODIES[slug]) return BODIES[slug];
  if (MORE[slug]) return MORE[slug];
  return {
    intro: summary,
    sections: [
      { h: 'The idea', p: [`${title} comes down to one habit: ask for something small enough that you can check it yourself, then check it before you use it.`, 'This lesson walks through a real situation, what usually goes wrong, and the version that holds up when someone asks you about it.'] },
      { h: 'What to do tomorrow', p: ['Pick one task from this week. Use the prompt below on it, then write one sentence on what you checked and how.'] },
    ],
    rule: 'Small asks, checked answers, your name on the result.',
    checks: [
      { q: 'Which ask is easier to check?', options: opts('“Write my whole report”', '“Explain this one function in two lines”', '“Make it better”'), correct: 'b', right: 'Yes. Small and specific means you can verify it.', wrong: 'Not quite. Big, vague asks give you output you can’t check.' },
      { q: 'After the model answers, you should first…', options: opts('Paste it in', 'Check it against something you trust', 'Ask it if it is sure'), correct: 'b', right: 'Right. A model saying it is sure is not evidence.', wrong: 'Not quite. Asking the model to confirm itself proves nothing.' },
    ],
    prompt: 'Explain what this function does in two lines, then list one input that would break it.',
    answer: 'It takes a list of scores and returns the average, rounded to one decimal.\nAn empty list would break it: it divides by zero.',
    tutor: { 'Give me an example': 'Instead of “fix my code”, try “why does this loop run one time too many?” — you can check that answer by running it.', 'Summarise in one line': summary },
  };
}
