// création du produit
const showCamera = (data) =>{

    if(data == null || data == "") {
        messageForUser('Attention les données à afficher sont incorrectes','index.js -> showCamera');
        return false;
    }
    
    let divUn       = document.createElement('div');
    divUn.className = "col-sm-4";

    let divDeux       = document.createElement('div');
    divDeux.className = "card";

    let divTrois       = document.createElement('div');
    divTrois.className = "card-body";

    let lien               = document.createElement('a');
    lien.className         = "info";
    lien.setAttribute("href", "produit.html?id=" + data._id);

    let img          = document.createElement('img');
    img.className    = "img-appareil";
    img.setAttribute("src", data.imageUrl);
        
    let h3         = document.createElement('h3');
    h3.className   = "card-title title black";
    h3.textContent = data.name;

    let description = document.createElement('p');
    description.className   = " card-text description black";
    description.textContent = data.description;

    let h4          = document.createElement('h4');
    h4.className    = "price black";
    h4.textContent  = formatPrice(data.price) + " €";

    let btn         = document.createElement('button');
    btn.className   = "btn btn-dark text";
    btn.textContent = "Voir le produit";

    divUn.appendChild(divDeux);
    divDeux.appendChild(divTrois);
    divTrois.appendChild(lien);
    lien.appendChild(img);
    lien.appendChild(h3);
    lien.appendChild(description);
    lien.appendChild(h4);
    lien.appendChild(btn);
   
    return divUn;
    
}

// affichage des données
function showDatas(datas) {

    if(datas==null || datas=="") {
        messageForUser('Attention les données à afficher sont incorrectes','index.js -> showDatas');
        return false;
    }

    let camera;
    for (let data of datas) {
       
        camera = showCamera(data);

        document.querySelector(".card-camera").appendChild(camera);   
    } 
}

//récupération des produits à partir de l'API
function getData(url) {

    if(url==null || url=="") {
        messageForUser('Un problème est survenu au niveau du backend','index.js -> getData');
        return false;
    }

    fetch(url)
    .then(response => response.json())
    .then(response => {
           showDatas(response);
        }); 
}

// affichage des données récupérées
function main() {
    let url = URL_API;   
    getData(url);
    if (url==false) {
        return;
    }
}
main();

//showCamera('');