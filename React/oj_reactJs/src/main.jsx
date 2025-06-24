import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css';
import 'flowbite';

createRoot(document.getElementById('root')).render( 
  <BrowserRouter>
      <App />
  </BrowserRouter>
)
