import React, { useEffect, useState } from 'react';
import styles from './DisplayMessage.module.css';

const DisplayMessage = ({ type, message ,reset}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      reset();
      setIsVisible(false);
    }, 5000);

    return () => clearTimeout(timeout);
  }, []);

  return isVisible ? (
    <div
      className={`${styles.displayMessage} ${
        type === 'error'
          ? styles.error
          : type === 'success'
          ? styles.success
          : styles.warning
      }`}
    >
      {message}
    </div>
  ) : null;
};

export default DisplayMessage;