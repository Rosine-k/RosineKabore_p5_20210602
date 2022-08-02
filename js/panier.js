let productsLS = JSON.parse(localStorage.getItem("produit"));
let productsBE;

// création du code html
function showOneElementOfBasket(productBE,productLS) {
  
  const conteneur = document.querySelector(".tbl_basket");

  let tr = document.createElement('tr');

  let tdImg = document.createElement('td');

  let img = document.createElement('img');
  img.className = "img img-panier";
  img.style.width = "100%";
  img.style.height = "10vw";
  img.className = "img-panier";
  img.setAttribute("src", productBE.imageUrl);
  img.setAttribute("alt", "image panier");

  let tdName = document.createElement('td');
  tdName.className = "black";
  tdName.innerText = productBE.name;

  let tdOption = document.createElement('td');
  tdOption.className = "option-panier";
  tdOption.innerText = productLS.lenses;

  let tdQuantity = document.createElement('td');

  let inputQuantity = document.createElement('input');
  inputQuantity.className = "quantity-panier";
  inputQuantity.setAttribute("type", "number");
  inputQuantity.setAttribute("min", "1");
  inputQuantity.setAttribute("max", "100");
  inputQuantity.setAttribute("name", "inputQuantity");
  inputQuantity.setAttribute("value", productLS.quantity);
  inputQuantity.setAttribute("onChange", "changeQuantity('" + productLS.id + "','" + productLS.lenses + "', this.value);");

  let tdPrixFinal = document.createElement('td');
  tdPrixFinal.className = "price prix-final";
  tdPrixFinal.innerText = formatPrice(productBE.price * productLS.quantity) + " €";

  let tdRemove = document.createElement('td');

  let btnRemove = document.createElement('button');
  btnRemove.className = "btn-remove btn btn-dark mv-2 mx-3";
  btnRemove.setAttribute("type", "button");
  btnRemove.setAttribute("onClick", "removeProduct('" + productLS.id + "','" + productLS.lenses + "');");

  let trash = document.createElement('i');
  trash.className = "fas fa-trash-alt";

  tr.appendChild(tdImg);
  tdImg.appendChild(img);
  tr.appendChild(tdName);
  tr.appendChild(tdOption);
  tdQuantity.appendChild(inputQuantity);
  tr.appendChild(tdQuantity);
  tr.appendChild(tdPrixFinal);
  tr.appendChild(tdRemove);
  tdRemove.appendChild(btnRemove);
  btnRemove.appendChild(trash);

  conteneur.appendChild(tr);
}
    
//récupération des produits à partir de l'API
function getData(url) {

  // si problème rencontré
  if(url === null || url === "") {
    messageForUser('Un problème est survenu au niveau du backend','panier.js -> getData');
    return false;
  }

  fetch(url)
  .then(response => response.json())
  .then(response => {
    productsBE = response;
    showDatas();    
  }); 
}

const conteneur = document.querySelector(".card-panier");

// affichage si panier vide
function panierVide() {
  conteneur.innerHTML += '<h2>Panier vide</h2>';
  console.log('vide');

  //formulaire caché
  let form = document.querySelector('.formulaire');
  form.style.display = "none";
  document.body.append(form);
  //prix totale caché 
  let showPrice = document.querySelector('.showPrice');
  showPrice.style.display = "none";
  document.body.append(showPrice);
}


//affichage des données
function showDatas() {

  // si problème rencontré
  if (productsLS === null || productsLS.length === 0) {
    panierVide();
    return;
  }

  let table  = document.createElement('table');
  table.className = "table";

  let tbody = document.createElement('tbody');
  tbody.className = "tbl_basket";
  table.appendChild(tbody);
  conteneur.appendChild(table);

  for(i = 0; i < productsLS.length; i++) {
    let productBE = getProductFromBE(productsLS[i]['id']);
    let productLS = productsLS[i];

    showOneElementOfBasket(productBE,productLS);
  }
  
 showPriceTotal(productsLS,productsBE)
}

// récupération des données du backend
function getProductFromBE(id) {
  
 return productsBE.find(product => product._id === id)
}


//fonction principale
function main() {

  let url = URL_API;   
  
  // si problème rencontré
  if (url == false) {
    return;
  }
  getData(url);
}
main();


// calcul du prix total
function showPriceTotal(productsLS,productBE) {
  // si rien dans local storage
  
  //si produit dans local storage
  let totalPrice = document.querySelector('.prix-total');
  let total = 0;

  for (i = 0; i < productsLS.length; i++) {

    productBE = getProductFromBE(productsLS[i].id);

    total = total + (productBE.price * productsLS[i].quantity);
    totalPrice.textContent = formatPrice(total) + " €";
        
    localStorage.setItem("totalCommande", JSON.stringify(total));
  }
}


// supprimer produit
function removeProduct (idProduct, optionLense ) {
  
  productsLS = productsLS.filter(el => el.id !== idProduct || el.lenses !== optionLense);

  console.log(productsLS);
  localStorage.setItem("produit", JSON.stringify(productsLS));

  window.location.reload();
}


// changer quantite produit
function changeQuantity(idProduct, optionLense, quantity) {
 
  let modifQuantity = document.querySelectorAll('.quantity-panier');

  console.log(quantity);

  let change = productsLS[i].quantity;
  let quantityValue = modifQuantity[i].value;

  const result = productsLS.find(el => el.quantityValue !== change);
  result.quantity = quantityValue;
  productsLS[i].quantity = result.quantity;

  localStorage.setItem("produit", JSON.stringify(productsLS));
  window.location.reload();

}