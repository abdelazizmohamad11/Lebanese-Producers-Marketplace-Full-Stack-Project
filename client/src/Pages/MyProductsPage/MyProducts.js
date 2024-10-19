import React, { Fragment, useContext, useEffect, useState } from 'react'
import styles from './MyProducts.module.css'
import LoadingPage from '../LoadingPage/LoadingPage';
import { ProductsContext } from '../../context/products';
import { AuthContext } from '../../context/auth-context';
import Button from '../../Components/UI/Button'
import { useNavigate, useParams } from 'react-router-dom';
import ProductItem from '../../Components/ProductItem/ProductItem';

export default function MyProducts() {
    const navigate = useNavigate();
    const { products, isLoading: isProductsLoading } = useContext(ProductsContext);
    const { currentUser, isLoading } = useContext(AuthContext);
    const { username_id } = useParams();
    const id = username_id.split('_').pop();
    const [producerProducts, setProducerProducts] = useState(null);

    useEffect(() => {
        if (products) {
            setProducerProducts(products.filter((product) => {
                return product.user_id == id
            }))
        }
    }, [products, setProducerProducts, id])

    if (isProductsLoading || isLoading)
        return (<LoadingPage />)

    return (
        <Fragment>
            <div className={styles['add-product-button']}>
                <Button onClick={() => { navigate(`/products/${currentUser.name}_${currentUser.user_id}/add-product`) }}>Add Product</Button>
            </div>
            <div className={styles.container}>
                <h2>{`My Products (${producerProducts ? producerProducts.length : 0})`}</h2>
                <div className={styles['products-container']}>
                    {producerProducts ? producerProducts.map(product => (
                        <ProductItem product={product} key={product.product_id} />
                    )) : null}
                </div>
            </div>
        </Fragment>
    )
}
