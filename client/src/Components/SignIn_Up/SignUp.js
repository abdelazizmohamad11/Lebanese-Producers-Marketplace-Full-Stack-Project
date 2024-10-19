import styles from "./SignUp.module.css";
import FacebookIcon from '../Icons/FaceBookIcon'
import InstagramIcon from '../Icons/InstagramIcon'
import GoogleIcon from '../Icons/GoogleIcon'
import useInput from '../../Hooks/use-input'
import { useState, useContext } from "react";
import axios from "axios";
const SignUp = (props) => {

  const {
    value: enteredName,
    valueIsValid: nameIsValid,
    hasError: nameHasError,
    inputChangedHandler: nameInputChangeHandler,
    inputBlurHandler: nameInputBlurHandler,
    reset: resetNameInput,
  } = useInput((value) => {
    return value.trim() !== "";
  });

  const {
    value: enteredEmail,
    valueIsValid: emailIsValid,
    hasError: emailHasError,
    inputChangedHandler: emailInputChangeHandler,
    inputBlurHandler: emailInputBlurHandler,
    reset: resetemailInput,
  } = useInput((value) => {
    return value.includes("@") && value.includes(".com") && !value.includes("@.");
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


  const cannotSubmit = !nameIsValid || !emailIsValid || !passwordIsValid ;

  axios.defaults.withCredentials = true;
  const formSubmitHandler = async (e) => {
    e.preventDefault()
    if (cannotSubmit) return;
    try{
      const res = await axios.post('http://localhost:8000/register', {
      name: enteredName,
      email: enteredEmail,
      password: enteredPassword
    })
    if (res.data.status == 'success') {
      props.onGoToSignInRegistered();
    } else {
      props.displayError(res.data.Error);
    }
    }catch(err){
      props.displayError(err.response.data.Error);
    }
  }

  const buttonContent =  "Sign Up";

  return (
    <form
      className={`${styles.form} ${props.className}`}
      onSubmit={formSubmitHandler}
    >
      <h2>SIGN UP</h2>
      <div className={styles["control-input"]}>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          name="name"
          value={enteredName}
          onChange={nameInputChangeHandler}
          onBlur={nameInputBlurHandler}
        ></input>
        {nameHasError && (
          <p className={styles["error-text"]}>Name Is Not Valid</p>
        )}
      </div>
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
        <label htmlFor="password">password</label>
        <input
          id="password"
          type="password"
          name="password"
          onChange={passwordInputChangeHandler}
          onBlur={passwordInputBlurHandler}
          value={enteredPassword}
        ></input>
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
export default SignUp;