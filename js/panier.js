// vérification de la validité des champs du formulaire                                 
  function validation () {
    var firstname = document.getElementById('firstname').value;
    var lastname = document.getElementById('lastname').value;
    var adresse = document.getElementById('adress').value;
    var ville = document.getElementById('city').value;
    var mail = document.getElementById('email').value;
    var error = document.getElementById('error').value;
    var text;

    if(firstname.length <5){
      text = "Entrez un prénom valide";
      error = text;
      return false;
    }
    if(lastname.length <5){
      text = "Entrez un nom valide";
      error = text;
      return false;
    }
    if(adresse.length <10){
      text = "Entrez une adresse valide";
      error = text;
      return false;
    }
    if(ville.length <5){
      text = "Entrez une ville valide";
      error = text;
      return false;
    }
    if(mail.indexOf("@") == -1 || mail.length <6){
      text = "Entrez une adresse mail valide";
      error = text;
      return false;
    }

    return false;
  }

// vider le panier
function clearBasket() {
    let clear = document.querySelector("btn-clear-basket");
  
    clear.addEventListener("click", (e) => {
      console.log("panier vidé");
      localStorage.removeItem("produit");
      
      window.location.reload();
    });
}

// récupération du local storage
localStorage.getItem("produit");


// affichage s'il y a un ou plusieurs produits
if (sessionStorage.getItem('produit') !== null) {
   
  let arrayCart = JSON.parse(sessionStorage.getItem('produit'));

  let params = new URLSearchParams(window.location.search);

  let idProduct = params.get('id');

  let urlProduct = URL_API + '/' + idProduct;


  for(let product of arrayCart){
    fetch(urlProduct)
      .then(response => response.json())
      .then(response => {

          createProductCart(item);

  
      })
  }

const elementsPanier = document.querySelector(".card-panier");
console.log(elementsPanier);

//affichage si aucun produit n'est dans le panier
if(produitEnregistre === null) {
    const panierVide = ` <div class="col-sm-6">
                        <div class="card">
                          <div class="card-body bgc-primary">
                           <h2 class="card-title black">Le panier est vide</h2>
                          </div>
                        </div>        
                      </div>`;
    elementsPanier.innerHTML = panierVide;                    
}
//affichage s'il y a un ou plusieurs produits dans le panier
else {
 let panierRempli = [];

 for(j=0; j < produitEnregistre.length; j++) {
   panierRempli = panierRempli + `  <div class="col-sm-6">
                                      <div class="card">
                                        <img class="card-img-top" src="${produitEnregistre[j].imageUrl}" width="100" height="100" alt="zurss">
                                        <div class="card-body bgc-primary">
                                          <h2 class="card-title black">${produitEnregistre[j].name}</h2>
                                          <div class="quantity-panier">Quantité: ${produitEnregistre[j].quantiteProduit}</div>
                                          <div class="option-panier">Option: ${produitEnregistre[j].selectLenses}</div>
                                          <div class="card-text prixToal">Total: €</div>
                                          <button class="btn btn-remove border-dark" type="button">Supprimer</button>
                                        </div>
                                      </div>        
                                    </div>`;
  }
  if(j == produitEnregistre.length) {
    elementsPanier.innerHTML = panierRempli;
  }
}
  

}
// affichage si le panier est vide


// calcul du prix total
function calculer() {

}

function total() {
    
}

// supprimer un article 
function removeBasket() {
   let remove = document.querySelectorAll(".btn-remove");

   remove.forEach((btn, i) => {
    btn.addEventListener('click', e => {
      deleteItemSelect(i);
    });
}









// envoi des données du formulaire de commande au serveur
let formulaire = document.getElementById("formulaire");

formulaire.addEventListener("submit", (e) =>{

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