// récupération du local storage
localStorage.getItem("produit");

// calcul du prix total
function calculer() {

}

function total() {
    
}

// affichage si aucun produit n'est dans le panier
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

  

}
// affichage s'il y a un ou plusieurs produits dans le panier
else{
  document.getElementById('panier-commande').innerHTML += ' <div class="col-sm-6">
                                                              <div class="card">
                                                                <div class="card-body bgc-primary">
                                                                  <h2 class="card-title black">Le panier est vide</h2>
                                                                </div>
                                                              </div>        
                                                            </div> ';

}



// supprimer un article



// vider local storage si tous les produits sont supprimés du panier

// vérification de la validité des champs du formulaire
(function () {
    'use strict'
    
    var forms = document.querySelectorAll('.needs-validation')
    
    Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
        
        form.classList.add('was-validated')
      }, false)
    })
  })()


// envoi des données du formulaire de commande au serveur