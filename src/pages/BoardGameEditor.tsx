import { useState, useEffect, type ReactElement, type ChangeEvent } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWrench,
  faPlus,
  faCode,
  faRotateLeft,
  faCopy,
  faTrashCan,
  faThumbsUp,
  faThumbsDown,
  faStar as faStarSolid,
  faArrowLeft
} from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";
import { GAME_TYPES, type GameType } from "../types";

interface RigaDownloadStato {
  idLocale: number;
  label: string;
  fileSize: string;
  description: string;
  icon: string;
  fileUrl: string;
  fileUrlModificatoManualmente: boolean;
}

const SUGGERIMENTI_ICONE: string[] = [
  "fa-solid fa-book",
  "fa-solid fa-puzzle-piece",
  "fa-solid fa-clipboard-list",
  "fa-solid fa-map",
  "fa-solid fa-scroll",
  "fa-solid fa-file-pdf",
  "fa-solid fa-image",
  "fa-solid fa-dice-d20"
];

const normalizzaSlug = (valore: string): string => {
  return valore
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/['']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

const formattaStringaTs = (valore: string): string => {
  return JSON.stringify(valore || "");
};

const indentaTesto = (testo: string, spazi: number): string => {
  const riempimento = " ".repeat(spazi);
  return testo
    .split("\n")
    .map((linea) => riempimento + linea)
    .join("\n");
};

export default function BoardGameEditor(): ReactElement {
  // Stati dei campi principali
  const [titolo, setTitolo] = useState("");
  const [sottotitolo, setSottotitolo] = useState("");
  const [slug, setSlug] = useState("");
  const [idGioco, setIdGioco] = useState("");
  const [urlCopertina, setUrlCopertina] = useState("");
  const [tipologia, setTipologia] = useState<GameType | "">("");
  const [generi, setGeneri] = useState("");
  const [valutazione, setValutazione] = useState(0);
  const [descrizione, setDescrizione] = useState("");
  const [sinossi, setSinossi] = useState("");
  const [numeroGiocatori, setNumeroGiocatori] = useState("");
  const [durata, setDurata] = useState("");
  const [etaConsigliata, setEtaConsigliata] = useState("");
  const [note, setNote] = useState("");
  const [puntiPro, setPuntiPro] = useState("");
  const [puntiContro, setPuntiContro] = useState("");
  const [urlUfficiale, setUrlUfficiale] = useState("");
  const [preferito, setPreferito] = useState(false);
  const [giocato, setGiocato] = useState(false);

  // Stati per la gestione dei download
  const [listaDownload, setListaDownload] = useState<RigaDownloadStato[]>([
    {
      idLocale: 1,
      label: "Regolamento",
      fileSize: "",
      description: "",
      icon: "fa-solid fa-book",
      fileUrl: "",
      fileUrlModificatoManualmente: false
    }
  ]);
  const [contatoreRighe, setContatoreRighe] = useState(1);

  // Stati di controllo per la generazione automatica
  const [slugModificato, setSlugModificato] = useState(false);
  const [copertinaModificata, setCopertinaModificata] = useState(false);
  const [idModificato, setIdModificato] = useState(false);

  // Stato dell'output generato
  const [codiceGenerato, setCodiceGenerato] = useState("");
  const [mostraOutput, setMostraOutput] = useState(false);
  const [testoPulsanteCopia, setTestoPulsanteCopia] = useState("Copia codice");

  // Gestione della generazione automatica dei campi basata sul titolo
  useEffect(() => {
    const slugAutomatico = normalizzaSlug(titolo);

    if (!slugModificato) {
      setSlug(slugAutomatico);
    }
    if (!idModificato) {
      setIdGioco(slugModificato ? slug : slugAutomatico);
    }
    if (!copertinaModificata) {
      setUrlCopertina(slugModificato ? "/images/" + slug + ".jpg" : "/images/" + slugAutomatico + ".jpg");
    }
  }, [titolo, slugModificato, copertinaModificata, idModificato, slug]);

  // Aggiorna gli URL dei file scaricabili in base allo slug attuale e alla posizione
  useEffect(() => {
    setListaDownload((vecchiDownload) =>
      vecchiDownload.map((risorsa, indice) => {
        if (risorsa.fileUrlModificatoManualmente) {
          return risorsa;
        }
        if (!slug) {
          return { ...risorsa, fileUrl: "" };
        }
        const posizione = indice + 1;
        return {
          ...risorsa,
          fileUrl: "/pdfs/" + slug + "_" + posizione + ".pdf"
        };
      })
    );
  }, [slug]);

  const gestisciCambioTitolo = (evento: ChangeEvent<HTMLInputElement>) => {
    setTitolo(evento.target.value);
  };

  const gestisciCambioSlug = (evento: ChangeEvent<HTMLInputElement>) => {
    setSlugModificato(true);
    const nuovoSlug = evento.target.value;
    setSlug(nuovoSlug);
    if (!idModificato) {
      setIdGioco(nuovoSlug);
    }
  };

  const aggiungiRigaDownload = () => {
    const nuovoId = contatoreRighe + 1;
    setContatoreRighe(nuovoId);

    const nuovaRiga: RigaDownloadStato = {
      idLocale: nuovoId,
      label: "",
      fileSize: "",
      description: "",
      icon: "fa-solid fa-file",
      fileUrl: slug ? "/pdfs/" + slug + "_" + (listaDownload.length + 1) + ".pdf" : "",
      fileUrlModificatoManualmente: false
    };

    setListaDownload([...listaDownload, nuovaRiga]);
  };

  const rimuoviRigaDownload = (idLocale: number) => {
    const listaFiltrata = listaDownload.filter((item) => item.idLocale !== idLocale);
    // Ricalcoliamo gli URL per le righe non modificate manualmente
    const listaAggiornata = listaFiltrata.map((risorsa, indice) => {
      if (risorsa.fileUrlModificatoManualmente) {
        return risorsa;
      }
      if (!slug) {
        return { ...risorsa, fileUrl: "" };
      }
      const posizione = indice + 1;
      return {
        ...risorsa,
        fileUrl: "/pdfs/" + slug + "_" + posizione + ".pdf"
      };
    });
    setListaDownload(listaAggiornata);
  };

  const gestisciModificaDownload = (
    idLocale: number,
    campo: keyof RigaDownloadStato,
    valore: string
  ) => {
    setListaDownload((vecchiDownload) =>
      vecchiDownload.map((risorsa) => {
        if (risorsa.idLocale !== idLocale) {
          return risorsa;
        }
        const risorsaAggiornata = { ...risorsa, [campo]: valore };
        if (campo === "fileUrl") {
          risorsaAggiornata.fileUrlModificatoManualmente = true;
        }
        return risorsaAggiornata;
      })
    );
  };

  const svuotaForm = () => {
    setTitolo("");
    setSottotitolo("");
    setSlug("");
    setIdGioco("");
    setUrlCopertina("");
    setTipologia("");
    setGeneri("");
    setValutazione(0);
    setDescrizione("");
    setSinossi("");
    setNumeroGiocatori("");
    setDurata("");
    setEtaConsigliata("");
    setNote("");
    setPuntiPro("");
    setPuntiContro("");
    setUrlUfficiale("");
    setPreferito(false);
    setGiocato(false);

    setSlugModificato(false);
    setCopertinaModificata(false);
    setIdModificato(false);

    setContatoreRighe(1);
    setListaDownload([
      {
        idLocale: 1,
        label: "Regolamento",
        fileSize: "",
        description: "",
        icon: "fa-solid fa-book",
        fileUrl: "",
        fileUrlModificatoManualmente: false
      }
    ]);
    setCodiceGenerato("");
    setMostraOutput(false);
  };

  const generaCodiceTypeScript = () => {
    if (!titolo.trim() || !descrizione.trim() || !tipologia) {
      alert("Compila almeno Titolo, Descrizione e Tipologia prima di generare il codice.");
      return;
    }

    const slugFinale = slug.trim() || normalizzaSlug(titolo);
    const idFinale = idGioco.trim() || slugFinale;
    const listaGeneri = generi
      .split(",")
      .map((g) => g.trim())
      .filter(Boolean);

    const righeCodice: string[] = [
      "id: " + formattaStringaTs(idFinale) + ",",
      "slug: " + formattaStringaTs(slugFinale) + ",",
      "title: " + formattaStringaTs(titolo.trim()) + ",",
      "subtitle: " + formattaStringaTs(sottotitolo.trim()) + ",",
      "coverImageUrl: " + formattaStringaTs(urlCopertina.trim()) + ",",
      "description: " + formattaStringaTs(descrizione.trim()) + ",",
      "type: " + formattaStringaTs(tipologia) + ",",
      "genres: [" + listaGeneri.map(formattaStringaTs).join(", ") + "],",
      "rating: " + valutazione + ","
    ];

    if (sinossi.trim()) {
      righeCodice.push("synopsis: " + formattaStringaTs(sinossi.trim()) + ",");
    }
    if (numeroGiocatori.trim()) {
      righeCodice.push("playerCount: " + formattaStringaTs(numeroGiocatori.trim()) + ",");
    }
    if (durata.trim()) {
      righeCodice.push("duration: " + formattaStringaTs(durata.trim()) + ",");
    }
    if (etaConsigliata.trim()) {
      righeCodice.push("ageRange: " + formattaStringaTs(etaConsigliata.trim()) + ",");
    }
    if (note.trim()) {
      righeCodice.push("notes: " + formattaStringaTs(note.trim()) + ",");
    }
    if (puntiPro.trim()) {
      righeCodice.push("pros: " + formattaStringaTs(puntiPro.trim()) + ",");
    }
    if (puntiContro.trim()) {
      righeCodice.push("cons: " + formattaStringaTs(puntiContro.trim()) + ",");
    }

    righeCodice.push("favorite: " + preferito + ",");
    righeCodice.push("played: " + giocato + ",");

    if (urlUfficiale.trim()) {
      righeCodice.push("officialUrl: " + formattaStringaTs(urlUfficiale.trim()) + ",");
    }

    // Costruzione della sezione downloads
    const blocchiDownload = listaDownload
      .map((risorsa) => {
        const etichetta = risorsa.label.trim();
        if (!etichetta) {
          return null;
        }

        const descDownload = risorsa.description.trim();
        const urlDownload = risorsa.fileUrl.trim() || "#";
        const iconaDownload = risorsa.icon.trim() || "fa-solid fa-file";
        const dimensione = risorsa.fileSize.trim();
        const idRisorsa = idFinale + "-" + (normalizzaSlug(etichetta) || "materiale");

        const righeRisorsa = [
          "id: " + formattaStringaTs(idRisorsa) + ",",
          "label: " + formattaStringaTs(etichetta) + ","
        ];

        if (descDownload) {
          righeRisorsa.push("description: " + formattaStringaTs(descDownload) + ",");
        }
        righeRisorsa.push("fileUrl: " + formattaStringaTs(urlDownload) + ",");
        righeRisorsa.push("icon: " + formattaStringaTs(iconaDownload) + ",");
        if (dimensione) {
          righeRisorsa.push("fileSize: " + formattaStringaTs(dimensione) + ",");
        }

        return "{\n" + indentaTesto(righeRisorsa.join("\n"), 2) + "\n},";
      })
      .filter(Boolean);

    let stringaDownloads = "[]";
    if (blocchiDownload.length > 0) {
      stringaDownloads = "[\n" + indentaTesto(blocchiDownload.join("\n"), 2) + "\n]";
    }

    righeCodice.push("downloads: " + stringaDownloads + ",");

    const bloccoOggetto = "{\n" + indentaTesto(righeCodice.join("\n"), 2) + "\n},";
    setCodiceGenerato(bloccoOggetto);
    setMostraOutput(true);
  };

  const copiaCodiceNegliAppunti = () => {
    navigator.clipboard
      .writeText(codiceGenerato)
      .then(() => {
        setTestoPulsanteCopia("Copiato!");
        setTimeout(() => {
          setTestoPulsanteCopia("Copia codice");
        }, 1500);
      })
      .catch(() => {
        // Nessuna operazione in caso di errore
      });
  };

  return (
    <div className="min-h-screen bg-[#0B1E33] text-[#EAF0F6]">
      <div className="mx-auto max-w-4xl px-6 py-10">
        <header className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-[#FF7A29]">
              <FontAwesomeIcon icon={faWrench} className="text-sm" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em]">Tool interno</span>
            </div>
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-full border border-[#23405C] bg-[#13263D] px-4 py-1.5 text-xs font-semibold text-[#C3D1DE] hover:border-[#FF7A29]/50 transition-colors"
            >
              <FontAwesomeIcon icon={faArrowLeft} />
              Torna all'archivio
            </Link>
          </div>
          <h1 className="mt-4 font-bold text-2xl sm:text-3xl text-white">Generatore scheda GdT</h1>
          <p className="mt-2 text-sm text-[#9FB3C8] max-w-2xl">
            Compila il form, premi <strong>"Genera codice"</strong> e incolla il risultato in{" "}
            <code className="rounded bg-[#13263D] px-1.5 py-0.5 text-[#FF7A29]">
              src/data/boardgame.ts
            </code>
            , subito dopo un oggetto esistente (prima della parentesi quadra finale dell'array).
          </p>
        </header>

        <form className="flex flex-col gap-8" onSubmit={(e) => e.preventDefault()}>
          {/* Dati principali */}
          <section className="rounded-xl border border-[#23405C] bg-[#13263D] p-5 flex flex-col gap-4">
            <h2 className="font-bold text-lg text-[#EAF0F6]">Dati principali</h2>

            <div>
              <label className="block text-sm font-semibold mb-1" htmlFor="titolo">
                Titolo *
              </label>
              <input
                id="titolo"
                type="text"
                value={titolo}
                onChange={gestisciCambioTitolo}
                className="w-full rounded-lg bg-[#081320] border border-[#23405C] px-3 py-2 text-[#EAF0F6] focus:outline-none focus:border-[#FF7A29]"
                placeholder="I Sentieri di Latta"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1" htmlFor="sottotitolo">
                Sottotitolo
              </label>
              <input
                id="sottotitolo"
                type="text"
                value={sottotitolo}
                onChange={(e) => setSottotitolo(e.target.value)}
                className="w-full rounded-lg bg-[#081320] border border-[#23405C] px-3 py-2 text-[#EAF0F6] focus:outline-none focus:border-[#FF7A29]"
                placeholder="Costruisci rotte commerciali nell'Europa dello stagno"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-1" htmlFor="slug">
                  Slug{" "}
                  <span className="text-[#6B829B] font-normal">
                    (generato dal titolo, modificabile)
                  </span>
                </label>
                <input
                  id="slug"
                  type="text"
                  value={slug}
                  onChange={gestisciCambioSlug}
                  className="w-full rounded-lg bg-[#081320] border border-[#23405C] px-3 py-2 text-[#EAF0F6] focus:outline-none focus:border-[#FF7A29]"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1" htmlFor="idGioco">
                  ID{" "}
                  <span className="text-[#6B829B] font-normal">
                    (generato dal titolo, modificabile)
                  </span>
                </label>
                <input
                  id="idGioco"
                  type="text"
                  value={idGioco}
                  onChange={(e) => {
                    setIdModificato(true);
                    setIdGioco(e.target.value);
                  }}
                  className="w-full rounded-lg bg-[#081320] border border-[#23405C] px-3 py-2 text-[#EAF0F6] focus:outline-none focus:border-[#FF7A29]"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1" htmlFor="urlCopertina">
                URL immagine di copertina{" "}
                <span className="text-[#6B829B] font-normal">
                  (generato, modificabile)
                </span>
              </label>
              <input
                id="urlCopertina"
                type="text"
                value={urlCopertina}
                onChange={(e) => {
                  setCopertinaModificata(true);
                  setUrlCopertina(e.target.value);
                }}
                className="w-full rounded-lg bg-[#081320] border border-[#23405C] px-3 py-2 text-[#EAF0F6] focus:outline-none focus:border-[#FF7A29]"
                placeholder="/images/slug.jpg"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-1" htmlFor="tipologia">
                  Tipologia *
                </label>
                <select
                  id="tipologia"
                  value={tipologia}
                  onChange={(e) => setTipologia(e.target.value as GameType)}
                  className="w-full rounded-lg bg-[#081320] border border-[#23405C] px-3 py-2 text-[#EAF0F6] focus:outline-none focus:border-[#FF7A29]"
                >
                  <option value="">Seleziona...</option>
                  {GAME_TYPES.map((tipo) => (
                    <option key={tipo} value={tipo}>
                      {tipo}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1" htmlFor="generi">
                  Genere
                </label>
                <input
                  id="generi"
                  type="text"
                  value={generi}
                  onChange={(e) => setGeneri(e.target.value)}
                  className="w-full rounded-lg bg-[#081320] border border-[#23405C] px-3 py-2 text-[#EAF0F6] focus:outline-none focus:border-[#FF7A29]"
                  placeholder="Strategico, Astratto (separati da virgola)"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">Classificazione *</label>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((stella) => {
                    const riempita = stella <= valutazione;
                    return (
                      <button
                        key={stella}
                        type="button"
                        onClick={() => setValutazione(stella)}
                        className="text-xl px-0.5 focus:outline-none"
                      >
                        <FontAwesomeIcon
                          icon={riempita ? faStarSolid : faStarRegular}
                          className={riempita ? "text-[#FFD60A]" : "text-[#3A5570]"}
                        />
                      </button>
                    );
                  })}
                </div>
                <span className="text-sm text-[#9FB3C8]">{valutazione}/5</span>
                <button
                  type="button"
                  onClick={() => setValutazione(0)}
                  className="text-xs text-[#6B829B] hover:text-[#FF7A29] transition-colors"
                >
                  Azzera
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1" htmlFor="descrizione">
                Descrizione *
              </label>
              <textarea
                id="descrizione"
                rows={3}
                value={descrizione}
                onChange={(e) => setDescrizione(e.target.value)}
                className="w-full rounded-lg bg-[#081320] border border-[#23405C] px-3 py-2 text-[#EAF0F6] focus:outline-none focus:border-[#FF7A29]"
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1" htmlFor="sinossi">
                Altro
              </label>
              <textarea
                id="sinossi"
                rows={3}
                value={sinossi}
                onChange={(e) => setSinossi(e.target.value)}
                className="w-full rounded-lg bg-[#081320] border border-[#23405C] px-3 py-2 text-[#EAF0F6] focus:outline-none focus:border-[#FF7A29]"
              ></textarea>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-1" htmlFor="giocatori">
                  Giocatori
                </label>
                <input
                  id="giocatori"
                  type="text"
                  value={numeroGiocatori}
                  onChange={(e) => setNumeroGiocatori(e.target.value)}
                  className="w-full rounded-lg bg-[#081320] border border-[#23405C] px-3 py-2 text-[#EAF0F6] focus:outline-none focus:border-[#FF7A29]"
                  placeholder="2-4 giocatori"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1" htmlFor="durata">
                  Durata
                </label>
                <input
                  id="durata"
                  type="text"
                  value={durata}
                  onChange={(e) => setDurata(e.target.value)}
                  className="w-full rounded-lg bg-[#081320] border border-[#23405C] px-3 py-2 text-[#EAF0F6] focus:outline-none focus:border-[#FF7A29]"
                  placeholder="60-90 minuti"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1" htmlFor="eta">
                  Fascia d'età
                </label>
                <input
                  id="eta"
                  type="text"
                  value={etaConsigliata}
                  onChange={(e) => setEtaConsigliata(e.target.value)}
                  className="w-full rounded-lg bg-[#081320] border border-[#23405C] px-3 py-2 text-[#EAF0F6] focus:outline-none focus:border-[#FF7A29]"
                  placeholder="10+"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1" htmlFor="note">
                Note
              </label>
              <textarea
                id="note"
                rows={2}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="w-full rounded-lg bg-[#081320] border border-[#23405C] px-3 py-2 text-[#EAF0F6] focus:outline-none focus:border-[#FF7A29]"
              ></textarea>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-1 text-green-400" htmlFor="pro">
                  <FontAwesomeIcon icon={faThumbsUp} className="mr-1" /> PRO
                </label>
                <textarea
                  id="pro"
                  rows={2}
                  value={puntiPro}
                  onChange={(e) => setPuntiPro(e.target.value)}
                  className="w-full rounded-lg bg-[#081320] border border-[#23405C] px-3 py-2 text-[#EAF0F6] focus:outline-none focus:border-green-500"
                  placeholder="Aspetti positivi, punti di forza..."
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1 text-red-400" htmlFor="contro">
                  <FontAwesomeIcon icon={faThumbsDown} className="mr-1" /> CONTRO
                </label>
                <textarea
                  id="contro"
                  rows={2}
                  value={puntiContro}
                  onChange={(e) => setPuntiContro(e.target.value)}
                  className="w-full rounded-lg bg-[#081320] border border-[#23405C] px-3 py-2 text-[#EAF0F6] focus:outline-none focus:border-red-500"
                  placeholder="Aspetti negativi, punti deboli..."
                ></textarea>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1" htmlFor="urlUfficiale">
                Link esterno
              </label>
              <input
                id="urlUfficiale"
                type="text"
                value={urlUfficiale}
                onChange={(e) => setUrlUfficiale(e.target.value)}
                className="w-full rounded-lg bg-[#081320] border border-[#23405C] px-3 py-2 text-[#EAF0F6] focus:outline-none focus:border-[#FF7A29]"
                placeholder="https://..."
              />
            </div>

            <div className="flex flex-wrap gap-6">
              <label className="inline-flex items-center gap-2 text-sm select-none cursor-pointer">
                <input
                  type="checkbox"
                  checked={preferito}
                  onChange={(e) => setPreferito(e.target.checked)}
                  className="h-4 w-4 accent-[#FF3D81]"
                />
                Preferito
              </label>
              <label className="inline-flex items-center gap-2 text-sm select-none cursor-pointer">
                <input
                  type="checkbox"
                  checked={giocato}
                  onChange={(e) => setGiocato(e.target.checked)}
                  className="h-4 w-4 accent-[#FF7A29]"
                />
                Ci ho già giocato
              </label>
            </div>
          </section>

          {/* Materiali da scaricare */}
          <section className="rounded-xl border border-[#23405C] bg-[#13263D] p-5 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-lg text-[#EAF0F6]">Da scaricare</h2>
              <button
                type="button"
                onClick={aggiungiRigaDownload}
                className="inline-flex items-center gap-1.5 rounded-full bg-[#FF7A29] px-3 py-1.5 text-xs font-semibold text-[#081320] hover:bg-[#FFB066] transition-colors"
              >
                <FontAwesomeIcon icon={faPlus} /> Aggiungi materiale
              </button>
            </div>

            <div className="flex flex-col gap-4">
              {listaDownload.map((risorsa, indice) => (
                <div
                  key={risorsa.idLocale}
                  className="rounded-lg border border-[#23405C] bg-[#081320] p-4 flex flex-col gap-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wide text-[#6B829B]">
                      Materiale #{indice + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => rimuoviRigaDownload(risorsa.idLocale)}
                      className="text-xs text-[#6B829B] hover:text-[#FF7A29] transition-colors"
                    >
                      <FontAwesomeIcon icon={faTrashCan} className="mr-1" /> Rimuovi
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Etichetta (es. Regolamento)"
                      value={risorsa.label}
                      onChange={(e) =>
                        gestisciModificaDownload(risorsa.idLocale, "label", e.target.value)
                      }
                      className="w-full rounded-lg bg-[#13263D] border border-[#23405C] px-3 py-2 text-sm text-[#EAF0F6] focus:outline-none focus:border-[#FF7A29]"
                    />
                    <input
                      type="text"
                      placeholder="Dimensione file (es. 4.2 MB)"
                      value={risorsa.fileSize}
                      onChange={(e) =>
                        gestisciModificaDownload(risorsa.idLocale, "fileSize", e.target.value)
                      }
                      className="w-full rounded-lg bg-[#13263D] border border-[#23405C] px-3 py-2 text-sm text-[#EAF0F6] focus:outline-none focus:border-[#FF7A29]"
                    />
                  </div>

                  <input
                    type="text"
                    placeholder="Descrizione (es. Manuale ufficiale in italiano, 24 pagine)"
                    value={risorsa.description}
                    onChange={(e) =>
                      gestisciModificaDownload(risorsa.idLocale, "description", e.target.value)
                    }
                    className="w-full rounded-lg bg-[#13263D] border border-[#23405C] px-3 py-2 text-sm text-[#EAF0F6] focus:outline-none focus:border-[#FF7A29]"
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold mb-1 text-[#6B829B]">
                        Icona <span className="font-normal">(seleziona quella più adatta)</span>
                      </label>
                      <input
                        type="text"
                        list="suggerimenti-icone-elenco"
                        placeholder="Icona FontAwesome"
                        value={risorsa.icon}
                        onChange={(e) =>
                          gestisciModificaDownload(risorsa.idLocale, "icon", e.target.value)
                        }
                        className="w-full rounded-lg bg-[#13263D] border border-[#23405C] px-3 py-2 text-sm text-[#EAF0F6] focus:outline-none focus:border-[#FF7A29]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold mb-1 text-[#6B829B]">
                        URL file{" "}
                        <span className="font-normal">(generato dallo slug, modificabile)</span>
                      </label>
                      <input
                        type="text"
                        placeholder="/pdfs/slug_1.pdf"
                        value={risorsa.fileUrl}
                        onChange={(e) =>
                          gestisciModificaDownload(risorsa.idLocale, "fileUrl", e.target.value)
                        }
                        className="w-full rounded-lg bg-[#13263D] border border-[#23405C] px-3 py-2 text-sm text-[#EAF0F6] focus:outline-none focus:border-[#FF7A29]"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={generaCodiceTypeScript}
              className="inline-flex items-center gap-2 rounded-full bg-[#FF7A29] px-5 py-2.5 text-sm font-semibold text-[#081320] hover:bg-[#FFB066] transition-colors"
            >
              <FontAwesomeIcon icon={faCode} /> Genera codice
            </button>
            <button
              type="button"
              onClick={svuotaForm}
              className="inline-flex items-center gap-2 rounded-full border border-[#23405C] px-5 py-2.5 text-sm font-semibold text-[#C3D1DE] hover:border-[#FF7A29]/50 transition-colors"
            >
              <FontAwesomeIcon icon={faRotateLeft} /> Svuota form
            </button>
          </div>
        </form>

        {/* Output */}
        {mostraOutput && (
          <section className="mt-10 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-lg text-[#EAF0F6]">Codice generato</h2>
              <button
                type="button"
                onClick={copiaCodiceNegliAppunti}
                className="inline-flex items-center gap-1.5 rounded-full border border-[#FF7A29]/40 px-3 py-1.5 text-xs font-semibold text-[#FF7A29] hover:bg-[#FF7A29]/10 transition-colors"
              >
                <FontAwesomeIcon icon={faCopy} />
                <span>{testoPulsanteCopia}</span>
              </button>
            </div>
            <textarea
              readOnly
              rows={20}
              value={codiceGenerato}
              className="w-full rounded-lg bg-[#081320] border border-[#23405C] p-4 font-mono text-xs text-[#C3D1DE] focus:outline-none"
            ></textarea>
          </section>
        )}
      </div>

      <datalist id="suggerimenti-icone-elenco">
        {SUGGERIMENTI_ICONE.map((icona) => (
          <option key={icona} value={icona} />
        ))}
      </datalist>
    </div>
  );
}
