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
 


//insère le code html
function showBasket(camera, basket) {
  document.querySelector(".card-panier").innerHTML += `                                                    

                                                            <tr>
                                                             <td><img class="img" src="${camera.imageUrl}" width="150" height="150" alt="appareil"></td>
                                                              <td class="black">${camera.name}</td>
                                                              <td class="quantity-panier"> ${basket.quantity}</td>
                                                              <td class="option-panier"> ${basket.lenses}</td>
                                                              <td class="prix">${formatPrice(basket.price*basket.quantity)} €</td>
                                                              <td><button class="btn btn-remove border-dark" type="button"><i class="fas fa-trash-alt"></i></button></td>
                                                            </tr>
                                                      `;
  
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
        showBasket(itemCamera,basket[i] );
      }
      showPrice(basket);

    } else {
        console.error('Retour du serveur : ', response.status);
    }
  }
  catch (e) {
    console.log(e);
  }
}

function showPrice(basket)
{
  let total=0;
  for (i = 0; i < basket.length; i++) {
    total += basket[i].price *  basket[i].quantity;
  }
  console.log(total);
  document.querySelector(".prix-total").innerHTML = "TOTAL : " + formatPrice(total)+ " €";
}


//Mis à jour du prix d'un produit en fonction de la quantité 
const updatePrice = (camera, newQuantity, lastQuantity) =>{

  //calculer la différence avec le prix envoyé précédemment
  let diffrence = (camera.price) * (newQuantity - lastQuantity);

  //mettre à jour le prix total actuel
  let currentTotalPrice = parseFloat(sessionStorage.getItem('prixTotal'));
  let updatedTotalPrice = currentTotalPrice + diffrence;
  sessionStorage.setItem('prixTotal', updatedTotalPrice);

  //récupérer le nouveau prix et l'insérer dans la page
  let newProductPrice = (camera.price) * (newQuantity);
  newProductPrice = formatPrice(newProductPrice);
  document.getElementById(camera.name + "_" + camera._id).textContent = newProductPrice;
  
  //récupérer le nouveau prix total et l'insérer dans la page
  updatedTotalPrice = formatPrice(updatedTotalPrice);
  document.getElementsByClassName('prix-total').textContent = "TOTAL : " + updatedTotalPrice;
}


// Bouton pour supprimer un article
const removePanier = document.querySelectorAll(".btn-remove");
 removePanier.forEach((btn, i) => {
    btn.addEventListener('click', e => {
      deleteItemSelect(i);
    });

   //Mettre à jour le prix total 
   let majPrice =  parseFloat(sessionStorage.getItem('prixTotal')) - (data.price * productQuantity);
   sessionStorage.setItem('prixTotal', majPrice);

   //Mettre en forme le prix total
   majPrice = priceFormat(sessionStorage.getItem('prixTotal'));
   document.getElementsByClassName('prix-total').textContent = "TOTAL: " + majPrice;

   //Vider le local storage si tous les produits sont supprimés du panier
   if(JSON.parse(sessionStorage.getItem('prixTotal')) == 0){
      sessionStorage.clear();
      document.location.reload();
   }
    
 });  
