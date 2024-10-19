import styles from "./SignUp.module.css";
import FacebookIcon from '../Icons/FaceBookIcon'
import InstagramIcon from '../Icons/InstagramIcon'
import GoogleIcon from '../Icons/GoogleIcon'
import useInput from '../../Hooks/use-input'
import { useContext, useState } from "react";
import { Navigate, useNavigate } from 'react-router-dom'
import { AuthContext } from "../../context/auth-context";
import axios from "axios";
const SignIn = (props) => {
  const [emailOrPassIsWrong, setEmailOrPassIsWrong] = useState(null);
  const [signedInSuccesfully, setSignedInSuccesfully] = useState(false);
  const {
    value: enteredEmail,
    valueIsValid: emailIsValid,
    hasError: emailHasError,
    inputChangedHandler: emailInputChangeHandler,
    inputBlurHandler: emailInputBlurHandler,
    reset: resetemailInput,
  } = useInput((value) => {
    return (
      value.includes("@") && value.includes(".com") && !value.includes("@.")
    );
  });

  const {
    value: enteredPassword,
    valueIsValid: passwordIsValid,
    hasError: passwordHasError,
    inputChangedHandler: passwordInputChangeHandler,
    inputBlurHandler: passwordInputBlurHandler,
    reset: resetPasswordInput,
  } = useInput((value) => {
    return value.length >= 5;
  });

  const navigate = useNavigate()

  const cannotSubmit =
    !emailIsValid || !passwordIsValid || signedInSuccesfully;


  const buttonContent = signedInSuccesfully
    ? "Signed In Succesfully"
    : "Sign In";

  const auth_ctx = useContext(AuthContext);
  axios.defaults.withCredentials = true;
  const formSubmitHandler = async (e) => {
    e.preventDefault()
    if (cannotSubmit) return
    try {
      const res = await axios.post('http://localhost:8000/login', { email: enteredEmail, password: enteredPassword });
      if (res.data.status === "success") {
        //setCurrentUser(res.data.user)
        setEmailOrPassIsWrong(null);
        auth_ctx.setUser();
        navigate("/")
      }
      else {
        props.displayError(res.data.Error)
      }
    } catch (error) {
      props.displayError(error.response.data.Error);
    }
  }
  return (
    <form
      className={`${styles.form} ${props.className}`}
      onSubmit={formSubmitHandler}
    >
      <h2>SIGN IN</h2>
      {emailOrPassIsWrong && (
        <p className={styles["error-text"]}>{emailOrPassIsWrong}</p>
      )}
      <div className={styles["control-input"]}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          onChange={emailInputChangeHandler}
          onBlur={emailInputBlurHandler}
          value={enteredEmail}
        ></input>
        {emailHasError && (
          <p className={styles["error-text"]}>Email Is Not Valid</p>
        )}
      </div>
      <div className={styles["control-input"]}>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          name="password"
          onChange={passwordInputChangeHandler}
          onBlur={passwordInputBlurHandler}
          value={enteredPassword}
        ></input>{" "}
        {passwordHasError && (
          <p className={styles["error-text"]}>
            Password Not Valid (at least 5chars)
          </p>
        )}
      </div>
      <button type="submit" className={`${styles['navigate-button']} ${cannotSubmit ? styles.cannotSubmit : ""}`}>
        {buttonContent}
      </button>
    </form>
  );
};
export default SignIn;

// import { Button, TextField } from "@mui/material";
// import { useContext, useEffect, useState } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { UserContext } from "../contexts/user.context";

// const Login = () => {
//  const navigate = useNavigate();
//  const location = useLocation();

//  // We are consuming our user-management context to
//  // get & set the user details here
//  const { user, fetchUser, emailPasswordLogin } = useContext(UserContext);

//  // We are using React's "useState" hook to keep track
//  //  of the form values.
//  const [form, setForm] = useState({
//    email: "",
//    password: ""
//  });

//  // This function will be called whenever the user edits the form.
//  const onFormInputChange = (event) => {
//    const { name, value } = event.target;
//    setForm({ ...form, [name]: value });
//  };

//  // This function will redirect the user to the
//  // appropriate page once the authentication is done.
//  const redirectNow = () => {
//    const redirectTo = location.search.replace("?redirectTo=", "");
//    navigate(redirectTo ? redirectTo : "/");
//  }

//  // Once a user logs in to our app, we don’t want to ask them for their
//  // credentials again every time the user refreshes or revisits our app,
//  // so we are checking if the user is already logged in and
//  // if so we are redirecting the user to the home page.
//  // Otherwise we will do nothing and let the user to login.
//  const loadUser = async () => {
//    if (!user) {
//      const fetchedUser = await fetchUser();
//      if (fetchedUser) {
//        // Redirecting them once fetched.
//        redirectNow();
//      }
//    }
//  }

//  // This useEffect will run only once when the component is mounted.
//  // Hence this is helping us in verifying whether the user is already logged in
//  // or not.
//  useEffect(() => {
//    loadUser(); // eslint-disable-next-line react-hooks/exhaustive-deps
//  }, []);

//  // This function gets fired when the user clicks on the "Login" button.
//  const onSubmit = async (event) => {
//    try {
//      // Here we are passing user details to our emailPasswordLogin
//      // function that we imported from our realm/authentication.js
//      // to validate the user credentials and log in the user into our App.
//      const user = await emailPasswordLogin(form.email, form.password);
//      if (user) {
//        redirectNow();
//      }
//    } catch (error) {
//        if (error.statusCode === 401) {
//           alert("Invalid username/password. Try again!");
//       } else {
//           alert(error);
//       }

//    }
//  };

//  return <form style={{ display: "flex", flexDirection: "column", maxWidth: "300px", margin: "auto" }}>
//    <h1>Login</h1>
//    <TextField
//      label="Email"
//      type="email"
//      variant="outlined"
//      name="email"
//      value={form.email}
//      onChange={onFormInputChange}
//      style={{ marginBottom: "1rem" }}
//    />
//    <TextField
//      label="Password"
//      type="password"
//      variant="outlined"
//      name="password"
//      value={form.password}
//      onChange={onFormInputChange}
//      style={{ marginBottom: "1rem" }}
//    />
//    <Button variant="contained" color="primary" onClick={onSubmit}>
//      Login
//    </Button>
//    <p>Don't have an account? <Link to="/signup">Signup</Link></p>
//  </form>
// }

// export default Login;
