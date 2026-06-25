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
  subtitle: "Lavorare insieme per completare gli incarichi mentre ci occupiamo anche di... altro!",
  coverImageUrl: "/images/st-lower-decks.jpg",
  description: "Esplorare strani, nuovi mondi dicevano... ma è difficile apprezzare le meraviglie della Galassia quando si è bloccati a lubrificare i turbolift o a grattare rugine dallo scafo. Ma ehi, non è che il Capitano Freeman sappia quanto tempo ci voglia davvero per completare questi incarichi...",
  type: "Cooperativo",
  genres: ["Fantasy", "Star Trek", "Carte", "Cooperativo", "Party Game"],
  rating: 4,
  synopsis: "In questo gioco di carte che spinge la fortuna, i giocatori lavorano insieme per completare i loro compiti, trovando anche il tempo per un meritato riposo e relax. Riesci a infilare abbastanza divertimento nel tuo turno di lavoro prima che gli ufficiali del ponte capisca cosa sta succedendo?",
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
{
  id: "harmonies",
  slug: "harmonies",
  title: "Harmonies",
  subtitle: "Create un mondo in miniatura in cui gli animali vivono in perfetta armonia...",
  coverImageUrl: "/images/harmonies.jpg",
  description: "Come un’ode alla natura, all’equilibrio della fauna selvatica, scoprite la necessità di dare armonia a tutti gli elementi che comporranno il vostro ecosistema. In questo nuovo gioco da tavolo ideato da Johan Benvenuto e illustrato da Maëva Da Silva, combinate ragionamento, strategia e creatività con l’emozione e la soddisfazione di creare il paesaggio più bello per attrarre gli animali.",
  type: "Astratto",
  genres: ["Party Game", "Astratto", "Strategia", "Famiglia"],
  rating: 4,
  synopsis: "1) Collocate i vostri dischi per creare paesaggi sulla vostra plancia.\n2) Scegliete gli animali che possono stabilirsi al meglio all’interno del vostro mondo.\n3) Combinate i vostri paesaggi e i vostri animali per ottenere più punti possibili!",
  playerCount: "1-4 giocatori",
  duration: "30 minuti",
  ageRange: "10+",
  favorite: true,
  played: true,
  officialUrl: "https://www.asmodee.it/product/harmonies/",
  downloads: [
    {
      id: "harmonies-regolamento",
      label: "Regolamento",
      description: "Regolamento italiano, 12 pagine",
      fileUrl: "/pdfs/harmonies_1.pdf",
      icon: "fa-solid fa-book",
      fileSize: "3.1 MB",
    },
  ],
},
];
