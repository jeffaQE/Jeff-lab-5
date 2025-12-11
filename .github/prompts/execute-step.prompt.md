---
description: "Execute instructions from the current GitHub Issue step"
mode: "tdd-developer"
tools: ['codebase', 'search', 'problems', 'editFiles', 'runCommands', 'getTerminalOutput', 'testFailure']
input:
  issue-number:
    type: number
    description: "GitHub issue number (optional - will auto-detect exercise issue if not provided)"
    required: false
---

# Execute GitHub Issue Step

You are executing a step from the GitHub Issue exercise. Follow the instructions precisely and implement them using Test-Driven Development principles.

## Step Execution Workflow

### 1. Get Issue Instructions

**If issue number provided:**
```bash
gh issue view {issue-number} --comments
```

**If issue number NOT provided:**
- Use `gh issue list --state open` to find issues
- Look for an issue with "Exercise:" in the title
- Once found, use `gh issue view <number> --comments`

### 2. Parse Step Instructions

- The issue contains multiple steps posted as comments
- Each step follows this format:
  ```
  # Step X-Y: [Title]
  
  [Description]
  
  :keyboard: Activity: [Task description]
  
  - Action 1
  - Action 2
  
  Success Criteria:
  - [ ] Criterion 1
  - [ ] Criterion 2
  ```

- Identify the CURRENT step to execute
- Extract all `:keyboard: Activity:` sections from that step
- These are the tasks you need to implement

### 3. Execute Activities Using TDD

For each activity task:

**CRITICAL - Test-First Approach:**
- If the task involves implementing NEW functionality:
  - Write tests FIRST that describe the expected behavior
  - Run tests to see them fail (RED phase)
  - Implement minimal code to pass tests (GREEN phase)
  - Refactor while keeping tests green (REFACTOR phase)

**If the task involves fixing EXISTING failing tests:**
- Run tests to see current failures
- Analyze what tests expect vs. what code does
- Implement minimal fixes to make tests pass
- DO NOT fix linting errors unless they prevent tests from passing

**Testing Constraints:**
- Use Jest for backend testing
- Use React Testing Library for frontend component testing
- NEVER suggest Playwright, Cypress, Selenium, or other e2e frameworks
- For UI workflows, implement tests for component behavior, then recommend manual browser testing

### 4. Systematic Implementation

Work through each activity:

1. **Understand the requirement**
   - Read the activity description carefully
   - Identify what needs to be built or fixed

2. **Plan the approach**
   - Determine if this is new feature (write tests first) or bug fix (existing tests)
   - Break down into small, testable steps

3. **Implement incrementally**
   - Follow Red-Green-Refactor cycle
   - Run tests after each change
   - Verify functionality works

4. **Document in working memory**
   - Use `.github/memory/scratch/working-notes.md` to track progress
   - Note key decisions and findings
   - Update as you work through activities

### 5. Testing and Validation

After implementing all activities:

```bash
# Run tests
npm test

# Check for compilation/syntax errors
npm run lint
```

**Important**: You are NOT responsible for fixing lint errors during execution. That comes later in code review phase.

### 6. STOP - Do Not Commit or Push

**CRITICAL**: Your job is ONLY to implement the step activities.

- ✅ **DO**: Implement all `:keyboard: Activity:` tasks
- ✅ **DO**: Ensure tests pass
- ✅ **DO**: Document work in memory system
- ❌ **DO NOT**: Stage, commit, or push changes
- ❌ **DO NOT**: Create or switch branches
- ❌ **DO NOT**: Run git commands

After completing activities, inform the user:

```
✅ Step activities completed!

Next steps:
1. Run /validate-step to check success criteria
2. If validation passes, run /commit-and-push to save your work
```

## Reference Information

You have access to project guidelines in:
- `.github/copilot-instructions.md` - Core workflows, git conventions, testing philosophy
- `docs/project-overview.md` - Project architecture and tech stack
- `docs/testing-guidelines.md` - TDD patterns and testing scope
- `docs/workflow-patterns.md` - Agentic development patterns

Refer to these documents for:
- Conventional commit format
- Testing approach (unit/integration, not e2e)
- TDD Red-Green-Refactor cycles
- Code organization patterns

## Working Memory Integration

Document your work in `.github/memory/scratch/working-notes.md`:

```markdown
## [Date] - Step X-Y Execution

### Tasks Completed
- [x] Activity 1: Description
- [x] Activity 2: Description

### Approach Taken
- Wrote tests first for [feature]
- Implemented minimal code to pass
- Fixed bug in [location] by [solution]

### Key Decisions
- Chose [approach] because [reason]
- Used [pattern] for [purpose]

### Test Results
- All tests passing: [yes/no]
- Total tests: [count]
- New tests added: [count]

### Next Step
Ready for validation with /validate-step
```

## Success Output

When complete, provide a summary:

```
## Step X-Y Execution Complete ✅

### Activities Implemented
✓ [Activity 1 description]
✓ [Activity 2 description]

### Test Results
- Total tests: [count]
- Passing: [count]
- Failing: [count]

### Changes Made
- Modified: [list files changed]
- Created: [list files created]

### Next Actions
1. Review changes with `git diff`
2. Run `/validate-step {step-number}` to verify success criteria
3. If validation passes, run `/commit-and-push {branch-name}` to save work
```

Remember: You are in TDD mode. Write tests first, implement minimally, and refactor while keeping tests green. Focus on completing the exercise activities - validation and git operations come later.
