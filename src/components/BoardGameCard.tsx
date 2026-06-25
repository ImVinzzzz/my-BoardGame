import type { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import type { BoardGame } from '../types';
import Tag from './Tag';
import StarRating from './StarRating';

interface BoardGameCardProps {
  game: BoardGame;
}

/** Icona del "sigillo" mostrato sopra la copertina, in base alla tipologia di gioco. */
const TYPE_SEAL_ICONS: Record<string, string> = {
  Competitivo: 'fa-solid fa-award',
  Cooperativo: 'fa-solid fa-users',
  'Party Game': 'fa-solid fa-masks-theater',
  Filler: 'fa-solid fa-stopwatch',
  Astratto: 'fa-solid fa-cube',
  Strategico: 'fa-solid fa-chess-knight',
  German: 'fa-solid fa-warehouse',
};

function getSealIcon(type: string): string {
  return TYPE_SEAL_ICONS[type] ?? 'fa-solid fa-dice-six';
}

/**
 * Card mostrata nella griglia della home. Riporta a `/gioco/:slug`.
 * Richiede `react-router-dom` con una route configurata su quel path
 * (vedi il commento in fondo a `pages/BoardGameDetail.tsx`).
 */
export default function BoardGameCard({ game }: BoardGameCardProps): ReactElement {
  const visibleGenres = game.genres.slice(0, 2);
  const extraGenresCount = game.genres.length - visibleGenres.length;

  return (
    <Link
      to={`/gioco/${game.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl bg-[#13263D] ring-1 ring-[#23405C] transition-all duration-200 hover:-translate-y-1 hover:ring-[#FF7A29]/50 hover:shadow-xl hover:shadow-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF7A29]"
    >
      {/* Copertina */}
      <div className="relative h-44 w-full overflow-hidden sm:h-48">
        <img
          src={game.coverImageUrl}
          alt={`Copertina di ${game.title}`}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#081320] via-[#081320]/10 to-transparent" />

        {game.favorite && (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-[#FF3D81]/90 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-md">
            <i className="fa-solid fa-heart text-[0.65rem]" aria-hidden="true" />
            Preferito
          </span>
        )}

        {/* Sigillo con l'icona della tipologia di gioco */}
        <div className="absolute right-3 top-3 flex h-11 w-11 items-center justify-center rounded-full bg-[#081320]/80 text-[#FFB066] shadow-md ring-2 ring-[#FF7A29]/70 backdrop-blur-sm">
          <i className={`${getSealIcon(game.type)} text-base`} aria-hidden="true" />
        </div>
      </div>

      {/* Contenuto testuale */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <h3 className="font-display text-lg font-semibold leading-snug text-[#EAF0F6] group-hover:text-white">
            {game.title}
          </h3>
          <p className="mt-1 text-sm italic text-[#9FB3C8]">{game.subtitle}</p>
        </div>

        {/* line-clamp è incluso di default da Tailwind v3.3+; su versioni
            precedenti serve il plugin @tailwindcss/line-clamp */}
        <p className="line-clamp-3 text-sm leading-relaxed text-[#C3D1DE]">{game.description}</p>

        <div className="flex flex-wrap items-center gap-2">
          <Tag label={game.type} variant="type" />
          {visibleGenres.map((genre) => (
            <Tag key={genre} label={genre} variant="genre" />
          ))}
          {extraGenresCount > 0 && (
            <span className="text-xs font-medium text-[#6B829B]">+{extraGenresCount}</span>
          )}
        </div>

        <div className="mt-auto flex items-center justify-between pt-2">
          <StarRating rating={game.rating} />
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#FF7A29] transition-transform group-hover:translate-x-0.5">
            Scopri il gioco
            <i className="fa-solid fa-arrow-right text-xs" aria-hidden="true" />
          </span>
        </div>
      </div>
    </Link>
  );
}
