/**
 * Tipi e interfacce del modulo "Board Game".
 *
 * Definire qui i contratti dati permette di aggiungere nuovi giochi in
 * `data/boardgame.ts` senza dover toccare i componenti o le pagine.
 */

/** Tipologia di gioco: categorie fisse, usate anche per il filtro in home. */
export type GameType =
  | 'Competitivo'
  | 'Cooperativo'
  | 'Party Game'
  | 'Filler'
  | 'Astratto'
  | 'Strategico'
  | 'Excape Game';

/** Elenco delle tipologie disponibili, usato per popolare select e filtri. */
export const GAME_TYPES: GameType[] = [
  'Competitivo',
  'Cooperativo',
  'Party Game',
  'Filler',
  'Astratto',
  'Strategico',
  'Excape Game',
];

/** Una risorsa scaricabile collegata a un gioco (regolamento, espansioni, ecc.). */
export interface DownloadResource {
  /** Identificatore univoco della risorsa, usato anche come React key */
  id: string;
  /** Etichetta mostrata sul bottone, es. "Regolamento" */
  label: string;
  /** Breve descrizione facoltativa */
  description?: string;
  /** Url del file da scaricare ("#" come segnaposto finché non è pubblicato) */
  fileUrl: string;
  /** Classe icona FontAwesome da mostrare sul bottone */
  icon: string;
  /** Dimensione indicativa del file, es. "4.2 MB" */
  fileSize?: string;
}

/** Rappresenta un singolo gioco da tavolo dell'archivio. */
export interface BoardGame {
  /** Identificatore univoco */
  id: string;
  /** Slug usato nell'URL della scheda di dettaglio */
  slug: string;
  /** Titolo del gioco */
  title: string;
  /** Sottotitolo o tagline */
  subtitle: string;
  /** Url dell'immagine di copertina (può essere un segnaposto) */
  coverImageUrl: string;
  /** Descrizione breve: mostrata nella card e in cima alla scheda di dettaglio
   *  (corrisponde alla vecchia "Sinossi" del sito GdR, solo rinominata) */
  description: string;
  /** Tipologia di gioco (categorie fisse, vedi GameType) */
  type: GameType;
  /** Generi/temi del gioco, es. ["Strategia", "Economico"] */
  genres: string[];
  /** Valutazione personale, da 0 a 5 stelle */
  rating: number;
  /** Approfondimento facoltativo, mostrato sotto la descrizione nella scheda
   *  di dettaglio (corrisponde alla vecchia "Descrizione estesa", rinominata
   *  "Sinossi": non esiste un terzo campo testuale oltre a questo). */
  synopsis?: string;
  /** Numero di giocatori consigliato, es. "2-4 giocatori" */
  playerCount?: string;
  /** Durata stimata, es. "60-90 minuti" */
  duration?: string;
  /** Fascia d'età consigliata, es. "10+" */
  ageRange?: string;
  /** Note libere mostrate in un box dedicato (es. varianti, house rules, avvertenze) */
  notes?: string;
  /** Punti di forza del gioco */
  pros?: string;
  /** Punti deboli del gioco */
  cons?: string;
  /** Se true, mostra il badge "Preferito" in home e nella scheda */
  favorite?: boolean;
  /** Indica se questo gioco è già stato giocato almeno una volta */
  played: boolean;
  /** Link alla pagina ufficiale del gioco: si apre in una nuova scheda */
  officialUrl?: string;
  /** Materiali scaricabili collegati a questo gioco (di norma solo il Regolamento) */
  downloads: DownloadResource[];
}
