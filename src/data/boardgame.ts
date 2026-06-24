import type { BoardGame } from '../types';

/**
 * Archivio dei giochi da tavolo.
 *
 * Per aggiungere un nuovo gioco basta inserire un nuovo oggetto in questo
 * array: nessun componente o pagina deve essere modificato. Puoi generare
 * il codice da incollare qui con `tools/boardgame-generator.html`.
 */
export const boardgames: BoardGame[] = [
  {
    id: 'sentieri-di-latta',
    slug: 'sentieri-di-latta',
    title: 'Sentieri di Latta',
    subtitle: "Costruisci rotte commerciali nell'Europa dello stagno",
    coverImageUrl: 'https://placehold.co/800x500/081320/FF7A29?text=Sentieri+di+Latta',
    description:
      "Un gioco di gestione e commercio ambientato in un'Europa alternativa di inizio Novecento, dove lo stagno ha sostituito il carbone come motore dell'industria. Si piazzano operai, si costruiscono ferrovie e si negoziano contratti con le altre potenze al tavolo.",
    type: 'Strategico',
    genres: ['Strategia', 'Economico'],
    rating: 4,
    synopsis:
      "Ogni partita dura tre ere: nella prima si rivendicano i giacimenti, nella seconda si costruisce la rete ferroviaria che li collega ai porti, nella terza si negoziano i contratti di esportazione con le altre potenze al tavolo. Il punteggio finale premia chi ha diversificato le rotte, non chi ne controlla una sola a costo di tutto.",
    playerCount: '2-4 giocatori',
    duration: '60-90 minuti',
    ageRange: '10+',
    notes: 'Con 2 giocatori si gioca con il modulo "mercato ridotto" incluso nel regolamento: rende le trattative meno punitive per chi resta indietro.',
    favorite: true,
    played: true,
    officialUrl: '#',
    downloads: [
      {
        id: 'sentieri-di-latta-regolamento',
        label: 'Regolamento',
        description: 'Manuale ufficiale in italiano, 24 pagine',
        fileUrl: '#',
        icon: 'fa-solid fa-book',
        fileSize: '4.2 MB',
      },
    ],
  },
  {
    id: 'il-mistero-di-villa-corvo',
    slug: 'il-mistero-di-villa-corvo',
    title: 'Il Mistero di Villa Corvo',
    subtitle: 'Una sola sera per scoprire chi ha tradito la famiglia Corvo',
    coverImageUrl: 'https://placehold.co/800x500/081320/FF7A29?text=Il+Mistero+di+Villa+Corvo',
    description:
      "Gioco cooperativo di deduzione: i giocatori interpretano gli ospiti di una cena che si trasforma in un'indagine, raccogliendo indizi sparsi per la villa prima che il colpevole riesca a far sparire le prove.",
    type: 'Cooperativo',
    genres: ['Deduzione', 'Mistero'],
    rating: 5,
    playerCount: '3-6 giocatori',
    duration: '45-60 minuti',
    ageRange: '12+',
    favorite: false,
    played: false,
    downloads: [
      {
        id: 'il-mistero-di-villa-corvo-regolamento',
        label: 'Regolamento',
        description: 'Manuale ufficiale in italiano, 16 pagine',
        fileUrl: '#',
        icon: 'fa-solid fa-book',
        fileSize: '3.1 MB',
      },
    ],
  },
];
