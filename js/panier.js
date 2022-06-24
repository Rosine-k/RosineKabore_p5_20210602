// récupérer local storage
let produit = JSON.parse(localStorage.getItem('produit'));

// création du panier
function creationPanier() {
  // si problème survenu

  let divUn       = document.createElement('div');
  divUn.className = "card-body";

  let divDeux       = document.createElement('div');
  divDeux.className = "img-panier";

  let img          = document.createElement('img');
  img.style.width  = "150";
  img.style.height = "150";
  img.className    = "img-panier";
  img.setAttribute("src", produit.imageUrl);
  img.setAttribute("alt", "image panier");

  let divTrois       = document.createElement('div');
  divTrois.className = "info-panier flex-column-around";

  let h3       = document.createElement('h3');
  h3.className = "black card-title";
  h3.value     = produit.name;

  let option       = document.createElement('p');
  option.className = "option-panier";
  option.value     = produit.lenses;

  let prix       = document.createElement('p');
  prix.className = "prix";
  prix.value     = formatPrice(produit.price*basket.quantity) + " €";

  let divQuatre       = document.createElement('div');
  divQuatre.className = "quantite-change flex-around";

  let divCinq       = document.createElement('div');
  divCinq.className = "flex-centre";

  let btnMoins  = document.createElement('button');
  btnMoins.className = "btn-moins";

  let span  = document.createElement('span');
  span.className = "quantite-panier";
  span.value     = produit.quantity;

  let btnPlus  = document.createElement('button');
  btnPlus.className = "btn-plus";

  let btnRemove = document.createElement('button');
  btnRemove.className = "btn-remove btn mv-2 mx-3";
  btnRemove.setAttribute("type", "button");

  let trash = document.createElement('i');
  trash.className = "fas fa-trash-alt";

  divCinq.appendChild(btnMoins, span, btnPlus);
  divQuatre.appendChild(divCinq);
  divTrois.appendChild(h3, option, prix);
  divDeux.appendChild(img);
  divUn.appendChild(divDeux, divTrois, divQuatre, divCinq, trash);

  return divUn;

}

// affichage du panier
function affichagePanier() {
  // si problème survenu

  // si produit dans panier
  if ("produit" in localStorage) {
    console.log('produit');
    document.querySelector(".card-panier").appendChild(produit);
    
   
  }
  // si panier vide
  else {
    document.querySelector(".card-panier").innerHTML += '<h2>Panier vide</h2>';
    console.log('vide');
  }
  
}

//ajout et calcul du prix
function calculPrix () {
  let total = 0;


}  




// suppression du panier (evenement clic btn)

// validité du formulaire (boucle)

// envoie de la commande