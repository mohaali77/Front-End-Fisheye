//ouvre la fenêtre contactez-moi
function displayModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "block";
    modal.setAttribute('aria-hidden', 'true')
}

//ferme la fenêtre contactez-moi
function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
    modal.setAttribute('aria-hidden', 'false')
}

function closeModalEscape() {
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            const modal = document.getElementById("contact_modal");
            modal.style.display = "none";
            modal.setAttribute('aria-hidden', 'false')
        }
    });
}

closeModalEscape();


const inputFirst = document.getElementById("first");
const inputLast = document.getElementById("last");
const inputEmail = document.getElementById("email");
const inputMsg = document.getElementById("msg");
const errorFirst = document.getElementById("errorFirst");
const errorLast = document.getElementById("errorLast");
const errorEmail = document.getElementById("errorEmail");
const errorMsg = document.getElementById("errorMsg");

function isFormValid() {

    let isFormValid = true

    ////////// PRENOM ////////////

    //on définit notre regex qui définira les conditions de validations du prenom 
    let regexFirst = new RegExp(/^[a-zA-Z]{2,}$/);

    //si le champs de l'input est vide, ou que les conditions fixé par la regex ne sont pas valides, alors 
    //on affiche un message d'erreur, et on définit la fonction comme false. 
    //Sinon aucun paramètre ne change.
    if (!inputFirst.value || regexFirst.test(inputFirst.value) == false) {
        errorFirst.innerText = 'Veuillez entrer 2 caractères ou plus pour le champ du prénom.'
        isFormValid = false
    } else {
        errorFirst.innerText = ''
        inputFirst.style.border = "none"
    }

    ////////// NOM ////////////

    let regexLast = new RegExp(/^[a-zA-Z]{2,}$/);

    if (!inputLast.value || regexLast.test(inputLast.value) == false) {
        errorLast.innerText = 'Veuillez entrer 2 caractères ou plus pour le champ du nom.'
        isFormValid = false
    } else {
        errorLast.innerText = ''
        inputLast.style.border = "none"
    }

    ////////// EMAIL ////////////


    let regexEmail = new RegExp(/^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$/);

    if (!inputEmail.value || regexEmail.test(inputEmail.value) == false) {
        errorEmail.innerText = 'Veuillez entrer votre adresse e-mail.'
        isFormValid = false
    } else {
        errorEmail.innerText = ''
        inputEmail.style.border = "none"
    }

    ///////// MESSAGE ///////////

    let regexMsg = new RegExp(/^.{0,300}$/)

    if (!inputMsg.value || regexMsg.test(inputMsg.value) == false) {
        errorMsg.innerText = 'Veuillez entrer 300 caractères maximum pour le message.'
        isFormValid = false
    } else {
        errorMsg.innerText = ''
        inputMsg.style.border = "none"
    }

    return isFormValid
}

let form = document.querySelector('form');
form.addEventListener('submit', (e) => {
    e.preventDefault()

    if (isFormValid() == true) {
        console.log(inputFirst.value, inputLast.value, inputEmail.value, inputMsg.value);
    }


})

