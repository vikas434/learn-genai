# Notes — 2026-11-15

Typed from Vikas's handwritten PDF "AI context Engineering" (22 pages), saved beside this file as handwritten-notes.pdf (pages re-saved at a lower resolution, metadata removed).
Lines marked TODO, READ or Question are his own reminders and open questions.

## Prompt engineering → context engineering

- A prompt engineer works with a curated prompt like "You are an expert...".
- It failed while building practical applications, because the prompt is just one part. Everything around it matters more.
- Diagram: a circle "You are an expert..." labelled "just a prompt". Beside it a box, the context window, holding SYSTEM PROMPT, TOOLS, RAG and more. Label: only fixed token budget. A model box below.
- The prompt is just one part of the equation. The real challenge is how to use the context window effectively, within budget.
- Important things to note:
  1. Clever prompts may not help, as we are sending tokens in every call.
  2. Making the context window bigger also does not help: the "lost in the middle" effect.
- READ: the lost in the middle paper. Understand and simulate it.

## Four ways of managing context

1. WRITE: to any external file or folder.
2. SELECT: pull relevant details using RAG.
3. COMPRESS: summarize or prune it.
4. ISOLATE: split this across multiple subagents.

The real challenge in modern AI application development is how to use the context effectively, as the focus is on using natural language to get things done.

## Evolution of software

| | Software 1.0 | Software 2.0 | Software 3.0 |
|---|---|---|---|
| What you write | Code (humans write rules) | Weights, from input data and labelled messages | Prompts → LLM → results |
| The artefact | Source code | Dataset (for example gradient descent) | Context |
| Cost of a change | Minutes | Hours to days (GPUs and evals) | Immediate (frozen LLM) |

- The catch: English is a fuzzy language. "Be concise" means various things. So our context becomes our real interface for building AI applications.
- READ: Karpathy's article on Software 1.0 → 2.0 → 3.0. These examples are from Karpathy.

## Anatomy of the context window

1. System prompt
2. Instructions and personas
3. Tool definitions
4. Retrieved knowledge
5. Long-term memory
6. Conversational history

- Question: which parts of the context window are fixed and which are variable as they grow? Check the implementation in Claude Code, Hermes, Pi, DeepSeek.
- Diagram, with example token counts: system prompt 300 (constant), instructions 500 (semi constant), tools 800 (keeps growing?), retrieved knowledge 1500 (external data), long-term memory 1000 (needs separate memory management), conversation history 2000 (keeps growing).
- As the conversation grows, the context window starts filling.
- TODO: show one live example of Cursor or Claude: how the window fills, keeps less space, and eventually some messages need to be compacted or summarized before creating the next one.
- Every token is approximately three quarters of a word (the OpenAI tiktoken library can show this).
- Filling the context with many other things leads to context distraction. Cost and latency also increase with each token, plus the lost in the middle effect.

## Context optimization strategy

- WRITE (save for later), SELECT (pull the relevant slice), COMPRESS (keep only what is useful), ISOLATE (split across windows).
- Diagram: files outside the window; arrows for write (out) and select (in); a compress box under the window; window A and window B separated by a dotted line.
- Questions:
  1. How do you decide, for each case, when to write, select, isolate or compress?
  2. Even external context management must be eating tokens. How do we track or manage this?
- TODO: check how AI tools like Claude and OpenAI handle the above.

### Write and select pair

- Example: an agent discovers one big issue that takes 1200 tokens each time. Rather than carrying it every time, put it in an external file and just mention the file. That takes only 12 tokens.
- TODO: visualize this with an animation.

### Compress and isolate

- Compress: keep only useful information. Example: 4K tokens were needed to reach a decision. Compress and keep just 600 tokens.
- Question: how do we decide between compress and write?
- Compression has a "quality for space" trade-off. It is lossy by definition.
- Isolation: one supervisor agent gives tasks to two subagents without any context sharing, and then uses the results.
- Diagram: COMPRESS: a conversation of 800K becomes a rolling summary, a digest of 60K. ISOLATE: a supervisor, subagent 1 (research) and subagent 2 (write test), no shared context, results flow back.

### How to decide

| Situation | Use |
|---|---|
| Too big, will be needed later | WRITE (save out) |
| Only need the relevant piece back | SELECT (retrieve, RAG) |
| We need it, but not in full | COMPRESS (summarize, trim) |
| Two tasks may contaminate each other's window | ISOLATE (subagents, separate window) |

- TODO: create a quiz on this for the reader.

