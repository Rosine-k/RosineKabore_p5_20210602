const createProduct = (data) =>{

    return `<div class="col-sm-8 mx-auto">
                <div class="card">
                    <img class="card-img-top" src="${data.imageUrl}" width="250" height="250" alt="camera">
                    <div class="card-body bgc-primary">
                        <h3 class="card-title black">${data.name}</h3>
                        <h4 class="card-price black">${data.price} €</h4>
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

                        <button class="btn btn-panier border-dark addPanier" type="button">Ajouter au panier</button>
                    </div>
                </div>       
            </div>` ;

     
}

//récupérer l'ID du produit
let params = new URLSearchParams(window.location.search);

let idProduct = params.get('idProduct');

let urlProduct = URL_API + '/' + idProduct;

fetch(urlProduct)
.then(response => response.json())
.then(response => {

    let camera = createProduct(response);

    document.querySelector(".card-produit").innerHTML += camera;
    
});

 //Le choix d'une quantité
 let quantiteProduit = document.querySelector("#quantity-product").value; 

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
    prix: camera.price / 100,
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
          





