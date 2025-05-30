'use client'
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import EscolhaPerfil from './components/EscolhaPerfil';


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EscolhaPerfil />} />
        <Route path="/dashboard" element={<DashboardADM />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
