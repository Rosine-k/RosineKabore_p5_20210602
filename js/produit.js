// affichage du produit
const createProduct = (item) => {
    if(item==null || item=="") {
        messageForUser('Attention les données à afficher sont incorrectes','produit.js -> createProduct');
    }

    let divUn       = document.createElement('div');
    divUn.className = "col-sm-6 mx-auto";

    let divDeux       = document.createElement('div');
    divDeux.className = "card";

    let divTrois       = document.createElement('div');
    divTrois.className = "card-body";

    let img          = document.createElement('img');
    img.style.width  = "100";
    img.style.height = "100";
    img.className    = "img-appareil";
    img.setAttribute("src", "${item.imageUrl}");
    img.setAttribute("alt", "camera");

    let h3       = document.createElement('h3');
    h3.className = "card-title title black";
    h3.value     = "${item.name}";

    let h4       = document.createElement('h4');
    h4.className = "price black";
    h4.value     = "${formatPrice(item.price)}";

    let labelOption         = document.createElement('label');
    labelOption.textContent = "Choisissez une option";
    labelOption.setAttribute("for", "choice");

    let selectOption       = document.createElement('select');
    selectOption.className = "lenses";
    selectOption.setAttribute("name", "option_lense");
    selectOption.setAttribute("id", "option_lense");
    
    let labelQuantite         = document.createElement('label');
    labelQuantite.textContent = "Quantité";
    labelQuantite.setAttribute("for", "quantity");

    let selectQuantite = document.createElement('select');
    selectQuantite.setAttribute("name", "quantity-product");
    selectQuantite.setAttribute("id", "quantity-product");

    let btn         = document.createElement('button');
    btn.textContent = "Ajouter au panier";
    btn.className   = "btn btn-dark text";

    let optionUn         = document.createElement('option');
    optionUn.textContent = "1";

    let optionDeux         = document.createElement('option');
    optionDeux.textContent = "2";

    let optionTrois         = document.createElement('option');
    optionTrois.textContent = "3";

    let optionQuatre         = document.createElement('option');
    optionQuatre.textContent = "4";

    let optionCinq         = document.createElement('option');
    optionCinq.textContent = "5";

    let optionSix         = document.createElement('option');
    optionSix.textContent = "6";

    let optionSept         = document.createElement('option');
    optionSept.textContent = "7";

    let optionHuit         = document.createElement('option');
    optionHuit.textContent = "8";

    let optionNeuf         = document.createElement('option');
    optionNeuf.textContent = "9";

    let optionDix         = document.createElement('option');
    optionDix.textContent = "10+";

    selectQuantite.appendChild(optionUn, optionDeux, optionTrois, optionQuatre, optionCinq, optionSix, optionSept, optionHuit, optionNeuf, optionDix);
    divTrois.appendChild(img, h3, h4, labelOption, selectOption, labelQuantite, selectQuantite, btn);
    divDeux.appendChild(divTrois);
    divUn.appendChild(divDeux);

    return divUn;
  
}


function showProduct(camera) {
    document.querySelector(".card-produit").innerHTML += camera;
}


function AddEventAddToCart(item) {
    document.getElementById("addToCart").addEventListener("click",function() { addItemToCart(item);},false);
}


function addOption(item) {
    for(let lense of item.lenses) {
        document.querySelector(".lenses").innerHTML += `<option>${lense}</option>`;
    }
}

function getId() {
    
}

//récupérer l'ID du produit
let params = new URLSearchParams(window.location.search);

let idProduct = params.get('id');

let urlProduct = URL_API + '/' + idProduct;

fetch(urlProduct)
.then(response => response.json())
.then(item => {

    let camera = createProduct(item);
    showProduct(camera);
    addOption(item)
    AddEventAddToCart(item);   
});


function main() {
    let id= getId();
    if ( id !="") {
        let data =getData();
    }
}
main();


function razLS() {

    localStorage.setItem('produit', JSON.stringify([]));
    console.log('RAZ localstorage');
}

function addItemToCart(item) {
    
   //récupération de l'option
   let selectLenses = document.querySelector("#option_lense");

   let choixLenses = selectLenses.value; 

   //récupération de la quantité
   let quantiteProduit = parseInt( document.querySelector("#quantity-product").value); 

    //traitement du local storage

    let items = JSON.parse(localStorage.getItem('produit')) ;
   
    let present = false;
    let name = item.name;
    let price = item.price;
    let id = item._id;

    let productToAdd={
        'id': id, // a conserver
        'quantity': quantiteProduit,// a conserver
        'lenses': choixLenses,// a conserver
    };

    //Ne laisser dans le locastorage que le id, quantity et lenses
   
    if (items=== null ) {
        items = [];
    }
    // Si le local storage contient le produit avec l'option ->modification de la quantité
    if (items.length==0) {
        console.log('ajout panier');   
        items.push(productToAdd);

    }

    // si le local storage ne le contient pas, ajout du produit avec option et quantité
    else {

        for (let itemInLS of items) {
            
            if (itemInLS.name===name && itemInLS.lenses===choixLenses) {
                console.log('trouvé !');
                itemInLS.quantity +=   quantiteProduit;
                present= true;   
            }
            console.log(itemInLS);
        };
        if (!present) {
            console.log('non présent');
            items.push(productToAdd);
        } else {
            console.log('présent');
        }
    } 

    localStorage.setItem('produit', JSON.stringify(items));
    console.log(items);

     fenetreConfirmation();
      
}

// fenetre de confirmation qui redirige
function fenetreConfirmation() {
    if(window.confirm(`Votre article a bien été ajouté au panier ! Appuyez sur OK pour consulter le panier ou sur ANNULER pour revenir à la page d'accueil`)) {
            window.location.href ="panier.html";
        }
        else{
            window.location.href ="index.html";
        }
}