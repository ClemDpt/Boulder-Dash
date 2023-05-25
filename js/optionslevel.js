//IMPORTER NIVEAU
const inputElement = document.getElementById("iptfile"); //Récupérer le fichier
inputElement.addEventListener("change", handleFiles, false);
function handleFiles() {
    const fileList = this.files; 
    const file = fileList[0];
    let map = []; //Récupération du tableau
    // Ajout dans le local storage du niveau avec tous les paramètres à 0
    file.text().then((response) => { 
        map = JSON.parse(response);
        localStorage.setItem("bd-save", JSON.stringify({
            timer: 200, 
            coinScore: 0,
            globalScore: 0,
            life: 3,
            map: map
        }))
        localStorage.setItem("bd-partie", JSON.stringify("load"));
        localStorage.setItem("bd-level", JSON.stringify(1))
        window.location='jeu.html'
    });
    
}

//SUPPRIMER NIVEAU
function affDelet(){
    //Permet de faire disparaître le bouton delet et apparaître les options
    boxElement.forEach(box => {
        box.classList.remove("hidden");
    });
    boxSub.classList.remove("hidden");
    bntdlt.classList.add("hidden");
}

function submitBox(){
    //Création du tableau des niveaux
    const nv1 = document.getElementById("niveau1");
    const nv2 = document.getElementById("niveau2");
    const nv3 = document.getElementById("niveau3");
    let checked = [];
    for (let i = 0; i< 3; ++i){
        if(document.getElementById(`niveau${i+1}`).checked){
            checked.push(i+1);
        }
    }
    localStorage.setItem("bd-lvllist", JSON.stringify(checked));
    localStorage.setItem("bd-level", JSON.stringify(1));
    window.location='jeu.html';
}
//Récupération des infos du html
const bntdlt = document.getElementById("bntdlt");
const boxElement = document.querySelectorAll(".box");
const boxSub = document.getElementById("boxSub");
bntdlt.addEventListener("click", affDelet);
boxSub.addEventListener("click", submitBox);



//ORGANISER NIVEAU
function organise(){
    //Permet de faire disparaître le bouton organise et apparaître les options
    orgfile.classList.remove("hidden");
    subtxt.classList.remove("hidden");
    orgipt.classList.add("hidden");
}
function submit(){
    let listLvl = orgfile.value;
    if (listLvl){
        localStorage.setItem("bd-lvllist", JSON.stringify(JSON.parse(listLvl)));
        localStorage.setItem("bd-level", JSON.stringify(1));
        window.location='jeu.html';
    }
}
//Récupération des infos du html
const orgipt = document.getElementById("bntorg");
const orgfile = document.getElementById("orgfile");
const subtxt = document.getElementById("subtxt");
orgipt.addEventListener("click", organise);
subtxt.addEventListener("click", submit);
