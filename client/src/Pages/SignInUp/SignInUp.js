import { useState } from "react";
import Card from "../../Components/UI/Card";
import styles from "./SignInUp.module.css";
import SignUp from "../../Components/SignIn_Up/SignUp";
import { Fragment } from "react";
import SignIn from "../../Components/SignIn_Up/SignIn";
import DisplayMessage from "../../Components/DisplayMessage/DisplayMessage";
const SignInUp = (props) => {
  const [messageOutput, setMessageOutput] = useState(null);
  const [inSignUp, setInSignUp] = useState(true);
  const [inSignIn, setInSignIn] = useState(false);
  const containerClasses = `${styles.container} ${inSignUp ? styles.signup : styles.signin
    }`;
  const leftClasses = `${styles.left} ${!inSignUp ? styles["turn-right"] : ""}`;
  const rightClasses = `${styles.right} ${!inSignUp ? styles["turn-left"] : ""
    }`;
  const ToSignInRegisteredHandler = () => {
    setMessageOutput({
      type: "success",
      message: "You Have Been Registered Succesfully"
    })
    setInSignUp(false);
    setInSignIn(true);
  };
  const ToSignInHandler = () => {
    setInSignUp(false);
    setInSignIn(true);
  };
  const ToSignUpHandler = () => {
    setInSignUp(true);
    setInSignIn(false);
  }
  const displayError = (error) => {
    setMessageOutput({
      type: "error",
      message: error
    })
  }

  const leftContent = inSignUp ? (
    <Fragment>
      <h2 className="fade-in-with-delay-1s">Welcome</h2>
      <p className="fade-in-with-delay-1s">Join our community of artisans, farmers, and enthusiasts. Sign up now to discover a world of local craftsmanship and homegrown treasures!</p>
      <p className="fade-in-with-delay-1s">Already Have An Account?</p>
      <button className={`${styles.button} fade-in-with-delay-1s`} onClick={ToSignInHandler}>
        Sign In
      </button>
    </Fragment>
  ) : (
    <SignIn className="fade-in-with-delay-1s" displayError={displayError}/>
  );
  const rightContent = inSignIn ? (
    <Fragment>
      <h2 className="fade-in-with-delay-1s">Welcome</h2>
      <p className="fade-in-with-delay-1s">Sign In For Unlimited Access On Our Courses!</p>
      <p className="fade-in-with-delay-1s">Don't have An Account?</p>
      <button className={`${styles.button} fade-in-with-delay-1s`} onClick={ToSignUpHandler}>
        Sign Up
      </button>
    </Fragment>
  ) : (
    <SignUp className="fade-in-with-delay-1s" onGoToSignIn={ToSignInHandler} onGoToSignInRegistered={ToSignInRegisteredHandler} displayError={displayError} />
  );
  return (
    <Fragment>
      {messageOutput && <DisplayMessage type={messageOutput.type} message={messageOutput.message} reset={() => { setMessageOutput(null) }} />}
      <Card className={containerClasses}>
        <div className={leftClasses}>
          {leftContent}
        </div>
        <div className={rightClasses}>
          {rightContent}
        </div>
      </Card>
    </Fragment>
  );
};
export default SignInUp;
