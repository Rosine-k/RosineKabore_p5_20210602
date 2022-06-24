// création du produit
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
    img.setAttribute("src", item.imageUrl);
    img.setAttribute("alt", "camera");

    let h3       = document.createElement('h3');
    h3.className = "card-title title black";
    h3.textContent     = item.name;

    let h4       = document.createElement('h4');
    h4.className = "price black";
    h4.textContent  = formatPrice(item.price) + " €";

    let description = document.createElement('p');
    description.className   = "description black";
    description.textContent = item.description;

    let labelOption         = document.createElement('label');
    labelOption.textContent = "Choisissez une option";
    labelOption.setAttribute("for", "choice");

    let selectOption       = document.createElement('select');
    selectOption.className = "px-auto";
    selectOption.value     = item.lenses;
    selectOption.setAttribute("name", "option_lense");
    selectOption.setAttribute("id", "option_lense");

    let option = document.createElement('option');
    option.className = "lenses";
    
    let labelQuantite         = document.createElement('label');
    labelQuantite.textContent = "Quantité";
    labelQuantite.setAttribute("for", "quantity");

    let selectQuantite = document.createElement('select');
    selectQuantite.className = "px-auto";
    selectQuantite.setAttribute("name", "quantity-product");
    selectQuantite.setAttribute("id", "quantity-product");

    let btn         = document.createElement('button');
    btn.textContent = "Ajouter au panier";
    btn.className   = "px-auto btn btn-panier btn-dark addPanier text"; 
    btn.setAttribute("id", "addToCart");

    let quantity  = document.createElement('option');

    for (let i = 1; i < 11; i++) {  
      quantity.innerHTML += i + '\n';
    // quantity.textContent += i + '\n';
      console.log("Ligne :" + i)
    }

    divUn.appendChild(divDeux);
    divDeux.appendChild(divTrois);
    divTrois.appendChild(h3);
    divTrois.appendChild(img);
    divTrois.appendChild(h4);
    divTrois.appendChild(description);
    divTrois.appendChild(labelOption);
    divTrois.appendChild(selectOption);
    divTrois.appendChild(labelQuantite);
    divTrois.appendChild(selectQuantite);
    divTrois.appendChild(btn);
    selectQuantite.appendChild(quantity);
    selectOption.appendChild(option);

    return divUn;
  
}

// affichage du produit
function showProduct(camera) {
    document.querySelector(".card-produit").appendChild(camera);
}

// ajout du produit au clic
// function AddEventAddToCart(item) {
//     document.getElementById("addToCart").addEventListener("click",function() { addItemToCart(item);},false);
// }

//affichage des options
function addOption(item) {
    for(let lense of item.lenses) {
        document.querySelector(".lenses").innerHTML += `<option>${lense}</option>`;
    }
}

//récupérer l'ID du produit
function getId() {
    let params = new URLSearchParams(window.location.search);

    return params.get('id');
}


function getData(urlProduct) {

    if(urlProduct==null || urlProduct=="") {
        messageForUser('Un problème est survenu au niveau du backend','produit.js -> getData');
        return;
    }
        
    fetch(urlProduct)
    .then(response => response.json())
    .then(item => {

        let camera = createProduct(item);
        showProduct(camera);
        addOption(item)
        // AddEventAddToCart(item);   
    }); 
}
 

function main() {
    let id = getId();

    let urlProduct = URL_API + '/' + id;

    getData(urlProduct);

}
main();


function razLS() {

    localStorage.setItem('produit', JSON.stringify([]));
    console.log('RAZ localstorage');
}



function addItemToCart(item) {
    //récupération de l'endroit d'affichage de l'option
let selectLenses = document.querySelector("#option_lense");

// valeur de l'option
let choixLenses = selectLenses.value; 

//récupération du lieu d'affichage de la quantité
let quantiteProduit = parseInt(document.querySelector("#quantity-product").value); 
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
   
    if (items=== null ) {
        items = [];
    }
    // Si le local storage contient le produit avec l'option -> modification de la quantité
    if (items.length==0) {
        console.log('ajout panier');   
        items.push(productToAdd);

    }

    // si le local storage ne le contient pas, ajout du produit avec option et quantité
    else {

        for (let itemInLS of items) {
            
            if (itemInLS.name===name && itemInLS.lenses===choixLenses) {
                console.log('trouvé !');
                itemInLS.quantity += quantiteProduit;
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