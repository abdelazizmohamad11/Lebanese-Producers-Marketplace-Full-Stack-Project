import React, { Fragment, useState, useContext, useEffect } from 'react';
import styles from './Products.module.css';
import { ProductsContext } from '../../context/products';
import LoadingPage from '../LoadingPage/LoadingPage';
import ProductItem from '../../Components/ProductItem/ProductItem';
import Ad1 from '../../Components/Ads/Ad1';
import FadeIn from '../../Components/FadeIn/FadeIn';
import { useSearchParams } from 'react-router-dom';

export default function Products() {

  const { products, isLoading: productsIsLoading, origins, isLoadingOrigins, categories, isLoadingCategories } = useContext(ProductsContext);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [searchParams] = useSearchParams();
  const searchFilter = searchParams.get('searchFilter');
  useEffect(() => {
    applyFilters();
  }, [selectedLocations, selectedCategories, products]);

  useEffect(() => {
    if (searchFilter && products) {
      setFilteredProducts(products.filter(prod => {
        return prod.name.toLowerCase().indexOf(searchFilter.toLowerCase()) !== -1 || prod.origin.toLowerCase().indexOf(searchFilter.toLowerCase()) !== -1
      }))
    }

  }, [searchFilter, products])

  const applyFilters = () => {
    if (selectedLocations.length === 0 && selectedCategories.length === 0 && !searchFilter) {
      setFilteredProducts(products);
      return;
    }
    let filtered;
    if (searchFilter) {
      filtered = products ? products.filter(product => {
        const matchLocation =
          selectedLocations.length === 0 || selectedLocations.includes(product.origin.toLowerCase());
        const matchCategory =
          selectedCategories.length === 0 || selectedCategories.includes(product.category.replace(/\s/g, ''));
        const matchSearchFilter = product.name.toLowerCase().indexOf(searchFilter.toLowerCase()) !== -1
          || product.origin.toLowerCase().indexOf(searchFilter.toLowerCase()) !== -1
        return matchLocation && matchCategory && matchSearchFilter;
      }) : null;
    }
    else {
      filtered = products ? products.filter(product => {
        const matchLocation =
          selectedLocations.length === 0 || selectedLocations.includes(product.origin.toLowerCase());
        const matchCategory =
          selectedCategories.length === 0 || selectedCategories.includes(product.category.replace(/\s/g, ''));
        return matchLocation && matchCategory;
      }) : null;
    }

    setFilteredProducts(filtered);
  };

  const handleLocationChange = location => {
    const locationLower = location.toLowerCase();
    setSelectedLocations(prev => {
      if (prev.includes(locationLower)) {
        return prev.filter(item => item !== locationLower);
      } else {
        return [...prev, locationLower];
      }
    });
  };

  const handleCategoryChange = category => {
    const editedCategory = category.replace(/\s/g, '').toLowerCase()
    setSelectedCategories(prev => {
      if (prev.includes(editedCategory)) {
        return prev.filter(item => item !== editedCategory);
      } else {
        return [...prev, editedCategory];
      }
    });
  };

  const productsContent = filteredProducts
    ? filteredProducts.map(product => <ProductItem key={product.id} product={product} />)
    : null;

  const productsCount = filteredProducts ? filteredProducts.length : 0;

  if (productsIsLoading || isLoadingOrigins || isLoadingCategories) return <LoadingPage />;

  return (
    <Fragment>
      <div className={styles.container}>
        <div className={styles.filters}>
          <h2>Filters</h2>
          <div className={styles['checkbox-group']}>
            <h4>Origins</h4>
            {origins.map(location => (
              <label key={location} className={styles['checkbox-container']}>
                {location}
                <input
                  type="checkbox"
                  checked={selectedLocations.includes(location.toLowerCase())}
                  onChange={() => handleLocationChange(location)}
                />
                <span className={styles.checkmark}></span>
              </label>
            ))}
          </div>
          <div className={styles['checkbox-group']}>
            <h4>Categories</h4>
            {categories.map(category => (
              <label key={category} className={styles['checkbox-container']}>
                {category}
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category.replace(/\s/g, '').toLowerCase())}
                  onChange={() => handleCategoryChange(category)}
                />
                <span className={styles.checkmark}></span>
              </label>
            ))}
          </div>
        </div>
        <div className={styles['products']}>
          <h3>{`${productsCount} products`}</h3>
          <div className={styles['products-container']}>{productsContent}</div>
        </div>
      </div>
      <FadeIn>
        <Ad1 />
      </FadeIn>
    </Fragment>
  );
}