import { render, screen, fireEvent } from "@testing-library/react";
import InputGroup from "./InputGroup";
import "@testing-library/jest-dom";

describe("InputGroup Component", () => {
  test("renders input with correct props", () => {
    render(
      <InputGroup
        name="email"
        type="email"
        value="test@example.com"
        onChange={() => {}}
      />
    );

    const input = screen.getByLabelText("email");
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("type", "email");
    expect(input).toHaveValue("test@example.com");
  });
  test("renders password input and toggles visibility", () => {
    render(
      <InputGroup
        name="password"
        type="password"
        value="password123"
        onChange={() => {}}
      />
    );

    const input = screen.getByLabelText("password");
    const toggleIcon = screen.getByTestId("visibility-btn");

    // Ensure input is initially of type "password"
    expect(input).toHaveAttribute("type", "password");

    // Simulate clicking the toggle icon
    fireEvent.click(toggleIcon);

    // Ensure input type changes to "text"
    expect(input).toHaveAttribute("type", "text");

    // Simulate clicking the toggle icon again
    fireEvent.click(toggleIcon);

    // Ensure input type changes back to "password"
    expect(input).toHaveAttribute("type", "password");
  });

  test("applies minLength attribute for password type", () => {
    render(
      <InputGroup
        name="password"
        type="password"
        value="short"
        onChange={() => {}}
      />
    );

    const input = screen.getByLabelText("password");

    expect(input).toBeDefined();
    expect(input).toHaveAttribute("minLength", "6");
  });
});
