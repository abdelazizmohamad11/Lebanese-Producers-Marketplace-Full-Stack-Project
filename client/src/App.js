import { Fragment } from "react";
import SignInUp from "./Pages/SignInUp/SignInUp";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from "./Layout/Layout";
import Home from "./Pages/Home/HomePage";
import ErrorPage from "./Pages/ErrorPage/ErrorPage";
import EditProfile from "./Pages/Edit-Profile/Edit-Profile";
import PrivateRoutes from "./PrivateRoute/PrivateRoutes";
import Products from "./Pages/ProductsPage/Products";
import Producers from "./Pages/ProducersPage/Producers";
import Producer from "./Pages/ProducerPage/Producer";
import Product from "./Pages/ProductPage/Product";
import AddProduct from "./Pages/AddProductPage/AddProduct";
import MyProducts from "./Pages/MyProductsPage/MyProducts";
import EditProduct from "./Pages/EditProductPage/EditProduct";
import PrivateEdit from "./PrivateRoute/PrivateEdit";
import MyFavorites from "./Pages/MyFavoritesPage/MyFavorites";
import About from "./Pages/AboutPage/About";
import Contact from "./Pages/ContactPage/Contact";
function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path='/' element={<Home />} exact />
          <Route path="/register" element={<SignInUp />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/edit-profile/:username" element={<EditProfile />} />
            <Route path="/users/:username/my-favorites" element={<MyFavorites/>}/>
          </Route>
          <Route path="/products" element={<Products />} exact />
          <Route path="/producers" element={<Producers />} exact />
          <Route path="/producer/:username_id" element={<Producer />} exact />
          <Route path="/product/:productname_id" element={<Product />} exact />
          <Route path="/products/:username_id/add-product" element={<AddProduct />} exact />
          <Route path="/products/:username_id" element={<MyProducts />} exact />
          <Route element={<PrivateEdit />}>
            <Route path="/products/edit-product/:product_id" element={<EditProduct />} />
          </Route>
          <Route path="/about" element={<About/>}/>
          <Route path="/contact" element={<Contact/>}/>
          <Route path="/*" element={<ErrorPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
