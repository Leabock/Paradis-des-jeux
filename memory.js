///////////MEMORY///////////////////////

"use strict";
let grilleJeu=document.getElementById("jeu");
let select = document.querySelector("select");
let divNb= document.getElementById("nb");
let nbCoups=0;
let nbPairesTrouvées =0;
let fini=false; // pour empecher de continuer à cliquer
let carte1=null, carte2=null;
// pour vérifier les paires
divNb.innerHTML=nbCoups+" essais";
select.addEventListener("change",creation);
let tab; // va contneir les images du jeu
select.value="4";
creation();

function creation(){
	let images= new Array(20);
	let nbCases, largeur;
	// réinitialisation ----------------
	grilleJeu.innerHTML="";
	// pour quand on rejoue, on le vide
	nbCoups=0;
	divNb.innerHTML=nbCoups+" essais";
	nbPairesTrouvées =0;
	carte1=null;
	carte2=null;
	fini=false;
	//----------------------------------
	for(let i=0;i<images.length;i++){
		images[i]="img"+(i+1)+".jpg";
		 // img1,2,3... i commence à 0
	}
	//console.dir(images);
	images=melange(images);
	//console.dir(images);
	// si select.value=="4"
	largeur=4;
	nbCases=16;
	if(select.value=="5"){
		largeur=5;
		nbCases=20;
	}
	else if(select.value=="6"){
		largeur=6;
		nbCases=36;
	}
	tab=new Array(nbCases);
	for(let i=0, j=0;i<tab.length;i+=2,j++){
		tab[i]=images[j];
		tab[i+1]=images[j];
	}
	//console.dir(tab);
	tab=melange(tab);
	grilleJeu.style.display="grid";
	grilleJeu.style.gridTemplateColumns
	="repeat("+largeur+", 80px)";
	tab.forEach((image)=>{
		let carte=document.createElement("div");
		carte.classList.add("carte","cache");
		carte.dataset.image=image;
		//carte.textContent=image;
		carte.onclick=function(){jeu(carte); };
		grilleJeu.appendChild(carte);
	})  
}
/////////////////////////////////////////////////
function jeu(carte){

	if( ! fini){
		console.log(carte.classList)
		if(carte.classList.contains("cache")){
			// pas encore trouvée ni retournée
			carte.classList.remove("cache");
			carte.classList.add("montre");
			carte.innerHTML=
			"<img src='images/"+carte.dataset.image+"' alt='img' >"
			if(carte1==null){
				carte1=carte;
			}
			else{
				carte2=carte;
				fini=true; // on empêche de cliquer
				nbCoups++;
				divNb.innerHTML=nbCoups+" essais";
				verifPaire(carte1,carte2);
			}

		}
	}
}
/////////////////////////////////////////////////
function verifPaire(carte1, carte2){
	if(carte1.dataset.image == carte2.dataset.image){
		carte1.classList.remove("montre");
		carte1.classList.add("trouve");
		carte2.classList.remove("montre");
		carte2.classList.add("trouve");
		tourSuivant();
		nbPairesTrouvées+=2;
		if(nbPairesTrouvées==tab.length){
			setTimeout(()=>{
						alert("bravo, tu as découvert toutes les cases");
							},300)
		}
	}
	else{
		setTimeout(()=>{
				carte1.classList.remove("montre");
				carte1.classList.add("cache");
				carte2.classList.remove("montre");
				carte2.classList.add("cache");
				carte1.innerHTML="";
				carte2.innerHTML="";
				console.log(carte1.classList);
				console.log(carte2.classList);
				tourSuivant();

		},500);
	}
}
/////////////////////////////////////////////////
function tourSuivant(){
	carte1=null;
	carte2=null;
	fini=false;
}
/////////////////////////////////////////////////
function melange(tab){
	let i,j, temp;
	for(i=tab.length-1;i>0;i--){
		j=Math.floor(Math.random()*(i+1));
		// si i=19 j'ai 20 cases 
		// tirage d'un nb entre 0 et avant 20
		// floor tronque lesdécimales (entier plus bas)
		temp=tab[i];
		tab[i]=tab[j];
		tab[j]= temp;
	}
	return tab;
}