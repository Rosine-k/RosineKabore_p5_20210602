// récupération du local storage
localStorage.getItem("produit");


// affichage des produits
const createBasket = (item) =>{
  return `<div class="col-sm-6">
            <div class="card">
              <img class="card-img-top" src="${item.imageUrl}" width="100" height="100" alt="zurss">
              <div class="card-body bgc-primary">
                <h2 class="card-title black">${item.name}</h2>
                <div class="quantity-panier">Quantité: ${item.quantiteProduit}</div>
                <div class="option-panier">Option: ${item.selectLenses}</div>
                <div class="card-text prix-total"> €</div>
                <button class="btn btn-remove border-dark" type="button">Supprimer</button>
              </div>
            </div>        
          </div>`;
          
}

function showPanier(camera) {

  document.querySelector(".panier-commande").innerHTML += camera;
  console.log('fonctionne');
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
  let totalPrice = document.getElementById('prix-total');
  let total = 0;
  for (i = 0; i < arrayPrice.length; i++) {
    total = total + arrayPrice[i];
    totalPrice.textContent = "Total : " + total;
        
    localStorage.setItem("totalCommande", JSON.stringify(total));
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
        console.log(itemCamera);
        createBasket(itemCamera, basket);
        addPrice(itemCamera);
        addProducts(basket);
      }
      totalPriceOrder(arrayPrice);

    } else {
        console.error('Retour du serveur : ', response.status);
      }
  }
  catch (e) {
    console.log(e);
  }
}


// supprimer le contenu du panier
function deleteBasket() {
  let buttonClear = document.getElementById('btn-clean-basket');

  buttonClear.addEventListener('click', function () {
    localStorage.removeItem('produit');
    localStorage.removeItem('totalCommande');
    let clearBasket = document.getElementById('panier-commande');
    while (clearBasket.firstChild) {
      clearBasket.removeChild(clearBasket.firstChild);
      let totalPrice = document.getElementById('panier-commande');
      totalPrice.textContent = "Total : 0 €";
    }

  })
}

// récupération de l'id de commande et stockage dans le localStorage
function orderConfirmationId(responseId) {
    let orderId = responseId.orderId;
    console.log(orderId);
    localStorage.setItem("orderConfirmationId", orderId);
}


//Récupération des données du formulaire dans l'objet contact
function getForm() {
  let firstname = document.getElementById('firstName').value;
  let lastname = document.getElementById('lastName').value;
  let address = document.getElementById('address').value;
  let city = document.getElementById('city').value;
  let email = document.getElementById('email').value;
  contact = new Utilisateur(firstname, lastname, address, city, email);
}

//Requête POST pour envoyer l'objet Contact et le tableau products à l'API
async function postForm(dataToSend) {
  try {
    let response = await fetch("http://localhost:3000/api/cameras/order", {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: dataToSend,
    });
    if (response.ok) {
      let responseId = await response.json();
      orderConfirmationId(responseId);
      window.location.href = "confirmation.html";
    } else {
        console.error('Retour du serveur : ', response.status);
      }
  } catch (e) {
      console.log(e);
    }
}

//Validation de la commande et envoie de l'objet contact et du tableau product à l'API
function confirmationOrder() {
  getForm();
  dataToSend = JSON.stringify({ contact, produits });
  console.log(dataToSend);
  postForm(dataToSend);
}

// vérification de la validité des champs du formulaire                                 
  function validation () {

    let boutonvalidation = document.getElementById('btn-validation');
    boutonvalidation.addEventListener('click', function () {
      let firstname = document.getElementById('firstname').value;
      let lastname = document.getElementById('lastname').value;
      let adresse = document.getElementById('adress').value;
      let ville = document.getElementById('city').value;
      let mail = document.getElementById('email').value;

      if (firstname, lastname, addresse, ville, mail != "" && /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
        confirmationOrder();
        return true;
    } else {
        alert("Saisissez des champs valides");
        return false;
    }
})
} 