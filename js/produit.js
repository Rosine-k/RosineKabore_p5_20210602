const createProduct = (item) =>{
    return `<div class="col-sm-8 mx-auto">
                <div class="card">
                    <img class="card-img-top" src="${item.imageUrl}" width="250" height="250" alt="camera">
                    <div class="card-body bgc-primary">
                        <h3 class="card-title black">${item.name}</h3>
                        <h4 class="card-price black"> ${formatPrice(item.price)} €</h4>
                        <label for="choice">Choisissez une option</label>
                        <select name="option_lense" id="option_lense" class="lenses">

                        </select>
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

                        <button onclick="fenetreConfirmation()" id="addToCart" class="btn btn-panier border-dark addPanier" type="button">Ajouter au panier</button>
                    </div>
                </div>       
            </div>` ;
  
}


function showProduct(camera)
{
    document.querySelector(".card-produit").innerHTML += camera;
}


function AddEventAddToCart(item)
{
    document.getElementById("addToCart").addEventListener("click",function() { addItemToCart(item);},false);
}


function addOption(item)
{
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


function addItemToCart(item)
{
   //récupération de l'option
   let selectLenses = document.querySelector("#option_lense");

   let choixLenses = selectLenses.value; 

   //récupération de la quantité
   let quantiteProduit = document.querySelector("#quantity-product").value; 

    //traitement du local storage
    
    var addPanier = function(name, quantity, lenses, price) {

        var items = JSON.parse(localStorage.getItem('produit')) || [];

        var item = items.find(item => item.name === name);
      
        // Si le local storage contient le produit avec l'option ->modification de la quantité
        if (item) {
            item.quantity += quantity;
        } 
        // si le local storage ne le contient pas, ajout du produit avec option et quantité    
        else {
            items.push({
                name,
                quantity,
                lenses,
                price
          })
        }

        localStorage.setItem('produit', JSON.stringify(items));
        console.log(items);
    }
      
            
    //affichage du panier
    
}

function fenetreConfirmation() {
    if(window.confirm(`Votre article a bien été ajouté au panier ! Appuyez sur OK pour consulter le panier ou sur ANNULER pour revenir à la page d'accueil`)) {
            window.location.href ="panier.html";
        }
        else{
            window.location.href ="index.html";
        }
}




