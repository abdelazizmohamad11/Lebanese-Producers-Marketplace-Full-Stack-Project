import React, { Fragment, useState } from 'react'
import styles from './Contact.module.css'
import FadeIn from '../../Components/FadeIn/FadeIn'
import useInput from '../../Hooks/use-input';
import Button from '../../Components/UI/Button';
import DisplayMessage from '../../Components/DisplayMessage/DisplayMessage';
import axios from 'axios';
export default function Contact() {
    const [messageOutput, setMessageOutput] = useState(null);
    const [isSending,setIsSending]=useState(false);
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
        value: enteredPhone,
        valueIsValid: phoneIsValid,
        hasError: phoneHasError,
        inputChangedHandler: phoneInputChangeHandler,
        inputBlurHandler: phoneInputBlurHandler,
        reset: resetPhoneInput,
    } = useInput((value) => {
        return value.length === 8;
    });
    const {
        value: enteredMessage,
        valueIsValid: messageIsValid,
        hasError: messageHasError,
        inputChangedHandler: messageInputChangeHandler,
        inputBlurHandler: messageInputBlurHandler,
        reset: resetMessageInput,
    } = useInput((value) => {
        return value.trim() !== "";
    });

    const cannotSubmit=!emailIsValid||!nameIsValid||!phoneIsValid||!messageIsValid||isSending;

    const formSubmitHandler = async (e) => {
        e.preventDefault();
        if(cannotSubmit)
            return;
        setIsSending(true);
        const inputs={
            name:enteredName,
            email:enteredEmail,
            phonenumber:enteredPhone,
            message:enteredMessage
        }
        try{
            const response =await axios.post('http://localhost:8000/api/sendEmail',inputs);
            setMessageOutput({
                type:"success",
                message:response.data.message
            })
            setIsSending(false)
        }catch(err){
            setMessageOutput({
                type:"error",
                message:err.response.data.Error
            })
            setIsSending(false)
        }
    }
    return (
        <Fragment>
            {messageOutput&&<DisplayMessage type={messageOutput.type} message={messageOutput.message} reset={()=>{setMessageOutput(null)}}/>}
            <div className={styles.headerBackground}></div>
            <FadeIn>
                <div className={styles.intro}>
                    <h2>How Can We Help ?</h2>
                    <h3>Send Us A Message</h3>
                </div>
            </FadeIn>
            <div className={styles.formContainer}>
                <h2>Get In Touch</h2>
                <p>Let's Talk About Your Project!</p>
                <form onSubmit={formSubmitHandler} className={styles.form}>
                    <div className={styles.row1}>
                        <div className={styles["control-input"]}>
                            <label htmlFor="name">UserName</label>
                            <input
                                id="name"
                                type="text"
                                name="name"
                                value={enteredName}
                                onChange={nameInputChangeHandler}
                                onBlur={nameInputBlurHandler}
                                placeholder='Your Name'
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
                                placeholder='Your Email'
                            ></input>
                            {emailHasError && (
                                <p className={styles["error-text"]}>Email Is Not Valid</p>
                            )}
                        </div>
                        <div className={styles["control-input"]}>
                            <label htmlFor="phonenumber">Phone Number</label>
                            <input
                                id="phonenumber"
                                type="number"
                                name="phonenumber"
                                value={enteredPhone}
                                onChange={phoneInputChangeHandler}
                                onBlur={phoneInputBlurHandler}
                                placeholder='Your Phone Number'
                            ></input>
                            {phoneHasError && (
                                <p className={styles["error-text"]}>Phone Number Must Be Equal To 8 Numbers</p>
                            )}
                        </div>
                    </div>
                    <div className={styles.row2}>
                        <div className={styles["control-input"]}>
                            <label htmlFor="message">Message</label>
                            <textarea id='message' name='message' rows='10' value={enteredMessage} onChange={messageInputChangeHandler} onBlur={messageInputBlurHandler} placeholder='Your Message'>

                            </textarea>
                            {messageHasError && (
                                <p className={styles["error-text"]}>Message Is Not Valid</p>
                            )}
                        </div>
                    </div>
                    <Button className={`${cannotSubmit ? styles.cannotSubmit : ""}`} type='submit'>
                        {isSending?"Sending...":"Submit"}
                    </Button>
                </form>
            </div>
        </Fragment>
    )
}
