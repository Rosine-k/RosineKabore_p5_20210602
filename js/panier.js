// récupérer local storage
let produit = JSON.parse(localStorage.getItem('produit'));

// affichage du panier
function affichagePanier() {
  // si produit dans panier
  if ("produit" in localStorage) {
    console.log('produit');
    document.querySelector(".card-panier").innerHTML +=  `<tr>
                                                          <td><img class="img" src="${produit.imageUrl}" width="150" height="150" alt="appareil"></td>
                                                          <td class="black">${produit.name}</td>
                                                          <td class="quantity-panier"> ${produit.quantity}</td>
                                                          <td class="option-panier"> ${produit.lenses}</td>
                                                          <td class="prix">${formatPrice(produit.price*produit.quantity)} €</td>
                                                          <td><button class="btn btn-remove border-dark" type="button"><i class="fas fa-trash-alt"></i></button></td>
                                                          <td><a onclick="supprimeArticle('${produit._id}');"><i class="fas fa-trash-alt"></i></a></td>
                                                        </tr> `;
  }
  // si panier vide
  else {
    document.querySelector(".card-panier").innerHTML += '<h2>Panier vide</h2>';
    console.log('vide');
  }
}

//ajout et calcul du prix
function calculPrix () {
  let total = 0;


}  




// suppression du panier (evenement clic btn)

// validité du formulaire (boucle)

// envoie de la commande