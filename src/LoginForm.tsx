import InputGroup from "./components/InputGroup";
import { useLogin } from "./hooks/useLogin";
import "./styles.scss";

// ================ LOGIN FORM ====================
//
// Guidelines:
// * You have an incomplete login form.
// * You are not allowed to add any additional HTML elements.
// * You are not allowed to use refs.
//
// Tasks:
//  * The login button should trigger the login() action imported above and pass required data to it.
//  * Disable the Login button if email is blank OR if password is under 6 letters
//  * Disable the Login button while login action is being performed
//  * Show an error message from the login() if login fails. The error should be cleared every time user re-attempts to log in.
//  * Show an alert box (native Javascript alert) if login succeeds. Investigate the login function to find out how to log in successfully.

export default function LoginForm() {
  const { formState, fetchStatus, handleChange, handleSubmit, isBtnDisabled } =
    useLogin();
  return (
    <div className="wrapper">
      <div className="title">
        <i className="bx bx-log-in"></i>
        <h1>Login</h1>
      </div>
      <form data-testid="form" className="form" onSubmit={handleSubmit}>
        <InputGroup
          name="email"
          type="email"
          required
          value={formState.email}
          onChange={handleChange}
        />
        <InputGroup
          name="password"
          type="password"
          required
          value={formState.password}
          onChange={handleChange}
        />

        <div className="form__action">
          <button
            disabled={isBtnDisabled}
            type="submit"
            className="form__action--btn"
            title={
              formState.email === ""
                ? "email is empty"
                : formState.password.length < 6
                ? "password must be 6 character at least"
                : "Submit button"
            }
          >
            Login
          </button>
        </div>
      </form>
      {/* Place login error inside this div. Show the div ONLY if there are login errors. */}
      {fetchStatus.isError && (
        <div data-testid="formError" className="form__error">
          {fetchStatus.errMessage}
        </div>
      )}
    </div>
  );
}
