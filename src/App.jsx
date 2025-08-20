import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./screens/Home"
import { Routes, Route, BrowserRouter } from "react-router-dom"
import Login from './screens/Login';
import Signup from './screens/Signup';
import CartProvider from "../src/components/ContextReducer"
import Cart from "./screens/Cart"
import MyOrder from "./screens/MyOrder"





function App() {
  const [darkMode] = useState(true);
  useEffect(() => {
    document.documentElement.setAttribute('data-bs-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);
  return (
    <div>

      <BrowserRouter>
        <CartProvider>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/SignUp" element={<Signup />}></Route>
            <Route path="/myOrderData" element={<MyOrder />}></Route>
            
            
          </Routes>
        </CartProvider>
      </BrowserRouter>



    </div>







  );
}

export default App;


