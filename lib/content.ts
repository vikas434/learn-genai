// Prototype content. Stop 01 lesson titles come from the live learn-genai.in site;
// everything marked is a proposed curriculum for the pitch and should be reviewed.

export type Tone = 'mint' | 'sun' | 'coral' | 'grape' | 'sky';
export type Persona = 'students' | 'engineers' | 'founders';

export const PERSONAS: { id: Persona; name: string; tone: Tone; line: string; detail: string }[] = [
  { id: 'students', name: 'Students', tone: 'mint', line: 'Final year, a drive on the calendar.', detail: 'A chat tool you are afraid to use in the wrong room. Learn where it helps, where it hurts, and how to explain your own project.' },
  { id: 'engineers', name: 'Engineers', tone: 'sky', line: "A teammate's repo, a failing test.", detail: 'And a review that will ask you to change one line. Use AI to read code faster without shipping what you cannot defend.' },
  { id: 'founders', name: 'Founders', tone: 'coral', line: 'A Thursday demo.', detail: 'You need the product to work, and you need to explain the part the model drafted. Move fast and stay accountable.' },
];

export type Stop = { n: number; slug: string; title: string; short: string; blurb: string; tone: Tone };
export const STOPS: Stop[] = [
  { n: 1, slug: 'the-work', short: 'The work', title: 'The work', blurb: 'What reviewers and interviewers are actually checking.', tone: 'mint' },
  { n: 2, slug: 'how-tools-behave', short: 'Tools behave', title: 'How the tools behave', blurb: 'Why a model sounds sure when it is wrong.', tone: 'sky' },
  { n: 3, slug: 'the-shelf', short: 'Tool shelf', title: 'The tool shelf', blurb: 'Five kinds of tools and when to leave each closed.', tone: 'sun' },
  { n: 4, slug: 'prompts-you-can-judge', short: 'Prompts', title: 'Prompts you can judge', blurb: 'Ask for answers small enough to check.', tone: 'grape' },
  { n: 5, slug: 'explain-it-back', short: 'Explain it', title: 'Explain it back', blurb: 'Turn a model draft into work you can defend.', tone: 'coral' },
  { n: 6, slug: 'the-lines', short: 'The lines', title: 'The lines you do not cross', blurb: 'Exams, data, and other people’s work.', tone: 'mint' },
];

export type Lesson = { slug: string; title: string; stop: number; minutes: number; personas: Persona[]; summary: string; checks: number; kind: 'Read' | 'Practice' | 'Watch' };
export const LESSONS: Lesson[] = [
  { slug: 'what-the-drive-is-testing', title: 'What the drive is actually testing', stop: 1, minutes: 12, personas: ['students'], summary: 'It is not checking whether you avoided AI. It is checking whether you understand what you hand in.', checks: 2, kind: 'Read' },
  { slug: 'a-pocket-rule', title: 'A pocket rule you can remember', stop: 1, minutes: 10, personas: ['students', 'engineers', 'founders'], summary: 'One sentence to decide, in the moment, whether to open the chat window.', checks: 2, kind: 'Read' },
  { slug: 'confident-and-wrong', title: 'Confident and wrong', stop: 2, minutes: 11, personas: ['students', 'engineers', 'founders'], summary: 'How a model produces fluent text, and why fluency is not evidence.', checks: 2, kind: 'Read' },
  { slug: 'context-windows', title: 'What the model can and cannot see', stop: 2, minutes: 9, personas: ['engineers'], summary: 'Context, limits and why pasting the whole repo rarely helps.', checks: 2, kind: 'Read' },
  { slug: 'five-tools', title: 'Five tools, one shelf', stop: 3, minutes: 14, personas: ['students', 'engineers', 'founders'], summary: 'Chat, code assistant, cited search, notebook helper, diagram maker: one job each.', checks: 2, kind: 'Watch' },
  { slug: 'when-to-close-it', title: 'When to close the chat window', stop: 3, minutes: 8, personas: ['students'], summary: 'Viva rooms, closed-book rounds, and the work that has to be yours.', checks: 2, kind: 'Read' },
  { slug: 'small-checkable-asks', title: 'Small, checkable asks', stop: 4, minutes: 12, personas: ['students', 'engineers'], summary: 'Ask for two lines you can verify instead of a page you cannot.', checks: 2, kind: 'Practice' },
  { slug: 'debug-a-failing-test', title: 'Debug a failing test with a model', stop: 4, minutes: 15, personas: ['engineers'], summary: 'Get an explanation first, a fix second, and verify both.', checks: 2, kind: 'Practice' },
  { slug: 'demo-day-prompts', title: 'Prompts for a Thursday demo', stop: 4, minutes: 13, personas: ['founders'], summary: 'Scaffold fast, then mark every line you still need to understand.', checks: 2, kind: 'Practice' },
  { slug: 'explain-every-line', title: 'Explain every line', stop: 5, minutes: 12, personas: ['students', 'engineers', 'founders'], summary: 'A walkthrough routine that turns a model draft into your work.', checks: 2, kind: 'Practice' },
  { slug: 'mock-viva', title: 'Run a mock viva on your project', stop: 5, minutes: 14, personas: ['students'], summary: 'Let the model play reviewer, one question at a time.', checks: 2, kind: 'Practice' },
  { slug: 'exams-and-data', title: 'Exams, data, and other people’s work', stop: 6, minutes: 10, personas: ['students', 'engineers', 'founders'], summary: 'The lines that end careers, said plainly.', checks: 2, kind: 'Read' },
];

export const INCLUDES: { label: string; tone: Tone }[] = [
  { label: 'Short reading, 8–15 min', tone: 'mint' },
  { label: 'Two checks with the why', tone: 'sun' },
  { label: 'A prompt sandbox', tone: 'grape' },
  { label: 'An AI tutor that cites the lesson', tone: 'grape' },
  { label: 'Works on a phone', tone: 'sky' },
  { label: 'Free, no card', tone: 'coral' },
];

export const stopOf = (n: number) => STOPS.find((s) => s.n === n)!;
export const lessonsIn = (n: number) => LESSONS.filter((l) => l.stop === n);
export const totalMinutes = LESSONS.reduce((a, l) => a + l.minutes, 0);
