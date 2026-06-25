import type { ReactElement } from 'react';
import type { GameType } from '../types';

export type PlayedFilter = "all" | "played" | "unplayed";
export type FavoriteFilter = "all" | "favorite" | "non_favorite";

interface FilterBarProps {
  /** Tipologie disponibili (categorie fisse) */
  types: GameType[];
  /** Generi disponibili (derivati dai dati) */
  genres: string[];
  /** Tipologia attualmente selezionata; null = "Tutte" */
  selectedType: GameType | null;
  /** Generi attualmente selezionati (selezione multipla, OR tra loro) */
  selectedGenres: string[];
  /** Classificazioni attualmente selezionate (selezione multipla) */
  selectedRatings: number[];
  /** Filtro sullo stato "giocato" */
  playedFilter: PlayedFilter;
  /** Filtro sullo stato "preferito" */
  favoriteFilter: FavoriteFilter;
  onTypeChange: (type: GameType | null) => void;
  onGenreToggle: (genre: string) => void;
  onRatingToggle: (rating: number) => void;
  onRatingsClear: () => void;
  onPlayedFilterChange: (value: PlayedFilter) => void;
  onFavoriteFilterChange: (value: FavoriteFilter) => void;
  onReset: () => void;
}

function chipClasses(active: boolean, activeBgClass?: string): string {
  const bgClass = activeBgClass ? activeBgClass : "bg-[#FF7A29] text-[#081320]";
  return [
    "inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold tracking-wide transition-colors",
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF7A29] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1E33]",
    active
      ? bgClass
      : "bg-[#13263D] text-[#C3D1DE] ring-1 ring-[#23405C] hover:text-[#EAF0F6] hover:ring-[#FF7A29]/50",
  ].join(" ");
}

const RATING_OPTIONS = [5, 4, 3, 2, 1];

/**
 * Barra dei filtri: tipologia (selezione singola), genere (selezione
 * multipla, in OR tra loro), classificazione minima, stato "giocato"
 * e stato "preferito" (entrambi a selezione singola). Componente puramente presentazionale:
 * lo stato dei filtri vive in `pages/Home.tsx`.
 */
export default function FilterBar({
  types,
  genres,
  selectedType,
  selectedGenres,
  selectedRatings,
  playedFilter,
  favoriteFilter,
  onTypeChange,
  onGenreToggle,
  onRatingToggle,
  onRatingsClear,
  onPlayedFilterChange,
  onFavoriteFilterChange,
  onReset,
}: FilterBarProps): ReactElement {
  const hasActiveFilters =
    selectedType !== null ||
    selectedGenres.length > 0 ||
    selectedRatings.length > 0 ||
    playedFilter !== "all" ||
    favoriteFilter !== "all";

  return (
    <div className="flex flex-col gap-5 rounded-xl border border-[#23405C] bg-[#081320] p-5">
      {/* Filtro per tipologia (selezione singola) e filtri rapidi Preferito/Giocato */}
      <div className="flex flex-col gap-2">
        <span className="text-xs font-semibold uppercase tracking-[0.15em] text-[#6B829B]">
          Filtri e Tipologia
        </span>
        <div className="flex flex-wrap gap-2 items-center">
          {/* Bottone Preferito (on/off) */}
          <button
            type="button"
            onClick={() => onFavoriteFilterChange(favoriteFilter === "favorite" ? "all" : "favorite")}
            className={chipClasses(favoriteFilter === "favorite", "bg-[#EC4899] text-white hover:bg-[#F472B6]")}
            aria-pressed={favoriteFilter === "favorite"}
          >
            <i className="fa-solid fa-heart text-[0.7rem]" aria-hidden="true" />
            Preferito
          </button>

          {/* Bottone Giocato (on/off) */}
          <button
            type="button"
            onClick={() => onPlayedFilterChange(playedFilter === "played" ? "all" : "played")}
            className={chipClasses(playedFilter === "played", "bg-[#10B981] text-[#081320] hover:bg-[#34D399]")}
            aria-pressed={playedFilter === "played"}
          >
            <i className="fa-solid fa-check text-[0.7rem]" aria-hidden="true" />
            Giocato
          </button>

          {/* Separator */}
          <div className="h-6 w-px bg-[#23405C] mx-1 self-center" />

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

      {/* Filtro per classificazione (su riga singola a selezione multipla) */}
      <div className="flex flex-col gap-2">
        <span className="text-xs font-semibold uppercase tracking-[0.15em] text-[#6B829B]">
          Classificazione
        </span>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => onRatingsClear()}
            className={chipClasses(selectedRatings.length === 0)}
            aria-pressed={selectedRatings.length === 0}
          >
            Tutte
          </button>
          {RATING_OPTIONS.map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => onRatingToggle(value)}
              className={chipClasses(selectedRatings.includes(value))}
              aria-pressed={selectedRatings.includes(value)}
            >
              <i className="fa-solid fa-star text-[0.7rem]" aria-hidden="true" />
              {value}
            </button>
          ))}
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
