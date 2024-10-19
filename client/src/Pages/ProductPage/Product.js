import React, { Fragment, useContext, useEffect, useState } from 'react'
import styles from './Product.module.css'
import Button from '../../Components/UI/Button'
import img from '../../Assets/product.jpeg'
import Card from '../../Components/UI/Card'
import { ProductsContext } from '../../context/products'
import LoadingPage from '../LoadingPage/LoadingPage'
import { Link, useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import ProductItem from '../../Components/ProductItem/ProductItem'
import Rate from '../../Components/Rate/Rate'
import { AuthContext } from '../../context/auth-context'
import axios from 'axios'
import DisplayMessage from '../../Components/DisplayMessage/DisplayMessage'
export default function Product() {
    const navigate = useNavigate();
    const [messageOutput, setMessageOutput] = useState(null);
    const { products, isLoading: isProductsLoading } = useContext(ProductsContext);
    const [product, setProduct] = useState(null);
    const [added, setAdded] = useState(false);
    const [removed, setRemoved] = useState(false);
    const [productIsFavorite, setProductIsFavorite] = useState(false);
    const [isOwner, setIsOwner] = useState(false);

    const { productname_id } = useParams();
    const id = productname_id.split('_').pop();

    const [rateIsShown, setRateIsShown] = useState(false);
    const [productDeleted,setProductDeleted]=useState(false);
    const { currentUser, isLoading: userLoading, favoriteProducts, isFavoriteLoading } = useContext(AuthContext);

    axios.defaults.withCredentials = true;
    useEffect(() => {
        if (products) {
            setProduct(products.find((prod) => {
                return prod.product_id == id
            }))
        }
        if (favoriteProducts) {
            favoriteProducts.includes(parseInt(id)) ? setProductIsFavorite(true) : setProductIsFavorite(false);
        }
        const fetchIsOwner = async () => {
            // Fetch data from the server to determine ownership
            axios.get(`http://localhost:8000/products/${id}/checkOwnership`)
                .then(response => {
                    if (response.data.Error) {
                        setIsOwner(false);
                    }
                    else {
                        if (response.data.isOwner === 1) {
                            setIsOwner(true);
                        }
                        else {
                            setIsOwner(false);
                        }
                    }
                })
                .catch(error => {
                    setMessageOutput(
                        {
                            type: 'error',
                            message:error.response.data.Error
                        }
                    )
                });
        }
        fetchIsOwner();
    }, [products, favoriteProducts, id])

    const showRateHandler = () => {
        setRateIsShown(true);
    };

    const hideRateHandler = () => {
        setRateIsShown(false);
    };
    const addToFavoriteHandler = async () => {
        if (!currentUser)
            navigate('/register')

        if (added)
            return

        try {
            const response = await axios.post('http://localhost:8000/userFavoriteProducts/add', {
                product_id: product.product_id
            });

            if (response.data.status === 'success') {
                setAdded(true)
                setMessageOutput(
                    {
                        type: 'success',
                        message: response.data.message
                    }
                )
            }
        } catch (error) {
            setMessageOutput(
                {
                    type: 'error',
                    message:error.response.data.Error
                }
            )
        }
    }

    const deleteFavoriteHandler = async () => {
        if (!currentUser)
            navigate('/register')
        if (!productIsFavorite)
            return
        try {
            const response = await axios.post('http://localhost:8000/userFavoriteProducts/delete-from-favorite-products', {
                product_id: product.product_id
            });
            if (response.data.status === 'success') {
                setRemoved(true);
                setMessageOutput(
                    {
                        type: 'success',
                        message: response.data.message
                    }
                )
            }
        } catch (error) {
            setMessageOutput(
                {
                    type: 'error',
                    message:error.response.data.Error
                }
            )
        }
    }

    let ratingContent = null;
    if (product) {
        if (product.product_rating < 0.5) {
            ratingContent = '0'
        }
        else if (product.product_rating <= 1.5) {
            ratingContent = <i class="fa-solid fa-star"></i>
        }
        else if (product.product_rating < 2.5) {
            ratingContent = <Fragment>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
            </Fragment>
        }
        else if (product.product_rating < 3.5) {
            ratingContent = <Fragment>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
            </Fragment>
        }
        else if (product.product_rating < 4.5) {
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
    const deleteProductHandler = async () => {
        axios.post(`http://localhost:8000/products/delete/${id}`).then(
            response => {
                setProductDeleted(true)
                setMessageOutput({
                    type: "success",
                    message: "Product Deleted Succesfully"
                })
            }
        ).catch(err => {
            if (err.response.status === '403') {
                setMessageOutput({
                    type: "error",
                    message: err.response.data.Error
                })
            }
            else {
                setProductDeleted(true)
                setMessageOutput({
                    type: "success",
                    message: "Product Deleted Succesfully"
                })
            }
        })
    }

    const goToProducts = () => {
        navigate('/products');
        window.location.reload();
    }
    const ratedSuccesfully = (message) => {
        setMessageOutput({
            type: "success",
            message: message
        })
    }
    const displayError = (message) => {
        setRateIsShown(false);
        setMessageOutput({
            type: "error",
            message: message
        })
    }
    const productsForSameProducer = products && product ? products.filter((prod) => {
        return prod.producer_id == product.producer_id && prod.product_id != id
    }) : null;


    if (isProductsLoading || !product || userLoading || isFavoriteLoading)
        return (<LoadingPage />)


    return (
        <Fragment>
            {messageOutput && <DisplayMessage type={messageOutput.type} message={messageOutput.message} reset={!productDeleted ? () => { setMessageOutput(null) } : goToProducts} />}
            {rateIsShown && <Rate onClose={hideRateHandler} product_id={product.product_id} ratedSuccesfully={ratedSuccesfully} displayError={displayError} />}
            {isOwner && <div className={styles['owner-buttons']}>
                <Button onClick={deleteProductHandler}>Delete</Button>
                <Button onClick={() => { navigate(`/products/edit-product/${product.product_id}`) }}>Edit</Button></div>}
            <div className={styles.product}>
                <div className={styles['product-image']}>
                    <img src={product.image ? `http://localhost:8000/uploads/${product.image}` : img} alt='product' />
                </div>
                <div className={styles['product-details']}>
                    <h2>{product.name}</h2>
                    <div className={styles.rating}>
                        <div>{ratingContent}</div>
                        {currentUser && <Button onClick={showRateHandler}>Rate</Button>}
                        {!currentUser && <Link to='/register'>Login To Rate</Link>}
                    </div>
                    <div className={styles.price}>
                        <p>Price:</p><p className={styles['price-content']}>{`${product.price}$ per ${product.quantity}`}</p>
                    </div>
                    <div className={styles.category}>
                        <p>Type:</p><p className={styles['category-content']}>{product.category}</p>
                    </div>
                    <Card className={styles.card}>
                        <div className={styles['sold-by']}>
                            SOLD BY
                        </div>
                        <div className={styles.producer} onClick={() => { navigate('/producer/' + product.producer_name + '_' + "1" + "_" + product.producer_id) }}>
                            <img src={product.producer_image ? `http://localhost:8000/uploads/${product.producer_image}` : img} alt='producer' />
                            <div className={styles['producer-name']}>
                                {product.producer_name}
                            </div>
                        </div>
                        <div className={styles.origin}>
                            <p>Product Origin</p><p className={styles['origin-content']}>{product.origin}</p>
                        </div>
                    </Card>
                    {productIsFavorite ? <div className={`${styles['delete-from-favorite']} ${removed ? styles.cannotRemove : ""}`} onClick={deleteFavoriteHandler}>
                        {!removed && <Fragment>
                            <i class="fa-regular fa-heart"></i>
                            <p>Remove</p></Fragment>}
                        {removed && "Removed Succesfully"}
                    </div> : <div className={`${styles['add-to-favorite']} ${added ? styles.cannotAdd : ""}`} onClick={addToFavoriteHandler}>
                        {!added && <Fragment>
                            <i class="fa-regular fa-heart"></i>
                            <p>Add To Favorite</p></Fragment>}
                        {added && "Added Succesfully"}
                    </div>}


                </div>
            </div>
            <div className={styles['description']}>
                <h2>DESCRIPTION</h2>
                <p>{product.description}</p>
            </div>
            <div className={styles['other-products']}>
                <h2>{`PRODUCTS FOR THE SAME ORGANIZATION (${productsForSameProducer ? productsForSameProducer.length : 0})`}</h2>
                <div className={styles['other-products-content']}>
                    {
                        productsForSameProducer ? productsForSameProducer.map(p => (
                            <ProductItem product={p} key={product.product_id} />
                        )) : null
                    }
                </div>
            </div>
        </Fragment>
    )
}
