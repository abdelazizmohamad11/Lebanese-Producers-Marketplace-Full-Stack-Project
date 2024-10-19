import React, { Fragment, useContext, useState } from 'react'
import styles from './Nav.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/auth-context';
import Logo from '../Components/UI/Logo';
import SearchFilter from '../Components/SearchFilter/SearchFilter';
const Nav = (props) => {
    const [filterShown,setFilterShown]=useState(false);
    const navigate = useNavigate();
    const productsClickedHandler = (e) => {
        navigate('/products')
    }
    const producersClickedHandler = (e) => {
        navigate('/producers')
    }
    const aboutClickedHandler = (e) => {
        navigate('/about')
    }
    const contactClickedHandler = (e) => {
        navigate('/contact')
    }

    const onClickRegister = () => {
        navigate("/register")
    }
    const goToHomeHandler = () => {
        navigate("/")
    }
    const goToEditProfile = () => {
        navigate("/edit-profile/" + currentUser.name)
    }
    const showFilterHandler=()=>{
        setFilterShown(true);
    }
    const hideFilterHandler=()=>{
        setFilterShown(false);
    }

    const { currentUser } = useContext(AuthContext);
    return (
        <Fragment>
            {filterShown&&<SearchFilter onClose={hideFilterHandler}/>}
            <nav class={styles.navbar}>
                <Logo onClick={goToHomeHandler} />
                <ul className={styles['navbar-links']}>
                    <li onClick={productsClickedHandler} >
                        <div>PRODUCTS</div>
                        {/* <i class="fa fa-angle-down" ></i> */}
                    </li>
                    <li onClick={producersClickedHandler}>
                        <div>PRODUCERS</div>
                        {/* <i class="fa fa-angle-down" ></i> */}
                    </li>
                    <li onClick={aboutClickedHandler}>
                        <div>ABOUT</div>
                        {/* <i class="fa fa-angle-down" ></i> */}
                    </li>
                    <li onClick={contactClickedHandler} >
                        <div>CONTACT</div>
                        {/* <i class="fa fa-angle-down" ></i> */}
                    </li>
                    {currentUser ?
                        <Fragment>
                            <div className={styles['drop-down']} data-dropdown>
                                {/* <Button class="nav-button" data-dropdown-button>Information</Button> */}
                                <li className={styles.profile} onClick={goToEditProfile}>{currentUser.name[0].toUpperCase()}</li>
                                <div className={`${styles['drop-down-menu']} ${styles['information-grid']}`}>
                                    <Link to={"/edit-profile/" + currentUser.name} className={styles['edit-profile-link']}>
                                        Edit Profile
                                    </Link>
                                    {currentUser.role === 'producer' ? <Link to={`/products/${currentUser.name}_${currentUser.user_id}`}>My Products
                                    </Link> : null}
                                    <Link className={styles['myfavorites-link']} to={`/users/${currentUser.name}/my-favorites`}>
                                        <i class="fa-regular fa-heart"></i><p>My Favorites</p>
                                    </Link>


                                </div>
                            </div>
                            <li onClick={props.onLogOut}><div>LOGOUT</div></li>
                        </Fragment>
                        : <li onClick={onClickRegister}>
                            <div>REGISTER</div>
                        </li>}
                    <li className={styles.search} onClick={showFilterHandler}>
                        <i class="fa-solid fa-magnifying-glass"></i>
                    </li>
                </ul>

            </nav>
        </Fragment>
    )
}

export default Nav