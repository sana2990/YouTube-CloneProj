import { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import VideoPage from './pages/VideoPage';
import './App.css';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
       <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/login" element={<LoginPage />} />

        <Route path="/register" element={<RegisterPage />} />

        <Route path="/video/:id" element={<VideoPage />} />
  
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
