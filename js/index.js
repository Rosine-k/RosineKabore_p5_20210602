const { response } = require("express");

// création du produit
const showCamera = (data) =>{

    if(data==null || data=="") {
        messageForUser('Attention les donneés à afficher sont incorrectes','index.js -> createCamera');
    }

    let figure      = document.createElement('figure');
    let lien        = document.createElement('a'); 
    let img         = document.createElement('img'); 
    let figureCap   = document.createElement('figurecaption');
    let div         = document.createElement('div');
    let h3          = document.createElement('h3');
    let h4          = document.createElement('h4');
    let btn         = document.createElement('button');

    document.querySelector('figure').className       = "col-sm-4";
    document.querySelector('lien').attributes        = "produit.html?id=${data._id}";
    document.querySelector('img').className          = "img-appareil";
    document.querySelector('img').attributes         = "${data.imageUrl}";
    document.querySelector('img').width              = "150";
    document.querySelector('img').height             = "150";
    document.querySelector('img').alt                = "camera";
    document.querySelector('figureCap').className    = "vignette";
    document.querySelector('lien').className         = "info";
    document.querySelector('h3').className           = "title", "black";
    document.querySelector('h3').value               = "${data.name}";
    document.querySelector('h4').value               = "${formatPrice(data.price)}";
    document.querySelector('h4').className           = "price", "black";
    document.querySelector('btn').className          = "btn", "btn-dark", "text";
    document.querySelector('btn').textContent        = "Voir le produit";

    document.body.append(figure);
    document.body.appendChild(lien);
    document.body.appendChild(img);
    document.body.appendChild(figureCap);
    document.body.appendChild(div);
    document.body.appendChild(h3);
    document.body.appendChild(h4);
    document.body.appendChild(btn);
    
}

function showDatas(datas) {
    for (let datas of response) {
        
        let camera = showCamera(value);
        //return datas;

        document.querySelector(".card-camera").innerHTML += camera;   
    }   
}

//récupération des produits à partir de l'API
function getData() {
    fetch(URL_API)
    .then(response => response.json())
    .then(response => {
            return response;
        }); 
}

function main() {
    let datas = getData();   
    showDatas(datas);
}
main();

//showCamera('');