import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

// Import Bootstrap CSS and our custom design system
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import './App.css';

import App from './App';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
