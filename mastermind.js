"use strict";

// Couleurs possibles
const couleurs = ["R", "J", "B", "V", "M", "O"];

// Combinaison secrète
let secret = [];

// Proposition du joueur
let proposition = [];

// Nombre d'essais
let essais = 0;
const maxEssais = 10;

// Récupération des éléments HTML
const boutonsCouleurs = document.querySelectorAll(".couleur");
const zoneProposition = document.getElementById("proposition");
const boutonValider = document.getElementById("validerMastermind");
const boutonEffacer = document.getElementById("effacerMastermind");
const zoneResultats = document.getElementById("resultats");

// Création de la combinaison secrète
for (let i = 0; i < 4; i++) {
    let hasard = Math.floor(Math.random() * couleurs.length);
    secret.push(couleurs[hasard]);
}

console.log("Secret :", secret);

// Clic sur une couleur
boutonsCouleurs.forEach(function (bouton) {
    bouton.addEventListener("click", function () {
        if (proposition.length < 4) {
            proposition.push(bouton.dataset.couleur);
            afficherProposition();
        }
    });
});

// Valider
boutonValider.addEventListener("click", verifierProposition);

// Effacer
boutonEffacer.addEventListener("click", function () {
    proposition = [];
    afficherProposition();
});

// Affichage de la proposition actuelle
function afficherProposition() {
    zoneProposition.innerHTML = "";

    proposition.forEach(function (couleur) {
        let pion = document.createElement("div");
        pion.classList.add("pion", convertirClasse(couleur));
        zoneProposition.appendChild(pion);
    });
}

// Vérification
function verifierProposition() {
    if (proposition.length < 4) {
        alert("Choisis 4 couleurs.");
        return;
    }

    essais++;

    let bienPlaces = 0;
    let bonnesCouleurs = 0;

    let secretCopie = [...secret];
    let propositionCopie = [...proposition];

    // Bien placés
    for (let i = 0; i < 4; i++) {
        if (propositionCopie[i] === secretCopie[i]) {
            bienPlaces++;
            secretCopie[i] = null;
            propositionCopie[i] = null;
        }
    }

    // Bonnes couleurs mal placées
    for (let i = 0; i < 4; i++) {
        if (propositionCopie[i] !== null) {
            let index = secretCopie.indexOf(propositionCopie[i]);

            if (index !== -1) {
                bonnesCouleurs++;
                secretCopie[index] = null;
            }
        }
    }

    afficherResultat(bienPlaces, bonnesCouleurs);

    if (bienPlaces === 4) {
        alert("Bravo, tu as gagné !");
        desactiverJeu();
    } else if (essais >= maxEssais) {
        alert("Perdu ! La combinaison était : " + secret.join(" - "));
        desactiverJeu();
    }

    proposition = [];
    afficherProposition();
}

// Affichage d'une ligne de résultat
function afficherResultat(bienPlaces, bonnesCouleurs) {
    let ligne = document.createElement("div");
    ligne.classList.add("ligne-resultat");

    proposition.forEach(function (couleur) {
        let pion = document.createElement("div");
        pion.classList.add("pion", convertirClasse(couleur));
        ligne.appendChild(pion);
    });

    let texte = document.createElement("span");
    texte.classList.add("petit-resultat");
    texte.textContent =
        "Bien placés : " + bienPlaces +
        " | Bonnes couleurs : " + bonnesCouleurs;

    ligne.appendChild(texte);
    zoneResultats.prepend(ligne);
}

// Conversion lettres vers classes CSS
function convertirClasse(couleur) {
    if (couleur === "R") return "rouge";
    if (couleur === "J") return "jaune";
    if (couleur === "B") return "bleu";
    if (couleur === "V") return "vert";
    if (couleur === "M") return "violet";
    if (couleur === "O") return "orange";
}

// Désactivation du jeu
function desactiverJeu() {
    boutonsCouleurs.forEach(function (bouton) {
        bouton.disabled = true;
    });

    boutonValider.disabled = true;
    boutonEffacer.disabled = true;
}