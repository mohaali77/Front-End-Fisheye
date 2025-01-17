//fonction permettant d'ouvrir la fenêtre contactez-moi
function displayModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "block";
    modal.setAttribute('aria-hidden', 'true')
    //lors de l'ouverture, on supprime les tabindex des articles, pour pouvoir naviguer au clavier dans la modale
    const articles = document.querySelectorAll('article')
    articles.forEach(article => {
        article.removeAttribute('tabindex')
    });
    //de même pour le bouton like
    const likes = document.querySelectorAll('.fa-solid.fa-heart')
    likes.forEach(like => {
        like.removeAttribute('tabindex')
    });
    //de même pour l'input select
    const mySelect = document.querySelector("select");
    mySelect.setAttribute("tabindex", "-1");
}

//fonction permettant de fermer la fenêtre contactez-moi
function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
    modal.setAttribute('aria-hidden', 'false')
    //lors de la fermeture, on rajoute les tabindex au articles, pour pouvoir naviguer au clavier sur les posts
    const articles = document.querySelectorAll('article')
    articles.forEach(article => {
        article.setAttribute('tabindex', '0')
    });
    //de même pour le bouton like
    const likes = document.querySelectorAll('.fa-solid.fa-heart')
    likes.forEach(like => {
        like.setAttribute('tabindex', '0')
    });
    //de même pour l'input select
    const mySelect = document.querySelector("select");
    mySelect.removeAttribute("tabindex", "-1");

}

//fonction permettant de fermer la modale en appuyant sur la touche echap
function closeModalEscape() {
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            const modal = document.getElementById("contact_modal");
            modal.style.display = "none";
            modal.setAttribute('aria-hidden', 'false')
            //lors de la fermeture, on rajoute les tabindex au articles, pour pouvoir naviguer au clavier sur les posts
            const articles = document.querySelectorAll('article')
            articles.forEach(article => {
                article.setAttribute('tabindex', '0')
            });
            //de même pour le bouton like
            const likes = document.querySelectorAll('.fa-solid.fa-heart')
            likes.forEach(like => {
                like.setAttribute('tabindex', '0')
            });
            //de même pour l'input select
            const mySelect = document.querySelector("select");
            mySelect.removeAttribute("tabindex", "-1");
        }
    });
}

closeModalEscape();

//Elements DOM
const form = document.querySelector('form');
const inputFirst = document.getElementById("first");
const inputLast = document.getElementById("last");
const inputEmail = document.getElementById("email");
const inputMsg = document.getElementById("msg");
const errorFirst = document.getElementById("errorFirst");
const errorLast = document.getElementById("errorLast");
const errorEmail = document.getElementById("errorEmail");
const errorMsg = document.getElementById("errorMsg");

//fonction qui va permettre d'effectuer des test sur les inputs à l'aide d'expression régulières. 

function isFormValid() {

    //la fonction est définit comme true dès le debut, elle sera rappelé en fin de fonction,
    //si apres le test des regex elle reste true
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
    }

    ////////// NOM ////////////

    let regexLast = new RegExp(/^[a-zA-Z]{2,}$/);

    if (!inputLast.value || regexLast.test(inputLast.value) == false) {
        errorLast.innerText = 'Veuillez entrer 2 caractères ou plus pour le champ du nom.'
        isFormValid = false
    } else {
        errorLast.innerText = ''
    }

    ////////// EMAIL ////////////


    let regexEmail = new RegExp(/^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$/);

    if (!inputEmail.value || regexEmail.test(inputEmail.value) == false) {
        errorEmail.innerText = 'Veuillez entrer votre adresse e-mail.'
        isFormValid = false
    } else {
        errorEmail.innerText = ''
    }

    ///////// MESSAGE ///////////

    let regexMsg = new RegExp(/^.{10,300}$/)

    if (!inputMsg.value || regexMsg.test(inputMsg.value) == false) {
        errorMsg.innerText = 'Veuillez entrer 300 caractères maximum pour le message.'
        isFormValid = false
    } else {
        errorMsg.innerText = ''
    }

    return isFormValid

}

//fonction qui va vérifier si la fonction isFormValid, renvoie true. Si c'est le cas, un console.log des informations est effectué

function formCheck() {
    form.addEventListener('submit', (e) => {
        e.preventDefault()

        if (isFormValid() == true) {
            console.log(inputFirst.value, inputLast.value, inputEmail.value, inputMsg.value);
        }


    })
}

formCheck()



