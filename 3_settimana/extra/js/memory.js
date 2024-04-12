let arrayAnimali = ['🐱', '🦉', '🐾', '🦁', '🦋', '🐛', '🐝', '🐬', '🦊', '🐨', '🐰', '🐯', '🐱', '🦉', '🐾', '🦁', '🦋', '🐛', '🐝', '🐬', '🦊', '🐨', '🐯', '🐰'];
//libreria per icone
//https://html-css-js.com/html/character-codes/


let arrayComparison = [];

document.body.onload = startGame();

var interval;
let iconsFind = document.getElementsByClassName("find");
let modal = document.getElementById('modal');
var timer = document.querySelector(".timer");

//questa funzione serve a mescolare in modo random gli elementi dell'array che viene passato (l'array contiene le icone degli animali)
function shuffle(a) {
    var currentIndex = a.length;
    var temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = a[currentIndex];
        a[currentIndex] = a[randomIndex];
        a[randomIndex] = temporaryValue;
    }
    return a;
}
// questa funzione rimuove la classe active e chiama la funzione startGame()
function playAgain() {
    modal.classList.remove("active");
    startGame();
}

function startGame() {
    // qui pulisce il timer
    clearInterval(interval);
    // dichiara un array vuoto
    arrayConfronto = [];
    // mescola casualmente l'array degli animali
    var arrayShuffle = shuffle(arrayAnimali);
    // aggancia il contenitore con id griglia
    var lista = document.getElementById('griglia');
    // pulisce tutti gli elementi che eventualmente contiene
    while (lista.hasChildNodes()) {
        lista.removeChild(lista.firstChild);
    }
    //qui fa un ciclo per creare i 24 div child -> aggiunge la class e l'elemento dell'array in base all'indice progressivo
    for (var i = 0; i < 24; i++) {

        var box = document.createElement('div');
        var element = document.createElement('div');
        element.className = 'icon';
        document.getElementById('griglia').appendChild(box).appendChild(element);
        element.innerHTML = arrayShuffle[i];
    }

    //chiama la funzione timer
    startTimer();

    var icon = document.getElementsByClassName("icon");
    var icons = [...icon];
    //associa a tutti gli elementi (div) di classe icon l'evento click e le due funzioni definit sotto
    for (var i = 0; i < icons.length; i++) {
        icons[i].addEventListener("click", displayIcon);
        icons[i].addEventListener("click", openModal);
    }
}


function displayIcon() {
    var icon = document.getElementsByClassName("icon");
    var icons = [...icon];
    //mette/toglie la classe show
    this.classList.toggle("show");
    //aggiunge l'oggetto su cui ha cliccato all'array del confronto
    arrayComparison.push(this);

    var len = arrayComparison.length;
    //se nel confronto ci sono due elementi
    if (len === 2) {
        //se sono uguali aggiunge la classe find
        if (arrayComparison[0].innerHTML === arrayComparison[1].innerHTML) {
            arrayComparison[0].classList.add("find", "disabled");
            arrayComparison[1].classList.add("find", "disabled");
            arrayComparison = [];
        } else {
            //altrimenti (ha sbagliato) aggiunge solo la classe disabled
            icons.forEach(function(item) {
                item.classList.add('disabled');
            });
            // con il timeout rimuove  la classe show per nasconderli
            setTimeout(function() {
                arrayComparison[0].classList.remove("show");
                arrayComparison[1].classList.remove("show");
                icons.forEach(function(item) {
                    item.classList.remove('disabled');
                    for (var i = 0; i < iconsFind.length; i++) {
                        iconsFind[i].classList.add("disabled");
                    }
                });
                arrayComparison = [];
            }, 700);
        }
    }
}

//questa viene mostrata alla fine quando sono tutte le risposte esatte
function openModal() {
    if (iconsFind.length == 24) {
        clearInterval(interval);
        modal.classList.add("active");
        document.getElementById("tempoTrascorso").innerHTML = timer.innerHTML;
        closeModal();
    }
}
// questo nasconde alla fine e riavvia il gioco
function closeModal() {
    closeicon.addEventListener("click", function(e) {
        modal.classList.remove("active");
        startGame();
    });
}

// questa funzione calcola il tempo e aggiorna il contenitore sotto
function startTimer() {

    var secondi = 0;
    var minuti = 0;
    var ore = 0;

    interval = setInterval(function() {
        timer.innerHTML = 'Tempo: ' + minuti + " min " + secondi + " sec";
        secondi++;
        if (secondi == 60) {
            minuti++;
            secondi = 0;
        }
        if (minuti == 60) {
            ore++;
            minuti = 0;
        }
    }, 1000);
}
