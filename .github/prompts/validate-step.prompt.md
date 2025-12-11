---
description: "Validate that all success criteria for the current step are met"
mode: "code-reviewer"
tools: ['codebase', 'problems', 'runCommands', 'getTerminalOutput']
input:
  step-number:
    type: string
    description: "Step number to validate (e.g., '5-0', '5-1', '5-2')"
    required: true
---

# Validate Exercise Step

You are validating that all success criteria for a specific exercise step have been met. Perform systematic checks and provide clear pass/fail status with actionable guidance.

## Prerequisites

User must provide the step number (e.g., "5-0", "5-1", "5-2").

**If step number not provided:**
```
⚠️ Step number required!

Please specify which step to validate.

Usage: /validate-step 5-1

Common step numbers:
- 5-0 (Initial setup)
- 5-1 (TDD implementation)
- 5-2 (Code quality)
- etc.
```

## Validation Workflow

### 1. Get Exercise Issue

```bash
# List open issues
gh issue list --state open

# Look for issue with "Exercise:" in title
# Get full issue with comments
gh issue view <issue-number> --comments
```

### 2. Find Target Step

Search through the issue content for:
```
# Step {step-number}: [Title]
```

For example, if validating step "5-1", search for:
```
# Step 5-1: [Title]
```

**The step may be in:**
- The main issue body
- One of the issue comments

### 3. Extract Success Criteria

Locate the "Success Criteria" section within that step:

```
Success Criteria:
- [ ] Criterion 1
- [ ] Criterion 2
- [ ] Criterion 3
```

Extract all criteria checkboxes from this section.

### 4. Validate Each Criterion

For each success criterion, perform appropriate checks:

#### Test-Related Criteria

```
- [ ] All backend tests pass
```

**Check:**
```bash
cd packages/backend
npm test
```

**Validation:**
- All tests must pass (no failures)
- No test errors
- Exit code 0

---

```
- [ ] All frontend tests pass
```

**Check:**
```bash
cd packages/frontend
npm test -- --watchAll=false
```

**Validation:**
- All tests must pass
- No failing test suites
- Exit code 0

---

#### Linting Criteria

```
- [ ] No ESLint errors in backend
```

**Check:**
```bash
cd packages/backend
npm run lint
```

**Validation:**
- Zero errors
- Warnings are acceptable unless criteria specifies "no warnings"
- Exit code 0

---

```
- [ ] No ESLint errors in frontend
```

**Check:**
```bash
cd packages/frontend
npm run lint
```

**Validation:**
- Zero errors
- Check for specific issues if mentioned
- Exit code 0

---

#### File Existence Criteria

```
- [ ] File X exists at location Y
```

**Check:**
Use file system tools to verify file exists at specified path

**Validation:**
- File exists
- File is not empty
- File contains expected content (if specified)

---

#### Implementation Criteria

```
- [ ] Feature X is implemented
```

**Check:**
- Search codebase for relevant implementation
- Verify functionality exists
- Check related tests pass

**Validation:**
- Code exists in expected location
- Functionality works as described
- Tests validate the feature

---

#### API Endpoint Criteria

```
- [ ] POST /api/todos endpoint implemented
```

**Check:**
1. Search for endpoint definition in backend code
2. Verify endpoint handler exists
3. Check related tests pass
4. Optionally test manually with curl

**Validation:**
- Endpoint defined in routes
- Handler function exists
- Tests for endpoint pass
- Returns expected status codes

---

### 5. Generate Validation Report

After checking all criteria, provide a comprehensive report:

```
## Step {step-number} Validation Report

### Success Criteria Status

✅ Criterion 1: [Description]
   - Check performed: [what was checked]
   - Result: PASS

❌ Criterion 2: [Description]
   - Check performed: [what was checked]
   - Result: FAIL
   - Issue: [specific problem]
   - Fix: [how to resolve]

✅ Criterion 3: [Description]
   - Check performed: [what was checked]
   - Result: PASS

### Overall Status

[X/Y] criteria met

[PASS ✅ | FAIL ❌]

### Next Actions

[If all pass:]
✅ All success criteria met! You may proceed.

Next steps:
1. Run /commit-and-push {branch-name} to save your work
2. Create a pull request on GitHub
3. Continue to next step

[If some fail:]
❌ Some criteria not met. Address the following:

1. [Specific action needed for failed criterion 1]
2. [Specific action needed for failed criterion 2]

After fixing:
- Re-run /validate-step {step-number}
- Once passing, run /commit-and-push {branch-name}
```

## Specific Validation Examples

### Testing Validation

```bash
# Backend tests
cd packages/backend && npm test

# Expected output: All tests passed
# Validation: ✅ if exit code 0, ❌ if any failures
```

### Linting Validation

```bash
# Backend lint
cd packages/backend && npm run lint

# Expected output: ✓ 0 errors, X warnings
# Validation: ✅ if 0 errors, ❌ if any errors
# Note: Warnings may be acceptable depending on criteria
```

### Feature Implementation Validation

For "DELETE endpoint implemented":

1. Check code exists:
   ```bash
   grep -r "app.delete.*todos/:id" packages/backend/src/
   ```

2. Verify tests pass:
   ```bash
   npm test -- --testNamePattern="DELETE"
   ```

3. Status:
   - ✅ If endpoint exists AND tests pass
   - ❌ If endpoint missing OR tests fail

### Code Quality Validation

For "No console.log statements in production code":

```bash
# Search for console.log
grep -r "console.log" packages/backend/src/ --exclude="*.test.js"
```

Validation:
- ✅ If no matches (or only in allowed locations)
- ❌ If console.log found in source files

## Error Handling

### Step Not Found

If the specified step doesn't exist in the issue:

```
❌ Step {step-number} not found!

Searched in issue #X but couldn't locate:
# Step {step-number}: 

Available steps:
- Step 5-0: [Title]
- Step 5-1: [Title]
- Step 5-2: [Title]

Please verify the step number and try again.
```

### No Success Criteria

If step exists but has no success criteria section:

```
⚠️ No success criteria found for Step {step-number}

The step exists but doesn't have a "Success Criteria" section.
Unable to perform validation.

Please check the issue for updates or contact instructor.
```

### Validation Commands Fail

If validation commands fail to run:

```
⚠️ Validation check failed to execute

Command: {command}
Error: {error message}

Possible causes:
- Dependencies not installed (run `npm install`)
- Wrong directory
- Command not available

Please resolve and try validation again.
```

## Working Memory Integration

Document validation results in `.github/memory/scratch/working-notes.md`:

```markdown
## [Date] - Step {step-number} Validation

### Validation Results
- Total criteria: [count]
- Passed: [count]
- Failed: [count]

### Failed Criteria
1. [Criterion description]
   - Issue: [specific problem]
   - Action: [what needs to be done]

### Next Steps
[If passed:] Ready for commit and push
[If failed:] Fixing issues above, will re-validate
```

## Reference Information

Validation standards are documented in:
- `docs/testing-guidelines.md` - What constitutes passing tests
- `.github/copilot-instructions.md` - Quality standards
- `docs/project-overview.md` - Success criteria expectations

## Best Practices

1. **Thorough Checking**: Don't just check if tests pass, verify WHY they pass
2. **Clear Feedback**: Provide specific, actionable guidance for failures
3. **Automated Where Possible**: Use command output over manual inspection
4. **Document Results**: Note validation outcomes in working memory
5. **Be Strict**: Criteria must be fully met, not "mostly" met

Remember: You are the gatekeeper ensuring quality. Be thorough, systematic, and clear in your validation reporting. The developer should know exactly what passed, what failed, and what to do next.
