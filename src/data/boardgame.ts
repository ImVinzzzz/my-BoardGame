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
  subtitle: "Lavorare insieme per completare i compiti mentre lavoriamo anche in alcuni... momenti di relax.",
  coverImageUrl: "/images/st-lower-decks.jpg",
  description: "Esplorare strani, nuovi mondi dicevano... ma è difficile apprezzare le meraviglie della Galassia quando si è bloccati a lubrificare i turbolift. Ma ehi, non è che il Capitano Freeman sappia quanto tempo ci vogliono davvero questi incarichi...",
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
  id: "lercio",
  slug: "lercio",
  title: "Lercio: Pessime Notizie",
  subtitle: "Benvenuti nella peggior redazione giornalistica d’Italia.",
  coverImageUrl: "/images/lercio.jpg",
  description: "In questo party game spietato e delirante, vestirete i panni di un giornalista alle prese con la creazione del titolo più sensazionale da utilizzare nella prima pagina del vostro quotidiano. Il gioco perfetto per rovinare cene, amicizie e la vostra reputazione… tanto, ormai.",
  type: "Party Game",
  genres: ["Party Game", "Competitivo"],
  rating: 3,
  synopsis: "Chi riuscirà a collezionare più titoli e rendere orgoglioso il Capo Redattore vincerà la gloria eterna (o quasi), e la sua statua all’entrata degli uffici verrà venerata negli anni a venire. Gli altri? Licenziati in tronco e mandati a scrivere oroscopi.",
  playerCount: "3-8 giocatori",
  duration: "20-30 minuti",
  ageRange: "14+",
  notes: "Incluse le espansioni \"Speciale Giubileo\" e \"Speciale Esteri\".",
  favorite: false,
  played: true,
  officialUrl: "https://www.lercio.it/",
  downloads: [
    {
      id: "lercio-regolamento",
      label: "Regolamento",
      description: "Regolamento ufficiale, 8 pagine.",
      fileUrl: "/pdfs/lercio_1.pdf",
      icon: "fa-solid fa-file-pdf",
      fileSize: "1 MB",
    },
  ],
},
];
