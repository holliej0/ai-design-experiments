# AI-assisted design experiments

Notes on how I use AI coding agents in design work: what they're good at, where they go wrong, and how I check the output. Coding agents are part of how I prototype now, so I want the process to be as deliberate as any other part of my design practice.

## Experiment 1: a design system and a working prototype, built with a coding agent

**Result:** [relay-design-system](https://github.com/holliej0/relay-design-system) (tokens, 8 components, Storybook) and [ops-console-prototype](https://github.com/holliej0/ops-console-prototype) (a Next.js operations console built on it).

### The question

Can a coding agent take a designer's brief and produce a design system and prototype that hold up to the standard I'd expect from a design team, and what review does it take to get there?

### Setup

- **Agent:** Claude, working in a terminal with file and browser access.
- **Stack:** Next.js, React, TypeScript, Storybook. No UI libraries, so every component decision is visible.
- **Brief:** fictional medical supply shipments, an operations dashboard for triaging exceptions, a two-layer token system with light and dark modes, WCAG 2.2 AA, and every state designed (loading, empty, no results, error). The template I use is in [prompts/design-brief.md](prompts/design-brief.md).

### What the agent produced

- A token pipeline: one JSON source, generated CSS variables and TypeScript, and a contrast checker that fails the build if any pairing drops below AA.
- Eight components with stories for each state, keyboard support and ARIA where native HTML wasn't enough.
- A working prototype: summary alert, stat tiles, a tabbed and filterable queue sorted by SLA, a chart that filters the queue, a detail panel with assign, resolve and escalate flows, validation, undo, and demo switches for loading, error and empty states.
- Screenshots of every state in light, dark and mobile.

### What review caught and changed

The first version ran, but it wasn't right yet. These are the issues found in review and what changed:

| Issue | Why it mattered | Change |
|---|---|---|
| Temperature excursions in the fake data could be marked "Low" severity | For cold-chain medical supplies that would never be low. Unrealistic data hides real design problems. | Data rule changed: excursions are always High or Critical. |
| A state update had a side effect inside it (the confirmation message was set inside the list update) | In React's development mode this can fire twice, showing duplicate messages | Split into two separate updates. |
| An unnecessary memo with a suppressed lint warning | Hid a dependency problem instead of fixing it | Removed the memo; the list is cheap to filter. |
| Keyboard handling in Tabs indexed an object with any string | Fails TypeScript's strict mode, so the build would break | Typed the key map explicitly. |
| Design system CSS imported from a component outside the app folder | Next.js only allows global CSS from the root layout | Moved the imports to the layout. |
| A deprecated Storybook setting | Warnings now, breakage on the next major version | Removed; autodocs is enabled with tags instead. |

The pattern: the agent was strong on structure and coverage and weaker on **domain judgment** (what's realistic for this user) and on **framework rules that only show up at build time**. Those are exactly the things a designer who ships code needs to own.

### How the result was checked

- **Color contrast:** every text and UI pairing, both modes. All pass WCAG 2.2 AA. [Report](evaluation/contrast-report.txt).
- **Keyboard and focus, automated:** open a row with Enter, focus moves into the panel, empty submit shows a helpful error, Escape closes and returns focus, arrow keys move between tabs, no horizontal scroll on a phone, no runtime errors. All pass. [Script](evaluation/interaction-check.mjs) · [Report](evaluation/interaction-report.txt).
- **Visual review:** screenshots of every state in light, dark and mobile, reviewed side by side.
- **Types:** TypeScript in strict mode.

Not done yet: testing with real coordinators and with screen reader users. Automated checks catch a lot, but not whether the design is right.

### What I took away

- **The brief does most of the work.** Naming every state up front got me designed empty and error states instead of blank screens.
- **Ask the agent to list its guesses.** It turns hidden assumptions into a review list.
- **Make quality checks executable.** The contrast script and interaction checks mean the next change gets checked too, not just this one.
- **Review like a design lead, not a spell checker.** The useful corrections were about realism and user impact, not syntax.

## Experiment 2: a reusable "state audit" skill

Agents can follow written skills. I turned the review checklist I kept repeating into one: [skills/state-audit/SKILL.md](skills/state-audit/SKILL.md). It asks an agent to audit a screen for missing states, unclear copy, keyboard and screen reader gaps, and risky actions, and to report them most severe first.

## Repo contents

```
prompts/design-brief.md          brief template for a coding agent
skills/state-audit/SKILL.md      reusable review skill for agents
evaluation/                      contrast and interaction checks, with results
```

Made by [Hollie Richmond](https://hollierichmond.com).
