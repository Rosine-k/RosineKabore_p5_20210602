// création du produit
const createCamera = (data) =>{

    return `<div class="col-sm-6">
              <a href="produit.html?id=${data._id}">
                    <div class="card">
                        <img class="card-img-top" src="${data.imageUrl}" width="250" height="250" alt="camera">
                        <div class="card-body bgc-primary">
                            <h3 class="card-title black">${data.name}</h3>
                            <h4 class="card-price black">${formatPrice(data.price)} €</h4>
                            <p class="card-text">Voir le produit</p>
                        </div>
                    </div>       
                </a> 
            </div>` ;
}

//récupération des produits à partir de l'API
fetch(URL_API)
   .then(response => response.json())
   .then(response => {
        
       for (let value of response) {
        
            let camera = createCamera(value);

            document.querySelector(".card-camera").innerHTML += camera;   
        }   
    }); 
