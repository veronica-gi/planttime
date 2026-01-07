import { render, screen, fireEvent } from '@testing-library/react';
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


test("switches to calendar view when clicking calendar button", () => {
    render(<App />)

    const calendarButton = screen.getByText(/calendario/i)
    fireEvent.click(calendarButton)

    expect(
      screen.getByText(/calendario/i)
    ).toBeInTheDocument()
  })


test("shows empty state message when there are no plants", () => {
  render(<App />)

  expect(
    screen.getByText(/no tienes plantas registradas/i)
  ).toBeInTheDocument()
})


