import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import Input from './page/Input';
import Start from './page/Start';
import Result from './page/Result';
import PreInput from './page/PreInput';
import Header from './component/Header';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/PreInput" element={<PreInput />} />
        <Route path="/Input" element={<Input />} />
        <Route path="/Result" element={<Result />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
