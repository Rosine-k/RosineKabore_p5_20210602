let productsBE;

// création du panier
const creationPanier = (products) => {
  // si problème survenu
  if(products==null || products=="") {
    messageForUser('Attention les données à afficher sont incorrectes','panier.js -> creationPanier');
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
  img.setAttribute("src", productsBE.imageUrl);
  img.setAttribute("alt", "image panier");

  let divTrois       = document.createElement('div');
  divTrois.className = "info-panier flex-column-around";

  let h3       = document.createElement('h3');
  h3.className = "black card-title";
  h3.value     = productsBE.name;

  let option       = document.createElement('p');
  option.className = "option-panier";
  option.value     = products.lenses;

  let prix       = document.createElement('p');
  prix.className = "prix";
  prix.value     = formatPrice(productsBE.price*products.quantity) + " €";

  let divQuatre       = document.createElement('div');
  divQuatre.className = "quantite-change flex-around";

  let divCinq       = document.createElement('div');
  divCinq.className = "flex-centre";

  let btnMoins       = document.createElement('button');
  btnMoins.className = "btn-moins";

  let span       = document.createElement('span');
  span.className = "quantite-panier";
  span.value     = products.quantity;

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
  if (produit) {
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

//récupération des produits à partir de l'API
function getData(url) {

  if(url==null || url=="") {
      messageForUser('Un problème est survenu au niveau du backend','index.js -> getData');
      return false;
  }

  fetch(url)
  .then(response => response.json())
  .then(response => {
         productsBE=response;
        showDatas();
      }); 
}


function main() {

  let url = URL_API;   
  getData(url);

  if (url==false) {
    return;
}

}
main();


function showDatas() {
  // récupérer local storage
  let productsLS = JSON.parse(localStorage.getItem('produit'));
  for (let productLS of productsLS) {
    let camera = creationPanier(productLS);

    affichagePanier(camera);
  }
}

//ajout et calcul du prix




// suppression du produit
function suppression() {

  let btnSuppression = document.querySelector('.btn-remove');

  //supprime le produit selectionné (id) 
  btnSuppression.addEventListener('click', function() {

  })
}


// envoie de la commande
function envoieCommande () {

}


// validité du formulaire 
function validNames () {

  let firstname = document.getElementById('firstname').value;
  let lastname = document.getElementById('lastname').value;
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
  
  boutonvalidation.addEventListener('click', function (e) {

    e.preventDefault();

    if(validNames && validAddress && validEmail && validZip == true ) {
      envoieCommande();
    }  
    
    else {  
      alert("Veuillez saisir des champs valides");
      return false;
    }
  } )
}

validation();