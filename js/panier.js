let productsLS = JSON.parse(localStorage.getItem("produit"));
let productsBE;

// création du panier
function showOneElementOfBasket(productBE,productLS) {

  // si panier vide
  if (productsLS === null || productsLS.length ===0) {
    document.querySelector(".card-panier").innerHTML += '<h2>Panier vide</h2>';
    console.log('vide');
    //formulaire caché
    form.classList.add("display-none");  
  }

  else {
    //affichage du formulaire
    let form = document.querySelector('.formulaire');
    form.classList.remove("display-none"); 
    
    let divUn       = document.createElement('div');
    divUn.className = "card-body";

    let divDeux = document.createElement('div');
    divDeux.className = "img-panier";

    let img = document.createElement('img');
    img.style.width = "100";
    img.style.height = "100";
    img.className = "img-panier";
    img.setAttribute("src", productBE.imageUrl);
    img.setAttribute("alt", "image panier");

    let divTrois = document.createElement('div');
    divTrois.className = "info-panier flex-column-around";

    let h3 = document.createElement('h3');
    h3.className = "black card-title";
    h3.value = productBE.name;

    let option = document.createElement('p');
    option.className = "option-panier";
    option.value = productLS.lenses;

    let prix = document.createElement('p');
    prix.className = "prix";
    prix.value = formatPrice(productBE.price * productLS.quantity) + " €";

    let divQuatre = document.createElement('div');
    divQuatre.className = "quantite-change flex-around";

    let divCinq = document.createElement('div');
    divCinq.className = "flex-centre";

    let btnMoins = document.createElement('button');
    btnMoins.className = "btn-moins";

    let span = document.createElement('span');
    span.className = "quantite-panier";
    span.value = productLS.quantity;

    let btnPlus = document.createElement('button');
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

  for(i = 0; i < productsLS.length; i++) {
    let productBE = getProdutFromBE( productsLS[i]['id']);
    let productLS = productsLS[i];
    console.log('manu');
    console.log( productsLS[i]['id']);


    showOneElementOfBasket(productBE,productLS );

  }
    // todo showPriceTotal(productsLS,productsBE)
}

// function getProdutFromBE(id)
// {
//   for(i = 0; i < productsBE.length; i++) {
//     if(productsBE[i]['_id']==id ) {
//       return productsBE[i];
//     }
//   }
// }

function main() {

  let url = URL_API;   
  
  if (url==false) {
    return;
  }
  getData(url);
}
main();