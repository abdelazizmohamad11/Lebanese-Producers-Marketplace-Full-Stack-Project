import React from 'react'
import styles from './ProductItem.module.css';
import img3 from "../../Assets/product.jpeg";
import { useNavigate } from 'react-router-dom';
import img from '../../Assets/citizenship.png'
export default function ProductItem(props) {
    const navigate = useNavigate();
    const clickHandler = () => {
        navigate('/product/' + props.product.name + '_' + "1" + "_" + props.product.product_id)
        //here i must edit it because it causes some problems
        if(window.location.pathname.split('/')[1]==='product'){
            window.location.reload();
        }
    }

    return (
        <div className={styles.product} onClick={clickHandler}>
            <div className={styles['image-rating']}>
                <div className={styles['product-rating']}>
                    {props.product.product_rating?props.product.product_rating.toFixed(1):"--"}
                </div>
                <img src={props.product.image?`http://localhost:8000/uploads/${props.product.image}`:img3} alt="product" />
                <div className={styles['more-details']}>
                    More Details
                </div>
            </div>
            <div className={styles['product-info']}>
                <div className={styles['product-by']}>
                    {props.product.producer_name.charAt(0).toUpperCase() + props.product.producer_name.slice(1)}
                </div>
                <div className={styles['product-name']}>
                    {props.product.name}
                </div>
                <div className={styles['product-origin']}>
                    <img src={img} alt='country'/>
                    <p>{props.product.origin}</p>
                </div>
            </div>
        </div>
    )
}
