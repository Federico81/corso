// :)

const now = new Date()
console.log('now', now)

// fase iniziale: dobbiamo cercare di capire IN CHE MESE SIAMO, per riempire l'h1, e anche quanti giorni ha il mese corrente
// perchè dobbiamo generare un numero di celle corrispondente.
// Ogni volta che apriremo il calendario vogliamo una fedele rappresentazione del mese corrente

// dove salvo gli appuntamenti? allora, ogni appuntamento è una stringa, ogni giorno può contenere infiniti appuntamenti,
// e ogni mese ha un numero variabile di giorni (28-31)

// il nostro scopo è creare un array di array, dove l'array "padre" è il mese e ogni array "figlio" rappresenta un giorno
// [
//   [], [], [], [], [], [], [], [], [],
//   [], [], [], [], [], [], [], [], [],
//   [], [], [], [], [], [], [], [], []
//   [], [], []
// ]

// esempio di giorno: 11 aprile
// "14:30 - Q&A"
// "17:00 - DEBRIEF"
// "20:00 - CENA FS0623B"
// 11 aprile è un array di stringhe --> ["14:30 - Q&A", "17:00 - DEBRIEF", "20:00 - CENA FS0423"]

// all'inizio però io NON SO quanti giorni ci sono ancora in questo mese! quindi creo solo il "guscio" del mese
const appointments = []
// ora dovrei pushare dentro appointements tanti "sotto-array" quanti sono i giorni del mese corrente

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
  'Dicembre',
]

const printCurrentMonthInH1 = function () {
  const title = document.querySelector('h1') // prendo l'<h1> dalla pagina
  const monthIndex = now.getMonth() // 3 perchè siamo in aprile
  const currentMonth = monthNames[monthIndex] // "aprile"
  console.log('mese corrente', currentMonth)
  title.innerText = currentMonth // riporto la stringa del mese nell'h1
  // lancio la funzione
}

// ora che sappiamo in che mese siamo, dobbiamo calcolarne il numero dei giorni...
// per riempire correttamente la sezione delle celle

const daysInThisMonth = function () {
  const getYear = now.getFullYear() // 2024

  const getMonth = now.getMonth() // 3

  // quello di cui ho bisogno è l'ULTIMO giorno valido del mese in corso
  // perchè tale numero corrisponde anche al NUMERO DEI GIORNI del mese corrente!

  // per ottenere l'ultimo giorno valido del mese in corso, creo una data
  // relativa al primo giorno del mese successivo rispetto a quello corrente, e -tolgo- un giorno

  const lastDayInTheMonth = new Date(getYear, getMonth + 1, 0) // -> 0 maggio 2024 === 30 aprile 2024
  console.log('lastDayInTheMonth', lastDayInTheMonth)
  const numberOfTheDay = lastDayInTheMonth.getDate() // prende il giorno del mese da una specifica data
  console.log('numberOfTheDay', numberOfTheDay)
  // numberOfTheDay è il numero di giorno del mese corrente, ovvero il numero di volte per cui dovrò ripetere
  // la creazione in JS di una cella "giorno"
  return numberOfTheDay
}

const unSelectAllDays = function () {
  // qua il mio compito è rimuovere eventuali altre classi "selected" precedentemente applicate
  // in modo da lasciare il campo "libero" per la successiva applicazione della nuova class "selected"
  // sull'elemento che ho cliccato..

  // APPROCCIO BULLDOZER
  // prendo TUTTE le celle, e a tappeto rimuovo un'eventuale classe "selected"
  //   const allTheCells = document.getElementsByClassName('day')
  //   const allTheCellsAsArray = Array.from(allTheCells) // ho convertito allTheCells in un vero e proprio array, perchè altrimenti
  //   // una semplice HTMLCollection NON È ciclabile attraverso forEach
  //   allTheCellsAsArray.forEach((cell) => {
  //     cell.classList.remove('selected')
  //   })

  // APPROCCIO CHIRURGICO
  //   const previousSelected = document.getElementsByClassName('selected')[0]
  const previousSelected = document.querySelector('.selected')
  if (previousSelected) {
    previousSelected.classList.remove('selected')
  }
}

const changeMeetingDaySection = function (indexOfTheDay) {
  // questa funzione si occupa di riempire la porzione "newMeetingDay" al click su di una cella
  const rightSpan = document.getElementById('newMeetingDay')
  rightSpan.classList.add('hasDay')
  rightSpan.innerText = indexOfTheDay + 1
}

