// récupérer local storage

let produit = JSON.parse(localStorage.getItem('produit'));


  document.querySelector(".card-panier").innerHTML +=  `<tr>
                                                          <td><img class="img" src="${produit.imageUrl}" width="150" height="150" alt="appareil"></td>
                                                          <td class="black">${produit.name}</td>
                                                          <td class="quantity-panier"> ${produit.quantity}</td>
                                                          <td class="option-panier"> ${produit.lenses}</td>
                                                          <td class="prix">${formatPrice(produit.price*basket.quantity)} €</td>
                                                          <td><button class="btn btn-remove border-dark" type="button"><i class="fas fa-trash-alt"></i></button></td>
                                                          <td><a onclick="supprimeArticle('${produit._id}');"><i class="fas fa-trash-alt"></i></a></td>
                                                        </tr> `;


// création du panier

// affichage du panier

// suppression du panier


// validité du formulaire

// envoie de la commande