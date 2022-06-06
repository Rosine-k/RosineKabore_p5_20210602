// création du produit
const createCamera = (data) =>{

    return `<figure class="col-sm-4">
               <a href="produit.html?id=${data._id}">
                    <img class="img-appareil" src="${data.imageUrl}" width="150" height="150" alt="camera">
                    <figurecaption class="vignette">
                        
                        <div class="info">
                            <h3 class="title black">${data.name}</h3>
                            <h4 class="price black">${formatPrice(data.price)} €</h4>
                            <button class="btn btn-dark text">Voir le produit</button>
                        </div>
                    </figurecaption>       
                </a> 
            </figure>` ;
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
