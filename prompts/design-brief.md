# Design brief template for a coding agent

I give the agent a short brief before any code. A clear brief saves more time than any amount of fixing later.

```
Product and user
- Who uses this, in what situation, under what pressure?
- What is the one job this screen must do well?

Constraints
- Stack: (e.g. Next.js, React, TypeScript, Storybook)
- Use only these components / tokens: (link or list)
- Accessibility bar: WCAG 2.2 AA. Keyboard-only use must work. Status never relies on color alone.

States to design (all required)
- Loading, empty (nothing yet), empty (filters hide everything), error, partial data, long text, many items, no permission

Decisions I've already made (don't change without asking)
- e.g. queue is sorted by time left, not severity

Decisions I want options on
- e.g. how to show ownership in the table

Done means
- Runs locally with one command
- Screenshots of every state in light and dark
- A short list of anything you guessed at
```

The last line matters most. Asking the agent to list its guesses turns hidden assumptions into a review checklist.
