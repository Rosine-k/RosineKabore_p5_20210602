// création du produit
const showCamera = (data) =>{

    if(data==null || data=="") {
        messageForUser('Attention les données à afficher sont incorrectes','index.js -> showCamera');
        return;
    }
   
    let figure       = document.createElement('figure');
    figure.className = "col-sm-4";

    let lien               = document.createElement('a');
    lien.className         = "info";
    lien.setAttribute("href", "produit.html?id=" + data._id);

    let img          = document.createElement('img');
    img.className    = "img-appareil";
    img.style.width  = "150";
    img.style.height = "150";
    img.setAttribute("src", data.imageUrl);
    
    let figureCap       = document.createElement('figurecaption');
    figureCap.className = "vignette";
    
    let div       = document.createElement('div');
    div.className = "info";
      
    let h3         = document.createElement('h3');
    h3.className   = "title black";
    h3.textContent = data.name;

    let description = document.createElement('p');
    description.className   = "description black";
    description.textContent = data.description;

    let h4          = document.createElement('h4');
    h4.className    = "price black";
    h4.textContent  = formatPrice(data.price) + " €";

    let btn         = document.createElement('button');
    btn.className   = "btn btn-dark text";
    btn.textContent = "Voir le produit";

    div.appendChild(description);
    div.appendChild(h3);
    div.appendChild(h4);
    div.appendChild(btn);
    figureCap.appendChild(div);
    lien.appendChild(img);
    lien.appendChild(figureCap);
    figure.appendChild(lien);

    return figure;
    
}

// affichage des données
function showDatas(datas) {

    if(datas==null || datas=="") {
        messageForUser('Attention les données à afficher sont incorrectes','index.js -> showDatas');
        return;
    }

    let camera;
    for (let data of datas) {
       
        camera = showCamera(data);

        document.querySelector(".card-camera").appendChild(camera);   
    } 
}

//récupération des produits à partir de l'API
function getData(url) {

    //TODO tester URL
    //TODO afficher un message si le backend est indisponible
    if(url==null || url=="") {
        messageForUser('Un problème est survenu au niveau du backend','index.js -> getData');
        return;
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
}
main();

//showCamera('');