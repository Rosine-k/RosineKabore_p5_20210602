const createPrice = (data) =>{

    //divisez le prix par 100 
    data.price = data.price / 100;

    //formater le prix
    let price = priceFormat(data.price);

}

function formatPrice(price) {

    return (price /100);
}