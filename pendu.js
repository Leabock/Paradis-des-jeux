"use strict";

// Liste des mots possibles
const mots = ["WIWI", "CHIEN", "JAVASCRIPT", "ORDINATEUR", "MEMORY", "PUISSANCE", "MASTERMIND"];

// Variables du jeu
let motSecret = "";
let lettresTrouvees = [];
let lettresJouees = [];
let erreurs = 0;
const maxErreurs = 6;

// Récupération des éléments HTML
const motCache = document.getElementById("motCache");
const inputLettre = document.getElementById("lettre");
const btnValider = document.getElementById("btnValider");
const btnRejouer = document.getElementById("btnRejouer");
const vies = document.getElementById("vies");
const zoneLettresJouees = document.getElementById("lettresJouees");
const message = document.getElementById("message");

// Lancement du jeu
nouvellePartie();

btnValider.addEventListener("click", jouer);
btnRejouer.addEventListener("click", nouvellePartie);

inputLettre.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        jouer();
    }
});

// Crée une nouvelle partie
function nouvellePartie() {
    motSecret = mots[Math.floor(Math.random() * mots.length)];
    lettresTrouvees = [];
    lettresJouees = [];
    erreurs = 0;

    message.textContent = "";
    inputLettre.disabled = false;
    btnValider.disabled = false;
    inputLettre.value = "";

    afficherJeu();
}

// Affiche le mot caché, les vies et les lettres jouées
function afficherJeu() {
    let affichage = "";

    for (let lettre of motSecret) {
        if (lettresTrouvees.includes(lettre)) {
            affichage += lettre + " ";
        } else {
            affichage += "_ ";
        }
    }

    motCache.textContent = affichage;
    vies.textContent = "Vies restantes : " + (maxErreurs - erreurs);

    if (lettresJouees.length === 0) {
        zoneLettresJouees.textContent = "Lettres jouées : aucune";
    } else {
        zoneLettresJouees.textContent = "Lettres jouées : " + lettresJouees.join(" - ");
    }
}

// Vérifie la lettre proposée
function jouer() {
    let lettre = inputLettre.value.toUpperCase();
    inputLettre.value = "";

    if (lettre === "") {
        message.textContent = "Entre une lettre.";
        return;
    }

    if (lettresJouees.includes(lettre)) {
        message.textContent = "Cette lettre a déjà été jouée.";
        return;
    }

    lettresJouees.push(lettre);

    if (motSecret.includes(lettre)) {
        lettresTrouvees.push(lettre);
        message.textContent = "Bonne lettre !";
    } else {
        erreurs++;
        message.textContent = "Mauvaise lettre.";
    }

    afficherJeu();
    verifierFin();
}

// Vérifie victoire ou défaite
function verifierFin() {
    let motComplet = true;

    for (let lettre of motSecret) {
        if (!lettresTrouvees.includes(lettre)) {
            motComplet = false;
        }
    }

    if (motComplet) {
        message.textContent = "Bravo, tu as gagné !";
        terminerPartie();
    }

    if (erreurs >= maxErreurs) {
        message.textContent = "Perdu ! Le mot était : " + motSecret;
        terminerPartie();
    }
}

// Bloque le jeu à la fin
function terminerPartie() {
    inputLettre.disabled = true;
    btnValider.disabled = true;
}