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
