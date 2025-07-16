import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import ReactGA from 'react-ga4';

// ✅ 1. Initialize Google Analytics (replace with your actual GA4 ID)
ReactGA.initialize("G-RVKGN2VM0C");

// ✅ 2. Track initial page view
ReactGA.send({ hitType: "pageview", page: window.location.pathname });

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);