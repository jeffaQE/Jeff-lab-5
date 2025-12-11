# Working Memory System

## Purpose

This directory contains **working memory** for the development process - a system for tracking patterns, decisions, and lessons learned during iterative development. Unlike the foundational principles in `.github/copilot-instructions.md` (persistent memory), this directory captures evolving discoveries and context-specific insights.

## Memory Types

### Persistent Memory (`.github/copilot-instructions.md`)
- **What**: Foundational principles, core workflows, and established standards
- **When to update**: Rarely - only when fundamental project patterns change
- **Examples**: TDD workflow, testing philosophy, git commit conventions

### Working Memory (`.github/memory/`)
- **What**: Session-specific discoveries, emerging patterns, and active notes
- **When to update**: Frequently - during and after each development session
- **Examples**: Bug fixes, edge cases discovered, implementation decisions

## Directory Structure

```
.github/memory/
├── README.md                      # This file - explains the system
├── session-notes.md               # Historical summaries of completed sessions (committed)
├── patterns-discovered.md         # Accumulated code patterns and learnings (committed)
└── scratch/
    ├── .gitignore                 # Ignores all scratch files
    └── working-notes.md           # Active session notes (NOT committed)
```

## File Purposes

### `session-notes.md` (Committed Historical Record)
**Purpose**: Document completed development sessions for future reference

**Use when**:
- Finishing a development session
- Completing a major feature or bug fix
- Wrapping up a multi-step workflow

**Contents**:
- Summary of what was accomplished
- Key findings and decisions
- Technical outcomes and test results
- Links to relevant commits or files

**Update frequency**: At the end of each significant development session

### `patterns-discovered.md` (Committed Knowledge Base)
**Purpose**: Document recurring code patterns and architectural decisions

**Use when**:
- You discover a reusable solution pattern
- You encounter a common pitfall and find the fix
- You establish a new convention for the codebase
- You learn a framework-specific best practice

**Contents**:
- Pattern name and context
- Problem it solves
- Solution with code examples
- Related files and references

**Update frequency**: Whenever you discover or solidify a new pattern

### `scratch/working-notes.md` (Active Session - NOT Committed)
**Purpose**: Real-time notes during active development work

**Use when**:
- Starting a new development task
- Debugging complex issues
- Working through TDD cycles
- Exploring solutions

**Contents**:
- Current task and approach
- Findings as you discover them
- Decisions made and reasoning
- Blockers and next steps

**Update frequency**: Continuously during active development

**Important**: This file is in `.gitignore` - it's ephemeral. At session end, transfer key insights to `session-notes.md` or `patterns-discovered.md`.

## Workflow Integration

### TDD Workflow (Red-Green-Refactor)

**During "Red" Phase** (Writing/Running Failing Tests):
- Use `scratch/working-notes.md` to note which tests are failing and why
- Document test expectations vs. actual behavior

**During "Green" Phase** (Implementing to Pass):
- Note implementation approaches tried in `scratch/working-notes.md`
- Record decisions about minimal vs. complete implementations

**During "Refactor" Phase** (Improving Code):
- Document patterns discovered in `patterns-discovered.md`
- Note any architectural decisions

**After TDD Cycle Completes**:
- Summarize the feature/fix in `session-notes.md`
- Extract reusable patterns to `patterns-discovered.md`

### Linting and Code Quality Workflow

**While Fixing Lint Errors**:
- Use `scratch/working-notes.md` to track error categories
- Note systematic fix approaches

**After Achieving Clean Code**:
- Document any project-specific linting patterns in `patterns-discovered.md`
- Add summary to `session-notes.md` if significant

### Debugging Workflow

**During Investigation**:
- Use `scratch/working-notes.md` to document:
  - Reproduction steps
  - Hypothesis about root cause
  - Tests or logs examined
  - Solutions attempted

**After Resolution**:
- Document the bug and fix in `session-notes.md`
- If the issue reveals a pattern, add to `patterns-discovered.md`

### Integration Testing Workflow

**While Testing UI/API**:
- Note unexpected behaviors in `scratch/working-notes.md`
- Document manual test steps and results

**After Integration Complete**:
- Summarize integration outcomes in `session-notes.md`
- Extract integration patterns to `patterns-discovered.md`

## How AI Uses This Memory

When you work with GitHub Copilot:

1. **Context-Aware Suggestions**: Copilot can reference patterns in `patterns-discovered.md` to provide solutions consistent with your established approaches

2. **Historical Context**: `session-notes.md` helps Copilot understand previous decisions and avoid repeating mistakes

3. **Active Context**: You can share `scratch/working-notes.md` content to give Copilot full context of your current debugging session

4. **Pattern Application**: Copilot can apply documented patterns to new similar problems

**Example Prompt**:
```
"I'm implementing a new service endpoint. Check .github/memory/patterns-discovered.md 
for our service initialization pattern and apply it here."
```

## Best Practices

### Do ✅
- Keep `scratch/working-notes.md` updated in real-time during active work
- Transfer important discoveries to committed files at session end
- Use specific pattern names for easy reference
- Link to actual file locations and line numbers
- Include code examples in pattern documentation
- Date all session summaries

### Don't ❌
- Don't commit `scratch/` directory contents (handled by `.gitignore`)
- Don't let `scratch/working-notes.md` accumulate without transferring insights
- Don't document everything - focus on non-obvious patterns and decisions
- Don't duplicate information already in `.github/copilot-instructions.md`
- Don't write patterns for one-off solutions - focus on recurring themes

## Example Session Flow

1. **Start Session**: Open `scratch/working-notes.md`, note current task
2. **Active Work**: Document findings, decisions, blockers as you work
3. **Discovery**: When you find a useful pattern, note it in scratch
4. **End Session**: 
   - Review `scratch/working-notes.md`
   - Add session summary to `session-notes.md`
   - Add any patterns to `patterns-discovered.md`
   - Clear or archive `scratch/working-notes.md` for next session

## When to Reference These Files

### Reference `session-notes.md` when:
- Continuing work from a previous session
- Investigating why a decision was made
- Onboarding team members to recent changes

### Reference `patterns-discovered.md` when:
- Implementing similar functionality to something done before
- Reviewing code for consistency
- Teaching patterns to AI or developers

### Reference `scratch/working-notes.md` when:
- Resuming interrupted work
- Context-switching back to a task
- Providing full debugging context to AI

## Summary

This memory system creates a **feedback loop** for learning:
- **Capture** insights in scratch notes during work
- **Organize** learnings into committed documentation
- **Apply** patterns to future work
- **Improve** development efficiency over time

The goal is not to document everything, but to **preserve and reuse valuable discoveries** that make future development faster and more consistent.
