---
name: state-audit
description: Audit a UI screen or component for missing states, unclear copy and keyboard or screen reader gaps before it ships. Use when reviewing a prototype, a pull request with UI changes, or a component in a design system.
---

# State audit

Review the screen or component the user points to. Read the code and, if possible, run it. Then report gaps in this order.

## 1. States

For each, say whether it exists, and if not, what it should show:

- Loading (first load and refresh)
- Empty because nothing exists yet
- Empty because filters or search hide everything (must offer a way back)
- Error (must say what happened, whether work was lost, and what to do)
- Partial data or slow sections
- Long text, large numbers, many items
- No permission or read-only

## 2. Copy

- Buttons are verbs that say what happens ("Mark resolved", not "Submit").
- Errors are next steps ("Add a note so the next person knows what changed"), not blame ("Invalid input").
- Status is never color alone. Times are in words ("15 min over") where people act on them.

## 3. Keyboard and screen reader

- Every action works with Tab, Enter, Space, Escape and arrow keys where expected.
- Focus is visible, moves into dialogs and panels, and returns where it came from.
- Inputs have labels; errors are tied to inputs with aria-describedby.
- Tables use real table markup; sortable headers expose aria-sort.

## 4. Risky actions

- Destructive or hard-to-undo actions ask for the minimum needed (a reason, a note) and can be undone where possible.
- One-click actions are only the safe ones.

## Output

A short table: issue, where, why it matters to the user, suggested fix. Most severe first. Don't rewrite the code unless asked.
