// code html du produit
const createBasket = (response) =>{
  return `<div class="col-sm-6">
            <div class="card">
              <img class="card-img-top" src="${response.imageUrl}" width="100" height="100" alt="zurss">
              <div class="card-body bgc-primary">
                <h2 class="card-title black">${response.name}</h2>
                <div class="quantity-panier">Quantité: ${response.quantity}</div>
                <div class="option-panier">Option: ${response.lenses}</div>
                <div class="card-text prix">${formatPrice(response.price)} €</div>
                <button class="btn btn-remove border-dark" type="button">Supprimer</button>
              </div>
            </div>        
          </div>`;
     
}

// Ajout des articles
function addProducts(createBasket) {
  
  produits.push(createBasket[i]._id);
  
}


//ajout et calcul du prix total
function addPrice(item) {
  
  let itemPrice = item.price;
  arrayPrice.push(itemPrice);
}
 
function totalPrice(arrayPrice) {
  let totalPrice = document.getElementsByClassName('prix-total');
  let total = 0;
  for (i = 0; i < arrayPrice.length; i++) {
    total = total + arrayPrice[i];
    totalPrice.textContent = "Total : " + total;
        
    localStorage.setItem("totalCommande", JSON.stringify(total));
  }
}


//insère le code html
function showBasket(camera) {
  document.querySelector(".card-panier").innerHTML += camera;
  
}


// tableau de stockage
const arrayPrice = [];

let produits = [];

let contact = {};

class Utilisateur {
  constructor(firstname, lastname, adress, city, email) {
    this.firstName = firstname;
    this.lastName = lastname;
    this.address = adress;
    this.city = city;
    this.email = email;
  }
}

// Création du panier
async function addBasket() {
  try {
    let response = await fetch(URL_API);
    if (response.ok) {
      let cameras = await response.json();
      let basket = JSON.parse(localStorage.getItem("produit")) || {};

      for (i = 0; i < basket.length; i++) {
        let itemCamera = cameras.find(cameras => cameras['_id'] == basket[i].idCamera);

        let camera = createBasket(response);
        addPrice(itemCamera);
        addProducts(basket);
        showBasket(camera)
      }
      totalPrice(arrayPrice);

    } else {
        console.error('Retour du serveur : ', response.status);
      }
  }
  catch (e) {
    console.log(e);
  }
}





//supprimer des produits du panier
const deleteProduct = (data, productQuantity) =>{
  //supprimer le code html du produit de la page du panier
  document.getElementById('').removeChild(document.getElementById());

  //supprimer le produit de la sessionStorage
  let arrayCart = JSON.parse(sessionStorage.getItem('produit'));
  for (let product of arrayCart){
      if(product.id === data._id){
          arrayCart = arrayCart.filter(x => x !== product);
      }
  }
  sessionStorage.setItem('produit', JSON.stringify(arrayCart)); 

  //Mettre à jour le prix total des produits achetés
  let currentPrice =  parseFloat(sessionStorage.getItem('prixTotal')) - (data.price * productQuantity);
  sessionStorage.setItem('prixTotal', currentPrice);

  //Mettre en forme le prix total mis à jour avant l'insertion dans la page
  currentPrice = priceFormat(sessionStorage.getItem('prixTotal'));
  document.getElementById('prixTotal').textContent = "TOTAL (TTC) : " + currentPrice;

  //Vider la sessionStorage si tous les produits sont supprimés du panier
  if(JSON.parse(sessionStorage.getItem('prixTotal')) == 0){
      sessionStorage.clear();
      document.location.reload();
  }
}


//Envoi des données du formulaire au serveur
 form.addEventListener("submit", (e) =>{

  e.preventDefault();

  let arrayCart = JSON.parse(sessionStorage.getItem('produit'));

  let idProducts = [];
  
  for(let product of arrayCart){
    idProducts.push(product.id);
  }
  
  fetch("http://localhost:3000/api/cameras/order", {

  method: "POST",
  headers: {
    Accept: 'application/json',
    "Content-Type": "application/json; charset=UTF-8"
  },
  body: JSON.stringify({
    contact: {
      firstName: form.elements.firstName.value,
      lastName: form.elements.lastName.value,
      address: form.elements.address.value,
      city: form.elements.city.value,
      email: form.elements.email.value

    },
    products: idProducts
  })
    
})
.then(response => response.json())

.then(response => document.location.href=`confirmation.html?idCommande=${response.orderId}&pseudo=${form.elements.firstName.value}`);


})