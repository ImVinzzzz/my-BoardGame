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
  id: "st-lower-decks",
  slug: "st-lower-decks",
  title: "Star Trek: Lower Decks - Buffer Time",
  subtitle: "Lavorare insieme per completare i compiti mentre lavoriamo anche in alcuni... tempo di cuscinetto.",
  coverImageUrl: "/images/st-lower-decks.jpg",
  description: "Esplorare strani mondi nuovi, dicevano... ma è difficile apprezzare le meraviglie della Galassia quando si è bloccati a lubrificare i turbolift. Ma ehi, non è che il Capitano Freeman sappia quanto tempo ci vogliono davvero questi incarichi...",
  type: "Cooperativo",
  genres: ["Fantasy", "Star Trek", "Carte", "Cooperativo", "Party Game"],
  rating: 4,
  synopsis: "In questo gioco di carte che spinge la fortuna, da 2 a 6 giocatori lavorano insieme per completare i loro compiti, trovandosi anche il tempo per un meritato riposo e rilassamento. Riesci a infilare abbastanza divertimento nel tuo turno di turno prima che l'equipaggio del ponte capisca cosa sta succedendo?",
  playerCount: "2-6 giocatori",
  duration: "20-40 minuti",
  ageRange: "14+",
  notes: "Dipendenza linguistica: testo di gioco moderato; serve un foglio illustrativo.",
  favorite: true,
  played: true,
  officialUrl: "https://modiphius.net/products/star-trek-lower-decks-buffer-time-the-card-game",
  downloads: [],
},
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
