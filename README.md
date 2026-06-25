# Archivio Board Game

Un'applicazione web amatoriale per catalogare la propria collezione di giochi da tavolo, visualizzare i dettagli di ciascun gioco, inserire valutazioni personali e scaricare regolamenti o materiali di gioco extra.

## Stack Tecnologico

- **Framework**: React 18
- **Linguaggio**: TypeScript
- **Bundler e Dev Server**: Vite
- **Stilizzazione**: TailwindCSS e Vanilla CSS
- **Icone**: FontAwesome 6

## Funzionalità Principali

- Griglia interattiva dei giochi da tavolo con filtri per tipologia e ricerca testuale.
- Scheda di dettaglio dedicata per ciascun gioco (valutazioni, note, durata, numero giocatori, età).
- Sezione dinamica per il download di regolamenti e PDF di gioco (nascosta se non sono presenti file da scaricare).
- Tool interno per la generazione di nuovi elementi all'interno del database locale.

## Struttura del Progetto

- `src/components/`: Componenti React riutilizzabili (es. pulsanti di download, filtri, stelle di valutazione).
- `src/data/`: Database statico contenente le schede dei giochi da tavolo (`boardgame.ts`).
- `src/pages/`: Pagine principali dell'applicazione (Home e Dettaglio).
- `tools/`: Contiene `generatore_BG.html`, una pagina HTML autonoma utilizzata come tool interno per inserire nuovi giochi nel file di dati generando il relativo oggetto in formato compatibile.

## Installazione e Avvio Locale

Assicurarsi di aver installato Node.js sul proprio sistema.

### 1. Installare le dipendenze
Eseguire il comando seguente nella root del progetto:
```bash
npm install
```

### 2. Avviare in modalità sviluppo
Per lanciare l'applicazione localmente con hot-reload:
```bash
npm run dev
```

### 3. Compilare per la produzione
Per generare la build ottimizzata pronta per il deployment:
```bash
npm run build
```

### 4. Avviare la build di produzione localmente
Per testare localmente la versione compilata:
```bash
npm run preview
```

## Contribuire e Aggiungere Giochi

Per aggiungere un nuovo gioco di tabellone al database:
1. Aprire il file `tools/generatore_BG.html` nel browser.
2. Compilare il modulo con i dati del gioco e i link ai materiali.
3. Cliccare su **Genera codice**.
4. Copiare il codice generato e incollarlo all'interno dell'array in `src/data/boardgame.ts`.