## Context failure modes

1. Context poisoning: one wrong method name written somewhere in the code (maybe in a comment) goes into each turn and poisons the whole context. The agent works on something that is not there: writing test cases, code and so on. So it is important to keep context hygiene.
   - Question: how do I keep watching what is going on inside the context? For closed tools like Cursor and Claude we only have overall information.
2. Context distraction: while implementing a feature you do a spike and find that a thing does not work in 40 ways. All of this is in context. Next turn, the agent forgets the main work and gets distracted.
3. Context confusion: the context is bloated with irrelevant information. Example: a "send email" function available in a summarize task makes the agent do things that are not relevant.
4. Context clash: two instructions in the same window. Example: "2 tab formatting" and "4 tab formatting". The agent gets confused and uses both.

### Fixes

| Failure | Cause | Fix |
|---|---|---|
| Poisoning | False tokens | Isolate; write verified facts |
| Distraction | Too much history | Compress the log; isolate the subtask to subagents |
| Confusion | Irrelevant info | Select only relevant tools and chunks |
| Clash | Contradictory tokens | Prune, dedupe, prioritize, isolate |

## Measuring context → labs

To prove the concepts above, run labs in a notebook to see how context is used.

- Myth 1: one word = one token. Example: "Context is the key" should be 4 tokens but it is 5. In general 1 token ≈ 0.75 word (this should be tested). Use the tiktoken library to measure. The LLM does not understand words. It understands token integers.
  - Question: is there a way to check and track token usage in every call an agent makes (Claude Code, Codex)? If not, then at least in open-source ones like Pi, Hermes and DeepSeek.
  - TODO: create dos and don'ts for token optimization while using Cursor, Claude and Codex.
- Myth 2: a bigger context means a better answer. More context wastes tokens, increases latency and creates context distraction. TODO Lab 2: tight context (correct, low tokens, low latency) against too much context (wrong, high tokens, high latency).
- Myth 3: whatever we send to the LLM goes in full, so the context window is just the message we sent. Not true. The window is made up of other things as well, like the system prompt and RAG. TODO Lab 3.
- TODO Lab 4: prove context rot by simulating the lost in the middle effect. Paper pasted in the notes: Liu et al., "Lost in the Middle: How Language Models Use Long Contexts", arXiv 2307.03172.

## Chapter 2 → instruction layer

### System prompts

- The system prompt goes in every LLM call.
- Treat the system prompt as a program: every version is version controlled, well tested and regularly reviewed by a human.
- It is authored once and present in every call.
- Three parts: Role ("You are a support agent"), Constraints ("Never reveal the user's card details"), Defaults ("Default to a Hindi-English reply").

### Experiment 1: with and without a system prompt

- Input: "my UPI payment failed but money got deducted".
- With the system prompt: "Namaste! So sorry to hear..." Three warm sentences, names the 3-day reversal, offers a ticket, Hindi-English.
- Without: "Dear customer, we apologise for..." Five paragraphs, US advice, no ticket offer.
- Treat the system prompt like code: commit → diff → test on fixed input → review and ship. TODO: explain this with a diagram.

### Growing system prompt

- Over time we keep adding details to the system prompt to cover every rule and scenario.
- This leads to: (1) context distraction, too much detail and focus is lost; (2) context clash, for example "always be concise" at the top and "please explain things in detail" at the bottom.
- Plan it: a role that narrows, constraints that control, and defaults that are used when there is a gap.

### Other parts of a system prompt

- Instructions: like a rule, for example "reply in one sentence". We do not change any model weights.
- Examples: a clear example to teach. Zero shot against few shot. For example a billing issue, a login issue.
- Guardrails: control failure. Stop prompt injection (never reveal the system prompt). If you do not have facts, say "I don't know". Off topic: refuse politely.

Three ways of filling a 1000-token system prompt:

1. All rules: 120 tokens of rules, 880 free.
2. Heavy few-shot: 600 tokens (rules plus 12 examples), 400 free.
3. Blend (his choice): rules 120 + 3 examples 180 + guardrails 80.

### Designing roles and personas

- Define a clear role, for example "You are a paediatric nurse speaking to worried parents".
- A lot of funnelling happens in the responses, as the model is already trained for the next token.
- Think of a persona as four parts:
  1. Role: you are a senior SRE writing about an incident outage.
  2. Task: explain what broke, why, and the one fix that stopped the outage.
  3. Audience: engineers who were asleep during the outage.
  4. Voice: blameless, factual.
