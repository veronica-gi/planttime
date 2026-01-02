import { render, screen } from '@testing-library/react';
import App from '../app/App';

describe('App', () => {
  test('renders PlantTime title', () => {
    render(<App />);
    expect(screen.getByText(/planttime/i)).toBeInTheDocument();
  });
});



