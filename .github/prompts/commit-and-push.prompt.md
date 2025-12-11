---
description: "Analyze changes, generate commit message, and push to feature branch"
tools: ['runCommands', 'getTerminalOutput']
input:
  branch-name:
    type: string
    description: "Name of the feature branch to commit and push to (e.g., 'feature/step-5-1')"
    required: true
---

# Commit and Push Changes

You are responsible for analyzing staged and unstaged changes, creating a meaningful commit message using conventional commit format, and pushing to the specified feature branch.

## Prerequisites Check

Before proceeding, verify:
1. The user has provided a branch name
2. There are changes to commit (run `git status` to check)

**If no branch name provided:**
```
⚠️ Branch name required!

Please provide a branch name for your changes.

Example: /commit-and-push feature/step-5-1

Suggested branch naming:
- feature/step-X-Y (for exercise steps)
- fix/description (for bug fixes)
- refactor/description (for code improvements)
```

## Workflow

### 1. Check Current Git Status

```bash
# See what's changed
git status

# View detailed diff
git diff
```

Analyze the changes to understand:
- What files were modified
- What functionality was added or changed
- What bugs were fixed
- What tests were added

### 2. Determine Branch Strategy

```bash
# Check current branch
git branch --show-current

# Check if target branch exists locally
git branch --list | grep {branch-name}

# Check if target branch exists remotely
git branch -r | grep {branch-name}
```

**If branch exists locally:**
```bash
git checkout {branch-name}
```

**If branch exists remotely but not locally:**
```bash
git checkout -b {branch-name} origin/{branch-name}
```

**If branch doesn't exist:**
```bash
git checkout -b {branch-name}
```

**CRITICAL**: NEVER commit directly to `main`. Always use the user-provided branch name.

### 3. Generate Conventional Commit Message

Based on the changes analyzed, create a commit message following conventional commit format:

**Format:**
```
<type>: <description>

[optional body]

[optional footer]
```

**Types (from project instructions):**
- `feat:` - New features
- `fix:` - Bug fixes
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks
- `docs:` - Documentation changes
- `refactor:` - Code refactoring without behavior changes
- `style:` - Code formatting (not functional changes)

**Examples:**
```
feat: implement POST /api/todos endpoint

- Add endpoint to create new todos
- Auto-generate unique IDs
- Validate title is present and non-empty
- Return 201 with created todo object

Tests: All POST endpoint tests passing (5/5)
```

```
fix: correct toggle functionality to properly toggle state

- Change todo.completed = true to todo.completed = !todo.completed
- Fixes bug where completed todos couldn't be marked incomplete

Tests: Toggle tests now passing
```

```
test: add comprehensive tests for DELETE endpoint

- Test successful deletion
- Test 404 when todo not found
- Test deletion actually removes from array
```

**Commit message should:**
- Use the appropriate type based on changes
- Have clear, concise description in imperative mood
- Include bullet points in body if multiple changes
- Reference test results if applicable
- Be specific about what was changed and why

### 4. Stage All Changes

```bash
# Stage all modified and new files
git add .

# Verify what's staged
git status
```

### 5. Commit with Generated Message

```bash
git commit -m "<generated commit message>"
```

**If commit message is multi-line**, use:
```bash
git commit -m "type: description" -m "
- Detail 1
- Detail 2
- Detail 3

Tests: status
"
```

### 6. Push to Feature Branch

```bash
# Push to the specified branch
git push origin {branch-name}

# If this is the first push to a new branch
git push -u origin {branch-name}
```

**VERIFICATION**: Confirm push was successful:
```bash
# Verify branch exists remotely
git ls-remote --heads origin {branch-name}
```

### 7. Summary Output

After successful push, provide:

```
✅ Changes committed and pushed successfully!

Branch: {branch-name}
Commit: <commit-hash>
Message: <commit message>

Files changed:
- <file1>
- <file2>
- <file3>

Remote branch: origin/{branch-name}

Next steps:
- View your changes: git log -1 --stat
- Create a pull request on GitHub
- Continue to next exercise step
```

## Error Handling

### No Changes to Commit

If `git status` shows no changes:
```
⚠️ No changes to commit!

Current status: Working tree clean

Have you:
- Completed the step implementation?
- Saved all files?
- Made any code changes?

Run /execute-step first to implement changes.
```

### Attempting to Commit to Main

If user tries to use `main` as branch name:
```
❌ Cannot commit directly to main branch!

Please use a feature branch instead:
- feature/step-X-Y (for exercise steps)
- fix/description (for bug fixes)
- refactor/description (for improvements)

Example: /commit-and-push feature/step-5-1
```

### Merge Conflicts

If there are merge conflicts:
```
⚠️ Merge conflicts detected!

Files with conflicts:
- <file1>
- <file2>

Resolve conflicts manually:
1. Open each file and resolve conflict markers
2. Stage resolved files: git add <file>
3. Run /commit-and-push again
```

## Reference Information

Conventional commit format is documented in:
- `.github/copilot-instructions.md` - Git Workflow section
- Examples of proper commit messages
- Branch naming conventions

## Best Practices

1. **Descriptive Commits**: Commit message should clearly explain what changed and why
2. **Atomic Commits**: Each commit should represent one logical change
3. **Test Status**: Include test results in commit message when relevant
4. **Feature Branches**: Always use feature branches, never commit to main
5. **Push Frequently**: Push after each logical step completion

Remember: Your job is to analyze changes, create a meaningful commit message using conventional format, and safely push to the specified feature branch. You are the gatekeeper ensuring clean git history.
