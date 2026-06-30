import type { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDungeon, faWrench } from '@fortawesome/free-solid-svg-icons';

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
      <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
        <p>
          Guarda anche &nbsp;
          <a
            href="https://my-rpg-adventures.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 hover:text-[#38bdf8] transition-colors"
          >
            <FontAwesomeIcon icon={faDungeon} />
            <span>Le Cronache di Wyatt Zephirion</span>
          </a>
        </p>
        <span className="hidden sm:inline text-[#23405C]">|</span>
        <p>
          Area Gestione &nbsp;
          <Link
            to="/editor"
            className="inline-flex items-center gap-1.5 hover:text-[#FF7A29] transition-colors"
          >
            <FontAwesomeIcon icon={faWrench} />
            <span>Generatore Scheda</span>
          </Link>
        </p>
      </div>
    </footer>
  );
}
