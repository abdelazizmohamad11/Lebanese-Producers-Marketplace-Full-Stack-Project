import React from 'react';
import styles from './ProducerItem.module.css';
import farmerImage from '../../Assets/img.jpg';
import { useNavigate } from 'react-router-dom';
export default function ProducerItem(props) {
    const navigate =useNavigate();
    return (
        <div className={styles.producer} onClick={()=>{navigate('/producer/'+props.producer.producer_name+'_'+"1"+"_"+props.producer.producer_id)}}>
            <div className={styles['image-rating']}>
                <div className={styles['producer-rating']}>
                    {props.producer.rating ? props.producer.rating.toFixed(1) : "--"}
                </div>
                <img src={props.producer.producer_image ? `http://localhost:8000/uploads/${props.producer.producer_image}` : farmerImage} alt="producer" />
                <div className={styles['more-details']}>
                    More Details
                </div>
            </div>
            <div className={styles['producer-info']}>
                <div className={styles['producer-name']}>
                    {props.producer.producer_name.charAt(0).toUpperCase() + props.producer.producer_name.slice(1)}
                </div>
                <div className={styles['producer-bussiness']}>
                    <p>Role:</p> <p>{props.producer.producer_bussiness.charAt(0).toUpperCase() + props.producer.producer_bussiness.slice(1)}</p>
                </div>
            </div>
        </div>
    )
}
