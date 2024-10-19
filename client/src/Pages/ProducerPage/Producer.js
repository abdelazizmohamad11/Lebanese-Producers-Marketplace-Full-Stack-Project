import React, { Fragment, useContext, useEffect, useState } from 'react'
import styles from './Producer.module.css'
import { useParams } from 'react-router-dom'
import { ProducersContext } from '../../context/producers';
import LoadingPage from '../LoadingPage/LoadingPage';
import farmerimg from '../../Assets/img.jpg'
import Button from '../../Components/UI/Button'
import { ProductsContext } from '../../context/products'
import ProductItem from '../../Components/ProductItem/ProductItem';
import Messages from '../../Components/Messages/Messages_Comp';
import DisplayMessage from '../../Components/DisplayMessage/DisplayMessage';
export default function Producer() {
    const [messageOutput, setMessageOutput] = useState(null);
    const { producers, isLoading: isProducersLoading } = useContext(ProducersContext);
    const { products, isLoading: isProductsLoading } = useContext(ProductsContext);
    const { username_id } = useParams();
    const id = username_id.split('_').pop();
    const [producer, setProducer] = useState(null);
    const [producerProducts, setProducerProducts] = useState(null);
    useEffect(() => {
        if (producers && products) {
            setProducer(producers.find((prod) => {
                return prod.producer_id == id
            }))
            setProducerProducts(products.filter((product) => {
                return product.producer_id == id
            }))
        }
    }, [producers, setProducer, products, setProducerProducts, id])

    const displaySuccess = (message) => {
        setMessageOutput({
            type: "success",
            message: message
        })
    }

    const displayError = (message) => {
        setMessageOutput({
            type: "error",
            message: message
        })
    }

    let ratingContent = null;
    if (producer) {
        if (producer.rating < 0.5) {
            ratingContent = '0'
        }
        else if (producer.rating <= 1.5) {
            ratingContent = <i class="fa-solid fa-star"></i>
        }
        else if (producer.rating < 2.5) {
            ratingContent = <Fragment>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
            </Fragment>
        }
        else if (producer.rating < 3.5) {
            ratingContent = <Fragment>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
            </Fragment>
        }
        else if (producer.rating < 4.5) {
            ratingContent = <Fragment>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
            </Fragment>
        }
        else {
            ratingContent = <Fragment>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
            </Fragment>
        }
    }

    if (isProducersLoading || !producer || isProductsLoading || !producerProducts)
        return (<LoadingPage />)

    return (
        <Fragment>
            {messageOutput && <DisplayMessage type={messageOutput.type} message={messageOutput.message} reset={() => { setMessageOutput(null) }} />}
            <div className={styles['profile-container']}>
                <div className={styles.cover}>
                </div>
                <div className={styles['profile-info']}>
                    <div className={styles['profile-content']}>
                        <div className={styles['profile-image']}>
                            <img src={producer.producer_image ? `http://localhost:8000/uploads/${producer.producer_image}` : farmerimg} alt='profile' />
                        </div>
                        <div className={styles.info}>
                            <div className={styles['name']}>{producer.producer_name}</div>
                            <div className={styles['fullname']}>{producer.fullname}</div>
                            <div className={styles['bussiness']}>{producer.producer_bussiness}</div>
                            <div className={styles['location']}>{producer.producer_location}</div>
                        </div>
                    </div>
                    <div className={styles.rating}>{ratingContent}</div>
                </div>
            </div>
            <div className={styles['bulk']}>
                <div>
                    <h2>Get Started with Trade Facilitation</h2>
                    <p>Unlock the power of bulk purchasing from this producer! Benefit from exclusive arrangements made possible through our partnership. If you're ready to explore bulk buying options, let the journey begin. Connect with us to get started.</p>
                </div>
                <Button>WHOLESALE INQUIRY</Button>
            </div>
            <div className={styles['description']}>
                <h2>DESCRIPTION</h2>
                <p>{producer.description}</p>
            </div>
            <div className={styles['producer-products']}>
                <h2>{`PRODUCTS (${producerProducts.length})`}</h2>
                <div className={styles['products-container']}>
                    {producerProducts ? producerProducts.map(product => (
                        <ProductItem product={product} key={product.product_id} />
                    )) : null}
                </div>
            </div>
            <div className={styles['messages-cont']}>
                <h2>Messages</h2>
                <Messages producerId={producer.producer_id} displaySuccess={displaySuccess} displayError={displayError} />
            </div>
        </Fragment>
    )
}
