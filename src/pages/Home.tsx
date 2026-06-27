import { useMemo, useState, useEffect } from "react";
import type { ReactElement } from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState<GameType | null>(null);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const [playedFilter, setPlayedFilter] = useState<PlayedFilter>("all");
  const [favoriteFilter, setFavoriteFilter] = useState<FavoriteFilter>("all");
  const [selectedPlayerCount, setSelectedPlayerCount] = useState<string | null>(null);
  const [selectedDuration, setSelectedDuration] = useState<string | null>(null);
  const [selectedAge, setSelectedAge] = useState<string | null>(null);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Generi derivati dai dati: nessuna lista da mantenere manualmente
  // quando aggiungi un nuovo gioco.
  const genres = useMemo(
    () => Array.from(new Set(boardgames.flatMap((game) => game.genres))).sort(),
    []
  );

  const filteredGames = useMemo(() => {
    const list = boardgames.filter((game) => {
      const matchesSearch =
        searchQuery === "" ||
        game.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = selectedType === null || game.type === selectedType;
      // I generi selezionati sono in OR tra loro: basta che il gioco abbia
      // almeno uno dei generi spuntati per comparire nei risultati.
      const matchesGenres =
        selectedGenres.length === 0 ||
        selectedGenres.some((genre) => game.genres.includes(genre));
      const matchesRating =
        selectedRatings.length === 0 || selectedRatings.includes(game.rating);
      const matchesPlayed =
        playedFilter === "all" ||
        (playedFilter === "played" && game.played) ||
        (playedFilter === "unplayed" && !game.played);
      const matchesFavorite =
        favoriteFilter === "all" ||
        (favoriteFilter === "favorite" && game.favorite) ||
        (favoriteFilter === "non_favorite" && !game.favorite);

      // Filtro Numero giocatori
      let matchesPlayerCount = true;
      if (selectedPlayerCount !== null && game.playerCount) {
        // Estrae il range/valore (es. "3-6", "1-4", "3+", "2")
        const rawPart = game.playerCount.replace("giocatori", "").trim();
        if (selectedPlayerCount === "6+") {
          // Controlliamo se supporta 6 o più giocatori
          if (rawPart.includes("+")) {
            const num = parseInt(rawPart.replace("+", ""), 10);
            matchesPlayerCount = num >= 6;
          } else if (rawPart.includes("-")) {
            const parts = rawPart.split("-");
            const maxVal = parseInt(parts[1], 10);
            matchesPlayerCount = maxVal >= 6;
          } else {
            const val = parseInt(rawPart, 10);
            matchesPlayerCount = val >= 6;
          }
        } else {
          const filterNum = parseInt(selectedPlayerCount, 10);
          if (rawPart.includes("+")) {
            const num = parseInt(rawPart.replace("+", ""), 10);
            matchesPlayerCount = filterNum >= num;
          } else if (rawPart.includes("-")) {
            const parts = rawPart.split("-");
            const minVal = parseInt(parts[0], 10);
            const maxVal = parseInt(parts[1], 10);
            matchesPlayerCount = filterNum >= minVal && filterNum <= maxVal;
          } else {
            const val = parseInt(rawPart, 10);
            matchesPlayerCount = filterNum === val;
          }
        }
      }

      // Filtro Durata della partita
      let matchesDuration = true;
      if (selectedDuration !== null && game.duration) {
        // Estrae la durata massima
        const rawPart = game.duration.replace("minuti", "").trim();
        let maxDurationVal = 0;
        if (rawPart.includes("-")) {
          const parts = rawPart.split("-");
          maxDurationVal = parseInt(parts[1], 10);
        } else {
          maxDurationVal = parseInt(rawPart, 10);
        }

        if (selectedDuration === "oltre") {
          matchesDuration = maxDurationVal > 120;
        } else {
          const filterDur = parseInt(selectedDuration, 10);
          matchesDuration = maxDurationVal <= filterDur;
        }
      }

      // Filtro Età consigliata
      let matchesAge = true;
      if (selectedAge !== null && game.ageRange) {
        const rawPart = game.ageRange.replace("+", "").trim();
        const gameMinAge = parseInt(rawPart, 10);
        const filterMinAge = parseInt(selectedAge.replace("+", ""), 10);
        
        matchesAge = gameMinAge <= filterMinAge;
      }

      return (
        matchesSearch &&
        matchesType &&
        matchesGenres &&
        matchesRating &&
        matchesPlayed &&
        matchesFavorite &&
        matchesPlayerCount &&
        matchesDuration &&
        matchesAge
      );
    });

    return [...list].sort((a, b) => a.title.localeCompare(b.title));
  }, [
    selectedType,
    selectedGenres,
    selectedRatings,
    playedFilter,
    favoriteFilter,
    selectedPlayerCount,
    selectedDuration,
    selectedAge,
    searchQuery,
  ]);

  function toggleGenre(genre: string): void {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((item) => item !== genre) : [...prev, genre]
    );
  }

  function toggleRating(rating: number): void {
    setSelectedRatings((prev) =>
      prev.includes(rating) ? prev.filter((item) => item !== rating) : [...prev, rating]
    );
  }

  function resetFilters(): void {
    setSelectedType(null);
    setSelectedGenres([]);
    setSelectedRatings([]);
    setPlayedFilter("all");
    setFavoriteFilter("all");
    setSelectedPlayerCount(null);
    setSelectedDuration(null);
    setSelectedAge(null);
    setSearchQuery("");
  }

  function handleRandomGame(): void {
    if (filteredGames.length === 0) {
      return;
    }

    // Calcolo dei pesi per favorire i preferiti e le alte valutazioni (rating >= 4)
    const weightedGames = filteredGames.map((game) => {
      let weight = 1;
      if (game.favorite) {
        weight = weight + 3;
      }
      if (game.rating >= 4) {
        weight = weight + (game.rating - 2);
      }
      return { game, weight };
    });

    const totalWeight = weightedGames.reduce((acc, curr) => acc + curr.weight, 0);
    let randomNum = Math.random() * totalWeight;

    for (const item of weightedGames) {
      randomNum = randomNum - item.weight;
      if (randomNum <= 0) {
        navigate("/gioco/" + item.game.slug);
        return;
      }
    }

    // Fallback
    navigate("/gioco/" + filteredGames[0].slug);
  }

  return (
    <div className="min-h-screen bg-[#0B1E33] text-[#EAF0F6]">
      {/* Intestazione */}
      <header className="sticky top-0 z-40 border-b border-[#23405C] bg-[#081320]/95 backdrop-blur-md transition-all duration-300">
        <div className={"mx-auto flex max-w-6xl flex-col px-6 transition-all duration-300 " + (isScrolled ? "py-3 gap-1" : "py-8 sm:py-10 gap-3")}>
          <div className="flex items-center gap-3 text-[#FF7A29]">
            <i className={"fa-solid fa-chess-bishop transition-all duration-300 " + (isScrolled ? "text-lg" : "text-2xl")} aria-hidden="true" />
            <span className={"font-semibold uppercase tracking-[0.2em] transition-all duration-300 " + (isScrolled ? "text-[10px]" : "text-xs")}>
              La mia collezione
            </span>
          </div>
          <h1 className={"font-display font-semibold transition-all duration-300 " + (isScrolled ? "text-xl sm:text-2xl" : "text-3xl sm:text-4xl md:text-5xl")}>
            Archivio Board Game
          </h1>
          <p className={"max-w-2xl text-[#9FB3C8] transition-all duration-300 ease-in-out origin-top " + (isScrolled ? "max-h-0 opacity-0 overflow-hidden mt-0 text-2xs" : "max-h-24 opacity-100 mt-1 text-sm sm:text-base")}>
            Tutti i giochi da tavolo della mia collezione, con regolamenti pronti da scaricare,
            valutazioni personali e a che punto sono nel giocarli tutti.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10 sm:py-14">
        {/* Filtri: mostrati solo se c'è almeno un gioco in archivio */}
        {boardgames.length > 0 && (
          <div className="mb-8 flex flex-col gap-4">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 items-start">
              <div className="flex flex-col gap-2">
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                    className="inline-flex items-center gap-2 rounded-lg bg-[#13263D] px-4 py-2 text-sm font-semibold text-[#EAF0F6] ring-1 ring-[#23405C] transition-colors hover:text-[#FF7A29] hover:ring-[#FF7A29]/50 shrink-0"
                  >
                    <i className="fa-solid fa-sliders text-xs" aria-hidden="true" />
                    <span>{isFiltersOpen ? "Nascondi filtri" : "Mostra filtri"}</span>
                    <i
                      className={"fa-solid " + (isFiltersOpen ? "fa-chevron-up" : "fa-chevron-down") + " text-xs ml-1"}
                      aria-hidden="true"
                    />
                  </button>

                  <button
                    type="button"
                    onClick={handleRandomGame}
                    className="inline-flex items-center gap-2 rounded-lg bg-[#FF7A29] px-4 py-2 text-sm font-semibold text-[#081320] transition-colors hover:bg-[#FF944D] shrink-0"
                  >
                    <i className="fa-solid fa-shuffle text-xs" aria-hidden="true" />
                    <span>Un gioco a caso</span>
                  </button>
                </div>
                <span className="text-xs sm:text-sm font-semibold text-[#FF7A29] whitespace-nowrap pl-1">
                  {filteredGames.length + (filteredGames.length === 1 ? " scheda" : " schede")}
                </span>
              </div>
              <div className="sm:col-span-1 lg:col-span-2 flex justify-end">
                <div className="relative w-full">
                  <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[#6B829B]" aria-hidden="true" />
                  <input
                    type="text"
                    placeholder="Cerca per titolo..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full rounded-lg bg-[#13263D] pl-9 pr-4 py-2 text-sm text-[#EAF0F6] placeholder-[#6B829B] ring-1 ring-[#23405C] transition-all focus:outline-none focus:ring-[#FF7A29]"
                  />
                </div>
              </div>
            </div>

            {isFiltersOpen && (
              <FilterBar
                types={GAME_TYPES}
                genres={genres}
                selectedType={selectedType}
                selectedGenres={selectedGenres}
                selectedRatings={selectedRatings}
                playedFilter={playedFilter}
                favoriteFilter={favoriteFilter}
                selectedPlayerCount={selectedPlayerCount}
                selectedDuration={selectedDuration}
                selectedAge={selectedAge}
                onTypeChange={setSelectedType}
                onGenreToggle={toggleGenre}
                onRatingToggle={toggleRating}
                onRatingsClear={() => setSelectedRatings([])}
                onPlayedFilterChange={setPlayedFilter}
                onFavoriteFilterChange={setFavoriteFilter}
                onPlayerCountChange={setSelectedPlayerCount}
                onDurationChange={setSelectedDuration}
                onAgeChange={setSelectedAge}
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
