import React from 'react'
import styles from './Ad1.module.css'
import Button from '../UI/Button.js'
export default function Ad1() {
    return (
        <div className={styles.container}>
                <div className={styles.image}></div>
                <div className={styles.content}>
                    <h2>
                        Unlock wholesale opportunities by connecting directly with producers through our platform
                    </h2>
                    <p>We're here to facilitate seamless connections, ensuring your bulk buying experience is efficient and direct.</p>
                    <Button>Launch Resourcing</Button>
                </div>
        </div>
    )
}
