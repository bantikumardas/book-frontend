import './App.css';
import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './home/home';
import Register from './register/register';
import Login from './login/login';
import Donate from './donate/donate';
import Find from './find/find';
import NavigationBar from './asset/components/navbar';
import Contribution from './contribution/contribution';

function App() {
  const [showToast, setShowToast] = useState(false);

  const handleShowToast = () => {
    setShowToast(true);
  };

  const handleCloseToast = () => {
    setShowToast(false);
  };

  return (
    <BrowserRouter>
      <NavigationBar ></NavigationBar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/search" element={<Find />} />
        <Route path="/contribution" element={<Contribution />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
