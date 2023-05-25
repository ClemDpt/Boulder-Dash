const divMap = document.querySelector("#bricks");
const endSreen = document.querySelector("#endScreen");

//Déclaration des variables
let Pos_x = 0;
let Pos_y = 0;
let x = 0;
let y = 0;
let tableau = [];
let tableau_vierge = [];
let tableau_niveau1 = [];
let paused = false;
let time_paused = 100;
let nextLvl = 0;

//LECTURE D'UN FICHIER TEXTE
function fopen(path){
    return fetch(`${location.origin}/${path}`).then((response) => response.text());
}

//AFFICHAGE DU NIVEAU
function afficherMap() {
    let txt = "";
    txt += "<div id='row'>";

    for (let i=0; i<34; i++){
        txt += "<img src='./../textures/obsidian_hq.png'>";
    }
    
    txt += "</div>";
    for (let i=0; i<tableau.length; i++){
        txt += "<div id='row'>";
        txt += "<img src='./../textures/obsidian_hq.png'>";
        for (let j=0; j<tableau[i].length; j++){
            if (tableau[i][j] == 'T') {
                txt += "<img src='./../textures/dirt_hq.png'>";
            } else if (tableau[i][j] == 'D') {
                txt += "<img src='./../textures/diamond_ore_hq.png'>";
            } else if (tableau[i][j] == 'R') {
                txt += "<img src='./../textures/stone_hq.png'>";
            } else if (tableau[i][j] == 'M') {
                txt += "<img src='./../textures/ground_hq.png'>";
            } else if (tableau[i][j] == 'V') {
                txt += "<img src='./../textures/void_hq.png'>";
            } else if (tableau[i][j] == 'P') {
                txt += "<img src='./../textures/steve.png'>";
            } else if (tableau[i][j] == 'S') {
                txt += "<img src='./../textures/teleport.png'>";
            }

        }
        txt += "<img src='./../textures/obsidian_hq.png'>";
        txt += "</div>";
    }

    txt += "<div id='row'>";
    for (let i=0; i<34; i++){
        txt += "<img src='./../textures/obsidian_hq.png'>";
    }
    txt += "</div>";

    divMap.innerHTML = txt;
    setInterval(gravity, 150);
    //gravity();
}

//SCOREBOARD
//Déclaration des variables
let coinScore = 0;
let moveCount = 0;
let globalScore = 0;
let life = 3;
let coinMap = 0;

//Mise à jour du scoreboard
function refreshSB() {
    const coinScoreElement = document.getElementById("coin_score");
    const globalScoreElement = document.getElementById("globalScore");
    const lifeElement = document.getElementById("life");
    coinScoreElement.textContent = coinScore;
    globalScoreElement.textContent = `Score : ${globalScore}`;
    lifeElement.textContent = life;
    if(coinMap === coinScore){ //Ouverture de la sortie si tous les diamants sont récoltés
        tableau[14][30] = "S";
        afficherMap();
    }
}
//Décompte des dimants de la carte
function compteCoinMap(){
    for (let i=0; i<tableau.length; i++){
        for (let j=0; j<tableau[i].length; j++){
            if (tableau[i][j] == 'D') {
                ++coinMap;
            }
        }
    }
    const coinMapElement = document.getElementById("coinMap");
    coinMapElement.textContent = coinMap;
}

