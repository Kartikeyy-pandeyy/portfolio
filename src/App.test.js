import { render, screen } from '@testing-library/react';
import App from './App';

test('renders v2 landing identity', () => {
  render(<App />);
  const nameElement = screen.getByText(/kartikey pandey/i);
  expect(nameElement).toBeInTheDocument();
});
