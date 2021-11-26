// récupération du local storage
localStorage.getItem("produit");

// calcul du prix total
function calculer() {

}

function total() {
    
}

// affichage si aucun produit n'est dans le panier

// affichage s'il y a un ou plusieurs produits dans le panier

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