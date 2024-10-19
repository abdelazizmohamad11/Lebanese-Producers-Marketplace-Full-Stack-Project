import {  useState } from 'react';

import Modal from '../UI/Modal';
import styles from './Rate.module.css';
import axios from 'axios'
const Rate = (props) => {
    const [rating, setRating] = useState(0);
    const [isSubmiting,setIsSubmiting]=useState(false);
    const [submited,setSubmited]=useState(false)

    const handleRatingChange = (e) => {
        setRating(e.target.value);
    };

    axios.defaults.withCredentials=true;

    const buttonContent=isSubmiting?"Submitting":"Submit Rating";
    const cannotSubmit=isSubmiting || submited;
    const handleSubmit = async(e) => {
        e.preventDefault();
        if(cannotSubmit) return;
        // Call the onSubmit prop with the selected rating
        setIsSubmiting(true);
        const input= { product_id: props.product_id, product_review: rating };
        try{
            const res=await axios.post('http://localhost:8000/submit-review',input);
            if(res.data.status==='success'){
                setIsSubmiting(false);
                props.ratedSuccesfully(res.data.message)
                setSubmited(true)
            }
        }catch(err){
            props.displayError(err.response.data.Error)
        }
    };


    return (
        <Modal onClose={props.onClose}>
            <button className={styles.close} onClick={props.onClose}>x</button>
            <form className={styles.productRatingForm} onSubmit={handleSubmit}>
                <h2>Rate the Product</h2>
                <div className={styles.ratingInput}>
                    <label htmlFor="rating">Your Rating (out of 5):</label>
                    <div className={styles.ratingContainer}>
                        <input
                            type="range"
                            id="rating"
                            name="rating"
                            min="0"
                            max="5"
                            step="0.1"
                            value={rating}
                            onChange={handleRatingChange}
                            required
                        />
                        <span>{rating}</span>
                    </div>
                </div>
                <button type='submit' className={`${styles['submitButton']} ${cannotSubmit ? styles.cannotSubmit : ""}`}>
                    {buttonContent}
                </button>
            </form>
        </Modal>
    );
}


export default Rate;
