import React from 'react';

import './style.css';

import Header from './components/header';
import Footer from './components/footer';

import Routes from './routes';

import { toast } from 'react-toastify';

toast.configure({
  autoClose: 5000,
  hideProgressBar: true,
  pauseOnHover: false
});

export default () => (
  <div className="App">
    <Header />
    <div className="components"><Routes /></div>
    <Footer />
  </div>
);