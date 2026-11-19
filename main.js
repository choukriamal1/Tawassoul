let participants = JSON.parse(localStorage.getItem("participants"))|| [];

let nom = document.getElementById("nom");
let erreurNom = document.getElementById("erreur-nom");

let email = document.getElementById("email");
let erreurEmail = document.getElementById("erreur-email");

let formation = document.getElementById("formation");

let btnAjouter = document.getElementById("btnAjouter");

let regexNom = /^[A-Za-z ]{3,}$/;
let regexEmail = /^\S+@\S+\.\S+$/;

// \S+	un ou plusieurs caractères qui ne sont pas des espaces
// \.	un vrai point
// [A-Za-z ] compte l espace aussi

function disableBtn() {
  if (regexNom.test(nom.value) && regexEmail.test(email.value)) {
    btnAjouter.disabled = false;
  } else {
    btnAjouter.disabled = true;
  }
}
//test() return true or false 

nom.addEventListener("input", () => {
  if (regexNom.test(nom.value)) {
    erreurNom.textContent = "";
  } else {
    erreurNom.textContent = "Minimum 3 lettres, sans chiffres";
  }

  disableBtn();
});

email.addEventListener("input", () => {
  if (regexEmail.test(email.value)) {
    erreurEmail.textContent = "";
  } else {
    erreurEmail.textContent = "Email invalide";
  }

  disableBtn();
});

let liste = document.getElementById("liste");

let total = document.getElementById("total");
let selection = document.getElementById("selection");

function miseTotal() {
  total.textContent = participants.length;
  //le nombre d'éléments dans le tableau.

  selection.textContent = participants.filter(function(participant) {
    return participant.selection === true;
  }).length;
}

function ajouterElement() {
  //creat object 
  let participant = {
    nom: nom.value,
    email: email.value,
    formation: formation.value,
    selection: false //participant pas encore coché
  };

  participants.push(participant); //ajouter un element a la fin du tab

  sauvegarder();

  afficherParticipants(participants);

  nom.value = "";
  email.value = "";
  formation.value = "";

  erreurNom.textContent = "";
  erreurEmail.textContent = "";

  disableBtn();
  miseTotal();
}

function afficherParticipants(tableau) {
  //vide le contenu HTML de la liste avant de la reconstruire.
  liste.innerHTML = "";

  tableau.forEach(function(participant) { //parcourt chaque élément du tableau.
    //creat li 
    let li = document.createElement("li");

    li.className = "flex items-center gap-3 py-3 border-b";

    //creat div text participant.nom formation et email
    let texte = document.createElement("div");
    texte.textContent = participant.nom + " - " + participant.formation + " - " + participant.email;
    //nom.value ce qui se trouve dans l'input.

    let caseCocher = document.createElement("input");
    caseCocher.type = "checkbox";
    caseCocher.className = "h-5 w-5";
    caseCocher.checked = participant.selection;
    //Si participant.selection vaut true, la case est cochée.


    caseCocher.addEventListener("change", function() {
      //en select quand en change exécute la fontcion 
      participant.selection = caseCocher.checked;
      //return true 
      miseTotal();
      sauvegarder();
    });

    let buttonX = document.createElement("button");
    buttonX.type = "button";
    buttonX.textContent = "X";
    buttonX.className = "rounded shadow px-2";


    buttonX.addEventListener("click", function() {
      let index = participants.indexOf(participant);
      //indexOf cherche la position dans un tab pour le supprimer

      participants.splice(index, 1);
      //index position ou commencer la supp
      //1 élémént a suuprimer

      sauvegarder();

      afficherParticipants(participants);
      //réaffiche le tableau
      miseTotal();
    });

    li.appendChild(caseCocher);
    li.append(texte);
    li.appendChild(buttonX);

    liste.appendChild(li);
  });
}

btnAjouter.addEventListener("click", ajouterElement);
//Quand l'utilisateur clique sur btnAjouter, exécute la fonction ajouterElement.

let suppTT = document.getElementById("suppTT");

suppTT.addEventListener("click", function() {
  participants = participants.filter(function(participant) {
    return participant.selection === false;
    //garder uniquement les participants qui ne sont pas sélectionnés
  });

  afficherParticipants(participants);
  miseTotal();
  sauvegarder();

});

// Recherche des participants
function rechercherParticipants() {
  let search = document.getElementById("search");

  search.addEventListener("input", function(e) {
    let filtered = participants.filter(function(participant) {
      return participant.nom.toUpperCase().includes(e.target.value.toUpperCase());
    });

    afficherParticipants(filtered);
  });
}

rechercherParticipants();




function filterFormation (){
  let btnfilter= document.querySelectorAll("#filtrage button");
  btnfilter.forEach(function(formationbtn){
    formationbtn.addEventListener("click", ()=>{
      let filtered =participants.filter(function(participant){
        if(formationbtn.textContent=== "Tous"){ return true;}
        else {return participant.formation === formationbtn.textContent;}
      });
      afficherParticipants(filtered);
    });
  });
}
filterFormation ();

function sauvegarder(){
  localStorage.setItem("participants", JSON.stringify(participants));
  //on utilise JSON.stringify(participants) avant localStorage.setItem() 
  // JSON.stringify() transforme les données en texte JSON.
}

afficherParticipants(participants);
miseTotal();