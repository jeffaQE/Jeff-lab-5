---
description: "Global instructions for GitHub Copilot when working on this TODO application"
---

# TODO Application - Development Instructions

## Project Context

This is a full-stack TODO application with:
- **Frontend**: React-based UI for managing tasks
- **Backend**: Express.js REST API with in-memory data storage
- **Development Philosophy**: Iterative, feedback-driven development with emphasis on testing
- **Current Phase**: Backend stabilization and frontend feature completion

## Documentation References

Consult these documentation files to understand the project:

- [docs/project-overview.md](../docs/project-overview.md) - Architecture, tech stack, and project structure
- [docs/testing-guidelines.md](../docs/testing-guidelines.md) - Test patterns and standards
- [docs/workflow-patterns.md](../docs/workflow-patterns.md) - Development workflow guidance

Always reference these documents when working on features, tests, or debugging issues.

## Development Principles

Follow these core principles for all development work:

1. **Test-Driven Development (TDD)**: Follow the Red-Green-Refactor cycle
   - Write failing tests first (RED)
   - Implement minimal code to pass (GREEN)
   - Refactor for quality (REFACTOR)

2. **Incremental Changes**: Make small, testable modifications
   - One feature or fix at a time
   - Each change should be independently verifiable
   - Avoid large, multi-purpose commits

3. **Systematic Debugging**: Use test failures as guides
   - Read error messages carefully
   - Identify root cause before implementing fixes
   - Add tests to prevent regression

4. **Validation Before Commit**: Ensure code quality
   - All tests must pass
   - No lint errors or warnings
   - Manual verification for UI changes

## Testing Scope

This project uses **unit tests and integration tests ONLY**.

### Testing Stack

- **Backend**: Jest + Supertest for API endpoint testing
- **Frontend**: React Testing Library for component unit/integration tests
- **UI Verification**: Manual browser testing for full user flows

### Important Testing Constraints

**DO NOT suggest or implement**:
- End-to-end (e2e) test frameworks (Playwright, Cypress, Selenium)
- Browser automation tools
- Full-stack integration test frameworks

**Reason**: This lab focuses on unit and integration testing patterns. E2E testing adds unnecessary complexity and is out of scope.

### Testing Approach by Context

- **Backend API Changes**:
  - Write Jest tests FIRST using Supertest for HTTP assertions
  - Run tests and verify they fail (RED)
  - Implement the feature to make tests pass (GREEN)
  - Refactor as needed (REFACTOR)

- **Frontend Component Features**:
  - Write React Testing Library tests FIRST for component behavior
  - Run tests and verify they fail (RED)
  - Implement the component logic to pass tests (GREEN)
  - Refactor for code quality (REFACTOR)
  - Follow up with manual browser testing for full UI flows and visual verification

This is **true TDD**: Test first, then code to pass the test.

## Workflow Patterns

Follow these standard workflows for different types of development tasks:

### 1. TDD Workflow (Red-Green-Refactor)

```
Write/fix tests → Run tests → Fail (RED) → Implement code → Pass (GREEN) → Refactor
```

- Start with a failing test that defines the expected behavior
- Write the minimal code needed to pass the test
- Refactor while keeping tests green
- Repeat for each new feature or behavior

### 2. Code Quality Workflow

```
Run lint → Categorize issues → Fix systematically → Re-validate
```

- Run linter to identify all issues
- Group issues by type (formatting, unused vars, etc.)
- Fix one category at a time
- Re-run linter after each batch of fixes
- Verify all tests still pass

### 3. Integration Workflow

```
Identify issue → Debug → Test → Fix → Verify end-to-end
```

- Reproduce the issue consistently
- Write tests that expose the bug
- Implement the fix
- Verify tests pass
- Test the complete user flow manually

## Chat Mode Usage

Use specialized chat modes for specific workflows:

### `tdd-developer` Mode

Use for:
- Writing new tests
- Following Red-Green-Refactor cycles
- Test debugging and troubleshooting
- Implementing features using TDD approach

### `code-reviewer` Mode

Use for:
- Addressing lint errors and warnings
- Code quality improvements
- Reviewing code for best practices
- Systematic refactoring

Switch modes based on the task at hand to get specialized guidance.

## Memory System

This project uses a two-tier memory system to capture and apply development knowledge:

### Persistent Memory (This File)
- **What**: Foundational principles and core workflows that rarely change
- **Where**: `.github/copilot-instructions.md` (this file)
- **Examples**: TDD workflow, testing philosophy, git conventions

### Working Memory (Discovery Documentation)
- **What**: Session-specific discoveries, patterns, and active development notes
- **Where**: `.github/memory/` directory
- **Examples**: Bug fixes, implementation patterns, debugging insights

### Memory Files and Usage

1. **session-notes.md** (Committed)
   - Historical summaries of completed development sessions
   - Update at end of each significant session
   - Reference when continuing previous work

2. **patterns-discovered.md** (Committed)
   - Recurring code patterns and architectural decisions
   - Update when you discover reusable solutions
   - Reference when implementing similar functionality

3. **scratch/working-notes.md** (NOT Committed)
   - Real-time notes during active development
   - Update continuously during work
   - Transfer key insights to committed files at session end

### When to Use Working Memory

- **During TDD cycles**: Note test failures, implementation approaches, refactoring decisions
- **During linting**: Track error categories and systematic fix approaches
- **During debugging**: Document reproduction steps, hypotheses, solutions attempted
- **During integration**: Note unexpected behaviors and manual test results

### How AI Applies This Memory

When providing suggestions, Copilot references:
- Established patterns from `patterns-discovered.md` for consistent implementations
- Historical context from `session-notes.md` to understand previous decisions
- Active context from `scratch/working-notes.md` for current debugging sessions

**Learn more**: See [.github/memory/README.md](memory/README.md) for comprehensive documentation on the memory system.

## Workflow Utilities

### GitHub CLI Commands

Use GitHub CLI for workflow automation (available in all chat modes):

**List open issues**:
```bash
gh issue list --state open
```

**Get issue details**:
```bash
gh issue view <issue-number>
```

**Get issue with comments**:
```bash
gh issue view <issue-number> --comments
```

### Issue Structure

- The main exercise issue will have **"Exercise:"** in the title
- Individual steps are posted as **comments** on the main issue
- Use these commands when `/execute-step` or `/validate-step` prompts are invoked

## Git Workflow

### Conventional Commits

Use conventional commit format for all commits:

- `feat:` - New features
- `fix:` - Bug fixes
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks
- `docs:` - Documentation changes
- `refactor:` - Code refactoring without behavior changes
- `style:` - Code formatting (not functional changes)

**Examples**:
```bash
git commit -m "feat: add delete button to todo items"
git commit -m "fix: resolve duplicate key warning in TodoList"
git commit -m "test: add tests for todo deletion"
```

### Branch Strategy

- **Main branch**: `main` - stable code only
- **Feature branches**: `feature/<descriptive-name>`
  - Example: `feature/add-delete-todos`
  - Example: `feature/fix-lint-errors`

### Git Best Practices

1. **Always stage all changes** before committing:
   ```bash
   git add .
   ```

2. **Push to the correct branch**:
   ```bash
   git push origin <branch-name>
   ```

3. **Create feature branches** for new work:
   ```bash
   git checkout -b feature/your-feature-name
   ```

4. **Keep commits focused** - one logical change per commit

5. **Write descriptive commit messages** that explain what and why
