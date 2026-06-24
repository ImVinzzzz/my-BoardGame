import type { ReactElement } from 'react';

interface StarRatingProps {
  /** Valutazione da 0 a 5 */
  rating: number;
  /** Dimensione del testo Tailwind per le icone, es. "text-sm" */
  size?: string;
}

/**
 * Riga di 5 stelle: piene fino al valore di `rating`, vuote per il resto.
 * Usato sia nella card della home che nella scheda di dettaglio, così la
 * logica di rendering vive in un solo posto.
 */
export default function StarRating({ rating, size = 'text-sm' }: StarRatingProps): ReactElement {
  const clampedRating = Math.max(0, Math.min(5, Math.round(rating)));

  return (
    <span className="inline-flex items-center gap-0.5" aria-label={`Valutazione: ${clampedRating} su 5 stelle`}>
      {Array.from({ length: 5 }).map((_, index) => {
        const filled = index < clampedRating;
        return (
          <i
            key={index}
            className={`${filled ? 'fa-solid' : 'fa-regular'} fa-star ${size} ${filled ? 'text-[#FFD60A]' : 'text-[#3A5570]'}`}
            aria-hidden="true"
          />
        );
      })}
    </span>
  );
}
