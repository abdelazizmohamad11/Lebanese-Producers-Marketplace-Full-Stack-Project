import { useState } from "react";

const useInput = (validateValue) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [hasTouched, setHasTouched] = useState(false);
  const valueIsValid = validateValue(enteredValue);
  const hasError = !valueIsValid && hasTouched;

  const inputChangedHandler = (event) => {
    setHasTouched(true);
    setEnteredValue(event.target.value);
  };
  const inputBlurHandler = () => {
    setHasTouched(true);
  };
  const reset = () => {
    setEnteredValue("");
    setHasTouched(false);
  };
  const setInput=(value)=>{
    setEnteredValue(value);
  }
  return {
    value: enteredValue,
    valueIsValid: valueIsValid,
    hasError: hasError,
    inputChangedHandler,
    inputBlurHandler,
    reset,
    setInput
  };
};
export default useInput;
