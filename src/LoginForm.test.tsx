import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LoginForm from "./LoginForm";
import "@testing-library/jest-dom";
import { login } from "./utils";

// Mocking the login function
beforeEach(() => {
  jest.clearAllMocks();
  window.alert = jest.fn(); // Mock alert
});
jest.mock("./utils", () => ({
  login: jest.fn(),
}));

describe("LoginForm Component", () => {
  test("disables login button when email is blank or password is under 6 characters", () => {
    render(<LoginForm />);

    const emailInput = screen.getByLabelText("email");
    const passwordInput = screen.getByLabelText("password");
    const loginButton = screen.getByRole("button", { name: /login/i });

    // Initial state should have disabled button
    expect(loginButton).toBeDisabled();

    // Fill in email and password
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "12345" } });

    // Button should still be disabled (password is less than 6 characters)
    expect(loginButton).toBeDisabled();

    // Update password to be valid
    fireEvent.change(passwordInput, { target: { value: "123456" } });

    // Button should be enabled now
    expect(loginButton).not.toBeDisabled();
  });

  test("disables login button while login action is being performed", async () => {
    // Mock the login function to resolve after 1 second
    (login as jest.Mock).mockImplementation(
      () => new Promise((resolve) => setTimeout(resolve, 1000))
    );

    render(<LoginForm />);

    const emailInput = screen.getByLabelText("email");
    const passwordInput = screen.getByLabelText("password");
    const loginButton = screen.getByRole("button", { name: /login/i });

    // Fill in valid email and password
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "123456" } });

    // Submit the form
    fireEvent.submit(screen.getByTestId("form")); // Ensure the form has the correct role or add data-testid

    // Button should be disabled during login
    expect(loginButton).toBeDisabled();
  });

  test("shows error message if login fails and clears error on new attempt", async () => {
    (login as jest.Mock).mockRejectedValue(
      new Error("Something went wrong, try again!")
    );

    render(<LoginForm />);

    const emailInput = screen.getByLabelText("email");
    const passwordInput = screen.getByLabelText("password");
    // const loginButton = screen.getByRole("button", { name: /login/i });

    // Fill in valid email and password
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "123456" } });

    // Submit the form
    fireEvent.submit(screen.getByTestId("form"));

    // Wait for error to be displayed
    await waitFor(() => {
      expect(
        screen.getByText("Something went wrong, try again!")
      ).toBeInTheDocument();
    });

    // Clear error and try logging in again
    (login as jest.Mock).mockResolvedValue(undefined);

    // Clear the error
    fireEvent.change(emailInput, { target: { value: "" } });
    fireEvent.change(passwordInput, { target: { value: "" } });

    // Wait for error to be cleared
    await waitFor(() => {
      expect(
        screen.queryByText("Something went wrong, try again!")
      ).not.toBeInTheDocument();
    });
  });

  test("shows alert on successful login", async () => {
    // Mock the login function to resolve successfully
    (login as jest.Mock).mockResolvedValue(undefined);
    window.alert = jest.fn(); // Mock alert

    render(<LoginForm />);

    const emailInput = screen.getByLabelText("email");
    const passwordInput = screen.getByLabelText("password");
    const loginButton = screen.getByRole("button", { name: /login/i });

    // Fill in valid email and password
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "123456" } });

    // Submit the form by click on loginButton
    fireEvent.click(loginButton);

    // Wait for login to complete and alert to be called
    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith("Login succeed!");
    });
  });
});
