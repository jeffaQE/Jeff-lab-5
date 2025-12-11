const app = require('./app');

const PORT = process.env.PORT || 3001;

// INTENTIONAL ISSUE: Missing error handling for server startup
app.listen(PORT, () => {
  // Server is now listening on the specified port
  // In production, use a proper logging library like winston or pino
  if (process.env.NODE_ENV !== 'test') {
    // eslint-disable-next-line no-console
    console.log(`Server running on port ${PORT}`);
  }
});
