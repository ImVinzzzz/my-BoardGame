import type { ReactElement } from 'react';

export type TagVariant = 'type' | 'genre';

interface TagProps {
  label: string;
  variant?: TagVariant;
  /** Classe icona FontAwesome opzionale: se omessa viene scelta in automatico */
  icon?: string;
}

/** Icone di default per le tipologie di gioco fisse. */
const TYPE_ICONS: Record<string, string> = {
  Competitivo: 'fa-solid fa-trophy',
  Cooperativo: 'fa-solid fa-people-group',
  'Party Game': 'fa-solid fa-masks-theater',
  Filler: 'fa-solid fa-stopwatch',
  Astratto: 'fa-solid fa-shapes',
  Strategico: 'fa-solid fa-chess-knight',
};

/** Icone di default per i generi più comuni. Per generi non in lista
 *  viene usata un'icona generica (fa-tag). */
const GENRE_ICONS: Record<string, string> = {
  Strategia: 'fa-solid fa-chess',
  Economico: 'fa-solid fa-coins',
  Famiglia: 'fa-solid fa-house-chimney-window',
  Bluff: 'fa-solid fa-user-secret',
  Deduzione: 'fa-solid fa-magnifying-glass',
  Mistero: 'fa-solid fa-ghost',
  Avventura: 'fa-solid fa-compass',
  Fantascienza: 'fa-solid fa-rocket',
  Carte: 'fa-solid fa-layer-group',
  Fantasy: 'fa-solid fa-hat-wizard',
  'Party Game': 'fa-solid fa-people-roof',
  'Star Trek': 'fa-solid fa-hand-spock',
};

const DEFAULT_GENRE_ICON = 'fa-solid fa-tag';
const DEFAULT_TYPE_ICON = 'fa-solid fa-hexagon';

/**
 * Etichetta a "pillola" usata per mostrare la tipologia o il genere di un
 * gioco. La variante "type" ha lo stile arancione/accento principale,
 * la variante "genre" è più discreta.
 */
export default function Tag({ label, variant = 'genre', icon }: TagProps): ReactElement {
  const resolvedIcon =
    icon ?? (variant === 'type' ? TYPE_ICONS[label] ?? DEFAULT_TYPE_ICON : GENRE_ICONS[label] ?? DEFAULT_GENRE_ICON);

  const baseClasses =
    'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold tracking-wide';

  const variantClasses =
    variant === 'type'
      ? 'bg-[#FF7A29]/15 text-[#FFB066] ring-1 ring-[#FF7A29]/40'
      : 'bg-[#3A5570]/20 text-[#B9CFE3] ring-1 ring-[#3A5570]/50';

  return (
    <span className={`${baseClasses} ${variantClasses}`}>
      <i className={`${resolvedIcon} text-[0.7rem]`} aria-hidden="true" />
      {label}
    </span>
  );
}