//DEPLACEMENTS DU JOUEUR
function move(e) {

    tableau.forEach((row, i) => {
        row.forEach((symbol, j) => {
            if (symbol == 'P') {
                Pos_x = i;
                Pos_y = j;
            }
        })
    })
    //Déplacement en haut (Z)
    if (e.keyCode == 90) {
        if (Pos_x == 0) {
            console.log("Impossible");
        } else if (tableau[Pos_x - 1][Pos_y] == 'T' || tableau[Pos_x - 1][Pos_y] == 'V') {
            tableau[Pos_x - 1][Pos_y] = 'P';
            tableau[Pos_x][Pos_y] = 'V';
        } else if (tableau[Pos_x - 1][Pos_y] == 'M' || tableau[Pos_x - 1][Pos_y] == 'C' || tableau[Pos_x - 1][Pos_y] == 'R') {
            tableau[Pos_x][Pos_y] = 'P';
        } else if (tableau[Pos_x - 1][Pos_y] == 'D') {
            tableau[Pos_x - 1][Pos_y] = 'P';
            tableau[Pos_x][Pos_y] = 'V';
            ++coinScore;
            globalScore += 100;
        } else if (tableau[Pos_x - 1][Pos_y] == 'S') {
            changementLevel();
        }

    }//Déplacement en bas (S)
    else if (e.keyCode == 83) {
        if (Pos_x == 15) {
            console.log("Impossible");
        } else if (tableau[Pos_x + 1][Pos_y] == 'T' || tableau[Pos_x + 1][Pos_y] == 'V') {
            tableau[Pos_x + 1][Pos_y] = 'P';
            tableau[Pos_x][Pos_y] = 'V';
        } else if (tableau[Pos_x + 1][Pos_y] == 'D') {
            tableau[Pos_x + 1][Pos_y] = 'P';
            tableau[Pos_x][Pos_y] = 'V';
            ++coinScore;
            globalScore += 100;
        } else if (tableau[Pos_x + 1][Pos_y] == 'S') {
            changementLevel();
        } else if (Pos_x != 0){
            if(tableau[Pos_x + 1][Pos_y] == 'M' || tableau[Pos_x + 1][Pos_y] == 'C' || tableau[Pos_x - 1][Pos_y] == 'R') {
            tableau[Pos_x][Pos_y] = 'P';
            }
        }
    }//Déplacement à droite (D)
    else if (e.keyCode == 68) {
        if (tableau[Pos_x][Pos_y + 1] == 'T' || tableau[Pos_x][Pos_y + 1] == 'V') {
            tableau[Pos_x][Pos_y + 1] = 'P';
            tableau[Pos_x][Pos_y] = 'V';
        } else if (tableau[Pos_x][Pos_y + 1] == 'M' || tableau[Pos_x][Pos_y + 1] == 'C') {
            tableau[Pos_x][Pos_y] = 'P';
        } else if (tableau[Pos_x][Pos_y + 1] == 'D') {
            tableau[Pos_x][Pos_y + 1] = 'P';
            tableau[Pos_x][Pos_y] = 'V';
            ++coinScore;
            globalScore += 100;
        } else if (tableau[Pos_x][Pos_y + 1] == 'S') {
            changementLevel();
        } else if (tableau[Pos_x][Pos_y + 1] == 'R' && tableau[Pos_x][Pos_y + 2] == 'V') {
            tableau[Pos_x][Pos_y + 1] = 'P';
            tableau[Pos_x][Pos_y + 2] = 'R';
            tableau[Pos_x][Pos_y] = 'V';
        } else if (tableau[Pos_x][Pos_y + 1] == 'R' && (tableau[Pos_x][Pos_y + 2] == 'M' || tableau[Pos_x][Pos_y + 2] == 'C' || tableau[Pos_x][Pos_y + 2] == 'T' || tableau[Pos_x][Pos_y + 2] == 'D')) {
            tableau[Pos_x][Pos_y] = 'P';
        }
    }//Déplacement à gauche (Q)
    else if (e.keyCode == 81) {
        if (tableau[Pos_x][Pos_y - 1] == 'T' || tableau[Pos_x][Pos_y - 1] == 'V') {
            tableau[Pos_x][Pos_y - 1] = 'P';
            tableau[Pos_x][Pos_y] = 'V';
        } else if (tableau[Pos_x][Pos_y - 1] == 'M' || tableau[Pos_x][Pos_y - 1] == 'C') {
            tableau[Pos_x][Pos_y] = 'P';
        } else if (tableau[Pos_x][Pos_y - 1] == 'D') {
            tableau[Pos_x][Pos_y - 1] = 'P';
            tableau[Pos_x][Pos_y] = 'V';
            ++coinScore;
            globalScore += 100;
        } else if (tableau[Pos_x][Pos_y - 1] == 'S') {
            changementLevel();
        } else if (tableau[Pos_x][Pos_y - 1] == 'R' && tableau[Pos_x][Pos_y - 2] == 'V') {
            tableau[Pos_x][Pos_y - 1] = 'P';
            tableau[Pos_x][Pos_y - 2] = 'R'
            tableau[Pos_x][Pos_y] = 'V';
        } else if (tableau[Pos_x][Pos_y - 1] == 'R' && (tableau[Pos_x][Pos_y - 2] == 'M' || tableau[Pos_x][Pos_y - 2] == 'C' || tableau[Pos_x][Pos_y - 2] == 'T' || tableau[Pos_x][Pos_y - 2] == 'D')) {
            tableau[Pos_x][Pos_y] = 'P';
        }
    }
    afficherMap();
    globalScore -= 1; //Malus lié au déplacement
    refreshSB();
}

