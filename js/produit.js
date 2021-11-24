const createProduct = (item) =>{
    return `<div class="col-sm-8 mx-auto">
                <div class="card">
                    <img class="card-img-top" src="${item.imageUrl}" width="250" height="250" alt="camera">
                    <div class="card-body bgc-primary">
                        <h3 class="card-title black">${item.name}</h3>
                        <h4 class="card-price black"> ${ formatPrice(item.price)} €</h4>
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

                        <button id="addToCart" class="btn btn-panier border-dark addPanier" type="button">Ajouter au panier</button>
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
    document.getElementById("addToCart").addEventListener("click",function() { addItemTocart(item);},false);
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


function addItemTocart(item)
{
   //récupération de l'option

   //récupération de la quantité

    //traitement du local storage
    // Si le local storage contient de le produit avec l'option ->modification de la quantité
    // si le local storage ne le contient pas, ajout du produit avec option et quantité

    //affichage du panier

}
//Le choix d'une quantité
/*
// let quantiteProduit = document.querySelector("#quantity-product").value; 
  //sélection des options
  const selectLenses = document.querySelector("#option_lense");
  console.log(selectLenses);

  //Le choix de l'utilisateur
  const choixLenses = selectLenses.value; 
  console.log(choixLenses);

   //Récupération du choix de l'utilisateur
   let produitSelection = {
    nom: camera.name,
    id: camera._id,
    option: choixLenses,
    quantite: quantiteProduit,
    prix:  camera.price / 100,
     }
      console.log(produitSelection);
  
          console.log(localStorage.getItem("produit"));
         //si déja produits enregistrés
          if(localStorage.getItem("produit") ) {
            let produitEnregistre = JSON.parse(localStorage.getItem("produit"));
              produitEnregistre.push(produitSelection);
              localStorage.setItem("produit", JSON.stringify(produitSelection)) 
              console.log(produitEnregistre);              
              
          }  else {
              //Local storage vide
              let produitEnregistre = [];
              produitEnregistre.push(produitSelection);
              localStorage.setItem("produit", JSON.stringify(produitSelection)) 
              console.log(produitEnregistre);
              
          }
          
*/




