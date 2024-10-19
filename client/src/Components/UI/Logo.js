import React from 'react'
import styles from './Logo.module.css'
const Logo = (props) => {
    return (
        <div class={styles.logo} onClick={props.onClick}>
            <div>
                <p>Producers</p>
                <p>Planet</p>
            </div>
            <div className={styles.line}>
            </div>
            <img width="53" height="53" src="https://img.icons8.com/external-vectorslab-outline-color-vectorslab/53/external-5-space-and-planets-vectorslab-outline-color-vectorslab.png" alt="external-5-space-and-planets-vectorslab-outline-color-vectorslab" />

        </div>
    )
}

export default Logo;