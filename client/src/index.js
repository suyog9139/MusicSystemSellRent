import React from 'react';
import ReactDOM from 'react-dom/client';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import RequiredAuth from './pages/RequiredAuth'
import ResponsiveDrawer from './pages/admin/Dashboard';
import AddProduct from './pages/admin/AddProduct';
import DeleteProduct from './pages/admin/DeleteProduct';
import UpdateProduct from './pages/admin/UpdateProduct';
import Orders from './pages/admin/Orders';
import Customers from './pages/admin/Users.js';


import { Home, Product, Products, AboutPage, ContactPage, Cart, Login, Register, Checkout, PageNotFound, PaymentSuccess } from "./pages"

const root = ReactDOM.createRoot(document.getElementById('root'));
const auth = JSON.parse(localStorage.getItem("user"));

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <Routes>
        {/* <Route element={<RequiredAuth/>}/> */}
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Products />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/paymentsuccess" element={< PaymentSuccess/>} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="/product/*" element={<PageNotFound />} />

        <Route path="/admin" element={<ResponsiveDrawer />} />
        <Route  path='/AddProduct' element={<AddProduct/>}></Route>
        <Route  path='/DeleteProduct' element={<DeleteProduct/>}></Route>
        <Route  path='/UpdateProduct' element={<UpdateProduct/>}></Route>
        <Route  path='/Orders' element={<Orders/>}></Route>
        <Route  path='/Customers' element={<Customers/>}></Route>
      </Routes>
    </Provider>
  </BrowserRouter>
);