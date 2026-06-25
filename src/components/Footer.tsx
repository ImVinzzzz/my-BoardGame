import type { ReactElement } from 'react';

/**
 * Footer mostrato in calce a ogni pagina. Viene renderizzato in App.tsx,
 * fuori dalle <Routes> ma dentro <BrowserRouter>, così appare su ogni
 * pagina senza doverlo ripetere in Home.tsx e BoardGameDetail.tsx.
 */
export default function Footer(): ReactElement {
  return (
    <footer className="border-t border-[#23405C] bg-[#081320] px-6 py-6 text-center text-xs text-[#6B829B]">
      <p className="mb-2">
        Sito amatoriale senza fini di lucro. Non si intende infrangere alcun copyright.
        Tutti i marchi registrati appartengono ai relativi proprietari.
      </p>
      <p>
        <a
          href="https://my-rpg-adventures.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 hover:text-[#38bdf8] transition-colors"
        >
          <i className="fa-solid fa-dungeon"></i>
          <span>Le Cronache di Wyatt Zephirion</span>
        </a>
      </p>
    </footer>
  );
}
