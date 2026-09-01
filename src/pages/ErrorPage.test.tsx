import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import ErrorPage from '@/pages/ErrorPage';

const renderErrorPageAt = (path: string) =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/error" element={<ErrorPage />} />
        <Route path="/" element={<div>Name Workspace</div>} />
      </Routes>
    </MemoryRouter>
  );

describe('ErrorPage', () => {
  test('shows the cancelled message when the user backed out at Google', () => {
    renderErrorPageAt('/error?error=oauth&details=access_denied');

    expect(screen.getByText('Sign-in cancelled')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Try again' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Return home' })).toBeInTheDocument();
  });

  test('shows the authentication failure message for other oauth errors', () => {
    renderErrorPageAt('/error?error=oauth&details=no_code');

    expect(screen.getByText('Error with authentication')).toBeInTheDocument();
    expect(screen.getByText(/something went wrong in the handoff/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Try again' })).toBeInTheDocument();
  });

  test('falls back to a generic message and hides retry when the category is unrecognized', () => {
    renderErrorPageAt('/error');

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Try again' })).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Return home' })).toBeInTheDocument();
  });

  test('returns the user home when Return home is clicked', async () => {
    renderErrorPageAt('/error');

    await userEvent.click(screen.getByRole('button', { name: 'Return home' }));

    expect(screen.getByText('Name Workspace')).toBeInTheDocument();
  });
});
