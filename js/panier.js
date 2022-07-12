let productsBE;
let produits = [];

// création du panier
function showOneElementOfBasket(productBE,productLS ) {
  // si problème survenu
  if(productLS==null || productLS=="") {
    messageForUser('Attention les données à afficher sont incorrectes','panier.js -> showOneElementOfBasket');
    return false;
  }

  let divUn       = document.createElement('div');
  divUn.className = "card-body";

  let divDeux       = document.createElement('div');
  divDeux.className = "img-panier";

  let img          = document.createElement('img');
  img.style.width  = "150";
  img.style.height = "150";
  img.className    = "img-panier";
  img.setAttribute("src", productBE.imageUrl);
  img.setAttribute("alt", "image panier");

  let divTrois       = document.createElement('div');
  divTrois.className = "info-panier flex-column-around";

  let h3       = document.createElement('h3');
  h3.className = "black card-title";
  h3.value     = productBE.name;

  let option       = document.createElement('p');
  option.className = "option-panier";
  option.value     = productLS.lenses;

  let prix       = document.createElement('p');
  prix.className = "prix";
  prix.value     = formatPrice(productBE.price*productLS.quantity) + " €";

  let divQuatre       = document.createElement('div');
  divQuatre.className = "quantite-change flex-around";

  let divCinq       = document.createElement('div');
  divCinq.className = "flex-centre";

  let btnMoins       = document.createElement('button');
  btnMoins.className = "btn-moins";

  let span       = document.createElement('span');
  span.className = "quantite-panier";
  span.value     = productLS.quantity;

  let btnPlus      = document.createElement('button');
  btnPlus.className = "btn-plus";

  let btnRemove       = document.createElement('button');
  btnRemove.className = "btn-remove btn mv-2 mx-3";
  btnRemove.setAttribute("type", "button");

  let trash       = document.createElement('i');
  trash.className = "fas fa-trash-alt";

  divCinq.appendChild(btnMoins, span, btnPlus);
  divQuatre.appendChild(divCinq);
  divTrois.appendChild(h3, option, prix);
  divDeux.appendChild(img);
  divUn.appendChild(divDeux, divTrois, divQuatre, divCinq, trash);

  return divUn;

}


// affichage du panier
function affichagePanier(camera) {

  // si problème survenu
  if(camera==null || camera=="") {
    messageForUser('Attention les données à afficher sont incorrectes','panier.js -> affichagePanier');
    return false;
  }

  // si produit dans panier
  if (productsBE) {
    console.log('produit ajouté');
    document.querySelector(".card-panier").appendChild(camera);
    //affichage du formulaire
    let form = document.querySelector('.formulaire');
    form.classList.remove("display-none");
  }

  // si panier vide
  else {
    document.querySelector(".card-panier").innerHTML += '<h2>Panier vide</h2>';
    console.log('vide');
    //formulaire caché
    form.classList.add("display-none");
  }
  
}

// Ajout des articles
function addProduits(creationPanier) {
  
  produits.push(creationPanier[i]._id);
  
}

//affichage des options
function addOption(productLS) {
  if(productLS==null || productLS=="") {
    messageForUser('Attention les options ne peuvent être affiché','produit.js -> addOption');
    return false;
  }

  for(let lense of productLS.lenses) {
    lense = document.querySelector(".option-panier").value;
  }
}


//récupération des produits à partir de l'API
function getData(url) {

  if(url==null || url=="") {
    messageForUser('Un problème est survenu au niveau du backend','index.js -> getData');
    return false;
  }

  fetch(url)
  .then(response => response.json())
  .then(response => {
    productsBE = response;
    showDatas();
  }); 
}


function showDatas() {

  let productsLS = JSON.parse(localStorage.getItem('produit'));
  console.log(productsLS);
  for(i = 0; i < productsLS.length; i++) {
    let productBE = getProdutFromBE( productsLS[i]['id']);
    let productLS = productsLS[i];
    console.log('manu');
    console.log( productsLS[i]['id']);


    showOneElementOfBasket(productBE,productLS );


  }
    // todo showPriceTotal(productsLS,productsBE)
}

function getProdutFromBE(id)
{
  for(i = 0; i < productsBE.length; i++) {
    if(productsBE[i]['_id']==id ) {
      return productsBE[i];
    }
  }
}

function main() {

  let url = URL_API;   
  
  if (url==false) {
    return;
  }
  getData(url);
}
main();


//calcul du produit (boucle si nom et option pareil(= true?), calcul quantité)
function calculPrix() {

  
}

// ajouter quantite produit
function ajoutQuantite() {
  let btnAdd = document.querySelector('.btn-plus');

  btnAdd.addEventListener('click', function(){
    for(i = 0; i < productLS.length; i++) {
      
    }
  })
}

//baisser quantite produit
function baisserQuantite() {
  let btnRemove = document.querySelector('.btn-moins');

  btnRemove.addEventListener('click', function(){
    for(i = 0; i < productLS.length; i--) {
     
    }
  })

}


function calculPrixTotal() {

  let totalPrice = document.querySelector('.prix-total');
  let total = 0;
  
}


// suppression du produit
function suppression() {

  let btnSuppression = document.querySelector('.btn-remove');

  //supprime le produit selectionné (id) 
  btnSuppression.addEventListener('click', function() {
    localStorage.removeItem('produit');

  })
}


// envoie de la commande
function envoieCommande () {

}


// validation du formulaire 
function validNames () {

  let firstname = document.getElementById('firstName').value;
  let lastname = document.getElementById('lastName').value;
  let city = document.getElementById('city').value;

  if(firstname, lastname, city == /^[A-Za-z\s]+$/) {
    return true;
  }
}

function validAddress () {
  let address = document.getElementById('address').value; 

  if(address == /^[0-9a-zA-Z]+$/) {
    return true;
  }
}

function validZip () {
  
  let zip = document.getElementById('zip').value;

  if(zip == /^[0-9]+$/) {
    return true;
  }
}

function validEmail() {

  let email = document.getElementById('email').value;

  if(email == /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/) {
    return true;
  }
}

function validation () {

  let boutonvalidation = document.querySelector('.btn-validation');

  let names = validNames();
  let address = validAddress();
  let email = validEmail();
  let zip = validZip();
  
  boutonvalidation.addEventListener('click', function (e) {

    e.preventDefault();

    if(names && address && email && zip == true ) {
      envoieCommande();
    }  
    
    else {  
      alert("Veuillez saisir des champs valides");
      return false;
    }
  } )
}

validation();