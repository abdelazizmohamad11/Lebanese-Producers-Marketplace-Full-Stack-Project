import React, { Fragment, useEffect } from 'react'
import styles from './Edit-Profile.module.css'
import Button from '../../Components/UI/Button'
import img from '../../Assets/img.jpg'
import Card from '../../Components/UI/Card'
import { useState, useContext } from "react";
import { useNavigate, useParams } from 'react-router-dom'
import useInput from '../../Hooks/use-input'
import axios from "axios";
import { AuthContext } from '../../context/auth-context'
import LoadingPage from '../LoadingPage/LoadingPage'
import DisplayMessage from '../../Components/DisplayMessage/DisplayMessage'
import {ProducersContext} from '../../context/producers'
const EditProfile = () => {
    const [profilePhoto, setProfilePhoto] = useState(null);
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [userChecked, setUserChecked] = useState(false);
    const [messageOutput, setMessageOutput] = useState(null);
    const [imageDeleted, setImageDeleted] = useState(false);
    const { currentUser, isLoading } = useContext(AuthContext);
    const {bussinessCategories,isLoadingCategories}=useContext(ProducersContext);
    const {
        value: enteredName,
        valueIsValid: nameIsValid,
        hasError: nameHasError,
        inputChangedHandler: nameInputChangeHandler,
        inputBlurHandler: nameInputBlurHandler,
        reset: resetNameInput,
        setInput: setEnteredName
    } = useInput((value) => {
        return value.trim() !== "";
    });

    const {
        value: enteredFullName,
        valueIsValid: fullNameIsValid,
        hasError: fullNameHasError,
        inputChangedHandler: fullNameInputChangeHandler,
        inputBlurHandler: fullNameInputBlurHandler,
        reset: resetFullNameInput,
        setInput: setFullName
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
        setInput: setEmail
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

    const {
        value: enteredLocation,
        valueIsValid: locationIsValid,
        hasError: locationHasError,
        inputChangedHandler: locationInputChangeHandler,
        inputBlurHandler: locationInputBlurHandler,
        reset: resetLocationInput,
        setInput: setEnteredLocation
    } = useInput((value) => {
        return value.trim() !== "";
    });
    const {
        value: enteredBussiness,
        valueIsValid: bussinessIsValid,
        hasError: bussinessHasError,
        inputChangedHandler: bussinessInputChangeHandler,
        inputBlurHandler: bussinessInputBlurHandler,
        reset: resetBussinessInput,
        setInput: setEnteredBussiness
    } = useInput((value) => {
        return value.trim() !== "";
    });
    const {
        value: enteredOtherBussiness,
        valueIsValid: otherBussinessIsValid,
        hasError: otherBussinessHasError,
        inputChangedHandler: otherBussinessInputChangeHandler,
        inputBlurHandler: otherBussinessInputBlurHandler,
        reset: resetOtherBussinessInput,
    } = useInput((value) => {
        return value.trim() !== "";
    });
    const {
        value: enteredPhone,
        valueIsValid: phoneIsValid,
        hasError: phoneHasError,
        inputChangedHandler: phoneInputChangeHandler,
        inputBlurHandler: phoneInputBlurHandler,
        reset: resetPhoneInput,
        setInput: setEnteredPhone
    } = useInput((value) => {
        return value.length === 8;
    });

    const {
        value: enteredDescription,
        valueIsValid: descriptionIsValid,
        hasError: descriptionHasError,
        inputChangedHandler: descriptionInputChangeHandler,
        inputBlurHandler: descriptionInputBlurHandler,
        reset: resetDescriptionInput,
        setInput: setEnteredDescription
    } = useInput((value) => {
        return value.trim() !== "";
    });

    const [enteredRole, setEnteredRole] = useState('consumer');
    const roleChangeHandler = (e) => {
        e.preventDefault();
        setEnteredRole(e.target.value);
    }

    useEffect(() => {
        if (currentUser && !isLoading) {
            if (currentUser.fullname) setFullName(currentUser.fullname);
            setEnteredName(currentUser.name);
            setEmail(currentUser.email);
            setEnteredRole(currentUser.role);
            if (currentUser.image_url) setProfilePhoto(currentUser.image_url)
            if (currentUser.role === 'producer') {
                const getProducerInfo = async () => {
                    try {
                        const res = await axios.get('http://localhost:8000/producers/producer-info');
                        setEnteredBussiness(res.data.producer_info.bussiness_category);
                        setEnteredLocation(res.data.producer_info.location);
                        setEnteredPhone(res.data.producer_info.contact);
                        setEnteredDescription(res.data.producer_info.description);
                    }
                    catch (error) {
                        console.log(error);
                    }
                }
                getProducerInfo();
            }
        }
        setEnteredBussiness("farmer");

    }, [])
    axios.defaults.withCredentials = true;
    const handleFileChange = async (e) => {
        const f = e.target.files[0];
        try {
            const formData = new FormData();
            formData.append('image', f);

            const res = await axios.post('http://localhost:8000/images/saveimage', formData);

            setProfilePhoto(res.data.filename)
        } catch (error) {
            setMessageOutput({
                type: "error",
                message: 'Not an image! Please upload an image file.'
            })
        }
    }
    const checkBoxChangeHandler = (e) => {
        setUserChecked(prev => {
            return !prev
        });
    }
    const handleDeleteImage = async () => {
        try {
            const response = await axios.post(`http://localhost:8000/images/delete-profile-image`);
            setProfilePhoto(null);
            setMessageOutput({
                type: "success",
                message: response.data.message
            })
            setImageDeleted(true);
        } catch (error) {
            console.log(error)
            setMessageOutput({
                type: "error",
                message: error.response.data.message
            })
        }
    };
    const buttonContent = isEditing ? "Editing" : "Edit";


    const formSubmitHandler = async (e) => {
        e.preventDefault();
        let input = {
            name: enteredName,
            email: enteredEmail,
            password: enteredPassword,
            role: enteredRole,
            fullname: enteredFullName,
            image_url: profilePhoto
        }
        if (enteredRole === 'producer') {
            input = {
                ...input,
                bussiness_category: enteredBussiness !== 'other' ? enteredBussiness : enteredOtherBussiness,
                location: enteredLocation,
                contact: enteredPhone,
                description: enteredDescription
            }
        }
        if (cannotSubmit) return;
        setIsEditing(true);
        try {
            const res = await axios.post('http://localhost:8000/profile/id=' + currentUser.name, input);
            if (res.status === 200) {
                setIsEditing(false)
                setMessageOutput({
                    type: "success",
                    message: "Your Data Is Edited Succesfully"
                })
            }
        }
        catch (error) {
            setMessageOutput({
                type: "error",
                message: error.response.data.Error
            })
        }



    }
    const producerFormContent = <Fragment>
        <div className={styles["control-input"]}>
            <label htmlFor="bussiness">Bussiness (Farmer,Artisian,Gardener...etc)</label>
            <select
                id="bussiness"
                name="bussiness"
                form='form'
                value={enteredBussiness}
                onChange={bussinessInputChangeHandler}
                onBlur={bussinessInputBlurHandler}
                defaultValue="farmer"
            >
                {bussinessCategories.map(category=><option value={category}>{category}</option>)}
                <option value='other'>other</option>
            </select>
        </div>
        {enteredBussiness === 'other' ? <div className={styles["control-input"]}>
            <label htmlFor="otherbussiness">Other Bussiness(please set a real one<br></br> if not we will reject your information)</label>
            <input
                id="otherbussiness"
                type="text"
                name="otherbussiness"
                value={enteredOtherBussiness}
                onChange={otherBussinessInputChangeHandler}
                onBlur={otherBussinessInputBlurHandler}
            ></input>
            {otherBussinessHasError && (
                <p className={styles["error-text"]}>Other Bussiness Is Not Valid</p>
            )}
        </div> : null}
        <div className={styles["control-input"]}>
            <label htmlFor="location">Location</label>
            <input
                id="location"
                type="text"
                name="location"
                value={enteredLocation}
                onChange={locationInputChangeHandler}
                onBlur={locationInputBlurHandler}
            ></input>
            {locationHasError && (
                <p className={styles["error-text"]}>Location Is Not Valid</p>
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
            ></input>
            {phoneHasError && (
                <p className={styles["error-text"]}>Phone Number Must Be Equal To 8 Numbers</p>
            )}
        </div>
        <div className={styles["control-input"]}>
            <label htmlFor="description">Description (We Suggest a Description Of Min 50 words)</label>
            <textarea id='description' name='description' rows='10' value={enteredDescription} onChange={descriptionInputChangeHandler} onBlur={descriptionInputBlurHandler}>

            </textarea>
            {descriptionHasError && (
                <p className={styles["error-text"]}>Description Is Not Valid</p>
            )}
        </div>

        <div className={styles['checkbox-group']}>
            <label className={styles['checkbox-container']}>
                I agree to accept wholesale inquiries from consumers, as per the agreed convention between us.
                <input
                    type="checkbox"
                    checked={userChecked}
                    onChange={checkBoxChangeHandler}
                />
                <span className={styles.checkmark}></span>
            </label>
        </div>
        <a href="http://localhost:8000/ProducersPlanet.pdf" download>Download our Producer Benefits PDF for more information</a>
    </Fragment>

    if (isLoading||isLoadingCategories)
        return (
            <LoadingPage />
        )

    let cannotSubmit = !nameIsValid || !emailIsValid || !passwordIsValid || isEditing;
    if (enteredRole === 'producer') {
        cannotSubmit = cannotSubmit || !phoneIsValid || !descriptionIsValid || !locationIsValid || !userChecked;
        if (enteredBussiness === 'other') {
            cannotSubmit = cannotSubmit || !otherBussinessIsValid
        }
    }
    return (
        <Fragment>
            {messageOutput && <DisplayMessage type={messageOutput.type} message={messageOutput.message} reset={() => { setMessageOutput(null) }} />}
            <Card className={styles.container}>

                <form className={styles.form} id='form' onSubmit={formSubmitHandler}>
                    <div className={styles['control-input']}>
                        <h2>Upload a Photo Of Yourself (Optional)</h2>
                        <div>
                            <img src={profilePhoto ? `http://localhost:8000/uploads/${profilePhoto}` : img} alt='profile' />
                            <label className={styles['custom-file-upload']}>
                                <input type="file" onChange={handleFileChange} />
                                Upload
                            </label>
                            {currentUser.image_url && !imageDeleted && <Button onClick={handleDeleteImage}>Delete Image</Button>}
                        </div>
                    </div>
                    <div className={styles["control-input"]}>
                        <label htmlFor="fullname">Your Full Name (Optional)</label>
                        <input
                            id="fullname"
                            type="text"
                            name="fullname"
                            value={enteredFullName}
                            onChange={fullNameInputChangeHandler}
                            onBlur={fullNameInputBlurHandler}
                        ></input>
                    </div>

                    <div className={styles["control-input"]}>
                        <label htmlFor="name">UserName</label>
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
                    <div className={styles["control-input"]}>
                        <label htmlFor="role">Select Your Role</label>
                        <select name='role' id='role' form='form' onChange={roleChangeHandler} value={enteredRole}>
                            <option value="consumer">Consumer</option>
                            <option value="producer">Producer</option>
                        </select>

                    </div>
                    {enteredRole === 'producer' && producerFormContent}
                    <button type="submit" className={`${styles['navigate-button']} ${cannotSubmit ? styles.cannotSubmit : ""}`}>
                        {buttonContent}
                    </button>
                </form>
            </Card>
        </Fragment>
    )
}
export default EditProfile