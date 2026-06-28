import type { ReactElement } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faDiceSix,
  faAnglesLeft,
  faHeart,
  faUpRightFromSquare,
  faThumbsUp,
  faThumbsDown,
  faFeatherPointed
} from '@fortawesome/free-solid-svg-icons';
import { boardgames } from '../data/boardgame';
import Tag from '../components/Tag';
import StarRating from '../components/StarRating';
import DownloadButton from '../components/DownloadButton';
import { parseIconString } from '../utils/icon';

interface MetaItem {
  icon: string;
  label: string;
}

/**
 * Scheda di dettaglio di un singolo gioco da tavolo.
 *
 * Richiede react-router-dom con una route del tipo:
 *   <Route path="/gioco/:slug" element={<BoardGameDetail />} />
 * (vedi anche il Link in `components/BoardGameCard.tsx`, che punta a questo path).
 */
export default function BoardGameDetail(): ReactElement {
  const { slug } = useParams<{ slug: string }>();
  const game = boardgames.find((item) => item.slug === slug);

  if (!game) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#0B1E33] px-6 text-center text-[#EAF0F6]">
        <FontAwesomeIcon icon={faDiceSix} className="text-4xl text-[#FF7A29]" />
        <h1 className="font-display text-2xl font-semibold">Gioco non trovato</h1>
        <p className="text-[#9FB3C8]">
          Questo gioco non esiste, o non è ancora stato archiviato.
        </p>
        <Link
          to="/"
          className="mt-2 inline-flex items-center gap-2 rounded-full bg-[#FF7A29] px-5 py-2 text-sm font-semibold text-[#081320] transition hover:bg-[#FFB066]"
        >
          <FontAwesomeIcon icon={faAnglesLeft} />
          Torna all&apos;archivio
        </Link>
      </div>
    );
  }

  const metaItems: MetaItem[] = [
    game.playerCount && { icon: 'fa-solid fa-users', label: game.playerCount },
    game.duration && { icon: 'fa-solid fa-hourglass-half', label: game.duration },
    game.ageRange && { icon: 'fa-solid fa-cake-candles', label: `Età: ${game.ageRange}` },
    {
      icon: game.played ? 'fa-solid fa-check-circle' : 'fa-solid fa-circle-question',
      label: game.played ? 'Già giocato' : 'Da giocare',
    },
  ].filter((item): item is MetaItem => Boolean(item));

  return (
    <div className="min-h-screen bg-[#0B1E33] text-[#EAF0F6]">
      {/* Hero con immagine di copertina */}
      <div className="relative h-64 w-full overflow-hidden sm:h-80 md:h-96">
        <img
          src={game.coverImageUrl}
          alt={`Copertina di ${game.title}`}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1E33] via-[#0B1E33]/70 to-transparent" />

        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-6xl px-6 pb-8">
          <Link
            to="/"
            className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-[#C3D1DE] hover:text-[#FFB066]"
          >
            <FontAwesomeIcon icon={faAnglesLeft} />
            Torna all&apos;archivio
          </Link>
          <h1 className="font-display text-3xl font-semibold sm:text-4xl md:text-5xl">
            {game.title}
          </h1>
          <p className="mt-2 text-base italic text-[#C3D1DE] sm:text-lg">{game.subtitle}</p>
          {game.favorite && (
            <div className="mt-3">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FF3D81]/90 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-white shadow-md">
                <FontAwesomeIcon icon={faHeart} className="text-xs" />
                Preferito
              </span>
            </div>
          )}
        </div>
      </div>

      <main className="mx-auto max-w-6xl px-6 py-10 sm:py-14">
        {/* Tag, valutazione e link esterno */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <Tag label={game.type} variant="type" />
            {game.genres.map((genre) => (
              <Tag key={genre} label={genre} variant="genre" />
            ))}
            <StarRating rating={game.rating} size="text-base" />
          </div>

          {game.officialUrl && (
            <a
              href={game.officialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-[#FF7A29]/40 px-4 py-2 text-sm font-semibold text-[#FFB066] transition hover:border-[#FF7A29] hover:bg-[#FF7A29]/10"
            >
              Pagina ufficiale
              <FontAwesomeIcon icon={faUpRightFromSquare} className="text-xs" />
            </a>
          )}
        </div>

        <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[2fr_1fr]">
          {/* Descrizione e sinossi */}
          <section>
            <h2 className="font-display text-xl font-semibold text-[#EAF0F6]">Descrizione</h2>
            <p className="mt-3 leading-relaxed text-[#C3D1DE]">{game.description}</p>
            {game.synopsis && (
              <>
                <h2 className="mt-8 font-display text-xl font-semibold text-[#EAF0F6]">Altro</h2>
                <p className="mt-3 leading-relaxed text-[#C3D1DE]">{game.synopsis}</p>
              </>
            )}

            {(game.pros || game.cons) && (
              <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
                {game.pros && (
                  <div className="rounded-xl border border-green-500/30 bg-green-500/5 p-5">
                    <h3 className="flex items-center gap-2 font-display text-lg font-semibold text-[#EAF0F6]">
                      <FontAwesomeIcon icon={faThumbsUp} className="text-green-500" />
                      PRO
                    </h3>
                    <p className="mt-3 whitespace-pre-line leading-relaxed text-[#C3D1DE]">{game.pros}</p>
                  </div>
                )}
                {game.cons && (
                  <div className="rounded-xl border border-red-500/30 bg-red-500/5 p-5">
                    <h3 className="flex items-center gap-2 font-display text-lg font-semibold text-[#EAF0F6]">
                      <FontAwesomeIcon icon={faThumbsDown} className="text-red-500" />
                      CONTRO
                    </h3>
                    <p className="mt-3 whitespace-pre-line leading-relaxed text-[#C3D1DE]">{game.cons}</p>
                  </div>
                )}
              </div>
            )}
          </section>

          {/* Scheda rapida */}
          <aside className="rounded-xl border border-[#23405C] bg-[#13263D] p-5 h-fit">
            <h2 className="font-display text-base font-semibold text-[#EAF0F6]">Scheda rapida</h2>
            <ul className="mt-4 flex flex-col gap-3">
              {metaItems.map((item) => (
                <li key={item.label} className="flex items-center gap-3 text-sm text-[#C3D1DE]">
                  <FontAwesomeIcon icon={parseIconString(item.icon)} className="w-4 text-[#FF7A29]" />
                  {item.label}
                </li>
              ))}
            </ul>
          </aside>
        </div>

        {/* Note: box facoltativo, mostrato solo se c'è qualcosa da segnalare */}
        {game.notes && (
          <section className="mt-10 rounded-xl border border-dashed border-[#FF7A29]/40 bg-[#13263D] p-5">
            <h2 className="flex items-center gap-2 font-display text-lg font-semibold text-[#EAF0F6]">
              <FontAwesomeIcon icon={faFeatherPointed} className="text-[#FF7A29]" />
              Note
            </h2>
            <p className="mt-3 whitespace-pre-line leading-relaxed text-[#C3D1DE]">{game.notes}</p>
          </section>
        )}

        {/* Sezione Download */}
        {game.downloads && game.downloads.length > 0 && (
          <section className="mt-12">
            <h2 className="font-display text-xl font-semibold text-[#EAF0F6]">Da scaricare</h2>
            <p className="mt-1 text-sm text-[#9FB3C8]">
              Il regolamento e gli eventuali materiali extra di questo gioco.
            </p>
            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {game.downloads.map((resource) => (
                <DownloadButton key={resource.id} resource={resource} />
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
