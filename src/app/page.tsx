'use client'
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import EscolhaPerfil from './components/EscolhaPerfil';
import DashboardADM from './components/DashboardADM';

const App = () => {
  return (
    <BrowserRouter>

<Routes>
  <Route path="/" element={<Navigate to="/home" />} />
  <Route path="/home" element={<EscolhaPerfil />} />
  <Route path="/dashboard" element={<DashboardADM />} />
</Routes>

    </BrowserRouter>
  );
};

export default App;
