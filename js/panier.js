let productsLS = JSON.parse(localStorage.getItem("produit"));
let productsBE;

// création du panier
function showOneElementOfBasket(productBE,productLS) {
  
  const conteneur = document.querySelector(".card-panier");

  let form = document.querySelector('.formulaire');

  // si panier vide
  if (productsLS === null || productsLS.length === 0) {
    conteneur.innerHTML += '<h2>Panier vide</h2>';
    console.log('vide');
    //formulaire caché
    form.classList.add("display-none");  
  }

  else {
    //affichage du formulaire
    form.classList.remove("display-none"); 
    
    let table       = document.createElement('table');
    table.className = "table";
    table.setAttribute("data-id", productLS.id);
    table.setAttribute("data-option", productLS.lenses);

    let tbody = document.createElement('tbody');

    let tr = document.createElement('tr');

    let tdImg = document.createElement('td');

    let img          = document.createElement('img');
    img.className    = "img img-panier";
    img.style.width  = "100%";
    img.style.height = "10vw";
    img.className    = "img-panier";
    img.setAttribute("src", productBE.imageUrl);
    img.setAttribute("alt", "image panier");

    let tdName       = document.createElement('td');
    tdName.className = "black";
    tdName.innerText = productBE.name;

    let tdOption       = document.createElement('td');
    tdOption.className = "option-panier";
    tdOption.innerText = productLS.lenses;

    let tdPlus = document.createElement('td');

    let btnPlus       = document.createElement('button');
    btnPlus.className = "btn-plus btn-dark";
    btnPlus.innerText = "+";
    btnPlus.setAttribute("data-id", productLS.id);
    btnPlus.setAttribute("data-option", productLS.lenses);

    let tdQuantity       = document.createElement('td');
    tdQuantity.className = "quantity-panier";
    tdQuantity.innerText = productLS.quantity;

    let tdMoins = document.createElement('td');

    let btnMoins       = document.createElement('button');
    btnMoins.className = "btn-moins btn-dark";
    btnMoins.innerText = "-";
    btnMoins.setAttribute("data-id", productLS.id);
    btnMoins.setAttribute("data-option", productLS.lenses);

    let tdPrixFinal       = document.createElement('td');
    tdPrixFinal.className = "price prix-final";
    tdPrixFinal.innerText = formatPrice(productBE.price * productLS.quantity) + " €";

    let tdRemove = document.createElement('td');

    let btnRemove       = document.createElement('button');
    btnRemove.className = "btn-remove btn btn-dark mv-2 mx-3";
    btnRemove.setAttribute("type", "button");

    let trash       = document.createElement('i');
    trash.className = "fas fa-trash-alt";

    table.appendChild(tbody);
    tbody.appendChild(tr);
    tr.appendChild(tdImg);
    tdImg.appendChild(img);
    tr.appendChild(tdName);
    tr.appendChild(tdOption);
    tdMoins.appendChild(btnMoins);
    tr.appendChild(tdMoins);
    tr.appendChild(tdQuantity);
    tr.appendChild(tdPlus);
    tdPlus.appendChild(btnPlus);    
    tr.appendChild(tdPrixFinal);
    tr.appendChild(tdRemove);
    tdRemove.appendChild(btnRemove);
    btnRemove.appendChild(trash);

    conteneur.appendChild(table);
  }
 
}

//récupération des produits à partir de l'API
function getData(url) {

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


function showDatas() {

  for(i = 0; i < productsLS.length; i++) {
    let productBE = getProductFromBE(productsLS[i]['id']);
    let productLS = productsLS[i];

    showOneElementOfBasket(productBE,productLS);
  }
 showPriceTotal(productsLS,productsBE)
}


function getProductFromBE(id) {
  
 return productsBE.find(product => product._id === id)
}


function main() {

  let url = URL_API;   
  
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
function removeProduct () {
  let btnRemoveProduct = document.querySelectorAll('.btn-remove');
  
  for (let i = 0; i < btnRemoveProduct.length; i++) {
    btnRemoveProduct[i].addEventListener('click', (e) => {
     
      e.preventDefault();

      let idProduct = productsLS[i].id;
      let optionLense = productsLS[i].lenses;

      productsLS = productsLS.filter(el => el.id !== idProduct || el.lenses !== optionLense);
            
      localStorage.setItem("produit", JSON.stringify(productsLS));
  
      window.location.reload();
    })
  }
}
removeProduct();


// ajouter quantite produit
function addQuantity() {
  let btnAdd = document.querySelectorAll('.btn-plus');
  
  for(let i = 0; i < btnAdd.length; i++) {

    btnAdd.addEventListener('click', function() {
    
      let cameraId = e.target.getAttribute("data-id");
      
      let cameraOption = e.target.getAttribute("data-option");

      if (productsLS[i].id == cameraId && productsLS[i].lenses == cameraOption) {
        return (
          productsLS[i].quantity++,
          localStorage.setItem("produit", JSON.stringify(productsLS)),
          document.querySelector('.quantity-panier')[i].textContent = productsLS[i].quantity,
          document.querySelector('.prix-final')[i].textContent = productsLS[i].quantity * productsLS.formatPrice(price)
        );
        
      }
    })      
  } 
}
addQuantity();


//baisser quantite produit
// function removeQuantity() {
//   let btnRemove = document.querySelector('.btn-moins');

//   btnRemove.addEventListener('click', function(){

//     let totalProduct = productsLS.length;

//     for(i = 0; i < totalProduct.length; i++) {
     
//       if (productsLS[i].quantity == 1 && totalProduct == 1) {
//         return (
//           localStorage.removeItem("produit"), 
//           window.location.reload()
//         );
//       }

//     }
//   })

// }