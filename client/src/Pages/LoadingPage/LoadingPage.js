import styles from './LoadingPage.module.css'
import React from 'react'

export default function LoadingPage() {
    return (
        <div className={styles['loader-container']}>
            <div className={styles['loader']}></div>
        </div>
    )
}
