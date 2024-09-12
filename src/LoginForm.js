import { useState } from "react";
import { login } from "./utils";
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
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });

  const [fetchStatus, setFechStatus] = useState({
    isLoading: false,
    isError: false,
    errMessage: "",
  });

  // const handleSubmit = () => login({ email, password });
  const handleSubmit = () => {
    // console.log(formState);
    setFechStatus({ ...fetchStatus, isLoading: true });
    login({ email: formState.email, password: formState.password })
      .then((res) => {})
      .catch((err) => {
        setFechStatus({
          ...fetchStatus,
          isLoading: false,
          isError: true,
          errMessage: err.message,
        });
      });
  };
  const handleChange = (e) => {
    console.log(e.target.name);

    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  return (
    <div className="wrapper">
      <div className="row">
        <label htmlFor={"email"}>Email</label>
        <input
          id={"email"}
          type={"email"}
          name="email"
          value={formState.email}
          onChange={handleChange}
        />
      </div>
      <div className="row">
        <label htmlFor={"password"}>Password</label>
        <input
          id={"password"}
          type={"password"}
          value={formState.password}
          name="password"
          onChange={handleChange}
        />
      </div>

      {/* Place login error inside this div. Show the div ONLY if there are login errors. */}
      {fetchStatus.isError && (
        <div className="errorMessage">{fetchStatus.errMessage}</div>
      )}

      <div className="button">
        <button disabled={fetchStatus.isLoading} onClick={handleSubmit}>
          Login
        </button>
      </div>
    </div>
  );
}
