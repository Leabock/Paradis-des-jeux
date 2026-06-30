//----------------------------------------------------
// Modification du titre de la page
//----------------------------------------------------

// Je récupère l'élément HTML qui possède l'id "jeux"
// puis je lui attribue le texte voulu.
document.getElementById("jeux").textContent = "Le paradis des jeux";

// Vérification dans la console que le fichier JS est bien chargé
console.log("JavaScript chargé !");


//----------------------------------------------------
// Gestion du Schtroumpf
//----------------------------------------------------

// Je récupère l'image du schtroumpf grâce à son id
const schtroumpf = document.getElementById("schtroumpf");

// Fonction qui affiche le schtroumpf
function apparitionSchtroumpf() {

    // Retire la classe qui cache l'image
    schtroumpf.classList.remove("schtroumpf-cache");

    // Après 2 minutes, on recache le schtroumpf
    setTimeout(() => {

        schtroumpf.classList.add("schtroumpf-cache");

    }, 120000); // 120000 ms = 2 minutes
}

// Première apparition après 2 minutes
setTimeout(apparitionSchtroumpf, 120000);

// Réapparition toutes les 5 minutes
setInterval(apparitionSchtroumpf, 300000); // 300000 ms = 5 minutes


//----------------------------------------------------
// Affichage de la date et de l'heure
//----------------------------------------------------

// Fonction qui récupère la date et l'heure actuelles
function afficherDateHeure() {

    // Création d'un objet Date contenant la date actuelle
    const maintenant = new Date();

    // Affichage de la date et de l'heure dans le paragraphe
    document.getElementById("dateHeure").textContent =
        maintenant.toLocaleDateString("fr-BE") +
        " - " +
        maintenant.toLocaleTimeString("fr-BE");
}

// Premier affichage immédiat
afficherDateHeure();

// Mise à jour toutes les secondes
setInterval(afficherDateHeure, 1000);

