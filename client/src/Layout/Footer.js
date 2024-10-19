import Button from '../Components/UI/Button';
import Logo from '../Components/UI/Logo';
import styles from './Footer.module.css'
const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.grid}>
                <div className={styles.row1}>
                    <div className={styles.col}>
                        <div className={styles['col-title']}>Company</div>
                        <ul>
                            <li>Team</li>
                            <li>About Us</li>
                            <li>Careers</li>
                            <li>Blog</li>
                        </ul>
                    </div>
                    <div className={styles.col}>
                        <div className={styles['col-title']}>Get Help</div>
                        <ul>
                            <li>Help Center</li>
                            <li>Contact Us</li>
                            <li>Login</li>
                        </ul>
                    </div>
                    <div className={styles.col}>
                        <div className={styles['col-title']}>Engage</div>
                        <ul>
                            <li>Become a Producer</li>
                            <li>Become a Consumer</li>
                            <li>Find Products</li>
                            <li>Find Farmers</li>
                        </ul>
                    </div>
                    <div className={styles.col}>
                        <div className={styles['col-title']}>How It Works</div>
                        <ul>
                            <li>FAQ</li>
                            <li>How To Sell</li>
                            <li>How To Buy</li>
                        </ul>
                    </div>
                </div>
                <div className={styles.row2}>
                   <Logo/>
                    <div className={styles['subscribe']}>
                        <label htmlFor='email'>Sign Up For Newsletter</label> 
                        <input id='email' type='email' name='email' placeholder='Your Email Address'/>
                        <Button>Subsribe</Button>
                    </div>
                    <div className={styles['follow-us']}>
                        <p>Follow Us</p>
                        <div className={styles['follow-us-logos']}>
                        <i class="fa-brands fa-instagram"></i>
                        <i class="fa-brands fa-facebook"></i>
                        <i class="fa-brands fa-twitter"></i>
                        </div>
                    </div>
                </div>
                <div className={styles.row3}>
                    <a href='#'>Terms & Conditions and Privacy Policy</a>
                    <p>© 2023 all copy right reserved | Abdel Aziz Mouhamad</p>
                </div>
            </div>
        </footer>
    )
}
export default Footer;