//GRAVITE
function gravity() {

    tableau.forEach((row, i) => {
        row.forEach((symbol, j) => {
            if (i != 15){//Condition pour éviter des messages d'erreurs
                if (symbol == 'R') {
                    x = i;
                    y = j;
                    if (tableau[x + 1][y] == 'V') {
                        //MORT DU JOUEUR SUITE A UNE TOMBEE DE PIERRE
                        if (tableau[x + 2][y] == 'P') {
                            tableau[x + 2][y] = 'R';
                            tableau[x][y] = 'V';
                            if (life > 1) {
                                mort();
                            } else{
                                gameOver("Game over");
                            }

                        } else if (tableau[x + 2][y] != 'P') {
                            tableau[x + 1][y] = 'R';
                            tableau[x][y] = 'V';
                        }
                        afficherMap();
                    }
                }
            }
        })
    })

}

//MORT + GAME OVER
function mort(){
    --life;
    reset(tableau_vierge);
    refreshSB();
}

function gameOver(mot) {
    life = 3;
    const lvllist = localStorage.getItem("bd-lvllist").slice(1,-1).split(',');
    if(confirm(`${mot} ! Score : ${globalScore}`)){ //Affichage du score global
        fopen(`/niveaux/niveau${Number(lvllist[0])}.txt`).then((response) => { //Retour au premier niveau
            tableau_niveau1 = JSON.parse(response);
            reset(tableau_niveau1);
            localStorage.setItem("bd-level", JSON.stringify(1));
            localStorage.removeItem("bd-save");
            location.reload();
        })
    }
}

//TIMER + GETTIME
function timer(start=120) {
    let tempsmax=start;
    const timerElement = document.getElementById("timer")
    timerInt = setInterval(() => {
        timerElement.textContent = `Timer : ${tempsmax}`;
        tempsmax = tempsmax <= 0 ? 0 : tempsmax-1;
        if (tempsmax == 0){ //Mort du joueur si le timer arrive à 0
            if (life > 1) {
                mort();
            } else{
                gameOver("Game over");
            }
        }
    }, 1000)
}

function getTime(){
    const timerElement = document.getElementById("timer");
    return Number(timerElement.textContent.substring(timerElement.textContent.length - 3));
}

//RESET (scoreboard + tableau)
function reset(tab) {
    coinScore = 0;
    globalScore = 0;
    clearInterval(timerInt);
    timer(); //Relance du timer pour éviter les cas où 2 timers fonctionnaient en même temps
    for(let i = 0; i < tableau.length; ++i){ //Remplacement du tableau
        for(let j = 0; j< tableau[i].length; ++j){
            tableau[i][j] = tab[i][j];
        }
    }
    afficherMap();
}
        
//QUITTER
function save(){
    localStorage.setItem("bd-save", JSON.stringify({ //Stockage des informations dans le local storage
        timer: getTime(), 
        coinScore: coinScore,
        globalScore: globalScore,
        life: life,
        map: tableau
    }))
}

function retrieve(nom){
    return localStorage.getItem(nom)
}

