import { render, screen } from '@testing-library/react';
import App from '../app/App';

describe('App', () => {
  test('renders PlantTime title', () => {
    render(<App />);
    expect(
  screen.getByText((content) => content.includes("PlanTime"))
).toBeInTheDocument();

  });
});


test("renders plant form", () => {
  render(<App />)

  expect(
    screen.getByRole("button", { name: /agregar planta/i })
  ).toBeInTheDocument()
})




