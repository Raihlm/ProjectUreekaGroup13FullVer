import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import './indexHasil.css'; 
import './indexHistory.css'

import App from './app'; 

const root = createRoot(document.getElementById('root'));

root.render(
  <StrictMode>
    <Router>
      <App />
    </Router>
  </StrictMode>
);