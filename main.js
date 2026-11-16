let nom = document.getElementById("nom");
let erreurNom = document.getElementById("erreur-nom");

let email = document.getElementById("email");
let erreurEmail = document.getElementById("erreur-email");

let btnAjouter= document.getElementById("btnAjouter");

let regexNom=/^[A-Za-z ]{3,}$/;
let regexEmail = /^\S+@\S+\.\S+$/;

function disableBtn() {
  if (regexNom.test(nom.value) && regexEmail.test(email.value)){
    btnAjouter.disabled= false;
  } else{
    btnAjouter.disabled= true;
  }
}

nom.addEventListener("input", ()=> {
  if(regexNom.test(nom.value)){
    erreurNom.textContent = "";
  }
  else {
    console.log("nom invalide");
    erreurNom.textContent="Minimum 3 lettres, sans chiffres";
  }
  disableBtn() 
});

// \S+	un ou plusieurs caractères qui ne sont pas des espaces
// \.	un vrai point

email.addEventListener("input", () => {
  if (regexEmail.test(email.value)) {
    erreurEmail.textContent = "";
  }else {
    erreurEmail.textContent = "Email invalide";
  }
  disableBtn() 
});




let liste=document.getElementById("liste");

let total= document.getElementById("total");
let selection= document.getElementById("selection");

function miseTotal(){
  total.textContent= liste.children.length;
  selection.textContent= liste.querySelectorAll("input:checked").length;
}



function ajouterElement() {

  let li = document.createElement("li");

  li.className="flex items-center gap-3 py-3 border-b";

  let caseCocher = document.createElement("input");
  caseCocher.type="checkbox";
  caseCocher.className="h-5 w-5";
  caseCocher.addEventListener("change", miseTotal);


  let texte = document.createElement("div");
  texte.textContent = nom.value + "-" + formation.value + "-" + email.value;


  let buttonX= document.createElement("button");
  buttonX.type="button";
  buttonX.textContent ="X";
  buttonX.className ="rounded shadow px-2";
  buttonX.addEventListener("click", ()=> {
    li.remove();
    miseTotal();
  });

  li.appendChild(caseCocher);
  li.append(texte);
  li.appendChild(buttonX);
  liste.appendChild(li);

  nom.value="";
  email.value="";
  formation.value="";
  erreurNom.textContent="";
  erreurEmail.textContent="";
  disableBtn();
  miseTotal();
}
btnAjouter.addEventListener("click", ajouterElement);

let suppTT = document.getElementById("suppTT");
suppTT.addEventListener("click", ()=>{
  let cocher = liste.querySelectorAll("input:checked");

  cocher.forEach((caseCocher) =>{
    caseCocher.parentElement.remove();
  });
  miseTotal();
});



// Gestionnaire de tâches dynamique (Todo List)
// 🏢 Le client
// L'association marocaine "Tawassoul" qui organise des ateliers d'insertion professionnelle à Casablanca a besoin d'un outil simple pour permettre à ses animateurs de gérer et filtrer rapidement la liste des participants inscrits aux différentes formations.

// 🎯 Objectif du projet
// Créer une application web interactive permettant d'ajouter, de filtrer, de sélectionner, de compter, de supprimer dynamiquement des participants et de persister la liste grâce au localStorage.

// 🗂️ Pages et contenu
// Accueil (index.html) :
// En‑tête avec le logo de l'association et le titre "Gestionnaire des participants"
// Section de comptage : affichage dynamique du nombre total de participants et du nombre de participants sélectionnés
// Section de saisie : champ texte nom complet (min 3 caractères alphabétiques), sélecteur formation (Bureautique, Web, Langues), champ email, bouton "Ajouter"
// Section de filtrage : barre de recherche textuelle et boutons de filtre par formation
// Section de la liste : <ul id="liste"></ul> contenant les <li> générés, chaque <li> possède une case à cocher et un bouton de suppression individuelle, ainsi qu'un bouton "Supprimer sélection" global
// ⚙️ Fonctionnalités
// Valider en temps réel le nom et l'email avec RegEx avant l'ajout
// Bloquer l'ajout et afficher un message d'erreur explicite si la saisie est invalide
// Ajouter un participant dans la liste au clic sur "Ajouter" via ajouterElement()
// Mettre à jour en temps réel les compteurs total et sélection
// Gérer la sélection multiple avec des cases à cocher dynamiques
// Supprimer un participant ciblé ou tous les participants sélectionnés
// Filtrer les participants en temps réel selon la recherche textuelle
// Persister la liste des participants dans le localStorage : sauvegarder le tableau d'objets après chaque modification et le charger au démarrage de la page
// Vérifier l'email via une fonction dédiée validerEmail(email) utilisant une expression régulière standard pour exiger la présence d'un '@' et d'un point après
// 🎨 Charte graphique
// Couleurs : #059669 (vert émeraude), #F3F4F6 (gris clair), #1F2937 (texte sombre)
// Police : Google Fonts "Poppins", sans‑serif
// Style : épuré, cartes ombragées, boutons contrastés
// 📱 Responsive et accessibilité
// Breakpoints : >1024 px (colonnes), <768 px (empilement vertical, zones tactiles agrandies)
// Labels explicites, contraste WCAG AA, navigation clavier
// 🧰 Contraintes techniques
// Technologies : HTML5, CSS3, JavaScript vanilla, RegEx, localStorage
// Fichiers : index.html, style.css, script.js
// Tes objectifs 2 / 11 faits
// Coche chaque objectif quand tu l'as terminé : ton formateur voit où tu en es.


// Créer la structure HTML de la page d'accueil avec formulaire, compteurs et zone de liste

// Intégrer la charte graphique et la mise en page responsive avec Flexbox

// Définir la fonction validerEmail(email) avec une expression régulière pour vérifier le format standard

// Afficher des messages d'erreur dynamiques si la saisie du nom ou de l'email ne respecte pas les RegEx

// Sélectionner les éléments du DOM et bloquer l'envoi du formulaire en cas d'erreur

// Écrire la fonction ajouterElement() pour créer et insérer un <li> avec case à cocher et bouton suppression

// Mettre à jour les compteurs total et sélection à chaque modification

// Implémenter la suppression d'un élément unique et la suppression groupée des sélectionnés

// Ajouter le filtre dynamique de recherche textuelle

// Sauvegarder le tableau de participants dans le localStorage après chaque ajout, suppression ou sélection

// Charger la liste depuis le localStorage au chargement de la page et reconstruire le DOM
// 📦 À rendre : Lien du dépôt GitHub
// ⏱️ Environ 6 h
// Rendre ton travail
// https://github.com/…
// Un mot pour ton formateur (facultatif) : ce que tu as fait, ce qui t'a bloqué…

// Rendre mon travail
// ✋ Une question ? Besoin d'aide ?
// Écris à ton formateur : ta question arrive dans sa file d'aide, il te répond ici et sur Discord.

// À propos de

// Mon plan en général
// Ce que tu ne comprends pas, ce que tu as déjà essayé, où tu bloques…

// Ajouter du code (facultatif)
// ✋ Envoyer à mon formateur