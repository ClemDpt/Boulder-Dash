// SELECTION DU NIVEAU

function setLevel(){
    localStorage.setItem("bd-level", JSON.stringify(Number(this.getAttribute("data-level")))); //Ajout dans le local storage du niveau demandé
    localStorage.setItem("bd-lvllist", JSON.stringify(JSON.parse("[1,2,3]"))); //Ajout de la liste des niveaux (pas modifié ici)
}

//Récupération du niveau à partir des boutons
document.addEventListener("DOMContentLoaded", (event) => {
    const buttons = document.querySelectorAll(".bnt-level");
    buttons.forEach((button) => {
        button.addEventListener("click", setLevel)
    })
});

