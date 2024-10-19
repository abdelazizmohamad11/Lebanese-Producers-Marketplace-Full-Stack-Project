// AboutPage.js
import React, { Fragment, useContext } from 'react';
import styles from './About.module.css';
import Button from '../../Components/UI/Button';
import productimg from '../../Assets/product_icon.jpg';
import producerimg from '../../Assets/producer_icon.jpg';
import countriesimg from '../../Assets/countries_icon.jpg';
import categoriesimg from '../../Assets/categories_icon.jpg';
import { ProductsContext } from '../../context/products';
import { ProducersContext } from '../../context/producers';
import LoadingPage from '../LoadingPage/LoadingPage';
import earnIncomeImage from '../../Assets/earnIncomeImage.jpg';
import connectImage from '../../Assets/connectImage.jpg';
import informedChoicesImage from '../../Assets/informedChoicesImage.jpg';
import FadeIn from '../../Components/FadeIn/FadeIn';
import { useNavigate } from 'react-router-dom';
const About = () => {
    const navigate=useNavigate();
    const { products, isLoading: isLoadingProducts, categories, isLoadingCategories, origins, isLoadingOrigins } = useContext(ProductsContext);
    const { producers, isLoading: isLoadingProducers } = useContext(ProducersContext);
    if (isLoadingProducts || isLoadingProducers || isLoadingOrigins || isLoadingCategories)
        return (<LoadingPage />)

    return (
        <Fragment>
            <div className={styles.headerBackground}></div>
            <FadeIn>
                <div className={styles.intro}>
                    <h2> At Producers Planet, we believe in more than just transactions</h2>
                    <h2>we believe in fostering meaningful connections.</h2>
                    <h2>Our platform is designed to empower the relationship between buyers and sellers</h2>
                </div>
            </FadeIn>
            <FadeIn>
                <div className={styles.stats}>
                    <h2 className={styles.title}>Our Community Now</h2>
                    <div className={styles.container}>
                        <div className={styles['stat-count']}>
                            <img src={productimg} alt='' />
                            <div className={styles.count}>{products.length}</div>
                            <div className={styles.type}>Products</div>
                        </div>
                        <div className={styles['stat-count']}>
                            <img src={producerimg} alt='' />
                            <div className={styles.count}>{producers.length}</div>
                            <div className={styles.type}>Producers</div>
                        </div>
                        <div className={styles['stat-count']}>
                            <img src={countriesimg} alt='' />
                            <div className={styles.count}>{origins.length}</div>
                            <div className={styles.type}>Origins</div>
                        </div>
                        <div className={styles['stat-count']}>
                            <img src={categoriesimg} alt='' />
                            <div className={styles.count}>{categories.length}</div>
                            <div className={styles.type}>Products Categories</div>
                        </div>
                    </div>
                </div>
            </FadeIn>
            <section className={styles.section}>
                <FadeIn>
                    <h2 className={styles.title}>Transforming Agriculture for a Sustainable Tomorrow</h2>
                    <p className={styles.description}>
                        Embracing the future of agriculture means supporting farmers and artisans, creating a resilient ecosystem that empowers communities. At Producers Planet, we envision a thriving agricultural system where everyone plays a crucial role.
                    </p>
                    <div className={styles.featuredGrid}>
                        {/* Feature 1 */}
                        <div className={styles.feature}>
                            <img src={earnIncomeImage} alt="Earn a Living Income" className={styles.featureImage} />
                            <h2>Earn a Living Income</h2>
                            <p>Empower resilient communities and ecosystems by ensuring sellers earn a fair and sustainable income.</p>
                        </div>

                        {/* Feature 2 */}
                        <div className={styles.feature}>
                            <img src={connectImage} alt="Connect Directly" className={styles.featureImage} />
                            <h2>Connect Directly</h2>
                            <p>Bridging the gap between source and consumer, our platform enables buyers to connect directly with farmers and makers.</p>
                        </div>

                        {/* Feature 3 */}
                        <div className={styles.feature}>
                            <img src={informedChoicesImage} alt="Informed Choices" className={styles.featureImage} />
                            <h2>Informed Choices</h2>
                            <p>Empower consumers by sharing sellers' stories, allowing them to make informed choices about their purchases.</p>
                        </div>
                    </div>
                </FadeIn>

                <FadeIn>
                    <p className={styles.visionStatement}>
                        At Producers Market, we believe in cultivating an agricultural system rooted in uplifting farmers and makers. Our innovative marketplace platform integrates the best of farming, processing, and packing with cutting-edge digital technology to facilitate transparent and enriching transactions.
                    </p>

                    <div className={styles.valuePropositions}>
                        {/* Value Proposition 1 */}
                        <div className={styles.valueProposition}>
                            <h2>Traceability Tools</h2>
                            <p>Discover the source of the products you purchase through our platform's traceability tools.</p>
                        </div>

                        {/* Value Proposition 2 */}
                        <div className={styles.valueProposition}>
                            <h2>Smart Value Chain</h2>
                            <p>Digitizing contracts and transactions reduces costs, minimizes waste, and sets high standards for transparency.</p>
                        </div>

                        {/* Value Proposition 3 */}
                        <div className={styles.valueProposition}>
                            <h2>Global Community</h2>
                            <p>Join our growing network of trusted sellers and buyers who trade goods and share knowledge within a supportive community.</p>
                        </div>

                        {/* Value Proposition 4 */}
                        <div className={styles.valueProposition}>
                            <h2>Digital Platform</h2>
                            <p>Our innovative marketplace utilizes value chain data, providing traceability, data, and media to strengthen B2B sales channels.</p>
                        </div>
                    </div>
                </FadeIn>
                <div className={styles.contact}>
                    <h2 className={styles.title}>If You Have Any QuestionsFeel Free To Contact Us</h2>
                    <Button onClick={()=>{navigate('/contact')}}>Contact</Button>
                </div>
            </section>
        </Fragment>
    );
};

export default About;