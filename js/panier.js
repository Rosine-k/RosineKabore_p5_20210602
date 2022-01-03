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


//appel de la function showBaskets pour afficher le panier
showBaskets();

// Ajout de l'id des articles au tableau
function addProducts(basket) {
  
  produits.push(basket[i]._id);
  
}


//ajout et calcul du prix total
function addPrice(itemCamera) {
  
  let itemPrice = itemCamera.price;
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
function showBasket(camera, basket) {
  document.querySelector(".card-panier").innerHTML += `<div class="col-sm-9">
                                                        <table class=" table table-bordered bgc-primary">                                                    

                                                          <tbody>
                                                            <tr>
                                                             <td><img class="img" src="${camera.imageUrl}" width="150" height="150" alt="appareil"></td>
                                                              <td class="black">${camera.name}</td>
                                                              <td class="quantity-panier">Quantité: ${basket.quantity}</td>
                                                              <td class="option-panier">Option: ${basket.lenses}</td>
                                                              <td class="prix">${formatPrice(basket.price)} €</td>
                                                              <td><button class="btn btn-remove border-dark" type="button"><i class="fas fa-trash-alt"></i></button></td>
                                                            </tr>
                                                          </tbody>

                                                        </table>   
                                                        
                                                        <div class="prix-total"></div>
                                                      </div>`;
  
}



function findproduct(cameras,id)
{
  for (i = 0; i < cameras.length; i++) {
    if(cameras[i]._id==id) {
      return cameras[i];
    }
  }
}


// Création du panier
async function showBaskets() {
  try {
    let response = await fetch(URL_API);
    if (response.ok) {
      let cameras = await response.json();
      
      let basket = JSON.parse(localStorage.getItem("produit")) || {};
      for (i = 0; i < basket.length; i++) {
        
        let itemCamera = findproduct(cameras,basket[i].id);
       
        //addPrice(item);
        //addProducts(basket);
        showBasket(itemCamera,basket[i] )
      }
      //totalPrice(arrayPrice);

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