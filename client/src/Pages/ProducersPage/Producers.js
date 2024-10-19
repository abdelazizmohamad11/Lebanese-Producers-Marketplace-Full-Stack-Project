import React, { Fragment, useState, useContext, useEffect } from 'react';
import styles from './Producers.module.css';
import LoadingPage from '../LoadingPage/LoadingPage';
import { ProducersContext } from '../../context/producers';
import ProducerItem from '../../Components/ProducerItem/ProducerItem';
import Ad1 from '../../Components/Ads/Ad1';
import FadeIn from '../../Components/FadeIn/FadeIn';
import { useSearchParams } from 'react-router-dom';
export default function Producers() {
  const { producers, isLoading: producersIsLoading, locations, isLoadingLocations, bussinessCategories, isLoadingCategories } = useContext(ProducersContext);

  const [selectedLocations, setSelectedLocations] = useState([]);
  const [selectedBussiness, setSelectedBussiness] = useState([]);
  const [filteredProducers, setFilteredProducers] = useState(producers);
  const [searchParams] = useSearchParams();
  const searchFilter = searchParams.get('searchFilter');
  useEffect(() => {
    applyFilters();
  }, [selectedLocations, selectedBussiness, producers]);

  useEffect(() => {
    if (searchFilter && producers) {
      setFilteredProducers(producers.filter(prod => {
        return prod.producer_name.toLowerCase().indexOf(searchFilter.toLowerCase()) !== -1;
      }))
    }

  }, [searchFilter, producers])
  const applyFilters = () => {
    if (selectedLocations.length === 0 && selectedBussiness.length === 0 && !searchFilter) {
      setFilteredProducers(producers);
      return;
    }
    let filtered;
    if (searchFilter) {
      filtered = producers ? producers.filter(producer => {
        const matchLocation =
          selectedLocations.length === 0 || selectedLocations.includes(producer.location.toLowerCase());
        const matchCategory =
          selectedBussiness.length === 0 || selectedBussiness.includes(producer.producer_bussiness.toLowerCase());
        const matchSearchFilter=producer.producer_name.toLowerCase().indexOf(searchFilter.toLowerCase()) !== -1;
        return matchLocation && matchCategory && matchSearchFilter;
      }) : null;
    } else {
      filtered = producers ? producers.filter(producer => {
        const matchLocation =
          selectedLocations.length === 0 || selectedLocations.includes(producer.location.toLowerCase());
        const matchCategory =
          selectedBussiness.length === 0 || selectedBussiness.includes(producer.producer_bussiness.toLowerCase());
        return matchLocation && matchCategory;
      }) : null;
    }

    setFilteredProducers(filtered);
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

  const handleBussinessChange = bussiness => {
    const bussinessLower = bussiness.toLowerCase();
    setSelectedBussiness(prev => {
      if (prev.includes(bussinessLower)) {
        return prev.filter(item => item !== bussinessLower);
      } else {
        return [...prev, bussinessLower];
      }
    });
  };

  const producersContent = filteredProducers
    ? filteredProducers.map(producer => <ProducerItem key={producer.producer_id} producer={producer} />)
    : null;

  const producersCount = filteredProducers ? filteredProducers.length : 0;

  if (producersIsLoading || isLoadingLocations || isLoadingCategories) return <LoadingPage />;

  return (
    <Fragment>
      <div className={styles.container}>
        <div className={styles.filters}>
          <h2>Filters</h2>
          <div className={styles['checkbox-group']}>
            <h4>Locations</h4>
            {locations.map(location => (
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
            <h4>Bussiness</h4>
            {bussinessCategories.map(bussiness => (
              <label key={bussiness} className={styles['checkbox-container']}>
                {bussiness}
                <input
                  type="checkbox"
                  checked={selectedBussiness.includes(bussiness.toLowerCase())}
                  onChange={() => handleBussinessChange(bussiness)}
                />
                <span className={styles.checkmark}></span>
              </label>
            ))}
          </div>
        </div>
        <div className={styles['products']}>
          <h3>{`${producersCount} producers`}</h3>
          <div className={styles['products-container']}>{producersContent}</div>
        </div>
      </div>
      <FadeIn>
        <Ad1 />
      </FadeIn>
    </Fragment>
  );
}