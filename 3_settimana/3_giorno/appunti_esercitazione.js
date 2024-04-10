const handleSubmit = function (e) {
    // invoca la funzione che genera la lista con il nuovo
    // invoca la funzione che cambia la classe (aggiunge sbarrato)
    // invoca la funzione che elimina il task
}

// una funzione che genera la lista con il nuovo task
//      agganciarsi nell'html
//      utilizzare template literals per stampare direttamente anche dell'html
//      inputField.value
//      font-awesome -> <i class="far fa-trash-alt"></i>

// una funzione che cambia la classe (aggiunge sbarrato)
//      agganciarsi nell'html
//      for 
//      classList.toggle -> text-decoration:line.through (css)

// una funzione che elimina il task
//      agganciarsi nell'html
//      for
//      remove

window.onload = function () {
    let form = document.querySelector('form')
    form.addEventListener('submit', handleSubmit)
}
