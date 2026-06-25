import { useMemo, useState } from "react";
import type { ReactElement } from "react";
import { boardgames } from "../data/boardgame";
import { GAME_TYPES } from "../types";
import type { GameType } from "../types";
import BoardGameCard from "../components/BoardGameCard";
import FilterBar from "../components/FilterBar";
import { type PlayedFilter, type FavoriteFilter } from "../components/FilterBar";

/**
 * Pagina principale: intestazione dell'archivio + filtri + griglia
 * responsive dei giochi. I dati arrivano da `data/boardgame.ts`, quindi
 * aggiungere un nuovo gioco non richiede modifiche a questo file (il
 * filtro per genere si aggiorna da solo, quello per tipologia usa le
 * categorie fisse definite in `types.ts`).
 */
export default function Home(): ReactElement {
  const [selectedType, setSelectedType] = useState<GameType | null>(null);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [minRating, setMinRating] = useState(0);
  const [playedFilter, setPlayedFilter] = useState<PlayedFilter>("all");
  const [favoriteFilter, setFavoriteFilter] = useState<FavoriteFilter>("all");
  const [isFiltersOpen, setIsFiltersOpen] = useState(true);

  // Generi derivati dai dati: nessuna lista da mantenere manualmente
  // quando aggiungi un nuovo gioco.
  const genres = useMemo(
    () => Array.from(new Set(boardgames.flatMap((game) => game.genres))).sort(),
    []
  );

  const filteredGames = useMemo(() => {
    const list = boardgames.filter((game) => {
      const matchesType = selectedType === null || game.type === selectedType;
      // I generi selezionati sono in OR tra loro: basta che il gioco abbia
      // almeno uno dei generi spuntati per comparire nei risultati.
      const matchesGenres =
        selectedGenres.length === 0 ||
        selectedGenres.some((genre) => game.genres.includes(genre));
      const matchesRating = minRating === 0 || game.rating >= minRating;
      const matchesPlayed =
        playedFilter === "all" ||
        (playedFilter === "played" && game.played) ||
        (playedFilter === "unplayed" && !game.played);
      const matchesFavorite =
        favoriteFilter === "all" ||
        (favoriteFilter === "favorite" && game.favorite) ||
        (favoriteFilter === "non_favorite" && !game.favorite);
      return matchesType && matchesGenres && matchesRating && matchesPlayed && matchesFavorite;
    });

    return [...list].sort((a, b) => a.title.localeCompare(b.title));
  }, [selectedType, selectedGenres, minRating, playedFilter, favoriteFilter]);

  function toggleGenre(genre: string): void {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((item) => item !== genre) : [...prev, genre]
    );
  }

  function resetFilters(): void {
    setSelectedType(null);
    setSelectedGenres([]);
    setMinRating(0);
    setPlayedFilter("all");
    setFavoriteFilter("all");
  }

  return (
    <div className="min-h-screen bg-[#0B1E33] text-[#EAF0F6]">
      {/* Intestazione */}
      <header className="border-b border-[#23405C] bg-[#081320]">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-10 sm:py-14">
          <div className="flex items-center gap-3 text-[#FF7A29]">
            <i className="fa-solid fa-chess-bishop text-2xl" aria-hidden="true" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em]">
              La mia collezione
            </span>
          </div>
          <h1 className="font-display text-3xl font-semibold sm:text-4xl md:text-5xl">
            Archivio Board Game
          </h1>
          <p className="max-w-2xl text-sm text-[#9FB3C8] sm:text-base">
            Tutti i giochi da tavolo della mia collezione, con regolamenti pronti da scaricare,
            valutazioni personali e a che punto sono nel giocarli tutti.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10 sm:py-14">
        {/* Filtri: mostrati solo se c'è almeno un gioco in archivio */}
        {boardgames.length > 0 && (
          <div className="mb-8 flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <button
                type="button"
                onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                className="inline-flex items-center gap-2 rounded-lg bg-[#13263D] px-4 py-2 text-sm font-semibold text-[#EAF0F6] ring-1 ring-[#23405C] transition-colors hover:text-[#FF7A29] hover:ring-[#FF7A29]/50"
              >
                <i className="fa-solid fa-sliders text-xs" aria-hidden="true" />
                <span>{isFiltersOpen ? "Nascondi filtri" : "Mostra filtri"}</span>
                <i
                  className={"fa-solid " + (isFiltersOpen ? "fa-chevron-up" : "fa-chevron-down") + " text-xs ml-1"}
                  aria-hidden="true"
                />
              </button>
            </div>

            {isFiltersOpen && (
              <FilterBar
                types={GAME_TYPES}
                genres={genres}
                selectedType={selectedType}
                selectedGenres={selectedGenres}
                minRating={minRating}
                playedFilter={playedFilter}
                favoriteFilter={favoriteFilter}
                onTypeChange={setSelectedType}
                onGenreToggle={toggleGenre}
                onMinRatingChange={setMinRating}
                onPlayedFilterChange={setPlayedFilter}
                onFavoriteFilterChange={setFavoriteFilter}
                onReset={resetFilters}
              />
            )}
          </div>
        )}

        {/* Griglia giochi */}
        {boardgames.length === 0 ? (
          <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-[#23405C] py-16 text-center text-[#6B829B]">
            <i className="fa-solid fa-box-archive text-3xl" aria-hidden="true" />
            <p>
              L&apos;archivio è vuoto per ora. Aggiungi un nuovo gioco in{' '}
              <code className="rounded bg-[#13263D] px-1.5 py-0.5 text-[#FF7A29]">
                data/boardgame.ts
              </code>
              .
            </p>
          </div>
        ) : filteredGames.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredGames.map((game) => (
              <BoardGameCard key={game.id} game={game} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-[#23405C] py-16 text-center text-[#6B829B]">
            <i className="fa-solid fa-magnifying-glass text-3xl" aria-hidden="true" />
            <p>Nessun gioco corrisponde ai filtri selezionati.</p>
            <button
              type="button"
              onClick={resetFilters}
              className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-[#FF7A29] hover:text-[#FFB066]"
            >
              <i className="fa-solid fa-rotate-left text-xs" aria-hidden="true" />
              Azzera filtri
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
