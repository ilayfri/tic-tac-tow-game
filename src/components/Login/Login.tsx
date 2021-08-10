import { useState } from "react";
import "./Login.css";
import * as EmailValidator from "email-validator";
import { postRequest } from "../API/ApiRequests";
import { useHistory } from "react-router-dom";
export default function Login() {
  let history = useHistory();
  const [email, setEmail] = useState("");
  const [emailInputTouched, setEmailInputTouched] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validEmail = email.trim() !== "";
  const inValidEmail = !validEmail && emailInputTouched;

  const emailInputChangeHandler = (event: any) => {
    setErrorMessage("");
    setEmail(event.target.value);
  };

  const emailInputBlurHandler = (event: any) => {
    setEmailInputTouched(true);
  };
  const subbmisionHanlder = async (event: any, emailAddress: String) => {
    event.preventDefault();
    setErrorMessage("");
    setEmailInputTouched(true);
    if (!validEmail) {
      return;
    }
    if (!EmailValidator.validate(email)) {
      setErrorMessage("Please insert a valid email");
      return;
    }
    setIsLoading(true);
    try {
      const data = await postRequest(
        "auth",
        JSON.stringify({ email: emailAddress })
      );
      sessionStorage.setItem("token", data.token);
      setEmail("");
      setEmailInputTouched(false);
      setIsLoading(false);
      if (sessionStorage.getItem("token")) {
        window.location.assign("/game");
      }
    } catch (err) {
      setEmailInputTouched(false);
      setIsLoading(false);
      setErrorMessage(err.message);
    }
  };

  return (
    <>
      <div className="login-wrapper">
        <div className="login-form-wrapper">
          <div className="login-form-top">
            <h3>Welcome to Tic-tac-toe:</h3>
          </div>
          <form
            onSubmit={(e) => {
              subbmisionHanlder(e, email);
            }}
          >
            <div className="login-form-body">
              <label>
                <p>Email address</p>
                <input
                  type="text"
                  className={
                    inValidEmail == true ||
                    (!EmailValidator.validate(email) && errorMessage != "")
                      ? "error-border"
                      : ""
                  }
                  value={email}
                  onChange={emailInputChangeHandler}
                  onBlur={emailInputBlurHandler}
                />
              </label>
            </div>
            <hr></hr>
            <div className="login-form-buttom">
              <div>
                <p className="error">
                  {inValidEmail ? "Email must not be empty" : errorMessage}
                </p>
              </div>
              <button
                className="form-button"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Logging in.." : "Start game"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
