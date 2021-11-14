//récupération des produits à partir de l'API et affichage
fetch(url)
   .then(response => response.json())
   .then(response => {
        
       for (let value of response) {
        
        let product = createProduct(value);
           document.querySelector(".card-camera") .innerHTML +=    `<div class="col-sm-6">
                                                                        <a href="produit.html?id=${camera._id}">
                                                                            <div class="card">
                                                                                <img class="card-img-top" src="${camera.imageUrl}" width="250" height="250" alt="zurss">
                                                                                <div class="card-body bgc-primary">
                                                                                   <h3 class="card-title black">${camera.name}</h3>
                                                                                   <h4 class="card-price black">${camera.price / 100} €</h4>
                                                                                   <p class="card-text">Plus de détails</p>
                                                                               </div>
                                                                            </div>       
                                                                        </a> 
                                                                    </div>` ;
        }   
    }); 
