import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from '../App';

// Create a test query client
const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

// Mock fetch for tests
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([]),
  })
);

beforeEach(() => {
  jest.clearAllMocks();
});

test('renders TODO App heading', async () => {
  const testQueryClient = createTestQueryClient();

  render(
    <QueryClientProvider client={testQueryClient}>
      <App />
    </QueryClientProvider>
  );

  const headingElement = await screen.findByText(/TODO App/i);
  expect(headingElement).toBeInTheDocument();
});

test('displays empty state message when no todos', async () => {
  global.fetch.mockImplementationOnce(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve([]),
    })
  );

  const testQueryClient = createTestQueryClient();

  render(
    <QueryClientProvider client={testQueryClient}>
      <App />
    </QueryClientProvider>
  );

  await waitFor(() => {
    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
  });

  const emptyMessage = screen.getByText(/no todos yet/i);
  expect(emptyMessage).toBeInTheDocument();
});

test('calculates and displays correct stats', async () => {
  const mockTodos = [
    { id: 1, title: 'Test todo 1', completed: false },
    { id: 2, title: 'Test todo 2', completed: true },
    { id: 3, title: 'Test todo 3', completed: false },
  ];

  global.fetch.mockImplementationOnce(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve(mockTodos),
    })
  );

  const testQueryClient = createTestQueryClient();

  render(
    <QueryClientProvider client={testQueryClient}>
      <App />
    </QueryClientProvider>
  );

  await waitFor(() => {
    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
  });

  // Should show 2 items left (incomplete)
  expect(screen.getByText(/2 items left/i)).toBeInTheDocument();
  // Should show 1 completed
  expect(screen.getByText(/1 completed/i)).toBeInTheDocument();
});

test('delete functionality calls API correctly', async () => {
  const mockTodos = [
    { id: 1, title: 'Test todo', completed: false },
  ];

  global.fetch
    .mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockTodos),
      })
    )
    .mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}),
      })
    );

  const testQueryClient = createTestQueryClient();

  render(
    <QueryClientProvider client={testQueryClient}>
      <App />
    </QueryClientProvider>
  );

  await waitFor(() => {
    expect(screen.getByText('Test todo')).toBeInTheDocument();
  });

  const deleteButton = screen.getByRole('button', { name: /delete/i });
  fireEvent.click(deleteButton);

  await waitFor(() => {
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/1'),
      expect.objectContaining({ method: 'DELETE' })
    );
  });
});

test('displays error message when fetch fails', async () => {
  global.fetch.mockImplementationOnce(() =>
    Promise.reject(new Error('Failed to fetch'))
  );

  const testQueryClient = createTestQueryClient();

  render(
    <QueryClientProvider client={testQueryClient}>
      <App />
    </QueryClientProvider>
  );

  await waitFor(() => {
    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
  });

  const errorMessage = screen.getByText(/error loading todos/i);
  expect(errorMessage).toBeInTheDocument();
});

test('uses relative API URL', () => {
  // This test verifies that the API URL is not hardcoded to localhost
  const appCode = require('../App').default.toString();
  expect(appCode).not.toMatch(/localhost:3001/);
});

test('edit functionality allows updating todo title', async () => {
  const mockTodos = [
    { id: 1, title: 'Original title', completed: false },
  ];

  global.fetch
    .mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockTodos),
      })
    )
    .mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ id: 1, title: 'Updated title', completed: false }),
      })
    );

  const testQueryClient = createTestQueryClient();

  render(
    <QueryClientProvider client={testQueryClient}>
      <App />
    </QueryClientProvider>
  );

  await waitFor(() => {
    expect(screen.getByText('Original title')).toBeInTheDocument();
  });

  const editButton = screen.getByRole('button', { name: /edit/i });
  fireEvent.click(editButton);

  // Should show an input field to edit the title
  await waitFor(() => {
    const input = screen.getByDisplayValue('Original title');
    expect(input).toBeInTheDocument();
  });

  const input = screen.getByDisplayValue('Original title');
  fireEvent.change(input, { target: { value: 'Updated title' } });

  // Should have a save button
  const saveButton = screen.getByRole('button', { name: /save/i });
  fireEvent.click(saveButton);

  await waitFor(() => {
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/1'),
      expect.objectContaining({ 
        method: 'PUT',
        body: expect.stringContaining('Updated title')
      })
    );
  });
});

test('edit functionality saves on Enter key', async () => {
  const mockTodos = [
    { id: 1, title: 'Original title', completed: false },
  ];

  global.fetch
    .mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockTodos),
      })
    )
    .mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ id: 1, title: 'Updated title', completed: false }),
      })
    );

  const testQueryClient = createTestQueryClient();

  render(
    <QueryClientProvider client={testQueryClient}>
      <App />
    </QueryClientProvider>
  );

  await waitFor(() => {
    expect(screen.getByText('Original title')).toBeInTheDocument();
  });

  const editButton = screen.getByRole('button', { name: /edit/i });
  fireEvent.click(editButton);

  await waitFor(() => {
    const input = screen.getByDisplayValue('Original title');
    expect(input).toBeInTheDocument();
  });

  const input = screen.getByDisplayValue('Original title');
  fireEvent.change(input, { target: { value: 'Updated title' } });
  
  // Press Enter to save
  fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

  await waitFor(() => {
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/1'),
      expect.objectContaining({ 
        method: 'PUT',
        body: expect.stringContaining('Updated title')
      })
    );
  });
});
