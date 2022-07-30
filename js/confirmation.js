//récupérer l'identifiant de la commande et le pseudo utilisateur
function getInfos() {
    
}
const params = new URLSearchParams(window.location.search);
    let idCommande = params.get('idCommande');
    let pseudo = params.get('pseudo');

let prixTotal = priceFormat(sessionStorage.getItem('prixTotal'))
document.getElementByClass('total-price').textContent = prixTotal;

document.getElementByClass('order-id').textContent = idCommande;
document.getElementByClass('text-pseudo').textContent = "Merci pour votre commande" + pseudo + "!";



