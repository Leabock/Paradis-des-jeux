const JOURS=["Dimanche","Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi"];
const MOIS=["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Aout","Septembre","Octobre","Novembre","Décembre"];
const NBJOURS=[31,28,31,30,31,30,31,31,30,31,30,31];
const ANNIFS=[
	["Louis",new Date(1996,10-1, 22)],
	["Kat", new Date(2001,0,29)],
	["Moncef", new Date(2000,2,3)],
	["Q.G ", new Date(2003,7,27)],
	["Arsène", new Date(2001,4,4)],
	["Camille",new Date(1993,5,7)],
	["Lucas", new Date(1999,1,20)],
	["Vivine", new Date(1990,6,13)],
	["Gauthier",new Date(1991,5,15)],
	["Shirley", new Date(1995,5,8)],
	["Nicolas",new Date(2006,11,21)],
	["Alexis", new Date(1993,8,28)]

];

let select =document.querySelector("select");
let input=document.querySelector("input");
let list=document.querySelector("UL");
let titre=document.querySelector("H1");
select.addEventListener("change",calendrier);
input.addEventListener("change",calendrier);

select.value="1";
input.value="2026";
calendrier();
function calendrier() {
	let dateEnCours;
	let mois=select.value;
	let annee =input.value;
	let nbJours;
	let listItem;

	nbJours=NBJOURS[mois-1]; // indice 0 pour 1 janvier
	if( mois==2 && ( (annee%4==0 && annee%100!=0) || annee%400==0) )
		nbJours=29;
	list.textContent="";
	dateEnCours=new Date(annee,mois-1,1);
	for (let i=0; i<dateEnCours.getDay();i++){
		listItem=document.createElement("li");
		listItem.textContent="";
		let att= document.createAttribute("class");
		att.value="vide";
		listItem.setAttributeNode(att);
		list.appendChild(listItem);
	}


	for(let i=1;i<=nbJours;i++){
		dateEnCours=new Date(annee,mois-1,i);
		// attention le smois commence à 0
		listItem=document.createElement("li");

		listItem.textContent=JOURS[dateEnCours.getDay()]+" "+i;
		let annif=annifs(dateEnCours)
		if(annif!=""){
			listItem.textContent+=" "+annif;
			let att= document.createAttribute("class");
			att.value="annif";
			listItem.setAttributeNode(att);	
            // ajouter le prénom et l'age renvoyé
            // ajouter une class pour changer la couleur
		}
		// getday renvoie le numéro du jour 0 pour dimanche
		list.appendChild(listItem);
	}
}
function annifs(laDate){
	let trouve=false;
	let mD,jD,aD, mA,jA,aA; // jma de la Date et de l'Annif
	let dateLigne;
	let msg="";
	jD=laDate.getDate(); // jour
	mD=laDate.getMonth(); //mois
	aD=laDate.getFullYear(); //année sur 4 chiffres
	for(let ligne=0;ligne<ANNIFS.length ;ligne++){
		dateLigne=ANNIFS[ligne][1];
    	jA=dateLigne.getDate(); // jour
		mA=dateLigne.getMonth(); //mois
		aA=dateLigne.getFullYear(); //année sur 4 chiffres
		console.log(aD, aA,aD-aA);
		if(jD==jA && mD==mA && aD>=aA){
			
			if(aD==aA)
				msg+="Naissance de "+ANNIFS[ligne][0] ;
			else
				msg+=ANNIFS[ligne][0]+" ("+ (aD-aA)+" ans)";
		}
	}
    return msg;
}
