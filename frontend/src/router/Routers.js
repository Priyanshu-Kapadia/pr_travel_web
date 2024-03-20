import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./../pages/Home";
import Tours from "./../pages/Tours";
import TourDetails from "./../pages/TourDetails";
import Login from "./../pages/Login";
import Register from "./../pages/Register";
import SearchResultList from "./../pages/SearchResultList";
import ThankYou from "../pages/ThankYou";

import UserList from "../pages/Admin/pages/userList/UserList";
import User from "../pages/Admin/pages/user/User";
import NewUser from "../pages/Admin/pages/newUser/NewUser";
import ProductList from "../pages/Admin/pages/productList/ProductList";
import Product from "../pages/Admin/pages/product/Product";
import NewProduct from "../pages/Admin/pages/newProduct/NewProduct";
import AdminHome from "../pages/Admin/pages/home/AdminHome";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/tours" element={<Tours />} />
      <Route path="/tours/:id" element={<TourDetails />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/thank-you" element={<ThankYou />} />
      <Route path="/tours/search" element={<SearchResultList />} />
      <Route exact path="/admin" element={<AdminHome />} />
      <Route path="/admin/users" element={<UserList />} />
      <Route path="/admin/user/:userId" element={<User />} />
      <Route path="/admin/newUser" element={<NewUser />} />
      <Route path="/admin/products" element={<ProductList />} />
      <Route path="/admin/product/:productId" element={<Product />} />
      <Route path="/admin/newproduct" element={<NewProduct />} />
    </Routes>
  );
};

export default Routers;
