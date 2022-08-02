// création du code du produit
const createProduct = (item) => {

    // si problème rencontré
    if(item==null || item=="") {
        messageForUser('Attention les données à afficher sont incorrectes','produit.js -> createProduct');
        return false;
    }

    let divUn       = document.createElement('div');
    divUn.className = "col-sm-6 mx-auto";

    let divDeux       = document.createElement('div');
    divDeux.className = "card";

    let divTrois       = document.createElement('div');
    divTrois.className = "card-body";

    let img          = document.createElement('img');
    img.className    = "img-appareil";
    img.setAttribute("src", item.imageUrl);
    img.setAttribute("alt", "camera");

    let h3         = document.createElement('h3');
    h3.className   = "card-title title black";
    h3.textContent = item.name;

    let h4         = document.createElement('h4');
    h4.className   = "price black";
    h4.textContent = formatPrice(item.price) + " €";

    let description         = document.createElement('p');
    description.className   = "description black";
    description.textContent = item.description;

    let labelOption         = document.createElement('label');
    labelOption.textContent = "Choisissez une option";
    labelOption.setAttribute("for", "choice");

    let selectOption       = document.createElement('select');
    selectOption.className = "px-auto lenses";
    selectOption.setAttribute("name", "option_lense");
    selectOption.setAttribute("id", "option_lense");
    
    let labelQuantite         = document.createElement('label');
    labelQuantite.textContent = "Quantité";
    labelQuantite.setAttribute("for", "quantity");

    let selectQuantite       = document.createElement('select');
    selectQuantite.className = "px-auto quantity";
    selectQuantite.setAttribute("name", "quantity-product");
    selectQuantite.setAttribute("id", "quantity-product");

    let btn         = document.createElement('button');
    btn.textContent = "Ajouter au panier";
    btn.className   = "px-auto btn btn-panier btn-dark addPanier text"; 
    btn.setAttribute("id", "addToCart");

    let quantity  ='';

    for (let i = 1; i < 11; i++) {  
      quantity+="<option>"+ i + "</option>";
    }
    selectQuantite.innerHTML = quantity;
    
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
    
    return divUn;  
}

// affichage du produit
function showProduct(camera) {

    // si problème rencontré
    if(camera == null || camera == "") {
        messageForUser('Attention les données ne peuvent pas être affichés','produit.js -> showProduct');
        return false;
    }

    document.querySelector(".card-produit").appendChild(camera);
}

//ajout du produit au clic
function AddEventAddToCart(item) {

    // si problème rencontré
    if(item == null || item == "") {
        messageForUser("Le ou les produits n'ont pas été ajoutés",'produit.js -> AddEventAddToCart');
        return false;
    }

    document.getElementById("addToCart").addEventListener("click",function() { addItemToCart(item);},false);
}

//affichage des options
function addOption(item) {

    // si problème rencontré
    if(item == null || item == "") {
        messageForUser('Attention les options ne peuvent être affiché','produit.js -> addOption');
        return false;
    }

    for(let lense of item.lenses) {
        document.querySelector(".lenses").innerHTML += `<option>${lense}</option>`;
    }
}


//récupérer l'ID du produit
function getId() {
    
    let params = new URLSearchParams(window.location.search);

    // si problème rencontré
    if(params == null || params == "") {
        messageForUser("L'id n'a pas été récupéré",'produit.js -> getId');
        return false;
    }

    return params.get('id');
}


// récupération des données
function getData(urlProduct) {

    // si problème rencontré
    if(urlProduct == null || urlProduct == "") {
        messageForUser('Un problème est survenu au niveau du backend','produit.js -> getData');
        return false;
    }
        
    fetch(urlProduct)
    .then(response => response.json())
    .then(item => {

        let camera = createProduct(item);
        showProduct(camera);
        addOption(item)
        AddEventAddToCart(item);   
    }); 
}
 

// affichage des données
function main() {
    let id = getId();
    
    if (id == false) {
        return;
    }

    let urlProduct = URL_API + '/' + id;

    getData(urlProduct);
}
main();

 
// vider local storage
function razLS() {

    localStorage.setItem('produit', JSON.stringify([]));
    console.log('RAZ localstorage');
}


function makeProductoAdd(item) {

   //si probleme rencontré
   if(item == null || item == "") {
       messageForUser("Les options n'ont pas été récupérés",'produit.js -> makeProductoAdd');
       return false;
    }
    //récupération de l'endroit d'affichage de l'option
    let selectLenses = document.querySelector("#option_lense");

   // valeur de l'option
   let choixLenses = selectLenses.value; 

   //récupération de la quantité
   let quantiteProduit = parseInt(document.querySelector("#quantity-product").value);
   
   let id = item._id;

   return {
        'id': id, 
        'quantity': quantiteProduit,
        'lenses': choixLenses,
    };
}


function addItemToCart(item) {
     
    // si problème rencontré
    if(item == null || item == "") {
        messageForUser('Attention les données à afficher sont incorrectes','produit.js -> addItemToCart');
        return false;
    }

    let productToAdd = makeProductoAdd(item);

    //traitement du local storage

    let items = JSON.parse(localStorage.getItem('produit')) ;
   
    let present = false;
   
    if (items === null ) {
        items = [];
    }
    
    // si le local storage est vide, ajout du produit avec option et quantité
    if (items.length == 0) {
        console.log('ajout panier');   
        items.push(productToAdd);

    }

    // Si le local storage contient le produit avec l'option -> modification de la quantité
    else {
        for (let itemInLS of items) {
            
            if (itemInLS.id === productToAdd.id && itemInLS.lenses === productToAdd.lenses) {
                console.log('trouvé !');
                itemInLS.quantity += productToAdd.quantity;
                present= true; 
            }
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

// fenetre de confirmation de l'ajout au panier
function fenetreConfirmation() {

    alert('Votre article a bien été ajouté au panier !');
}