const createProduct = (data) =>{

    //divisez le prix par 100 
    data.price = data.price / 100;

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
const params = new URLSearchParams(window.location.search);
let idProduct = params.get('idProduct');

let url = "http://localhost:3000/api/cameras/" + idProduct;

fetch(url)
.then(response => response.json())
.then(response => {

    let camera = createProduct(response);
    document.querySelector(".card-produit").innerHTML += camera;




})


