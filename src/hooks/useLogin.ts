import { useState } from "react";
import { login } from "../utils";
// Types for useLogin hook retun
type UseLoginReturn = {
  formState: FormState;
  fetchStatus: FetchStatus;
  isBtnDisabled: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
};
// Types for form inputs and fetch status
type FormState = {
  name: string;
  email: string;
  password: string;
};
type FetchStatus = {
  isLoading: boolean;
  isError: boolean;
  errMessage: string;
};
// Initial states for form inputs and fetch status
export const initialFormState: FormState = {
  email: "",
  name: "",
  password: "",
};
export const initialFetchStatus: FetchStatus = {
  isLoading: false,
  isError: false,
  errMessage: "",
};

export const useLogin = (): UseLoginReturn => {
  const [formState, setFormState] = useState<FormState>(initialFormState);
  const [fetchStatus, setFetchStatus] =
    useState<FetchStatus>(initialFetchStatus);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // Set the loading state to true and reset error state before login attempt
      setFetchStatus({ ...initialFetchStatus, isLoading: true });
      // On successful login, reset the fetch state and form state, and show success alert
      await login({ email: formState.email, password: formState.password });
      setFetchStatus({ ...initialFetchStatus });
      alert("Login succeed!");
      setFormState(initialFormState);
    } catch (error) {
      // On error, set error state and display the error message
      setFetchStatus({
        isLoading: false,
        isError: true,
        errMessage:
          error instanceof Error
            ? error.message
            : "Something went wrong, try again!",
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only reset the error state on the first input change after an error
    if (fetchStatus.isError) setFetchStatus(initialFetchStatus);

    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  // Disable login button when:
  //  - isLoading is true
  //  - Email is empty
  //  - Password is less than 6 characters
  const isBtnDisabled =
    fetchStatus.isLoading ||
    formState.email === "" ||
    formState.password.length < 6;

  return { formState, fetchStatus, handleSubmit, handleChange, isBtnDisabled };
};