//CHANGEMENT DE NIVEAU
function changementLevel(){
    const lvllist = localStorage.getItem("bd-lvllist").slice(1,-1).split(',');
    const positionlvl = localStorage.getItem("bd-level");

    let nextLvl = Number(positionlvl)+1;
    localStorage.setItem("bd-chglvl", JSON.stringify({
        globalScore: globalScore,
        life: life
    }))
    if (nextLvl != lvllist.length+1){
        fopen(`/niveaux/niveau${Number(lvllist[positionlvl])}.txt`).then((response) => {
            tableau_vierge = JSON.parse(response);
            reset(tableau_vierge);
            localStorage.setItem("bd-level", JSON.stringify(nextLvl));
            localStorage.removeItem("bd-save");
            location.reload();
        })
    }
    else{
        gameOver("Bravo tu as gagné");
    }
}

//BOUTONS
//Quitter
function quit(){
    if (confirm(`Voulez-vous vraiment quitter ? (La partie sera sauvgardée.)`)) {
        window.location='index.html';
        save();
    }
}

//Redémarrer
function restart(){
    if(confirm(`Voulez-vous vraiment recommencer ?`)){
        localStorage.removeItem("bd-save");
        location.reload();
    }
}

//Pause
function pause(){
    const image_pause = document.getElementById("paused");
    const texte_pause = document.getElementById("txtPause");
    if(paused == false){
        time_paused = getTime();
        clearInterval(timerInt);
        paused = true;
        image_pause.classList.remove("hidden");
        texte_pause.classList.remove("hidden");
    }
    else{
        timer(time_paused-1);
        paused = false;
        image_pause.classList.add("hidden");
        texte_pause.classList.add("hidden");
    }
}

//APPEL DES FONCTIONS
document.addEventListener("DOMContentLoaded", (event) => {
    //Récupération des données 
    const gameData = JSON.parse(retrieve("bd-save"));
    const quitButton = document.getElementById("quit");
    const restartButton = document.getElementById("restart");
    const pauseButton = document.getElementById("pause");
    const lvllist = localStorage.getItem("bd-lvllist").slice(1,-1).split(',');
    const positionlvl = localStorage.getItem("bd-level")-1;
    const choixPartie = JSON.parse(localStorage.getItem("bd-partie"));
    const lvlData = JSON.parse(retrieve("bd-chglvl"));
    console.log(lvllist);
    console.log(positionlvl);

    //Récupération du score d'un niveau à l'autre
    if (lvlData){
        globalScore = lvlData.globalScore;
        life = lvlData.life;
        localStorage.removeItem("bd-chglvl");
    }
    if (choixPartie === 'load'){//Choix entre charger et nouvelle partie
        if(gameData){ //Vérification qu'il y a bien des données dans le local storage
            tableau = gameData.map;
            globalScore = gameData.globalScore;
            coinScore = gameData.coinScore;
            life = gameData.life;
            timer(gameData.timer);
        }
        else{ //Sinon reprise du tableau de base
            fopen(`/niveaux/niveau${Number(lvllist[positionlvl])}.txt`).then((response) => {
                tableau= JSON.parse(response);})
            timer();
        }
        fopen(`/niveaux/niveau${Number(lvllist[positionlvl])}.txt`).then((response) => { //Récupération d'un tableau vide pour l'utiliser en cas de mort
            tableau_vierge = JSON.parse(response);})
        //Lancement du jeu
        afficherMap();
        compteCoinMap();
        document.body.addEventListener('keydown', move);
        quitButton.addEventListener("click", quit);
        restartButton.addEventListener("click", restart);
        pauseButton.addEventListener("click", pause);
    }
    else{
    fopen(`/niveaux/niveau${Number(lvllist[positionlvl])}.txt`).then((response) => {//Récupération du tableau
        tableau = JSON.parse(response);
        tableau_vierge = JSON.parse(response);
        //Lancement du jeu
        afficherMap();
        timer();
        compteCoinMap();
        document.body.addEventListener('keydown', move);
        quitButton.addEventListener("click", quit);
        restartButton.addEventListener("click", restart);
        pauseButton.addEventListener("click", pause);
    })}
    
});

