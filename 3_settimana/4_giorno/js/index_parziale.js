// :)

const now = new Date()
console.log('now', now)

// fase iniziale: dobbiamo cercare di capire IN CHE MESE SIAMO, per riempire l'h1, e anche quanti giorni ha il mese corrente
// perchè dobbiamo generare un numero di celle corrispondente
// ogni volta che apriremo il calendario vogliamo una fedele rappresentazione del mese corrente

// dove salvo gli appuntamenti? allora, ogni appuntamento è una stringa, ogni giorno può contenere infiniti appuntamenti,
// e ogni mese ha un numero variabile di giorni (28-31)

// il nostro scopo è creare un array di array, dove l'array "padre" è il mese e ogni array "figlio" rappresenta un giorno
// [
// [], [], [], [], [], [], [], [], [], 
// [], [], [], [], [], [], [], [], [], 
// [], [], [], [], [], [], [], [], [], 
// [], [], []
// ]

// esempio di giorno: 11 aprile
// "14:30 - Q&A"
// "17:00 - DEBRIEF"
// "20:00 - CENA FS2403"
// 11 aprile è un array di stringhe --> ["14:30 - Q&A", "17:00 - DEBRIEF", "20:00 - CENA FS2403"]

// all'inizio però io NON SO quanti giorni ci sono ancora in questo mese! quindi creo solo il "guscio" del mese
const appointments = []
// ora dovrai pushare dentro appointments tanti "sotto-rray" quanti sono i giorni del mese corrente

const monthNames = [
    'Gennaio',
    'Febbraio',
    'Marzo',
    'Aprile',
    'Maggio',
    'Giugno',
    'Luglio',
    'Agosto',
    'Settembre',
    'Ottobre',
    'Novembre',
    'Dicembre'
]

const printCurrentMonthInH1 = function () {
    const title = document.querySelector('h1') // prendo l'<h1> dalla pagina
    const monthIndex = now.getMonth(); // 3 perché siamo in aprile
    const currentMonth = monthNames[monthIndex] // "aprile"
    console.log('mese corrente', currentMonth)
    title.innerHTML = currentMonth // riporto la stringa del mese nell'h1
    // lancio la funzione
}

// ora che sappiamo in che mese siamo, dobbiamo calcolarne il numero dei giorni...
// per riempire correttamente la sezione delle celle

const daysInThisMonth = function () {
    const getYear = now.getFullYear() // 2024

    const getMonth = now.getMonth() // 3

    // quello di cui ho bisogno è l'ULTIMO giorno valido del mese in corso
    // perché tale numero corrsiponde anche al NUMERO DEI GIORNI del mese corrente

    // per ottenere l'ultimo giorno valido del mese in corso, creo una data
    // relativa al primo giorno del mese succesivo rispetto a quello corrente 

    const lastDayInTheMonth = new Date(getYear, getMonth + 1, 0)    // -> 0 maggio 2024 === 30 aprile 2024
    console.log('lastDayInTheMonth', lastDayInTheMonth)
    const numberOfTheDay = lastDayInTheMonth.getDate()  // prende il giorno del mese da una specifica data
    console.log('numberOfTheDay', numberOfTheDay)
    // numberOfTheDay è il numero di giorni del mese corrente, ovvero il numero di volte per cui dovrò ripetere
    // la creazione in JS di una cella "giorno"
    return numberOfTheDay
}

const unSelectAllDays = function () {
    // qua il mio compito è rimuovere eventuali altre classi "selected" precedentemente applicate
    // in modo da lasciare il campo "libero" per la successiva applicazione della nuova classe "selected"
    // sull'elemento cliccato...
    // APPROCCIO BULLDOZER
    // prendo tutte le celle, a tappeto rimuovo un'eventuale classe "selected"

    // APPROCCIO CHIRURGICO (cerco la classe selected)
}

const createDays = function (numberOfDays) {
    // numberOfDays adesso è 30 (in aprile)
    const calendarDiv = document.getElementById('calendar')
    for (let i = 0; i < numberOfDays; i++) {
        // per ogni giorno del mese corrente...
        // creo una cella
        const dayCellDiv = document.createElement('div')
        // <div></div>
        dayCellDiv.classList.add('day')
        // <div class="day"></div>

        // ora, questa singola celal del giorno che ho appena creato, la rendo cliccabile!
        dayCellDiv.addEventListener('click', function (e) {
            // devo toglierla da altre precedenti
            unSelectAllDays()
            // ora che non ho più altri selected nel calendario, la aggiungo alla cella che ho cliccato
            dayCellDiv.classList.add('selected')
        })

        const cellValue = document.createElement('h3')
        // <h3></h3>
        cellValue.innerText = i + 1

        // appendiamo cellValue dentro dayCellDiv
        dayCellDiv.appendChild(cellValue)   // <div><h3>1</h3></div>, appendo il value alla cella del giorno
        calendarDiv.appendChild(dayCellDiv) // appendo la cella del giorno al calendario
    }
}

printCurrentMonthInH1()
const numberOfDaysInTheCurrentMonth = daysInThisMonth() // 30

createDays(numberOfDaysInTheCurrentMonth)
