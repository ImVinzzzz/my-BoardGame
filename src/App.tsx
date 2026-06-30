import type { ReactElement } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import BoardGameDetail from './pages/BoardGameDetail';
import BoardGameEditor from './pages/BoardGameEditor';
import Footer from './components/Footer';
import ScrollToTopButton from './components/ScrollToTopButton';

/**
 * Componente radice dell'app: configura il routing tra la home
 * (griglia + filtri dei giochi) e la scheda di dettaglio di ciascun gioco.
 *
 * Richiede react-router-dom:
 *   npm install react-router-dom
 *
 * Il link FontAwesome e i Google Fonts vanno inseriti nell'<head> di
 * index.html, non qui (vedi index.html).
 */
export default function App(): ReactElement {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gioco/:slug" element={<BoardGameDetail />} />
        <Route path="/editor" element={<BoardGameEditor />} />
        {/* Qualsiasi path non riconosciuto riporta in home */}
        <Route path="*" element={<Home />} />
      </Routes>
      <Footer />
      <ScrollToTopButton />
    </BrowserRouter>
  );
}
