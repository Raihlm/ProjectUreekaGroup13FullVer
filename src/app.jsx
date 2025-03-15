import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Homepage, Login, Signup } from './Components/AuthPages'; 
import Pengukuran from './components/Pengukuran';
import Hasil from './components/Hasil';
import History from './components/History';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/pengukuran" element={<Pengukuran />} />
      <Route path="/hasil" element={<Hasil />} />
      <Route path="/history" element={<History />} />
    </Routes>
  );
}
