import React, { useState, useEffect } from "react";
import "./App.css";
import {
  Home,
  AddPost,
  EditPost,
  AccountPage,
  DetailPosting,
  LoginPage,
  RegisterPage,
  EditAccount,
  AccountPageUser,
  Search,
  EditComment
} from "./pages/index";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NavbarComponents } from "./components/index";
import { login } from "./utils/constant";

//const login = localStorage.getItem("token_for_access");

function App() {
  return (
    <div className="App">
      {login ? (
        <BrowserRouter>
          <NavbarComponents />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/posts/add" element={<AddPost />} />
            <Route path="/account/posts/edit/:id" element={<EditPost />} />
            <Route path="/comments/edit/:id" element={<EditComment />} />
            <Route path="/account/edit" element={<EditAccount />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/users/account/:id" element={<AccountPageUser />} />
            <Route path="/posts/detail/:id" element={<DetailPosting />} />
            <Route path="/search" element={<Search />} />
          </Routes>
        </BrowserRouter>
      ) : (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
