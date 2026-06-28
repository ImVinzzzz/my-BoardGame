import { type IconProp } from '@fortawesome/fontawesome-svg-core';

/**
 * Converte una stringa di classi CSS di FontAwesome (es. "fa-solid fa-book")
 * in una tupla [prefisso, nome-icona] valida come prop `icon` per react-fontawesome.
 */
export function parseIconString(iconStr: string): IconProp {
  if (!iconStr) return ['fas', 'file'];
  
  const parts = iconStr.split(' ');
  let prefix: 'fas' | 'far' | 'fab' = 'fas';
  let name = '';

  for (const part of parts) {
    if (part.startsWith('fa-') && part !== 'fa-solid' && part !== 'fa-regular' && part !== 'fa-brands') {
      // Rimuoviamo il prefisso fa- per ottenere il nome dell'icona
      name = part.replace('fa-', '');
    } else if (part === 'fa-solid' || part === 'fas') {
      prefix = 'fas';
    } else if (part === 'fa-regular' || part === 'far') {
      prefix = 'far';
    } else if (part === 'fa-brands' || part === 'fab') {
      prefix = 'fab';
    }
  }

  return [prefix, name] as IconProp;
}
