# Patterns Discovered

> **Purpose**: Document recurring code patterns and architectural decisions discovered during development. Reference these patterns when implementing similar functionality.

---

## Pattern Template

Use this template when documenting new patterns:

```markdown
## Pattern Name

**Context**: When and where this pattern applies

**Problem**: What issue or requirement this pattern addresses

**Solution**: How to implement the pattern

**Example**:
```javascript
// Code example showing the pattern in action
```

**Related Files**:
- [path/to/file.js](../../path/to/file.js)

**Notes**: Additional considerations, trade-offs, or gotchas

---
```

## Example Pattern

## Service Initialization - Array vs Null

**Context**: When initializing in-memory data stores in Express.js services

**Problem**: Uninitialized arrays cause "Cannot read property of undefined" errors when attempting to use array methods like `.filter()`, `.map()`, or `.find()`.

**Solution**: Always initialize arrays to empty array `[]` at module level, never leave them as `let todos;` without assignment.

**Example**:
```javascript
// ❌ BAD - Uninitialized (undefined)
let todos;

app.get('/api/todos', (req, res) => {
  res.json(todos); // Error: todos is undefined
});

// ✅ GOOD - Initialized to empty array
let todos = [];

app.get('/api/todos', (req, res) => {
  res.json(todos); // Returns []
});
```

**Related Files**:
- [packages/backend/src/app.js](../../packages/backend/src/app.js#L10) - Todos array initialization

**Notes**: 
- This pattern applies to any in-memory storage (users, sessions, cache, etc.)
- For production, use proper database initialization instead
- Empty arrays are safe for all array operations (filter, map, find return empty/undefined appropriately)
- Tests will fail if arrays are uninitialized, making this a good TDD checkpoint

---

## ID Generation for In-Memory Storage

**Context**: When creating new resources in an in-memory API without a database

**Problem**: Need unique IDs for resources but don't have database auto-increment

**Solution**: Use a module-level counter that increments with each new resource

**Example**:
```javascript
let todos = [];
let nextId = 1;

app.post('/api/todos', (req, res) => {
  const newTodo = {
    id: nextId++,
    title: req.body.title,
    completed: false,
    createdAt: new Date().toISOString()
  };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});
```

**Related Files**:
- [packages/backend/src/app.js](../../packages/backend/src/app.js) - ID counter implementation

**Notes**:
- IDs reset when server restarts (acceptable for development)
- For production, use database-generated IDs or UUIDs
- Counter approach is simpler than UUID library for learning projects
- Consider starting at 1 instead of 0 for more intuitive IDs

---
