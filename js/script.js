// création du produit
const createProduct = (data) =>{

    //divisez le prix par 100 
    data.price = data.price / 100;

    //formater le prix
    let price = priceFormat(data.price);

    return `<div class="col-sm-6">
              <a href="produit.html?id=${data._id}">
                    <div class="card">
                        <img class="card-img-top" src="${data.imageUrl}" width="250" height="250" alt="camera">
                        <div class="card-body bgc-primary">
                            <h3 class="card-title black">${data.name}</h3>
                            <h4 class="card-price black">${data.price} €</h4>
                            <p class="card-text">Plus de détails</p>
                        </div>
                    </div>       
                </a> 
            </div>` ;
}

//récupération des produits à partir de l'API
fetch("http://localhost:3000/api/cameras")
   .then(response => response.json())
   .then(response => {
        
       for (let value of response) {
        
        let camera = createProduct(value);

           document.getElementById("card-camera").innerHTML += camera;   
        }   
    }); 
