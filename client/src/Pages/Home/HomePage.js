import { Fragment, useContext, useEffect, useState } from "react";
import styles from './Home.module.css'
import Button from "../../Components/UI/Button";
import img1 from '../../Assets/manAndCow.jpg';
import img2 from "../../Assets/market.jpeg";
import { ProducersContext } from "../../context/producers";
import { ProductsContext } from "../../context/products";
import LoadingPage from "../LoadingPage/LoadingPage";
import ProductItem from "../../Components/ProductItem/ProductItem";
import ProducerItem from "../../Components/ProducerItem/ProducerItem";
import Ad1 from "../../Components/Ads/Ad1.js";
import FadeIn from "../../Components/FadeIn/FadeIn.js";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth-context.js";
const HomePage = () => {
    const navigate=useNavigate();
    const { producers, isLoadingProducers } = useContext(ProducersContext);
    const { products, isLoadingProducts } = useContext(ProductsContext)
    const {currentUser,isLoading}=useContext(AuthContext)
    const topProductsContent = products ? products.slice(0, 9).map(product => (
        <ProductItem product={product} key={product.product_id}/>
    )) : null;

    const topProducersContent = producers ? producers.slice(0, 3).map(producer => (
        <ProducerItem producer={producer} key={producer.producer_id}/>
    )) : null;

    if (isLoadingProducers || isLoadingProducts ||isLoading)
        return (
            <LoadingPage />
        )
    return (
        <Fragment>
            
            <div className={styles.headerBackground} />
            <FadeIn>
                <div className={styles.intro}>
                    <h2>Connecting Local Artisans, Farmers, and Enthusiasts</h2>
                    <h2>Where Everyone is a Participant in Local Excellence</h2>
                    <p>Discover a world of unique, handmade products, fresh produce, and authentic experiences</p>
                    <div>
                        <Button onClick={()=>{ currentUser?navigate(`/edit-profile/${currentUser.name}`):navigate('/register')}}>Be A Producer</Button>
                        <Button onClick={()=>{navigate('/products')}}>Explore Products</Button>
                    </div>
                </div>
            </FadeIn>
            <FadeIn>
                <div className={styles['info-section']}>
                    <div className={styles.left}>
                        <img src={img1} alt='man and cow' />
                    </div>
                    <div className={styles.middle}>
                        <i className={`${"fa fa-angle-right"} ${styles.upright}`}></i>
                        <i className={`${"fa fa-angle-left"} ${styles.downleft}`}></i>
                        <h2>We Make Strong Connections Between Talented People and Consumers</h2>
                    </div>
                    <div className={styles.right}>
                        <img src={img2} alt='market' />
                    </div>
                </div>
            </FadeIn>
            <FadeIn>
                <h2 className={styles['section-title']}>Best Producers</h2>
                <div className={styles['top-producers']}>
                    {topProducersContent}
                </div>
            </FadeIn>
            <FadeIn>
                <h2 className={styles['section-title']}>Top Products</h2>
                <div className={styles['top-products']}>
                    {topProductsContent}
                </div>
            </FadeIn>
            <FadeIn>
                <Ad1 />
            </FadeIn>
        </Fragment>
    )
}
export default HomePage;