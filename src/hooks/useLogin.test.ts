import { renderHook, act } from "@testing-library/react-hooks";
import { initialFetchStatus, initialFormState, useLogin } from "./useLogin";
import { login } from "../utils";

// Mocking the login function
jest.mock("../utils", () => ({
  login: jest.fn(),
}));

beforeEach(() => {
  jest.clearAllMocks();
  window.alert = jest.fn(); // Mock alert
});

describe("useLogin hook", () => {
  test("should handle form state changes correctly", () => {
    const { result } = renderHook(() => useLogin());

    // Verify initial form state
    expect(result.current.formState).toEqual(initialFormState);
    // Test button disabled state when email is empty
    expect(result.current.isBtnDisabled).toBe(true);

    // Update form state
    act(() => {
      result.current.handleChange({
        target: { name: "email", value: "test@example.com" },
      } as any);
    });
    expect(result.current.formState.email).toBe("test@example.com");

    act(() => {
      result.current.handleChange({
        target: { name: "password", value: "123456" },
      } as any);
    });
    expect(result.current.formState.password).toBe("123456");
  });

  test("should handle successful login", async () => {
    (login as jest.Mock).mockResolvedValue(undefined); // Mock successful login

    const { result } = renderHook(() => useLogin());

    // Fill in the form
    act(() => {
      result.current.handleChange({
        target: { name: "email", value: "test@example.com" },
      } as any);
    });
    act(() => {
      result.current.handleChange({
        target: { name: "password", value: "password123" },
      } as any);
    });
    expect(result.current.formState.email).toBe("test@example.com");
    expect(result.current.formState.password).toBe("password123");

    // Submit the form
    await act(async () => {
      await result.current.handleSubmit({ preventDefault: () => {} } as any);
    });

    // Check for successful form reset and alert call
    expect(result.current.formState).toEqual(initialFormState);
    expect(result.current.fetchStatus).toEqual(initialFetchStatus);
    expect(window.alert).toHaveBeenCalledWith("Login succeed!");
  });

  test("should handle login failure", async () => {
    (login as jest.Mock).mockRejectedValue(
      new Error("Something went wrong, try again!")
    ); // Mock failed login

    const { result } = renderHook(() => useLogin());

    // Fill in the form
    act(() => {
      result.current.handleChange({
        target: { name: "email", value: "test@example.com" },
      } as any);
      result.current.handleChange({
        target: { name: "password", value: "123456" },
      } as any);
    });
    expect(result.current.fetchStatus).toEqual(initialFetchStatus);

    // Submit the form
    await act(async () => {
      await result.current.handleSubmit({ preventDefault: () => {} } as any);
    });

    // Check error state
    expect(result.current.fetchStatus).toEqual({
      isLoading: false,
      isError: true,
      errMessage: "Something went wrong, try again!",
    });
  });

  test("should disable button when form is invalid or login is in progress", async () => {
    const { result } = renderHook(() => useLogin());

    // Test button disabled state when email is empty
    expect(result.current.isBtnDisabled).toBe(true);

    // Test button disabled state when password is too short
    act(() => {
      result.current.handleChange({
        target: { name: "password", value: "12345" },
      } as any);
    });
    act(() => {
      result.current.handleChange({
        target: { name: "email", value: "test@example.com" },
      } as any);
    });

    expect(result.current.isBtnDisabled).toBe(true);

    // Test button enabled state when form is valid
    act(() => {
      result.current.handleChange({
        target: { name: "password", value: "123456" },
      } as any);
    });

    expect(result.current.isBtnDisabled).toBe(false);

    // Simulate loading state
    await act(async () => {
      await result.current.handleSubmit({ preventDefault: () => {} } as any);
    });

    expect(result.current.isBtnDisabled).toBe(true);
  });
});
