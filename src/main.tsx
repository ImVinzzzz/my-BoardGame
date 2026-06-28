import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import App from './App';
import './index.css';

// Aggiungiamo i set di icone alla libreria globale
library.add(fas, far, fab);

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Elemento #root non trovato in index.html');
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);
