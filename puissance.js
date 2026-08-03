"use strict";

/*
    On récupère les éléments HTML :

    #jeu    = la grille du Puissance 4
    #joueur = le texte indiquant le joueur actif
*/
let grille = document.getElementById("jeu");
let p = document.getElementById("joueur");

/*
    Variables utilisées dans le jeu.
*/
let tab;
let uneCase;
let cpt;
let texte;

/*
    Dimensions de la grille :
    6 lignes et 7 colonnes.
*/
const NBLIG = 6;
const NBCOL = 7;

/*
    On crée 7 colonnes CSS de 80 pixels.
*/
grille.style.gridTemplateColumns = "repeat(" + NBCOL + ", 80px)";

/*
    On démarre le jeu.
*/
init();


/*
    Initialise une nouvelle partie.
*/
function init()
{
    /*
        Le compteur commence à 1.

        Nombre impair = joueur jaune.
        Nombre pair   = joueur rouge.
    */
    cpt = 1;

    texte = "Joueur 1, à toi de placer ton pion jaune";
    p.innerHTML = texte;

    /*
        On vide la grille HTML avant de recréer les cases.

        Cela évite de dupliquer les cases si init()
        est appelée une deuxième fois.
    */
    grille.innerHTML = "";

    /*
        Tableau JavaScript représentant la grille.

        Une case contient :
        ""  = vide
        "J" = pion jaune
        "R" = pion rouge
    */
    tab = [];

    for (let lig = 0; lig < NBLIG; lig++)
    {
        tab.push(new Array(NBCOL).fill(""));
    }

    /*
        Création des 42 images représentant les cases.
    */
    for (let lig = 0; lig < NBLIG; lig++)
    {
        for (let col = 0; col < NBCOL; col++)
        {
            uneCase = document.createElement("img");

            /*
                Toutes les images sont dans le dossier "images".
            */
            uneCase.src = "images/vide.png";
            uneCase.alt = "Case vide";

            /*
                Exemple d'identifiant :

                p00 = ligne 0, colonne 0
                p45 = ligne 4, colonne 5
            */
            uneCase.id = "p" + lig + col;

            /*
                Attribut personnalisé indiquant
                que la case peut être jouée.
            */
            uneCase.setAttribute("libre", "oui");

            grille.appendChild(uneCase);
        }
    }

    /*
        On écoute les clics effectués dans la grille.
    */
    grille.addEventListener("click", clicGrille);
}


/*
    Fonction exécutée lorsqu'on clique dans la grille.
*/
function clicGrille(event)
{
    /*
        On vérifie que l'élément cliqué est une image.
    */
    if (event.target.tagName === "IMG")
    {
        let imageId = event.target.id;
        jeu(imageId);
    }
}


/*
    Joue un pion dans la case cliquée.
*/
function jeu(imageId)
{
    let lig;
    let col;
    let coul;

    /*
        On récupère l'image grâce à son identifiant.
    */
    let laCase = document.getElementById(imageId);

    /*
        Exemple avec p45 :

        imageId[1] = 4 = ligne
        imageId[2] = 5 = colonne
    */
    lig = parseInt(imageId[1]);
    col = parseInt(imageId[2]);

    /*
        On ne joue que si la case est encore libre.
    */
    if (laCase.getAttribute("libre") === "oui")
    {
        /*
            Si le compteur est impair,
            c'est le joueur jaune.
        */
        if (cpt % 2 === 1)
        {
            coul = "J";

            /*
                Chemin corrigé :
                le dossier s'appelle "images".
            */
            laCase.src = "images/jaune.png";

            texte = "Joueur 2, à toi de placer ton pion rouge";
        }
        else
        {
            coul = "R";

            /*
                Chemin corrigé :
                le dossier s'appelle "images".
            */
            laCase.src = "images/rouge.png";

            texte = "Joueur 1, à toi de placer ton pion jaune";
        }

        /*
            On enregistre la couleur dans le tableau.
        */
        tab[lig][col] = coul;

        /*
            On actualise le message et on bloque la case.
        */
        p.innerHTML = texte;
        laCase.setAttribute("libre", "non");

        /*
            On passe au joueur suivant.
        */
        cpt++;

        /*
            Vérification de la victoire.
        */
        let victoire = gagne(lig, col, coul);

        if (victoire)
        {
            if (coul === "R")
            {
                texte = "Les pions rouges ont gagné !";
            }
            else
            {
                texte = "Les pions jaunes ont gagné !";
            }

            p.innerHTML = texte;

            /*
                On bloque toutes les cases après la victoire.
            */
            for (const enfant of grille.children)
            {
                enfant.setAttribute("libre", "non");
            }

            alert("Bravo, 4 pions sont alignés !");
        }
        else if (cpt > 42)
        {
            p.innerHTML = "Match nul !";
            alert("Match nul");
        }
    }
}


/*
    Vérifie si le dernier pion joué forme
    un alignement d'au moins 4 pions.
*/
function gagne(lig, col, coul)
{
    let cptCoul = 0;

    /*
        Vérification verticale :
        vers le sud puis vers le nord.
    */
    for (
        let l = lig;
        l < tab.length && tab[l][col] === coul;
        l++
    )
    {
        cptCoul++;
    }

    for (
        let l = lig - 1;
        l >= 0 && tab[l][col] === coul;
        l--
    )
    {
        cptCoul++;
    }

    if (cptCoul >= 4)
    {
        return true;
    }


    /*
        Vérification horizontale :
        vers l'est puis vers l'ouest.
    */
    cptCoul = 0;

    for (
        let c = col;
        c < tab[0].length && tab[lig][c] === coul;
        c++
    )
    {
        cptCoul++;
    }

    for (
        let c = col - 1;
        c >= 0 && tab[lig][c] === coul;
        c--
    )
    {
        cptCoul++;
    }

    if (cptCoul >= 4)
    {
        return true;
    }


    /*
        Vérification de la diagonale principale :

        ↘ vers le bas et la droite
        ↖ vers le haut et la gauche
    */
    cptCoul = 0;

    for (
        let c = col, l = lig;
        c < tab[0].length
        && l < tab.length
        && tab[l][c] === coul;
        c++, l++
    )
    {
        cptCoul++;
    }

    for (
        let c = col - 1, l = lig - 1;
        c >= 0
        && l >= 0
        && tab[l][c] === coul;
        c--, l--
    )
    {
        cptCoul++;
    }

    if (cptCoul >= 4)
    {
        return true;
    }


    /*
        Vérification de la diagonale secondaire :

        ↗ vers le haut et la droite
        ↙ vers le bas et la gauche
    */
    cptCoul = 0;

    for (
        let c = col, l = lig;
        c < tab[0].length
        && l >= 0
        && tab[l][c] === coul;
        c++, l--
    )
    {
        cptCoul++;
    }

    for (
        let c = col - 1, l = lig + 1;
        c >= 0
        && l < tab.length
        && tab[l][c] === coul;
        c--, l++
    )
    {
        cptCoul++;
    }

    if (cptCoul >= 4)
    {
        return true;
    }

    /*
        Aucun alignement de 4 pions.
    */
    return false;
}
