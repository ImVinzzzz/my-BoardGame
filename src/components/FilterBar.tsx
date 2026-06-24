import type { ReactElement } from 'react';
import type { GameType } from '../types';

export type PlayedFilter = 'all' | 'played' | 'unplayed';

interface FilterBarProps {
  /** Tipologie disponibili (categorie fisse) */
  types: GameType[];
  /** Generi disponibili (derivati dai dati) */
  genres: string[];
  /** Tipologia attualmente selezionata; null = "Tutte" */
  selectedType: GameType | null;
  /** Generi attualmente selezionati (selezione multipla, OR tra loro) */
  selectedGenres: string[];
  /** Valutazione minima richiesta; 0 = "Tutte" */
  minRating: number;
  /** Filtro sullo stato "giocato" */
  playedFilter: PlayedFilter;
  onTypeChange: (type: GameType | null) => void;
  onGenreToggle: (genre: string) => void;
  onMinRatingChange: (rating: number) => void;
  onPlayedFilterChange: (value: PlayedFilter) => void;
  onReset: () => void;
}

function chipClasses(active: boolean): string {
  return [
    'inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold tracking-wide transition-colors',
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF7A29] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1E33]',
    active
      ? 'bg-[#FF7A29] text-[#081320]'
      : 'bg-[#13263D] text-[#C3D1DE] ring-1 ring-[#23405C] hover:text-[#EAF0F6] hover:ring-[#FF7A29]/50',
  ].join(' ');
}

const RATING_OPTIONS = [5, 4, 3, 2, 1];

/**
 * Barra dei filtri: tipologia (selezione singola), genere (selezione
 * multipla, in OR tra loro), classificazione minima e stato "giocato"
 * (entrambi a selezione singola). Componente puramente presentazionale:
 * lo stato dei filtri vive in `pages/Home.tsx`.
 */
export default function FilterBar({
  types,
  genres,
  selectedType,
  selectedGenres,
  minRating,
  playedFilter,
  onTypeChange,
  onGenreToggle,
  onMinRatingChange,
  onPlayedFilterChange,
  onReset,
}: FilterBarProps): ReactElement {
  const hasActiveFilters =
    selectedType !== null || selectedGenres.length > 0 || minRating > 0 || playedFilter !== 'all';

  return (
    <div className="flex flex-col gap-5 rounded-xl border border-[#23405C] bg-[#081320] p-5">
      {/* Filtro per tipologia (selezione singola) */}
      <div className="flex flex-col gap-2">
        <span className="text-xs font-semibold uppercase tracking-[0.15em] text-[#6B829B]">
          Tipologia
        </span>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => onTypeChange(null)}
            className={chipClasses(selectedType === null)}
            aria-pressed={selectedType === null}
          >
            <i className="fa-solid fa-layer-group text-[0.7rem]" aria-hidden="true" />
            Tutte
          </button>
          {types.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => onTypeChange(type)}
              className={chipClasses(selectedType === type)}
              aria-pressed={selectedType === type}
            >
              <i className="fa-solid fa-dice text-[0.7rem]" aria-hidden="true" />
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Filtro per genere (selezione multipla) */}
      <div className="flex flex-col gap-2">
        <span className="text-xs font-semibold uppercase tracking-[0.15em] text-[#6B829B]">
          Genere
        </span>
        <div className="flex flex-wrap gap-2">
          {genres.map((genre) => (
            <button
              key={genre}
              type="button"
              onClick={() => onGenreToggle(genre)}
              className={chipClasses(selectedGenres.includes(genre))}
              aria-pressed={selectedGenres.includes(genre)}
            >
              <i className="fa-solid fa-tag text-[0.7rem]" aria-hidden="true" />
              {genre}
            </button>
          ))}
        </div>
      </div>

      {/* Filtro per classificazione minima */}
      <div className="flex flex-col gap-2">
        <span className="text-xs font-semibold uppercase tracking-[0.15em] text-[#6B829B]">
          Classificazione
        </span>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => onMinRatingChange(0)}
            className={chipClasses(minRating === 0)}
            aria-pressed={minRating === 0}
          >
            Tutte
          </button>
          {RATING_OPTIONS.map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => onMinRatingChange(value)}
              className={chipClasses(minRating === value)}
              aria-pressed={minRating === value}
            >
              <i className="fa-solid fa-star text-[0.7rem]" aria-hidden="true" />
              {value}+
            </button>
          ))}
        </div>
      </div>

      {/* Filtro per stato "giocato" */}
      <div className="flex flex-col gap-2">
        <span className="text-xs font-semibold uppercase tracking-[0.15em] text-[#6B829B]">
          Giocato
        </span>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => onPlayedFilterChange('all')}
            className={chipClasses(playedFilter === 'all')}
            aria-pressed={playedFilter === 'all'}
          >
            Tutti
          </button>
          <button
            type="button"
            onClick={() => onPlayedFilterChange('played')}
            className={chipClasses(playedFilter === 'played')}
            aria-pressed={playedFilter === 'played'}
          >
            <i className="fa-solid fa-check text-[0.7rem]" aria-hidden="true" />
            Giocati
          </button>
          <button
            type="button"
            onClick={() => onPlayedFilterChange('unplayed')}
            className={chipClasses(playedFilter === 'unplayed')}
            aria-pressed={playedFilter === 'unplayed'}
          >
            <i className="fa-solid fa-circle-question text-[0.7rem]" aria-hidden="true" />
            Da giocare
          </button>
        </div>
      </div>

      {hasActiveFilters && (
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-1.5 self-start text-xs font-semibold text-[#FF7A29] hover:text-[#FFB066]"
        >
          <i className="fa-solid fa-rotate-left text-[0.7rem]" aria-hidden="true" />
          Azzera filtri
        </button>
      )}
    </div>
  );
}
