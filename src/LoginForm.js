import { useLogin } from "./hooks/useLogin";
import "./styles.css";

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
      <div className="row">
        <label htmlFor={"email"}>Email</label>
        <input
          onChange={handleChange}
          value={formState.email}
          name="email"
          id={"email"}
          type={"email"}
        />
      </div>
      <div className="row">
        <label htmlFor={"password"}>Password</label>
        <input
          onChange={handleChange}
          value={formState.password}
          name="password"
          id={"password"}
          type={"password"}
        />
      </div>

      {/* Place login error inside this div. Show the div ONLY if there are login errors. */}
      {fetchStatus.isError && (
        <div className="errorMessage" role="alert">
          {fetchStatus.errMessage}
        </div>
      )}

      <div className="button">
        <button disabled={isBtnDisabled} onClick={handleSubmit}>
          Login
        </button>
      </div>
    </div>
  );
}
