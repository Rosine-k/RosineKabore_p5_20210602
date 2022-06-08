// affichage du produit
const createProduct = (item) => {
    return `<div class="col-sm-6 mx-auto">
                <div class="card">
                    <div class="card-body">
                        <img class="img-appareil" src="${item.imageUrl}" width="100" height="100" alt="camera">              
                         <h3 class="card-title title black">${item.name}</h3>
                         <h4 class="price black"> ${formatPrice(item.price)} €</h4>
                         <label for="choice">Choisissez une option</label>
                        <select name="option_lense" id="option_lense" class="lenses"></select>
                        <label for="quantity">Quantité</label>
                        <select id="quantity-product" name="quantity-product">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                            <option>6</option>
                            <option>7</option>
                            <option>8</option>
                            <option>9</option>
                            <option>10+</option>
                        </select>

                        <button id="addToCart" class="btn btn-panier btn-dark addPanier" type="button">Ajouter au panier</button>
                    </div>
                </div>    
                       
            </div>` ;
  
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
        let data=getData();
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

function fenetreConfirmation() {
    if(window.confirm(`Votre article a bien été ajouté au panier ! Appuyez sur OK pour consulter le panier ou sur ANNULER pour revenir à la page d'accueil`)) {
            window.location.href ="panier.html";
        }
        else{
            window.location.href ="index.html";
        }
}