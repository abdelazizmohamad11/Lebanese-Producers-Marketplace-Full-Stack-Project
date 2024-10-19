import React, { useState } from 'react';
import { createSearchParams, useNavigate } from 'react-router-dom';
import styles from './SearchFilter.module.css';

const SearchFilter = (props) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedOption, setSelectedOption] = useState('products');
    const [closing, setClosing] = useState(false);
    const navigate = useNavigate();
    const handleSearch = () => {
        if (searchTerm.trim() !== '') {
            const route = selectedOption === 'products' ? '/products' : '/producers';
            const params = { searchFilter: searchTerm };
            navigate({
                pathname: route,
                search: `?${createSearchParams(params)}`,
            });
            window.location.reload();
        }
    };
    const closeHandler = () => {
        setClosing(true);
        setTimeout(() => {
            props.onClose();
        }, 2000);
    }

    return (
        <div className={`${styles.searchFilter} ${closing?styles.closing:''}`}>
            <button className={`${styles.close} ${closing?styles.closing:''}`} onClick={closeHandler}>x</button>
            <h2 className={`${closing?styles.closing:''}`}>What Type Are You Looking For</h2>
            <div className={`${styles.options} ${closing?styles.closing:''}`}>
                <button
                    className={`${styles.optionButton} ${selectedOption === 'products' ? styles.selected : ''}`}
                    onClick={() => setSelectedOption('products')}
                >
                    Products
                </button>
                <button
                    className={`${styles.optionButton} ${selectedOption === 'producers' ? styles.selected : ''}`}
                    onClick={() => setSelectedOption('producers')}
                >
                    Producers
                </button>
            </div>

            <div className={`${styles.searchInputContainer} ${closing?styles.closing:''}`}>
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={styles.searchInput}
                />
                <button className={styles.searchButton} onClick={handleSearch}>
                    Search
                </button>
            </div>
        </div>
    );
};

export default SearchFilter;