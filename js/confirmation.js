//Récupération du numéro de commande dans l'URL
var str = window.location.href;
var url = new URL(str);
var orderIdURL = url.searchParams.get("orderId");

//Affichage du numéro de commande
var orderNumber = document.querySelector('.order-id');
orderNumber.innerHTML = "Commande enregistrée : " + orderIdURL;





