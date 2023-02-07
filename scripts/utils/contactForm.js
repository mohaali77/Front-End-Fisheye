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

let form = document.querySelector('form');
form.addEventListener('submit', (e) => {

    //faire regex ? 

    e.preventDefault()

    const inputFirst = document.getElementById("first");
    const inputLast = document.getElementById("last");
    const inputEmail = document.getElementById("email");
    const inputMsg = document.getElementById("msg");

    console.log(inputFirst.value, inputLast.value, inputEmail.value, inputMsg.value);
})

