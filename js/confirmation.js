// récupération de l'id de la commande
const commandeId = localStorage.getItem("commandeId");
console.log(`commandeId: ${commandeId}`);

//récupération du prix total
const prixTotal = localStorage.getItem("prixTotal");
console.log(`prixTotal : ${prixTotal}`);

//positionnement
const recapitulatifCommande = document.querySelector(".card-confirmation");

const affichageRecapitulatif = `
<div class="col-sm-8 mx-auto">
    <div class="card">
        <div class="card-body bgc-white">
          <h3 class="card-title black font-weight-bold">Votre numéro de commande :${commandeId} </h3>
          <h4 class="card-text black">Le montant : ${prixTotal} €</h4>
          <h4 class="card-text black message">Merci pour votre commande. Vous allez recevoir un mal de confirmation</h4>  
          <h4 class="card-text black font-weight-bold">A bientôt !</h4>                                             
        </div>
    </div>       
</div> `;

//récupérer et afficher le pseudo de l'utilisateur
let pseudo = params.get('pseudo');
document.getElementById('message').textContent = "+pseudo+ ";

// affichage de la structure HTML
recapitulatifCommande.insertAdjacentHTML("afterbegin", affichageRecapitulatif);

//retour automatique à la page d'accueil
if(commandeId == null || prixTotal == null) {
  window.location.href="index.html";
}

//Vider le panier
sessionStorage.clear();