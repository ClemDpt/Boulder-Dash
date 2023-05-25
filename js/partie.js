//CHOIX ENTRE RECHARGER ET NOUVELLE PARTIE
function setPartie(){
    localStorage.setItem("bd-partie", JSON.stringify(String(this.getAttribute("data-partie")))); //Ajout dans le local storage du choix
}

//Récupération du choix à partir des boutons
document.addEventListener("DOMContentLoaded", (event) => {
    const buttons = document.querySelectorAll(".bnt-partie");
    buttons.forEach((button) => {
        button.addEventListener("click", setPartie)
    })
});

