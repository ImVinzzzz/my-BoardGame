import type { ReactElement } from 'react';

/**
 * Footer mostrato in calce a ogni pagina. Viene renderizzato in App.tsx,
 * fuori dalle <Routes> ma dentro <BrowserRouter>, così appare su ogni
 * pagina senza doverlo ripetere in Home.tsx e BoardGameDetail.tsx.
 */
export default function Footer(): ReactElement {
  return (
    <footer className="border-t border-[#23405C] bg-[#081320] px-6 py-6 text-center text-xs text-[#6B829B]">
      <p>
        Sito amatoriale senza fini di lucro. Non si intende infrangere alcun copyright.
        Tutti i marchi registrati appartengono ai relativi proprietari.
      </p>
    </footer>
  );
}
