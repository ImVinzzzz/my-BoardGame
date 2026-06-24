import type { ReactElement } from 'react';
import type { DownloadResource } from '../types';

interface DownloadButtonProps {
  resource: DownloadResource;
}

/**
 * Bottone per il download di un materiale (Regolamento, espansioni, ecc.).
 * Riceve una singola DownloadResource e si occupa solo della presentazione:
 * il link reale verrà impostato in `fileUrl` quando i PDF saranno pronti.
 */
export default function DownloadButton({ resource }: DownloadButtonProps): ReactElement {
  return (
    <a
      href={resource.fileUrl}
      download
      className="group flex items-start gap-4 rounded-lg border border-[#FF7A29]/30 bg-[#13263D] p-4 transition-all duration-200 hover:border-[#FF7A29]/70 hover:bg-[#1A3550] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF7A29] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1E33]"
    >
      <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-[#FF7A29]/15 text-[#FFB066] ring-1 ring-[#FF7A29]/40 transition-colors group-hover:bg-[#FF7A29]/25">
        <i className={`${resource.icon} text-lg`} aria-hidden="true" />
      </span>

      <span className="flex flex-col">
        <span className="font-semibold text-[#EAF0F6]">{resource.label}</span>
        {resource.description && (
          <span className="mt-0.5 text-sm text-[#9FB3C8]">{resource.description}</span>
        )}
        <span className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-[#FF7A29]">
          <i className="fa-solid fa-download" aria-hidden="true" />
          Scarica PDF{resource.fileSize ? ` · ${resource.fileSize}` : ''}
        </span>
      </span>
    </a>
  );
}
