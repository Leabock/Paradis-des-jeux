let grille= document.getElementById("jeu");
let p=document.getElementById("joueur");
let tab, uneCase;
let cpt, texte;
const NBLIG=6;
const NBCOL=7;
grille.style.gridTemplateColumns
	  ="repeat("+NBCOL+", 80px)";
init();
function init(){
	cpt=1;
	texte="joueur 1, à toi de placer ton pion jaune"
	p.innerHTML=texte;
	tab=[]; //tab pour les pions "", "j" ou "r"
	for(let lig=0;lig<NBLIG;lig++){
		tab.push(new Array(NBCOL).fill(""));
	}
	for (let lig=0; lig<NBLIG;lig++){
		for(let col=0; col<NBCOL;col++){
			uneCase=document.createElement("img");
			uneCase.src="images/vide.png";
			uneCase.alt="case vide";
			uneCase.id="p"+lig+col;
			//uneCase.dataset.libre="oui";
			uneCase.setAttribute("libre","oui");
			grille.appendChild(uneCase);
		}
	}
	grille.addEventListener("click", function(event){
		console.log("click");
		if(event.target.tagName=="IMG"){
			let imageId=event.target.id;
			jeu(imageId);
		}
	});
}
/////////////////////////////////////////////////////
function jeu(imageId){
	console.log(imageId)
	let lig, col,coul;
	let laCase= document.getElementById(imageId);
	lig =imageId[1]; // 2e caractère de la chaine
	col =imageId[2]; // 3e caractère de la chaine p45
	if(laCase.getAttribute("libre")=="oui"){
		if(cpt%2==1){
			coul="J";
			laCase.src="image/jaune.png";
			texte="joueur 2, à toi de placer ton pion rouge"
		}
		else{
			coul="R";
			laCase.src="image/rouge.png";
			texte="joueur 1, à toi de placer ton pion jaune"
		}
		tab[lig][col]=coul;
		console.table(tab);
		p.innerHTML=texte;
		laCase.setAttribute("libre","non");
		cpt++;
		console.log(cpt);
		let victoire=gagne(laCase, lig, col, coul);
		if(victoire){
			alert("bravo 4 alignés");
			if(coul=="R"){
				texte="les pions rouges ont gagné"
			}
			else{
				texte="les pions jaunes ont gagné"
			}	

			p.innerHTML=texte;
			for (const child of grille.children) {
				child.setAttribute("libre","non");
			}
		}
		else	
			if(cpt>42){
				alert("Match nul");
			}
	}
}
function gagne(laCase,lig,col, coul){
	let gagne=false;
	let cptCoul=0;
	// verif verticale
	// Nord et sud
	// sud
	lig=parseInt(lig); // on les reçoit en chaine
	// si  + concatène donc trnsformer d'abord en int
	col=parseInt(col);

	for(let l=lig;l<tab.length && tab[l][col]==coul; l ++){
		cptCoul++
	}
	// nord
	for(let l=lig-1;l>=0 && tab[l][col]==coul; l --){
		cptCoul++
	}
	//nord+sud
 	if(cptCoul>=4){
 		gagne=true;
 	}
 	else{
 		cptCoul=0;
 		// verification horizontal : est ouest
 		for(let c=col;c<tab[0].length && tab[lig][c]==coul; c ++){
			cptCoul++
		}
		for(let c=col-1;c>=0 && tab[lig][c]==coul; c --){
			cptCoul++
		}
		if(cptCoul>=4){
 			gagne=true;
 		}
 		else{
 				cptCoul=0;
		 		// verification diago principale : haut bas
		 		for(let c=col, l=lig;c<tab[0].length && l<tab.length && tab[l][c]==coul; c ++, l++){
					cptCoul++
				}
				for(let c=col-1, l=lig-1;c>=0 && l>=0 && tab[l][c]==coul; c --, l--){
					cptCoul++
				}
				if(cptCoul>=4){
		 			gagne=true;
		 		}
		 		else{
		 				cptCoul=0;
				 		// verification diago secondaire : haut bas
				 		for(let c=col, l=lig;c<tab[0].length && l>=0 && tab[l][c]==coul; c ++, l--){
							cptCoul++
						}
						console.log("col",col-1,"lig",(lig+1),cptCoul, tab[col-1][lig+1]);
						for(let c=col-1, l=lig+1;c>=0 && l<tab.length && tab[l][c]==coul; c --, l++){
							cptCoul++
						}
						console.log(cptCoul);
						if(cptCoul>=4){
				 			gagne=true;
				 		}
		 		} // else diago princ
 			}// else o e

 	} //else ns


return gagne;
}