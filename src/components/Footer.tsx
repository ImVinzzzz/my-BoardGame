import type { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faDungeon,
  faBook,
  faClipboardQuestion,
  faMagnifyingGlass,
  faGem,
  faSquarePlus,
} from '@fortawesome/free-solid-svg-icons';

/**
 * Footer mostrato in calce a ogni pagina. Viene renderizzato in App.tsx,
 * fuori dalle <Routes> ma dentro <BrowserRouter>, così appare su ogni
 * pagina senza doverlo ripetere in Home.tsx e BoardGameDetail.tsx.
 */
export default function Footer(): ReactElement {
  return (
    <footer className="border-t border-[#23405C] bg-[#081320] px-6 py-8 text-xs text-[#6B829B]">
      <div className="mx-auto max-w-4xl">
        {/* Primo blocco: diviso in due colonne */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left mb-8">
          {/* Colonna di sinistra: Guarda anche */}
          <div className="flex flex-col gap-3">
            <span className="font-semibold uppercase tracking-wider text-[#EAF0F6]">Vedi anche</span>
            <div className="flex flex-col gap-2">
              <a
                href="https://my-rpg-adventures.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-[#38bdf8] transition-colors"
              >
                <FontAwesomeIcon icon={faDungeon} className="w-4 text-center" />
                <span>Le Cronache di Wyatt Zephirion</span>
              </a>
              <a
                href="https://my-book-collection-omega.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-[#38bdf8] transition-colors"
              >
                <FontAwesomeIcon icon={faBook} className="w-4 text-center" />
                <span>La mia Biblioteca</span>
              </a>
              <a
                href="https://myquiz-archive.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-[#38bdf8] transition-colors"
              >
                <FontAwesomeIcon icon={faClipboardQuestion} className="w-4 text-center" />
                <span>I miei Quiz online</span>
              </a>
              <a
                href="https://pine-cove.vercel.app/index.html"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-[#38bdf8] transition-colors"
              >
                <FontAwesomeIcon icon={faMagnifyingGlass} className="w-4 text-center" />
                <span>I Segreti di Pine Cove</span>
              </a>
              <a
                href="https://etherea2.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-[#38bdf8] transition-colors"
              >
                <FontAwesomeIcon icon={faGem} className="w-4 text-center" />
                <span>I Guardiani di Etherea</span>
              </a>
            </div>
          </div>

          {/* Colonna di destra: Area Gestione */}
          <div className="flex flex-col gap-3">
            <span className="font-semibold uppercase tracking-wider text-[#EAF0F6]">Area Gestione</span>
            <div>
              <Link
                to="/editor"
                className="inline-flex items-center gap-2 hover:text-[#FF7A29] transition-colors"
              >
                <FontAwesomeIcon icon={faSquarePlus} className="w-4 text-center" />
                <span>Nuova Scheda</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Secondo blocco: copyright e disclaimer in basso su unico rigo */}
        <div className="border-t border-[#23405C]/60 pt-4 text-center text-[11px] text-[#526a80]">
          <p>
            Sito amatoriale senza fini di lucro. Non si intende infrangere alcun copyright. Tutti i marchi registrati appartengono ai relativi proprietari.
          </p>
        </div>
      </div>
    </footer>
  );
}