const createDays = function (numberOfDays) {
  // numerOfDays adesso è 30 (in aprile)
  const calendarDiv = document.getElementById('calendar')
  for (let i = 0; i < numberOfDays; i++) {
    // per ogni giorno del mese corrente...
    // creo una cella
    const dayCellDiv = document.createElement('div')
    // <div></div>
    dayCellDiv.classList.add('day')
    // <div class="day"></div>

    // ora, questa cella singola del giorno che ho appena creato, la rendo cliccabile!
    dayCellDiv.addEventListener('click', function (e) {
      // devo toglierla da altre precedenti
      unSelectAllDays()
      // ora che non ho più altri "selected" nel calendario, lo aggiungo alla cella che ho cliccato
      dayCellDiv.classList.add('selected')

      // l'ultima cosa che manca è trasportare il valore della cella che ho cliccato
      // in basso a sx, nella sezione "Meeting Day" (ovvero il div con id="newMeetingDay")
      changeMeetingDaySection(i)

      // sempre al click della giornata, nel caso CI SIANO eventi da mostrare
      // dobbiamo fare comparire la lista
      if (appointments[i].length > 0) {
        // ci sono eventi da mostrare!
        showAppointments(i)
      } else {
        // se non ci sono eventi sul giorno selezionato, la lista deve sparire
        const appointementsDiv = document.getElementById('appointments')
        appointementsDiv.style.display = 'none'
      }
    })

    const cellValue = document.createElement('h3')
    // <h3></h3>
    cellValue.innerText = i + 1

    // appendiamo cellValue dentro dayCellDiv
    dayCellDiv.appendChild(cellValue) // <div class="day"><h3>1</h3></div>, appendo il value alla cella del giorno
    calendarDiv.appendChild(dayCellDiv) // appendo la cella del giorno al calendario

    // ora che ho creato la parte "fisica" della pagina, inserisco anche un array dentro l'array appointments
    // per il giorno che sto ciclando
    appointments.push([]) // aggiungo un array vuoto per ogni giorno
  }
}
// lancio la funzione

const showAppointments = function (indexOfTheDay) {
  // questa funzione servirà a popolare la <ul> con gli eventi del giorno, nel caso ce ne siano,
  // ed eventualmente mostrare la sezione "appointments"

  // passaggi:
  // 1) prelevare gli eventi dal cassetto giusto, ovvero di indexOfTheDay
  const appointmentsForThisDay = appointments[indexOfTheDay] // ["14:30 - Q&A", "17:00 - Debrief"]
  // 2) seleziono la <ul> dalla pagina, quella da riempire con gli appuntamenti
  const appointmentsList = document.querySelector('#appointments ul') // <ul></ul>
  // 3) ciclare appointmentsForThisDay e creare un <li> per ciascuno di essi, e appenderlo alla lista

  // prima di riempire la <ul> con gli <li> necessari, SVUOTO LA UL
  appointmentsList.innerHTML = ''

  appointmentsForThisDay.forEach((appointment) => {
    const newLi = document.createElement('li')
    newLi.innerText = appointment // "14:30 - Q&A"
    appointmentsList.appendChild(newLi)
  })

  // la lista ora è piena, ma è ancora nascosta! togliamole il display: none
  const appointementsDiv = document.getElementById('appointments')
  appointementsDiv.style.display = 'block'
}

const handleFormSubmit = function (e) {
  e.preventDefault()
  console.log('il form sta venendo inviato!')
  // cosa facciamo adesso?
  // 1) raccogliamo il giorno selezionato
  const selectedDay = document.getElementById('newMeetingDay').innerText // "9"
  // 2) raccolgo il meeting time dal form
  const meetingTime = document.getElementById('newMeetingTime').value // "20:30"
  // 3) raccolgo il meeting name dal form
  const meetingName = document.getElementById('newMeetingName').value // "Cena di lavoro"
  // 4) combino time e name in una stringa tipo "17:00 - Debrief"
  const meetingString = meetingTime + ' - ' + meetingName // `${meetingTime} - ${meetingName}` --> "20:30 - Cena di lavoro"
  // 5) inserisco questa stringa in uno degli array dentro appointments, in quello corrispondente al giorno selezionato
  // trovo l'indice corretto dentro appointments, in base al giorno selezionato
  const rightIndexForAppointments = parseInt(selectedDay) - 1 // 19
  // pusho il mio evento nel cassettino corretto
  console.log('APPOINTMENTS PRIMA DEL SALVATAGGIO', appointments)
  appointments[rightIndexForAppointments].push(meetingString)
  console.log('APPOINTMENTS DOPO IL SALVATAGGIO', appointments)

  // creiamo il pallino e aggiungiamolo al giorno in cui abbiamo pushato l'evento
  const dot = document.createElement('span')
  dot.classList.add('dot')
  // trovo la cella selezionata
  const selectedCell = document.querySelector('.selected')
  if (!selectedCell.querySelector('.dot')) {
    // se c'è già un dot dentro .selected, non ri-aggiungerlo!
    selectedCell.appendChild(dot)
  }
  showAppointments(rightIndexForAppointments)
}
// aggancio a AddEventListener


printCurrentMonthInH1()
const numberOfDaysInTheCurrentMonth = daysInThisMonth() // 30

createDays(numberOfDaysInTheCurrentMonth)

const meetingForm = document.querySelector('form')
meetingForm.addEventListener('submit', handleFormSubmit)
