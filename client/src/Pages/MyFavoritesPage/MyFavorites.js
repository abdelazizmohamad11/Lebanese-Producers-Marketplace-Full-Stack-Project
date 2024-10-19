
import React, { useContext} from 'react';
import LoadingPage from '../LoadingPage/LoadingPage';
import styles from './MyFavorites.module.css'; 
import { AuthContext } from '../../context/auth-context';
import ProductItem from '../../Components/ProductItem/ProductItem';
import { ProductsContext } from '../../context/products';

const MyFavorites = () => {
    const {favoriteProducts,isFavoriteLoading}=useContext(AuthContext)
    const {products,isLoading}=useContext(ProductsContext);

    if(isFavoriteLoading||isLoading)
        return(<LoadingPage/>)

    const FavoriteProductsData=products.filter((product) =>
    favoriteProducts.includes(product.product_id)
  );
  console.log(products)
    console.log(favoriteProducts);
    console.log(FavoriteProductsData)
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>{`My Favorite Products ${favoriteProducts.length===0?"":"("+favoriteProducts.length+")"}`}</h1>

            {favoriteProducts.length === 0 ? (
                <p className={styles.message}>You haven't added any favorites yet.</p>
            ) : (
                <div className={styles.productList}>
                    {FavoriteProductsData.map((product) => (
                        <ProductItem key={product.id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyFavorites;